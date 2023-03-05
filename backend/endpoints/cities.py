from flask import Blueprint, request
from models.city import City, cities_schema, city_schema
from models.attraction import Attraction, attractions_schema
from models.charity import Charity, charities_schema
from typing import Any
from utils import (
    parse_pagination_parameters,
    parse_request_for_parameter,
    get_model_pages,
    get_model_by_id,
    filter_field_by_id,
    parse_exact_filters,
    parse_range_filters,
    parse_sorting_field,
    apply_exact_filters,
    apply_range_filters,
    apply_search_filters,
)


cities = Blueprint("cities", __name__)


@cities.route("/cities", methods=["GET"])
def get_cities() -> dict[str, Any]:
    EXACT_FILTERS = [
        City.state,
        City.timezone,
        City.known_for,
    ]
    RANGE_FILTERS = [
        City.population,
        City.safety,
        City.budget,
        City.average_rating,
    ]
    SEARCH_FIELDS = [
        City.name,
        City.state,
        City.known_for,
    ]
    SORT_FIELDS = [
        City.name,
        City.population,
        City.area,
        City.budget,
        City.safety,
        City.average_rating,
        City.num_charities,
    ]

    # pagination check
    try:
        page_info = parse_pagination_parameters(request.args)
        sort_info = parse_sorting_field(request.args, SORT_FIELDS, City.population)
        exact_filters = parse_exact_filters(request.args, EXACT_FILTERS)
        range_filters = parse_range_filters(request.args, RANGE_FILTERS)
        query_fields = parse_request_for_parameter(request.args, "query", str)
    except Exception as e:
        return {"status": "fail", "data": e.args}

    base_query = City.query

    # apply exact filters to base query
    if query_fields is not None:
        base_query = apply_search_filters(base_query, SEARCH_FIELDS, query_fields)
    if len(exact_filters) > 0:
        base_query = apply_exact_filters(base_query, exact_filters)
    if len(range_filters) > 0:
        base_query = apply_range_filters(base_query, range_filters)

    # apply sorting (with ID as secondary condition)
    base_query = base_query.order_by(sort_info, City.id)

    ret = get_model_pages(base_query, page_info, cities_schema)

    if ret["status"] == "success":
        ret["data"]["cities"] = ret["data"].pop("instances")

    return ret


@cities.route("/cities/<string:id>", methods=["GET"])
def get_city(id) -> dict[str, Any]:
    ret = get_model_by_id(id, City, city_schema)
    if ret["status"] == "success":
        ret["data"]["city"] = ret["data"].pop("instance")
        city_id = ret["data"]["city"]["id"]
        charities = filter_field_by_id(
            city_id,
            Charity,
            charities_schema,
            "cityId",
            "charities",
            Charity.score.desc(),
            3,
        )
        attractions = filter_field_by_id(
            city_id,
            Attraction,
            attractions_schema,
            "city_id",
            "attractions",
            Attraction.places_rating.desc(),
            3,
        )

        if charities["status"] == "success":
            ret["data"]["city"]["charities"] = charities["data"].pop("charities")
        if attractions["status"] == "success":
            ret["data"]["city"]["attractions"] = attractions["data"].pop("attractions")

    return ret

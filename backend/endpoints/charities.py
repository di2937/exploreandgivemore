from flask import Blueprint, request
from models.charity import Charity, charities_schema, charity_schema
from models.city import City, cities_schema
from models.attraction import Attraction, attractions_schema
from utils import (
    parse_pagination_parameters,
    get_model_pages,
    get_model_by_id,
    filter_field_by_id,
    parse_request_for_parameter,
    parse_sorting_field,
    parse_exact_filters,
    parse_range_filters,
    apply_search_filters,
    apply_exact_filters,
    apply_range_filters,
)
from typing import Any
from sqlalchemy import or_


charities = Blueprint("charities", __name__)


@charities.route("/charities", methods=["GET"])
def get_charities() -> dict[str, Any]:
    EXACT_FILTERS = [
        Charity.city,
        Charity.state,
        Charity.causeArea,
        Charity.deductibility,
    ]
    RANGE_FILTERS = [Charity.rating]
    SEARCH_FIELDS = [
        Charity.name,
        Charity.city,
        Charity.state,
        Charity.causeArea,
        Charity.deductibility,
    ]
    SORT_FIELDS = [
        Charity.name,
        Charity.city,
        Charity.state,
        Charity.rating,
        Charity.causeArea,
    ]

    # pagination check
    try:
        page_info = parse_pagination_parameters(request.args)
        sort_info = parse_sorting_field(request.args, SORT_FIELDS, Charity.rating)
        exact_filters = parse_exact_filters(request.args, EXACT_FILTERS)
        range_filters = parse_range_filters(request.args, RANGE_FILTERS)
        query_fields = parse_request_for_parameter(request.args, "query", str)
    except Exception as e:
        return {"status": "fail", "data": e.args}

    base_query = Charity.query

    # apply exact filters to base query
    if query_fields is not None:
        base_query = apply_search_filters(base_query, SEARCH_FIELDS, query_fields)
    if len(exact_filters) > 0:
        base_query = apply_exact_filters(base_query, exact_filters)
    if len(range_filters) > 0:
        base_query = apply_range_filters(base_query, range_filters)

    # apply sorting (with ID as secondary condition)
    base_query = base_query.order_by(sort_info, Charity.id)

    ret = get_model_pages(base_query, page_info, charities_schema)

    if ret["status"] == "success":
        ret["data"]["charities"] = ret["data"].pop("instances")

    return ret


@charities.route("/charities/<string:id>", methods=["GET"])
def get_charity(id) -> dict[str, Any]:
    ret = get_model_by_id(id, Charity, charity_schema)
    if ret["status"] == "success":
        ret["data"]["charity"] = ret["data"].pop("instance")
        city_id = ret["data"]["charity"]["cityId"]
        city_in = filter_field_by_id(city_id, City, cities_schema, "id", "city_in")
        attractions = filter_field_by_id(
            city_id,
            Attraction,
            attractions_schema,
            "city_id",
            "attractions",
            Attraction.places_rating.desc(),
            3,
        )

        if city_in["status"] == "success":
            ret["data"]["charity"]["cityIn"] = city_in["data"].pop("city_in")[0]
        if attractions["status"] == "success":
            ret["data"]["charity"]["attractions"] = attractions["data"].pop(
                "attractions"
            )

    return ret

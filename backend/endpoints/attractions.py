from flask import Blueprint, request
from models.attraction import Attraction, attractions_schema, attraction_schema
from models.review import Review, reviews_schema
from models.city import City, cities_schema
from models.charity import Charity, charities_schema
from typing import Any
from utils import (
    parse_pagination_parameters,
    parse_request_for_parameter,
    get_model_pages,
    get_model_by_id,
    filter_field_by_id,
    parse_sorting_field,
    parse_exact_filters,
    apply_exact_filters,
    parse_range_filters,
    apply_range_filters,
    apply_search_filters,
)


attractions = Blueprint("attractions", __name__)


@attractions.route("/attractions", methods=["GET"])
def get_attractions() -> dict[str, Any]:
    EXACT_FILTERS = [
        Attraction.city,
        Attraction.state,
        Attraction.heritage,
        Attraction.types,
        Attraction.kinds,
    ]
    RANGE_FILTERS = [Attraction.places_rating, Attraction.otm_rating]
    SEARCH_FIELDS = [
        Attraction.name,
        Attraction.city,
        Attraction.state,
        Attraction.types,
        Attraction.kinds,
    ]
    SORT_FIELDS = [
        Attraction.name,
        Attraction.city,
        Attraction.state,
        Attraction.places_rating,
        Attraction.otm_rating,
    ]

    # pagination check
    try:
        page_info = parse_pagination_parameters(request.args)
        sort_info = parse_sorting_field(
            request.args, SORT_FIELDS, Attraction.otm_rating
        )
        exact_filters = parse_exact_filters(request.args, EXACT_FILTERS)
        range_filters = parse_range_filters(request.args, RANGE_FILTERS)
        query_fields = parse_request_for_parameter(request.args, "query", str)
    except Exception as e:
        return {"status": "fail", "data": e.args}

    base_query = Attraction.query

    # apply exact filters to base query
    if query_fields is not None:
        base_query = apply_search_filters(base_query, SEARCH_FIELDS, query_fields)
    if len(exact_filters) > 0:
        base_query = apply_exact_filters(base_query, exact_filters)
    if len(range_filters) > 0:
        base_query = apply_range_filters(base_query, range_filters)

    # apply sorting (with ID as secondary condition)
    base_query = base_query.order_by(sort_info, Attraction.id)

    ret = get_model_pages(base_query, page_info, attractions_schema)

    if ret["status"] == "success":
        ret["data"]["attractions"] = ret["data"].pop("instances")

    return ret


@attractions.route("/attractions/<string:id>", methods=["GET"])
def get_attraction(id) -> dict[str, Any]:
    ret = get_model_by_id(id, Attraction, attraction_schema)
    if ret["status"] == "success":
        ret["data"]["attraction"] = ret["data"].pop("instance")
        city_id = ret["data"]["attraction"]["city_id"]
        city_in = filter_field_by_id(city_id, City, cities_schema, "id", "city_in")
        charities = filter_field_by_id(
            city_id,
            Charity,
            charities_schema,
            "cityId",
            "charities",
            Charity.score.desc(),
            3,
        )
        reviews = filter_field_by_id(
            id,
            Review,
            reviews_schema,
            "attr_id",
            "reviews",
            Review.rating.desc(),
            3,
        )

        if city_in["status"] == "success":
            ret["data"]["attraction"]["city_in"] = city_in["data"].pop("city_in")[0]
        if charities["status"] == "success":
            ret["data"]["attraction"]["charities"] = charities["data"].pop("charities")
        if reviews["status"] == "success":
            ret["data"]["attraction"]["reviews"] = reviews["data"].pop("reviews")

    return ret

#!/usr/bin/env python
# encoding: utf-8

import sys
from app_init import db
from flask_sqlalchemy import Model
from typing import TypeVar, Union, Any
from flask_sqlalchemy.query import Query

# from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy import and_, or_, func


class PaginationInfo:
    def __init__(self, page, per_page) -> None:
        self.page = page
        self.per_page = per_page


T = TypeVar("T")


def parse_request_for_parameter(
    request_args, param_name, param_type, is_list=False
) -> Union[list, T]:
    if param_name in request_args:
        try:
            args = (
                request_args[param_name].split(",")
                if is_list
                else [request_args[param_name]]
            )

            to_return = list()

            for arg in args:
                if param_type == bool:
                    to_return.append(arg.lower() == "true")
                else:
                    to_return.append(param_type(arg))

            if is_list:
                return to_return
            return to_return[0]

        except Exception as e:
            print(e, file=sys.stderr)
            raise TypeError({param_name: param_name + " is invalid"})

    # in case of exception, use default handler
    if is_list:
        return list()
    return None


def parse_pagination_parameters(request_args) -> PaginationInfo:
    page = parse_request_for_parameter(request_args, "page", int) or 1
    page_size = parse_request_for_parameter(request_args, "per_page", int) or 20
    return PaginationInfo(page, page_size)


def get_model_pages(base_query, page_info, schema: T) -> dict[str, Any]:
    # make SQL request
    try:
        results = db.paginate(base_query)
        instances = schema.dump(results.items)
        print(instances)
    except Exception as e:
        print(e, file=sys.stderr)
        return {"status": "error", "message": "Data Fetch failed."}

    return {
        "status": "success",
        "data": {
            "page": page_info.page,
            "per_page": page_info.per_page,
            "results": len(instances),
            "total": results.total,
            "instances": instances,
        },
    }


def get_model_by_id(id, model, schema: T) -> dict[str, Any]:
    try:
        int_id = int(id)
        instance = model.query.get(int_id)
    except Exception as e:
        print(e, file=sys.stderr)
        return {"status": "fail", "data": {"id": "Invalid ID"}}

    if instance == None:
        return {"status": "error", "message": "Instance with that ID does not exist."}
    return {"status": "success", "data": {"instance": schema.dump(instance)}}


def filter_field_by_id(
    id,
    model,
    schema: T,
    model_attr,
    key_name,
    order_attr=None,
    limit=0,
) -> dict[str, Any]:
    try:
        int_id = int(id)
        to_unpack = dict()
        to_unpack[model_attr] = int_id
        instance = model.query.filter_by(**to_unpack)
    except Exception as e:
        print(e, file=sys.stderr)
        return {
            "status": "fail",
            "data": {"message": "No %s found" % type(model).__name__},
        }
    else:
        if order_attr is not None:
            instance = instance.order_by(order_attr)
        if limit != 0:
            instance = instance.limit(limit)
        return {"status": "success", "data": {key_name: schema.dump(instance)}}


def parse_sorting_field(request_args, sorting_fields, default) -> Any:
    # get search field name from request args
    sort_field = parse_request_for_parameter(request_args, "sort_field", str)

    # get ascending information from request args
    ascending_value = parse_request_for_parameter(request_args, "asc", str)
    ascending = False
    if ascending_value is not None:
        ascending = ascending_value.lower() == "true"

    chosen_field = default
    if sort_field is not None:
        chosen_field = next(
            filter(lambda f: f.name == sort_field, sorting_fields), default
        )

    if ascending:
        return chosen_field.asc()
    return chosen_field.desc()


def parse_exact_filters(request_args, exact_filter_fields) -> dict[Any, Any]:
    exact_filters = dict()
    for field in exact_filter_fields:
        field_name = field.name
        field_type = field.type.python_type
        if field_type is list:
            field_type = str
        result = parse_request_for_parameter(request_args, field_name, field_type, True)
        if len(result) > 0:
            exact_filters[field] = result
    return exact_filters


def apply_exact_filters(base_query, exact_filters) -> Query:
    filters = list()
    bool_filters = list()
    for field in exact_filters:
        if field.type.python_type is list:
            filters.append(field.contains(exact_filters[field]))
        elif field.type.python_type is bool:
            print(exact_filters)
            bool_filters.append((field, *exact_filters[field]))
        else:
            filters.append(field.in_(exact_filters[field]))
    base_query = base_query.filter(*filters)
    for bool_filter in bool_filters:
        base_query = base_query.filter(bool_filter[0] == bool_filter[1])
    return base_query


def parse_range_filters(request_args, range_filters) -> dict[Any, Any]:
    filters = dict()
    for field in range_filters:
        field_name = field.name
        lower_bound = parse_request_for_parameter(
            request_args, "min_" + field_name, field.type.python_type
        )
        upper_bound = parse_request_for_parameter(
            request_args, "max_" + field_name, field.type.python_type
        )
        if lower_bound is not None or upper_bound is not None:
            filters[field] = (lower_bound, upper_bound)
    return filters


def apply_range_filters(base_query, range_filters) -> Query:
    filters = list()
    for field in range_filters:
        lower_bound, upper_bound = range_filters[field]
        if lower_bound is not None:
            filters.append(field >= lower_bound)
        if upper_bound is not None:
            filters.append(field <= upper_bound)
    return base_query.filter(and_(*filters))


def apply_search_filters(base_query, fields, values) -> Query:
    base_search_string = "%"  # wildcard token for 0 or more
    for character in values.split(","):
        base_search_string += character.strip() + "%"
    print(base_search_string)
    search_args = list()
    for field in fields:
        if field.type.python_type is list:
            search_args.append(
                func.array_to_string(field, ",").ilike(base_search_string)
            )
        else:
            search_args.append(field.ilike(base_search_string))
    return base_query.filter(or_(*search_args))

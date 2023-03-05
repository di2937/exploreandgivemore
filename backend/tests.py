#!/usr/bin/env python
# encoding: utf-8

from unittest import main, TestCase, skipUnless
from endpoints.attractions import get_attraction, get_attractions
from endpoints.charities import get_charities, get_charity
from endpoints.cities import get_cities, get_city
from app_init import app

MISSING_ID: str = "Instance with that ID does not exist."
INVALID_PAGE_QUERY: str = "?page=0&per_page=15"
PAGINATION_QUERY: str = "?page=2&per_page=15"
DATA_FETCH_FAIL: str = "Data Fetch failed."
TEST_QUERY: str = "?sort_field=heritage"
DUP_QUERY_1: str = "?page=1&per_page=10"
DUP_QUERY_2: str = "?page=2&per_page=10"
BASE_ATTRACTIONS: str = "/attractions"
BASE_CHARITIES: str = "/charities"
BASE_CITIES: str = "/cities"

# testing suite flags
RUN_PHASE_2 = True
RUN_PHASE_3 = True
RUN_PHASE_4 = False
RUN_VANILLA = False
RUN_SORTS = False
RUN_FITLERS = False
RUN_SEARCHES = True


class UnitTests(TestCase):
    def setUp(self):
        pass

    # Tests for Cities endpoints
    # Author - Jarrod Brown

    # Test for getting cities:
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_1(self):
        url = BASE_CITIES
        with app.test_request_context(url):
            ret = get_cities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        self.assertEqual(ret["data"]["results"], 20)
        self.assertGreater(ret["data"]["total"], 0)
        self.assertNotIn("attractions", ret["data"]["cities"][0])
        self.assertNotIn("charities", ret["data"]["cities"][0])

    # Test for city pagination
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_2(self):
        url = BASE_CITIES + PAGINATION_QUERY
        with app.test_request_context(url):
            ret = get_cities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 2)
        self.assertEqual(ret["data"]["per_page"], 15)
        self.assertEqual(ret["data"]["results"], 15)
        self.assertGreater(ret["data"]["total"], 0)
        self.assertNotIn("attractions", ret["data"]["cities"][0])
        self.assertNotIn("charities", ret["data"]["cities"][0])

    # Test for city pagination: invalid page number
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_3(self):
        url = BASE_CITIES + INVALID_PAGE_QUERY
        with app.test_request_context(url):
            ret = get_cities()
        self.assertEqual(ret["status"], "error")
        self.assertEqual(ret["message"], DATA_FETCH_FAIL)

    # Test for city pagination: per_page number greater than total
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_4(self):
        url = BASE_CITIES + "?page=1&per_page=600"
        with app.test_request_context(url):
            ret = get_cities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 600)
        self.assertGreater(ret["data"]["total"], 0)
        self.assertEqual(ret["data"]["results"], ret["data"]["total"])
        self.assertNotIn("attractions", ret["data"]["cities"][0])
        self.assertNotIn("charities", ret["data"]["cities"][0])

    # Test for city pagination: access second page when per_page number greater than total
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_5(self):
        url = BASE_CITIES + "?page=2&per_page=600"
        with app.test_request_context(url):
            ret = get_cities()
        self.assertEqual(ret["status"], "error")
        self.assertEqual(ret["message"], DATA_FETCH_FAIL)

    # Test for city pagination: check duplicate value on consecutive pages
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_6(self):
        url1 = BASE_CITIES + DUP_QUERY_1
        url2 = BASE_CITIES + DUP_QUERY_2
        with app.test_request_context(url1):
            ret1 = get_cities()
        with app.test_request_context(url2):
            ret2 = get_cities()
        for i in ret1["data"]["cities"]:
            self.assertNotIn(i, ret2["data"]["cities"])

    # Test for getting city by id
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_7(self):
        url = BASE_CITIES + "/10"
        with app.test_request_context(url):
            ret = get_city(10)
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["city"]["id"], 10)
        self.assertIn("attractions", ret["data"]["city"])
        self.assertIn("charities", ret["data"]["city"])
        self.assertNotIn("page", ret["data"])
        self.assertNotIn("per_page", ret["data"])

    # Test for getting city by id: Invalid city id
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_8(self):
        url = BASE_CITIES + "/-1"
        with app.test_request_context(url):
            ret = get_city(-1)
        self.assertEqual(ret["status"], "error")
        self.assertEqual(ret["message"], MISSING_ID)

    # Tests for Charities endpoints
    # Author - Jarrod Brown

    # Test for getting charities
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_9(self):
        url = BASE_CHARITIES
        with app.test_request_context(url):
            ret = get_charities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        self.assertEqual(ret["data"]["results"], 20)
        self.assertGreater(ret["data"]["total"], 0)
        self.assertNotIn("attractions", ret["data"]["charities"][0])
        self.assertNotIn("cityId", ret["data"]["charities"][0])

    # Test for charity pagination
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_10(self):
        url = BASE_CHARITIES + PAGINATION_QUERY
        with app.test_request_context(url):
            ret = get_charities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 2)
        self.assertEqual(ret["data"]["per_page"], 15)
        self.assertEqual(ret["data"]["results"], 15)
        self.assertGreater(ret["data"]["total"], 0)
        self.assertNotIn("attractions", ret["data"]["charities"][0])
        self.assertNotIn("cityId", ret["data"]["charities"][0])

    # Test for charity pagination: invalid page number
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_11(self):
        url = BASE_CHARITIES + INVALID_PAGE_QUERY
        with app.test_request_context(url):
            ret = get_charities()
        self.assertEqual(ret["status"], "error")
        self.assertEqual(ret["message"], DATA_FETCH_FAIL)

    # Test for charity pagination: per_page number greater than total
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_12(self):
        url = BASE_CHARITIES + "?page=1&per_page=6000"
        with app.test_request_context(url):
            ret = get_charities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 6000)
        self.assertGreater(ret["data"]["total"], 0)
        self.assertEqual(ret["data"]["results"], ret["data"]["total"])
        self.assertNotIn("attractions", ret["data"]["charities"][0])
        self.assertNotIn("cityId", ret["data"]["charities"][0])

    # Test for charity pagination: access second page when per_page number greater than total
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_13(self):
        url = BASE_CHARITIES + "?page=2&per_page=6000"
        with app.test_request_context(url):
            ret = get_charities()
        self.assertEqual(ret["status"], "error")
        self.assertEqual(ret["message"], DATA_FETCH_FAIL)

    # Test for charity pagination: check duplicate value on consecutive pages
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_14(self):
        url1 = BASE_CHARITIES + DUP_QUERY_1
        url2 = BASE_CHARITIES + DUP_QUERY_2
        with app.test_request_context(url1):
            ret1 = get_charities()
        with app.test_request_context(url2):
            ret2 = get_charities()
        for i in ret1["data"]["charities"]:
            self.assertNotIn(i, ret2["data"]["charities"])

    # Test for getting charity by id
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_15(self):
        url = BASE_CHARITIES + "/10"
        with app.test_request_context(url):
            ret = get_charity(10)
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["charity"]["id"], 10)
        self.assertIn("attractions", ret["data"]["charity"])
        self.assertIn("cityId", ret["data"]["charity"])
        self.assertNotIn("page", ret["data"])
        self.assertNotIn("per_page", ret["data"])

    # Test for getting charity by id: Invalid charity id
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_16(self):
        url = BASE_CHARITIES + "/-1"
        with app.test_request_context(url):
            ret = get_charity(-1)
        self.assertEqual(ret["status"], "error")
        self.assertEqual(ret["message"], MISSING_ID)

    # Tests for Attractions endpoints
    # Author - Jarrod Brown

    # Test for getting attractions
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_17(self):
        url = BASE_ATTRACTIONS
        with app.test_request_context(url):
            ret = get_attractions()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        self.assertEqual(ret["data"]["results"], 20)
        self.assertGreater(ret["data"]["total"], 0)
        self.assertNotIn("charities", ret["data"]["attractions"][0])
        self.assertNotIn("city_id", ret["data"]["attractions"][0])

    # Test for attraction pagination
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_18(self):
        url = BASE_ATTRACTIONS + PAGINATION_QUERY
        with app.test_request_context(url):
            ret = get_attractions()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 2)
        self.assertEqual(ret["data"]["per_page"], 15)
        self.assertEqual(ret["data"]["results"], 15)
        self.assertGreater(ret["data"]["total"], 0)
        self.assertNotIn("charities", ret["data"]["attractions"][0])
        self.assertNotIn("city_id", ret["data"]["attractions"][0])

    # Test for attraction pagination: invalid page number
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_19(self):
        url = BASE_ATTRACTIONS + INVALID_PAGE_QUERY
        with app.test_request_context(url):
            ret = get_attractions()
        self.assertEqual(ret["status"], "error")
        self.assertEqual(ret["message"], DATA_FETCH_FAIL)

    # Test for attraction pagination: per_page number greater than total
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_20(self):
        url = BASE_ATTRACTIONS + "?page=1&per_page=3000"
        with app.test_request_context(url):
            ret = get_attractions()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 3000)
        self.assertGreater(ret["data"]["total"], 0)
        self.assertEqual(ret["data"]["results"], ret["data"]["total"])
        self.assertNotIn("charities", ret["data"]["attractions"][0])
        self.assertNotIn("city_id", ret["data"]["attractions"][0])

    # Test for attraction pagination: access second page when per_page number greater than total
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_21(self):
        url = BASE_ATTRACTIONS + "?page=2&per_page=3000"
        with app.test_request_context(url):
            ret = get_attractions()
        self.assertEqual(ret["status"], "error")
        self.assertEqual(ret["message"], DATA_FETCH_FAIL)

    # Test for attraction pagination: check duplicate value on consecutive pages
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_22(self):
        url1 = BASE_ATTRACTIONS + DUP_QUERY_1
        url2 = BASE_ATTRACTIONS + DUP_QUERY_2
        with app.test_request_context(url1):
            ret1 = get_attractions()
        with app.test_request_context(url2):
            ret2 = get_attractions()
        for i in ret1["data"]["attractions"]:
            self.assertNotIn(i, ret2["data"]["attractions"])

    # Test for getting attraction by id
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_23(self):
        url = BASE_ATTRACTIONS + "/10"
        with app.test_request_context(url):
            ret = get_attraction(10)
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["attraction"]["id"], 10)
        self.assertIn("charities", ret["data"]["attraction"])
        self.assertIn("city_id", ret["data"]["attraction"])
        self.assertNotIn("page", ret["data"])
        self.assertNotIn("per_page", ret["data"])

    # Test for getting attraction by id: Invalid attraction id
    @skipUnless(
        (RUN_PHASE_2 or RUN_VANILLA), "Skipping phase 2 and vanilla query unit tests"
    )
    def test_24(self):
        url = BASE_ATTRACTIONS + "/-1"
        with app.test_request_context(url):
            ret = get_attraction(-1)
        self.assertEqual(ret["status"], "error")
        self.assertEqual(ret["message"], MISSING_ID)

    # Tests for Phase III - Sorting
    # Author - Rik Ghosh

    # Test for sorting attraction with implicit ordering (default descending)
    @skipUnless(
        (RUN_PHASE_3 or RUN_SORTS), "Skipping phase 3 and non-sorting unit tests"
    )
    def test_25(self):
        url = BASE_ATTRACTIONS + "?sort_field=otm_rating"
        with app.test_request_context(url):
            ret = get_attractions()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        self.assertGreaterEqual(
            ret["data"]["attractions"][0]["otm_rating"],
            ret["data"]["attractions"][1]["otm_rating"],
        )

    # Test for sorting attraction with explicit descending ordering
    @skipUnless(
        (RUN_PHASE_3 or RUN_SORTS), "Skipping phase 3 and non-sorting unit tests"
    )
    def test_26(self):
        url = BASE_ATTRACTIONS + "?sort_field=city&asc=false"
        with app.test_request_context(url):
            ret = get_attractions()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        self.assertGreaterEqual(
            ret["data"]["attractions"][0]["city"], ret["data"]["attractions"][1]["city"]
        )

    # Test for sorting attraction with ascending ordering
    @skipUnless(
        (RUN_PHASE_3 or RUN_SORTS), "Skipping phase 3 and non-sorting unit tests"
    )
    def test_27(self):
        url = BASE_ATTRACTIONS + "?sort_field=city&asc=true"
        with app.test_request_context(url):
            ret = get_attractions()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        self.assertGreaterEqual(
            ret["data"]["attractions"][1]["state"],
            ret["data"]["attractions"][0]["state"],
        )

    # Test for sorting attraction with an invalid sorting field
    @skipUnless(
        (RUN_PHASE_3 or RUN_SORTS), "Skipping phase 3 and non-sorting unit tests"
    )
    def test_28(self):
        url1 = BASE_ATTRACTIONS + "?sort_field=country"  # no field called country
        url2 = BASE_ATTRACTIONS + TEST_QUERY  # field in model, but not sortable
        url3 = BASE_ATTRACTIONS  # vanilla query with no sorting
        with app.test_request_context(url1):
            ret1 = get_attractions()
        with app.test_request_context(url2):
            ret2 = get_attractions()
        with app.test_request_context(url3):
            ret3 = get_attractions()

        self.assertEqual(ret1["status"], "success")
        self.assertEqual(ret1["data"]["page"], 1)
        self.assertEqual(ret1["data"]["per_page"], 20)

        self.assertEqual(ret2["status"], "success")
        self.assertEqual(ret2["data"]["page"], 1)
        self.assertEqual(ret2["data"]["per_page"], 20)

        self.assertEqual(ret3["status"], "success")
        self.assertEqual(ret3["data"]["page"], 1)
        self.assertEqual(ret3["data"]["per_page"], 20)

        self.assertEqual(ret1["data"]["results"], ret3["data"]["results"])
        self.assertEqual(ret2["data"]["results"], ret3["data"]["results"])

        for i, attr in enumerate(ret3["data"]["attractions"]):
            self.assertEqual(attr, ret1["data"]["attractions"][i])
            self.assertEqual(attr, ret2["data"]["attractions"][i])

    # Test for sorting cities with implicit ordering (default descending)
    @skipUnless(
        (RUN_PHASE_3 or RUN_SORTS), "Skipping phase 3 and non-sorting unit tests"
    )
    def test_29(self):
        url = BASE_CITIES + "?sort_field=population"
        with app.test_request_context(url):
            ret = get_cities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        self.assertGreaterEqual(
            ret["data"]["cities"][0]["population"],
            ret["data"]["cities"][1]["population"],
        )

    # Test for sorting cities with explicit descending ordering
    @skipUnless(
        (RUN_PHASE_3 or RUN_SORTS), "Skipping phase 3 and non-sorting unit tests"
    )
    def test_30(self):
        url = BASE_CITIES + "?sort_field=safety&asc=false"
        with app.test_request_context(url):
            ret = get_cities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        self.assertGreaterEqual(
            ret["data"]["cities"][0]["safety"], ret["data"]["cities"][1]["safety"]
        )

    # Test for sorting cities with ascending ordering
    @skipUnless(
        (RUN_PHASE_3 or RUN_SORTS), "Skipping phase 3 and non-sorting unit tests"
    )
    def test_31(self):
        url = BASE_CITIES + "?sort_field=area&asc=true"
        with app.test_request_context(url):
            ret = get_cities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        self.assertGreaterEqual(
            ret["data"]["cities"][1]["area"], ret["data"]["cities"][0]["area"]
        )

    # Test for sorting cities with an invalid sorting field
    @skipUnless(
        (RUN_PHASE_3 or RUN_SORTS), "Skipping phase 3 and non-sorting unit tests"
    )
    def test_32(self):
        url1 = BASE_CITIES + TEST_QUERY  # no field called country
        url2 = BASE_CITIES + "?sort_field=state"  # field in model, but not sortable
        url3 = BASE_CITIES  # vanilla query with no sorting
        with app.test_request_context(url1):
            ret1 = get_cities()
        with app.test_request_context(url2):
            ret2 = get_cities()
        with app.test_request_context(url3):
            ret3 = get_cities()

        self.assertEqual(ret1["status"], "success")
        self.assertEqual(ret1["data"]["page"], 1)
        self.assertEqual(ret1["data"]["per_page"], 20)

        self.assertEqual(ret2["status"], "success")
        self.assertEqual(ret2["data"]["page"], 1)
        self.assertEqual(ret2["data"]["per_page"], 20)

        self.assertEqual(ret3["status"], "success")
        self.assertEqual(ret3["data"]["page"], 1)
        self.assertEqual(ret3["data"]["per_page"], 20)

        self.assertEqual(ret1["data"]["results"], ret3["data"]["results"])
        self.assertEqual(ret2["data"]["results"], ret3["data"]["results"])

        for i, attr in enumerate(ret3["data"]["cities"]):
            self.assertEqual(attr, ret1["data"]["cities"][i])
            self.assertEqual(attr, ret2["data"]["cities"][i])

    # Test for sorting charities with implicit ordering (default descending)
    @skipUnless(
        (RUN_PHASE_3 or RUN_SORTS), "Skipping phase 3 and non-sorting unit tests"
    )
    def test_33(self):
        url = BASE_CHARITIES + "?sort_field=rating"
        with app.test_request_context(url):
            ret = get_charities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        self.assertGreaterEqual(
            ret["data"]["charities"][0]["rating"], ret["data"]["charities"][1]["rating"]
        )

    # Test for sorting charities with explicit descending ordering
    @skipUnless(
        (RUN_PHASE_3 or RUN_SORTS), "Skipping phase 3 and non-sorting unit tests"
    )
    def test_34(self):
        url = BASE_CHARITIES + "?sort_field=city&asc=false"
        with app.test_request_context(url):
            ret = get_charities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        self.assertGreaterEqual(
            ret["data"]["charities"][0]["city"], ret["data"]["charities"][1]["city"]
        )

    # Test for sorting charities with ascending ordering
    @skipUnless(
        (RUN_PHASE_3 or RUN_SORTS), "Skipping phase 3 and non-sorting unit tests"
    )
    def test_35(self):
        url = BASE_CHARITIES + "?sort_field=causeArea&asc=true"
        with app.test_request_context(url):
            ret = get_charities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        self.assertGreaterEqual(
            ret["data"]["charities"][1]["causeArea"],
            ret["data"]["charities"][0]["causeArea"],
        )

    # Test for sorting charities with an invalid sorting field
    @skipUnless(
        (RUN_PHASE_3 or RUN_SORTS), "Skipping phase 3 and non-sorting unit tests"
    )
    def test_36(self):
        url1 = BASE_CHARITIES + TEST_QUERY  # no field called country
        url2 = (
            BASE_CHARITIES + "?sort_field=deductibility"
        )  # field in model, but not sortable
        url3 = BASE_CHARITIES  # vanilla query with no sorting
        with app.test_request_context(url1):
            ret1 = get_charities()
        with app.test_request_context(url2):
            ret2 = get_charities()
        with app.test_request_context(url3):
            ret3 = get_charities()

        self.assertEqual(ret1["status"], "success")
        self.assertEqual(ret1["data"]["page"], 1)
        self.assertEqual(ret1["data"]["per_page"], 20)

        self.assertEqual(ret2["status"], "success")
        self.assertEqual(ret2["data"]["page"], 1)
        self.assertEqual(ret2["data"]["per_page"], 20)

        self.assertEqual(ret3["status"], "success")
        self.assertEqual(ret3["data"]["page"], 1)
        self.assertEqual(ret3["data"]["per_page"], 20)

        self.assertEqual(ret1["data"]["results"], ret3["data"]["results"])
        self.assertEqual(ret2["data"]["results"], ret3["data"]["results"])

        for i, attr in enumerate(ret3["data"]["charities"]):
            self.assertEqual(attr, ret1["data"]["charities"][i])
            self.assertEqual(attr, ret2["data"]["charities"][i])

    # Tests for Phase III - Filtering
    # Author - Rik Ghosh

    # Test for filtering attractions with a single exact filter with single value
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_37(self):
        url = BASE_ATTRACTIONS + "?city=Austin"
        with app.test_request_context(url):
            ret = get_attractions()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        for attr in ret["data"]["attractions"]:
            self.assertEqual("Austin", attr["city"])

    # Test for filtering attractions with a single exact filter with multiple values
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_38(self):
        url = BASE_ATTRACTIONS + "?city=Las+Vegas%2CLos+Angeles%2CBoston"
        with app.test_request_context(url):
            ret = get_attractions()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        for attr in ret["data"]["attractions"]:
            self.assertIn(attr["city"], ["Las Vegas", "Los Angeles", "Boston"])

    # Test for filtering attractions with multiple exact filters with single values
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_39(self):
        url = BASE_ATTRACTIONS + "?state=CA&kinds=Museums&types=Tourist+Attraction"
        with app.test_request_context(url):
            ret = get_attractions()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        for attr in ret["data"]["attractions"]:
            self.assertEqual("CA", attr["state"])
            self.assertIn("Museums", attr["kinds"])
            self.assertIn("Tourist Attraction", attr["types"])

    # Test for filtering attractions with multiple exact filters with multiple values
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_40(self):
        url = (
            BASE_ATTRACTIONS
            + "?kinds=Museums%2CCinemas&types=Tourist+Attraction%2CPoint+Of+Interest"
        )
        with app.test_request_context(url):
            ret = get_attractions()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        for attr in ret["data"]["attractions"]:
            for kind in ["Museums", "Cinemas"]:
                self.assertIn(kind, attr["kinds"])
            for attr_type in ["Tourist Attraction", "Point Of Interest"]:
                self.assertIn(attr_type, attr["types"])

    # Test for filtering attractions with range filters
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_41(self):
        url = BASE_ATTRACTIONS + "?min_places_rating=3.0&max_places_rating=4.0"
        with app.test_request_context(url):
            ret = get_attractions()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        for attr in ret["data"]["attractions"]:
            self.assertGreaterEqual(attr["places_rating"], 3.0)
            self.assertLessEqual(attr["places_rating"], 4.0)

    # Test for filtering attractions with erroneous range filters
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_42(self):
        url = BASE_ATTRACTIONS + "?min_otm_rating=2&max_otm_rating=1"
        with app.test_request_context(url):
            ret = get_attractions()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        self.assertEqual(ret["data"]["results"], 0)
        self.assertFalse(ret["data"]["attractions"])

    # Test for filtering attractions when no entries match the filter
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_43(self):
        url = BASE_ATTRACTIONS + "?kinds=something%2Celse"
        with app.test_request_context(url):
            ret = get_attractions()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        self.assertEqual(ret["data"]["results"], 0)
        self.assertFalse(ret["data"]["attractions"])

    # Test for filtering attractions with an invalid exact filter field
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_44(self):
        url1 = BASE_ATTRACTIONS + "?foo=bar1"  # non-existant field
        url2 = BASE_ATTRACTIONS + "?name=Booth+Palace"  # non-fitlerable field
        url3 = BASE_ATTRACTIONS  # vanilla query with no filtering
        with app.test_request_context(url1):
            ret1 = get_attractions()
        with app.test_request_context(url2):
            ret2 = get_attractions()
        with app.test_request_context(url3):
            ret3 = get_attractions()

        self.assertEqual(ret1["status"], "success")
        self.assertEqual(ret1["data"]["page"], 1)
        self.assertEqual(ret1["data"]["per_page"], 20)

        self.assertEqual(ret2["status"], "success")
        self.assertEqual(ret2["data"]["page"], 1)
        self.assertEqual(ret2["data"]["per_page"], 20)

        self.assertEqual(ret3["status"], "success")
        self.assertEqual(ret3["data"]["page"], 1)
        self.assertEqual(ret3["data"]["per_page"], 20)

        self.assertEqual(ret1["data"]["results"], ret3["data"]["results"])
        self.assertEqual(ret2["data"]["results"], ret3["data"]["results"])

        for i, attr in enumerate(ret3["data"]["attractions"]):
            self.assertEqual(attr, ret1["data"]["attractions"][i])
            self.assertEqual(attr, ret2["data"]["attractions"][i])

    # Test for filtering cities with a single exact filter with single value
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_45(self):
        url = BASE_CITIES + "?state=NV"
        with app.test_request_context(url):
            ret = get_cities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        for city in ret["data"]["cities"]:
            self.assertEqual("NV", city["state"])

    # Test for filtering cities with a single exact filter with multiple values
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_46(self):
        url = BASE_CITIES + "?state=NM%2CMA%2COR"
        with app.test_request_context(url):
            ret = get_cities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        for city in ret["data"]["cities"]:
            self.assertIn(city["state"], ["NM", "MA", "OR"])

    # Test for filtering cities with multiple exact filters with single values
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_47(self):
        url = BASE_CITIES + "?timezone=UTC-7+(MST)&known_for=Outdoorsy"
        with app.test_request_context(url):
            ret = get_cities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        for city in ret["data"]["cities"]:
            self.assertEqual("UTC-7 (MST)", city["timezone"])
            self.assertIn("Outdoorsy", city["known_for"])

    # Test for filtering cities with exact filters with multiple values
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_48(self):
        url = BASE_CITIES + "?known_for=Ski+Town%2CCharming%2CFoodie"
        with app.test_request_context(url):
            ret = get_cities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        for city in ret["data"]["cities"]:
            for known_for in ["Ski Town", "Charming", "Foodie"]:
                self.assertIn(known_for, city["known_for"])

    # Test for filtering cities with range filters
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_49(self):
        url = BASE_CITIES + "?min_safety=1&max_safety=4"
        with app.test_request_context(url):
            ret = get_cities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        for city in ret["data"]["cities"]:
            self.assertGreaterEqual(city["safety"], 3)
            self.assertLessEqual(city["safety"], 4)

    # Test for filtering cities with erroneous range filters
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_50(self):
        url = BASE_CITIES + "?min_population=12000&max_population=10"
        with app.test_request_context(url):
            ret = get_cities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        self.assertEqual(ret["data"]["results"], 0)
        self.assertFalse(ret["data"]["cities"])

    # Test for filtering cities when no entries match the filter
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_51(self):
        url = BASE_CITIES + "?known_for=value+unknown"
        with app.test_request_context(url):
            ret = get_cities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        self.assertEqual(ret["data"]["results"], 0)
        self.assertFalse(ret["data"]["cities"])

    # Test for filtering cities with an invalid exact filter field
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_52(self):
        url1 = BASE_CITIES + "?foo=bar2"  # non-existant field
        url2 = BASE_CITIES + "?latitude=42.0345"  # non-fitlerable field
        url3 = BASE_CITIES  # vanilla query with no filtering
        with app.test_request_context(url1):
            ret1 = get_cities()
        with app.test_request_context(url2):
            ret2 = get_cities()
        with app.test_request_context(url3):
            ret3 = get_cities()

        self.assertEqual(ret1["status"], "success")
        self.assertEqual(ret1["data"]["page"], 1)
        self.assertEqual(ret1["data"]["per_page"], 20)

        self.assertEqual(ret2["status"], "success")
        self.assertEqual(ret2["data"]["page"], 1)
        self.assertEqual(ret2["data"]["per_page"], 20)

        self.assertEqual(ret3["status"], "success")
        self.assertEqual(ret3["data"]["page"], 1)
        self.assertEqual(ret3["data"]["per_page"], 20)

        self.assertEqual(ret1["data"]["results"], ret3["data"]["results"])
        self.assertEqual(ret2["data"]["results"], ret3["data"]["results"])

        for i, city in enumerate(ret3["data"]["cities"]):
            self.assertEqual(city, ret1["data"]["cities"][i])
            self.assertEqual(city, ret2["data"]["cities"][i])

    # Test for filtering charities with a single exact filter with single value
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_53(self):
        url = BASE_CHARITIES + "?city=Austin"
        with app.test_request_context(url):
            ret = get_charities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        for charity in ret["data"]["charities"]:
            self.assertEqual("Austin", charity["city"])

    # Test for filtering charities with a single exact filter with multiple values
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_54(self):
        url = BASE_CHARITIES + "?state=NM%2CMA%2COR"
        with app.test_request_context(url):
            ret = get_charities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        for charity in ret["data"]["charities"]:
            self.assertIn(charity["state"], ["NM", "MA", "OR"])

    # Test for filtering charities with multiple exact filters with single values
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_55(self):
        url = BASE_CHARITIES + "?city=Miami&state=FL"
        with app.test_request_context(url):
            ret = get_charities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        for charity in ret["data"]["charities"]:
            self.assertEqual("Miami", charity["city"])
            self.assertEqual("FL", charity["state"])

    # Test for filtering charities with range filters
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_56(self):
        url = BASE_CHARITIES + "?min_rating=1&max_rating=2"
        with app.test_request_context(url):
            ret = get_charities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        for charity in ret["data"]["charities"]:
            self.assertGreaterEqual(charity["rating"], 1)
            self.assertLessEqual(charity["rating"], 2)

    # Test for filtering charities with erroneous range filters
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_57(self):
        url = BASE_CITIES + "?min_rating=4&max_rating=0"
        with app.test_request_context(url):
            ret = get_charities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        self.assertEqual(ret["data"]["results"], 0)
        self.assertFalse(ret["data"]["charities"])

    # Test for filtering charities when no entries match the filter
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_58(self):
        url = BASE_CHARITIES + "?state=missing"
        with app.test_request_context(url):
            ret = get_charities()
        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)
        self.assertEqual(ret["data"]["results"], 0)
        self.assertFalse(ret["data"]["charities"])

    # Test for filtering charities with an invalid exact filter field
    @skipUnless(
        (RUN_PHASE_3 or RUN_FITLERS), "Skipping phase 3 and non-filtering unit tests"
    )
    def test_59(self):
        url1 = BASE_CHARITIES + "?foo=bar3"  # non-existant field
        url2 = BASE_CHARITIES + "?name=COPD+Foundation"  # non-fitlerable field
        url3 = BASE_CHARITIES  # vanilla query with no filtering
        with app.test_request_context(url1):
            ret1 = get_charities()
        with app.test_request_context(url2):
            ret2 = get_charities()
        with app.test_request_context(url3):
            ret3 = get_charities()

        self.assertEqual(ret1["status"], "success")
        self.assertEqual(ret1["data"]["page"], 1)
        self.assertEqual(ret1["data"]["per_page"], 20)

        self.assertEqual(ret2["status"], "success")
        self.assertEqual(ret2["data"]["page"], 1)
        self.assertEqual(ret2["data"]["per_page"], 20)

        self.assertEqual(ret3["status"], "success")
        self.assertEqual(ret3["data"]["page"], 1)
        self.assertEqual(ret3["data"]["per_page"], 20)

        self.assertEqual(ret1["data"]["results"], ret3["data"]["results"])
        self.assertEqual(ret2["data"]["results"], ret3["data"]["results"])

        for i, charity in enumerate(ret3["data"]["charities"]):
            self.assertEqual(charity, ret1["data"]["charities"][i])
            self.assertEqual(charity, ret2["data"]["charities"][i])

    # Tests for Phase III - Searching
    # Author - Rik Ghosh

    # Test for searching in attractions
    @skipUnless(
        (RUN_PHASE_3 or RUN_SEARCHES), "Skipping phase 3 and non-searching unit tests"
    )
    def test_60(self):
        url = BASE_ATTRACTIONS + "?query=Military+Museums"
        with app.test_request_context(url):
            ret = get_attractions()

        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)

        for attr in ret["data"]["attractions"]:
            self.assertIn("Military Museums", attr["kinds"])

    # Test for searching in cities
    @skipUnless(
        (RUN_PHASE_3 or RUN_SEARCHES), "Skipping phase 3 and non-searching unit tests"
    )
    def test_61(self):
        url = BASE_CITIES + "?query=History"
        with app.test_request_context(url):
            ret = get_cities()

        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)

        for city in ret["data"]["cities"]:
            self.assertIn("History", city["known_for"])

    # Test for searching in charities
    @skipUnless(
        (RUN_PHASE_3 or RUN_SEARCHES), "Skipping phase 3 and non-searching unit tests"
    )
    def test_62(self):
        url = BASE_CHARITIES + "?query=Services"
        with app.test_request_context(url):
            ret = get_charities()

        self.assertEqual(ret["status"], "success")
        self.assertEqual(ret["data"]["page"], 1)
        self.assertEqual(ret["data"]["per_page"], 20)

        for charity in ret["data"]["charities"]:
            one_match = False
            for area in charity["causeArea"]:
                if "Services" in area:
                    one_match = True
                    break
            self.assertTrue(one_match)

    # Test for search yielding nothing
    @skipUnless(
        (RUN_PHASE_3 or RUN_SEARCHES), "Skipping phase 3 and non-searching unit tests"
    )
    def test_63(self):
        url1 = BASE_ATTRACTIONS + "?query=not+going+to+match1"
        url2 = BASE_CITIES + "?query=not+going+to+match2"
        url3 = BASE_CHARITIES + "?query=not+going+to+match3"
        with app.test_request_context(url1):
            ret1 = get_attractions()
        with app.test_request_context(url2):
            ret2 = get_cities()
        with app.test_request_context(url3):
            ret3 = get_charities()

        self.assertEqual(ret1["data"]["results"], 0)
        self.assertEqual(ret2["data"]["results"], 0)
        self.assertEqual(ret3["data"]["results"], 0)

    # Test for multiple searches query
    @skipUnless(
        (RUN_PHASE_3 or RUN_SEARCHES), "Skipping phase 3 and non-searching unit tests"
    )
    def test_64(self):
        url = BASE_CITIES + "?query=Nightlife%2CMusic"
        with app.test_request_context(url):
            ret = get_cities()

        for city in ret["data"]["cities"]:
            self.assertIn("Nightlife", city["known_for"])
            self.assertIn("Music", city["known_for"])

    # Test for site-wide search query
    @skipUnless(
        (RUN_PHASE_3 or RUN_SEARCHES), "Skipping phase 3 and non-searching unit tests"
    )
    def test_65(self):
        search_string = "?query=Austin"
        url1 = BASE_ATTRACTIONS + search_string
        url2 = BASE_CITIES + search_string
        url3 = BASE_CHARITIES + search_string
        with app.test_request_context(url1):
            ret1 = get_attractions()
        with app.test_request_context(url2):
            ret2 = get_cities()
        with app.test_request_context(url3):
            ret3 = get_charities()

        for attr in ret1["data"]["attractions"]:
            SEARCH_FIELDS = ["name", "city", "state", "types", "kinds"]
            found_once = False
            for search_field in SEARCH_FIELDS:
                if "Austin" in attr[search_field]:
                    found_once = True
                    break
            self.assertTrue(found_once)
        for city in ret2["data"]["cities"]:
            SEARCH_FIELDS = ["name", "state", "known_for"]
            found_once = False
            for search_field in SEARCH_FIELDS:
                if "Austin" in city[search_field]:
                    found_once = True
                    break
            self.assertTrue(found_once)
        for charity in ret3["data"]["charities"]:
            SEARCH_FIELDS = ["name", "city", "state", "causeArea", "deductibility"]
            found_once = False
            for search_field in SEARCH_FIELDS:
                if "Austin" in charity[search_field]:
                    found_once = True
                    break
            self.assertTrue(found_once)


if __name__ == "__main__":
    main()

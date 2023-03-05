#!/usr/bin/env python
# encoding: utf-8

from app_init import db, app
from models.city import City
from models.charity import Charity
from models.attraction import Attraction
from models.review import Review
import json


def create_table():
    # add context manager
    with app.app_context():
        db.drop_all()  # drop all tables from the database
        db.create_all()  # create all tables


def add_cities():
    with app.app_context():
        f = open("json_source/cities.json", "r", encoding="utf8")
        data = json.load(f)
        for city in data:
            # create a city instance
            new_city = City(**city)  # using dict unpacking
            db.session.add(new_city)
        db.session.commit()


# applying logic from populate-charities.py
def add_charities():
    with app.app_context():
        f = open("json_source/charities.json", "r", encoding="utf8")
        data = json.load(f)
        new_charities = []
        city_id = 0
        for index in range(len(data)):
            charities = data[index]
            # if there are charities for this city, increment the city_id
            if len(charities) != 0:
                city_id += 1
            # this loop won't be entered if there aren't any charities in this city,
            # and the city_id won't be incremented above if that's the case
            for charity in charities:
                # create charity instance
                new_charity = Charity(
                    name=charity["charityName"],
                    score=charity["currentRating"]["score"],
                    rating=charity["currentRating"]["rating"],
                    ratingImage=charity["currentRating"]["ratingImage"]["large"],
                    city=charity["mailingAddress"]["city"],
                    state=charity["mailingAddress"]["stateOrProvince"],
                    deductibility=charity["irsClassification"]["deductibility"],
                    ein=charity["ein"],
                    classification=charity["irsClassification"]["classification"],
                    website=charity["websiteURL"],
                    irsSubsection=charity["irsClassification"]["subsection"],
                    financialRating=charity["currentRating"]["financialRating"][
                        "score"
                    ],
                    accountabilityRating=charity["currentRating"][
                        "accountabilityRating"
                    ]["score"],
                    cityId=city_id,
                    iframe_render=charity["iframe_render"],
                )
                new_charity.mission = charity["mission"]
                # if a cause field present, populate it
                if "cause" in charity:
                    new_charity.causeArea = charity["cause"]["causeName"]
                # only some charities have a category, and it's less informative than
                # cause, so only populate if cause isn't present
                elif "category" in charity:
                    new_charity.causeArea = charity["category"]["categoryName"]
                new_charities += [new_charity]
        db.session.add_all(new_charities)
        db.session.commit()


def add_attractions():
    with app.app_context():
        f = open("json_source/attractions.json", "r", encoding="utf8")
        data = json.load(f)
        for attraction in data:
            # create a attraction instance
            new_attraction = Attraction(**attraction)  # using dict unpacking
            db.session.add(new_attraction)
        db.session.commit()


def add_reviews():
    with app.app_context():
        f = open("json_source/reviews.json", "r", encoding="utf8")
        data = json.load(f)
        for review in data:
            new_review = Review(**review)  # using dict unpacking
            db.session.add(new_review)
        db.session.commit()


if __name__ == "__main__":
    create_table()
    add_cities()
    add_charities()
    add_attractions()
    add_reviews()

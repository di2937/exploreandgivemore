import os
import sys
from sqlalchemy.dialects import postgresql

# add parent directory to the PYTHONPATH
sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir))
)

from app_init import db, ma, app

# Attraction Model
class Attraction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    city = db.Column(db.Text)
    state = db.Column(db.Text)
    city_id = db.Column(db.Integer)

    # Coming from OpenMapTrip API →
    kinds = db.Column(postgresql.ARRAY(db.String()))
    description = db.Column(db.Text)
    otm_rating = db.Column(db.Float)
    heritage = db.Column(db.Boolean)
    website = db.Column(db.Text)
    image_url = db.Column(db.Text)

    # Coming from Google Places API →
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    attr_summary = db.Column(db.Text)
    opening_hours = db.Column(postgresql.ARRAY(db.String()))
    places_rating = db.Column(db.Float)
    types = db.Column(postgresql.ARRAY(db.String()))
    contact = db.Column(db.Text)

    iframe_render = db.Column(db.Boolean)

    def __init__(
        self,
        name: str = "No Name",
        city: str = "No City",
        state: str = "No State",
        city_id: int = 0,
        kinds: list[str] = None,
        description: str = "No Description",
        otm_rating: float = 0.0,
        heritage: bool = False,
        website: str = "404",
        image_url: str = "404",
        latitude: float = 0.0,
        longitude: float = 0.0,
        attr_summary: str = "No Summary",
        opening_hours: list[str] = None,
        places_rating: float = 0.0,
        types: list[str] = None,
        contact: str = "No Contact",
        iframe_render: bool = False,
    ) -> None:

        # populate fields
        self.name = name
        self.city = city
        self.state = state
        self.city_id = city_id
        self.kinds = kinds
        self.description = description
        self.otm_rating = otm_rating
        self.heritage = heritage
        self.website = website
        self.image_url = image_url
        self.latitude = latitude
        self.longitude = longitude
        self.attr_summary = attr_summary
        self.opening_hours = opening_hours
        self.places_rating = places_rating
        self.types = types
        self.contact = contact
        self.iframe_render = iframe_render


# Attraction Schema
class AttractionSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "name",
            "city",
            "state",
            "city_id",
            "kinds",
            "description",
            "otm_rating",
            "heritage",
            "website",
            "image_url",
            "latitude",
            "longitude",
            "attr_summary",
            "opening_hours",
            "places_rating",
            "types",
            "contact",
            "reviews",
            "iframe_render",
        )


# Attractions Schema
class AttractionsSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "name",
            "city",
            "state",
            "kinds",
            "otm_rating",
            "heritage",
            "image_url",
            "places_rating",
            "types",
        )


attraction_schema = AttractionSchema()
attractions_schema = AttractionsSchema(many=True)


with app.app_context():
    db.create_all()  # create tables

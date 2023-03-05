import os
import sys
from sqlalchemy.dialects import postgresql

# add parent directory to the PYTHONPATH
sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir))
)

from app_init import db, ma, app

# City Model
class City(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    state = db.Column(db.Text)

    population = db.Column(db.Integer)
    walk_score_url = db.Column(db.Text)
    google_events_url = db.Column(db.Text)
    budget = db.Column(db.Float)
    safety = db.Column(db.Float)
    known_for = db.Column(postgresql.ARRAY(db.String()))

    elevation = db.Column(db.Integer)
    timezone = db.Column(db.Text)

    # geo-coding information
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

    area = db.Column(db.Float)
    population_density = db.Column(db.Float)

    average_rating = db.Column(db.Float)
    image_url = db.Column(db.Text)
    description = db.Column(db.Text)

    num_charities = db.Column(db.Integer)

    def __init__(
        self,
        name: str = "No Name",
        state: str = "No State",
        population: int = 0,
        walk_score_url: str = "404",
        google_events_url: str = "404",
        budget: int = 0,
        safety: int = 0,
        known_for: list[str] = None,
        elevation: int = 0,
        timezone: str = "No Timezone",
        latitude: float = 0.0,
        longitude: float = 0.0,
        area: float = 0.0,
        population_density: float = 0.0,
        average_rating: float = 0.0,
        image_url: str = "404",
        description: str = "No Description",
        num_charities: int = 0,
    ) -> None:

        # populate fields
        self.name = name
        self.state = state
        self.population = population
        self.walk_score_url = walk_score_url
        self.google_events_url = google_events_url
        self.budget = budget
        self.safety = safety
        self.known_for = known_for
        self.elevation = elevation
        self.timezone = timezone
        self.latitude = latitude
        self.longitude = longitude
        self.area = area
        self.population_density = population_density
        self.average_rating = average_rating
        self.image_url = image_url
        self.description = description
        self.num_charities = num_charities


# City Schema
class CitySchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "name",
            "state",
            "population",
            "walk_score_url",
            "google_events_url",
            "budget",
            "safety",
            "known_for",
            "elevation",
            "timezone",
            "latitude",
            "longitude",
            "area",
            "population_density",
            "average_rating",
            "image_url",
            "description",
        )


# Cities Schema
class CitiesSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "name",
            "state",
            "population",
            "budget",
            "safety",
            "known_for",
            "elevation",
            "timezone",
            "latitude",
            "longitude",
            "area",
            "population_density",
            "average_rating",
            "image_url",
            "num_charities"
        )


city_schema = CitySchema()
cities_schema = CitiesSchema(many=True)


with app.app_context():
    db.create_all()  # create tables

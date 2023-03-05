import os
import sys
from sqlalchemy.dialects import postgresql

# add parent directory to the PYTHONPATH
sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir))
)

from app_init import db, ma, app

# Charity Model
class Charity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    score = db.Column(db.Float)
    rating = db.Column(db.Float)
    ratingImage = db.Column(db.Text)
    city = db.Column(db.Text)
    state = db.Column(db.Text)
    causeArea = db.Column(postgresql.ARRAY(db.String()))
    deductibility = db.Column(db.Text)
    ein = db.Column(db.Text)
    mission = db.Column(db.Text)
    classification = db.Column(db.Text)
    website = db.Column(db.Text)
    irsSubsection = db.Column(db.Text)
    financialRating = db.Column(db.Text)
    accountabilityRating = db.Column(db.Text)
    cityId = db.Column(db.Integer)
    iframe_render = db.Column(db.Boolean)


def __init__(
    self,
    name: str = "No Name",
    score: float = 0.0,
    rating: float = 0.0,
    ratingImage: str = "404",
    city: str = "No City",
    state: str = "No State",
    causeArea: list[str] = None,
    deductibility: str = "No Deductibility",
    ein: str = "No EIN",
    mission: str = "No Mission",
    classification: str = "No Classification",
    website: str = "404",
    irsSubsection: str = "No IRS Subsection",
    financialRating: str = "No Financial Rating",
    accountabilityRating: str = "No Accountability Rating",
    cityId: int = -1,
    iframe_render: bool = False,
) -> None:
    self.name = name
    self.score = score
    self.rating = rating
    self.ratingImage = ratingImage
    self.city = city
    self.state = state
    self.causeArea = causeArea
    self.deductibility = deductibility
    self.ein = ein
    self.mission = mission
    self.classification = classification
    self.website = website
    self.irsSubsection = irsSubsection
    self.financialRating = financialRating
    self.accountabilityRating = accountabilityRating
    self.cityId = cityId
    self.iframe_render = iframe_render


# Charity Schema
class CharitySchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "name",
            "score",
            "rating",
            "ratingImage",
            "city",
            "state",
            "causeArea",
            "deductibility",
            "ein",
            "mission",
            "classification",
            "website",
            "irsSubsection",
            "financialRating",
            "accountabilityRating",
            "cityId",
            "iframe_render",
        )


# Charities Schema
class CharitiesSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "name",
            "website",
            "rating",
            "city",
            "state",
            "causeArea",
            "deductibility",
        )


# Init schema
charity_schema = CharitySchema()
charities_schema = CharitiesSchema(many=True)

# Create tables
with app.app_context():
    db.create_all()

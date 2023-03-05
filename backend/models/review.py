import os
import sys

# add parent directory to the PYTHONPATH
sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir))
)

from app_init import db, ma, app

# Review Model
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author_name = db.Column(db.Text)
    author_url = db.Column(db.Text)
    author_photo = db.Column(db.Text)
    rating = db.Column(db.Integer)
    text = db.Column(db.Text)
    attr_id = db.Column(db.Integer)

    def __init__(
        self,
        author_name: str = "No Name",
        author_url: str = "404",
        author_photo: str = "404",
        rating: int = 0,
        text: str = "No Text",
        attr_id: int = 0,
    ) -> None:

        # populate field
        self.author_name = author_name
        self.author_url = author_url
        self.author_photo = author_photo
        self.rating = rating
        self.text = text
        self.attr_id = attr_id


# Review Schema
class ReviewSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "author_name",
            "author_url",
            "author_photo",
            "rating",
            "text",
            "attr_id",
        )


reviews_schema = ReviewSchema(many=True)


with app.app_context():
    db.create_all()  # create tables

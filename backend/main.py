#!/usr/bin/env python
# encoding: utf-8

import os
from endpoints.cities import cities
from endpoints.charities import charities
from endpoints.attractions import attractions
from app_init import app

# Add blueprints for routing below ↓
app.register_blueprint(cities)
app.register_blueprint(charities)
app.register_blueprint(attractions)


@app.route("/")
def hello_world():
    name = os.environ.get("NAME", "Explore & Give More")
    return "Welcome to {} Backend!".format(name)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))

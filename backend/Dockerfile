# This Dockerfile has been constructed using the Deploy a Python service to Cloud Run documentation as a reference
# Please find the link here: https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-python-service

FROM ubuntu:latest

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True
ENV DEBIAN_FRONTEND=noninteractive


RUN apt-get update  -y
RUN apt-get install -y python3
RUN apt-get install -y python3-pip python3-dev build-essential vim
RUN apt-get install -y libmysqlclient-dev libpq-dev postgresql

# Copy local code to the container image
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

# Install production dependencies
RUN pip install --no-cache-dir -r requirements.txt

ENV PORT 8080

# Timeout is set to 0 to disable the timeouts of the workers to allow Cloud Run to handle instance scaling
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app
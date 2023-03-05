.DEFAULT_GOAL	:= all
SHELL			:= /bin/bash

CURR_DIR		= $(shell pwd)
FRONTEND_DIR	= frontend
BACKEND_DIR		= backend

# run docker on front-end
docker-frontend:
	docker run \
		--rm \
		-it \
		-v $(CURR_DIR)/$(FRONTEND_DIR):/app \
		-w /app \
		-p 3001:3000 \
		rikghosh/frontend:1.0

all:

# install all npm packages for the frontend in the package.json file
install:
	(cd $(FRONTEND_DIR) && npm install)

# start running the server
start:
	(cd $(FRONTEND_DIR) && npm start)

# combination of above two methods
run:
	$(MAKE) install
	$(MAKE) start

# python tests for backend
python-tests:
	echo "Running Python backend tests"
	python3 $(BACKEND_DIR)/tests.py

selenium-tests:
# selenium tests for frontend gui
	python3 $(FRONTEND_DIR)/tests/guitests.py

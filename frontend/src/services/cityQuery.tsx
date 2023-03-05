import City from "../views/Cities/City";

const parseJSONCityGrid = (rawCityList: any) => {
	const cityList: City[] = [];

	for (let rawCity of rawCityList) {
		let city: City = {
			id: rawCity["id"],
			name: rawCity["name"],
			state: rawCity["state"],
			population: rawCity["population"],
			budget: rawCity["budget"],
			safety: rawCity["safety"],
			knownFor: rawCity["known_for"],
			elevation: rawCity["elevation"],
			timezone: rawCity["timezone"],
			latitude: rawCity["latitude"],
			longitude: rawCity["longitude"],
			area: rawCity["area"],
			populationDensity: rawCity["population_density"],
			averageRating: rawCity["average_rating"],
			imageUrl: rawCity["image_url"],
			walkScoreURL: "",
			googleEventsURL: "",
			description: "",
			attractions: [],
			charities: [],
			numCharities: rawCity["num_charities"]
		};

		cityList.push(city);
	}

	return cityList;
};

const parseJSONCityInstance = (rawCity: any) => {
	let city: City = {
		id: rawCity["id"],
		name: rawCity["name"],
		state: rawCity["state"],
		population: rawCity["population"],
		walkScoreURL: rawCity["walk_score_url"],
		googleEventsURL: rawCity["google_events_url"],
		budget: rawCity["budget"],
		safety: rawCity["safety"],
		knownFor: rawCity["known_for"],
		elevation: rawCity["elevation"],
		timezone: rawCity["timezone"],
		latitude: rawCity["latitude"],
		longitude: rawCity["longitude"],
		area: rawCity["area"],
		populationDensity: rawCity["population_density"],
		averageRating: rawCity["average_rating"],
		description: rawCity["description"],
		imageUrl: rawCity["image_url"],
		attractions: [],
		charities: [],
		numCharities: 0
	};

	return city;
};

export { parseJSONCityGrid, parseJSONCityInstance };

import Attraction from "../views/Attractions/Attraction";
import { parseJSONCharityGrid } from "./charityParser";
import { parseJSONCityInstance } from "./cityQuery";
import Review from "../views/Attractions/Reviews";

const parseJSONAttractionGrid = (rawAttractionList: any) => {
	const attractionList: Attraction[] = [];

	for (let rawAttraction of rawAttractionList) {
		let attraction: Attraction = {
			id: rawAttraction["id"],
			name: rawAttraction["name"],
			city: rawAttraction["city"],
			state: rawAttraction["state"],
			cityId: 0,
			kinds: rawAttraction["kinds"],
			description: "",
			otmRating: rawAttraction["otm_rating"],
			heritage: rawAttraction["heritage"],
			website: "",
			imageURL: rawAttraction["image_url"],
			latitude: 0.0,
			longitude: 0.0,
			attractionSummary: "",
			openingHours: [],
			placesRating: rawAttraction["places_rating"],
			types: rawAttraction["types"],
			contact: "",
			reviews: [],
			cityIn: null,
			charities: [],
			iframeRender: false
		};

		attractionList.push(attraction);
	}

	return attractionList;
};

const parseJSONReviews = (rawReviews: any) => {
	const reviewList: Review[] = [];

	for (let rawReview of rawReviews) {
		let review: Review = {
			id: rawReview["id"],
			authorName: rawReview["author_name"],
			authorURL: rawReview["author_url"],
			authorPhoto: rawReview["author_photo"],
			rating: rawReview["rating"],
			text: rawReview["text"],
			attractioniId: rawReview["attr_id"]
		};

		reviewList.push(review);
	}

	return reviewList;
};

const parseJSONAttractionInstance = (rawAttraction: any) => {
	const attraction: Attraction = {
		id: rawAttraction["id"],
		name: rawAttraction["name"],
		city: rawAttraction["city"],
		state: rawAttraction["state"],
		cityId: rawAttraction["city_id"],
		kinds: rawAttraction["kinds"],
		description: rawAttraction["description"],
		otmRating: rawAttraction["otm_rating"],
		heritage: rawAttraction["heritage"],
		website: rawAttraction["website"],
		imageURL: rawAttraction["image_url"],
		latitude: rawAttraction["latitude"],
		longitude: rawAttraction["longitude"],
		attractionSummary: rawAttraction["attr_summary"],
		openingHours: rawAttraction["opening_hours"],
		placesRating: rawAttraction["places_rating"],
		types: rawAttraction["types"],
		contact: rawAttraction["contact"],
		reviews:
			rawAttraction["reviews"].length !== 0
				? parseJSONReviews(rawAttraction["reviews"])
				: null,
		cityIn: rawAttraction.hasOwnProperty("city_in")
			? parseJSONCityInstance(rawAttraction["city_in"])
			: null,
		charities: rawAttraction.hasOwnProperty("charities")
			? parseJSONCharityGrid(rawAttraction["charities"])
			: null,
		iframeRender: rawAttraction["iframe_render"]
	};

	return attraction;
};

export { parseJSONAttractionGrid, parseJSONAttractionInstance };

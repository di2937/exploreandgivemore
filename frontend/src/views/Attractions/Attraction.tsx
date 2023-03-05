import CharityObj from "../Charities/Charity";
import City from "../Cities/City";
import Review from "./Reviews";

interface Attraction {
	id: number;
	name: string;
	city: string;
	state: string;
	cityId: number;
	kinds: string[];
	description: string;
	otmRating: number;
	heritage: boolean;
	website: string;
	imageURL: string;
	latitude: number;
	longitude: number;
	attractionSummary: string;
	openingHours: string[];
	placesRating: number;
	types: string[];
	contact: string;
	reviews: Review[] | null;
	cityIn: City | null;
	charities: CharityObj[] | null;
	iframeRender: boolean;
}

export default Attraction;

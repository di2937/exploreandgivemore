import Attraction from "../Attractions/Attraction";
import CharityObj from "../Charities/Charity";

interface City {
	id: string;
	name: string;
	state: string;
	population: number;
	walkScoreURL: string;
	googleEventsURL: string;
	budget: number;
	safety: number;
	knownFor: string[];
	elevation: number;
	timezone: string;
	latitude: number;
	longitude: number;
	area: number;
	populationDensity: number;
	averageRating: number;
	description: string;
	imageUrl: string;
	attractions: Attraction[];
	charities: CharityObj[];
	numCharities: number;
}

export default City;

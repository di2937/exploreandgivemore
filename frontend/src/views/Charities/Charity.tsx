import Attraction from "../Attractions/Attraction";
import City from "../Cities/City";

interface CharityObj {
	id: string;
	name: string;
	score: number;
	rating: number;
	ratingImage: string;
	city: string;
	state: string;
	causeArea: string[] | null;
	deductibility: string;
	ein: string;
	mission: string;
	classification: string;
	website: string;
	irsSubsection: string;
	financialRating: number;
	accountabilityRating: number;
	Attractions?: Attraction[];
	cityIn: any | undefined;
	iframeRender: boolean;
}

export default CharityObj;

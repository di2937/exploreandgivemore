import cityImage from "../../images/home/cities.jpg";
import attractionImage from "../../images/home/attractions.jpg";
import charityImage from "../../images/home/charity.jpg";

interface Entry {
	name: string;
	desc: string;
	img: any;
	link: string;
}

const MODELS: Entry[] = [
	{
		name: "Cities",
		desc: "Explore a new city",
		img: cityImage,
		link: "/cities"
	},
	{
		name: "Attractions",
		desc: "Discover New Attractions",
		img: attractionImage,
		link: "/attractions"
	},
	{
		name: "Charities",
		desc: "Learn about different charities",
		img: charityImage,
		link: "/charities"
	}
];

export { MODELS };

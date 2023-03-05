import city_1 from "../../images/slides/slide1.jpg";
import city_2 from "../../images/slides/slide2.jpg";
import char_1 from "../../images/slides/slide3.jpg";
import attr_1 from "../../images/slides/slide4.jpg";
import about from "../../images/slides/slide5.jpg";

interface Slide {
	image?: any;
	heading: string;
	desc?: string;
}

const SLIDEDATA: Slide[] = [
	{
		image: city_1,
		heading: "Explore Cities...",
		desc: "Look through the catalogue to learn about your dream destination"
	},
	{
		image: city_2,
		heading: "Check out the Night Life...",
		desc: "Refine your locations using our filters"
	},
	{
		image: char_1,
		heading: "Help out your fellow Citizens...",
		desc:
			"Learn about the different charities and organizations within a city" +
			" and how you can make a difference"
	},
	{
		image: attr_1,
		heading: "Discover new attractions...",
		desc:
			"Find out what your city has to offer by exploring its attractions" +
			" from high frequency tourist spots to calmer scenic marvels"
	},
	{
		image: about,
		heading: "Learn more about us!",
		desc: "Find out what inspired us to create Explore & Give More"
	}
];

export { SLIDEDATA };

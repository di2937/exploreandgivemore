import mathImage from "../../images/home/math.png";
import englishImage from "../../images/home/english.png";
import csImage from "../../images/home/cs.png";

interface Entry {
	name: string;
	desc: string;
	img: any;
	link: string;
}

const MODELS: Entry[] = [
	{
		name: "Math",
		desc: "中学１年〜３年",
		img: mathImage,
		link: "/math"
	},
	{
		name: "English",
		desc: "中学１年〜３年",
		img: englishImage,
		link: "/english"
	},
	{
		name: "Computer Science",
		desc: "高校１年〜",
		img: csImage,
		link: "/computer_science"
	}
];

export { MODELS };

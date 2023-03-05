import {
	ArrowCircleLeftOutlined,
	ArrowCircleRightOutlined
} from "@mui/icons-material";
import { SLIDEDATA } from "./slideData";
import React from "react";
import "./slideshow.css";

const autoScroll: boolean = true;
let slideInterval: NodeJS.Timeout;
const intervalTime: number = 4500; // 4.5 seconds

function Slideshow() {
	const [currentSlide, setCurrentSlide] = React.useState(0);
	const slideLength: number = SLIDEDATA.length;

	const nextSlide = () => {
		setCurrentSlide((currentSlide + 1) % slideLength);
	};

	const prevSlide = () => {
		setCurrentSlide((currentSlide - 1 + slideLength) % slideLength);
	};

	React.useEffect(() => {
		if (autoScroll) {
			slideInterval = setInterval(nextSlide, intervalTime);
		}
		return () => clearInterval(slideInterval);
		// eslint-disable-next-line
	}, [currentSlide]);

	return (
		<div className="slider">
			<ArrowCircleLeftOutlined
				className="arrow prev"
				style={{ width: "3rem", height: "3rem" }}
				onClick={prevSlide}
			/>
			<ArrowCircleRightOutlined
				className="arrow next"
				style={{ width: "3rem", height: "3rem" }}
				onClick={nextSlide}
			/>

			{SLIDEDATA.map((slide, index) => {
				return (
					<div
						className={
							index === currentSlide ? "slide current" : "slide"
						}
						key={index}
					>
						{index === currentSlide && (
							<>
								<img
									src={slide.image}
									style={{
										width: "100%",
										height: "90vh"
									}}
									alt="slide"
								/>
								<div className="content">
									<h2>{slide.heading}</h2>
									<p>{slide.desc}</p>
								</div>
							</>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default Slideshow;

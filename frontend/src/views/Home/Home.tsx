import "../../components/home/Home.css";
import ModelCard from "../../components/common/ModelCard";
import { Typography, Container, Stack, Box } from "@mui/material";
import Slideshow from "../../components/slideshow/Slideshow";

/* User Defined Imports ↓ */
import { MODELS } from "./homeCards";
import SearchBar from "../../components/search/SearchBar";

import bgimg from "./b1.png";
import { Row } from "react-bootstrap";

function Home() {
	return (
		<>
			<div className="homeTop">
			<Container>
				<Stack
					direction="row"
					paddingTop={ "5vh" }
					paddingBottom={ "5vh" }
					justifyContent="flex-end"
					alignItems="center"
					spacing={2}
				>
					<Typography
						gutterBottom
						variant="h1"
						color="white"
						sx={{ textAlign: "center", fontWeight: "Bold" }}
						style={{ marginTop: 15, color: "white" }}
						align="center"
					>
						Welcome to<br/> TECHs US
					</Typography>
					<Box
						component="img"
						src={bgimg}
						sx={{ maxWidth: "40vw" }}
					/>
				</Stack>
			</Container>
			</div>
			<Container
				sx={{
					textAlign: "center",
					paddingTop: "20px",
					paddingBottom: "100px",
					display: "flex",
					flexDirection: "column"
				}}
			>
				<Typography
					gutterBottom
					variant="h2"
					color="white"
					sx={{ textAlign: "center", fontWeight: "Medium" }}
					style={{ marginTop: 15, color: "white" }}
					align="center"
				>
					Courses
				</Typography>
				<Stack
					direction="row"
					flexWrap="wrap"
					justifyContent="center"
					sx={{ paddingBottom: "20px" }}
				>
					{MODELS.map((model) => (
						<ModelCard
							key={model.name}
							fitImage={true}
							center={true}
							height="350px"
							width="350px"
							imageHeight="270px"
							image={model.img}
							href={model.link}
						>
							<Typography
								variant="h4"
								component="div"
								align="center"
								sx={{ mt: "10px", fontWeight: "bold" }}
							>
								{model.name}
							</Typography>
							<Typography
								sx={{ mb: 0, fontWeight: "bold" }}
								variant="h6"
								color="text.secondary"
								paddingBottom="15px"
							>
								{model.desc}
							</Typography>
						</ModelCard>
					))}
				</Stack>
				<SearchBar model="Entire Site" bool={true} />
			</Container>
		</>
	);
}

export default Home;

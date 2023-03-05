import "../../components/home/Home.css";
import ModelCard from "../../components/common/ModelCard";
import { Typography, Container, Stack } from "@mui/material";
import Slideshow from "../../components/slideshow/Slideshow";

/* User Defined Imports ↓ */
import { MODELS } from "./homeCards";
import SearchBar from "../../components/search/SearchBar";

function Home() {
	return (
		<>
			<Slideshow />
			<div className="bgimg">
				<Container
					sx={{
						textAlign: "center",
						paddingTop: "20px",
						display: "flex",
						flexDirection: "column"
					}}
				>
					<SearchBar model="Entire Site" bool={true} />
					<Typography
						gutterBottom
						variant="h2"
						color="white"
						sx={{ textAlign: "center" }}
						style={{ marginTop: 15, color: "white" }}
						align="center"
					>
						Model Pages
					</Typography>
					<Stack
						direction="row"
						flexWrap="wrap"
						justifyContent="center"
					>
						{MODELS.map((model) => (
							<ModelCard
								key={model.name}
								fitImage={false}
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
									sx={{ mt: "10px" }}
								>
									{model.name}
								</Typography>
								<Typography
									sx={{ mb: 0 }}
									variant="subtitle1"
									color="text.secondary"
									paddingBottom="15px"
								>
									{model.desc}
								</Typography>
							</ModelCard>
						))}
					</Stack>
				</Container>
			</div>
		</>
	);
}

export default Home;

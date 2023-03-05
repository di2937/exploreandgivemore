/**
 * Developer Notes:
 *
 * We would like to thank Cole Weinmann and Kristina Zhou for providing explicit
 * permission to use some of their designed components for this project.
 *
 * Please check out their GitLab:
 * - Cole Weinmann: https://gitlab.com/coleweinman (@coleweinman)
 * - Kristina Zhou: https://gitlab.com/zhou.kristina (@zhou.kristina)
 *
 * We would like to thank the UniverCity website for providing ideas and concepts
 * that this site was used to bootstrap off of.
 *
 * Please check out UniverCity:
 * - https://www.univercity.me/
 */

import React from "react";
import { getCharity } from "../../services/charityParser";
import {
	Typography,
	Container,
	Box,
	Card,
	CardContent,
	Button,
	Stack
} from "@mui/material";
import Error from "../Error/ErrorPage";
import CharityObj from "./Charity";
import StatCard from "../../components/common/StatCard";
import SimpleStat from "../../components/common/SimpleStat";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import PlaceIcon from "@mui/icons-material/Place";
import City from "../Cities/City";
import Attraction from "../Attractions/Attraction";
import AttractionModelCard from "../Attractions/AttractionModelCard";
import CityModelCard from "../Cities/CityModelCard";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { parseJSONCityGrid } from "../../services/cityQuery";
import { parseJSONAttractionGrid } from "../../services/attractionParser";

function CharityInstancePage() {
	let id: string = useParams().id ?? "1";
	let navigate: NavigateFunction = useNavigate();
	return <CharityInstancePageCC id={id} navigate={navigate} />;
}

interface CharityInstancePageProps {
	id: string;
	navigate: NavigateFunction;
}

interface CharityInstancePageState {
	charity: CharityObj | null;
	city: City | null;
	nearbyAttractions: Attraction[] | undefined;
	showMore: boolean;
}

class CharityInstancePageCC extends React.Component<
	CharityInstancePageProps,
	CharityInstancePageState
> {
	constructor(props: any) {
		super(props);
		this.state = {
			charity: getCharity(props.id),
			city: null,
			nearbyAttractions: undefined,
			showMore: false
		};
	}

	componentDidMount() {
		let charity: CharityObj | null = this.state.charity!;
		if (charity === null) return;

		let nearbyAttractions: Attraction[] | undefined =
			parseJSONAttractionGrid(charity.Attractions);
		let city: City | null = parseJSONCityGrid([charity.cityIn])[0];

		this.setState({
			charity: charity,
			city: city,
			nearbyAttractions: nearbyAttractions,
			showMore: false
		});
	}

	render() {
		let charity: CharityObj = this.state.charity!;

		let showNearbyAttractions =
			this.state.nearbyAttractions !== null &&
			this.state.nearbyAttractions !== undefined &&
			this.state.nearbyAttractions.length > 0;

		let nearbyAttractions = this.state.nearbyAttractions;
		console.log(nearbyAttractions);
		let showCity = this.state.city !== null;
		let city = this.state.city;

		if (charity == null) {
			return <Error />;
		}

		return (
			<Container className="page-container">
				<Stack spacing={2}>
					<Typography
						variant="h2"
						sx={{
							paddingTop: "36px",
							paddingBottom: "0px",
							textAlign: "center"
						}}
					>
						{charity.name}
					</Typography>
					<Stack direction="row">
						<Card
							className="instanceCard card"
							elevation={3}
							style={{
								margin: "0 50px",
								borderRadius: "16px",
								backgroundColor: "#0E1E3F"
							}}
						>
							<CardContent>
								<Typography
									variant="h4"
									component="div"
									align="center"
									color="#FEFEFE"
								>
									Mission
								</Typography>
								{charity.mission.split("<br>").map((str) => (
									<Typography
										variant="subtitle1"
										color="#FEFEFE"
									>
										{str}
									</Typography>
								))}
							</CardContent>
						</Card>
						<Box style={{ textAlign: "center" }}>
							<img
								alt="charity logo"
								src={`https://logo.clearbit.com/${charity.website}?size=300`}
								style={{
									overflow: "hidden",
									borderRadius: "16px",
									maxHeight: "320px",
									maxWidth: "520px",
									objectFit: "contain"
								}}
							/>
						</Box>
					</Stack>
					<Stack
						direction={charity.iframeRender ? "row" : "column"}
						justifyContent="space-between"
					>
						<StatCard
							title="About"
							style={{
								display: "flex",
								flexDirection: charity.iframeRender
									? "column"
									: "row",
								borderRadius: "16px",
								backgroundColor: "#f7e5ca",
								justifyContent: "center",
								alignItems: "center",
								width: charity.iframeRender ? "320px" : "100%"
							}}
						>
							<SimpleStat
								label=""
								value={charity.city + ", " + charity.state}
								icon={PlaceIcon}
							/>
							<CardContent
								sx={{
									display: "flex",
									alignItems: "center",
									flexDirection: "column"
								}}
							>
								<Typography
									align="center"
									sx={{ fontSize: "28px", align: "center" }}
									component="legend"
								>
									EIN
								</Typography>
								<Typography
									align="center"
									sx={{ fontSize: "20px" }}
								>
									{charity.ein}
								</Typography>
							</CardContent>
							<CardContent
								sx={{
									display: "flex",
									alignItems: "center",
									flexDirection: "column"
								}}
							>
								<Typography
									align="center"
									sx={{ fontSize: "28px", align: "center" }}
									component="legend"
								>
									IRS Classification
								</Typography>
								<Typography
									align="center"
									sx={{ fontSize: "20px" }}
								>
									{charity.classification}
								</Typography>
							</CardContent>
							<CardContent
								sx={{
									display: "flex",
									alignItems: "center",
									flexDirection: "column"
								}}
							>
								<Typography
									align="center"
									sx={{ fontSize: "28px", align: "center" }}
									component="legend"
								>
									IRS Subsection
								</Typography>
								<Typography
									align="center"
									sx={{ fontSize: "20px" }}
								>
									{charity.irsSubsection}
								</Typography>
							</CardContent>
							<CardContent
								sx={{
									display: "flex",
									alignItems: "center",
									flexDirection: "column"
								}}
							>
								<Typography
									align="center"
									sx={{ fontSize: "28px", align: "center" }}
									component="legend"
								>
									Deductibility
								</Typography>
								<Typography
									align="center"
									sx={{ fontSize: "20px" }}
								>
									{charity.deductibility}
								</Typography>
							</CardContent>
						</StatCard>
						<Stack
							style={{
								borderRadius: "16px"
							}}
							justifyContent="space-between"
						>
							<Card
								className="instanceCard card"
								elevation={3}
								style={{
									borderRadius: "16px",
									width: charity.iframeRender
										? "800px"
										: "100%"
								}}
							>
								<CardContent>
									<Typography
										gutterBottom
										variant="h4"
										component="div"
										align="center"
									>
										Learn More at the Official Website!
									</Typography>
									{charity.iframeRender && (
										<Container
											style={{ textAlign: "center" }}
										>
											<embed
												width="100%"
												height="550px"
												src={charity.website}
												type="text/html"
												title="web_embed"
											/>
										</Container>
									)}
									<Box
										display="flex"
										justifyContent="center"
										flexDirection="row"
										sx={{ width: "100%" }}
									>
										<Button
											variant="outlined"
											href={charity.website}
											target="_blank"
											sx={{ align: "center" }}
										>
											Visit the Website
										</Button>
									</Box>
								</CardContent>
							</Card>
						</Stack>
					</Stack>
					<StatCard
						title="Ratings"
						color="#bfc4c5"
						fontColor="#0E1E3F"
					>
						<SimpleStat
							label="Overall"
							value={charity.score}
							icon={SentimentSatisfiedAltOutlinedIcon}
							fontColor="#0E1E3F"
						/>
						<SimpleStat
							label="Financial"
							value={charity.financialRating}
							icon={MonetizationOnOutlinedIcon}
							fontColor="#0E1E3F"
						/>
						<SimpleStat
							label="Accountability"
							value={charity.accountabilityRating}
							icon={BeenhereOutlinedIcon}
							fontColor="#0E1E3F"
						/>
					</StatCard>
					<div>
						{showCity && (
							<Typography
								variant="h3"
								sx={{
									paddingTop: "36px",
									paddingBottom: "24px",
									textAlign: "center"
								}}
							>
								{charity.name} is located in {charity.city},{" "}
								{charity.state}
							</Typography>
						)}
						{city !== null && (
							<Stack
								direction="row"
								flexWrap="wrap"
								justifyContent="center"
							>
								<CityModelCard
									key={"City" + city.id}
									city={city}
								/>
							</Stack>
						)}
						{showCity && (
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									marginTop: "16px",
									marginBottom: "16px"
								}}
							>
								<Button
									variant="outlined"
									href={`/cities?state=${charity.state}`}
								>
									Explore Nearby Cities
								</Button>
							</Box>
						)}
					</div>
					<div>
						{showNearbyAttractions && (
							<Typography
								variant="h3"
								sx={{
									paddingTop: "36px",
									paddingBottom: "24px",
									textAlign: "center"
								}}
							>
								Attractions near {charity.name}
							</Typography>
						)}
						<Stack
							direction="row"
							flexWrap="wrap"
							justifyContent="center"
						>
							{(nearbyAttractions ?? []).map(
								(attraction: Attraction) => {
									return (
										<AttractionModelCard
											key={"attraction" + attraction.id}
											attraction={attraction}
										/>
									);
								}
							)}
						</Stack>
						{showNearbyAttractions && (
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									marginTop: "16px"
								}}
							>
								<Button
									variant="outlined"
									href={`/attractions?city=${charity.city}&state=${charity.state}`}
								>
									View All Attractions Nearby
								</Button>
							</Box>
						)}
					</div>
				</Stack>
			</Container>
		);
	}
}

export default CharityInstancePage;

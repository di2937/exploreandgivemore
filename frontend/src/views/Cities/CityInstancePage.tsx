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
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import {
	Button,
	Card,
	CardContent,
	Chip,
	Container,
	Stack,
	Typography,
	Rating,
	Box,
	Divider
} from "@mui/material";
import {
	PeopleAlt as PeopleAltIcon,
	Map as MapIcon,
	EventAvailable as EventAvailableIcon,
	AccessTime as AccessTimeIcon,
	DirectionsWalk as DirectionsWalkIcon,
	MonetizationOn as MonetizationOnIcon,
	Security as SecurityIcon
} from "@mui/icons-material";
import SimpleStat from "../../components/common/SimpleStat";
import City from "./City";
import Attraction from "../Attractions/Attraction";
import CharityObj from "../Charities/Charity";
import AttractionModelCard from "../Attractions/AttractionModelCard";
import CharityModelCard from "../Charities/CharityModelCard";
import { Theme } from "../../Theme";
import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../services/apiBase";
import LoadingBuffer from "../../components/loading/LoadingBuffer";
import { parseJSONCityInstance } from "../../services/cityQuery";
import { parseJSONAttractionGrid } from "../../services/attractionParser";
import { parseJSONCharityGrid } from "../../services/charityParser";

function CityInstancePage() {
	let id: string = useParams().cityId ?? "1";
	let navigate: NavigateFunction = useNavigate();
	return <CityInstancePageCC id={id} navigate={navigate} />;
}

const safetyText = ["Very Unsafe", "Unsafe", "Medium", "Safe", "Very Safe"];
const budgetText = [
	"Very Low",
	"Low",
	"Medium Low",
	"Medium",
	"Medium High",
	"High",
	"Very High",
	"Extremely High"
];
const ratingText = ["Very Poor", "Poor", "Fair", "Good", "Excellent"];

interface CityInstancePageProps {
	id: string;
	navigate: NavigateFunction;
}

interface CityInstancePageState {
	city: City | null;
	nearbyAttractions: Attraction[] | null;
	nearbyCharities: CharityObj[] | null;
	showMore: boolean;
}

class CityInstancePageCC extends React.Component<
	CityInstancePageProps,
	CityInstancePageState
> {
	constructor(props: any) {
		super(props);
		this.state = {
			city: null,
			nearbyAttractions: null,
			nearbyCharities: null,
			showMore: false
		};
	}

	componentDidMount() {
		this.loadData();
	}

	/* Comment in after the implementation of backend */
	async loadData() {
		let response: AxiosResponse<any, any> = await axios.get(
			`${API_BASE_URL}/cities/${this.props.id}`
		);
		let city: City | null = parseJSONCityInstance(
			response.data["data"]["city"]
		);
		if (city == null) {
			return;
		}

		city["charities"] = parseJSONCharityGrid(
			response.data["data"]["city"]["charities"]
		);
		city["attractions"] = parseJSONAttractionGrid(
			response.data["data"]["city"]["attractions"]
		);

		let nearbyCharities: CharityObj[] | null = city["charities"];
		let nearbyAttractions: Attraction[] | null = city["attractions"];

		this.setState({
			city: city,
			nearbyCharities: nearbyCharities,
			nearbyAttractions: nearbyAttractions,
			showMore: false
		});
	}

	getDescription() {
		let description: string = this.state.city!.description;
		if (description.length < 1500) {
			return (
				<Typography variant="body1" color="text.primary">
					{description}
				</Typography>
			);
		}
		description = this.state.showMore
			? description
			: this.getShortDescription();
		let more: boolean = this.state.showMore;
		return (
			<>
				<Typography variant="body1" color="text.primary">
					{description}
				</Typography>
				<Button
					sx={{
						display: "block",
						marginLeft: "auto",
						marginRight: "auto",
						border: `2px solid ${Theme.palette.primary.main}`
					}}
					variant="text"
					size="small"
					onClick={() => {
						this.setState({ showMore: !more });
					}}
				>
					{this.state.showMore ? "Show Less" : "Read More"}
				</Button>
			</>
		);
	}

	getShortDescription() {
		if (this.state.city === null) {
			return "";
		} else if (this.state.city.description.length < 1500) {
			return this.state.city.description;
		} else {
			let description: string = this.state.city.description;
			let after: string = description.substring(1500);
			let index: number = after.indexOf(". ");
			if (index === -1) {
				return description;
			} else {
				return description.substring(0, 1500 + index + 1);
			}
		}
	}

	render() {
		if (this.state.city == null) return <LoadingBuffer grow={true} />;

		let city: City = this.state.city!;

		return (
			<div className="city_background">
				<Container className="city_background">
					<Stack spacing={2} sx={{ paddingBottom: 2 }}>
						<Typography
							variant="h2"
							sx={{
								paddingTop: "36px",
								paddingBottom: "0px",
								textAlign: "center",
								fontWeight: "800",
								fontStyle: "italic"
							}}
							color="white"
						>
							{city.name + ", " + city.state}
						</Typography>
						<Card
							className="image card"
							elevation={3}
							sx={{ display: "flex" }}
						>
							<CardContent>
								<Stack
									direction="row"
									justifyContent="center"
									alignItems="center"
									spacing={2}
									divider={
										<Divider
											orientation="vertical"
											flexItem
										/>
									}
								>
									<Box
										display="flex"
										alignItems="center"
										justifyContent="center"
										sx={{ width: "54vw" }}
									>
										<img
											alt=""
											src={city.imageUrl}
											style={{
												overflow: "hidden",
												borderRadius: "16px",
												maxHeight: "500px",
												maxWidth: "100%",
												objectFit: "contain"
											}}
										/>
									</Box>
									<Box>
										<Stack
											direction="column"
											justifyContent="center"
											alignItems="center"
											divider={
												<Divider
													orientation="horizontal"
													flexItem
												/>
											}
										>
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													flexDirection: "column",
													padding: "16px",
													flexBasis: "70%",
													flexShrink: 1
												}}
											>
												<Typography
													sx={{ fontSize: "2.4vw" }}
												>
													Safety
												</Typography>
												<Rating
													name="safety"
													value={city.safety}
													readOnly
													size="large"
													icon={
														<SecurityIcon
															style={{
																fontSize: "30px"
															}}
														/>
													}
													emptyIcon={
														<SecurityIcon
															style={{
																fontSize: "30px"
															}}
														/>
													}
												/>
												<Typography
													sx={{ fontSize: "1.5vw" }}
												>
													{
														safetyText[
															city.safety - 1
														]
													}
												</Typography>
											</Box>
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													flexDirection: "column",
													padding: "16px",
													flexBasis: "70%",
													flexShrink: 1
												}}
											>
												<Typography
													sx={{ fontSize: "2.4vw" }}
												>
													Cost of Living
												</Typography>
												<Rating
													name="budget"
													precision={0.5}
													max={5}
													value={city.budget}
													readOnly
													size="large"
													icon={
														<MonetizationOnIcon
															style={{
																fontSize: "30px"
															}}
														/>
													}
													emptyIcon={
														<MonetizationOnIcon
															style={{
																fontSize: "30px"
															}}
														/>
													}
												/>
												<Typography
													sx={{ fontSize: "1.5vw" }}
												>
													{
														budgetText[
															Math.ceil(
																(city.budget *
																	8) /
																	5
															) - 1
														]
													}
												</Typography>
											</Box>
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													flexDirection: "column",
													padding: "16px",
													flexBasis: "70%",
													flexShrink: 1
												}}
											>
												<Typography
													sx={{ fontSize: "2.4vw" }}
												>
													Average Rating
												</Typography>
												<Rating
													name="average"
													precision={0.5}
													value={
														+city.averageRating.toFixed(
															2
														)
													}
													readOnly
													size="large"
												/>
												<Typography
													sx={{ fontSize: "1.5vw" }}
												>
													{
														ratingText[
															Math.ceil(
																city.averageRating
															) - 1
														]
													}
												</Typography>
											</Box>
										</Stack>
									</Box>
								</Stack>
							</CardContent>
						</Card>

						<Card
							className="knownFor card"
							elevation={3}
							style={{ backgroundColor: "#cce2f1" }}
						>
							<CardContent>
								<Typography
									gutterBottom
									variant="h4"
									component="div"
									align="center"
								>
									{"Known For"}
								</Typography>
								<Stack
									gap={1}
									direction="row"
									justifyContent="center"
									flexWrap="wrap"
								>
									{city.knownFor.map((i) => (
										<Chip
											label={i}
											color="primary"
											size="medium"
											onClick={() =>
												this.props.navigate(
													`/cities?knownForFilter=${i}`
												)
											}
										/>
									))}
								</Stack>
							</CardContent>
						</Card>

						<Card
							className="description card"
							elevation={3}
							sx={{ display: "flex" }}
							style={{ backgroundColor: "#bfc4c5" }}
						>
							<Stack
								direction="row"
								justifyContent="center"
								alignItems="center"
								spacing={2}
								divider={
									<Divider orientation="vertical" flexItem />
								}
							>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										flexDirection: "column",
										padding: "16px",
										flexBasis: "70%",
										flexShrink: 1
									}}
								>
									<Typography
										gutterBottom
										variant="h4"
										component="div"
										align="center"
									>
										{"Description"}
									</Typography>
									{this.getDescription()}
								</Box>
								<Stack
									direction="column"
									justifyContent="center"
									alignItems="center"
								>
									<SimpleStat
										label="Population"
										value={city.population.toLocaleString()}
										icon={PeopleAltIcon}
										fontSize="2vw"
									/>
									<SimpleStat
										label="Area (sq mi)"
										value={(+city.area.toFixed(
											2
										)).toLocaleString()}
										icon={MapIcon}
										fontSize="2vw"
									/>
									<SimpleStat
										label="Timezone"
										value={city.timezone}
										icon={AccessTimeIcon}
										fontSize="2vw"
									/>
								</Stack>
							</Stack>
						</Card>

						<Card
							className="instanceCard card"
							elevation={3}
							style={{ backgroundColor: "#cce2f1" }}
						>
							<CardContent>
								<Typography
									gutterBottom
									variant="h4"
									component="div"
									align="center"
								>
									{"Map & Walk Score"}
								</Typography>
								<Stack
									direction="row"
									justifyContent="center"
									alignItems="center"
									spacing={2}
									divider={
										<Divider
											orientation="vertical"
											flexItem
										/>
									}
								>
									<Box
										style={{
											textAlign: "center",
											width: 700
										}}
									>
										<iframe
											title="map_frame"
											width="100%"
											height="450"
											style={{ border: 0 }}
											loading="lazy"
											src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCNeTLLH83DplVigjOugoPDOadr9c5xu6s&q=${city.name}+${city.state}`}
										/>
									</Box>
									<Box
										style={{
											textAlign: "center",
											width: 300
										}}
									>
										<iframe
											title="walk_score_frame"
											width="100%"
											height="450"
											style={{ border: 0 }}
											loading="lazy"
											src={city.walkScoreURL}
										/>
									</Box>
								</Stack>
							</CardContent>
						</Card>

						<Card className="links card" elevation={3}>
							<CardContent>
								<Typography
									gutterBottom
									variant="h4"
									component="div"
									align="center"
								>
									{"Links"}
								</Typography>
								<Stack
									className="socialStack"
									direction="row"
									spacing={2}
									justifyContent="center"
								>
									{city.googleEventsURL !== "none" && (
										<Button
											variant="outlined"
											href={city.googleEventsURL}
											startIcon={<EventAvailableIcon />}
											target="_blank"
										>
											Google Events
										</Button>
									)}
									{city.walkScoreURL !== "none" && (
										<Button
											variant="outlined"
											href={city.walkScoreURL}
											startIcon={<DirectionsWalkIcon />}
											target="_blank"
										>
											Walk Score
										</Button>
									)}
								</Stack>
							</CardContent>
						</Card>

						<Card
							className="charities card"
							elevation={3}
							sx={{
								paddingBottom: 2,
								backgroundColor: "#f7e5ca"
							}}
						>
							<CardContent>
								<Typography
									variant="h3"
									sx={{
										paddingTop: "36px",
										paddingBottom: "24px",
										textAlign: "center"
									}}
								>
									Charities in {city.name}
								</Typography>
								<Stack
									direction="row"
									flexWrap="wrap"
									justifyContent="center"
								>
									{(this.state.nearbyCharities ?? []).map(
										(charity: CharityObj) => {
											return (
												<CharityModelCard
													key={"charity" + charity.id}
													charity={charity}
													id={parseInt(charity.id)}
												/>
											);
										}
									)}
								</Stack>
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										marginTop: "16px"
									}}
								>
									<Button
										variant="outlined"
										href={`/charities?city=${city.name}&state=${city.state}`}
									>
										View more Charities in "{city.name}"
									</Button>
								</Box>
							</CardContent>
						</Card>

						<Card
							className="attractions card"
							elevation={3}
							sx={{
								paddingBottom: 2,
								backgroundColor: "#f7e5ca"
							}}
						>
							<CardContent>
								<Typography
									variant="h3"
									sx={{
										paddingTop: "36px",
										paddingBottom: "24px",
										textAlign: "center"
									}}
								>
									Attractions in {city.name}
								</Typography>
								<Stack
									direction="row"
									flexWrap="wrap"
									justifyContent="center"
								>
									{(this.state.nearbyAttractions ?? []).map(
										(attraction: Attraction) => {
											return (
												<AttractionModelCard
													attraction={attraction}
													showAllTypes={false}
													showTypes={false}
													showRating={true}
													showHeritage={true}
												/>
											);
										}
									)}
								</Stack>
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										marginTop: "16px",
										paddingBottom: "20px"
									}}
								>
									<Button
										variant="outlined"
										href={`/attractions?city=${city.name}&state=${city.state}`}
									>
										View more Attractions in "{city.name}"
									</Button>
								</Box>
							</CardContent>
						</Card>
					</Stack>
				</Container>
			</div>
		);
	}
}

export default CityInstancePage;

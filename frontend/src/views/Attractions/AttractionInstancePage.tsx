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

import { parseJSONAttractionInstance } from "../../services/attractionParser";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import { parseJSONCharityGrid } from "../../services/charityParser";
import LoadingBuffer from "../../components/loading/LoadingBuffer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CharityModelCard from "../Charities/CharityModelCard";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SimpleStat from "../../components/common/SimpleStat";
import SummarizeIcon from "@mui/icons-material/Summarize";
import StatCard from "../../components/common/StatCard";
import { API_BASE_URL } from "../../services/apiBase";
import ReviewsIcon from "@mui/icons-material/Reviews";
import CityModelCard from "../Cities/CityModelCard";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import CharityObj from "../Charities/Charity";
import axios, { AxiosResponse } from "axios";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Error from "../Error/ErrorPage";
import Attraction from "./Attraction";
import { Theme } from "../../Theme";
import City from "../Cities/City";
import Review from "./Reviews";
import React from "react";
import {
	Button,
	Card,
	CardContent,
	Chip,
	Container,
	Stack,
	Typography,
	Rating,
	Box
} from "@mui/material";

const ratingValue = [
	"Very Good Attraction",
	"Worth A Detour",
	"Worth A Special Journey"
];

function AttractionInstancePage() {
	let id: string = useParams().attractionId ?? "1";
	let navigate: NavigateFunction = useNavigate();
	return <AttractionInstancePageCC id={id} navigate={navigate} />;
}

interface AttractionInstancePageProps {
	id: string;
	navigate: NavigateFunction;
}

interface AttractionInstancePageState {
	attr: Attraction | null | undefined;
	city: City | null | undefined;
	nearbyCharities: CharityObj[] | null | undefined;
	showMore: boolean;
}

class AttractionInstancePageCC extends React.Component<
	AttractionInstancePageProps,
	AttractionInstancePageState
> {
	constructor(props: any) {
		super(props);
		this.state = {
			attr: null,
			city: undefined,
			nearbyCharities: undefined,
			showMore: false
		};
	}

	componentDidMount() {
		this.loadData();
	}

	getShortDescription() {
		if (this.state.attr === null || this.state.attr === undefined) {
			return "";
		} else if (this.state.attr.description.length < 1000) {
			return this.state.attr.description;
		} else {
			let description: string = this.state.attr.description;
			let after: string = description.substring(1000);
			let index: number = after.indexOf(". ");
			if (index === -1) {
				return description;
			} else {
				return description.substring(0, 1000 + index + 1);
			}
		}
	}

	getDescription() {
		let description: string = this.state.attr!.description;
		if (description.length < 1000) {
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

	async loadData() {
		let response: AxiosResponse<any, any> = await axios.get(
			`${API_BASE_URL}/attractions/${this.props.id}`
		);

		if (response.data["status"] !== "success") {
			this.setState({ attr: undefined });
		}

		let attraction: Attraction | null = parseJSONAttractionInstance(
			response.data["data"]["attraction"]
		);
		if (attraction == null) {
			return;
		}

		let charities: CharityObj[] = parseJSONCharityGrid(
			response.data["data"]["attraction"]["charities"]
		);

		this.setState({
			attr: attraction,
			city: attraction.cityIn,
			nearbyCharities: charities,
			showMore: false
		});
	}

	getReviews(reviews: Review[]) {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column"
				}}
			>
				<Typography variant="h3" style={{ paddingBottom: "5px" }}>
					Check out the Top Reviews
				</Typography>
				<div
					style={{
						display: "flex",
						flexDirection: "row-reverse",
						justifyContent: "center",
						flexWrap: "wrap"
					}}
				>
					{reviews.map((review) => (
						<Card
							style={{
								width: "350px",
								margin: "5px",
								alignItems: "stretch"
							}}
						>
							<Box
								sx={{
									p: 2,
									display: "flex",
									backgroundColor: "#0e1e3f"
								}}
							>
								<Avatar variant="rounded" sx={{ mr: 2 }}>
									<ReviewsIcon
										color="success"
										fontSize="large"
									/>
								</Avatar>
								<Stack spacing={0.5}>
									<Typography fontWeight={700} color="white">
										{review.authorName.length < 20
											? review.authorName
											: review.authorName.substring(
													0,
													20
											  ) + "..."}
									</Typography>
									<Rating
										name="review_rating"
										max={5}
										value={review.rating}
										readOnly
									/>
								</Stack>
							</Box>
							<Divider />
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "space-between",
									paddingBottom: "10px",
									minHeight: "300px"
								}}
							>
								{review.text !== "No Text" && (
									<Typography
										variant="body2"
										style={{
											padding: "10px 20px"
										}}
									>
										{review.text.length < 500
											? review.text
											: review.text.substring(0, 500) +
											  "..."}
									</Typography>
								)}
								<Button
									variant="outlined"
									href={review.authorURL}
									target="blank_"
								>
									Learn More about the Author
								</Button>
							</div>
						</Card>
					))}
				</div>
			</div>
		);
	}

	render() {
		if (this.state.attr === undefined) return <Error />;
		if (this.state.attr === null) return <LoadingBuffer grow={true} />;

		let attr: Attraction = this.state.attr!;
		let showNearbyCharities =
			this.state.nearbyCharities !== null &&
			this.state.nearbyCharities !== undefined &&
			this.state.nearbyCharities.length > 0;
		let showCity =
			this.state.city !== null && this.state.city !== undefined;

		return (
			<Container className="page-container">
				<Stack spacing={3}>
					<Typography
						variant="h3"
						sx={{
							paddingTop: "36px",
							paddingBottom: "24px",
							textAlign: "center"
						}}
					>
						{attr.name}
					</Typography>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							flexWrap: "wrap",
							justifyContent: "center",
							alignItems: "center"
						}}
					>
						<Box style={{ textAlign: "center" }}>
							<img
								alt={`${attr.name} attraction`}
								src={attr.imageURL}
								style={{
									overflow: "hidden",
									borderRadius: "16px",
									maxHeight: "400px",
									maxWidth: "100%",
									objectFit: "contain"
								}}
							/>
						</Box>
						{attr.attractionSummary !== "No Summary" && (
							<Card
								className="instanceCard card"
								elevation={3}
								style={{
									margin: "10px 50px",
									maxWidth: "460px",
									borderRadius: "16px",
									backgroundColor: "#bfc4c5"
								}}
							>
								<CardContent>
									<Typography
										variant="h4"
										component="div"
										align="center"
									>
										<SummarizeIcon /> Quick Read!
									</Typography>
									<Typography variant="body1">
										<FontAwesomeIcon icon={faQuoteLeft} />
										<em>
											&emsp; {attr.attractionSummary}{" "}
											&emsp;
										</em>
										<FontAwesomeIcon icon={faQuoteRight} />
									</Typography>
								</CardContent>
							</Card>
						)}
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent:
								attr.description !== "No Description"
									? "space-between"
									: "center",
							flexWrap: "wrap",
							alignItems: "stretch",
							width: "100%"
						}}
					>
						<Card
							className="instanceCard card"
							elevation={3}
							style={{
								maxWidth:
									attr.description !== "No Description"
										? "320px"
										: "auto",
								borderRadius: "16px",
								backgroundColor: "#cce2f1"
							}}
						>
							<CardContent>
								<Typography
									gutterBottom
									variant="h4"
									component="div"
									align="center"
								>
									Attributes
								</Typography>
								{attr.kinds !== null && (
									<Typography
										gutterBottom
										variant="h6"
										component="div"
										align="center"
									>
										Open Trip Map
									</Typography>
								)}
								<Stack
									gap={1}
									direction="row"
									justifyContent="center"
									flexWrap="wrap"
									paddingBottom="10px"
								>
									{(attr.kinds ?? []).map((i: string) => (
										<Chip
											label={i}
											color="info"
											size="medium"
											onClick={() =>
												this.props.navigate(
													`/attractions?kinds=${i}`
												)
											}
										/>
									))}
								</Stack>
								<Typography
									gutterBottom
									variant="h6"
									component="div"
									align="center"
								>
									Google Places
								</Typography>
								<Stack
									gap={1}
									direction="row"
									justifyContent="center"
									flexWrap="wrap"
								>
									{attr.types.map((i) => (
										<Chip
											label={i}
											color="primary"
											size="medium"
											onClick={() =>
												this.props.navigate(
													`/attractions?types=${i}`
												)
											}
										/>
									))}
								</Stack>
							</CardContent>
						</Card>
						{attr.description !== "No Description" && (
							<Card
								className="instanceCard card"
								elevation={3}
								style={{
									maxWidth: "800px",
									backgroundColor: "#bfc4c5",
									borderRadius: "16px"
								}}
							>
								<CardContent>
									<Typography
										gutterBottom
										variant="h4"
										component="div"
										align="center"
									>
										Description
									</Typography>
									<Typography variant="body1" align="justify">
										{this.getDescription()}
									</Typography>
								</CardContent>
							</Card>
						)}
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							flexWrap: "wrap",
							alignItems: "stretch",
							width: "100%"
						}}
					>
						{attr.website !== "404" && (
							<Card
								className="instanceCard card"
								elevation={3}
								style={{
									width: "800px",
									borderRadius: "16px"
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
									<Box style={{ textAlign: "center" }}>
										{attr.iframeRender && (
											<iframe
												title="web_embed"
												width="100%"
												height="550px"
												style={{ border: 0 }}
												loading="lazy"
												src={attr.website}
											/>
										)}
										<Button
											variant="outlined"
											href={attr.website}
											target="_blank"
										>
											Visit the Website
										</Button>
									</Box>
								</CardContent>
							</Card>
						)}
						<StatCard
							title="About"
							style={{
								width:
									attr.website === "404" ? "100%" : "320px",
								display: "flex",
								flexDirection:
									attr.website === "404" ? "row" : "column",
								borderRadius: "16px",
								backgroundColor: "#f7e5ca",
								justifyContent: "center",
								alignItems: "center"
							}}
						>
							<SimpleStat
								label=""
								value={attr.city + ", " + attr.state}
								icon={PlaceIcon}
							/>
							{attr.heritage && (
								<SimpleStat
									label="Recognized Cultural Heritage"
									value={"Cultural Heritage"}
									icon={AssuredWorkloadIcon}
								/>
							)}
							<CardContent
								sx={{
									display: "flex",
									alignItems: "center",
									flexDirection: "column"
								}}
							>
								<Typography
									sx={{ fontSize: "28px", align: "center" }}
									component="legend"
								>
									OpenTripMap
								</Typography>
								<Typography sx={{ fontSize: "18px" }}>
									Official Rating
								</Typography>
								<Typography sx={{ fontSize: "20px" }}>
									{ratingValue[attr.otmRating - 1]}
								</Typography>
								<Rating
									name="attraction_rating_1"
									max={5}
									value={(attr.otmRating / 3) * 5}
									readOnly
									size="large"
								/>
							</CardContent>
							<CardContent
								sx={{
									display: "flex",
									alignItems: "center",
									flexDirection: "column"
								}}
							>
								<Typography
									sx={{ fontSize: "28px", align: "center" }}
									component="legend"
								>
									Google Maps
								</Typography>
								<Typography sx={{ fontSize: "18px" }}>
									Official Rating
								</Typography>
								<Rating
									name="attraction_rating_2"
									precision={0.5}
									max={5}
									value={attr.placesRating}
									readOnly
									size="large"
								/>
							</CardContent>
							<SimpleStat
								label="Positional Data"
								value={
									attr.latitude.toFixed(3) +
									", " +
									attr.longitude.toFixed(3)
								}
								icon={MyLocationIcon}
							/>
						</StatCard>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							flexWrap: "wrap",
							alignItems: "stretch",
							width: "100%"
						}}
					>
						{attr.openingHours !== null &&
							attr.openingHours.length !== 0 &&
							attr.contact !== "No contact" && (
								<StatCard
									title="Hours and Contact"
									style={{
										width: "320px",
										display: "flex",
										flexDirection: "column",
										borderRadius: "16px",
										backgroundColor: "#f7e5ca",
										justifyContent: "center",
										alignItems: "center"
									}}
								>
									{attr.openingHours !== null &&
										attr.openingHours.length !== 0 && (
											<Typography
												sx={{
													fontSize: "28px",
													align: "center"
												}}
												component="legend"
											>
												<AccessTimeIcon /> Hours of
												Operation
											</Typography>
										)}

									{attr.openingHours !== null &&
										attr.openingHours.length !== 0 &&
										attr.openingHours.map((item) => (
											<Typography variant="overline">
												{item}
											</Typography>
										))}
									{attr.contact !== "No Contact" && (
										<SimpleStat
											label={attr.contact}
											value="Contact Us"
											icon={PhoneIcon}
										/>
									)}
								</StatCard>
							)}
						<Card
							className="instanceCard card"
							elevation={3}
							style={{
								width:
									attr.contact === "No Contact" &&
									attr.openingHours === null
										? "100%"
										: "auto",
								borderRadius: "16px"
							}}
						>
							<CardContent>
								<Typography
									gutterBottom
									variant="h4"
									component="div"
									align="center"
								>
									Map
								</Typography>
								<Box style={{ textAlign: "center" }}>
									<iframe
										title="map_frame"
										width="768"
										height="450"
										style={{ border: 0 }}
										loading="lazy"
										src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCNeTLLH83DplVigjOugoPDOadr9c5xu6s&q=${attr.name}+${attr.state}`}
									/>
								</Box>
							</CardContent>
						</Card>
					</div>
					{attr.reviews !== null && this.getReviews(attr.reviews)}
					{showNearbyCharities && (
						<Typography
							variant="h3"
							sx={{
								paddingTop: "36px",
								paddingBottom: "24px",
								textAlign: "center"
							}}
						>
							Charities in the same City
						</Typography>
					)}
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
					{showNearbyCharities && (
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								marginTop: "16px"
							}}
						>
							<Button
								variant="outlined"
								href={`/charities?city=${attr.city}&state=${attr.state}`}
							>
								View All Charities in the same City
							</Button>
						</Box>
					)}
					{showCity && (
						<Typography
							variant="h3"
							sx={{
								paddingTop: "36px",
								paddingBottom: "24px",
								textAlign: "center"
							}}
						>
							You can find us at ...
						</Typography>
					)}
					<Stack
						direction="row"
						flexWrap="wrap"
						justifyContent="center"
					>
						{this.state.city !== undefined &&
						this.state.city !== null ? (
							<CityModelCard
								key={"City" + this.state.city.id}
								city={this.state.city}
							/>
						) : null}
					</Stack>
					{showCity && (
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
								href={`/cities?name=${attr.city}&state=${attr.state}`}
							>
								Explore the City
							</Button>
						</Box>
					)}
				</Stack>
			</Container>
		);
	}
}

export default AttractionInstancePage;

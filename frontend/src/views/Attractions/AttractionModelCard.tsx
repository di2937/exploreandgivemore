import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import { CardContent, Typography, Chip, Stack } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ModelCard from "../../components/common/ModelCard";
import StarIcon from "@mui/icons-material/Star";
import Highlighter from "react-highlight-words";
import Attraction from "./Attraction";
import "./attractionStyle.css";

interface AttractionModelCardProps {
	attraction: Attraction;
	query?: string;
	showKinds?: boolean;
	showAllKinds?: boolean;
	showHeritage?: boolean;
	showTypes?: boolean;
	showAllTypes?: boolean;
	showRating?: boolean;
	showOtmRating?: boolean;
	showPlacesRating?: boolean;
	onTypesClick?: (kind: string) => void;
	onKindsClick?: (kind: string) => void;
}

function handleRating(rating: string | undefined, color: string = "#ffd27d") {
	if (rating === undefined) {
		return (
			<Typography
				variant="body2"
				color="text.secondary"
				style={{ paddingLeft: "5px" }}
			>
				Unknown
			</Typography>
		);
	}

	let intRating: number | undefined = parseFloat(rating);
	const stars: any[] = [];

	for (let i = 0; i < 5; i++) {
		stars.push(
			i < intRating ? (
				<StarIcon style={{ color: color }} />
			) : (
				<StarBorderIcon style={{ color: color }} />
			)
		);
	}

	return (
		<Typography
			variant="body2"
			color="text.secondary"
			style={{ paddingLeft: "5px" }}
		>
			{stars}
		</Typography>
	);
}

function AttractionModelCard(props: AttractionModelCardProps) {
	let attraction = props.attraction;
	let types = [];
	let kinds = [];

	for (let i = 0; i < Math.min(3, (attraction.kinds ?? []).length); i++) {
		kinds.push(attraction.kinds[i]);
	}

	for (let i = 0; i < Math.min(3, attraction.types.length); i++) {
		types.push(attraction.types[i]);
	}

	return (
		<ModelCard
			height="310px"
			width="270px"
			imageMinHeight="100px"
			image={attraction.imageURL}
			href={`/attractions/${attraction.id}`}
		>
			<CardContent>
				<Typography variant="h6" component="div">
					<Highlighter
						highlightClassName="highlighter"
						searchWords={props.query?.split(" ") ?? []}
						autoEscape={true}
						textToHighlight={
							attraction.name.length < 20
								? attraction.name
								: attraction.name.substring(0, 20) + "..."
						}
					/>
				</Typography>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "baseline"
					}}
				>
					<Typography
						variant="subtitle1"
						color="text.secondary"
						paddingRight="5px"
					>
						<Highlighter
							highlightClassName="highlighter"
							searchWords={props.query?.split(" ") ?? []}
							autoEscape={true}
							textToHighlight={attraction.city}
						/>
					</Typography>
					<Typography variant="body2" color="text.secondary">
						<Highlighter
							highlightClassName="highlighter"
							searchWords={props.query?.split(" ") ?? []}
							autoEscape={true}
							textToHighlight={attraction.state}
						/>
					</Typography>
				</div>
				<div style={{ display: "flex" }}>
					{props.showRating && (
						<Typography
							variant="body2"
							color="text.secondary"
							style={{ paddingTop: "2px" }}
						>
							Popularity:{" "}
						</Typography>
					)}
					{props.showRating &&
						!props.showOtmRating &&
						handleRating("" + attraction.placesRating)}
					{props.showRating &&
						props.showOtmRating &&
						handleRating("" + attraction.otmRating, "#ffa371")}
					{props.showHeritage && attraction.heritage ? (
						<AssuredWorkloadIcon
							style={{ paddingLeft: "5px", color: "#0077d4" }}
						/>
					) : (
						<Typography
							variant="body2"
							color="text.secondary"
							style={{ paddingTop: "2px", paddingLeft: "2px" }}
						></Typography>
					)}
				</div>
				<Stack
					direction="row"
					flexWrap="wrap"
					gap="8px"
					sx={{ marginTop: "8px" }}
				>
					{props.showTypes &&
						(props.showAllTypes
							? props.attraction.types
							: types
						).map((label) => (
							<Chip
								key={attraction.id + label}
								onMouseDown={(event) => event.stopPropagation()}
								onClick={
									props.onTypesClick == null
										? undefined
										: (event) => {
												event.stopPropagation();
												event.preventDefault();
												props.onTypesClick!(label);
										  }
								}
								label={
									<Highlighter
										highlightClassName="highlighter-chip"
										searchWords={
											props.query?.split(" ") ?? []
										}
										autoEscape={true}
										textToHighlight={label}
									/>
								}
								size="small"
								color="primary"
							/>
						))}
					{props.showKinds &&
						(props.showAllKinds
							? props.attraction.kinds
							: kinds
						).map((label) => (
							<Chip
								key={attraction.id + label}
								onMouseDown={(event) => event.stopPropagation()}
								onClick={
									props.onTypesClick == null
										? undefined
										: (event) => {
												event.stopPropagation();
												event.preventDefault();
												props.onKindsClick!(label);
										  }
								}
								label={
									<Highlighter
										highlightClassName="highlighter-chip"
										searchWords={
											props.query?.split(" ") ?? []
										}
										autoEscape={true}
										textToHighlight={label}
									/>
								}
								size="small"
								color="info"
							/>
						))}
				</Stack>
			</CardContent>
		</ModelCard>
	);
}

export default AttractionModelCard;

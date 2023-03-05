import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./cityStyle.css";
import ModelCard from "../../components/common/ModelCard";
import { Chip, Stack, Rating } from "@mui/material";
import Highlighter from "react-highlight-words";
import City from "./City";
import { MonetizationOn as MonetizationOnIcon } from "@mui/icons-material";

interface CityModelCardProps {
	city: City;
	query?: string;
	showAllKnownFor?: boolean;
	showBudget?: boolean;
	showTimezone?: boolean;
	showSafety?: boolean;
	showElevation?: boolean;
	showPopulationDensity?: boolean;
	showAverageRating?: boolean;
	showNumCharities?: boolean;
	onKnownForClick?: (knownFor: string) => void;
}

function CityModelCard(props: CityModelCardProps) {
	let city = props.city;
	let kf = [];
	for (let i = 0; i < Math.min(3, city.knownFor.length); i++) {
		kf.push(city.knownFor[i]);
	}

	return (
		<ModelCard
			height="310px"
			width="270px"
			imageMinHeight="125px"
			image={city.imageUrl}
			href={`/cities/${city.id}`}
		>
			<CardContent>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "baseline"
					}}
				>
					<Typography variant="h5" component="div" paddingRight="5px">
						<Highlighter
							highlightClassName="highlighter"
							searchWords={props.query?.split(" ") ?? []}
							autoEscape={true}
							textToHighlight={city.name}
						/>
					</Typography>
					<Typography variant="subtitle1" color="text.secondary">
						<Highlighter
							highlightClassName="highlighter"
							searchWords={props.query?.split(" ") ?? []}
							autoEscape={true}
							textToHighlight={city.state}
						/>
					</Typography>
				</div>
				<Typography variant="body2" color="text.secondary">
					Population:{" "}
					{city.population === 0
						? "Unknown"
						: city.population.toLocaleString("en-US")}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Area: {Math.round(city.area).toLocaleString()} sq miles
				</Typography>
				{props.showBudget && (
					<div style={{ display: "flex", flexDirection: "row" }}>
						<Typography variant="body2" color="text.secondary">
							Budget Score:{" "}
						</Typography>
						<Rating
							name="budget"
							precision={0.5}
							max={5}
							value={city.budget}
							readOnly
							size="small"
							icon={
								<MonetizationOnIcon
									style={{ fontSize: "20px" }}
								/>
							}
							emptyIcon={
								<MonetizationOnIcon
									style={{ fontSize: "20px" }}
								/>
							}
						/>
					</div>
				)}
				{props.showTimezone && (
					<Typography variant="body2" color="text.secondary">
						Time Zone: {city.timezone}
					</Typography>
				)}
				{props.showSafety && (
					<Typography variant="body2" color="text.secondary">
						Safety Score:{" "}
						<Rating
							name="safety"
							max={5}
							value={city.safety}
							readOnly
							size="small"
						/>
					</Typography>
				)}
				{props.showElevation && (
					<Typography variant="body2" color="text.secondary">
						Elevation: {city.elevation.toLocaleString()} ft
					</Typography>
				)}
				{props.showPopulationDensity && (
					<Typography variant="body2" color="text.secondary">
						Population Density:{" "}
						{Math.round(city.populationDensity).toLocaleString()}{" "}
						people per sq mile
					</Typography>
				)}
				{props.showAverageRating && (
					<Typography variant="body2" color="text.secondary">
						Average Rating:{" "}
						<Rating
							name="rating"
							precision={0.5}
							max={5}
							value={parseInt(city.averageRating.toFixed(1))}
							readOnly
							size="small"
						/>
					</Typography>
				)}
				{props.showNumCharities && (
					<Typography variant="body2" color="text.secondary">
						Number of Charities:{" "}
						{city.numCharities === 0
							? "Unknown"
							: city.numCharities.toLocaleString("en-US")}
					</Typography>
				)}
				<Stack
					direction="row"
					flexWrap="wrap"
					gap="8px"
					sx={{ marginTop: "8px" }}
				>
					{(props.showAllKnownFor ? props.city.knownFor : kf).map(
						(label) => (
							<Chip
								key={city.id + label}
								onMouseDown={(event) => event.stopPropagation()}
								onClick={
									props.onKnownForClick === null
										? undefined
										: (event) => {
												event.stopPropagation();
												event.preventDefault();
												props.onKnownForClick!(label);
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
						)
					)}
				</Stack>
			</CardContent>
		</ModelCard>
	);
}

export default CityModelCard;

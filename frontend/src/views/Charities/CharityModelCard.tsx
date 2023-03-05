import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./charityStyle.css";
import ModelCard from "../../components/common/ModelCard";
import { Box, Rating, Stack } from "@mui/material";
import Highlighter from "react-highlight-words";
import CharityObj from "./Charity";

interface CharityModelCardProps {
	charity: CharityObj;
	id: number;
	query?: string;
	showCauseArea?: string;
	showStarRatings?: boolean;
	showDonationOptions?: boolean;
}

function CharityModelCard(props: CharityModelCardProps) {
	let charity = props.charity;
	let id = props.id;

	return (
		<>
			<ModelCard
				height="310px"
				width="270px"
				imageMinHeight="100px"
				image={`https://logo.clearbit.com/${charity.website}?size=300`}
				href={`/charity/${id}`}
			>
				<CardContent>
					<Typography variant="h5" component="div">
						<Highlighter
							highlightClassName="highlighter"
							searchWords={props.query?.split(" ") ?? []}
							autoEscape={true}
							textToHighlight={
								charity.name.length < 18
									? charity.name
									: charity.name.substring(0, 18) + "..."
							}
						/>
					</Typography>
					<Typography variant="subtitle1" color="text.secondary">
						<Highlighter
							highlightClassName="highlighter"
							searchWords={props.query?.split(" ") ?? []}
							autoEscape={true}
							textToHighlight={
								charity.causeArea?.join(", ").trimEnd() ??
								"No Cause Area Specified"
							}
						/>
					</Typography>
					<Typography variant="body2" color="text.secondary">
						<Highlighter
							highlightClassName="highlighter"
							searchWords={props.query?.split(" ") ?? []}
							autoEscape={true}
							textToHighlight={
								charity.city + ", " + charity.state
							}
						/>
					</Typography>
					<Stack>
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{ mr: 1 }}
						>
							Donation Options:
						</Typography>
						<Typography variant="body2" color="text.secondary">
							<Highlighter
								highlightClassName="highlighter"
								searchWords={props.query?.split(" ") ?? []}
								autoEscape={true}
								textToHighlight={charity.deductibility}
							/>
						</Typography>
					</Stack>
					<Box sx={{ marginTop: "3px" }}>
						<Rating
							name="half-rating-read"
							value={charity.rating}
							precision={0.25}
							readOnly
						/>
					</Box>
				</CardContent>
			</ModelCard>
		</>
	);
}

export default CharityModelCard;

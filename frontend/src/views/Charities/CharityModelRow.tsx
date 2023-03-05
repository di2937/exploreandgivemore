import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./charityStyle.css";
import ModelRow from "../../components/common/ModelRow";
import { Stack, Box, Rating } from "@mui/material";
import Highlighter from "react-highlight-words";
import CharityObj from "./Charity";

interface CharityModelRowProps {
	charity: CharityObj;
	id: number;
	query?: string;
	showCauseArea?: string;
	showStarRatings?: boolean;
	showDonationOptions?: boolean;
}

function CharityModelRow(props: CharityModelRowProps) {
	let charity = props.charity;
	let id = props.id;

	return (
		<>
			<ModelRow href={`/charity/${id}`}>
				<CardContent
					sx={{ width: "100%", display: "grid", m: "0", p: 0 }}
				>
					<Stack
						direction="row"
						alignItems="center"
						spacing={2}
						sx={{ gridAutoColumns: "1fr" }}
					>
						<Box sx={{ minWidth: "50px", marginLeft: "10px" }}>
							<img
								alt="charity logo"
								src={`https://logo.clearbit.com/${charity.website}?size=300`}
								style={{
									overflow: "hidden",
									borderRadius: "0",
									maxHeight: "40px",
									maxWidth: "50px",
									objectFit: "contain"
								}}
							/>
						</Box>
						<Stack
							direction="row"
							alignItems="center"
							spacing={2}
							flexGrow="3"
						>
							<Stack flexGrow="2">
								<Typography variant="h6" sx={{ pb: 0 }}>
									<Highlighter
										highlightClassName="highlighter"
										searchWords={
											props.query?.split(" ") ?? []
										}
										autoEscape={true}
										textToHighlight={charity.name}
									/>
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ pt: 0 }}
								>
									<Highlighter
										highlightClassName="highlighter"
										searchWords={
											props.query?.split(" ") ?? []
										}
										autoEscape={true}
										textToHighlight={
											charity.city + ", " + charity.state
										}
									/>
								</Typography>
							</Stack>
							<Stack minWidth="400px">
								<Typography
									variant="subtitle1"
									color="text.secondary"
								>
									<Highlighter
										highlightClassName="highlighter"
										searchWords={
											props.query?.split(" ") ?? []
										}
										autoEscape={true}
										textToHighlight={
											charity.causeArea
												?.join(", ")
												.trimEnd() ??
											"No Cause Area Specified"
										}
									/>
								</Typography>
								<Stack direction="row">
									<Typography
										variant="body2"
										color="text.secondary"
										sx={{ mr: 1 }}
									>
										Donation Options:
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
									>
										<Highlighter
											highlightClassName="highlighter"
											searchWords={
												props.query?.split(" ") ?? []
											}
											autoEscape={true}
											textToHighlight={
												charity.deductibility
											}
										/>
									</Typography>
								</Stack>
							</Stack>
						</Stack>
						<Box>
							<Rating
								name="half-rating-read"
								value={charity.rating}
								precision={0.25}
								readOnly
								sx={{ marginRight: "10px" }}
							/>
						</Box>
					</Stack>
				</CardContent>
			</ModelRow>
		</>
	);
}

export default CharityModelRow;

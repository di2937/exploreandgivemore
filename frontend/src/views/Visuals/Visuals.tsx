import { Typography, Container, Stack } from "@mui/material";
import { Theme } from "../../Theme";

// Add your components here ↓
import AverageRatingEvelationLinearScatter from "./LinearTrendsPerState";
import HeritagePerTypeBarChart from "./HeritagePerTypeBarChart";
import CauseAreaPieChart from "./CauseAreaPieChart";

function VisualsPage(props: any) {
	return (
		<Container
			className="page-container"
			maxWidth="xl"
			sx={{
				textAlign: "center",
				backgroundColor: Theme.palette.info.light
			}}
		>
			<Stack
				justifyContent="center"
				direction="column"
				textAlign="center"
			>
				<Typography className="modelTitle" variant="h2" gutterBottom>
					Visualizations from Explore & Give More
				</Typography>
				<Typography
					gutterBottom
					sx={{ margin: "16px 0 8px 0" }}
					variant="h4"
				>
					Average Rating of Cities vs. Elevation of Cities (grouped by
					state)
				</Typography>
				<AverageRatingEvelationLinearScatter />
				<Typography
					gutterBottom
					sx={{ margin: "16px 0 8px 0" }}
					variant="h4"
				>
					Charities and their Cause Areas
				</Typography>
				<CauseAreaPieChart />
				<Typography
					gutterBottom
					sx={{ margin: "16px 0 8px 0" }}
					variant="h4"
				>
					Heritage vs Non Heritage Counts for Attractions grouped by
					Types
				</Typography>
				<HeritagePerTypeBarChart />
			</Stack>
		</Container>
	);
}

export default VisualsPage;

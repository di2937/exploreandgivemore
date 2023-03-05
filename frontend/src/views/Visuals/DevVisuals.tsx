import { Typography, Container, Stack } from "@mui/material";
import { Theme } from "../../Theme";

// Add your components here ↓
import LaunchesOverTheYearsBarChart from "./LaunchesOverTheYears";
import PlanetDataRadarPlot from "./PlanetDataRadarChart";
import SpaceRaceLineChart from "./SpaceRaceLinePlot";

function DevVisualsPage(props: any) {
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
					Visualizations from Clear Skies
				</Typography>
				<Typography
					gutterBottom
					sx={{ margin: "16px 0 8px 0" }}
					variant="h4"
				>
					Quarterly Report of Number of Launches Over Time
				</Typography>
				<LaunchesOverTheYearsBarChart />
				<Typography
					gutterBottom
					sx={{ margin: "16px 0 8px 0" }}
					variant="h4"
				>
					Important Attributes about Solar System Planets
				</Typography>
				<PlanetDataRadarPlot />
				<Typography
					gutterBottom
					sx={{ margin: "16px 0 8px 0" }}
					variant="h4"
				>
					Number of Satellites lauched by USA and Commonwealth of
					Independent States (CIS)
				</Typography>
				<SpaceRaceLineChart />
			</Stack>
		</Container>
	);
}

export default DevVisualsPage;

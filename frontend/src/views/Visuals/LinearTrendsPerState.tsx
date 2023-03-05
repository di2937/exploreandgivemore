import { API_BASE_URL } from "../../services/apiBase";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	ResponsiveContainer,
	CartesianGrid,
	Label,
	Tooltip
} from "recharts";
import { Box, Stack, Typography } from "@mui/material";
import LoadingBuffer from "../../components/loading/LoadingBuffer";
import City from "../Cities/City";
import { parseJSONCityGrid } from "../../services/cityQuery";
import { Theme } from "../../Theme";

interface StateStats {
	instanceCount: number;
	totalAvgRating: number;
	totalElevation: number;
}

const processData = (cities: City[]) => {
	let toReturn: any[] = [];
	let map: Map<string, StateStats> = new Map<string, StateStats>();
	for (const city of cities) {
		let key: string = city.state;
		let value: StateStats = map.get(key) ?? {
			instanceCount: 0,
			totalAvgRating: 0,
			totalElevation: 0
		};

		value.instanceCount += 1;
		value.totalAvgRating += city.averageRating;
		value.totalElevation += city.elevation;

		map.set(key, value);
	}

	map.forEach((value: StateStats, key: string) => {
		toReturn.push({
			x: value.totalElevation / value.instanceCount,
			y: value.totalAvgRating / value.instanceCount,
			name: key
		});
	});

	return toReturn;
};

const renderTooltip = (props: any) => {
	const { active, payload } = props;

	if (active && payload != null && payload.length > 0) {
		const data = payload[0].payload;

		return (
			<Box
				sx={{
					backgroundColor: "white",
					margin: 0,
					borderRadius: "16px",
					padding: "16px",
					border: "1px solid black"
				}}
			>
				<Typography>{"State: " + data.name}</Typography>
				<Typography>
					{"Average Elevation of Cities: " + data.x.toLocaleString()}
				</Typography>
				<Typography>
					{"Average Rating of Cities: " + data.y.toFixed(2)}
				</Typography>
			</Box>
		);
	}

	return null;
};

const scatterChart = (data: any[]) => {
	return (
		<ResponsiveContainer width="100%" height={400}>
			<ScatterChart
				width={800}
				height={400}
				margin={{
					top: 20,
					right: 30,
					left: 20,
					bottom: 30
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="x" type="number" unit="m">
					<Label
						value="Average Elevation of Cities"
						offset={-16}
						position="insideBottom"
						style={{ textAnchor: "middle" }}
					/>
				</XAxis>
				<YAxis dataKey="y" type="number" domain={[3, 5]}>
					<Label
						angle={-90}
						value="Average Rating of Cities"
						position="insideLeft"
						style={{ textAnchor: "middle" }}
					/>
				</YAxis>
				<Scatter data={data} fill={Theme.palette.primary.main} />
				<Tooltip content={renderTooltip} />
			</ScatterChart>
		</ResponsiveContainer>
	);
};

function AverageRatingEvelationLinearScatter(props: any) {
	let [data, setData] = useState<any[]>([]);

	useEffect(() => {
		if (data.length === 0) {
			const getData = async () => {
				let cityResponse: AxiosResponse<any, any> = await axios.get(
					`${API_BASE_URL}/cities?per_page=600`
				);

				let cities = cityResponse.data["data"]["cities"];
				let newData = processData(parseJSONCityGrid(cities));
				setData(newData);
			};

			getData().then(() => console.log("loaded"));
		}
	}, [data]);

	let visual = <LoadingBuffer height="300px" />;
	if (data.length > 0) {
		visual = scatterChart(data);
	}

	return (
		<Stack justifyContent="center">
			<Typography sx={{ margin: "8px" }} variant="body1">
				Interesting Trends: Increase in elevation seems to indicate an
				increase in average rating...
			</Typography>
			<Box display="flex" justifyContent="center">
				{visual}
			</Box>
		</Stack>
	);
}

export default AverageRatingEvelationLinearScatter;

import { Stack, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import {
	CartesianGrid,
	Label,
	Tooltip,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Legend,
	LineChart,
	Line
} from "recharts";
import LoadingBuffer from "../../components/loading/LoadingBuffer";
import { Theme } from "../../Theme";
import { DEV_API_BASE_URL } from "../../services/apiBase";

function SpaceRaceLineChart(props: any) {
	let [data, setData] = useState<any[]>([]);
	let [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (data.length === 0) {
			setLoading(true);

			const fetchData = async () => {
				let temp: any[] = [];
				let response: AxiosResponse<any, any> = await axios.get(
					`${DEV_API_BASE_URL}/satellites?sort=launch_date`
				);

				let usaMap: Map<string, number> = new Map<string, number>();
				let cisMap: Map<string, number> = new Map<string, number>();

				for (let satellite of response.data["satellites"]) {
					let country: string = satellite.country ?? "";
					if (country === "US") {
						let launchDate: Date = new Date(satellite.launch_date);
						let launchYear: string = String(
							launchDate.getFullYear()
						);
						usaMap.set(
							launchYear,
							(usaMap.get(launchYear) ?? 0) + 1
						);
						cisMap.set(launchYear, cisMap.get(launchYear) ?? 0);
					}

					if (country === "CIS") {
						let launchDate: Date = new Date(satellite.launch_date);
						let launchYear: string = String(
							launchDate.getFullYear()
						);
						usaMap.set(launchYear, usaMap.get(launchYear) ?? 0);
						cisMap.set(
							launchYear,
							(cisMap.get(launchYear) ?? 0) + 1
						);
					}
				}

				usaMap.forEach((value: number, key: string) => {
					temp.push({ name: key, usa: value, cis: cisMap.get(key) });
				});
				console.log(temp);
				setData(temp);
				setLoading(false);
			};

			fetchData();
		}
	}, [data]);

	if (loading) {
		return <LoadingBuffer height="300px" />;
	}

	return (
		<Stack justifyContent="center">
			<Typography sx={{ margin: "8px" }} variant="body1">
				This timeline can serve as a proxy for the late space race
				status USA and USSR
			</Typography>
			<ResponsiveContainer width="100%" height={400}>
				<LineChart
					data={data}
					margin={{
						top: 20,
						right: 30,
						left: 20,
						bottom: 5
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" tick={false}>
						<Label
							value="Year of Launch →"
							position="insideBottom"
							style={{ textAnchor: "middle" }}
						/>
					</XAxis>
					<YAxis>
						<Label
							angle={-90}
							position="insideLeft"
							value="Number of Satellites Launched →"
							style={{ textAnchor: "middle" }}
						/>
					</YAxis>
					<Tooltip payload={data} />
					<Line
						name="United States of America"
						type="monotone"
						dataKey="usa"
						stroke={Theme.palette.primary.main}
					/>
					<Line
						name="Commonwealth of Independent States"
						type="monotone"
						dataKey="cis"
						stroke={Theme.palette.success.main}
					/>
					<Legend />
				</LineChart>
			</ResponsiveContainer>
		</Stack>
	);
}

export default SpaceRaceLineChart;

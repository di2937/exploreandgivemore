import { Stack, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Label,
	Tooltip,
	XAxis,
	YAxis,
	ResponsiveContainer
} from "recharts";
import LoadingBuffer from "../../components/loading/LoadingBuffer";
import { Theme } from "../../Theme";
import { DEV_API_BASE_URL } from "../../services/apiBase";

function LaunchesOverTheYearsBarChart(props: any) {
	let [data, setData] = useState<any[]>([]);
	let [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (data.length === 0) {
			setLoading(true);

			const parseQuarter = (month: number) => {
				switch (month) {
					case 1:
					case 2:
					case 3:
						return "Jan-Mar";
					case 4:
					case 5:
					case 6:
						return "Apr-Jun";
					case 7:
					case 8:
					case 9:
						return "Jul-Sep";
					case 10:
					case 11:
					case 12:
						return "Oct-Dec";
					default:
						return "Error";
				}
			};

			const fetchData = async () => {
				let temp: any[] = [];
				let response: AxiosResponse<any, any> = await axios.get(
					`${DEV_API_BASE_URL}/launches?sort=date_utc`
				);

				let map: Map<string, number> = new Map<string, number>();
				for (let launch of response.data["launches"]) {
					let launchDate: Date = new Date(launch.date_utc);
					let launchQuarter: string = parseQuarter(
						launchDate.getMonth() + 1
					);
					let launchYear: string = String(launchDate.getFullYear());
					let mapKey: string = `${launchQuarter} ${launchYear}`;
					map.set(mapKey, (map.get(mapKey) ?? 0) + 1);
				}

				map.forEach((value: number, key: string) => {
					temp.push({ name: key, Frequency: value });
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
				Interesting Trends: Growing number of launches over time...
			</Typography>
			<ResponsiveContainer width="100%" height={400}>
				<BarChart
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
							value="Quarter and Year of Launch →"
							position="insideBottom"
							style={{ textAnchor: "middle" }}
						/>
					</XAxis>
					<YAxis>
						<Label
							angle={-90}
							position="insideLeft"
							value="Number of Launches →"
							style={{ textAnchor: "middle" }}
						/>
					</YAxis>
					<Tooltip payload={data} />
					<Bar
						dataKey="Frequency"
						fill={Theme.palette.primary.main}
					/>
				</BarChart>
			</ResponsiveContainer>
		</Stack>
	);
}

export default LaunchesOverTheYearsBarChart;

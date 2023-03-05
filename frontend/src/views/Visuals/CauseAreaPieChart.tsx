import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Pie, Tooltip, PieChart, ResponsiveContainer } from "recharts";
import LoadingBuffer from "../../components/loading/LoadingBuffer";
import { API_BASE_URL } from "../../services/apiBase";
import CharityObj from "../Charities/Charity";
import { parseJSONCharityGrid } from "../../services/charityParser";

function CauseAreaPieChart(props: any) {
	let [data, setData] = useState<any[]>([]);
	let [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (data.length === 0) {
			setLoading(true);

			const fetchData = async () => {
				let temp: any[] = [];
				let response: AxiosResponse<any, any> = await axios.get(
					`${API_BASE_URL}/charities?per_page=6000`
				);

				let charities: CharityObj[] = parseJSONCharityGrid(
					response.data["data"]["charities"]
				);
				let map: Map<string, number> = new Map<string, number>();
				for (let charity of charities) {
					let causes = charity.causeArea ?? [];
					for (let cause of causes) {
						map.set(cause, (map.get(cause) ?? 0) + 1);
					}
				}

				map.forEach((value: number, key: string) => {
					if (value > 150) {
						temp.push({ name: key, value: value });
					}
				});
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
		<ResponsiveContainer width="100%" height={400}>
			<PieChart width={800} height={800}>
				<Pie
					data={data}
					dataKey="value"
					nameKey="name"
					cx="50%"
					cy="50%"
					innerRadius={80}
					outerRadius={120}
					fill="#82ca9d"
					label
				/>
				<Tooltip />
			</PieChart>
		</ResponsiveContainer>
	);
}

export default CauseAreaPieChart;

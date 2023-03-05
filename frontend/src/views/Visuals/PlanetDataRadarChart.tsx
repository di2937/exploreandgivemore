import { Stack } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import {
	Legend,
	ResponsiveContainer,
	RadarChart,
	Radar,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis
} from "recharts";
import LoadingBuffer from "../../components/loading/LoadingBuffer";
import { Theme } from "../../Theme";
import { DEV_API_BASE_URL } from "../../services/apiBase";

interface RadarData {
	category: string;
	fullMark: number;
	Mercury: number;
	Venus: number;
	Earth: number;
	Mars: number;
	Jupiter: number;
	Saturn: number;
	Uranus: number;
	Neptune: number;
}

const COLORS: string[] = [
	Theme.palette.primary.main,
	"#965608",
	Theme.palette.success.main,
	"#34097a"
];

function PlanetDataRadarPlot(props: any) {
	let [data, setData] = useState<any[]>([]);
	let [planets, setPlanets] = useState<string[]>([]);
	let [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (data.length === 0) {
			setLoading(true);

			const fetchData = async () => {
				let temp: RadarData[] = [];
				let planetTemp: string[] = [];
				let response: AxiosResponse<any, any> = await axios.get(
					`${DEV_API_BASE_URL}/planetsmoons?search=Planet`
				);

				temp.push({
					category: "Average Temperature (K)",
					fullMark: 10,
					Mercury: 0,
					Venus: 0,
					Earth: 0,
					Mars: 0,
					Jupiter: 0,
					Saturn: 0,
					Uranus: 0,
					Neptune: 0
				});

				temp.push({
					category: "Density (kg/m^3)",
					fullMark: 10,
					Mercury: 0,
					Venus: 0,
					Earth: 0,
					Mars: 0,
					Jupiter: 0,
					Saturn: 0,
					Uranus: 0,
					Neptune: 0
				});

				temp.push({
					category: "Gravity (m/s^2)",
					fullMark: 10,
					Mercury: 0,
					Venus: 0,
					Earth: 0,
					Mars: 0,
					Jupiter: 0,
					Saturn: 0,
					Uranus: 0,
					Neptune: 0
				});

				temp.push({
					category: "Mean Radius (m)",
					fullMark: 10,
					Mercury: 0,
					Venus: 0,
					Earth: 0,
					Mars: 0,
					Jupiter: 0,
					Saturn: 0,
					Uranus: 0,
					Neptune: 0
				});

				for (let planet of response.data["planetsmoons"]) {
					let avgTemp = (planet.average_temperature * 10.0) / 800;
					let density = (parseFloat(planet.density) / 6) * 10;
					let gravity = (parseFloat(planet.gravity) / 25) * 10;
					let meanRad = (parseFloat(planet.mean_radius) / 70000) * 10;
					planetTemp.push(planet.name);
					switch (planet.name) {
						case "Mercury":
							temp[0].Mercury = avgTemp;
							temp[1].Mercury = density;
							temp[2].Mercury = gravity;
							temp[3].Mercury = meanRad;
							break;
						case "Venus":
							temp[0].Venus = avgTemp;
							temp[1].Venus = density;
							temp[2].Venus = gravity;
							temp[3].Venus = meanRad;
							break;
						case "Earth":
							temp[0].Earth = avgTemp;
							temp[1].Earth = density;
							temp[2].Earth = gravity;
							temp[3].Earth = meanRad;
							break;
						case "Mars":
							temp[0].Mars = avgTemp;
							temp[1].Mars = density;
							temp[2].Mars = gravity;
							temp[3].Mars = meanRad;
							break;
						case "Jupiter":
							temp[0].Jupiter = avgTemp;
							temp[1].Jupiter = density;
							temp[2].Jupiter = gravity;
							temp[3].Jupiter = meanRad;
							break;
						case "Saturn":
							temp[0].Saturn = avgTemp;
							temp[1].Saturn = density;
							temp[2].Saturn = gravity;
							temp[3].Saturn = meanRad;
							break;
						case "Uranus":
							temp[0].Uranus = avgTemp;
							temp[1].Uranus = density;
							temp[2].Uranus = gravity;
							temp[3].Uranus = meanRad;
							break;
						case "Neptune":
							temp[0].Neptune = avgTemp;
							temp[1].Neptune = density;
							temp[2].Neptune = gravity;
							temp[3].Neptune = meanRad;
							break;
					}
				}

				console.log(temp);
				setPlanets(planetTemp);
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
		<Stack justifyContent="center" flexDirection="row" flexWrap="wrap">
			{planets.map((planetName, idx) => {
				return (
					<ResponsiveContainer width="45%" height={400}>
						<RadarChart
							outerRadius={90}
							width={300}
							height={300}
							data={data}
						>
							<PolarGrid />
							<PolarAngleAxis dataKey="category" />
							<PolarRadiusAxis angle={45} domain={[0, 10]} />
							<Radar
								name={planetName}
								dataKey={planetName}
								stroke={COLORS[idx % COLORS.length]}
								fill={COLORS[idx % COLORS.length]}
								fillOpacity={0.6}
							/>
							<Legend />
						</RadarChart>
					</ResponsiveContainer>
				);
			})}
		</Stack>
	);
}

export default PlanetDataRadarPlot;

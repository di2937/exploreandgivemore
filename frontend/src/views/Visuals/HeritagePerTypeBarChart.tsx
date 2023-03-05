import React, { useEffect, useState } from "react";
import { Stack, TextField, MenuItem, Box } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../services/apiBase";
import LoadingBuffer from "../../components/loading/LoadingBuffer";
import {
	Legend,
	ResponsiveContainer,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Label,
	Tooltip,
	Bar
} from "recharts";
import { AttractionExactFitlers } from "../Attractions/AttractionFilters";
import { parseJSONAttractionGrid } from "../../services/attractionParser";
import Attraction from "../Attractions/Attraction";

const TYPES_INDEX: number = 3;
const baseValue = () => {
	if (AttractionExactFitlers[TYPES_INDEX].options === undefined) {
		return "";
	}
	return AttractionExactFitlers[TYPES_INDEX].options[0].label;
};

function HeritagePerTypeBarChart(props: any) {
	let [currentType, setCurrentType] = useState<string>(baseValue());
	let [data, setData] = useState<any[]>([]);
	let [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);

		const fetchData = async () => {
			let temp: any[] = [];
			let response: AxiosResponse<any, any> = await axios.get(
				`${API_BASE_URL}/attractions?types=${currentType}&per_page=3000`
			);

			let attractions: Attraction[] = parseJSONAttractionGrid(
				response.data["data"]["attractions"]
			);
			let heritageCount: number = 0;
			for (let attr of attractions) {
				if (attr.heritage) {
					heritageCount += 1;
				}
			}

			temp.push({
				name: currentType,
				heritage: heritageCount,
				nonHeritage: attractions.length - heritageCount
			});

			setData(temp);
			setLoading(false);
		};

		fetchData();
	}, [currentType]);

	if (loading) {
		return <LoadingBuffer height="300px" />;
	}

	return (
		<Box marginTop="16px">
			<TextField
				id="filter-field"
				select
				label="Attraction Type"
				value={currentType}
				onChange={(event) => setCurrentType(event.target.value)}
				InputProps={{
					sx: {
						borderRadius: "8px",
						flexGrow: 1,
						minWidth: "150px",
						display: "flex",
						textAlign: "start"
					}
				}}
			>
				{(AttractionExactFitlers[TYPES_INDEX].options ?? []).map(
					(option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					)
				)}
			</TextField>
			<Stack justifyContent="center" alignItems="center">
				<ResponsiveContainer width="30%" height={400}>
					<BarChart data={data} width={200} barCategoryGap={30}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis>
							<Label
								angle={-90}
								position="insideLeft"
								value="Number of Attractions →"
								style={{ textAnchor: "middle" }}
							/>
						</YAxis>
						<Tooltip />
						<Legend />
						<Bar
							dataKey="heritage"
							name="Heritage"
							fill="#8884d8"
						/>
						<Bar
							dataKey="nonHeritage"
							name="Non-Heritage"
							fill="#d9884e"
						/>
					</BarChart>
				</ResponsiveContainer>
			</Stack>
		</Box>
	);
}

export default HeritagePerTypeBarChart;

import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "../../components/search/SearchBar";
import { API_BASE_URL } from "../../services/apiBase";
import City from "../Cities/City";
import CityModelCard from "../Cities/CityModelCard";
import Attraction from "../Attractions/Attraction";
import AttractionModelCard from "../Attractions/AttractionModelCard";
import CharityObj from "../Charities/Charity";
import CharityModelCard from "../Charities/CharityModelCard";
import LoadingBuffer from "../../components/loading/LoadingBuffer";
import ViewAllBar from "../../components/search/ViewAllBar";
import { parseJSONCityGrid } from "../../services/cityQuery";
import { parseJSONCharityGrid } from "../../services/charityParser";
import { parseJSONAttractionGrid } from "../../services/attractionParser";

function Search(props: any) {
	const [searchParams] = useSearchParams();
	const [cities, setCities] = React.useState<City[] | null>(null);
	const [attractions, setAttractions] = React.useState<Attraction[] | null>(
		null
	);
	const [charities, setCharities] = React.useState<CharityObj[] | null>(null);
	const [totalCities, setTotalCities] = React.useState<number>(0);
	const [totalAttractions, setTotalAttractions] = React.useState<number>(0);
	const [totalCharities, setTotalCharities] = React.useState<number>(0);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchAttractions = async () => {
			setAttractions(null);
			let response: AxiosResponse<any, any> = await axios.get(
				`${API_BASE_URL}/attractions?` +
					searchParams.toString() +
					"&page=1&per_page=8"
			);
			let data = response.data["data"];
			setAttractions(parseJSONAttractionGrid(data["attractions"]));
			setTotalAttractions(data["total"]);
		};

		const fetchCities = async () => {
			setCities(null);
			let response: AxiosResponse<any, any> = await axios.get(
				`${API_BASE_URL}/cities?` +
					searchParams.toString() +
					"&page=1&per_page=8"
			);
			let data = response.data["data"];
			setCities(parseJSONCityGrid(data["cities"]));
			setTotalCities(data["total"]);
		};

		const fetchCharities = async () => {
			setCharities(null);
			let response: AxiosResponse<any, any> = await axios.get(
				`${API_BASE_URL}/charities?` +
					searchParams.toString() +
					"&page=1&per_page=8"
			);
			let data = response.data["data"];
			setCharities(parseJSONCharityGrid(data["charities"]));
			setTotalCharities(data["total"]);
		};
		fetchCities();
		fetchAttractions();
		fetchCharities();
	}, [searchParams]);

	const onViewAll = (link: string) => {
		navigate(link + "?" + searchParams.toString());
	};

	return (
		<main style={{ padding: "1rem" }}>
			<Container
				className="page-container"
				sx={{
					display: "flex",
					flexDirection: "column"
				}}
			>
				<Typography
					gutterBottom
					className="modelTitle"
					variant="h2"
					sx={{ textAlign: "center" }}
					style={{ marginTop: 30 }}
				>
					Search
				</Typography>
				<SearchBar model="Entire Site" bool={false} />
				<Typography
					variant="h3"
					sx={{ padding: "24px 8px 8px 8px", textAlign: "center" }}
				>
					Cities
				</Typography>
				{cities === null && <LoadingBuffer height="632px" />}
				{cities !== null && (
					<Stack
						direction="row"
						flexWrap="wrap"
						justifyContent="center"
					>
						{cities!.map((c) => (
							<CityModelCard
								key={c.id}
								city={c}
								query={searchParams.get("query") ?? undefined}
							/>
						))}
					</Stack>
				)}
				<ViewAllBar
					link="/cities"
					total={totalCities}
					onViewAll={onViewAll}
				/>

				<Typography
					variant="h3"
					sx={{ padding: "24px 8px 8px 8px", textAlign: "center" }}
				>
					Attractions
				</Typography>
				{attractions === null && <LoadingBuffer height="632px" />}
				{attractions !== null && (
					<Stack
						direction="row"
						flexWrap="wrap"
						justifyContent="center"
					>
						{attractions!.map((c) => (
							<AttractionModelCard
								key={c.id}
								attraction={c}
								query={searchParams.get("query") ?? undefined}
								showAllTypes={false}
								showTypes={true}
								showRating={true}
								showHeritage={true}
							/>
						))}
					</Stack>
				)}
				<ViewAllBar
					link="/attractions"
					total={totalAttractions}
					onViewAll={onViewAll}
				/>

				<Typography
					variant="h3"
					sx={{ padding: "24px 8px 8px 8px", textAlign: "center" }}
				>
					Charities
				</Typography>
				{charities === null && <LoadingBuffer height="632px" />}
				{charities !== null && (
					<Stack
						direction="row"
						flexWrap="wrap"
						justifyContent="center"
					>
						{charities!.map((c: CharityObj, index: number) => (
							<CharityModelCard
								key={c.id}
								charity={c}
								id={parseInt(c.id)}
								query={searchParams.get("query") ?? undefined}
							/>
						))}
					</Stack>
				)}
				<ViewAllBar
					link="/charities"
					total={totalCharities}
					onViewAll={onViewAll}
				/>
			</Container>
		</main>
	);
}

export default Search;

import City from "./City";
import { useEffect, useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import CityModelCard from "./CityModelCard";
import CardPagination from "../../components/common/CardPagination";
import { useSearchParams } from "react-router-dom";
import { parseJSONCityGrid } from "../../services/cityQuery";
import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../services/apiBase";
import LoadingBuffer from "../../components/loading/LoadingBuffer";
import SsfBar from "../../components/ssf-bar/SsfBar";
import { CityFilters, CityRangeFilters, CityExactFilters } from "./CityFilters";

function Cities() {
	let [searchParams, setSearchParams] = useSearchParams();
	let [cities, setCities] = useState<City[] | null>(null);
	let [total, setTotal] = useState<number>(0);
	let [page, setPage] = useState<number>(0);
	let [pageSize, setPageSize] = useState<number>(0);
	let [pageCount, setPageCount] = useState<number>(0);
	let [ssfFields, setSsfFields] = useState<Set<string>>(new Set<string>());

	useEffect(() => {
		const fetchData = async () => {
			setCities(null);
			setTotal(0);
			let response: AxiosResponse<any, any> = await axios.get(
				`${API_BASE_URL}/cities?` + searchParams
			);
			let data = response.data["data"];
			setCities(parseJSONCityGrid(data["cities"]));
			setTotal(data["total"]);
			setPage(data["page"]);
			setPageSize(data["per_page"]);
			setPageCount(Math.ceil(data["total"] / data["per_page"]));
		};
		fetchData();
	}, [searchParams]);

	const updateQuery = (param: string, value: string) => {
		let newParams: URLSearchParams = new URLSearchParams(
			searchParams.toString()
		);
		newParams.set(param, value);
		setSearchParams(newParams);
	};

	return (
		<Container
			className="page-container"
			maxWidth="xl"
			sx={{
				display: "flex",
				flexDirection: "column",
				height: (cities ?? []).length === 0 ? "100%" : "none",
				backgroundColor: "#f7e5ca"
			}}
		>
			<Typography
				gutterBottom
				className="modelTitle"
				variant="h2"
				sx={{ textAlign: "center" }}
				style={{ marginTop: 30 }}
			>
				Cities
			</Typography>
			<SsfBar
				model="Cities"
				sortBy={[
					"name",
					"population",
					"area",
					"budget",
					"safety",
					"average_rating",
					"num_charities"
				]}
				filterBy={CityFilters}
				rangeFilters={CityRangeFilters}
				exactFilters={CityExactFilters}
				range={["population", "safety", "budget", "average_rating"]}
				ssfUpdate={setSsfFields}
			/>
			{cities === null && <LoadingBuffer height="none" grow={true} />}
			{cities !== null && (
				<Stack
					direction="row"
					flexWrap="wrap"
					alignItems="center"
					justifyContent="center"
				>
					{cities!.map((c) => (
						<CityModelCard
							key={c.id}
							city={c}
							query={searchParams.get("query") ?? undefined}
							showAllKnownFor={ssfFields.has("known_for")}
							showBudget={ssfFields.has("budget")}
							showSafety={ssfFields.has("safety")}
							showElevation={ssfFields.has("elevation")}
							showPopulationDensity={ssfFields.has(
								"population_density"
							)}
							showAverageRating={ssfFields.has("average_rating")}
							showTimezone={ssfFields.has("timezone")}
							showNumCharities={ssfFields.has("num_charities")}
							onKnownForClick={(value) => {
								updateQuery("known_for", value);
							}}
						/>
					))}
				</Stack>
			)}
			<CardPagination
				page={page}
				perPage={pageSize}
				pageCount={pageCount}
				total={total}
				onPageChange={(page) => updateQuery("page", page.toString())}
				onPerPageChange={(pageSize) =>
					updateQuery("pageSize", pageSize.toString())
				}
			/>
		</Container>
	);
}

export default Cities;

import {
	AttractionFilters,
	AttractionRangeFilters,
	AttractionExactFitlers
} from "./AttractionFilters";
import { parseJSONAttractionGrid } from "../../services/attractionParser";
import CardPagination from "../../components/common/CardPagination";
import LoadingBuffer from "../../components/loading/LoadingBuffer";
import { Container, Stack, Typography } from "@mui/material";
import AttractionModelCard from "./AttractionModelCard";
import { API_BASE_URL } from "../../services/apiBase";
import SsfBar from "../../components/ssf-bar/SsfBar";
import { useSearchParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Attraction from "./Attraction";

function Attractions() {
	let [searchParams, setSearchParams] = useSearchParams();
	let [attractions, setAttractions] = useState<Attraction[] | null>(null);
	let [total, setTotal] = useState<number>(0);
	let [page, setPage] = useState<number>(0);
	let [pageSize, setPageSize] = useState<number>(0);
	let [pageCount, setPageCount] = useState<number>(0);
	let [ssfFields, setSsfFields] = useState<Set<string>>(new Set<string>());

	// static data
	useEffect(() => {
		const fetchData = async () => {
			setAttractions(null);
			setTotal(0);
			console.log(
				`finalString: ${API_BASE_URL}/attractions?` + searchParams
			);
			let response: AxiosResponse<any, any> = await axios.get(
				`${API_BASE_URL}/attractions?` + searchParams
			);
			let data = response.data["data"];
			setAttractions(parseJSONAttractionGrid(data["attractions"]));
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
				height: (attractions ?? []).length === 0 ? "100%" : "none",
				backgroundColor: "#cce2f1"
			}}
		>
			<Typography
				gutterBottom
				className="modelTitle"
				variant="h2"
				sx={{ textAlign: "center" }}
				style={{ marginTop: 30 }}
			>
				Attractions
			</Typography>
			<SsfBar
				model="Attractions"
				sortBy={[
					"name",
					"city",
					"state",
					"places_rating",
					"otm_rating"
				]}
				filterBy={AttractionFilters}
				range={["places_rating", "otm_rating"]}
				rangeFilters={AttractionRangeFilters}
				exactFilters={AttractionExactFitlers}
				ssfUpdate={setSsfFields}
			/>
			{attractions === null && (
				<LoadingBuffer height="none" grow={true} />
			)}
			{attractions !== null && (
				<Stack
					direction="row"
					flexWrap="wrap"
					alignItems="center"
					justifyContent="center"
				>
					{attractions!.map((a) => (
						<AttractionModelCard
							key={a.id}
							attraction={a}
							query={searchParams.get("query") ?? undefined}
							showKinds={ssfFields.has("kinds")}
							showAllKinds={ssfFields.has("kinds")}
							showHeritage={ssfFields.has("heritage")}
							showTypes={true}
							showAllTypes={ssfFields.has("types")}
							showRating={true}
							showOtmRating={ssfFields.has("otm_rating")}
							onTypesClick={(value) => {
								updateQuery("types", value);
							}}
							onKindsClick={(value) => {
								updateQuery("kinds", value);
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
					updateQuery("per_page", pageSize.toString())
				}
			/>
		</Container>
	);
}

export default Attractions;

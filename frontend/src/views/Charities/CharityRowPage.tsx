import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import CharityModelRow from "./CharityModelRow";
import CardPagination from "../../components/common/CardPagination";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CharityObj from "./Charity";
import SsfBar from "../../components/ssf-bar/SsfBar";
import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../services/apiBase";
import { parseJSONCharityGrid } from "../../services/charityParser";
import {
	CharityFilters,
	CharityRangeFilters,
	CharityExactFilters
} from "./CharityFilters";

function CharitiesRows() {
	let [searchParams, setSearchParams] = useSearchParams();
	let [total, setTotal] = useState<number>(0);
	let [page, setPage] = useState<number>(0);
	let [perPage, setPerPage] = useState<number>(0);
	let [pageCount, setPageCount] = useState<number>(0);
	let [charities, setCharities] = useState<CharityObj[] | null>(null);
	// static data
	useEffect(() => {
		const fetchData = async () => {
			setCharities(null);
			setTotal(0);
			console.log(
				`finalString: ${API_BASE_URL}/charities?` + searchParams
			);
			let response: AxiosResponse<any, any> = await axios.get(
				`${API_BASE_URL}/charities?` + searchParams
			);
			let data = response.data["data"];
			setCharities(parseJSONCharityGrid(data["charities"]));
			setTotal(data["total"]);
			setPage(data["page"]);
			setPerPage(data["per_page"]);
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
				height: (charities ?? []).length === 0 ? "100%" : "none",
				paddingTop: "35px",
				backgroundColor: "#bfc4c5"
			}}
		>
			<Typography
				className="modelTitle"
				variant="h2"
				sx={{ textAlign: "center", pb: 2 }}
			>
				Charities
			</Typography>
			<SsfBar
				model="Charities"
				sortBy={["name", "city", "state", "rating", "causeArea"]}
				filterBy={CharityFilters}
				rangeFilters={CharityRangeFilters}
				exactFilters={CharityExactFilters}
				range={["rating"]}
			/>
			{charities !== null && (
				<Stack>
					{charities!.map((c: CharityObj, index: number) => (
						<CharityModelRow
							key={index}
							charity={c}
							id={parseInt(c.id)}
							query={searchParams.get("query") ?? undefined}
						/>
					))}
				</Stack>
			)}
			<CardPagination
				page={page}
				perPage={perPage}
				pageCount={pageCount}
				total={total}
				onPageChange={(page) => updateQuery("page", page.toString())}
				onPerPageChange={(perPage) =>
					updateQuery("per_page", perPage.toString())
				}
			/>
		</Container>
	);
}

export default CharitiesRows;

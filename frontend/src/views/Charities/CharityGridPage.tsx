import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import CharityModelCard from "./CharityModelCard";
import CardPagination from "../../components/common/CardPagination";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CharityObj from "./Charity";
import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../../services/apiBase";
import { parseJSONCharityGrid } from "../../services/charityParser";

function Charities() {
	let [searchParams, setSearchParams] = useSearchParams();
	let [total, setTotal] = useState<number>(0);
	let [page, setPage] = useState<number>(0);
	let [pageSize, setPageSize] = useState<number>(0);
	let [pageCount, setPageCount] = useState<number>(0);
	let [charities, setCharities] = useState<CharityObj[] | null>(null);
	// static data
	useEffect(() => {
		const fetchData = async () => {
			setCharities(null);
			setTotal(0);
			console.log(
				"finalString: " + `${API_BASE_URL}/charities?` + searchParams
			);
			let response: AxiosResponse<any, any> = await axios.get(
				`${API_BASE_URL}/charities?` + searchParams
			);
			let data = response.data["data"];
			setCharities(parseJSONCharityGrid(data["charities"]));
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
			sx={{
				display: "flex",
				flexDirection: "column",
				height: (charities ?? []).length === 0 ? "100%" : "none",
				paddingTop: "35px"
			}}
		>
			<Typography
				className="modelTitle"
				variant="h2"
				sx={{ textAlign: "center", pb: 2 }}
			>
				Charities
			</Typography>
			{charities !== null && (
				<Stack direction="row" flexWrap="wrap">
					{charities!.map((c: CharityObj, index: number) => (
						<CharityModelCard
							key={index}
							charity={c}
							id={parseInt(c.id)}
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

export default Charities;

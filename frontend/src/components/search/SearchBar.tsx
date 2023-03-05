import React from "react";
import { useEffect, useState } from "react";
import {
	Box,
	Button,
	Paper,
	Stack,
	InputBase,
	SelectChangeEvent,
	Typography,
	Container,
	FormControl,
	Select,
	MenuItem,
	InputLabel
} from "@mui/material";

import { useNavigate, useSearchParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ViewAllBar from "./ViewAllBar";
import { setConstantValue } from "typescript";

interface SearchBarProps {
	model: string;
	bool: boolean;
}

function SearchBar(props: SearchBarProps) {
	let [sort, setSort] = React.useState("");
	let [query, setQuery] = React.useState("");
	let [value, setValue] = React.useState("");
	let [ascending, setAscending] = React.useState(false);
	const navigate = useNavigate();
	let [searchParams, setSearchParams] = useSearchParams();

	const handleChange = (event: SelectChangeEvent) => {
		console.log("sort", event.target.value);
		console.log("order", ascending);
		setSort(event.target.value as string);
	};

	const onChange = (event: any) => {
		setQuery(event.target.value);
		if (!props.bool) {
			let newParams = searchParams;
			console.log("query", event.target.value);
			if (query === "") {
				newParams.delete("query");
			} else {
				newParams.set("query", event.target.value);
			}
			setSearchParams(newParams);
		}
	};

	const keyPress = (event: any) => {
		if (event.keyCode === 13) {
			event.preventDefault();
			console.log("value:", event.target.value);
			setQuery(event.target.value);
			let newParams = searchParams;
			if (event.target.value === "") {
				newParams.delete("query");
			} else {
				newParams.set("query", query);
			}
			setSearchParams(newParams);
			if (props.bool) {
				navigate("/search?" + searchParams);
			}
		}
	};

	const onSearch = (event: any) => {
		let newParams = searchParams;
		console.log("query", query);
		if (query === "") {
			newParams.delete("query");
		} else {
			newParams.set("query", query);
		}
		setSearchParams(newParams);
		if (props.bool) {
			navigate("/search?" + searchParams);
		}
	};

	//   const updateQuery = (param: string, value: string) => {
	//     let newParams: URLSearchParams = new URLSearchParams(searchParams.toString());
	//     newParams.set(param, value);
	//     setSearchParams(newParams);
	// };
	useEffect(() => {
		if (searchParams.get("query") != null) {
			setQuery(
				searchParams.get("query")!
					// .toString()
					// .substring(searchParams.toString().indexOf("=") + 1)
			);
		}
	}, [searchParams.get("query")]);

	return (
		<Paper
			component="form"
			sx={{
				p: "2px 4px",
				display: "flex",
				alignItems: "center",
				width: "50%",
				alignSelf: "center",
				justifySelf: "center"
			}}
		>
			<InputBase
				sx={{ ml: 1, flex: 2 }}
				placeholder={"Search " + props.model}
				value={query}
				inputProps={{ "aria-label": "search" }}
				onChange={onChange}
				onKeyDown={keyPress}
			/>
			<IconButton
				type="button"
				sx={{ p: "10px" }}
				aria-label="search"
				onClick={onSearch}
			>
				<SearchIcon />
			</IconButton>
		</Paper>
	);
}

export default SearchBar;

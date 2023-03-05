import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
	Box,
	Button,
	Paper,
	InputBase,
	Divider,
	FormControl,
	Select,
	SelectChangeEvent,
	MenuItem,
	InputLabel,
	Stack
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowDownWideShort,
	faArrowUpShortWide
} from "@fortawesome/free-solid-svg-icons";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SimpleSelect from "./SimpleSelect";
import { Mark, SlidingFilter } from "./SlidingFilter";
import { ChipFilter } from "./ChipFilter";
import CheckboxFilter from "./CheckboxFilter";
import Filter from "./Filter";
import ExactFilter, { ExactFilterType } from "./ExactFilter";

interface RangeFilter {
	minValue: number;
	maxValue: number;
	step?: number;
	field: string;
	label: string;
	marks?: Mark[];
	nonlinear?: boolean;
	compactNumbers?: boolean;
}

interface SsfBarProps {
	model: string;
	sortBy: string[];
	filterBy: Filter[];
	exactFilters: ExactFilter[];
	rangeFilters: RangeFilter[];
	range: string[];
	ssfUpdate?: (ssfFields: Set<string>) => void;
}

// use search params like pagination does for "returning" the ssf params
// to the model to use for its api call

function SsfBar(props: SsfBarProps) {
	let [sort, setSort] = useState<string>("");
	let [query, setQuery] = useState<string>("");
	let [ascending, setAscending] = useState<boolean>(false);
	let [searchParams, setSearchParams] = useSearchParams();
	let [showFilterOptions, setShowFilterOptions] = useState<boolean>(false);
	let ssfUpdate = props.ssfUpdate;
	let filterBy = props.filterBy;
	let exactFilters = props.exactFilters;
	let rangeFilters = props.rangeFilters;

	const handleFilterClick = (event: any) => {
		let newShow = !showFilterOptions;
		setShowFilterOptions(newShow);
	};

	const titleCase = (baseString: string) => {
		return baseString
			.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
			.replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase()) // First char after each -/_
			.replace(/([A-Z])/g, " $1")
			.trim(); // Add space between capitals
	};

	const handleSortChange = (event: SelectChangeEvent) => {
		let newParams = searchParams;
		console.log("sort", event.target.value);
		setSort(event.target.value as string);
		if (event.target.value === "") {
			newParams.delete("sort_field");
		} else {
			newParams.set("sort_field", event.target.value);
		}
		setSearchParams(newParams);
	};

	const onChangeDirection = (event: any) => {
		let newDirection = !ascending;
		setAscending(newDirection);
		console.log("asc after:", newDirection);
		let newParams = searchParams;
		newParams.set("asc", String(newDirection));
		setSearchParams(newParams);
	};

	const onQueryChange = (event: any) => {
		setQuery(event.target.value);
		let newParams = searchParams;
		console.log("query", event.target.value);
		if (query === "") {
			newParams.delete("query");
		} else {
			newParams.set("query", event.target.value);
		}
		setSearchParams(newParams);
	};

	const keyPress = (event: any) => {
		if (event.keyCode === 13) {
			console.log("value:", event.target.value);
			setQuery(event.target.value);
			let newParams = searchParams;
			if (event.target.value === "") {
				newParams.delete("query");
			} else {
				newParams.set("query", query);
			}
			setSearchParams(newParams);
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
	};

	const handleFilterChange = (value: string, field: string) => {
		let newParams = searchParams;
		if (value === "") {
			newParams.delete(field);
		} else {
			newParams.set(field, value);
		}
		newParams.delete("page");
		setSearchParams(newParams);
	};

	const chipFilterValue = (field: string) => {
		let param: string = searchParams.get(field) ?? "";
		let paramValues: string[] = param === "" ? [] : param.split(",");
		return paramValues;
	};

	const singleFilterValue = (field: string) => {
		let param: string = searchParams.get(field) ?? "";
		return param;
	};

	const clearAllFilters = () => {
		let newParams = searchParams;
		for (let exactFilter of props.filterBy) {
			newParams.delete(exactFilter.name);
		}
		if (props.rangeFilters !== undefined) {
			for (let rangeFilter of props.rangeFilters) {
				newParams.delete("min_" + rangeFilter.field);
				newParams.delete("max_" + rangeFilter.field);
			}
		}
		newParams.delete("query");
		newParams.delete("sort_field");
		newParams.delete("asc");
		newParams.delete("page");
		setSearchParams(newParams);
	};

	useEffect(() => {
		let newSsfFields = new Set<string>();
		for (let filter of filterBy) {
			if (searchParams.has(filter.name)) {
				newSsfFields.add(filter.name);
			}
		}
		for (let exactFilter of exactFilters) {
			if (searchParams.has(exactFilter.field)) {
				newSsfFields.add(exactFilter.field);
			}
		}
		for (let rangeFilter of rangeFilters) {
			if (
				searchParams.has("min_" + rangeFilter.field) ||
				searchParams.has("max_" + rangeFilter.field)
			) {
				newSsfFields.add(rangeFilter.field);
			}
		}
		if (searchParams.has("sort_field")) {
			newSsfFields.add(searchParams.get("sort_field")!);
		}
		if (ssfUpdate !== undefined) ssfUpdate(newSsfFields);
	}, [searchParams, filterBy, exactFilters, rangeFilters, ssfUpdate]);

	return (
		<Paper
			component="form"
			sx={{
				p: "2px 4px",
				display: "flex",
				alignItems: "center",
				width: "100%",
				m: "10px 0px 30px 0px"
			}}
		>
			<Stack sx={{ width: "100%" }}>
				<Stack direction="row">
					<InputBase
						sx={{
							m: "2px 4px",
							p: "5px",
							flex: 2
						}}
						placeholder={"Search " + props.model}
						inputProps={{
							"aria-label": "search",
							"data-testid": "jest"
						}}
						onChange={onQueryChange}
						onKeyDown={keyPress}
					/>
					<IconButton
						type="button"
						sx={{ p: "10px 20px" }}
						aria-label="search"
						onClick={onSearch}
					>
						<SearchIcon />
					</IconButton>
					<Divider
						sx={{ height: 55, m: 0.5 }}
						orientation="vertical"
					/>
					<IconButton
						aria-label="for jest"
						sx={{ p: "10px 20px" }}
						onClick={handleFilterClick}
					>
						<FilterAltIcon />
					</IconButton>
					<Divider
						sx={{ height: 55, m: 0.5 }}
						orientation="vertical"
					/>
					<FormControl sx={{ flex: 1, m: "2px", p: "2px 0px" }}>
						<InputLabel id="demo-simple-select-label">
							Sort By
						</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={sort}
							label="Sort By"
							onChange={handleSortChange}
							sx={{
								".MuiOutlinedInput-notchedOutline": {
									border: 0
								}
							}}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{props.sortBy.map((s: string) => (
								<MenuItem value={s}>{titleCase(s)}</MenuItem>
							))}
						</Select>
					</FormControl>
					<IconButton
						type="button"
						sx={{ p: "10px 20px" }}
						aria-label="search"
						onClick={onChangeDirection}
					>
						{ascending ? (
							<FontAwesomeIcon icon={faArrowUpShortWide} />
						) : (
							<FontAwesomeIcon icon={faArrowDownWideShort} />
						)}
					</IconButton>
				</Stack>
				{showFilterOptions && (
					<>
						{props.exactFilters !== undefined && (
							<Stack direction="row" gap={2} flexWrap="wrap">
								<>
									{props.exactFilters.map(
										(f, idx: number) => {
											if (
												f.filterType ===
												ExactFilterType.ChipFilter
											) {
												return (
													<Box sx={{ flexGrow: 1 }}>
														<ChipFilter
															value={chipFilterValue(
																f.field
															)}
															key={f.field}
															label={f.label}
															field={f.field}
															options={f.options}
															onChange={(
																value: string[]
															) => {
																let newParams =
																	searchParams;
																if (
																	value.length ===
																	0
																) {
																	newParams.delete(
																		f.field
																	);
																} else {
																	newParams.set(
																		f.field,
																		value.join(
																			","
																		)
																	);
																}
																newParams.delete(
																	"page"
																);
																setSearchParams(
																	newParams
																);
															}}
														/>
													</Box>
												);
											} else if (
												f.filterType ===
												ExactFilterType.SingleChoiceFilter
											) {
												return (
													<Box sx={{ flexGrow: 1 }}>
														<SimpleSelect
															value={singleFilterValue(
																f.field
															)}
															options={
																f.options ?? []
															}
															label={f.label}
															field={f.field}
															index={idx}
															onChange={(
																value: string
															) =>
																handleFilterChange(
																	value,
																	f.field
																)
															}
														/>
													</Box>
												);
											} else if (
												f.filterType ===
												ExactFilterType.CheckboxFilter
											) {
												return (
													<Box sx={{ flexGrow: 1 }}>
														<CheckboxFilter
															values={chipFilterValue(
																f.field
															)}
															options={
																f.options ?? []
															}
															label={f.label}
															field={f.field}
															index={idx}
															onChange={(
																value: string[]
															) => {
																console.log(
																	value
																);
																let newParams =
																	searchParams;
																if (
																	value.length ===
																	0
																) {
																	newParams.delete(
																		f.field
																	);
																} else {
																	newParams.set(
																		f.field,
																		value.join(
																			","
																		)
																	);
																}
																newParams.delete(
																	"page"
																);
																setSearchParams(
																	newParams
																);
															}}
														/>
													</Box>
												);
											} else {
												return <Box></Box>;
											}
										}
									)}
								</>
							</Stack>
						)}
						<Stack direction="row" gap={1} flexWrap="wrap">
							{props.rangeFilters.map((f) => (
								<Box sx={{ flexBasis: "300px", flexGrow: 1 }}>
									<SlidingFilter
										values={[
											parseInt(
												searchParams.get(
													"min_" + f.field
												) ?? f.minValue.toString()
											),
											parseInt(
												searchParams.get(
													"max_" + f.field
												) ?? f.maxValue.toString()
											)
										]}
										key={f.field}
										label={f.label}
										minValue={f.minValue}
										maxValue={f.maxValue}
										step={f.step}
										field={f.field}
										marks={f.marks}
										nonlinear={f.nonlinear}
										autoMark={true}
										compactNumbers={f.compactNumbers}
										onChange={(values) => {
											console.log("change " + f.field);
											let newParams = searchParams;
											newParams.set(
												"min_" + f.field,
												values[0].toString()
											);
											newParams.set(
												"max_" + f.field,
												values[1].toString()
											);
											if (values[0] === f.minValue) {
												newParams.delete(
													"min_" + f.field
												);
											}
											if (values[1] === f.maxValue) {
												newParams.delete(
													"max_" + f.field
												);
											}
											newParams.delete("page");
											setSearchParams(newParams);
										}}
									/>
								</Box>
							))}
						</Stack>
					</>
				)}
				{showFilterOptions && (
					<Box sx={{ justifyContent: "center", display: "flex" }}>
						<Button
							variant="outlined"
							sx={{ m: "20px 0px", p: "5px" }}
							onClick={() => clearAllFilters()}
						>
							Clear All Filters
						</Button>
					</Box>
				)}
			</Stack>
		</Paper>
	);
}

export default SsfBar;

import React from "react";
import {
	InputLabel,
	MenuItem,
	FormControl,
	ListItemText,
	Select,
	SelectChangeEvent,
	Checkbox,
	Chip
} from "@mui/material";

import { Option } from "./ChipFilter";

const names = [
	"Oliver Hansen",
	"Van Henry",
	"April Tucker",
	"Ralph Hubbard",
	"Omar Alexander",
	"Carlos Abbott",
	"Miriam Wagner",
	"Bradley Wilkerson",
	"Virginia Andrews",
	"Kelly Snyder"
];

interface CheckboxFilterProps {
	values: string[];
	options?: Option[];
	label: string;
	field: string;
	index: number;
	onChange: (value: string[]) => void;
}

function CheckboxFilter(props: CheckboxFilterProps) {
	const [open, setOpen] = React.useState<boolean>(false);
	const [inputValue, setInputValue] = React.useState<string[]>([]);

	let values: (Option | string)[] = [];
	let paramValues: string[] = props.values;
	if (props.options !== undefined) {
		for (let value of paramValues) {
			let option = props.options.find((o) => o.value === value);
			if (option !== undefined) {
				values.push(option);
			}
		}
	} else if (paramValues) {
		values = paramValues;
	}

	const handleChange = (event: SelectChangeEvent<typeof inputValue>) => {
		const {
			target: { value }
		} = event;
		setInputValue(typeof value === "string" ? value.split(",") : value);
	};

	return (
		<FormControl sx={{ flexGrow: 1 }} fullWidth>
			<InputLabel id={"checkbox-label-" + props.index.toString()}>
				{props.label}
			</InputLabel>
			<Select
				open={open}
				onOpen={() => {
					if (props.options?.length === 0) {
						setOpen(false);
					} else {
						setOpen(true);
					}
				}}
				labelId={"checkbox-label-" + props.index.toString()}
				id={"checkbox-" + props.index.toString()}
				multiple
				value={inputValue}
				label={props.label}
				onChange={(event) => {
					let newParams: string[] = [];
					let newValues = event.target.value;
					for (let elem of newValues) {
						newParams.push(elem);
					}
					handleChange(event);
					props.onChange(newParams);
				}}
				onClose={(event) => {
					console.log(event);
					return setOpen(false);
				}}
				renderValue={(selected) =>
					selected.map((val) => (
						<Chip
							key={val}
							label={val}
							color="success"
							variant="filled"
							sx={{ height: "24px", p: "0px", m: "0px 2px" }}
						/>
					))
				}
			>
				{props.options?.map((o) => (
					<MenuItem key={o.value} value={o.value}>
						<Checkbox checked={inputValue.indexOf(o.value) > -1} />
						<ListItemText primary={o.label} />
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

export default CheckboxFilter;

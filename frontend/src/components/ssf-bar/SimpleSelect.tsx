import React from "react";
import {
	InputLabel,
	MenuItem,
	Chip,
	FormControl,
	Select,
	SelectChangeEvent
} from "@mui/material";
import { Option } from "./ChipFilter";

interface SimpleSelectProps {
	value: string;
	options: Option[];
	label: string;
	field: string;
	index: number;
	onChange: (value: string) => void;
}

function SimpleSelect(props: SimpleSelectProps) {
	const [open, setOpen] = React.useState<boolean>(false);

	return (
		<FormControl sx={{ flex: 1 }} fullWidth>
			<InputLabel id={"simple-select-label-" + props.index.toString()}>
				{props.label}
			</InputLabel>
			<Select
				open={open}
				onOpen={() => {
					if (props.options.length === 0) {
						setOpen(false);
					} else {
						setOpen(true);
					}
				}}
				labelId={"simple-select-label-" + props.index.toString()}
				id={"simple-select-" + props.index.toString()}
				value={props.value}
				label={props.label}
				sx={{ width: "100%" }}
				onChange={(event: SelectChangeEvent) => {
					console.log("Event triggered by selecting " + props.label);
					console.log("Details:\n" + event);
					console.log(event.target.value);
					props.onChange(event.target.value);
				}}
				onClose={(event) => {
					console.log(event);
					return setOpen(false);
				}}
				renderValue={(selected) => (
					<Chip
						key={selected}
						label={selected}
						color="success"
						variant="filled"
						sx={{ height: "24px", p: "0px", m: "0px" }}
					/>
				)}
			>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				{props.options.map((o) => (
					<MenuItem value={o.value}>{o.label}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

export default SimpleSelect;

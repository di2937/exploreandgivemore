import { Autocomplete, Chip, CircularProgress, TextField } from "@mui/material";
import React from "react";

interface ChipFilterProps {
	value: string[];
	options?: Option[];
	label: string;
	field: string;
	onChange: (value: string[]) => void;
}

export interface Option {
	label: string;
	value: string;
}

function ChipFilter(props: ChipFilterProps) {
	const [open, setOpen] = React.useState<boolean>(false);
	const [options, setOptions] = React.useState<(Option | string)[]>(
		props.options ?? []
	);
	const [inputValue, setInputValue] = React.useState("");
	let loading = options.length === 0 && open;

	let values: (Option | string)[] = [];
	let paramValues: string[] = props.value;
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

	React.useEffect(() => {
		if (inputValue === "") {
			return undefined;
		}

		if (props.options === undefined) {
			console.log("Not Sure?");
		}
	}, [inputValue, props.options]);

	return (
		<Autocomplete
			sx={{ flexGrow: 1 }}
			multiple
			open={open}
			loading={loading}
			onOpen={() => {
				if (options.length === 0) {
					setOpen(false);
				} else {
					setOpen(true);
				}
			}}
			onClose={(event, reason) => {
				console.log(event);
				return ["escape", "blur"].includes(reason)
					? setOpen(false)
					: null;
			}}
			options={options}
			value={values}
			isOptionEqualToValue={(
				option: any | string,
				value: any | string
			) => {
				let optionValue = "";
				if (typeof option === "string") optionValue = option;
				else optionValue = option.value;
				if (typeof value === "string") return optionValue === value;
				else return optionValue === value.value;
			}}
			getOptionLabel={(option: any | string) => {
				if (typeof option === "string") return option;
				return option.label;
			}}
			freeSolo={props.options === undefined}
			autoHighlight
			filterOptions={props.options === undefined ? (x) => x : undefined}
			onInputChange={(event, value) => {
				console.log(event);
				if (props.options === undefined) {
					setInputValue(value);
				}
			}}
			onChange={(event, value: any, reason, details) => {
				let newValues: string[] = [];
				for (let element of value) {
					if (typeof element === "string") newValues.push(element);
					else newValues.push(element.value);
				}

				props.onChange(newValues);
			}}
			renderTags={(value, getTagProps) =>
				value.map((option: any, index: number) => {
					let label: string = "";
					if (typeof option === "string") label = option;
					else label = option.label;
					return (
						<Chip
							variant="filled"
							color="success"
							label={label}
							{...getTagProps({ index })}
						/>
					);
				})
			}
			renderInput={(params) => {
				return (
					<TextField
						{...params}
						variant="outlined"
						label={props.label}
						placeholder={props.label}
						InputProps={{
							...params.InputProps,
							style: { borderRadius: "8px" },
							endAdornment: (
								<React.Fragment>
									{loading ? (
										<CircularProgress
											color="inherit"
											size="20"
										/>
									) : null}
								</React.Fragment>
							)
						}}
					/>
				);
			}}
		/>
	);
}

export { ChipFilter };

import { Box, Typography, Slider } from "@mui/material";
import React, { useCallback, useEffect } from "react";

export interface Mark {
	value: number;
	label: string;
}

interface SlidingFilterProps {
	values: number[];
	minValue: number;
	maxValue: number;
	step?: number;
	field: string;
	label: string;
	marks?: Mark[];
	nonlinear?: boolean;
	autoMark?: boolean;
	compactNumbers?: boolean;
	onChange: (value: number[]) => void;
}

const numberFormatter = Intl.NumberFormat("en", { notation: "compact" });

function SlidingFilter(props: SlidingFilterProps) {
	const [value, setValue] = React.useState<number[]>([0, 0]);
	const nonlinear: boolean = props.nonlinear ?? false;
	const calculateValue = (value: number): number =>
		nonlinear ? Math.E ** value : value;
	const calculateSliderValue = useCallback(
		(value: number): number => {
			return nonlinear ? Math.log(value) : value;
		},
		[nonlinear]
	);

	const autoMarks: Mark[] = [];
	if (props.autoMark && props.marks === undefined) {
		for (
			let i = props.minValue;
			i <= props.maxValue;
			i += props.step ?? 1
		) {
			autoMarks.push({
				label: i.toString(),
				value: i
			});
		}
	}

	const scaledMarks = [];
	for (let mark of props.marks ?? autoMarks) {
		let scaledMark: Mark = {
			label: mark.label,
			value: calculateSliderValue(mark.value)
		};
		scaledMarks.push(scaledMark);
	}

	useEffect(() => {
		let minValue: number = props.minValue;
		let queryMin: string | null = props.values[0].toString();
		if (queryMin !== null && queryMin.length !== 0) {
			minValue = parseInt(queryMin);
		}
		let maxValue: number = props.maxValue;
		let queryMax: string | null = props.values[1].toString();
		if (queryMax !== null && queryMax.length !== 0) {
			maxValue = parseInt(queryMax);
		}

		setValue([
			calculateSliderValue(minValue),
			calculateSliderValue(maxValue)
		]);
	}, [
		props.values,
		calculateSliderValue,
		props.field,
		props.maxValue,
		props.minValue
	]);

	const handleChange = (newValue: number[]) => setValue(newValue);

	const getLabel = (value: number): string => {
		if (props.compactNumbers ?? false) {
			return numberFormatter.format(value);
		}
		return value.toString();
	};

	const handleCommittedChange = (newValue: number[]) => {
		let minValue = Math.round(calculateValue(newValue[0]));
		let maxValue = Math.round(calculateValue(newValue[1]));
		props.onChange([minValue, maxValue]);
	};

	return (
		<Box>
			<Typography
				variant="body1"
				sx={{ textAlign: "center", m: "10px 0px" }}
			>
				<b>{props.label}</b>
			</Typography>
			<Box
				sx={{
					marginTop: "8px",
					marginLeft: "24px",
					marginRight: "24px"
				}}
			>
				<Slider
					marks={scaledMarks}
					color="primary"
					step={
						props.step !== undefined
							? props.step
							: nonlinear
							? 0.01
							: null
					}
					valueLabelDisplay="auto"
					value={value}
					min={calculateSliderValue(props.minValue)}
					max={calculateSliderValue(props.maxValue)}
					valueLabelFormat={(value) => getLabel(value)}
					scale={calculateValue}
					onChangeCommitted={(event, newValue) => {
						console.log(event);
						handleCommittedChange(newValue as number[]);
					}}
					onChange={(event, newValue) => {
						console.log(event);
						handleChange(newValue as number[]);
					}}
				/>
			</Box>
		</Box>
	);
}

export { SlidingFilter };

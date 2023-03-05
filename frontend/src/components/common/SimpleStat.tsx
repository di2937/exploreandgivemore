import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";

/* Simple Stat Properties ↓ */
interface SimpleStatProps {
	label: string;
	value: string | number;
	icon: any;
	loading?: boolean;
	width?: string;
	fontColor?: string;
	fontSize?: string | number;
}

function SimpleStat(props: SimpleStatProps) {
	let loading: boolean = props.loading ?? false;

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
				padding: "16px",
				flexBasis: props.width,
				flexShrink: 1
			}}
		>
			{React.createElement(props.icon, { style: { fontSize: 48 } })}
			<Typography
				marginTop="8px"
				variant="h5"
				color={props.fontColor}
				sx={{ fontSize: props.fontSize ? props.fontSize : "32px" }}
			>
				{loading ? <Skeleton width="48px" /> : props.value}
			</Typography>
			<Typography variant="h5" sx={{ fontSize: "16px" }}>
				{props.label}
			</Typography>
		</Box>
	);
}

export default SimpleStat;

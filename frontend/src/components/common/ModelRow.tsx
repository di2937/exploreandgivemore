import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

/* CSS Imports ↓ */
import "./modelRowStyle.css";

interface ModelRowProps {
	href?: string;
	height?: string;
	width?: string;
	center?: boolean;
	target?: string;
}

function ModelRow(props: React.PropsWithChildren<ModelRowProps>) {
	const [raised, setRaised] = React.useState<boolean>(false);

	return (
		<Card
			className="modelCard"
			raised={raised}
			onMouseOver={() => setRaised(true)}
			onMouseOut={() => setRaised(false)}
			sx={{ p: "0" }}
		>
			<CardActionArea
				sx={{
					display: "flex",
					//flexDirection: "column",
					justifyContent: "space-around",
					alignItems: "center",
					m: "0",
					height: "100%"
					//backgroundColor: "yellow",
				}}
				href={props.href ?? ""}
				target={props.target ?? ""}
			>
				{props.children}
			</CardActionArea>
		</Card>
	);
}

export default ModelRow;

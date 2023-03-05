import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import React from "react";

interface StatCardProps {
	title?: string;
	elevation?: number;
	color?: string;
	fontColor?: string;
	style?: any;
}

function StatCard(props: React.PropsWithChildren<StatCardProps>) {
	let flexDirection =
		props.style === undefined || props.style.flexDirection == null
			? "row"
			: props.style.flexDirection;
	return (
		<Card
			className="instanceCard card"
			elevation={props.elevation}
			sx={{ backgroundColor: props.color }}
			style={props.style}
		>
			<CardContent>
				{props.title !== undefined && (
					<Typography
						gutterBottom
						variant="h4"
						component="div"
						align="center"
						color={props.fontColor}
					>
						{props.title}
					</Typography>
				)}
				<Stack
					direction={
						props.style?.flexDirection !== undefined
							? props.style?.flexDirection
							: "row"
					}
					flexWrap="wrap"
					justifyContent="space-evenly"
					alignItems="center"
					divider={
						<Divider
							orientation={
								props.style?.flexDirection !== undefined &&
								props.style?.flexDirection === "row"
									? "vertical"
									: "horizontal" ?? "vertical"
							}
							flexItem
						/>
					}
				>
					{props.children}
				</Stack>
			</CardContent>
		</Card>
	);
}

export default StatCard;

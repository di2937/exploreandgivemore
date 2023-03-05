import { Button, Paper, Typography } from "@mui/material";

interface ViewAllBarProps {
	link: string;
	total: number;
	onViewAll: (link: string) => void;
}

function ViewAllBar(props: ViewAllBarProps) {
	return (
		<Paper
			className="card"
			sx={{
				padding: "16px",
				marginLeft: "auto",
				marginRight: "auto",
				marginTop: "8px",
				marginBottom: "8px",
				width: "fit-content",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				gap: "8px"
			}}
		>
			<Typography>{`${props.total} total results.`}</Typography>
			<Button
				variant="outlined"
				onClick={() => props.onViewAll(props.link)}
			>
				View All
			</Button>
		</Paper>
	);
}

export default ViewAllBar;

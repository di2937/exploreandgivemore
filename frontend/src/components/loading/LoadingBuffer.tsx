import { Box, CircularProgress } from "@mui/material";

interface LoadingBufferProps {
	height?: string;
	grow?: boolean;
}

function LoadingBuffer(props: LoadingBufferProps) {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				paddingTop: "20px",
				alignItems: "center",
				height: props.height ?? "none",
				flexGrow: props.grow ?? false ? 2 : 0
			}}
		>
			<CircularProgress />
		</Box>
	);
}

export default LoadingBuffer;

import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Pagination,
	PaginationItem,
	Select,
	Stack,
	Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { useSearchParams } from "react-router-dom";

interface CardPaginationProps {
	page: number;
	perPage: number;
	pageCount: number;
	total: number;
	onPageChange: (page: number) => void;
	onPerPageChange: (perPage: number) => void;
}

function CardPagination(props: CardPaginationProps) {
	let [searchParams, setSearchParams] = useSearchParams();

	const handlePageChange = (newPage: number) => {
		let newParams = searchParams;
		newParams.set("page", newPage.toString());
		setSearchParams(newParams);
	};

	const handlePerPageChange = (newPerPage: number) => {
		let newParams = searchParams;
		newParams.set("per_page", newPerPage.toString());
		setSearchParams(newParams);
	};

	return (
		<Stack
			direction="column"
			justifyContent="center"
			alignContent="center"
			alignItems="center"
			gap="8px"
			margin="8px"
		>
			<Pagination
				sx={{ margin: "8px" }}
				count={props.pageCount}
				page={parseInt(searchParams.get("page") ?? "1", 10)}
				color="primary"
				size="large"
				renderItem={(item) => (
					<PaginationItem
						component={Button}
						onClickCapture={() => handlePageChange(item.page ?? 1)}
						{...item}
					/>
				)}
			/>
			<Stack direction="row" gap={"8px"}>
				<Box sx={{ width: "100px" }}>
					<FormControl fullWidth size="small">
						<InputLabel id="page-size-select-label">
							Items
						</InputLabel>
						<Select
							labelId="page-size-select-label"
							value={parseInt(
								searchParams.get("per_page") ?? "20",
								10
							)}
							label="Per Page"
							onChange={(i) =>
								handlePerPageChange(i.target.value as number)
							}
						>
							{[10, 20, 30, 50, 100].map((i) => (
								<MenuItem value={i}>{i}</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box sx={{ width: "100px" }}>
					<FormControl fullWidth size="small">
						<InputLabel id="page-select-label">Page</InputLabel>
						<Select
							labelId="page-select-label"
							value={parseInt(
								searchParams.get("page") ?? "1",
								10
							)}
							label="Page"
							onChange={(i) =>
								handlePageChange(i.target.value as number)
							}
						>
							{Array(props.pageCount)
								.fill(1)
								.map((_, i) => (
									<MenuItem value={i + 1}>{i + 1}</MenuItem>
								))}
						</Select>
					</FormControl>
				</Box>
			</Stack>
			<Typography
				sx={{ textAlign: "center" }}
				variant="subtitle1"
				gutterBottom
			>
				Total Results: {props.total}
			</Typography>
			<Button
				onClick={() =>
					window.scrollTo({
						top: 0,
						left: 0,
						behavior: "smooth"
					})
				}
			>
				Scroll to Top
			</Button>
		</Stack>
	);
}

export default CardPagination;

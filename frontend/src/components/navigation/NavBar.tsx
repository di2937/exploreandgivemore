import "./NavBar.css";
import React from "react";
import {
	AppBar,
	Typography,
	Toolbar,
	Box,
	useMediaQuery,
	MenuItem,
	IconButton,
	Menu
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import site_logo from "../../images/swe-logo-bg.png";

function Navigation() {
	const navItems: string[] = [
		"Cities",
		"Attractions",
		"Charities",
		"Visualizations",
		"Provider Visualizations",
		"About",
		"Search"
	];
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	let navigate = useNavigate();
	const isMobile = useMediaQuery("(max-width: 1000px)");

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleClickAway = () => {
		setAnchorElNav(null);
	};

	const handleCloseNavMenu = (link: string) => {
		setAnchorElNav(null);
		navigate(link);
	};

	return (
		<AppBar position="sticky" elevation={3}>
			<Toolbar className="navbar" disableGutters>
				{isMobile ? (
					<></>
				) : (
					<img
						src={site_logo}
						alt="Logo"
						width="110px"
						height="auto"
					/>
				)}
				<Typography
					variant="h4"
					noWrap
					component="div"
					onClick={() => handleCloseNavMenu("/home")}
					sx={{
						ml: 2,
						mr: 2,
						display: { xs: "none", md: "flex" },
						cursor: "pointer",
						fontSize: "25px"
					}}
				>
					Explore & Give More
				</Typography>
				{isMobile ? (
					<>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "flex" },
								marginRight: "-100px"
							}}
						>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right"
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left"
								}}
								open={Boolean(anchorElNav)}
								onClose={handleClickAway}
								sx={{ display: { xs: "block", md: "none" } }}
							>
								{navItems.map((item) => (
									<MenuItem
										key={item}
										onClick={() =>
											handleCloseNavMenu(
												"/" +
													item
														.toLowerCase()
														.replace(/ /g, "_")
											)
										}
									>
										<Typography textAlign="center">
											{item}
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						{isMobile ? (
							<img
								src={site_logo}
								alt="Logo"
								width="110px"
								height="auto"
							/>
						) : (
							<></>
						)}
						<Typography
							variant="h6"
							noWrap
							component="div"
							onClick={() => handleCloseNavMenu("/home")}
							sx={{
								flexGrow: 1,
								display: { xs: "flex", md: "none" },
								cursor: "pointer"
							}}
						>
							Explore & Give More
						</Typography>
					</>
				) : (
					<>
						<Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
							<MenuItem
								sx={{ color: "#fff" }}
								onClick={() => handleCloseNavMenu("/")}
							>
								<Typography
									textAlign="center"
									variant="h6"
									sx={{ fontSize: "18px" }}
								>
									Home
								</Typography>
							</MenuItem>
							{navItems.map((item) => (
								<MenuItem
									key={item}
									sx={{ color: "#fff" }}
									onClick={() =>
										handleCloseNavMenu(
											"/" +
												item
													.toLowerCase()
													.replace(/ /g, "_")
										)
									}
								>
									<Typography
										textAlign="center"
										variant="h6"
										sx={{ fontSize: "18px" }}
									>
										{item}
									</Typography>
								</MenuItem>
							))}
						</Box>
					</>
				)}
			</Toolbar>
		</AppBar>
	);
}

export default Navigation;

import English from "./views/Attractions/AttractionGridPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Charities from "./views/Charities/CharityGridPage";
import ComputerScience from "./views/Charities/CharityRowPage";
import CharityInstancePage from "./views/Charities/CharityInstancePage";
import Navigation from "./components/navigation/NavBar";
import Math from "./views/Cities/CityGridPage";
import About from "./views/About/About";
import Home from "./views/Home/Home";
import Search from "./views/Search/Search";
import Error from "./views/Error/ErrorPage";
import VisualsPage from "./views/Visuals/Visuals";
import DevVisualsPage from "./views/Visuals/DevVisuals";
import CityInstancePage from "./views/Cities/CityInstancePage";
import "./App.css";
import AttractionInstancePage from "./views/Attractions/AttractionInstancePage";

import { Theme } from "./Theme";
import { ThemeProvider } from "@mui/material/styles";

function App() {
	return (
		<BrowserRouter>
			<Navigation />
			<ThemeProvider theme={Theme}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/math" element={<Math />} />
					<Route
						path="/cities/:cityId"
						element={<CityInstancePage />}
					/>
					<Route path="/computer_science" element={<ComputerScience />} />
					<Route
						path="charity/:id"
						element={<CharityInstancePage />}
					/>
					<Route path="/english" element={<English />} />
					<Route
						path="/attractions/:attractionId"
						element={<AttractionInstancePage />}
					/>
					<Route path="/about" element={<About />} />
					<Route path="/search" element={<Search />} />
					<Route path="/visualizations" element={<VisualsPage />} />
					<Route
						path="/provider_visualizations"
						element={<DevVisualsPage />}
					/>
					<Route path="*" element={<Error />} />
					<Route path="/error" element={<Error />} />
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;

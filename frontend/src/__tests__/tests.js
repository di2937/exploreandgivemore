import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CityModelCard from "../views/Cities/CityModelCard";
import AttractionModelCard from "../views/Attractions/AttractionModelCard";
import CharityModelRow from "../views/Charities/CharityModelRow";
import CityGridPage from "../views/Cities/CityGridPage";
import AttractionGridPage from "../views/Attractions/AttractionGridPage";
import CharitiesRows from "../views/Charities/CharityRowPage";
import CityInstancePage from "../views/Cities/CityInstancePage";
import AttractionInstancePage from "../views/Attractions/AttractionInstancePage";
import CharityInstancePage from "../views/Charities/CharityInstancePage";
import About from "../views/About/About";
import SsfBar from "../components/ssf-bar/SsfBar";

jest.setTimeout(10000);

describe("Render Model Cards", () => {
	test("City Model Card", () => {
		var city = {
			id: 1,
			name: "city-test",
			state: "JT",
			population: 10000,
			walkScoreURL: "",
			googleEventsURL: "",
			budget: 5,
			safety: 3,
			knownFor: ["Test", "Testing"],
			elevation: 12.3,
			timezone: "UTC-5 (TST)",
			latitude: 12.345678,
			longitude: 56.78901,
			area: 123.45,
			populationDensity: 100,
			averageRating: 1,
			description: "",
			imageUrl:
				"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/FrostTower-Feb2009.JPG/211px-FrostTower-Feb2009.JPG",
			attractions: [],
			charities: [],
			numCharities: 0
		};
		render(
			<BrowserRouter>
				<CityModelCard city={city} />
			</BrowserRouter>
		);
		const elem = screen.getByText("city-test");
		expect(elem).toBeInTheDocument();
	});

	test("Attraction Model Card", () => {
		var attraction = {
			id: 10,
			name: "attraction-test",
			city: "city-test",
			state: "JT",
			cityId: 0,
			kinds: ["Check"],
			description: "",
			otmRating: 4,
			heritage: true,
			website: "",
			imageURL:
				"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
			latitude: 0.0,
			longitude: 0.0,
			attractionSummary: "",
			openingHours: null,
			placesRating: 5,
			types: ["jest", "jesting"],
			contact: "",
			reviews: null,
			cityIn: null,
			charities: [],
			iframeRender: false
		};
		render(
			<BrowserRouter>
				<AttractionModelCard attraction={attraction} showKinds={true} />
			</BrowserRouter>
		);
		let elem = screen.getByText("Check");
		expect(elem).toBeInTheDocument();
	});

	test("Charity Model Row", () => {
		var charity = {
			id: 100,
			name: "charity-test",
			score: 0.0,
			rating: 3,
			ratingImage: "",
			city: "city-test",
			state: "JT",
			causeArea: ["Scholarship and Financial Support"],
			deductibility: "Contributions are deductible",
			ein: "",
			mission: "",
			classification: "",
			website: "https://uhelp.net/",
			irsSubsection: "",
			financialRating: 0.0,
			accountabilityRating: 0,
			Attractions: [],
			cityId: null,
			iframeRender: false
		};
		render(
			<BrowserRouter>
				<CharityModelRow charity={charity} />
			</BrowserRouter>
		);
		let elem = screen.getByText("Scholarship and Financial Support");
		expect(elem).toBeInTheDocument();
	});
});

describe("Render Instance Pages", () => {
	test("City Instance Page", async () => {
		render(
			<BrowserRouter>
				<CityInstancePage />
			</BrowserRouter>
		);
		const text = await waitFor(() => screen.findByText("Population"), {
			timeout: 10000
		});
		expect(text).toBeInTheDocument();
	});

	test("Attraction Instance Page", async () => {
		render(
			<BrowserRouter>
				<AttractionInstancePage />
			</BrowserRouter>
		);
		const text = await waitFor(() => screen.findByText("Attributes"), {
			timeout: 10000
		});
		expect(text).toBeInTheDocument();
	});

	test("Charity Instance Page", async () => {
		render(
			<BrowserRouter>
				<CharityInstancePage id={100} />
			</BrowserRouter>
		);
		const text = await waitFor(() => screen.findByText("Mission"), {
			timeout: 10000
		});
		expect(text).toBeInTheDocument();
	});
});

describe("Render Grid Pages", () => {
	test("City Grid Page", async () => {
		render(
			<BrowserRouter>
				<CityGridPage />
			</BrowserRouter>
		);
		const text = await waitFor(() => screen.findByText("New York"), {
			timeout: 10000
		});
		expect(text).toBeInTheDocument();
	});

	test("Attraction Grid Page", async () => {
		render(
			<BrowserRouter>
				<AttractionGridPage />
			</BrowserRouter>
		);
		const text = await waitFor(() => screen.findByText("Central Park"), {
			timeout: 10000
		});
		expect(text).toBeInTheDocument();
	});

	test("Charities Grid Page", async () => {
		render(
			<BrowserRouter>
				<CharitiesRows />
			</BrowserRouter>
		);
		const text = await waitFor(
			() => screen.findByText("Comic Relief, Inc."),
			{
				timeout: 10000
			}
		);
		expect(text).toBeInTheDocument();
	});
});

describe("Search / Sort / Filter Bar", () => {
	test("Search", () => {
		render(
			<BrowserRouter>
				<SsfBar
					model="Test"
					sortBy={[]}
					filterBy={[]}
					rangeFilters={[]}
					exactFilters={[]}
					range={[]}
				/>
			</BrowserRouter>
		);
		const searchInput = screen.getByTestId("jest");
		fireEvent.change(searchInput, { target: { value: "test" } });
		expect(searchInput.value).toBe("test");
	});

	test("Sort", () => {
		render(
			<BrowserRouter>
				<SsfBar
					model="Test"
					sortBy={["Test"]}
					filterBy={[]}
					rangeFilters={[]}
					exactFilters={[]}
					range={[]}
				/>
			</BrowserRouter>
		);
		expect(screen.getAllByText("Sort By")[0]).toBeInTheDocument();
	});

	test("Exact Filter", () => {
		render(
			<BrowserRouter>
				<SsfBar
					model="Test"
					sortBy={[]}
					filterBy={[]}
					rangeFilters={[]}
					exactFilters={[
						{
							label: "Test Exact Filter",
							field: "test",
							options: [],
							filterType: 0
						}
					]}
					range={[]}
				/>
			</BrowserRouter>
		);

		fireEvent.click(screen.getByLabelText("for jest"));
		expect(screen.getAllByText("Test Exact Filter")[0]).toBeInTheDocument();
	});

	test("Range Filter", () => {
		render(
			<BrowserRouter>
				<SsfBar
					model="Test"
					sortBy={[]}
					filterBy={[]}
					rangeFilters={[
						{
							label: "Test Range Filter",
							field: "test",
							minValue: 0,
							maxValue: 5,
							step: 1
						}
					]}
					exactFilters={[]}
					range={[]}
				/>
			</BrowserRouter>
		);

		fireEvent.click(screen.getByLabelText("for jest"));
		expect(screen.getAllByText("Test Range Filter")[0]).toBeInTheDocument();
	});
});

describe("Render About Page", () => {
	test("About page", () => {
		render(<About />);
		let elem = screen.getByText("About");
		expect(elem).toBeInTheDocument();
	});
});

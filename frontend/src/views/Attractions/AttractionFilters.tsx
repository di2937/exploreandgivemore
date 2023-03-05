import { city, state } from "../Cities/CityFilters";
import Filter from "../../components/ssf-bar/Filter";
import RangeFilter from "../../components/ssf-bar/RangeFilter";
import ExactFilter, {
	ExactFilterType
} from "../../components/ssf-bar/ExactFilter";

const heritage = ["true", "false"];

const types = [
	"Jewelry Store",
	"Locality",
	"Movie Theater",
	"Subway Station",
	"Church",
	"Rv Park",
	"Funeral Home",
	"Atm",
	"Tourist Attraction",
	"Zoo",
	"Grocery Or Supermarket",
	"Library",
	"Electronics Store",
	"Shoe Store",
	"Place Of Worship",
	"School",
	"General Contractor",
	"Home Goods Store",
	"Car Dealer",
	"Finance",
	"Book Store",
	"Night Club",
	"Art Gallery",
	"Museum",
	"Gym",
	"Meal Takeaway",
	"University",
	"Beauty Salon",
	"Bowling Alley",
	"Bar",
	"Furniture Store",
	"Political",
	"Amusement Park",
	"Point Of Interest",
	"Aquarium",
	"Establishment",
	"Parking",
	"Transit Station",
	"Clothing Store",
	"Stadium",
	"Airport",
	"Bakery",
	"Lodging",
	"Food",
	"Park",
	"Real Estate Agency",
	"Hair Care",
	"Travel Agency",
	"Restaurant",
	"Supermarket",
	"Health",
	"Shopping Mall",
	"Spa",
	"Store",
	"Campground",
	"Car Repair",
	"Cemetery",
	"Local Government Office",
	"Cafe"
];

const kinds = [
	"Opera Houses",
	"Maritime Museums",
	"Biographical Museums",
	"View Points",
	"Tourist Object",
	"Art Galleries",
	"Historic",
	"Squares",
	"Archaeology",
	"Automobile Museums",
	"Other Beaches",
	"Children Museums",
	"Sculptures",
	"Nature Reserves Others",
	"Farms",
	"Other Bridges",
	"Cemeteries",
	"Palaces",
	"Other Nature Conservation Areas",
	"Churches",
	"Aquariums",
	"Natural",
	"Museums",
	"Archaeological Museums",
	"Waterfalls",
	"Historic Architecture",
	"War Graves",
	"Tourist Facilities",
	"Other Temples",
	"Marketplaces",
	"Local Museums",
	"Fortifications",
	"Railway Stations",
	"Other Towers",
	"Railway Museums",
	"Burial Places",
	"Caves",
	"Interesting Places",
	"Amusements",
	"Other Museums",
	"Concert Halls",
	"Historic Districts",
	"Other Buildings",
	"Viaducts",
	"Other",
	"Amusement Parks",
	"Historic Object",
	"Other Churches",
	"Fountains",
	"Sport",
	"Water",
	"Accomodations",
	"Cultural",
	"Zoos",
	"Bridges",
	"Theatres And Entertainments",
	"Other Burial Places",
	"Restaurants",
	"National Parks",
	"Beaches",
	"Monuments",
	"Suspension Bridges",
	"Malls",
	"Other Archaeological Sites",
	"Historic Settlements",
	"Cinemas",
	"Architecture",
	"Geological Formations",
	"Nature Reserves",
	"Planetariums",
	"Amphitheatres",
	"Urban Environment",
	"Shops",
	"Industrial Facilities",
	"Gardens And Parks",
	"Manor Houses",
	"Historical Places",
	"Destroyed Objects",
	"Factories",
	"Open Air Museums",
	"Religion",
	"Historic House Museums",
	"Battlefields",
	"Unclassified Objects",
	"Science Museums",
	"Other Fortifications",
	"Skyscrapers",
	"History Museums",
	"Monuments And Memorials",
	"Other Theatres",
	"Other Buildings And Structures",
	"Rock Formations",
	"Lighthouses",
	"Mountain Peaks",
	"Aviation Museums",
	"Footbridges",
	"Foods",
	"Museums Of Science And Technology",
	"Sundials",
	"Military Museums",
	"Music Venues",
	"Other Technology Museums",
	"Other Hotels",
	"Towers"
];

export const AttractionFilters: Filter[] = [
	{
		name: "city",
		choices: city
	},
	{
		name: "state",
		choices: state
	},
	{
		name: "heritage",
		choices: heritage
	},
	{
		name: "types",
		choices: types
	},
	{
		name: "kinds",
		choices: kinds
	}
];

const AttractionRangeFilters: RangeFilter[] = [
	{
		label: "Google Places Rating",
		field: "places_rating",
		minValue: 0,
		maxValue: 5,
		step: 1
	},
	{
		label: "Open Trip Map Rating",
		field: "otm_rating",
		minValue: 0,
		maxValue: 5,
		step: 1
	}
];

const titleCase = (baseString: string) => {
	return baseString
		.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
		.replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase()) // First char after each -/_
		.replace(/([A-Z])/g, " $1")
		.trim(); // Add space between capitals
};

const AttractionExactFitlers: ExactFilter[] = [
	{
		label: "City Filter",
		field: "city",
		options: city.map((c) => {
			return { label: c, value: c };
		}),
		filterType: ExactFilterType.ChipFilter
	},
	{
		label: "State Filter",
		field: "state",
		options: state.map((s) => {
			return { label: s, value: s };
		}),
		filterType: ExactFilterType.ChipFilter
	},
	{
		label: "Heritage Filter",
		field: "heritage",
		options: heritage.map((h) => {
			return { label: titleCase(h), value: h };
		}),
		filterType: ExactFilterType.SingleChoiceFilter
	},
	{
		label: "Attraction Types Filter",
		field: "types",
		options: types.map((t) => {
			return { label: t, value: t };
		}),
		filterType: ExactFilterType.CheckboxFilter
	},
	{
		label: "Attraction Kinds Filter",
		field: "kinds",
		options: kinds.map((k) => {
			return { label: k, value: k };
		}),
		filterType: ExactFilterType.CheckboxFilter
	}
];

export { AttractionRangeFilters, AttractionExactFitlers };

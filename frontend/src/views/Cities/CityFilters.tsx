import ExactFilter, {
	ExactFilterType
} from "../../components/ssf-bar/ExactFilter";
import Filter from "../../components/ssf-bar/Filter";
import RangeFilter from "../../components/ssf-bar/RangeFilter";

export const city = [
	"Norfolk",
	"Sylvania",
	"Nampa",
	"Montclair",
	"Flint",
	"Springfield",
	"Redlands",
	"Kearney",
	"Doylestown",
	"Durango",
	"Glendale",
	"Evanston",
	"Billings",
	"Victoria",
	"San Ramon",
	"Fort Worth",
	"Cedar Rapids",
	"San Bernardino",
	"Washington",
	"Boca Raton",
	"Logan",
	"Searcy",
	"San Luis Obispo",
	"Scranton",
	"Savannah",
	"Fremont",
	"Georgetown",
	"New Haven",
	"Syracuse",
	"Cincinnati",
	"Rocky Mount",
	"Bellingham",
	"Stamford",
	"Santa Monica",
	"Merrimack",
	"Charlottesville",
	"Fort Mill",
	"Foster City",
	"Statesboro",
	"Orlando",
	"Lynchburg",
	"Fairfax",
	"Bentonville",
	"Bozeman",
	"Grapevine",
	"Richmond",
	"Brookfield",
	"Carrollton",
	"Lawrenceville",
	"Williamsport",
	"La Mirada",
	"Harrisonburg",
	"New Orleans",
	"Santa Barbara",
	"Lakewood",
	"Beaverton",
	"Jersey City",
	"Corpus Christi",
	"Edinburg",
	"West Hartford",
	"Los Gatos",
	"Parsippany",
	"Livonia",
	"Roanoke",
	"Albany",
	"Chapel Hill",
	"San Jose",
	"Cambridge",
	"Watertown",
	"Norwalk",
	"Waterville",
	"Mount Vernon",
	"Columbia",
	"Greenwood",
	"Augusta",
	"Gainesville",
	"Kutztown",
	"San Francisco",
	"Franklin",
	"Valparaiso",
	"Hickory",
	"Peoria",
	"Dubuque",
	"Saint Cloud",
	"Anderson",
	"Jacksonville",
	"Colorado Springs",
	"Stevenson",
	"Rocklin",
	"Falls Church",
	"Medford",
	"Pittsburgh",
	"Costa Mesa",
	"Coral Gables",
	"Pomona",
	"New Britain",
	"Hastings",
	"Boston",
	"Winston-Salem",
	"Standish",
	"Blacksburg",
	"Allentown",
	"Northbrook",
	"Burbank",
	"Milton",
	"Midland",
	"Salt Lake City",
	"McPherson",
	"La Plume",
	"Reading",
	"Williamsburg",
	"Chambersburg",
	"Asheville",
	"Lubbock",
	"Portales",
	"San Diego",
	"Pasadena",
	"Murfreesboro",
	"Madison",
	"Lafayette",
	"Kent",
	"Orrville",
	"Elizabeth City",
	"Forest Grove",
	"Schenectady",
	"Longview",
	"Bismarck",
	"Dayton",
	"San Mateo",
	"Rohnert Park",
	"Canton",
	"North Adams",
	"Jonesboro",
	"Tulsa",
	"West Palm Beach",
	"Bristol",
	"Arlington",
	"Las Vegas",
	"Monroe",
	"Normal",
	"Santa Cruz",
	"Knoxville",
	"Kennett Square",
	"Farmingdale",
	"King Of Prussia",
	"Erie",
	"Kerrville",
	"Eugene",
	"Birmingham",
	"St. Louis",
	"Bluffton",
	"Auburn",
	"Morristown",
	"Ypsilanti",
	"Santa Clara",
	"Chicago",
	"Rolling Meadows",
	"Juno Beach",
	"Charleston",
	"Portland",
	"Bangor",
	"La Jolla",
	"Menlo Park",
	"Providence",
	"Winston Salem",
	"Shreveport",
	"Seattle",
	"Westerville",
	"Des Moines",
	"Edmond",
	"Davidson",
	"Decorah",
	"Wallingford",
	"Bloomfield",
	"Melbourne",
	"San Rafael",
	"Rochester",
	"Lincoln",
	"Reno",
	"Greenwich",
	"Lakeland",
	"Camden",
	"Long Beach",
	"Abilene",
	"Williamstown",
	"Framingham",
	"Raleigh",
	"Alexandria",
	"Decatur",
	"Vestal",
	"Norman",
	"Ann Arbor",
	"Minneapolis",
	"Bethesda",
	"Frankfort",
	"Valdosta",
	"Provo",
	"Goshen",
	"Redmond",
	"Saint Paul",
	"Burlington",
	"Marietta",
	"New Rochelle",
	"Bloomfield Hills",
	"Appleton",
	"Newton",
	"Nacogdoches",
	"Santa Paula",
	"York",
	"Oneonta",
	"Chesterfield",
	"Mount Pleasant",
	"Berrien Springs",
	"Iowa City",
	"Phoenix",
	"Maumee",
	"Elgin",
	"Sewanee",
	"New Brunswick",
	"Bronx",
	"Canyon",
	"Manchester",
	"Incline Village",
	"Round Rock",
	"Claremont",
	"Mechanicsburg",
	"Tampa",
	"Arcata",
	"San Marcos",
	"Palos Heights",
	"Boone",
	"Albuquerque",
	"Lansing",
	"Santa Fe",
	"Boise",
	"Fairbanks",
	"Akron",
	"Marion",
	"Springdale",
	"Aurora",
	"Florence",
	"The Woodlands",
	"Golden",
	"Riverwoods",
	"Glen Cove",
	"Winona",
	"San Angelo",
	"Baltimore",
	"Lisle",
	"Menomonee Falls",
	"Grand Forks",
	"Denver",
	"Kingsport",
	"Escondido",
	"Takoma Park",
	"Corvallis",
	"Oklahoma City",
	"Rock Hill",
	"Teaneck",
	"Tuscaloosa",
	"Sweet Briar",
	"Newburgh",
	"Tempe",
	"Cleveland",
	"Salisbury",
	"Davis",
	"College Station",
	"Jackson",
	"Milwaukee",
	"Purchase",
	"Laramie",
	"Mclean",
	"Austin",
	"Olympia",
	"Centennial",
	"Youngstown",
	"Berea",
	"Needham",
	"Stockton",
	"Davenport",
	"Chestnut Hill",
	"Mobile",
	"College Park",
	"East Lansing",
	"Cupertino",
	"Seaside",
	"Perrysburg",
	"Durham",
	"Tallahassee",
	"Woodland Hills",
	"Concord",
	"Clarksville",
	"Towson",
	"Southfield",
	"Richfield",
	"Naperville",
	"Bowling Green",
	"Fargo",
	"Waco",
	"San Antonio",
	"Terre Haute",
	"Clinton",
	"Corning",
	"Berkeley",
	"Salem",
	"Huntsville",
	"High Point",
	"Fort Wayne",
	"New York",
	"Memphis",
	"Saint Louis",
	"Merrillville",
	"Dallas",
	"Pensacola",
	"Garden City",
	"Waltham",
	"Waukesha",
	"Newcastle",
	"Tyler",
	"Goodlettsville",
	"Emmitsburg",
	"Maryville",
	"Pueblo",
	"Warsaw",
	"Dearborn",
	"Conshohocken",
	"Fort Lauderdale",
	"Chattanooga",
	"Worcester",
	"Reston",
	"Radnor",
	"Wilmington",
	"Americus",
	"Bridgeport",
	"Benton Harbor",
	"Merced",
	"Lawrence",
	"Conway",
	"Fort Collins",
	"Jamaica",
	"Montgomery",
	"Wheaton",
	"Melville",
	"Lake Forest",
	"Duluth",
	"Spokane",
	"Fresno",
	"Buffalo",
	"Philadelphia",
	"Athens",
	"Joplin",
	"Plano",
	"Winchester",
	"Ithaca",
	"Spartanburg",
	"Fairfield",
	"Quincy",
	"Huntington",
	"Grand Junction",
	"Kokomo",
	"Honolulu",
	"Wellesley",
	"Englewood",
	"Palo Alto",
	"Fayetteville",
	"Irving",
	"Pepper Pike",
	"Redding",
	"Vermillion",
	"Brentwood",
	"Mankato",
	"Evansville",
	"Lebanon",
	"Jenkintown",
	"Macon",
	"Purcellville",
	"Newark",
	"Odessa",
	"Saint Petersburg",
	"Hartsville",
	"Kalamazoo",
	"Immaculata",
	"Hershey",
	"Elmsford",
	"Newport Beach",
	"Morgantown",
	"La Crosse",
	"Minnetonka",
	"Missoula",
	"Houston",
	"University",
	"Marlborough",
	"Owensboro",
	"Brunswick",
	"Rockford",
	"Westminster",
	"Hattiesburg",
	"Hanover",
	"Virginia Beach",
	"Elsah",
	"Columbus",
	"Indianapolis",
	"Donaldson",
	"Ames",
	"Helena",
	"Thousand Oaks",
	"Aiken",
	"Danville",
	"Orange",
	"Sioux Falls",
	"Issaquah",
	"Brooklyn",
	"Newport News",
	"Baton Rouge",
	"Johnson City",
	"Kings Point",
	"Chico",
	"Chesapeake",
	"Belton",
	"Angola",
	"Beaumont",
	"Grand Rapids",
	"Batesville",
	"Bridgewater",
	"Wilkes-Barre",
	"South Bend",
	"Los Angeles",
	"Bloomington",
	"Greenville",
	"Pine Bluff",
	"Pippa Passes",
	"Wichita Falls",
	"Poughkeepsie",
	"San Dimas",
	"Wichita",
	"Lewiston",
	"Holland",
	"Daytona Beach",
	"Montreat",
	"Aberdeen",
	"Walla Walla",
	"Texarkana",
	"Lexington",
	"Salina",
	"Boulder",
	"Rosemont",
	"Mountain View",
	"Denton",
	"Middlebury",
	"Kenosha",
	"Northfield",
	"Detroit",
	"Lancaster",
	"Fredericksburg",
	"Princeton",
	"Findlay",
	"Richardson",
	"Louisville",
	"Secaucus",
	"Wooster",
	"Omaha",
	"Utica",
	"Riverside",
	"Lowell",
	"Sacramento",
	"Troy",
	"Hartford",
	"Rochester Hills",
	"Ashland",
	"Clearwater",
	"Kansas City",
	"Amherst",
	"Greeley",
	"Mahwah",
	"Kirkland",
	"Irvine",
	"Saratoga Springs",
	"Nashville",
	"Santa Ana",
	"Oakland",
	"New London",
	"McMinnville",
	"Tacoma",
	"Rapid City",
	"Joliet",
	"Lake Charles",
	"Charlotte",
	"Fort Myers",
	"Bartlesville",
	"Sarasota",
	"Brookings",
	"Hempstead",
	"Glenview",
	"Toledo",
	"Atlanta",
	"Easton",
	"Downers Grove",
	"Tucson",
	"Bellevue",
	"Waleska",
	"Little Rock",
	"Greensboro",
	"Miami",
	"Annapolis"
];

export const state = [
	"AK",
	"AL",
	"AR",
	"AZ",
	"CA",
	"CO",
	"CT",
	"DC",
	"DE",
	"FL",
	"GA",
	"HI",
	"IA",
	"ID",
	"IL",
	"IN",
	"KS",
	"KY",
	"LA",
	"MA",
	"MD",
	"ME",
	"MI",
	"MN",
	"MO",
	"MS",
	"MT",
	"NC",
	"ND",
	"NE",
	"NH",
	"NJ",
	"NM",
	"NV",
	"NY",
	"OH",
	"OK",
	"OR",
	"PA",
	"RI",
	"SC",
	"SD",
	"TN",
	"TX",
	"UT",
	"VA",
	"VT",
	"WA",
	"WI",
	"WV",
	"WY"
];

const timezone = [
	"UTC-10 (HST)",
	"UTC-5 (EST)",
	"UTC-6 (CST)",
	"UTC-7 (MST)",
	"UTC-8 (PST)",
	"UTC-9 (AKST)"
];

/* from Univercity's knownFor.ts */
const known_for = [
	"Charming",
	"Foodie",
	"Nightlife",
	"Architecture",
	"History",
	"Museums",
	"Performing Arts",
	"Music",
	"Hipster",
	"Hippie",
	"Posh",
	"Family Friendly",
	"LGBT Scene",
	"Diversity",
	"Beach Town",
	"College Town",
	"Ski Town",
	"Outdoorsy",
	"Wineries",
	"Shopping"
];

export const CityFilters: Filter[] = [
	{
		name: "state",
		choices: state
	},
	{
		name: "known_for",
		choices: known_for
	},
	{
		name: "timezone",
		choices: timezone
	}
];

const CityRangeFilters: RangeFilter[] = [
	{
		label: "Population",
		field: "population",
		minValue: 10000,
		maxValue: 8000000,
		nonlinear: true,
		compactNumbers: true,
		marks: [
			{
				label: "<10K",
				value: 10000
			},
			{
				label: "25K",
				value: 25000
			},
			{
				label: "100K",
				value: 100000
			},
			{
				label: "500K",
				value: 500000
			},
			{
				label: "1M",
				value: 1000000
			},
			{
				label: "2M",
				value: 2000000
			},
			{
				label: "4M",
				value: 4000000
			},
			{
				label: "8M",
				value: 8000000
			}
		]
	},
	{
		label: "Safety Score",
		field: "safety",
		minValue: 0,
		maxValue: 5,
		step: 1
	},
	{
		label: "Budget Score",
		field: "budget",
		minValue: 0,
		maxValue: 5,
		step: 1
	},
	{
		label: "Average Rating",
		field: "average_rating",
		minValue: 0,
		maxValue: 5,
		step: 1
	}
];

const CityExactFilters: ExactFilter[] = [
	{
		label: "State Filter",
		field: "state",
		options: state.map((s) => {
			return { label: s, value: s };
		}),
		filterType: ExactFilterType.ChipFilter
	},
	{
		label: "Known For Filter",
		field: "known_for",
		options: known_for.map((kf) => {
			return { label: kf, value: kf };
		}),
		filterType: ExactFilterType.ChipFilter
	},
	{
		label: "Timezone Filter",
		field: "timezone",
		options: timezone.map((t) => {
			return { label: t, value: t };
		}),
		filterType: ExactFilterType.ChipFilter
	}
];

export { CityRangeFilters, CityExactFilters };
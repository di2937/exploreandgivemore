import RangeFilter from "../../components/ssf-bar/RangeFilter";
import { state, city } from "../Cities/CityFilters";
import Filter from "../../components/ssf-bar/Filter";
import ExactFilter, {
	ExactFilterType
} from "../../components/ssf-bar/ExactFilter";

const causeArea = [
	"Youth Development",
	"Shelter",
	"Crisis Services",
	"Scholarship and Financial Support",
	"Development and Relief Services",
	"Public Broadcasting and Media",
	"Humanitarian Relief Supplies",
	"Jewish Federations",
	"Special Education",
	"Multipurpose Human Service Organizations",
	"Treatment and Prevention Services",
	"Diseases",
	"Disorders",
	"Disciplines",
	"United Ways",
	"Museums",
	"Animals",
	"Education Policy and Reform",
	"Homeless Services",
	"Food Banks",
	"Food Pantries",
	"Food Distribution",
	"Environmental Protection and Conservation",
	"Advocacy and Education",
	"Children's and Family Services",
	"Botanical Gardens",
	"Parks",
	"Nature Centers",
	"Performing Arts",
	"Adult Education Programs and Services",
	"Animal Rights",
	"Welfare",
	"Services",
	"Social and Public Policy Research",
	"Patient and Family Support",
	"Youth Education Programs and Services",
	"Social Services",
	"Housing and Neighborhood Development",
	"Early Childhood Programs and Services",
	"Libraries",
	"Historical Societies and Landmark Preservation",
	"Rescue Missions",
	"Religious Media and Broadcasting",
	"Religious Activities",
	"Medical Research",
	"Zoos and Aquariums",
	"Community Foundations",
	"International Peace",
	"Security",
	"Affairs"
];

const deductibility = [
	"Deductibility not specified",
	"Contributions are deductible"
];

export const CharityFilters: Filter[] = [
	{
		name: "causeArea",
		choices: causeArea
	},
	{
		name: "deductibility",
		choices: deductibility
	},
	{
		name: "state",
		choices: state
	},
	{
		name: "city",
		choices: city
	}
];

const CharityRangeFilters: RangeFilter[] = [
	{
		label: "Charity Navigator Average Rating",
		field: "rating",
		minValue: 0,
		maxValue: 5,
		step: 1
	}
];

const CharityExactFilters: ExactFilter[] = [
	{
		label: "Cause Area Filter",
		field: "causeArea",
		options: causeArea.map((ca) => {
			return { label: ca, value: ca };
		}),
		filterType: ExactFilterType.CheckboxFilter
	},
	{
		label: "Deductibility Filter",
		field: "deductibility",
		options: deductibility.map((d) => {
			return { label: d, value: d };
		}),
		filterType: ExactFilterType.SingleChoiceFilter
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
		label: "City Filter",
		field: "city",
		options: city.map((c) => {
			return { label: c, value: c };
		}),
		filterType: ExactFilterType.ChipFilter
	}
];

export { CharityRangeFilters, CharityExactFilters };

import { Mark } from "./SlidingFilter";

interface RangeFilter {
	minValue: number;
	maxValue: number;
	step?: number;
	field: string;
	label: string;
	marks?: Mark[];
	nonlinear?: boolean;
	compactNumbers?: boolean;
}

export default RangeFilter;

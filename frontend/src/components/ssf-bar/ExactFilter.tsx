import { Option } from "./ChipFilter";

export enum ExactFilterType {
	ChipFilter = 0,
	CheckboxFilter = 1,
	SingleChoiceFilter = 2
}

interface ExactFilter {
	label: string;
	field: string;
	options?: Option[];
	filterType: ExactFilterType;
}

export default ExactFilter;

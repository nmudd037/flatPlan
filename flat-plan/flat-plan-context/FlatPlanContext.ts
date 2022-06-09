import { createContext, SetStateAction } from 'react';
import { SliderValuesType } from '../view-slider/ViewSliderUtilities';

export interface FlatPlanContextType {
	view: SliderValuesType;
	setView: React.Dispatch<React.SetStateAction<SliderValuesType>>;
	facingPages: boolean;
	pages: number[];
	getTotalRows: (view: SliderValuesType) => number;
	getRow: (row: number, view: SliderValuesType) => (number | undefined)[];
	pageFetcher: (
		startIndex: number,
		endIndex: number,
		view: SliderValuesType,
		totalRows: number
	) => void;
}

const FlatPlanContext = createContext<Partial<FlatPlanContextType>>({
	view: undefined,
	setView: undefined,
	facingPages: undefined,
	pages: undefined,
	getTotalRows: undefined,
	getRow: undefined,
	pageFetcher: undefined,
});

export default FlatPlanContext;

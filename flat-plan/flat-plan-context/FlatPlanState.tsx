import React, { PropsWithChildren, useState, useContext } from 'react';
import FlatPlanContext, { FlatPlanContextType } from './FlatPlanContext';
import { SliderValuesType } from '../view-slider/ViewSliderUtilities';

// Create a custom hook to use the FlatPlan context
export const useFlatPlanContext = () => {
	const {
		view,
		setView,
		facingPages,
		pages,
		getTotalRows,
		getRow,
		pageFetcher,
	} = useContext(FlatPlanContext);
	return {
		view,
		setView,
		facingPages,
		pages,
		getTotalRows,
		getRow,
		pageFetcher,
	} as FlatPlanContextType;
};

const FlatPlanState = ({
	pages,
	facingPages,
	getTotalRows,
	getRow,
	pageFetcher,
	children,
}: PropsWithChildren<{
	pages: number[];
	facingPages: boolean;
	getTotalRows: (view: SliderValuesType) => number;
	getRow: (row: number, view: SliderValuesType) => (number | undefined)[];
	pageFetcher: (
		startIndex: number,
		endIndex: number,
		view: SliderValuesType,
		totalRows: number
	) => void;
}>) => {
	const [view, setView] = useState<SliderValuesType>(0);

	return (
		<FlatPlanContext.Provider
			value={{
				view,
				setView,
				facingPages,
				pages,
				getTotalRows,
				getRow,
				pageFetcher,
			}}
		>
			{children}
		</FlatPlanContext.Provider>
	);
};

export default FlatPlanState;

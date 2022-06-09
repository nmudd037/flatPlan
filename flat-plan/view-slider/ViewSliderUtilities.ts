import { navigate, WindowLocation } from '@reach/router';
import { PageViewStoreType } from '../flat-plan-page-views/page-view-utils';
import { VariableSizeList } from 'react-window';

export const SliderValues: Record<string, number> = {
	'Global View': 0,
	'Double Page View': 50,
	'Single Page View': 100,
};

export type SliderValuesType = 0 | 50 | 100;

export const SliderTitle: Record<string, string> = {
	0: 'Global View',
	50: 'Double Page View',
	100: 'Single Page View',
};

export const getColumnsPerRow = (view: SliderValuesType) => {
	return view === 0 ? 4 : 2;
};

export const marks = [
	{
		value: 0,
	},
	{
		value: 50,
	},
	{
		value: 100,
	},
];

export const valuetext = (value: number) => {
	return SliderTitle[value];
};

export const sliderCallback = (
	currentView: SliderValuesType,
	previousView: SliderValuesType,
	pageViewStore: PageViewStoreType,
	location: WindowLocation<unknown>,
	pageViewRef: VariableSizeList | null
) => {
	const CZorF = currentView === 0 || currentView === 50;
	const PZorF = previousView === 0 || previousView === 50;

	// eslint-disable-next-line no-console
	console.log('afterstate', currentView, previousView);
	if (CZorF && PZorF) {
		// eslint-disable-next-line no-console
		console.log('1');
		return pageViewStore.findPageAndTriggerScrollAction(currentView);
	} else if (currentView === 100 && PZorF) {
		// eslint-disable-next-line no-console
		console.log('2');

		const navigateToSinglePage = (pageIdentifier: string) => {
			return navigate(`./flatplan/${pageIdentifier}`);
		};

		return pageViewStore.findPageAndTriggerScrollAction(
			currentView,
			navigateToSinglePage
		);
	} else if (CZorF && previousView === 100) {
		// eslint-disable-next-line no-console
		console.log('3');

		const pageIdentifier = location.pathname.split('/').pop() as string;
		navigate('../flatplan');

		return pageViewStore.triggerScrollAction(
			pageIdentifier,
			currentView,
			pageViewRef,
			previousView
		);
	}
};

import React, { ReactElement } from 'react';
import { usePageViewStore, PageViewStoreContext } from './page-view-utils';
import {
	StyledPageViewDiv,
	SliderWrapper,
} from './page-view-styles/PageView.styles';
import { Router } from '@reach/router';
import OnePageView from './one-page-view';
import PrimaryPageView from './primary-page-view';
import ViewSlider from '../view-slider';
import GotoPage from './primary-page-view/components/goto-page';

const PageView = ({ children }: { children: ReactElement[] }) => (
	<>{children}</>
);

const FlatPlanPageView = () => {
	const pageViewStore = usePageViewStore();

	return (
		<PageViewStoreContext.Provider value={pageViewStore}>
			<GotoPage />
			<StyledPageViewDiv className="mt-4 mb-4 col-md-12 col-lg-12">
				<Router primary={false}>
					<PageView path="flatplan">
						<PrimaryPageView path="/" default />
						<OnePageView path=":flatplanPageNo" />
					</PageView>
				</Router>
			</StyledPageViewDiv>
			<SliderWrapper
				md={12}
				className="d-flex justify-content-center ma-t-auto"
			>
				<ViewSlider />
			</SliderWrapper>
		</PageViewStoreContext.Provider>
	);
};

export default FlatPlanPageView;

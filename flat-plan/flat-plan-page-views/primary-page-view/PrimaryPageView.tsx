import React, { useState, useEffect } from 'react';
import {
	useRegisterPageContainer,
	useGetPageViewStore,
	useRegisterPageViewRef,
} from '../page-view-utils';
import {
	PrimaryPageWrapper,
	PrimaryPageContainer,
} from './PrimaryPageView.styles';
import InfiniteLoader from 'react-window-infinite-loader';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useFlatPlanContext } from '../../flat-plan-context/FlatPlanState';
import PageRowRenderer from './components/page-row-renderer';

const PrimaryPageView = () => {
	const registerPageContainer = useRegisterPageContainer();
	const pageViewStore = useGetPageViewStore();
	const registerPageViewRef = useRegisterPageViewRef();

	const { view, getTotalRows, getRow, pageFetcher } = useFlatPlanContext();
	const rowCount = getTotalRows(view);
	const pageViewRef = pageViewStore.registeredPageViewRef;

	const onResize = (_size: { height: number; width: number }) => {
		if (pageViewRef != null) {
			pageViewRef?.resetAfterIndex(0);
		}
	};

	const [rowHeight, setRowHeight] = useState<number>(550);
	const [paddingBottom, setPaddingBottom] = useState<number>(45);

	useEffect(() => {
		const { computedPageRow, isScrollAllowed } = pageViewStore;

		if (isScrollAllowed && view !== 100) {
			pageViewRef?.scrollToItem(computedPageRow, 'start');
		}
	}, [pageViewRef, pageViewStore, rowCount, view]);

	useEffect(() => {
		if (window.innerWidth < 2000) {
			setRowHeight(550);
			setPaddingBottom(45);
		} else {
			setRowHeight(600);
			setPaddingBottom(65);
		}
	}, []);

	useEffect(() => {
		function resize() {
			if (window.innerWidth < 2000) {
				setRowHeight(550);
				setPaddingBottom(45);
			} else {
				setRowHeight(600);
				setPaddingBottom(65);
			}
		}

		resize();

		window.addEventListener('resize', resize);

		return () => {
			window.removeEventListener('resize', resize);
		};
	}, []);

	const isPageRowLoaded = (index: number) =>
		!getRow(index, view).includes(undefined);

	const loadMorePageRows = (
		startIndex: number,
		stopIndex: number
	): Promise<void> | undefined => {
		// eslint-disable-next-line no-console
		console.log(startIndex, stopIndex);

		// Simulating API Request
		return new Promise((resolve) =>
			setTimeout(() => {
				pageFetcher(startIndex + 1, stopIndex + 1, view, rowCount);

				resolve();
			}, 1500)
		);
	};

	return (
		<PrimaryPageContainer>
			<PrimaryPageWrapper>
				<AutoSizer onResize={onResize}>
					{({ width, height }) => (
						<InfiniteLoader
							isItemLoaded={isPageRowLoaded}
							itemCount={rowCount}
							loadMoreItems={loadMorePageRows}
						>
							{({ onItemsRendered, ref }) => (
								<VariableSizeList
									ref={(list) => {
										typeof ref === 'function' && ref(list);

										// And store a copy for yourself.
										registerPageViewRef(list);
									}}
									outerRef={registerPageContainer}
									height={height}
									itemCount={rowCount}
									itemSize={() => rowHeight}
									width={width}
									onItemsRendered={onItemsRendered}
									className={`pa-b-${paddingBottom}`}
								>
									{({ index, style }) => {
										return <PageRowRenderer rowIndex={index} style={style} />;
									}}
								</VariableSizeList>
							)}
						</InfiniteLoader>
					)}
				</AutoSizer>
			</PrimaryPageWrapper>
		</PrimaryPageContainer>
	);
};

export default PrimaryPageView;

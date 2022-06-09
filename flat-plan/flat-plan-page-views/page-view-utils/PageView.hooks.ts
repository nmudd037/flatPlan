import {
	SliderValuesType,
	getColumnsPerRow,
} from '../../view-slider/ViewSliderUtilities';
import _ from 'lodash';

export const usePageRowMaker = (
	pages: number[],
	facingPages: boolean
): {
	getTotalRows: (view: SliderValuesType) => number;
	getRow: (row: number, view: SliderValuesType) => (number | undefined)[];
	pageFetcher: (
		startIndex: number,
		endIndex: number,
		view: SliderValuesType,
		totalRows: number
	) => void;
} => {
	// Should be the total pages of a publication and a multiple of 4
	const totalPages = pages.length;

	// Should be the mobx state
	const fetchedPagesMap = new Map<number, number>();

	console.log('Fetched pages', fetchedPagesMap);
	const getTotalRows = (view: SliderValuesType) => {
		if (view === 100) {
			return 0;
		}
		const columnsPerRow = getColumnsPerRow(view);
		return Math.trunc(totalPages / columnsPerRow) + 1;
	};

	const getLastRowPagesLength = (view: SliderValuesType) => {
		const columnsPerRow = getColumnsPerRow(view);
		const totalRows = getTotalRows(view);

		const step = 1 / columnsPerRow;
		const range = _.range(totalRows - 1, totalRows, step);
		const getIndexofLastPage = range.indexOf(totalPages / columnsPerRow) + 1;

		return columnsPerRow - getIndexofLastPage;
	};

	const getRow = (row: number, view: SliderValuesType) => {
		const columnsPerRow = getColumnsPerRow(view);
		const totalRows = getTotalRows(view);
		/* 
			If x and y are positive integers, there exist unique integers q and r,
			called the quotient and remainder, respectively, such that

			y = ( divisor * quotient ) + remainder = xq + r and 0 <= r < x. 
		*/

		const remainderArrayLength =
			row === 0
				? facingPages
					? columnsPerRow - 1
					: row + 1 === totalRows
					? columnsPerRow - 1 - getLastRowPagesLength(view)
					: columnsPerRow - 1
				: row + 1 === totalRows
				? facingPages
					? 1
					: columnsPerRow - getLastRowPagesLength(view)
				: columnsPerRow;

		const remainderArray = Array.from(
			{ length: remainderArrayLength },
			(_, i) => {
				if (row === 0) {
					return i + 1;
				} else {
					return i;
				}
			}
		);

		const result = remainderArray.map((r) => {
			const page = columnsPerRow * row + r;
			return fetchedPagesMap.get(page);
		});
		// eslint-disable-next-line no-console
		// console.log(result, remainderArrayLength);

		return result;
	};

	const pageFetcher = (
		startIndex: number,
		endIndex: number,
		view: SliderValuesType,
		totalRows: number
	) => {
		const isFetchedPagesMapEmpty = fetchedPagesMap.size === 0;

		const multiple = getColumnsPerRow(view);
		const start =
			startIndex === 1 ? startIndex : startIndex * multiple - multiple;
		const end =
			endIndex === totalRows
				? facingPages
					? endIndex * multiple - multiple
					: endIndex * multiple - 1 - getLastRowPagesLength(view)
				: endIndex * multiple - 1;

		// eslint-disable-next-line no-console
		console.log('range', start, end);

		const range = _.range(start, end + 1);

		// We are checking complete range, even if one index is missed we fetch all rows
		const isFetchedPagesMapWithinRange = range.every((r) =>
			fetchedPagesMap.has(r)
		);

		if (isFetchedPagesMapEmpty) {
			// Simulates api request
			// eslint-disable-next-line no-console
			console.log('empty');
			const result = pages.slice(start - 1, end);
			return result.forEach((page) => {
				fetchedPagesMap.set(page, page);
			});

			// return generateRows(result);
		} else if (isFetchedPagesMapWithinRange) {
			// eslint-disable-next-line no-console
			console.log('inRange');

			return;
		} else {
			// eslint-disable-next-line no-console
			console.log('halfRange or additional row');
			const requestableRange = _.sortBy(
				range.filter((r) => !fetchedPagesMap.has(r))
			);
			const remainingRows = pages.slice(
				requestableRange[0] - 1,
				requestableRange[requestableRange.length - 1]
			);

			return remainingRows.forEach((page) => {
				fetchedPagesMap.set(page, page);
			});
		}
	};

	return { getTotalRows, getRow, pageFetcher };
};

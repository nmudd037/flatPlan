import { action, observable, when, computed } from 'mobx';
import {
	createContext,
	useCallback,
	useContext,
	useState,
	useEffect,
} from 'react';
import { VariableSizeList } from 'react-window';
import {
	SliderValuesType,
	getColumnsPerRow,
} from '../../view-slider/ViewSliderUtilities';

class PageViewStore {
	public readonly allowScroll = observable.box<boolean>(false);
	public container: Nullable<HTMLElement> = null;
	public readonly elements = observable.map<string, HTMLElement>();
	public readonly lastPageNumber = observable.box<number>(1);
	public readonly pageViewRef = observable.box<VariableSizeList | null>(null);
	public readonly pageRow = observable.box<number>(0);

	@computed
	get computedPageRow() {
		return this.pageRow.get();
	}

	@computed
	get isScrollAllowed() {
		return this.allowScroll.get();
	}

	@computed
	get registeredPageViewRef() {
		return this.pageViewRef.get();
	}

	@action
	disableAllowScroll(): void {
		return this.allowScroll.set(false);
	}

	@action
	findPageAndTriggerScrollAction(
		view: SliderValuesType,
		navigateToSinglePage?: (pageIdentifier: string) => Promise<void>
	) {
		// eslint-disable-next-line no-console
		console.log('1inside');
		if (!this.container) {
			// eslint-disable-next-line no-console
			console.log('2inside');
			return null;
		}

		const elementEntries = Array.from(this.elements.entries());
		if (!elementEntries.length) {
			// eslint-disable-next-line no-console
			console.log(
				'3inside',
				this.lastPageNumber.get().toString(),
				view,
				this.registeredPageViewRef
			);

			if (navigateToSinglePage) {
				this.disableAllowScroll();
				return navigateToSinglePage(this.lastPageNumber.get().toString());
			}

			return this.triggerScrollAction(
				this.lastPageNumber.get().toString(),
				view,
				this.registeredPageViewRef
			);
		}

		const { scrollTop } = this.container;

		const filteredElement = elementEntries.reduce(
			(previousElement, currentElement) => {
				const prevElementOffset =
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					previousElement[1].parentElement?.parentElement!.offsetTop -
					scrollTop;
				const currentElementOffset =
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					currentElement[1].parentElement?.parentElement!.offsetTop - scrollTop;
				const offsetDifference = currentElementOffset - prevElementOffset;
				const pageDifference =
					parseInt(currentElement[0]) - parseInt(previousElement[0]);

				const threshold = -48;

				if (currentElementOffset >= threshold) {
					if (prevElementOffset >= threshold) {
						if (offsetDifference > 0) {
							return previousElement;
						} else if (offsetDifference < 0) {
							return currentElement;
						} else {
							return pageDifference > 0 || pageDifference === 0
								? previousElement
								: currentElement;
						}
					} else {
						return currentElement;
					}
				} else {
					return previousElement;
				}
			}
		);

		// eslint-disable-next-line no-console
		console.log(filteredElement);

		this.lastPageNumber.set(parseInt(filteredElement[0]));

		if (navigateToSinglePage) {
			this.disableAllowScroll();
			return navigateToSinglePage(filteredElement[0]);
		}

		// View change will trigger a rerender which will reregister cards
		this.triggerScrollAction(
			filteredElement[0],
			view,
			this.registeredPageViewRef
		);
	}

	@action
	triggerScrollAction(
		pageIdentifier: string,
		view: SliderValuesType,
		pageViewRef?: VariableSizeList | null,
		previousView?: SliderValuesType
	) {
		const predicate = () => {
			const newPageViewRef = this.registeredPageViewRef;

			return (!!newPageViewRef || !!pageViewRef) && !!this.container;
		};

		// eslint-disable-next-line no-console
		console.log('predicate', predicate());
		when(predicate, () => {
			const pageNumber = parseInt(pageIdentifier);
			const pageRow = Math.trunc(pageNumber / getColumnsPerRow(view));
			this.lastPageNumber.set(pageNumber);
			this.allowScroll.set(true);
			this.pageRow.set(pageRow);
			if (!!previousView && previousView === 100) {
				const pageViewRef = this.registeredPageViewRef;
				// eslint-disable-next-line no-console
				console.log('predicate True', pageViewRef, pageRow);

				return pageViewRef?.scrollToItem(pageRow, 'start');
			}
		});
	}

	@action
	setPageFor(pageId: string, el: HTMLElement | null): void {
		if (el) {
			this.elements.set(pageId, el);
		} else {
			this.elements.delete(pageId);
		}
	}

	@action
	setPageViewRef(list: VariableSizeList | null): void {
		this.pageViewRef.set(list);
	}
}

export function usePageViewStore() {
	const [pageViewStore] = useState(() => new PageViewStore());

	return pageViewStore;
}

export const PageViewStoreContext = createContext<PageViewStore>(
	new PageViewStore()
);

export const useRegisterPage = (pageId: string) => {
	const pageViewStore = useGetPageViewStore();

	return useCallback(
		(el: HTMLElement | null) => {
			pageViewStore.setPageFor(pageId, el);
		},
		[pageId, pageViewStore]
	);
};

export const useRegisterPageContainer = () => {
	const pageViewStore = useGetPageViewStore();

	return useCallback(
		(el: HTMLElement | null) => (pageViewStore.container = el),
		[pageViewStore]
	);
};

export const useRegisterPageViewRef = () => {
	const pageViewStore = useGetPageViewStore();

	useEffect(() => {
		return () => {
			pageViewStore.setPageViewRef(null);
		};
	}, [pageViewStore]);

	return useCallback(
		(list: VariableSizeList | null) => {
			pageViewStore.setPageViewRef(list);
		},
		[pageViewStore]
	);
};

export const useGetPageViewStore = () => {
	const pageViewStore = useContext(PageViewStoreContext);

	return pageViewStore;
};

export interface PageViewStoreType extends PageViewStore {}

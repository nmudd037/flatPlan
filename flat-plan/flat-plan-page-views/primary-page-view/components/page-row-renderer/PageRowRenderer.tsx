import React from 'react';
import {
	PageRowRendererContainer,
	PageRowWrapper,
} from './PageRowRenderer.styles';
import { useFlatPlanContext } from '../../../../flat-plan-context/FlatPlanState';
import LoadingIndicator from '../../../../../../../components/loading-indicator';
import FlatPlanCard, {
	FlatPlanCardMask,
} from '../../../../flat-plan-card/FlatPlanCard';
import { getColumnsPerRow } from '../../../../view-slider/ViewSliderUtilities';

const PageRowRenderer = ({
	rowIndex,
	style,
}: {
	rowIndex: number;
	style: React.CSSProperties;
}) => {
	const { view, getRow, getTotalRows, facingPages } = useFlatPlanContext();

	const rowCount = getTotalRows(view);
	const row = getRow(rowIndex, view);
	const columnsPerRow = getColumnsPerRow(view);
	const isPageRowLoaded = !row.includes(undefined);

	if (!isPageRowLoaded) {
		return (
			<PageRowRendererContainer style={style}>
				<LoadingIndicator fitToHeight />
			</PageRowRendererContainer>
		);
	}

	const pageRow = () => {
		if (rowIndex === 0) {
			if (facingPages) {
				return (
					<>
						<PageRowWrapper view={view} facingPages={facingPages}>
							<FlatPlanCardMask />
							<FlatPlanCard pageNumber={row[0]} />
						</PageRowWrapper>
						{view === 0 && (
							<PageRowWrapper view={view} facingPages={facingPages}>
								{row.slice(1).map((row) => (
									<FlatPlanCard pageNumber={row} key={row} />
								))}
							</PageRowWrapper>
						)}
					</>
				);
			} else {
				return (
					<PageRowWrapper view={view} facingPages={facingPages}>
						<FlatPlanCardMask />
						{row.map((row) => (
							<FlatPlanCard pageNumber={row} key={row} />
						))}
						{!!(columnsPerRow - 1 - row.length) &&
							Array.from(
								{ length: columnsPerRow - 1 - row.length },
								(_, i) => i
							).map((v) => {
								return <FlatPlanCardMask key={v} />;
							})}
					</PageRowWrapper>
				);
			}
		} else if (rowIndex + 1 === rowCount && rowIndex !== 0) {
			if (facingPages) {
				return (
					<PageRowWrapper view={view} facingPages={facingPages}>
						<FlatPlanCard pageNumber={row[0]} />
						{Array.from(
							{ length: facingPages ? 1 : columnsPerRow - 1 },
							(_, i) => i
						).map((v) => {
							return <FlatPlanCardMask key={v} />;
						})}
					</PageRowWrapper>
				);
			} else {
				return (
					<PageRowWrapper view={view} facingPages={facingPages}>
						{row.map((row) => (
							<FlatPlanCard pageNumber={row} key={row} />
						))}
						{!!(columnsPerRow - row.length) &&
							Array.from(
								{ length: columnsPerRow - row.length },
								(_, i) => i
							).map((v) => {
								return <FlatPlanCardMask key={v} />;
							})}
					</PageRowWrapper>
				);
			}
		} else {
			if (facingPages) {
				return (
					<>
						<PageRowWrapper view={view} facingPages={facingPages}>
							{row.slice(0, 2).map((row) => (
								<FlatPlanCard pageNumber={row} key={row} />
							))}
						</PageRowWrapper>
						{view === 0 && (
							<PageRowWrapper view={view} facingPages={facingPages}>
								{row.slice(2, 4).map((row) => (
									<FlatPlanCard pageNumber={row} key={row} />
								))}
							</PageRowWrapper>
						)}
					</>
				);
			} else {
				return (
					<PageRowWrapper view={view} facingPages={facingPages}>
						{row.map((row) => (
							<FlatPlanCard pageNumber={row} key={row} />
						))}
					</PageRowWrapper>
				);
			}
		}
	};

	return (
		<PageRowRendererContainer style={style}>
			{pageRow()}
		</PageRowRendererContainer>
	);
};

export default PageRowRenderer;

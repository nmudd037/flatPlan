import React from 'react';
import SelectionBar from './selection-bar';
import { Row, Col } from 'reactstrap';
import FlatPlanState from './flat-plan-context/FlatPlanState';
import FlatPlanPageView from './flat-plan-page-views';
import { usePageRowMaker } from './flat-plan-page-views/page-view-utils';

const FlatPlanPanel = () => {
	const testPages: number[] = Array.from({ length: 1600 }, (_, i) => i + 1);
	const facingPages: boolean = true;
	const { getTotalRows, getRow, pageFetcher } = usePageRowMaker(
		testPages,
		facingPages
	);

	return (
		<Row className="justify-content-center">
			<FlatPlanState
				pages={testPages}
				facingPages={facingPages}
				getTotalRows={getTotalRows}
				getRow={getRow}
				pageFetcher={pageFetcher}
			>
				<Col md={12}>
					<SelectionBar />
				</Col>

				<FlatPlanPageView />
			</FlatPlanState>
		</Row>
	);
};

export default FlatPlanPanel;

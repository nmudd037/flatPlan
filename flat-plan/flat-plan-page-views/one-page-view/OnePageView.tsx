import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { StyledOnePageViewCard } from './OnePageView.styles';
import { CardBody, CardTitle, CardText } from 'reactstrap';
import { useFlatPlanContext } from '../../flat-plan-context/FlatPlanState';

interface OnePageViewProps extends RouteComponentProps {
	flatplanPageNo?: string;
}

const OnePageView = (props: OnePageViewProps) => {
	const { flatplanPageNo } = props;

	const { setView } = useFlatPlanContext();

	useEffect(() => {
		setView && setView(100);
	}, [setView]);

	return (
		<div className="d-flex">
			<StyledOnePageViewCard>
				<CardBody>
					<CardTitle tag="h5">
						Special Title Treatment {flatplanPageNo}
					</CardTitle>
					<CardText>
						With supporting text below as a natural lead-in to additional
						content.
					</CardText>
				</CardBody>
			</StyledOnePageViewCard>
		</div>
	);
};

export default OnePageView;

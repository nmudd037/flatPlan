import styled, { css } from 'styled-components';
import { Col } from 'reactstrap';
import { SliderValuesType } from '../../view-slider/ViewSliderUtilities';

export const StyledPageViewDiv = styled.div`
	height: 80vh;
	overflow-y: hidden;
	/* overflow: scroll; */
`;

export const StyledPageViewWrapper = styled.div<{ view?: SliderValuesType }>`
	display: flex !important;
	flex-flow: ${(props) => (props.view === 0 ? 'row' : 'column')} wrap !important;
	justify-content: flex-start !important;
`;

export const StyledDoublePageWrapper = styled.div<{ view?: SliderValuesType }>`
	display: flex !important;
	flex-direction: row !important;
	z-index: 100;
	justify-content: ${(props) =>
		props.view === 0 ? 'center' : 'flex-start'} !important;
	${(props) =>
		props.view === 0 &&
		css`
			flex-basis: 50% !important;
		`}
`;

export const SliderWrapper = styled(Col)`
	position: absolute;
	bottom: 0;
	z-index: 1000;
	width: 95%;
	background: linear-gradient(
		180deg,
		rgba(245, 245, 245, 0) 20%,
		rgba(245, 245, 245, 1) 75%
	);
`;

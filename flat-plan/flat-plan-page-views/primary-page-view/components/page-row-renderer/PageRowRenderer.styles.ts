import styled from 'styled-components';
import { SliderValuesType } from '../../../../view-slider/ViewSliderUtilities';

export const PageRowRendererContainer = styled.div`
	display: flex;
`;

export const PageRowWrapper = styled.div<{
	view: SliderValuesType;
	facingPages: boolean;
}>`
	width: ${(props) =>
		props.facingPages ? '50%' : props.view === 0 ? '100%' : '50%'};
	height: 100%;
	padding: ${(props) => (props.facingPages ? '1.5rem' : '1.5rem 0')};
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

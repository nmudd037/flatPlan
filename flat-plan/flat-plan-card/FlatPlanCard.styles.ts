import styled, { css } from 'styled-components';
import { Card } from 'reactstrap';
import themeStore from '../../../../theme/models/ThemeStore';
import { SliderValuesType } from '../view-slider/ViewSliderUtilities';

const { colors } = themeStore.selectedTheme;

export const StyledHoverButton = styled.button`
	border: none;
	background: transparent;

	&:disabled {
		cursor: not-allowed;

		img {
			opacity: 0.5;
		}
	}
`;

export const StyledFlatPlanCard = styled(Card)<{
	$selected?: boolean;
	$view?: SliderValuesType;
	$facingPages: boolean;
}>`
	background-color: ${colors.white};
	border-radius: 0;
	border: ${(props) =>
		props.$selected
			? `4px solid ${colors.flatPlanSelectedCardBorder}`
			: `1px solid ${colors.flatplanCardBorder}`};
	flex-basis: 48%;
	max-height: 480px;
	cursor: pointer;
	position: relative;

	${(props) =>
		!props.$facingPages &&
		css`
			margin-right: 1.5rem;
			margin-left: 1.5rem;
		`}

	@media only screen and (min-width: 2000px) {
		flex-basis: 38%;
		max-height: 550px;
	}

	&:hover .card-footer {
		pointer-events: auto;
		opacity: 1;
	}

	.card-footer {
		background-color: ${colors.white};
		border-top: 1px solid ${colors.flatplanCardBorder};
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.4s cubic-bezier(1, 0.28, 0, 1);
		cursor: auto;
	}

	.marginleft-auto {
		margin-left: auto;
	}
`;

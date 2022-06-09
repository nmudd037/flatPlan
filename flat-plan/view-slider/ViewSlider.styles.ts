import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';
import themeStore from '../../../../theme/models/ThemeStore';

const { colors } = themeStore.selectedTheme;

export const StyledSlider = styled(Slider)`
	&& {
		color: ${colors.primary};
		height: 2px;
		padding: 13px 0;
		width: 300px;

		.MuiSlider-thumb {
			height: 15px;
			width: 26px;
			background-color: ${colors.viewSliderThumbColor};
			box-shadow: 0 3px 1px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.13),
				0 0 0 1px rgba(0, 0, 0, 0.02);
			border-radius: 0;
			margin-top: -6px;
			margin-left: -12px;
			border: 1px solid ${colors.viewSliderThumbBorderColor};
			:focus,
			:hover,
			.Mui-active {
				box-shadow: 0 3px 1px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.3),
					0 0 0 1px rgba(0, 0, 0, 0.02);
				/* // Reset on touch devices, it doesn't add specificity */
				@media (hover: none) {
					box-shadow: 0 3px 1px rgba(0, 0, 0, 0.1),
						0 4px 8px rgba(0, 0, 0, 0.13), 0 0 0 1px rgba(0, 0, 0, 0.02);
				}
			}
		}

		.MuiSlider-track {
			border: none;
			height: 4px;
		}

		.MuiSlider-rail {
			opacity: 0.5;
			height: 4px;
			background-color: ${colors.primary};
		}

		.MuiSlider-mark {
			background-color: ${colors.grey};
			height: 15px;
			width: 3px;
			top: 8px;
			.MuiSlider-markActive {
				opacity: 1;
				background-color: inherit;
			}
		}
	}
`;

export const StyledSliderWrapper = styled.div`
	padding: 28px 30px;
	background-color: ${colors.white};
	border: 1px solid ${colors.grey};
`;

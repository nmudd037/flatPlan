import React from 'react';
import { StyledSlider, StyledSliderWrapper } from './ViewSlider.styles';
import Tooltip from '@material-ui/core/Tooltip';
import '../../../../styles/vendor/popover.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import {
	valuetext,
	marks,
	SliderValuesType,
	sliderCallback,
} from './ViewSliderUtilities';
import { useFlatPlanContext } from '../flat-plan-context/FlatPlanState';
import { useLocation } from '@reach/router';
import { useGetPageViewStore } from '../flat-plan-page-views/page-view-utils';

const ValueLabelComponent = (props: {
	children: React.ReactElement;
	value: number;
}) => {
	const { children, value } = props;
	const title = valuetext(value);

	return (
		<Tooltip open={true} arrow={true} placement="top" title={title}>
			{children}
		</Tooltip>
	);
};

const ViewSlider = () => {
	const { view, setView } = useFlatPlanContext();
	const pageViewStore = useGetPageViewStore();
	const location = useLocation();

	return (
		<StyledSliderWrapper className="d-flex flex-row align-items-center">
			<span className="opacity-5 mtop-3 mr-35 fs-1-3rem">
				<FontAwesomeIcon icon={faSearchMinus} />
			</span>
			<StyledSlider
				aria-label="Flatplan View Slider"
				ValueLabelComponent={ValueLabelComponent}
				defaultValue={0}
				getAriaValueText={valuetext}
				step={null}
				value={view}
				marks={marks}
				onChange={(_event: React.ChangeEvent<{}>, value: number | number[]) => {
					_event.preventDefault();

					// eslint-disable-next-line no-console
					console.log(value, view);
					sliderCallback(
						value as SliderValuesType,
						view as SliderValuesType,
						pageViewStore,
						location,
						pageViewStore.registeredPageViewRef
					);
					setView && setView(value as SliderValuesType);
				}}
			/>
			<span className="opacity-5 mtop-3 ml-35 fs-1-3rem">
				<FontAwesomeIcon icon={faSearchPlus} />
			</span>
		</StyledSliderWrapper>
	);
};

export default ViewSlider;

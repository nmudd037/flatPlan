import React, { useState } from 'react';
import StyledInput from '../../../../../../../styled-components/elements/input';
import { Col } from 'reactstrap';
import { PrimaryButton } from '../../../../../../../styled-components/elements/button';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFlatPlanContext } from '../../../../flat-plan-context/FlatPlanState';
import { navigate } from '@reach/router';
import { getColumnsPerRow } from '../../../../view-slider/ViewSliderUtilities';
import { useGetPageViewStore } from '../../../page-view-utils';
import StyledFormikFieldErrorMsg from '../../../../../../../components/formik-field-error-msg/FormikFieldErrorMsg.style';

const GotoPage = () => {
	const [pageNumber, setPageNumber] = useState('');
	const [inputValid, setInputValid] = useState(true);

	const { view, pages } = useFlatPlanContext();
	const pageViewStore = useGetPageViewStore();

	const isPageInRange = (pageNumber: number) => {
		return pageNumber >= 1 && pageNumber <= pages.length;
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setPageNumber(value);

		if (value === '') {
			return setInputValid(true);
		}

		const pageNum = parseInt(value, 10);
		if (!isPageInRange(pageNum)) {
			return setInputValid(false);
		} else if (!inputValid) {
			return setInputValid(true);
		}
	};

	const onSubmit = () => {
		if (view === 100) {
			navigate(`../flatplan/${pageNumber}`);
			return setPageNumber('');
		}

		const pageViewRef = pageViewStore.registeredPageViewRef;
		const pageRow = Math.trunc(parseInt(pageNumber) / getColumnsPerRow(view));

		pageViewRef?.scrollToItem(pageRow, 'start');
		return setPageNumber('');
	};

	return (
		<Col
			xs={12}
			className=" d-flex justify-content-center align-items-start mt-4"
		>
			<Col xs={2} className="d-flex flex-column">
				<StyledInput
					type="number"
					value={pageNumber}
					className={false && 'is-invalid'}
					placeholder="Page Number"
					$large
					$whiteBackground
					min={1}
					onChange={onChange}
					$inputValid={inputValid}
				/>
				{!inputValid && (
					<StyledFormikFieldErrorMsg>
						Page number is out of range
					</StyledFormikFieldErrorMsg>
				)}
			</Col>

			<Col xs={2}>
				<PrimaryButton
					small
					disabled={!pageNumber || !inputValid}
					onClick={onSubmit}
				>
					Goto Page
					<FontAwesomeIcon icon={faAngleDoubleRight} className="ml-2" />
				</PrimaryButton>
			</Col>
		</Col>
	);
};

export default GotoPage;

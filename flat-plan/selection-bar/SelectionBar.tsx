import React, { useState } from 'react';
import { StyledSelectionBar } from '../../../../styled-components/elements/selection-bar-styles';
import Button from '@material-ui/core/Button';
import { StyledCheckbox } from '../../../../styled-components/elements/checkbox';
import SyncIcon from '@material-ui/icons/Sync';
import {
	FieldButton,
	PrimaryButton,
} from '../../../../styled-components/elements/button';
import {
	faDownload,
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFlatPlanContext } from '../flat-plan-context/FlatPlanState';
import { useLocation, navigate } from '@reach/router';
import Subtitle from '../../../../styled-components/elements/subtitle';
import { parseInt } from 'lodash';

const SelectionBar = () => {
	const [checked, setChecked] = useState(false);
	const { view, pages } = useFlatPlanContext();
	const location = useLocation();
	const pageNo = location.pathname.split('/').pop();
	// TODO:  Need to work on this to fix out of range page numbers
	const prevPage =
		pageNo &&
		parseInt(pageNo) > 1 &&
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		parseInt(pageNo) <= pages!.length &&
		parseInt(pageNo) - 1;
	const nextPage =
		pageNo &&
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		parseInt(pageNo) < pages!.length &&
		parseInt(pageNo) >= 1 &&
		parseInt(pageNo) + 1;

	return (
		<div>
			<StyledSelectionBar className="align-items-center">
				{view !== 100 && (
					<>
						<Button className="buttonGroup">
							<StyledCheckbox
								className="checkbox"
								onChange={() => setChecked(!checked)}
								checked={checked}
								small={true}
							/>
							<span className="pl-2">TOUT SÉLECTIONNER</span>
						</Button>
						<Button className="buttonGroup">ADD AUTOMATIC PRODUCTS</Button>
					</>
				)}

				{view === 100 && (
					<>
						<Subtitle className="mb-0">Page {pageNo}</Subtitle>

						<span className="ma-auto">
							{prevPage && (
								<FieldButton
									className="mr-2"
									onClick={() => navigate(`../flatplan/${prevPage}`)}
								>
									<FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
									PAGE {prevPage}
								</FieldButton>
							)}
							{nextPage && (
								<FieldButton
									onClick={() => navigate(`../flatplan/${nextPage}`)}
								>
									PAGE {nextPage}
									<FontAwesomeIcon icon={faChevronRight} className="ml-2" />
								</FieldButton>
							)}
						</span>
					</>
				)}

				<div
					className={`${view !== 100 ? 'push' : ''} d-flex align-items-center`}
				>
					<FieldButton className="mr-2 d-flex align-items-center">
						<SyncIcon className="mr-1 fs-1rem" />
						<span>Mettre à jour</span>
					</FieldButton>
					{view !== 100 && (
						<FieldButton className="mr-2">Add page(s)...</FieldButton>
					)}
					<PrimaryButton className="d-flex align-items-center">
						<span className="mr-1">Download as PDF</span>
						<FontAwesomeIcon icon={faDownload} />
					</PrimaryButton>
				</div>
			</StyledSelectionBar>
		</div>
	);
};

export default SelectionBar;

import React, { useState } from 'react';
import { CardBody, CardFooter, CardText, CardTitle } from 'reactstrap';
import { StyledFlatPlanCard, StyledHoverButton } from './FlatPlanCard.styles';
import { StyledCheckbox } from '../../../../styled-components/elements/checkbox';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFlatPlanContext } from '../flat-plan-context/FlatPlanState';
import { useRegisterPage } from '../flat-plan-page-views/page-view-utils';
import { navigate } from '@reach/router';

export const FlatPlanCardMask = () => {
	const { view, facingPages } = useFlatPlanContext();

	return (
		<StyledFlatPlanCard
			className="invisible"
			$view={view}
			$facingPages={facingPages}
		>
			<CardBody></CardBody>
		</StyledFlatPlanCard>
	);
};

const Footer = React.memo(
	({
		checked,
		setChecked,
		pageNumber,
	}: {
		checked: boolean;
		setChecked: React.Dispatch<React.SetStateAction<boolean>>;
		pageNumber?: number;
	}) => {
		return (
			<CardFooter className="card-footer d-flex align-items-center">
				<span className="cursor-pointer">
					<FontAwesomeIcon
						icon={faSearchPlus}
						onClick={() => {
							navigate(`./flatplan/${pageNumber}`);
						}}
					/>
				</span>
				<span className="marginleft-auto d-flex align-items-center cursor-pointer">
					<StyledCheckbox
						className="checkbox cursor-pointer"
						onChange={() => setChecked(!checked)}
						checked={checked}
						small={true}
						card={true}
					/>
					<StyledHoverButton>
						<img src="/images/edit.png" alt="edit" className="ma-b-1 ma-l-6" />
					</StyledHoverButton>
					<StyledHoverButton>
						<img src="/images/delete.png" alt="delete" className="ma-b-3" />
					</StyledHoverButton>
				</span>
			</CardFooter>
		);
	}
);

const FlatPlanCard = ({
	pageNumber,
}: {
	pageNumber?: number;
	id?: string;
	top?: string;
}) => {
	const [checked, setChecked] = useState(false);
	const { view, facingPages } = useFlatPlanContext();
	const RegisterPage = useRegisterPage(`${pageNumber}`);

	return (
		<StyledFlatPlanCard
			$selected={checked}
			$view={view}
			$facingPages={facingPages}
			innerRef={RegisterPage}
			id={`Page-${pageNumber}`}
			data-id={`${pageNumber}`}
		>
			<CardBody onClick={() => setChecked(!checked)}>
				<CardTitle tag="h5">Special Title Treatment {pageNumber}</CardTitle>
				<CardText>
					With supporting text below as a natural lead-in to additional content.
				</CardText>
			</CardBody>
			<Footer
				checked={checked}
				setChecked={setChecked}
				pageNumber={pageNumber}
			/>
		</StyledFlatPlanCard>
	);
};

export default FlatPlanCard;

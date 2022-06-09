import styled from 'styled-components';
import themeStore from '../../../../../theme/models/ThemeStore';
import { Card } from 'reactstrap';

const { colors } = themeStore.selectedTheme;

export const StyledOnePageViewCard = styled(Card)`
	background-color: ${colors.white};
	border-radius: 0;
	border: 1px solid ${colors.flatplanCardBorder};
	flex-basis: 45%;
	min-height: 68vh;
	cursor: pointer;
`;

import styled from 'styled-components';
import { gradient } from '../../constant/color';

const PrimaryButton = styled.button`
  border: 0;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-image: ${gradient.primary};
  box-shadow: 2px 4px 10px hsl(200, 5%, 5%, .5);
  svg {
    color: hsl(200, 5%, 90%, 1);
    filter: drop-shadow(2px 4px 3px hsl(200, 50%, 30%, .5));
  }
  &:active {
    background-image: linear-gradient(45deg, hsl(210, 40%, 20%) 0%, hsl(190, 40%, 40%) 100%);
  }
  &:disabled {
    opacity: 0.5;
  }
`

export default PrimaryButton;
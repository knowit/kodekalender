import styled from 'react-emotion';
import theme from '../style/theme';

// TODO: Should it change to white on hover?
const Button = styled('button')`
  background: ${theme.colors.black};
  color: ${theme.colors.white};
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  border-radius: ${theme.borderRadius};
  font-weight: bold;
  letter-spacing: 0.6px;
  font-size: 14px;
  padding: 14px 22px;
  border: none;
  transition: 0.3s ease all;

  user-select: none;

  &:hover:enabled {
    color: ${theme.colors.black};
    background: transparent;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export default Button;

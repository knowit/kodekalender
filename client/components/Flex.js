import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { justifyContent, alignItems, flexDirection } from 'styled-system';

import Box from './Box';

const Flex = styled(Box)`
  display: flex;
  ${justifyContent};
  ${alignItems};
  ${flexDirection};
`;

Flex.propTypes = {
  justify: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly',
  ]),
  align: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'stretch',
    'baseline',
  ]),
};

export default Flex;

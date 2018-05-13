import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import states from '../../utils/states';

const OverlayWrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  border-radius: 3px;
  position: absolute;
  background: rgba(0, 0, 0, .3);
  border: 2px solid #${props => props.color};

  text-align: center;
  flex-direction: column;
  justify-content: space-evenly;
`;

const OverlayAction = styled.span`
  color: ${props => props.selected ? 'yellow' : 'white'};
  cursor: pointer;
  display: inline;
  text-shadow: 1px 2px black;
`;

class BookOverlay extends Component {
  static propTypes = {
    shelf: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    onActionClick: PropTypes.func.isRequired
  };

  render() {
    const { shelf, color, onActionClick } = this.props;

    return (
      <OverlayWrapper color={color}>
        {
          Object.values(states).map(({ key, display}) => (
            <OverlayAction
              key={key}
              selected={shelf === key}
              onClick={() => onActionClick(key)}
            >
              {display}
            </OverlayAction>
          ))
        }
      </OverlayWrapper>
    );
  }
}

export default BookOverlay;
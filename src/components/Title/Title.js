import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 12px;

  &:after {
    content: '';
    height: 2px;
    display: block;
    margin-top: 4px;
    margin-left: 30%;
    margin-right: 30%;
    background: #${props => props.color || '000'};
  }
`;

const TitleText = styled.span`
  font-size: 18px;
`;

const Title = ({ color, children }) => (
  <TitleWrapper color={color}>
    <TitleText>
      {children}
    </TitleText>
  </TitleWrapper>
);

export default Title;


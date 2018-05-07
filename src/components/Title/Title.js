import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
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

const Text = styled.span`
  font-size: 18px;
`;

const Title = ({ color, title }) => (
  <Wrapper
    color={color}
  >
    <Text>
      {title}
    </Text>
  </Wrapper>
);

export default Title;


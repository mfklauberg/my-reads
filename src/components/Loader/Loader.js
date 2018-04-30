import React from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

const Wrapper = styled.div`
  top: 50%;
  left: 50%;
  position: fixed;
  transform: translate(-50%, -50%);
`;

const Loader = () => (
  <Wrapper>
    <ReactLoading
      type="spin"
      color="#000000"
      height={64}
      width={64}
      delay={.5}
    />
  </Wrapper>
);

export default Loader;
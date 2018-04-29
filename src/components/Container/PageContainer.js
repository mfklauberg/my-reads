import styled from 'styled-components';

const PageContainer = styled.div`
  flex: 1;
  height: calc(100vh - 84px);
  display: block;
  padding: 8px 8px;
  overflow: scroll;

  &:before {
    width: 85%;
    content: '';
    height: 2px;
    display: block;
    background: black;
    margin: 0 8px 12px 0;
  }
`;

export default PageContainer;

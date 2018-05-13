import React, { Component } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { Header } from './components';
import { Home, Search } from './screens';

const MyReads = styled.div`
  height: 100%;
  margin: 12px;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  flex: 1;
  background-color: white;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

class App extends Component {
  render() {
    return (
      <MyReads>
        <Header />
        <Body>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search}/>
        </Body>
      </MyReads>
    );
  }
}

export default App;

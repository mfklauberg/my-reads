import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  background: white;
  flex-direction: row;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const StyledLink = styled(NavLink)`
  padding: 8px;
  font-size: 22px;

  &:after {
    content: '';
    display: block;
    margin: auto;
    height: 2px;
    width: 0;
    background: transparent;
    transition: width .3s ease, background-color .3s ease;
  }

  &:hover:after {
    width: 100%;
    background: red;
  }

  &.active {
  }

  &.active:after {
    width: 100%;
    background: red;
  }

  &:visited, &:active, &:link {
    color: black;
    text-decoration: none;
  }
`;

class Header extends Component {
  state = {
    pages: [
      { display: 'Home', route: '/' },
      { display: 'Search', route: '/search' },
      { display: 'About', route: '/about' }
    ]
  };

  render() {
    const { pages } = this.state;

    return (
      <Container>
        {
          pages.map(({route, display}, index) => (
            <StyledLink key={index} activeClassName="active" exact={true} to={route}>{display}</StyledLink>
          ))
        }
      </Container>
    );
  }
}

export default Header;
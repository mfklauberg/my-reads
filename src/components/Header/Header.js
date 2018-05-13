import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
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
    ]
  };

  render() {
    const { pages } = this.state;

    return (
      <HeaderWrapper>
        {
          pages.map(({route, display}, index) => (
            <StyledLink
              exact
              key={index}
              activeClassName="active"
              to={route}
            >
              {display}
            </StyledLink>
          ))
        }
      </HeaderWrapper>
    );
  }
}

export default Header;
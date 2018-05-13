import React, { Component } from 'react';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  padding: 8px;
`;

const SearchInput = styled.input`
  padding: 4px;
  border: none;
  outline: none;
  font-size: 18px;
  width: calc(100% - 12px);
  border-bottom: 1px solid #D6D6D6;

  &:focus,
  &:active {
    border-color: #696969;
  }
`;

class SearchBox extends Component {
  updateQuery(event) {
    const query = event.target.value;
    const { onQueryUpdate } = this.props;

    onQueryUpdate(query);
  }

  render() {
    const { placeholder } = this.props;

    return (
      <SearchWrapper>
        <SearchInput
          placeholder={placeholder}
          onChange={(...args) => this.updateQuery(...args)}
        />
      </SearchWrapper>
    );
  }
}

export default SearchBox;
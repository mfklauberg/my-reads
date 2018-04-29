import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Book } from '..';

const ShelfWrapper = styled.div`
  display: flex;
  margin-left: 8px;
  flex-direction: column;
`;

const ShelfHeader = styled.div`
  font-size: 18px;
  text-align: center;
  margin-bottom: 12px;

  &:after {
    content: '';
    height: 2px;
    display: block;
    margin-top: 4px;
    margin-left: 30%;
    margin-right: 30%;
    background: #${props => props.color};
  }
`;

const ShelfTitle = styled.span`
`;

const ShelfContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
`;

class Shelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  };

  render() {
    const { onUpdateBook, title, color, books } = this.props;

    return (
      <ShelfWrapper>
        <ShelfHeader color={color}>
          <ShelfTitle>{title}</ShelfTitle>
        </ShelfHeader>
        <ShelfContent>
          {
            books.map(book => (
              <Book
                book={book}
                color={color}
                key={book.id}
                onUpdateBook={onUpdateBook}
              />
            ))
          }
        </ShelfContent>
      </ShelfWrapper>
    );
  }
}

export default Shelf;
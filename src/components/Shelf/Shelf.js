import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Book, Title } from '..';

const ShelfWrapper = styled.div`
  display: flex;
  margin-left: 8px;
  flex-direction: column;
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
        <Title color={color}>
          {title}
        </Title>
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BookOverlay } from '..';

const BookWrapper = styled.div`
  margin: 8px;
  padding: 32px;
  position: relative;
  transition: transform .2s;

  &:hover {
    transform: scale(1.03);
  }

  &:hover ${BookOverlay} div:first-child {
    display: flex;
  }
`;

const BookCover = styled.img`
`;

const BookInfo = styled.div`
  width: 128px;
  display: flex;
  margin-top: 4px;
  max-width: 128px;
  line-height: 18px;
  flex-direction: column;
`;

const BookTitle = styled.span`
  font-size: 14px;
`;

const BookAuthor = styled.span`
  color: #9E9E9E;
  font-size: 12px;
`;

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
  };

  updateBook(state) {
    const { book, onUpdateBook } = this.props;

    onUpdateBook(book, state);
  }

  render() {
    const { book, color } = this.props;
    const { shelf, title, authors = [], imageLinks: { thumbnail } } = book;

    return (
      <BookWrapper>
        <BookOverlay
          color={color}
          shelf={shelf}
          onActionClick={(state) => this.updateBook(state)}
        />
        <BookCover
          src={thumbnail}
        />
        <BookInfo>
          <BookTitle>{title}</BookTitle>
          {
            authors.map((author, index) => (
              <BookAuthor key={index}>{author}</BookAuthor>
            ))
          }
        </BookInfo>
      </BookWrapper>
    );
  }
}

export default Book;

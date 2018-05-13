import React, { Component } from 'react';

import { search } from '../../api/BooksAPI';
import { PageContainer, SearchBox, Loader, Book } from '../../components';

import { updateBook, getBooks } from '../../utils/book';
import { NONE, READ, WANT_TO_READ, CURRENTLY_READING } from '../../utils/states';

import styled from 'styled-components';
import debounce from 'lodash.debounce';
import { KEYWORDS } from '../../utils/keywords';

const BooksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const TextWrapper = styled.div`
  top: 30%;
  display: flex;
  position: relative;
  text-align: center;
  flex-direction: column;
  justify-content: center;
`;

const Text = styled.span`
  font-size: 16px;
  margin-bottom: 12px;
`;

const KeywordWraper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Keyword = styled.li`
  padding: 2px;
`;

class Search extends Component {
  state = {
    books: [],
    loading: false,
    read: [],
    wantToRead: [],
    currentlyReading: [],
  };

  componentDidMount() {
    getBooks().then(books => {
      const read = books.filter(({ shelf }) => shelf === READ.key).map(({ id }) => id);
      const wantToRead = books.filter(({ shelf }) => shelf === WANT_TO_READ.key).map(({ id }) => id);
      const currentlyReading = books.filter(({ shelf }) => shelf === CURRENTLY_READING.key).map(({ id }) => id);

      this.setState({ read, wantToRead, currentlyReading });
    });
  }

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onChangeQuery = (query = '') => {
    if (!query.length) {
      return this.setState({ query: '', loading: false, books: [] });
    }

    this.searchBooks(query);
  }

  $search = debounce(this.onChangeQuery.bind(this), 300)

  searchBooks = (query) => {
    this.setState({ query, loading: true });

    search(query)
      .then((result = {}) => result.error ? [] : result)
      .then((books = []) => this.applyShelfToBooks(books, this.state))
      .then((books = []) => this.setState({ loading: false, books: [...books] }))
  };

  applyShelfToBooks(books = [], shelves = {}) {
    const { read = [], wantToRead = [], currentlyReading = [] } = shelves

    return books.map(book => {
      let bookState;

      if (read.includes(book.id)) bookState = READ;
      else if (wantToRead.includes(book.id)) bookState = WANT_TO_READ;
      else if (currentlyReading.includes(book.id)) bookState = CURRENTLY_READING;
      else bookState = NONE;

      return { ...book, shelf: bookState.key, color: bookState.color };
    });
  }

  updateBook(book, shelf) {
    return updateBook(book, shelf).then(shelves => {
      const { books } = this.state;
      const updatedBooks = this.applyShelfToBooks(books, shelves);

      this.setState(prevState => ({ ...shelves, books: updatedBooks }));
    });
  };

  renderKeywords = () => {
    const keywords = [];

    for(let index = 0; index < 7; index++) {
      keywords.push(KEYWORDS[this.getRandomInt(0, 78)]);
    }

    return (
        <KeywordWraper>
          {
            keywords.map((keyword, index) => (
              <Keyword key={index}>
                {keyword}
              </Keyword>
            ))
          }
        </KeywordWraper>
    );
  }

  renderNoResults = () => {
    const { query = '' } = this.state;

    return (
      <TextWrapper>
        <Text>Your search for "{query}" did not return any results.</Text>
        <Text>Here's some possible keywords:</Text>
        {
          this.renderKeywords()
        }
      </TextWrapper>
    )
  };

  renderEmpty = () => (
    <TextWrapper>
      <Text>Type something in the search bear above to start searching!</Text>
      <Text>Here's some possible keywords:</Text>
      {
        this.renderKeywords()
      }
    </TextWrapper>
  );

  renderBooks = (books = []) => (
    <BooksWrapper>
      {
        books.map(book => (
          <Book
            book={book}
            key={book.id}
            color={book.color}
            onUpdateBook={(...args) => this.updateBook(...args)}
          />
        ))
      }
    </BooksWrapper>
  );

  renderContent = () => {
    const { books = [], query = '' } = this.state

    return !books.length && query ?
      this.renderNoResults(query) :
      !books.length && !query ?
        this.renderEmpty() :
        this.renderBooks(books);
  }

  render() {
    const { loading } = this.state;

    return (
      <PageContainer>
        <SearchBox
          placeholder="Search terms"
          onQueryUpdate={this.$search}
        />

        {
          loading
            ? <Loader />
            : this.renderContent()
        }
      </PageContainer>
    );
  }
}

export default Search;
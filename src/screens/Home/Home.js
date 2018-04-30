import React, { Component } from 'react';
import { getAll, update } from '../../api/BooksAPI';
import { Shelf, PageContainer, Loader } from '../../components';
import { CURRENTLY_READING, WANT_TO_READ, READ } from '../../utils/states';

class Home extends Component {
  state = {
    books: [],
    loading: true
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks() {
    getAll().then(books => {
      this.setState({ loading: false, books });
    });
  }

  updateBook(book, shelf) {
    const updatePromise = update(book, shelf);

    this.updateShelves(this.transformBook(book, shelf));

    return updatePromise;
  }

  // TODO: might need a better name;
  transformBook(book, shelf) {
    return { ...book, shelf };
  }

  updateShelves(updatedBook) {
    this.setState(previousState => {
      return {
        books: [
          ...previousState.books.filter(book => book.id !== updatedBook.id),
          updatedBook
        ]
      };
    });
  }

  renderLoading() {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    )
  }

  render() {
    const { books, loading } = this.state;

    if (loading) return this.renderLoading();

    const read = books.filter(({ shelf }) => shelf === READ.key);
    const wantToRead = books.filter(({ shelf }) => shelf === WANT_TO_READ.key);
    const currentlyReading = books.filter(({ shelf }) => shelf === CURRENTLY_READING.key);

    const shelves = [
      { color: CURRENTLY_READING.color, title: CURRENTLY_READING.display, books: currentlyReading },
      { color: WANT_TO_READ.color, title: WANT_TO_READ.display , books: wantToRead },
      { color: READ.color, title: READ.display, books: read },
    ]

    return (
      <PageContainer>
        {
          shelves.map(({ color, title, books }, index) => (
            <Shelf
              key={index}
              color={color}
              title={title}
              books={books}
              onUpdateBook={(...args) => this.updateBook(...args)}
            />
          ))
        }
      </PageContainer>
    )
  }
}

export default Home;
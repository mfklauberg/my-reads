import { update, getAll } from '../api/BooksAPI';

export const getBooks = () => getAll();
export const updateBook = (book, shelf) => update(book, shelf);
export const transformBook = (book, shelf) => ({ ...book, shelf });
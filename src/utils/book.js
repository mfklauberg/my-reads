import { update } from '../api/BooksAPI';

export const updateBook = (book, shelf) => update(book, shelf);
export const transformBook = (book, shelf) => ({ ...book, shelf });
import api from "../../types/api";
import { Book, Quote } from "./libraryTypes";

export const getQuotes = async (): Promise<Quote[]> => {
    try {
      const res = await api.get("/quotes/");
      return res.data;
    } catch (error) {
      console.log(error);
    }
    return [];
  };

export const getQuoteById = async (id: number): Promise<Quote> => {
    try {
        const res = await api.get(`/quotes/${id}/`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
    return {} as Quote;
};

export const getQuotesByBook = async (bookId: number): Promise<Quote[]> => {
    try {
      const res = await api.get(`/quotes/by-book/?book=${bookId}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
    return [];
  };

export const getBookById = async (id: number): Promise<Book> => {
  try {
    const res = await api.get(`/books/${id}/`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return {} as Book;
};

export const getCurrentlyReadingBooks = async (): Promise<Book[]> => {
  try {
    const res = await api.get("/books/");
    return res.data.filter((book: Book) => book.reading);
  } catch (error) {
    console.log(error);
  }
  return [];
}
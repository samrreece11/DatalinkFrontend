import { ReactNode } from "react";
import { Action, Book } from "./libraryTypes";
import BookDisplay from "./Book";
// Takes title, list of books to display

interface Props {
  button?: ReactNode;
  children: string;
  books: Book[];
  actions: Action[];
  onDoubleClick: (book: Book) => void;
}
const BookGroup = ({
  button,
  children,
  books,
  actions,
  onDoubleClick,
}: Props) => {
  return (
    <>
      <div key={children} id={children} className="category_container">
        <div className="title_block">
          <h3 className="title">
            {children} {button}
          </h3>
        </div>
        <div className="book_container">
          {books.map((book, index) => (
            <div
              onDoubleClick={() => onDoubleClick(book)}
              className="book"
              key={index}
            >
              <BookDisplay key={book.id} book={book} actions={actions} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookGroup;

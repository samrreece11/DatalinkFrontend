import { Action, Book } from "./libraryTypes";
import BookDisplay from "./Book";
// Takes title, list of books to display

interface Props {
  children: string;
  books: Book[];
  actions: Action[];
  onDoubleClick: (book: Book) => void;
}
const BookGroup = ({ children, books, actions, onDoubleClick }: Props) => {
  return (
    <>
      <div key={children} id={children} className="category_container">
        <div className="title_block">
          <h3 className="title">{children}</h3>
        </div>
        <div className="book_container">
          {books.map((book) => (
            <BookDisplay
              key={book.id}
              book={book}
              actions={actions}
              onDoubleClick={onDoubleClick}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookGroup;

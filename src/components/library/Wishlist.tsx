import { Action, Book } from "./libraryTypes";
import BookDisplay from "./Book";
import { useState } from "react";
import CreateBookForm from "./CreateBookForm";
// Takes title, list of books to display

interface Props {
  children: string;
  books: Book[];
  actions: Action[];
  onDoubleClick: (book: Book) => void;
  refresh: () => void;
}
const WishlistGroup = ({
  children,
  books,
  actions,
  onDoubleClick,
  refresh,
}: Props) => {
  const [isCreating, setIsCreating] = useState(false);
  return (
    <>
      <div key={children} id={children} className="category_container">
        <div className="title_block">
          <h3 className="title">{children}</h3>
        </div>
        {isCreating ? (
          <CreateBookForm
            refresh={refresh}
            handleClose={() => setIsCreating(false)}
          />
        ) : (
          <>
            <button
              className="add-book-btn"
              onClick={() => setIsCreating(true)}
            >
              + Book
            </button>
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
          </>
        )}
      </div>
    </>
  );
};

export default WishlistGroup;

import { Action, Book } from "./libraryTypes";
import DropdownBookOption from "./ButtonDrop";

interface Props {
  book: Book;
  actions: Action[];
  onDoubleClick: (book: Book) => void;
}

const BookDisplay = ({ book, actions, onDoubleClick }: Props) => {
  const fullDisplay = false;
  return (
    <>
      <button
        className="book_dropdown"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onDoubleClick={() => onDoubleClick(book)}
      >
        {book.title}
        {fullDisplay && (
          <>
            By <i>{book.author}</i>
          </>
        )}
      </button>
      <div key={book.id} className="dropdown-menu">
        {actions.map((action) => (
          <DropdownBookOption
            key={action.name + book.id}
            book={book}
            onClick={action.action}
          >
            {action.name}
          </DropdownBookOption>
        ))}
      </div>
    </>
  );
};

export default BookDisplay;

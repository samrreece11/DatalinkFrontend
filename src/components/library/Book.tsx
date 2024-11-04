import { Action, Book } from "./libraryTypes";
import DropdownBookOption from "./ButtonDrop";

interface Props {
  book: Book;
  actions: Action[];
}

const BookDisplay = ({ book, actions }: Props) => {
  return (
    <>
      <button
        className="book_dropdown"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        - {book.title} By <i>{book.author}</i>
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

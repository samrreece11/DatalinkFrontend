import { Action, Book } from "./libraryTypes";
import BookDisplay from "./Book";
import BoxComponent from "../structure/BoxComponent";
import CreateBookComponent from "./CreateBookComponent";
// Takes title, list of books to display

interface Props {
  children: string;
  books: Book[];
  actions: Action[];
  onDoubleClick: (book: Book) => void;
  refresh?: () => void;
}
const BookGroup = ({
  children,
  books,
  actions,
  onDoubleClick,
  refresh,
}: Props) => {
  return (
    <>
      <BoxComponent title={children} className="m-1 grey-box library-flex">
        {refresh ? <CreateBookComponent refresh={refresh} /> : null}
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
      </BoxComponent>
    </>
  );
};

export default BookGroup;

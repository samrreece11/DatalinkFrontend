import { Book } from "./libraryTypes";

interface Props {
  book: Book;
  children: string;
  onClick: (book: Book) => void;
}
function BookDropdownOption({ book, children, onClick }: Props) {
  return (
    <div className="drop-item" onClick={() => onClick(book)}>
      {children}
    </div>
  );
}

export default BookDropdownOption;

import Title from "../utils/TitleBlock";
import BibleBookElement from "./BibleBookElement";
import { BibleBook } from "./FaithTypes";

interface Props {
  children: string;
  books: BibleBook[];
  onSelectBook: (book: BibleBook) => void;
}

const TestamentContainer = ({ children, books, onSelectBook }: Props) => {
  return (
    <div className="testament">
      <Title>{children}</Title>
      <div className="bible-books flex">
        {books.map((book) => (
          <BibleBookElement onSelectBook={onSelectBook} key={book.id}>
            {book}
          </BibleBookElement>
        ))}
      </div>
    </div>
  );
};

export default TestamentContainer;

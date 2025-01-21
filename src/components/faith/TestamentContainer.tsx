import BoxComponent from "../structure/BoxComponent";
import BibleBookElement from "./BibleBookElement";
import { BibleBook } from "./FaithTypes";

interface Props {
  children: string;
  books: BibleBook[];
  onSelectBook: (book: BibleBook) => void;
}

const TestamentContainer = ({ children, books, onSelectBook }: Props) => {
  return (
    <BoxComponent
      title={children}
      className="flex-grow1 border1 radius-10 m-3 py-2 px-3"
    >
      <div className="flex">
        {books.map((book) => (
          <BibleBookElement onSelectBook={onSelectBook} key={book.id}>
            {book}
          </BibleBookElement>
        ))}
      </div>
    </BoxComponent>
  );
};

export default TestamentContainer;

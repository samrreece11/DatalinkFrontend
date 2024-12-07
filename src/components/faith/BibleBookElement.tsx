import { BibleBook } from "./FaithTypes";

interface Props {
  children: BibleBook;
  onSelectBook: (book: BibleBook) => void;
}
const BibleBookElement = ({ children, onSelectBook }: Props) => {
  return (
    <>
      <div onClick={() => onSelectBook(children)} className="bible-book">
        {children.title}
      </div>
    </>
  );
};

export default BibleBookElement;

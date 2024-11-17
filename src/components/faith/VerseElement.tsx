import { useContext } from "react";
import { BibleVerse } from "./FaithTypes";
import { BooksContext } from "./FaithHome";

interface Props {
  verse: BibleVerse;
  setViewVerse: (verse: BibleVerse) => void;
}
const VerseElement = ({ verse, setViewVerse }: Props) => {
  const biblebooks = useContext(BooksContext);
  const bookIdToName = (bookId: number) => {
    const book = biblebooks.find((book) => book.id === bookId);
    return book ? book.name : "Unknown";
  };

  return (
    <div onClick={() => setViewVerse(verse)} className="verse-element hover">
      {bookIdToName(verse.book)} {verse.chapter}:{verse.verse}
      {verse.endVerse && -verse.endVerse}
    </div>
  );
};

export default VerseElement;

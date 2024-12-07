import { BibleVerse } from "./FaithTypes";

interface Props {
  verse: BibleVerse;
  setViewVerse: (verse: BibleVerse) => void;
}
const VerseElement = ({ verse, setViewVerse }: Props) => {
  return (
    <div onClick={() => setViewVerse(verse)} className="verse-element hover">
      {verse.book.title} {verse.chapter}:{verse.verse}
      {verse.endVerse && -verse.endVerse}
    </div>
  );
};

export default VerseElement;

import { BibleVerse } from "./FaithTypes";

interface Props {
  verse: BibleVerse;
  setViewVerse: (verse: BibleVerse) => void;
}
const VerseElementLong = ({ verse, setViewVerse }: Props) => {
  return (
    <div onClick={() => setViewVerse(verse)} className="verse-element-long">
      <b>
        {verse.book.title} {verse.chapter}:{verse.verse}
        {verse.endVerse && -verse.endVerse}
      </b>
      : {verse.content}
    </div>
  );
};

export default VerseElementLong;

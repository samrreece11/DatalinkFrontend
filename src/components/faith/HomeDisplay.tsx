import { BibleBook, BibleVerse } from "./FaithTypes";
import Title from "../utils/TitleBlock";
import TestamentContainer from "./TestamentContainer";
import VerseContainer from "./VerseContainer";

interface Props {
  bibleBooks: BibleBook[];
  verses: BibleVerse[];
  setCurrentBibleBook: (book: BibleBook) => void;
  getAllVerses: () => void;
}
export function HomeDisplay({
  setCurrentBibleBook,
  bibleBooks,
  verses,
  getAllVerses,
}: Props) {
  return (
    <>
      <Title>Faith Home</Title>
      <div className="faith-home flex">
        <div className="bible-container grey-box">
          <Title>Bible Books</Title>
          <div className="testament-container">
            <TestamentContainer
              onSelectBook={setCurrentBibleBook}
              books={bibleBooks.filter((book) => book.isOldTestament === false)}
            >
              New Testament
            </TestamentContainer>
            <TestamentContainer
              onSelectBook={setCurrentBibleBook}
              books={bibleBooks.filter((book) => book.isOldTestament === true)}
            >
              Old Testament
            </TestamentContainer>
          </div>
        </div>
        <div className="verse-container grey-box">
          <VerseContainer
            getAllVerses={getAllVerses}
            verses={verses}
          ></VerseContainer>
        </div>
      </div>
    </>
  );
}

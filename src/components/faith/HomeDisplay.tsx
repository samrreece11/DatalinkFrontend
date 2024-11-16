import { BibleBook } from "./FaithTypes";
import Title from "../utils/TitleBlock";
import TestamentContainer from "./TestamentContainer";

interface Props {
  bibleBooks: BibleBook[];
  setCurrentBibleBook: (book: BibleBook) => void;
}
export function HomeDisplay({ setCurrentBibleBook, bibleBooks }: Props) {
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
          <Title>Verses</Title>
          <div className="verse">
            <h3>John 3:16</h3>
            <p>
              For God so loved the world that he gave his one and only Son, that
              whoever believes in him shall not perish but have eternal life.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

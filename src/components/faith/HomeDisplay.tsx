import { BibleBook, BibleVerse } from "./FaithTypes";
import TestamentContainer from "./TestamentContainer";
import VerseContainer from "./VerseContainer";
import BoxComponent from "../structure/BoxComponent";

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
    <BoxComponent title="Faith Home" titleSize={1} className="">
      <div className="flex">
        <VerseContainer onCreate={getAllVerses} verses={verses} />
        <BoxComponent title="Bible Books" className="grey-box w-75p m-auto">
          {/* <div className="testament-container"> */}
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
          {/* </div> */}
        </BoxComponent>
      </div>
    </BoxComponent>
  );
}

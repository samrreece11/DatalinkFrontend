import { useContext, useState } from "react";
import { BibleBook, BibleVerse } from "./FaithTypes";
import VerseElement from "./VerseElement";
import { Button } from "reactstrap";
import { BooksContext } from "./FaithHome";
import api from "../../types/api";
import CreateVerseForm from "./CreateVerseForm";
import VerseElementLong from "./VerseElementLong";

interface Props {
  verses: BibleVerse[];
  onCreate: () => void;
  long?: boolean;
  currentBook?: BibleBook;
}

const VerseContainer = ({ verses, onCreate, long, currentBook }: Props) => {
  long = long || false;
  const [isAddingVerse, setIsAddingVerse] = useState(false);
  const bibleBooks = useContext(BooksContext);
  const [viewVerse, setViewVerse] = useState<BibleVerse | null>(null);

  const handleDeleteVerse = async () => {
    if (viewVerse) {
      try {
        await api.delete(`/faith/verses/${viewVerse.id}/`);
        setViewVerse(null);
        onCreate();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="verse-container grey-box">
      <div className="title-block">
        <h4 className="title">Verses</h4>
      </div>
      {isAddingVerse ? (
        <CreateVerseForm
          onCreate={onCreate}
          setIsAddingVerse={setIsAddingVerse}
          currentBook={currentBook}
        ></CreateVerseForm>
      ) : (
        !viewVerse && (
          <div onClick={() => setIsAddingVerse(true)} className="add-verse">
            + Add Verse
          </div>
        )
      )}
      {viewVerse ? (
        <>
          <Button className="al-r" size="sm" onClick={() => setViewVerse(null)}>
            Back
          </Button>
          <br />
          <br />
          <div className="view-verse">
            <b>
              {bibleBooks.find((book) => book.id === viewVerse.book)?.name}{" "}
              {viewVerse.chapter}:{viewVerse.verse}
              {viewVerse.endVerse && `-${viewVerse.endVerse}`}
            </b>
            {": "}
            {viewVerse.content}
            <br />
            <br />
            <Button size="sm" color="danger" onClick={handleDeleteVerse}>
              Delete
            </Button>
          </div>
        </>
      ) : (
        <div className="flex">
          {verses.map((verse) =>
            long ? (
              <VerseElementLong
                setViewVerse={setViewVerse}
                verse={verse}
                key={verse.id}
              />
            ) : (
              <VerseElement
                setViewVerse={setViewVerse}
                verse={verse}
                key={verse.id}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default VerseContainer;

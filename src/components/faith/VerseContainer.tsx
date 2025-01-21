import { useState } from "react";
import { BibleBook, BibleVerse } from "./FaithTypes";
import VerseElement from "./VerseElement";
import { Button } from "reactstrap";
import api from "../../types/api";
import CreateVerseForm from "./CreateVerseForm";
import VerseElementLong from "./VerseElementLong";
import BoxComponent from "../structure/BoxComponent";

interface Props {
  verses: BibleVerse[];
  onCreate: () => void;
  long?: boolean;
  currentBook?: BibleBook;
}

const VerseContainer = ({ verses, onCreate, long, currentBook }: Props) => {
  long = long || false;
  const [isAddingVerse, setIsAddingVerse] = useState(false);
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
    <BoxComponent title="Verses" className="grey-box m-auto w-75p mb-2 center">
      <div className="">
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
            <Button
              className="al-r"
              size="sm"
              onClick={() => setViewVerse(null)}
            >
              Back
            </Button>
            <br />
            <br />
            <div className="view-verse">
              <b>
                {viewVerse.book.title} {viewVerse.chapter}:{viewVerse.verse}
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
    </BoxComponent>
  );
};

export default VerseContainer;

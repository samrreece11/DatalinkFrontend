import { useLocation } from "react-router-dom";
import BoxComponent from "../structure/BoxComponent";
import { BibleBook } from "./FaithTypes";
import { useState } from "react";
import CKEditorBox from "../utils/CKEditorBox";
import api from "../../types/api";

const BibleBookView = () => {
  const location = useLocation();
  const bibleBook = location.state?.bibleBook || ({} as BibleBook);

  const [notes, setNotes] = useState(bibleBook.notes);

  const handleSaveNotes = (data: string) => {
    api.patch(`/faith/books/${bibleBook.id}/`, {
      notes: data,
    });
    setNotes(data);
  };

  return (
    <BoxComponent
      title={"The Book Of " + bibleBook.title}
      titleSize={1}
      backButton={true}
      className=""
    >
      <div className="flex">
        <BoxComponent
          title="Notes"
          titleSize={2}
          className="w-75p m-1 mx-auto grey-box"
        >
          <CKEditorBox input={notes} handleSave={handleSaveNotes} />
        </BoxComponent>
      </div>
    </BoxComponent>
  );
};

export default BibleBookView;

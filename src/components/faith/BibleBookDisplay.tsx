import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import { Button, Form, FormGroup } from "reactstrap";
import { editorConfig } from "../utils/CKeditor";
import { BibleBook, BibleVerse } from "./FaithTypes";
import { useState } from "react";

interface Props {
  currentBibleBook: BibleBook;
  setCurrentBibleBook: (book: BibleBook | null) => void;
  handleSubmit: () => void;
  verses: BibleVerse[];
}

const BibleBookDisplay = ({
  currentBibleBook,
  setCurrentBibleBook,
  handleSubmit,
  verses,
}: Props) => {
  const [notes, setNotes] = useState(currentBibleBook?.notes || "");
  const [historicNotes, setHistoricNotes] = useState(
    currentBibleBook?.history || ""
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <>
      <div className="bible-book-container">
        <div className="title-block">
          <h3 className="title">
            {currentBibleBook.name}
            <Button onClick={() => setCurrentBibleBook(null)}>Back</Button>
          </h3>
        </div>
        {/* Notes Form */}
        <div className="flex">
          <div className="bible-notes border-2">
            <h4>Notes: </h4>
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <CKEditor
                  editor={ClassicEditor}
                  config={editorConfig}
                  data={notes}
                  onChange={(_event, editor) => setNotes(editor.getData())}
                />
              </FormGroup>
              <FormGroup>
                <h4>Historic Notes: </h4>
                <CKEditor
                  editor={ClassicEditor}
                  config={editorConfig}
                  data={historicNotes}
                  onChange={(_event, editor) =>
                    setHistoricNotes(editor.getData())
                  }
                />
              </FormGroup>
              <Button color="success" size="lg" type="submit">
                Save
              </Button>
            </Form>
          </div>
          <div className="verse-container grey-box">
            <h4>Verses: </h4>
            {verses.map((verse) => (
              <div key={verse.id}>
                <b>
                  {verse.chapter}:{verse.verse}
                  {verse.endVerse && `-${verse.endVerse}`}
                </b>
                {": "}
                {verse.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BibleBookDisplay;

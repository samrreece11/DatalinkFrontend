import "ckeditor5/ckeditor5.css";
import { Button, Form, FormGroup } from "reactstrap";
import CKEditorBox from "../utils/CKEditorBox";
import { BibleBook, BibleVerse } from "./FaithTypes";
import VerseContainer from "./VerseContainer";

interface Props {
  currentBibleBook: BibleBook;
  setCurrentBibleBook: (book: BibleBook | null) => void;
  handleSubmit: () => void;
  verses: BibleVerse[];
  notes: string;
  setNotes: (notes: string) => void;
  historicNotes: string;
  setHistoricNotes: (notes: string) => void;
  onCreate: () => void;
}

const BibleBookDisplay = ({
  currentBibleBook,
  setCurrentBibleBook,
  handleSubmit,
  verses,
  notes,
  setNotes,
  historicNotes,
  setHistoricNotes,
  onCreate,
}: Props) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <>
      <div className="bible-book-container">
        <div className="title-block">
          <h3 className="title">
            {currentBibleBook.title}
            <Button onClick={() => setCurrentBibleBook(null)}>Back</Button>
          </h3>
        </div>
        {/* Notes Form */}
        <div className="flex">
          <div className="bible-notes border-2">
            <h4>Notes: </h4>
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <CKEditorBox input={notes} handleSave={setNotes} />
              </FormGroup>
              <FormGroup>
                <h4>Historic Notes: </h4>
                <CKEditorBox
                  input={historicNotes}
                  handleSave={setHistoricNotes}
                />
              </FormGroup>
              <Button color="success" size="lg" type="submit">
                Save
              </Button>
            </Form>
          </div>
          <VerseContainer
            currentBook={currentBibleBook}
            verses={verses}
            onCreate={onCreate}
            long={true}
          />
        </div>
      </div>
    </>
  );
};

export default BibleBookDisplay;

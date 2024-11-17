import { useContext, useState } from "react";
import { BibleVerse } from "./FaithTypes";
import VerseElement from "./VerseElement";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { BooksContext } from "./FaithHome";
import { bibleApi } from "./BibleApi";
import api from "../../types/api";

interface Props {
  verses: BibleVerse[];
  getAllVerses: () => void;
}

const VerseContainer = ({ verses, getAllVerses }: Props) => {
  const [isAddingVerse, setIsAddingVerse] = useState(false);
  const bibleBooks = useContext(BooksContext);
  const [selectedBook, setSelectedBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");
  const [content, setContent] = useState("");
  const [version, setVersion] = useState("web");
  const [isCreatingOwnVerse, setIsCreatingOwnVerse] = useState(false);

  const [viewVerse, setViewVerse] = useState<BibleVerse | null>(null);

  const createVerse = async (
    book: number,
    chapter: number,
    verse: number,
    verseEnd: number | null,
    content: string
  ) => {
    console.log(book, chapter, verse, verseEnd, content);
    try {
      const res = await api.post("/faith/verses/", {
        book: book,
        chapter: chapter,
        verse: verse,
        endVerse: verseEnd,
        content: content,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    getAllVerses();
  };

  const bookToId = (bookName: string) => {
    const book = bibleBooks.find((book) => book.name === bookName);
    return book ? book.id : 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAddingVerse(false);
    const verseArr = verse.split("-");
    const verseStart = parseInt(verseArr[0]);
    const verseEnd = parseInt(verseArr[1]) || null;
    console.log(verseEnd);
    const book = bookToId(selectedBook);
    const chapterId = parseInt(chapter);
    if (!isCreatingOwnVerse) {
      const queryString = `${selectedBook} ${chapter}:${verse}`;
      try {
        const res = await bibleApi.get(queryString, {
          params: { translation: version },
        });
        const content = res.data.text.replace(/\s+/g, " ").trim();
        createVerse(book, chapterId, verseStart, verseEnd, content);
      } catch (error) {
        console.log(error);
      }
    } else {
      createVerse(book, chapterId, verseStart, verseEnd, content);
    }
    getAllVerses();
  };

  const handleDeleteVerse = async () => {
    if (viewVerse) {
      try {
        await api.delete(`/faith/verses/${viewVerse.id}/`);
        setViewVerse(null);
        getAllVerses();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCheck = () => {
    setIsCreatingOwnVerse(!isCreatingOwnVerse);
  };

  return (
    <>
      <div className="title-block">
        <h4 className="title">Verses</h4>
      </div>
      {isAddingVerse ? (
        <div className="add-verse-form">
          <Form onSubmit={handleSubmit}>
            <Input
              type="select"
              placeholder="Book"
              autoFocus
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
            >
              <option value="" disabled>
                Select Book
              </option>
              {bibleBooks.map((book) => (
                <option key={book.id} value={book.name}>
                  {book.name}
                </option>
              ))}
            </Input>
            <Input
              type="number"
              placeholder="Chapter"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Enter Verse ex 1-5"
              value={verse}
              onChange={(e) => setVerse(e.target.value)}
            />
            {isCreatingOwnVerse ? (
              <Input
                type="textarea"
                placeholder="Enter Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            ) : (
              <Input
                type="select"
                placeholder="Version"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
              >
                <option value="web">ESV</option>
                <option value="kjv">KJV</option>
              </Input>
            )}
            <FormGroup>
              <label htmlFor="customize">Enter Manually</label>
              <Input
                id="customize"
                type="checkbox"
                checked={isCreatingOwnVerse}
                onChange={handleCheck}
              ></Input>
            </FormGroup>
            <Button color="success" type="submit">
              Add Verse
            </Button>
            <Button onClick={() => setIsAddingVerse(false)}>Cancel</Button>
          </Form>
        </div>
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
        <div className="verse-container flex">
          {verses.map((verse) => (
            <VerseElement
              setViewVerse={setViewVerse}
              verse={verse}
              key={verse.id}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default VerseContainer;

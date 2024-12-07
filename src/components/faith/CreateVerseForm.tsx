import { useContext, useState } from "react";
import { Form, Input, FormGroup, Button } from "reactstrap";
import { BooksContext } from "./FaithHome";
import { bibleApi } from "./BibleApi";
import api from "../../types/api";
import { BibleBook } from "./FaithTypes";

interface Props {
  setIsAddingVerse: (isAddingVerse: boolean) => void;
  onCreate: () => void;
  currentBook?: BibleBook;
}

const CreateVerseForm = ({
  onCreate,
  setIsAddingVerse,
  currentBook,
}: Props) => {
  const bibleBooks = useContext(BooksContext);
  const [selectedBook, setSelectedBook] = useState(currentBook?.title || "");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");
  const [content, setContent] = useState("");
  const [version, setVersion] = useState("web");
  const [isCreatingOwnVerse, setIsCreatingOwnVerse] = useState(false);

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
    onCreate();
  };

  const bookToId = (bookName: string) => {
    const book = bibleBooks.find((book) => book.title === bookName);
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
    onCreate();
  };

  const handleCheck = () => {
    setIsCreatingOwnVerse(!isCreatingOwnVerse);
  };

  return (
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
            <option key={book.id} value={book.title}>
              {book.title}
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
  );
};

export default CreateVerseForm;

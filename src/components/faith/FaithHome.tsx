import { HomeDisplay } from "./HomeDisplay";
import { useEffect, useState } from "react";
import { BibleBook } from "./FaithTypes";
import api from "../../types/api";
import BibleBookDisplay from "./BibleBookDisplay";
import React from "react";

export const BooksContext = React.createContext<BibleBook[]>([]);

const FaithHome = () => {
  const [bibleBooks, setBibleBooks] = useState<BibleBook[]>([]);
  const [currentBibleBook, setCurrentBibleBook] = useState<BibleBook | null>(
    null
  );
  const [notes, setNotes] = useState(currentBibleBook?.notes || "");
  const [historicNotes, setHistoricNotes] = useState(
    currentBibleBook?.history || ""
  );

  const [verses, setVerses] = useState([]);

  useEffect(() => {
    console.log("Current Bible Book: ", currentBibleBook);
    setNotes(currentBibleBook?.notes || "");
    setHistoricNotes(currentBibleBook?.history || "");
    if (currentBibleBook) {
      getBibleVersesByBook(currentBibleBook.id);
    }
  }, [currentBibleBook]);

  const getBibleVersesByBook = async (bookId: number) => {
    try {
      const res = await api.get(`/faith/verses/?book=${bookId}`);
      setVerses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBibleVerses = async () => {
    try {
      const res = await api.get("/faith/verses/");
      setVerses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookVerses = (bookId: number) => {
    return verses.filter((verse: any) => verse.book === bookId);
  };

  const getBibleBooks = async () => {
    try {
      const res = await api.get("/faith/books/");
      const sortedBooks = res.data.sort(
        (a: BibleBook, b: BibleBook) => a.id - b.id
      );
      setBibleBooks(sortedBooks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      await api.patch(`/faith/books/${currentBibleBook?.id}/`, {
        notes: notes,
        history: historicNotes,
      });
      console.log("Update successful");
      setCurrentBibleBook(null);
      getBibleBooks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBibleBooks();
    getAllBibleVerses();
  }, []);

  return (
    <>
      <BooksContext.Provider value={bibleBooks}>
        {currentBibleBook ? (
          <BibleBookDisplay
            verses={getBookVerses(currentBibleBook.id)}
            currentBibleBook={currentBibleBook}
            setCurrentBibleBook={setCurrentBibleBook}
            notes={notes}
            setNotes={setNotes}
            historicNotes={historicNotes}
            setHistoricNotes={setHistoricNotes}
            handleSubmit={handleSubmit}
            onCreate={getAllBibleVerses}
          />
        ) : (
          <>
            <HomeDisplay
              getAllVerses={getAllBibleVerses}
              setCurrentBibleBook={setCurrentBibleBook}
              bibleBooks={bibleBooks}
              verses={verses}
            />
          </>
        )}
      </BooksContext.Provider>
    </>
  );
};

export default FaithHome;

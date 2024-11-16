import { HomeDisplay } from "./HomeDisplay";
import { useEffect, useState } from "react";
import { BibleBook } from "./FaithTypes";
import api from "../../types/api";
import BibleBookDisplay from "./BibleBookDisplay";

const FaithHome = () => {
  const [bibleBooks, setBibleBooks] = useState<BibleBook[]>([]);
  const [currentBibleBook, setCurrentBibleBook] = useState<BibleBook | null>(
    null
  );
  const [notes, setNotes] = useState(currentBibleBook?.notes || "");
  const [historicNotes, setHistoricNotes] = useState(
    currentBibleBook?.history || ""
  );

  useEffect(() => {
    console.log("Current Bible Book: ", currentBibleBook);
    setNotes(currentBibleBook?.notes || "");
    setHistoricNotes(currentBibleBook?.history || "");
  }, [currentBibleBook]);

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
  }, []);

  return (
    <>
      {currentBibleBook ? (
        <BibleBookDisplay
          currentBibleBook={currentBibleBook}
          setCurrentBibleBook={setCurrentBibleBook}
          handleSubmit={handleSubmit}
        />
      ) : (
        <>
          <HomeDisplay
            setCurrentBibleBook={setCurrentBibleBook}
            bibleBooks={bibleBooks}
          />
        </>
      )}
    </>
  );
};

export default FaithHome;

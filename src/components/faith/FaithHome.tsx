import { useEffect, useState } from "react";
import { BibleBook } from "./FaithTypes";
import api from "../../types/api";
import BoxComponent from "../structure/BoxComponent";
import VerseContainer from "./VerseContainer";
import TestamentContainer from "./TestamentContainer";
import { useNavigate } from "react-router-dom";
import SearchButton from "../utils/SearchButton";

const FaithHome = () => {
  const navigate = useNavigate();
  const [bibleBooks, setBibleBooks] = useState<BibleBook[]>([]);
  const [verses, setVerses] = useState([]);
  const [search, setSearch] = useState("");
  const [searchBooks, setSearchBooks] = useState<BibleBook[]>([]);

  const selectBibleBook = (bibleBook: BibleBook) => {
    navigate(`/bibleBook/${bibleBook.title.replace(/\s+/g, "")}`, {
      state: { bibleBook },
    });
  };

  const getAllBibleVerses = async () => {
    try {
      const res = await api.get("/faith/verses/");
      setVerses(res.data);
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    getBibleBooks();
    getAllBibleVerses();
  }, []);

  useEffect(() => {
    const filteredBooks = bibleBooks.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchBooks(filteredBooks);
  }, [search, bibleBooks]);

  return (
    <BoxComponent title="Faith" titleSize={1}>
      <SearchButton search={search} setSearch={setSearch} title="Search" />
      <div className="flex">
        {search ? (
          <BoxComponent
            title="Search Results"
            className="grey-box w-50p m-auto"
          >
            <div className="flex">
              {searchBooks.map((book) => (
                <div
                  key={book.id}
                  className="border1 radius-10 p-1 m-1 center bg-grey-hover flex-grow"
                  onClick={() => selectBibleBook(book)}
                >
                  {book.title}
                </div>
              ))}
            </div>
          </BoxComponent>
        ) : (
          <>
            <BoxComponent title="Bible Books" className="grey-box w-75p m-auto">
              <TestamentContainer
                onSelectBook={selectBibleBook}
                books={bibleBooks.filter(
                  (book) => book.isOldTestament === false
                )}
              >
                New Testament
              </TestamentContainer>
              <TestamentContainer
                onSelectBook={selectBibleBook}
                books={bibleBooks.filter(
                  (book) => book.isOldTestament === true
                )}
              >
                Old Testament
              </TestamentContainer>
            </BoxComponent>

            <VerseContainer onCreate={getAllBibleVerses} verses={verses} />
          </>
        )}
      </div>
    </BoxComponent>
  );
};

export default FaithHome;

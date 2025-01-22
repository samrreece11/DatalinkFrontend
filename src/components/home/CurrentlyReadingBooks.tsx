import { useEffect, useState } from "react";
import { Book } from "../library/libraryTypes";
import { getCurrentlyReadingBooks } from "../library/LibraryUtils";
import BoxComponent from "../structure/BoxComponent";
import { useNavigate } from "react-router-dom";

const CurrentlyReadingBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentlyReadingBooks().then((books) => setBooks(books));
    console.log(books);
  }, []); // Only runs on first render

  const handleClick = (book: Book) => {
    navigate(`/book/${book.title.replace(/\s+/g, "")}`, { state: { book } });
  };

  return (
    <BoxComponent
      title="Currently Reading"
      className="w-300 m-2 flex-grow grey-box"
    >
      <div className="book_container">
        {books.map((book) => (
          <div
            key={book.id}
            className="border1 radius-10 p-1 m-1 flex-grow center bg-grey-hover"
            onClick={() => handleClick(book)}
          >
            {book.title}
          </div>
        ))}
      </div>
    </BoxComponent>
  );
};

export default CurrentlyReadingBooks;

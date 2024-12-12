import { useEffect, useState } from "react";
import { Book, Action } from "./libraryTypes";
import BookGroup from "./BookGroup";
import api from "../../types/api";
import Button from "../Button";
import BookView from "./BookView";
import { getBookById } from "./LibraryUtils";

// Define the type for the items

function Library() {
  const [books, setBooks] = useState<Book[]>([]);
  const [viewingBook, setViewingBook] = useState<Book>({} as Book);
  const [title, setTitle] = useState<string>("Library");

  useEffect(() => {
    refreshList();
  }, []); // Only runs on first render

  // Updates db
  const updateBook = async (book: Book) => {
    try {
      await api.put(`/books/${book.id}/`, book);
      refreshList();
    } catch (error) {
      console.error("Error updating book:", error);
      // Handle error (e.g., show a notification)
    }
  };

  // Moves book to next bin based on current status. Calls updateBookInDB
  const moveBook = async (book: Book) => {
    if (!book.bought) {
      // Move to Bought
      book.bought = true;
    } else if (book.bought && !book.reading && !book.read) {
      // Move to Currently Reading
      book.startDate = new Date().toISOString().slice(0, 10);
      book.reading = true;
    } else if (book.reading) {
      // Move to Read
      book.endDate = new Date().toISOString().slice(0, 10);
      book.reading = false;
      book.read = true;
    } else {
      console.log("Error");
    }
    updateBook(book);
    refreshList();
  };

  // API request to list of books
  const refreshList = async () => {
    try {
      const response = await api.get("/books/");
      setBooks(response.data);

      // If the books are refreshed while viewing book, it will update the viewing book
      if (viewingBook.id) {
        setViewingBook(await getBookById(viewingBook.id));
      }
      console.log("Books fetched");
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleViewBook = (book: Book) => {
    setViewingBook(book);
    setTitle(`${book.title} by ${book.author}`);
  };

  const handleSwitchToLibrary = () => {
    setViewingBook({} as Book);
    setTitle("Library");
  };

  // Actions for each respective drop down.

  const wishlistActions: Action[] = [
    {
      name: "View Book",
      action: (book: Book) => handleViewBook(book),
    },
    {
      name: "Bought",
      action: (book: Book) => moveBook(book),
    },
  ];
  const boughtActions: Action[] = [
    {
      name: "View Book",
      action: (book: Book) => handleViewBook(book),
    },
    {
      name: "Start Reading",
      action: (book: Book) => moveBook(book),
    },
  ];
  const currentlyReadingActions: Action[] = [
    {
      name: "View Book",
      action: (book: Book) => handleViewBook(book),
    },
    {
      name: "Finished Reading",
      action: (book: Book) => moveBook(book),
    },
  ];
  const readActions: Action[] = [
    {
      name: "View Book",
      action: (book: Book) => handleViewBook(book),
    },
  ];

  // Creates catagorized books
  const wishlistBooks = books.filter((book) => !book.bought);
  const boughtBooks = books.filter(
    (book) => book.bought && !book.reading && !book.read
  );
  const currentlyReadingBooks = books.filter((book) => book.reading);
  const readBooks = books.filter((book) => book.read);

  // Create Book Form
  const handleCreateBook = () => {
    console.log("Create Book");
  };

  return (
    <>
      <div className="title_block">
        <h1 className="title">{title}</h1>
      </div>
      {viewingBook.title ? (
        <>
          <Button onClick={() => handleSwitchToLibrary()}>Back</Button>
          <BookView book={viewingBook} refresh={refreshList} />
        </>
      ) : (
        <div className="library-main">
          <BookGroup
            button=<Button color="secondary" onClick={handleCreateBook}>
              Add Book
            </Button>
            books={wishlistBooks}
            actions={wishlistActions}
            onDoubleClick={handleViewBook}
          >
            Wishlist
          </BookGroup>
          <BookGroup
            onDoubleClick={handleViewBook}
            books={boughtBooks}
            actions={boughtActions}
          >
            Bought
          </BookGroup>
          <BookGroup
            onDoubleClick={handleViewBook}
            books={currentlyReadingBooks}
            actions={currentlyReadingActions}
          >
            Currently Reading
          </BookGroup>
          <BookGroup
            onDoubleClick={handleViewBook}
            books={readBooks}
            actions={readActions}
          >
            Read
          </BookGroup>
        </div>
      )}
    </>
  );
}

export default Library;

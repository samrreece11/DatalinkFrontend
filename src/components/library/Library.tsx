import { useEffect, useState } from "react";
import { Book, Action } from "./libraryTypes";
import BookGroup from "./BookGroup";
import api from "../../types/api";
import SearchBox from "../utils/SearchBox";
import { useNavigate } from "react-router-dom";
import BoxComponent from "../structure/BoxComponent";
import { Button } from "reactstrap";

// Define the type for the items

function Library() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchBooks, setSearchBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const navigate = useNavigate();

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
      console.log("Books fetched");
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleViewBook = (book: Book) => {
    navigate(`/book/${book.title.replace(/\s+/g, "")}`, { state: { book } });
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

  useEffect(() => {
    if (search) {
      setSearchBooks(
        books.filter(
          (book) =>
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (!search) {
      setSearchBooks([]);
    }
  }, [search]);

  return (
    <BoxComponent title="Library" titleSize={1}>
      <div className="search-bar">
        {isSearching ? (
          <SearchBox
            search={search}
            setSearch={setSearch}
            onBlur={() => setIsSearching(false)}
          />
        ) : (
          <Button
            color="secondary"
            className="search-btn mx-1"
            onClick={() => setIsSearching(true)}
          >
            Search Books
          </Button>
        )}
      </div>
      <div className="main">
        {search ? (
          <div className="search-results">
            <BookGroup
              onDoubleClick={handleViewBook}
              books={searchBooks}
              actions={readActions}
            >
              Search Results:
            </BookGroup>
          </div>
        ) : (
          <div className="library-main">
            <BookGroup
              onDoubleClick={handleViewBook}
              books={wishlistBooks}
              actions={wishlistActions}
              refresh={refreshList}
            >
              Wishlist
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
              books={boughtBooks}
              actions={boughtActions}
            >
              Bought
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
      </div>
    </BoxComponent>
  );
}

export default Library;

import { useEffect, useState } from "react";
import { Book, Action } from "./libraryTypes";

import BookGroup from "./BookGroup";
import EditBookModal from "./BookModal";
import api from "../../types/api";
import Button from "../Button";
import CreateBookModal from "./BookCreateModal";
import CreateQuoteModal from "./CreateQuoteModal";
import ViewQuoteModal from "./ViewQuoteModal";
import BookReflectModal from "./ReflectModal";

// Define the type for the items

function Library() {
  const [books, setBooks] = useState<Book[]>([]);

  // Modal Handling
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isCreateQuoteModalOpen, setIsCreateQuoteModalOpen] =
    useState<boolean>(false);
  const [isReflectModalOpen, setIsReflectModalOpen] = useState<boolean>(false);
  const [IsViewQuoteModalOpen, setIsViewQuoteModalOpen] =
    useState<boolean>(false);
  const [bookForQuoteModal, setBookForQuoteModal] = useState<Book>({} as Book);
  const [initialData, setInitialData] = useState<Book>({} as Book);

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

  // Update db. Only takes in Title and Author
  const createBook = async (bookData: { title: string; author: string }) => {
    try {
      await api.post("/books/", bookData);
      refreshList();
    } catch (error) {
      console.error("Error creating book:", error);
      // Handle error (e.g., show notification to user)
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

  const createQuote = async (quoteData: {
    pageNum: number;
    contents: string;
    book: number;
  }) => {
    try {
      await api.post("/quotes/", quoteData);
      refreshList();
    } catch (error) {
      // Handle error (e.g., show notification to user)
    }
  };

  // API request to list of books
  const refreshList = () => {
    api.get("/books/").then((res) => setBooks(res.data));
  };

  const handleDeleteBook = (book: Book) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      api
        .delete(`/books/${book.id}/`)
        .then(() => refreshList())
        .catch((error) => {
          console.error("There was an error deleting the book!", error);
        });
    }
  };

  // Open Edit Book Modal
  const handleOpenEditBookModal = (book: Book) => {
    // Sets the initial data that is passed into EditBookModal
    setInitialData(book);

    // Opens the Edit Book Modal
    setIsEditModalOpen(true);
  };

  // Create Book
  const handleOpenCreateBook = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateQuoteModal = (book: Book) => {
    setBookForQuoteModal(book);
    setIsCreateQuoteModalOpen(true);
  };

  const handleViewQuotes = (book: Book) => {
    setBookForQuoteModal(book);
    setIsViewQuoteModalOpen(true);
  };

  const handleViewReflection = (book: Book) => {
    setBookForQuoteModal(book);
    setIsReflectModalOpen(true);
  };

  // Actions for each respective drop down.
  const wishlistActions: Action[] = [
    {
      name: "Edit",
      action: (book: Book) => handleOpenEditBookModal(book),
    },
    {
      name: "Bought",
      action: (book: Book) => moveBook(book),
    },
  ];
  const boughtActions: Action[] = [
    {
      name: "Edit",
      action: (book: Book) => handleOpenEditBookModal(book),
    },
    {
      name: "Start Reading",
      action: (book: Book) => moveBook(book),
    },
  ];
  const currentlyReadingActions: Action[] = [
    {
      name: "Edit",
      action: (book: Book) => handleOpenEditBookModal(book),
    },
    {
      name: "Finished Reading",
      action: (book: Book) => moveBook(book),
    },
    {
      name: "View Quotes",
      action: (book: Book) => handleViewQuotes(book),
    },
    {
      name: "Edit Reflection",
      action: (book: Book) => handleViewReflection(book),
    },
  ];
  const readActions: Action[] = [
    {
      name: "Edit",
      action: (book: Book) => handleOpenEditBookModal(book),
    },
    {
      name: "View Quotes",
      action: (book: Book) => handleViewQuotes(book),
    },
    {
      name: "Edit Reflection",
      action: (book: Book) => handleViewReflection(book),
    },
  ];

  // Creates catagorized books
  const wishlistBooks = books.filter((book) => !book.bought);
  const boughtBooks = books.filter(
    (book) => book.bought && !book.reading && !book.read
  );
  const currentlyReadingBooks = books.filter((book) => book.reading);
  const readBooks = books.filter((book) => book.read);

  return (
    <>
      <div className="title_block">
        <h1 className="title">Library</h1>
      </div>
      <div className="library-main">
        <BookGroup
          button=<Button color="secondary" onClick={handleOpenCreateBook}>
            Add Book
          </Button>
          books={wishlistBooks}
          actions={wishlistActions}
          onDoubleClick={handleOpenEditBookModal}
        >
          Wishlist
        </BookGroup>
        <BookGroup
          onDoubleClick={handleOpenEditBookModal}
          books={boughtBooks}
          actions={boughtActions}
        >
          Bought
        </BookGroup>
        <BookGroup
          onDoubleClick={handleOpenEditBookModal}
          books={currentlyReadingBooks}
          actions={currentlyReadingActions}
        >
          Currently Reading
        </BookGroup>
        <BookGroup
          onDoubleClick={handleOpenEditBookModal}
          books={readBooks}
          actions={readActions}
        >
          Read
        </BookGroup>
      </div>
      <div className="modal-container">
        {isEditModalOpen && (
          <EditBookModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            editBook={initialData}
            onSave={updateBook}
            onDelete={handleDeleteBook}
          />
        )}
        {isCreateModalOpen && (
          <CreateBookModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onCreate={createBook}
          />
        )}
        {isCreateQuoteModalOpen && (
          <CreateQuoteModal
            book={bookForQuoteModal}
            isOpen={isCreateQuoteModalOpen}
            onClose={() => setIsCreateQuoteModalOpen(false)}
            onCreate={createQuote}
          />
        )}
        {IsViewQuoteModalOpen && (
          <ViewQuoteModal
            refresh={refreshList}
            book={bookForQuoteModal}
            isOpen={IsViewQuoteModalOpen}
            onClose={() => setIsViewQuoteModalOpen(false)}
            createQuote={handleCreateQuoteModal}
          />
        )}
        {isReflectModalOpen && (
          <BookReflectModal
            book={bookForQuoteModal}
            isOpen={isReflectModalOpen}
            onClose={() => {
              setIsReflectModalOpen(false);
              refreshList();
            }}
          />
        )}
      </div>
    </>
  );
}

export default Library;

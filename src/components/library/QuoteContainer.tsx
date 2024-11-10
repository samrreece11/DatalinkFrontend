import { Book, Quote } from "./libraryTypes";
import api from "../../types/api";
import EditableQuote from "./EditableQuote";

interface QuoteProps {
  quote: Quote;
  book: Book;
  refresh: () => void;
}
const QuoteContainer = ({ quote, book, refresh }: QuoteProps) => {
  const handleEditQuote = async (quote: Quote) => {
    console.log("Editing Quote: ", quote);
    try {
      const response = await api.put(`/quotes/${quote.id}/`, quote);
      console.log("Quote Edited:", response.data);
      refresh();
    } catch (error) {
      console.error("Error creating quote:", error);
      // Handle error (e.g., show notification to user)
    }
  };
  const handleDeleteQuote = (quote: Quote) => {
    console.log("Deleting Quote", quote);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quote?"
    );
    if (confirmDelete) {
      api
        .delete(`/quotes/${quote.id}/`)
        .then(() => refresh())
        .catch((error) => {
          console.error("There was an error deleting the quote!", error);
        });
    }
  };
  return (
    <div className="quote-container">
      <EditableQuote
        book={book}
        quote={quote}
        handleSubmit={handleEditQuote}
        handleDeleteQuote={handleDeleteQuote}
      />
    </div>
  );
};

export default QuoteContainer;

import { useEffect, useState } from "react";
import { getQuotesByBook } from "./LibraryUtils";
import { Book, Quote } from "./libraryTypes";
import QuoteContainer from "./QuoteContainer";
import CreateQuoteForm from "./CreateQuoteForm";

interface Props {
  book: Book;
  refresh: () => void;
}
const QuoteView = ({ book, refresh }: Props) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isAddingQuote, setIsAddingQuote] = useState(false);
  const getQuotes = async () => {
    const quotes = await getQuotesByBook(book.id);
    quotes.sort((a, b) => a.pageNum - b.pageNum);
    setQuotes(quotes);
  };

  useEffect(() => {
    getQuotes();
  }, [refresh]);

  const handleAddQuote = () => {
    setIsAddingQuote(!isAddingQuote);
  };

  return (
    <>
      <div className="quote-group">
        <button onClick={handleAddQuote} className="add-quote-button">
          + Add Quote
        </button>
        {isAddingQuote ? (
          <CreateQuoteForm
            book={book}
            refresh={getQuotes}
            onClose={handleAddQuote}
          />
        ) : null}

        {quotes.map((quote, index) => (
          <QuoteContainer
            refresh={refresh}
            key={index}
            quote={quote}
            book={book}
          />
        ))}
      </div>
    </>
  );
};

export default QuoteView;

import { useEffect, useState } from "react";
import { Book, Quote } from "./libraryTypes";
import QuoteContainer from "./QuoteContainer";
import CreateQuoteForm from "./CreateQuoteForm";
import { getQuotesByBook } from "./LibraryUtils";

interface Props {
  book: Book;
  onSave: () => void;
}
const QuoteView = ({ book, onSave }: Props) => {
  const [isAddingQuote, setIsAddingQuote] = useState(false);

  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    getQuotesByBook(book.id).then((quotes) => setQuotes(quotes));
  }, [book]);

  const handleSave = () => {
    getQuotesByBook(book.id).then((quotes) => setQuotes(quotes));
    onSave();
  };

  const handleAddQuote = () => {
    setIsAddingQuote(!isAddingQuote);
  };

  return (
    <>
      <div className="quote-group">
        {isAddingQuote ? (
          <CreateQuoteForm
            book={book}
            refresh={handleSave}
            onClose={handleAddQuote}
          />
        ) : (
          <button onClick={handleAddQuote} className="add-quote-button">
            + Add Quote
          </button>
        )}

        {quotes.map((quote, index) => (
          <>
            <div className="divider"></div>
            <QuoteContainer
              refresh={handleSave}
              key={index}
              quote={quote}
              book={book}
            />
          </>
        ))}
      </div>
    </>
  );
};

export default QuoteView;

import { useState } from "react";
import { Book, Quote } from "./libraryTypes";
import QuoteContainer from "./QuoteContainer";
import CreateQuoteForm from "./CreateQuoteForm";

interface Props {
  book: Book;
  quotes: Quote[];
  refresh: () => void;
}
const QuoteView = ({ book, quotes, refresh }: Props) => {
  const [isAddingQuote, setIsAddingQuote] = useState(false);

  const handleAddQuote = () => {
    setIsAddingQuote(!isAddingQuote);
  };

  return (
    <>
      <div className="quote-group">
        {isAddingQuote ? (
          <CreateQuoteForm
            book={book}
            refresh={refresh}
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
              refresh={refresh}
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

import React, { useEffect, useState } from "react";
import {
  Button,
  Modal as BootstrapModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Book, Quote } from "./libraryTypes";
import QuoteContainer from "./QuoteContainer";
import { getQuotesByBook } from "./LibraryUtils";

interface ModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
  createQuote: (book: Book) => void;
  refresh: () => void;
}

const ViewQuoteModal: React.FC<ModalProps> = ({
  book,
  isOpen,
  onClose,
  createQuote,
  refresh,
}) => {
  const getQuotes = async () => {
    setQuotes(await getQuotesByBook(book.id));
  };
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    getQuotes();
  }, [isOpen]);

  return (
    <BootstrapModal
      className="reflect-modal"
      scrollable={true}
      fullscreen={true}
      isOpen={isOpen}
      toggle={onClose}
      id="quote-modal"
    >
      <ModalHeader toggle={onClose}>
        Quotes for <i>{book.title}</i> by {book.author}:
      </ModalHeader>
      <ModalBody>
        {/* Consider making into a componenet */}
        <div className="quote-group">
          {quotes.map((quote, index) => (
            <QuoteContainer
              refresh={refresh}
              key={index}
              quote={quote}
              book={book}
            />
          ))}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => createQuote(book)}>
          Add Quote
        </Button>{" "}
        <Button color="secondary" onClick={onClose}>
          Close
        </Button>{" "}
      </ModalFooter>
    </BootstrapModal>
  );
};

export default ViewQuoteModal;

import React from "react";
import {
  Button,
  Modal as BootstrapModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Book, Quote } from "./libraryTypes";
import QuoteContainer from "./QuoteContainer";

interface ModalProps {
  book: Book;
  quotes: Quote[];
  isOpen: boolean;
  onClose: () => void;
  createQuote: (book: Book) => void;
  refresh: () => void;
}

const ViewQuoteModal: React.FC<ModalProps> = ({
  book,
  quotes,
  isOpen,
  onClose,
  createQuote,
  refresh,
}) => {
  const handleDoubleClick = () => {
    console.log("Double Click");
  };

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
        <h1>
          Quotes for <i>{book.title}</i> by {book.author}:
        </h1>
      </ModalHeader>
      <ModalBody>
        {/* Consider making into a componenet */}
        <div onDoubleClick={handleDoubleClick} className="quote-group">
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

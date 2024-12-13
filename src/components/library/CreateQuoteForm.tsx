import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input } from "reactstrap";
import { Book } from "./libraryTypes";
import api from "../../types/api";

interface Props {
  book: Book;
  refresh: () => void;
  onClose: () => void;
}
const CreateQuoteForm = ({ book, refresh, onClose }: Props) => {
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<{
    pageNum: number;
    contents: string;
    book: number;
  }>({
    pageNum: 0,
    contents: "",
    book: book.id,
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setFormData({
      pageNum: 0,
      contents: "",
      book: book.id,
    });
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createQuote(formData);
    refresh();
    onClose();
  };

  const createQuote = async (quoteData: {
    pageNum: number;
    contents: string;
    book: number;
  }) => {
    try {
      await api.post(`/quotes/`, quoteData);
      refresh();
    } catch (error) {
      console.error("Error creating quote:", error);
      // Handle error (e.g., show a notification)
    }
  };

  return (
    <div className="create-quote-form" ref={formRef}>
      <Form onSubmit={handleSubmit} className="quote-form">
        <div className="quote-content-input">
          {/* <Label for="contents">Quote:</Label> */}
          <Input
            type="textarea"
            rows="1"
            id="contents"
            name="contents"
            placeholder="Enter Quote"
            onChange={handleChange}
            autoFocus
            required
          />
        </div>
        <div className="page-number-input">
          <Input
            type="number"
            id="pageNum"
            name="pageNum"
            placeholder="Page Number"
            onChange={handleChange}
            required
          />
        </div>
        <Button className="quote-form-btn" color="success" type="submit">
          Create
        </Button>
        <Button className="quote-form-btn" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default CreateQuoteForm;

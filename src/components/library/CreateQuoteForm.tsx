import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Book } from "./libraryTypes";
import api from "../../types/api";

interface Props {
  book: Book;
  refresh: () => void;
  onClose: () => void;
}
const CreateQuoteForm = ({ book, refresh, onClose }: Props) => {
  const [formData, setFormData] = useState<{
    pageNum: number;
    contents: string;
    book: number;
  }>({
    pageNum: 0,
    contents: "",
    book: book.id,
  });

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
    <div className="create-quote-form">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="pageNum">Page Number</Label>
          <Input
            type="number"
            id="pageNum"
            name="pageNum"
            placeholder="Enter Page Number"
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="contents">Quote:</Label>
          <Input
            type="textarea"
            id="contents"
            name="contents"
            placeholder="Enter Quote"
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button color="success" type="submit">
          Create
        </Button>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default CreateQuoteForm;

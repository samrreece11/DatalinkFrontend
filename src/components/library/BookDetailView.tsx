import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Book } from "./libraryTypes";
import api from "../../types/api";

interface Props {
  book: Book;
  refresh: () => void;
}
const BookDetailView = ({ book, refresh }: Props) => {
  const [formData, setFormData] = useState<Book>(book);

  // Update formData when the modal opens or book changes
  useEffect(() => {
    setFormData(book);
  }, [book]);

  const updateBook = async (book: Book) => {
    try {
      await api.put(`/books/${book.id}/`, formData);
      refresh();
    } catch (error) {
      console.error("Error updating book:", error);
      // Handle error (e.g., show a notification)
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    const newValue =
      type === "checkbox" ? checked : type === "date" ? new Date(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting Form");
    updateBook(formData);
  };

  // Handle deletion
  const handleDelete = () => {
    handleDeleteBook(formData);
  };

  const handleDeleteBook = (book: Book) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      api
        .delete(`/books/${book.id}/`)
        .then(() => refresh())
        .catch((error) => {
          console.error("There was an error deleting the book!", error);
        });
    }
  };

  return (
    <>
      <div className="book-detail-form">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              placeholder="Enter Title"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="author">Author</Label>
            <Input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              placeholder="Enter author"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="pageNumbers">Number of Pages</Label>
            <Input
              type="text"
              id="pageNumbers"
              name="pageNumbers"
              value={formData.pageNumbers || ""}
              placeholder="Enter Number of Pages"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="bought">Bought</Label>
            <Input
              type="checkbox"
              id="bought"
              name="bought"
              checked={formData.bought}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="reading">Reading</Label>
            <Input
              type="checkbox"
              id="reading"
              name="reading"
              checked={formData.reading}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="read">Read</Label>
            <Input
              type="checkbox"
              id="read"
              name="read"
              checked={formData.read}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="startDate">Start Date</Label>
            <Input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate ? formData.startDate : ""}
              placeholder="Enter startDate"
              onChange={(e) => {
                const selectedDate = new Date(e.target.value); // Convert string back to Date
                setFormData((prevData) => ({
                  ...prevData,
                  startDate: selectedDate.toISOString().slice(0, 10), // Update the state with the Date object
                }));
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="endDate">End Date</Label>
            <Input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate ? formData.endDate : ""}
              placeholder="Enter endDate"
              onChange={(e) => {
                const selectedDate = new Date(e.target.value); // Convert string back to Date
                setFormData((prevData) => ({
                  ...prevData,
                  endDate: selectedDate.toISOString().slice(0, 10), // Update the state with the Date object
                }));
              }}
            />
          </FormGroup>
          <Button color="success" type="submit">
            Save
          </Button>
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Form>
      </div>
    </>
  );
};

export default BookDetailView;

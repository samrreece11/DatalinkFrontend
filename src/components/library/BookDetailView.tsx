import React, { useState, useEffect } from "react";
import { Button, Form, Input, Label } from "reactstrap";
import { Book } from "./libraryTypes";
import api from "../../types/api";

interface Props {
  book: Book;
  onSave: () => void;
}
const BookDetailView = ({ book, onSave }: Props) => {
  const [formData, setFormData] = useState<Book>(book);

  // Update formData when the modal opens or book changes
  useEffect(() => {
    setFormData(book);
  }, [book]);

  const updateBook = async (book: Book) => {
    try {
      await api.put(`/books/${book.id}/`, formData);
      onSave();
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
        .then(() => onSave())
        .catch((error) => {
          console.error("There was an error deleting the book!", error);
        });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="book-detail-form">
          <div className="book-detail-group">
            <Label for="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              placeholder="Enter Title"
              onChange={handleChange}
            />
          </div>
          <div className="book-detail-group">
            <Label for="author">Author</Label>
            <Input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              placeholder="Enter author"
              onChange={handleChange}
            />
          </div>
          <div className="book-detail-group">
            <Label for="pageNumbers">Number of Pages</Label>
            <Input
              type="text"
              id="pageNumbers"
              name="pageNumbers"
              value={formData.pageNumbers || ""}
              placeholder="Enter Number of Pages"
              onChange={handleChange}
            />
          </div>
          <div className="book-detail-group">
            <div className="checkbox-group">
              <Label for="bought" className="checkbox-label">
                Bought
              </Label>
              <Input
                type="checkbox"
                id="bought"
                name="bought"
                checked={formData.bought}
                onChange={handleChange}
              />
            </div>
            <div className="checkbox-group">
              <Label for="reading" className="checkbox-label">
                Reading
              </Label>
              <Input
                type="checkbox"
                id="reading"
                name="reading"
                checked={formData.reading}
                onChange={handleChange}
              />
            </div>
            <div className="checkbox-group">
              <Label for="read" className="checkbox-label">
                Read
              </Label>
              <Input
                type="checkbox"
                id="read"
                name="read"
                checked={formData.read}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="book-detail-group">
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
          </div>
        </div>
        <Button
          size="lg"
          color="success"
          type="submit"
          className="detail-form-btn"
        >
          Save
        </Button>
        <Button
          size="lg"
          color="danger"
          onClick={handleDelete}
          className="detail-form-btn"
        >
          Delete
        </Button>
      </Form>
    </>
  );
};

export default BookDetailView;

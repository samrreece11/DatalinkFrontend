import React, { useState, useEffect } from "react";
import {
  Button,
  Modal as BootstrapModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Book } from "./libraryTypes";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  editBook: Book;
  onSave: (book: Book) => void;
  onDelete: (book: Book) => void;
}

const EditBookModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  editBook,
  onSave,
  onDelete,
}) => {
  const [formData, setFormData] = useState<Book>(editBook);

  // Update formData when the modal opens or editBook changes
  useEffect(() => {
    setFormData(editBook);
  }, [isOpen, editBook]);

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
    onSave(formData);
    onClose();
  };

  // Handle deletion
  const handleDelete = () => {
    onDelete(formData);
    onClose();
  };

  // If the modal isn't open, return null
  if (!isOpen) return null;

  return (
    <BootstrapModal scrollable={true} isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>Edit Book</ModalHeader>
      <ModalBody>
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
          <ModalFooter>
            <Button color="success" type="submit">
              Save
            </Button>
            <Button color="danger" onClick={handleDelete}>
              Delete Book
            </Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </BootstrapModal>
  );
};

export default EditBookModal;

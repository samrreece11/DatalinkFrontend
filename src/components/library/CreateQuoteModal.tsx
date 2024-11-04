import React, { useEffect, useState } from "react";
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
  book: Book;
  isOpen: boolean;
  onClose: () => void;
  onCreate: (quoteData: {
    pageNum: number;
    contents: string;
    book: number;
  }) => void;
}

const CreateQuoteModal: React.FC<ModalProps> = ({
  book,
  isOpen,
  onClose,
  onCreate,
}) => {
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
    onCreate(formData);
    onClose(); // Close the modal after creating
  };

  if (!isOpen) return null;
  return (
    <BootstrapModal size="lg" isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>Create Quote For {book.title}</ModalHeader>
      <ModalBody>
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
          <ModalFooter>
            <Button color="success" type="submit">
              Create
            </Button>
            <Button color="secondary" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </BootstrapModal>
  );
};

export default CreateQuoteModal;

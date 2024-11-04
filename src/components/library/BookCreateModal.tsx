import React, { useCallback, useState } from "react";
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

interface CreateBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: { title: string; author: string }) => void;
}

const CreateBookModal: React.FC<CreateBookModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [formData, setFormData] = useState<{
    title: string;
    author: string;
    pageNumbers: number | null;
  }>({
    title: "",
    author: "",
    pageNumbers: null,
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose(); // Close the modal after creating
  };

  if (!isOpen) return null;
  return (
    <BootstrapModal isOpen={isOpen} toggle={onClose}>
      <ModalHeader toggle={onClose}>Create Book</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Enter Title"
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="author">Author</Label>
            <Input
              type="text"
              id="author"
              name="author"
              placeholder="Enter Author"
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="pageNumber">Page Number</Label>
            <Input
              type="number"
              id="pageNumber"
              name="pageNumber"
              placeholder="Enter Page Number(Optional)"
              onChange={handleChange}
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

export default CreateBookModal;

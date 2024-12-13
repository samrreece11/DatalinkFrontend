import { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Label } from "reactstrap";
import api from "../../types/api";

interface Props {
  refresh: () => void;
  handleClose: () => void;
}
const CreateBookForm = ({ refresh, handleClose }: Props) => {
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<{ title: string; author: string }>({
    title: "",
    author: "",
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting Form", formData);
    try {
      await api.post("/books/", formData);
      refresh();
      handleClose();
    } catch (error) {
      console.error("There was an error creating the book!", error);
    }
  };

  return (
    // Title, author, optional page numbers
    <div className="book-create-form" ref={formRef}>
      <Form onSubmit={handleSubmit}>
        <div className="book-create-form-group">
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
        <div className="book-create-form-group">
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
        <Button color="success" type="submit">
          Create Book
        </Button>
      </Form>
    </div>
  );
};
export default CreateBookForm;

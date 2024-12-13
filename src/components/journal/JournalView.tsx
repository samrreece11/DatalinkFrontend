import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";

import "ckeditor5/ckeditor5.css";
import api from "../../types/api";
import { Journal } from "./journalTypes";
import CKEditorBox from "../utils/CKEditorBox";

interface ModalProps {
  journal: Journal;
  onClose: () => void;
}

const JournalModal: React.FC<ModalProps> = ({ journal, onClose }) => {
  const [dropdown, setDropdown] = useState(false);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (journal.title == "Specific Reflection") {
      setTitle("");
    } else {
      setTitle(journal.title);
    }
  }, [journal]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this journal?")) {
      return;
    }
    try {
      const response = await api.delete(`/reflections/${journal.id}/`);
      console.log("Delete successful:", response.data);
      onClose();
    } catch (error) {
      console.error("Error deleting book:", error);
      // Handle error (e.g., show a notification)
    }
  };

  const handleSave = async (data: string) => {
    if (journal.isSpecific) {
      await api.patch(`/reflections/${journal.id}/`, {
        title: title,
        content: data,
      });
    } else {
      await api.patch(`/reflections/${journal.id}/`, {
        content: data,
      });
    }
    onClose();
  };

  return (
    <div className="journal-view">
      <div className="title_block">
        <h1 onClick={() => setDropdown(!dropdown)} className="title">
          {journal.title} {!journal.isSpecific && `for ${journal.date}`}{" "}
        </h1>
        {dropdown && (
          <Button
            color="danger"
            className="title-btn"
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        )}
      </div>
      <div className="reflection-container">
        <Form>
          {journal.isSpecific && (
            <div className="reflection-title-field">
              <label>Title</label>
              <Input
                type="text"
                required
                className="journal-title-form"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
          )}
          <FormGroup>
            <CKEditorBox input={journal.content} handleSave={handleSave} />
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default JournalModal;

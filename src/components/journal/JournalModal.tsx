import React, { useEffect, useState } from "react";
import {
  Button,
  Modal as BootstrapModal,
  ModalHeader,
  ModalBody,
  Form,
} from "reactstrap";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  AccessibilityHelp,
  Autoformat,
  AutoImage,
  Autosave,
  BlockQuote,
  Bold,
  CloudServices,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Paragraph,
  SelectAll,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import api from "../../types/api";
import { Journal } from "./journalTypes";

interface ModalProps {
  journal: Journal;
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
}

const JournalModal: React.FC<ModalProps> = ({
  journal,
  isOpen,
  onClose,
  refresh,
}) => {
  const [content, setContent] = useState<string>(journal.content);
  useEffect(() => {
    setContent(journal.content);
  }, [journal]);

  const editorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "heading",
        "|",
        "fontSize",
        "fontFamily",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "link",
        "insertTable",
        "blockQuote",
        "|",
        "bulletedList",
        "numberedList",
        "todoList",
        "outdent",
        "indent",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Autoformat,
      AutoImage,
      Autosave,
      BlockQuote,
      Bold,
      CloudServices,
      Essentials,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      Heading,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Paragraph,
      SelectAll,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
      Undo,
    ],
    fontFamily: {
      supportAllValues: true,
    },
    fontSize: {
      options: [10, 12, 14, "default", 18, 20, 22],
      supportAllValues: true,
    },
    image: {
      toolbar: [
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
      ],
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
      ],
    },
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await api.patch(`/journals/${journal.id}/`, {
        content: content,
      });
      console.log("Update successful:", response.data);
      refresh();
      onClose();
    } catch (error) {
      console.error("Error updating book:", error);
      // Handle error (e.g., show a notification)
    }
  };

  if (!isOpen) return null;
  return (
    <BootstrapModal
      className="reflect-modal"
      scrollable={true}
      fullscreen={true}
      isOpen={isOpen}
      toggle={onClose}
    >
      <ModalHeader toggle={onClose}>
        <h1>Journal for {journal.date}</h1>
      </ModalHeader>
      <ModalBody>
        <div className="reflection-container">
          <div className="reflection">
            <Form>
              <CKEditor
                editor={ClassicEditor}
                config={editorConfig}
                data={journal.content}
                onChange={(_event, editor) => {
                  const data = editor.getData();
                  setContent(data);
                  console.log(content);
                }}
              />
            </Form>
          </div>
        </div>
        <Button
          type="submit"
          color="success"
          size="lg"
          className="save-btn"
          onClick={(event) => handleSubmit(event)}
        >
          Save
        </Button>
      </ModalBody>
    </BootstrapModal>
  );
};

export default JournalModal;

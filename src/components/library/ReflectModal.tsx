import React, { useEffect, useState } from "react";
import {
  Button,
  Modal as BootstrapModal,
  ModalHeader,
  ModalBody,
  Form,
} from "reactstrap";
import { Book } from "./libraryTypes";

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

interface ModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}

const BookReflectModal: React.FC<ModalProps> = ({ book, isOpen, onClose }) => {
  const [content, setContent] = useState<string>(book.reflection);

  useEffect(() => {
    setContent(book.reflection);
  }, [book]);

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
      const response = await api.patch(`/books/${book.id}/`, {
        reflection: content,
      });
      console.log("Update successful:", response.data);
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
        <h1>Reflection for {book.title}</h1>
      </ModalHeader>
      <ModalBody>
        <div className="reflection-container">
          <div className="reflection">
            <Form>
              <CKEditor
                editor={ClassicEditor}
                config={editorConfig}
                data={book.reflection}
                onChange={(_event, editor) => {
                  const data = editor.getData();
                  setContent(data);
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

export default BookReflectModal;

import { Book } from "./libraryTypes";
import CKEditorBox from "../utils/CKEditorBox";
import api from "../../types/api";

interface Props {
  book: Book;
  onSave: () => void;
}

const ReflectionView = ({ book, onSave }: Props) => {
  const handleSave = async (data: string) => {
    await api.patch(`/books/${book.id}/`, {
      reflection: data,
    });
    onSave();
  };

  return (
    <div className="book-reflection">
      <CKEditorBox input={book.reflection} handleSave={handleSave} />
    </div>
  );
};

export default ReflectionView;

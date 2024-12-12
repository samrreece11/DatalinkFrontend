import { Book } from "./libraryTypes";
import CKEditorBox from "../utils/CKEditorBox";
import api from "../../types/api";

interface Props {
  book: Book;
  refresh: () => void;
}

const ReflectionView = ({ book, refresh }: Props) => {
  const handleSave = async (data: string) => {
    const res = await api.patch(`/books/${book.id}/`, {
      reflection: data,
    });
    refresh();
    console.log(res);
  };

  return (
    <div className="book-reflection">
      <CKEditorBox input={book.reflection} handleSave={handleSave} />
    </div>
  );
};

export default ReflectionView;

export interface Book {
    id: number;
    title: string;
    author: string;
    pageNumbers: number;
    bought: boolean;
    reading: boolean;
    read: boolean;
    reflection: string;
    startDate: string;
    endDate: string;
  }

export interface Quote {
  id: number;
  pageNum: number;
  contents: string;
  book: number;
}

export interface Action {
    name: string;
    action: (book: Book) => void;
}

export interface BookFieldType {
  id: string;
  type: keyof Book;
}


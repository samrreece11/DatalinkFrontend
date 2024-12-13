import { Book, Quote } from "./libraryTypes";
import ReflectionView from "./ReflectionContainer";
import QuoteView from "./QuoteView";
import BookDetailView from "./BookDetailView";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useEffect, useState } from "react";
import { getQuotesByBook } from "./LibraryUtils";

interface Props {
  book: Book;
  refresh: () => void;
}
const BookView = ({ book, refresh }: Props) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const getQuotes = async () => {
    const quotes = await getQuotesByBook(book.id);
    quotes.sort((a, b) => a.pageNum - b.pageNum);
    setQuotes(quotes);
  };

  useEffect(() => {
    getQuotes();
  }, [book]);

  return (
    <div className="book-view">
      <TabGroup>
        <TabList className="tab-list">
          <Tab
            className={({ selected }) => (selected ? "selected-tab" : "tab")}
          >
            Reflection
          </Tab>
          <Tab
            className={({ selected }) => (selected ? "selected-tab" : "tab")}
          >
            Quotes
          </Tab>
          <Tab
            className={({ selected }) => (selected ? "selected-tab" : "tab")}
          >
            Details
          </Tab>
        </TabList>
        <TabPanels className="tab-panel">
          <TabPanel>
            <ReflectionView book={book} refresh={refresh} />
          </TabPanel>
          <TabPanel>
            <QuoteView book={book} quotes={quotes} refresh={getQuotes} />
          </TabPanel>
          <TabPanel>
            <BookDetailView book={book} refresh={refresh} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default BookView;

import { Book } from "./libraryTypes";
import ReflectionView from "./ReflectionContainer";
import QuoteView from "./QuoteView";
import BookDetailView from "./BookDetailView";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

interface Props {
  book: Book;
  refresh: () => void;
}
const BookView = ({ book, refresh }: Props) => {
  return (
    <div className="book-view">
      <TabGroup>
        <TabList>
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
        <TabPanels>
          <TabPanel>
            <ReflectionView book={book} refresh={refresh} />
          </TabPanel>
          <TabPanel>
            <QuoteView book={book} refresh={refresh} />
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

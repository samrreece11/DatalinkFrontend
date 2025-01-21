import { useLocation } from "react-router-dom";
import BoxComponent from "../structure/BoxComponent";
import { Book } from "./libraryTypes";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import ReflectionView from "./ReflectionContainer";
import QuoteView from "./QuoteView";
import BookDetailView from "./BookDetailView";

// Takes book ID from URL and displays book information on site.

const BookViewTest = () => {
  const location = useLocation();
  const book = location.state?.book || ({} as Book);

  const handleSave = () => {
    console.log("Saved");
  };

  if (!book.title) {
    return (
      <BoxComponent title="Book View Test" titleSize={1}>
        No book found...
      </BoxComponent>
    );
  }

  return (
    <BoxComponent
      title={`${book.title} by ${book.author}`}
      titleSize={1}
      backButton={true}
    >
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
            <ReflectionView book={book} onSave={handleSave} />
          </TabPanel>
          <TabPanel>
            <QuoteView book={book} onSave={handleSave} />
          </TabPanel>
          <TabPanel>
            <BookDetailView book={book} onSave={handleSave} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </BoxComponent>
  );
};

export default BookViewTest;

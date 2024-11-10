import { useEffect, useState } from "react";
import { DailyQuote } from "./HomeTypes";
import api from "../../types/api";
import { Book, Quote } from "../library/libraryTypes";

const DailyQuoteDisplay = () => {
  const [dailyQuotes, setDailyQuotes] = useState<DailyQuote[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [currentDailyQuote, setCurrentDailyQuote] = useState<Quote>({
    id: -1,
    contents: "",
    pageNum: -1,
    book: -1,
  });

  useEffect(() => {
    refreshList();
  }, []); // Only runs on first render

  useEffect(() => {
    getOrCreateDailyQuote();
  }); // Runs on every render

  const refreshList = () => {
    api
      .get("/dailyquotes/")
      .then((response) => {
        setDailyQuotes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    api.get("/quotes/").then((response) => {
      setQuotes(response.data);
    });
    api.get("/books/").then((response) => {
      setBooks(response.data);
    });
  };

  const getOrCreateDailyQuote = async () => {
    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "America/New_York",
    });
    const currentDailyQuote = dailyQuotes.find(
      (dailyQuote) => dailyQuote.date === today
    );
    if (currentDailyQuote) {
      setCurrentDailyQuote(IdToQuote(currentDailyQuote.quote));
    } else {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      const response = await api.post("/dailyquotes/", {
        quote: randomQuote.id,
        date: today,
      });
      setCurrentDailyQuote(IdToQuote(response.data.quote));
    }
  };

  const IdToQuote = (id: number): Quote => {
    const quote = quotes.find((quote) => quote.id === id);
    if (quote) {
      return quote;
    }
    return { id: -1, contents: "", pageNum: -1, book: -1 };
  };

  const IdToBook = (id: number): Book => {
    const book = books.find((book) => book.id === id);
    if (book) {
      return book;
    }
    return {
      id: -1,
      title: "",
      author: "",
      pageNumbers: 0,
      bought: false,
      reading: false,
      read: false,
      reflection: "",
      startDate: "",
      endDate: "",
    };
  };

  return (
    <>
      <div className="daily-quote">
        <div className="title_block">
          <h3 className="title">Daily Quote</h3>
        </div>

        {currentDailyQuote && (
          <div>
            "{currentDailyQuote.contents}" - By{" "}
            <i>{IdToBook(currentDailyQuote.book).author}</i>,{" "}
            {IdToBook(currentDailyQuote.book).title}{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default DailyQuoteDisplay;

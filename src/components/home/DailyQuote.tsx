import { useEffect, useState } from "react";
import { Quote } from "../library/libraryTypes";
import api from "../../types/api";

const DailyQuoteDisplay = () => {
  // State of current daily quote
  const [currentDailyQuote, setCurrentDailyQuote] = useState<Quote>(
    {} as Quote
  );

  // Makes an API call to the backend to get the daily quote
  const getOrCreateDailyQuote = async () => {
    // String date format: "YYYY-MM-DD"
    try {
      const res = await api.get("/dailyquotes/get-or-create/");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Function to get the daily quote
  const getDailyQuote = async () => {
    setCurrentDailyQuote(await getOrCreateDailyQuote());
  };

  // Fetches the daily quote on component mount
  useEffect(() => {
    getDailyQuote();
  }, []); // Only runs on first render

  return (
    <>
      <div className="daily-quote">
        <div className="title_block">
          <h3 className="title">Daily Quote</h3>
        </div>

        {currentDailyQuote.contents ? (
          <div>
            "{currentDailyQuote.contents}" - By{" "}
            <i>{currentDailyQuote.book.author}</i>,{" "}
            {currentDailyQuote.book.title}{" "}
          </div>
        ) : (
          <div>
            No Quotes yet. Add some quotes to your books to get started!
          </div>
        )}
      </div>
    </>
  );
};

export default DailyQuoteDisplay;

import BoxComponent from "../structure/BoxComponent";
import CurrentlyReadingBooks from "./CurrentlyReadingBooks";
import DailyQuoteDisplay from "./DailyQuote";
import DailyVerseDisplay from "./DailyVerse";

const HomePage = () => {
  return (
    <BoxComponent title="Home Page" titleSize={1}>
      <div className="main">
        <DailyQuoteDisplay />
        <DailyVerseDisplay />
        <CurrentlyReadingBooks />
      </div>
    </BoxComponent>
  );
};

export default HomePage;

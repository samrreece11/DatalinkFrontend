import Title from "../utils/TitleBlock";
import DailyQuoteDisplay from "./DailyQuote";
import DailyVerseDisplay from "./DailyVerse";

const HomePage = () => {
  return (
    <>
      <Title size={1}>Home Page</Title>
      <div className="flex">
        <DailyQuoteDisplay />
        <DailyVerseDisplay />
        <div className="grey-box">Additional Features Coming Soon!</div>
      </div>
    </>
  );
};

export default HomePage;

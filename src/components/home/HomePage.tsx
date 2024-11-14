import Title from "../utils/TitleBlock";
import DailyQuoteDisplay from "./DailyQuote";

const HomePage = () => {
  return (
    <>
      <Title size={1}>Home Page</Title>
      <div className="flex">
        <DailyQuoteDisplay />
        <div className="grey-box">Additional Features Coming Soon!</div>
      </div>
    </>
  );
};

export default HomePage;

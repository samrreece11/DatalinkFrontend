import Title from "../utils/TitleBlock";
import DailyQuoteDisplay from "./DailyQuote";

const HomePage = () => {
  return (
    <>
      <Title size={1}>Home Page</Title>
      <DailyQuoteDisplay />
    </>
  );
};

export default HomePage;

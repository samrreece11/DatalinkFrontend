import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "./components/library/Library";
import "./App.css"; // Import your CSS file
import JournalHome from "./components/journal/JournalHome";
import HomePage from "./components/home/HomePage";
import NavigationBar from "./components/NavigationBar";
import TodoHome from "./components/todo/TodoHome";

function App() {
  return (
    <>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/library/" element={<Library />} />
          <Route path="/journal/" element={<JournalHome />} />
          <Route path="/todo/" element={<TodoHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

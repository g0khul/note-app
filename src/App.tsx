import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotePage from "./pages/NotePage";
import Navbar from "./components/NavBar";
import { NotesProvider } from "./context/NotesContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <NotesProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<NotePage />} />
            <Route path="/note/:id" element={<NotePage />} />
            <Route path="/edit/:id" element={<NotePage />} />
          </Routes>
        </BrowserRouter>
      </NotesProvider>
    </ThemeProvider>
  );
}

export default App;

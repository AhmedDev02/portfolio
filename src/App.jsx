import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Toast from "./ui/Toast.jsx";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Projects from "./pages/projects/Projects";
import LetsTalk from "./pages/about/LetsTalk";
import PageNotFound from "./pages/general/PageNotFound";
import AppLayout from "./pages/general/AppLayout";
import ThemeContextProvider from "./context/ThemeContextProvider";
import Verified from "./pages/contact/Verified.jsx";

function App() {
  return (
    <ThemeContextProvider>
      <Toast />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route index path="home" element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="verified" element={<Verified />} />
            <Route path="about" element={<LetsTalk />} />
            <Route path="projects" element={<Projects />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;

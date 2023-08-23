import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Skills from "./pages/Skills";
import Layout from "./components/layout";
import Experiences from "./pages/Experiences";
import Education from "./pages/Education";
import Messages from "./pages/Messages";
import Main from "./pages/Main";
import Contact from "./pages/Contact";
import About from "./pages/About";
import MyWorks from "./pages/Works";
import isAuth from "./states";

function App() {
  const { isAuthenticated } = isAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/main" /> : <Login />}
        />
        <Route path="/" element={<Layout />}>
          <Route path="main" element={<Main />} />
          <Route path="about" element={<About />} />
          <Route path="experiences" element={<Experiences />} />
          <Route path="my-works" element={<MyWorks />} />
          <Route path="skills" element={<Skills />} />
          <Route path="education" element={<Education />} />
          <Route path="messages" element={<Messages />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

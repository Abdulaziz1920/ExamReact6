import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Skills from "./pages/Skills";
import Layout from "./components/layout";
import Experiences from "./pages/Experiences";
import Education from "./pages/Education";
import Messages from "./pages/Messages";
import Main from "./pages/Main";
import Contact from "./pages/Contact";
import MyWorks from "./pages/Works";
import isAuth from "./states";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import AdminSkills from "./pages/Admin/Skills";
import AdminEducation from "./pages/Admin/Education";
import AdminExperinces from "./pages/Admin/Experiences";
import AdminWork from "./pages/Admin/Works";
import Register from "./pages/Register";

function App() {
  const { isAuthenticated } = isAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route path="main" element={<Main />} />
          <Route path="experiences" element={<Experiences />} />
          <Route path="my-works" element={<MyWorks />} />
          <Route path="skills" element={<Skills />} />
          <Route path="education" element={<Education />} />
          <Route path="messages" element={<Messages />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/" element={<Dashboard />}>
          <Route path="dashboard" element={<AdminSkills />} />
          <Route path="admin/education" element={<AdminEducation />} />
          <Route path="admin/experiences" element={<AdminExperinces />} />
          <Route path="admin/work" element={<AdminWork />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

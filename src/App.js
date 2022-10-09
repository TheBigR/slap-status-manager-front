import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/layout";
import LoginPage from "./pages/login-page";
import StatusPage from "./pages/status-page";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<StatusPage />} exact />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/status" element={<StatusPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

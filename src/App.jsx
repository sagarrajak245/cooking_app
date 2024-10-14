 import { Route, Routes } from "react-router-dom";
import SignIn from "./components/Authentication/SignIn.jsx";
import SignUp from "./components/Authentication/SignUp.jsx";
import VerifyForm from "./components/Authentication/VerifyForm.jsx";
import Sidebar from "./components/Sidebar.jsx";
import FavoritePage from "./pages/Favoritepage.jsx";
import HomePage from "./pages/Homepage.jsx";

// Layout component that wraps the pages that need the Sidebar
const DashboardLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
};

function App() {
  return (
    <>
      <Routes>
        {/* Authentication Routes (without Sidebar) */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<VerifyForm />} />

        {/* Routes with Sidebar */}
        <Route 
          path="/home" 
          element={
            <DashboardLayout>
              <HomePage />
            </DashboardLayout>
          } 
        />
        <Route 
          path="/favorites" 
          element={
            <DashboardLayout>
              <FavoritePage />
            </DashboardLayout>
          } 
        />
      </Routes>
    </>
  );
}

export default App;




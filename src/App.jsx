import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import FavoritePage from "./pages/Favoritepage.jsx";
import HomePage from "./pages/Homepage.jsx";
import SignIn from "./components/Authentication/SignIn.jsx";
import SignUp from "./components/Authentication/SignUp.jsx"; 
import VerifyForm from "./components/Authentication/VerifyForm.jsx"; 
import Restaurant from "./components/Restaurants/GetRestaurants.jsx"
import RestaurantComponent  from "./pages/Restaurant.jsx";
import RestaurantDetails from "./components/Restaurants/RestaurantDetails.jsx";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/verify"element={<VerifyForm/>}/>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/home" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritePage />} /> 
<Route path="/restaurant" element={<RestaurantComponent />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

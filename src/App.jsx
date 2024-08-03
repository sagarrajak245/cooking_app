
import { Route, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar.jsx"
import Favoritepage from "./pages/Favoritepage.jsx"
import Homepage from "./pages/Homepage.jsx"


function App() {
  

  return (
    <>
    <div >
 <h1 className="flex ">
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/favorites" element={<Favoritepage />} />
        
      </Routes>
      

    </h1>
   
      
    </div>
    </>
  )
}

export default App

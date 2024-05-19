import { 
  BrowserRouter, 
  Route, 
  Routes
} from "react-router-dom";
import Books from "./pages/Books";
import Update from "./pages/Update";
import Add from "./pages/Add";
import "./style.css";

function App() {
  return (
    <div className="container ">
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element ={<Books/>}/>
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

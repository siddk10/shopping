import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";

import useToken from "./useToken";
  
  function App() {
    const {token, setToken} = useToken();
    
  
  return (
    <div className="ui container">
      
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={token ?<Navigate to="/home"/> :<Login setToken={setToken}/>}/>
          <Route path="/home" element={token==null ? <Navigate to="/"/>:<Home/>} />
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}
  

export default App

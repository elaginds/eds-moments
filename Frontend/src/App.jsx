import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home.jsx";
import Layout from "./pages/Layout.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>} >
                <Route index element={<Home/>} />
                <Route path='login' element={<Login/>} />
                <Route path='register' element={<Register/>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App

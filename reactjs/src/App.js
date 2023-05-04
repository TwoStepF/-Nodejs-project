

import './App.css';
import Login from "./pages/auth/login";
import Registger from "./pages/auth/registger";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import ViewDetail from "./components/server/server";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateServer from './pages/createServer/CreateServer';
import UpdateServer from './pages/upadteServer/UpdateServer';
import Search from './pages/search.js/Search';

function App() {
  return (
    
    <BrowserRouter >
      <Header />
        <Routes>
            <Route path="/" element = {<Home />} ></Route>
            <Route path="/server/:id" element = {<ViewDetail />} ></Route>
            <Route path="/register" element = {<Registger />} ></Route>
            <Route path="/login" element = {<Login />}></Route>
            <Route path="/create" element = {<CreateServer />}></Route>
            <Route path="/update/:id" element = {<UpdateServer />}></Route>
            <Route path="/search" element = {<Search />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;

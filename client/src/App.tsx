import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./components/navigation/Main";
import Processors from "./components/navigation/Processors";
import Motherboards from "./components/navigation/Motherboards";
import Videocards from "./components/navigation/Videocards";
import Login from "./components/navigation/Login";
import Register from "./components/navigation/Register";
import UserPage from "./components/navigation/UserPage";
import Basket from "./components/navigation/Basket";
import History from "./components/navigation/History";
import ItemPage from "./components/navigation/ItemPage";
import ChangeUserPage from "./components/navigation/ChangeUserPage";
import AddItem from "./components/navigation/AddItem";
function App() {
  return (
    <Routes>
      <Route path="/api/user/:id/edit" element={<ChangeUserPage />} />
      <Route path="/api/user/addItem/:id" element={<AddItem />} />
      <Route path="/api/user/:id" element={<UserPage />} />

      <Route path="/api/history/:id" element={<History />} />
      <Route path="/api/user/basket" element={<Basket />} />
      <Route path="/api/auth/register" element={<Register />} />
      <Route path="/api/auth/login" element={<Login />} />
      <Route path="/api/videocards" element={<Videocards />} />
      <Route path="/api/processors" element={<Processors />} />
      <Route path="/api/motherboards" element={<Motherboards />} />
      <Route path="/item/:id" element={<ItemPage />} />
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default App;

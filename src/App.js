import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/home";
import Words from "./components/words";
import NavbarMain from "./components/navbar";
import ShowSingleWord from "./components/showSingleWord";
import EditWord from "./components/editWord";

import './App.css';

function App() {
  return (
    <div>
      <NavbarMain />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/words' element={<Words />} />
        <Route path='/words/:id' element={<ShowSingleWord />} />
        <Route path='/edit/:id' element={<EditWord />} />
      </Routes>

    </div>
  );
}

export default App;

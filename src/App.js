import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/home";
import Words from "./components/words";
import NavbarMain from "./components/navbar";
import ShowSingleWord from "./components/showSingleWord";
import EditWord from "./components/editWord";
import Test from "./components/test";
import PrivateRoute from "./pages/PrivateRoute.page"; 
import Login from "./pages/Login.page";
import Signup from "./pages/Signup.page";

import './App.css';

function App() {
  return (
    <div>
      <NavbarMain />
      <Routes>
        <Route exact path='/login' element={<Login /> } />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/' element={<Home />} />
        <Route element={<PrivateRoute />} >
          <Route path='/words' element={<Words />} />
          <Route path='/words/:id' element={<ShowSingleWord />} />
          <Route path='/edit/:id' element={<EditWord />} />
          <Route path='/test' element={<Test />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;

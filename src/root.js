import React from "react";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import Landing from "./App.js";
import Results from "./results.js";


export default class App extends React.Component {
    render() {
      return (
        
        <BrowserRouter >
        
          <Routes>
            
          <Route path="/" element={<Landing />}></Route>
          
          <Route exact path='/results/:query' element={<Results />}></Route>   
          <Route path='/results' element={<Results />}></Route>   
          
            
          </Routes>
        </BrowserRouter>
      );
    }
  }
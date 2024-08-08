import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import Game from "./Game";

const App = () => {
  return (
    <div className="w-full min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/game" element={<Game/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Clubs from './pages/clubs/Clubs';
import AddClub from './pages/clubs/AddClub';
import EditClub from './pages/clubs/EditClub';
import Players from './pages/players/Players';
import AddPlayer from './pages/players/AddPlayer';
import EditPlayer from './pages/players/EditPlayer';
import Home from "./pages/Home";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/clubs/add" element={<AddClub />} />
        <Route path="/clubs/edit/:club" element={<EditClub />} />
        <Route path="/players" element={<Players />} />
        <Route path="/players/add" element={<AddPlayer />} />
        <Route path="/players/edit/:player" element={<EditPlayer />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
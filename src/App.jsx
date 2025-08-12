import { useEffect, useState } from 'react';
import { getUserData } from './utils/api';
import Header from './components/MainHeader';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./content/Home";
import About from "./content/About";
import Exemple from "./content/Exemple";
import Readme from "./content/Readme";
import Admin from "./content/Admin";
import NotFound  from "./content/404"

function App() {
  const [user, setUser] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getUserData().then(data => {
      setUser(data.user);
      setMenuItems(data.menuItems);
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header
          user={user}
          menuItems={menuItems}
          isEditing={isEditing}
          onToggleEdit={() => setIsEditing(!isEditing)}
          isMenuOpen={isMenuOpen}
          onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        />

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/exemple" element={<Exemple />} />
          <Route path="/readme" element={<Readme />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
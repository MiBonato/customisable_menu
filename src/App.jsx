import { useEffect, useState } from 'react';
import { getInitialData } from './utils/api';
import Header from './components/MainHeader';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./content/Homepage";
import About from "./content/About";
import Exemple from "./content/Exemple";
import Readme from "./content/Readme";
import Admin from "./content/Admin";
import NotFound  from "./content/404"
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('userId') || 'u001';
    getInitialData(stored).then(({ user, menuItems }) => {
      setUser(user);
      setMenuItems(menuItems);
    });
  }, []);

  function handleLogin(userId) {
    getInitialData(userId).then(({ user, menuItems }) => {
      setUser(user);
      setMenuItems(menuItems);
    });
  }

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
          onLogin={handleLogin}
        />
        <main className="main-container">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/exemple" element={<Exemple />} />
            <Route path="/readme" element={<Readme />} />
            <Route path="/admin" element={user?.role === 'admin' ? <Admin user={user} onUserAccessSaved={(u) => setUser(u)} /> : <NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
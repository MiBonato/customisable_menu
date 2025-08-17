import { useEffect, useState } from 'react';
import { getInitialData } from './utils/api';
import Header from './components/Header';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./content/Homepage";
import About from "./content/About";
import Exemple from "./content/Exemple";
import Readme from "./content/Readme";
import Admin from "./content/Admin";
import NotFound  from "./content/404";
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [redirectHome, setRedirectHome] = useState(false); // <-- NEW

  useEffect(() => {
    const stored = localStorage.getItem('userId');
    if (stored) {
      getInitialData(stored).then(({ user, menuItems }) => {
        setUser(user);
        setMenuItems(menuItems);
      });
    } else {
      setUser(null);
      setMenuItems([]);
    }
  }, []);

  // Reset the one-shot redirect flag after it triggers
  useEffect(() => {
    if (redirectHome) {
      // let <Navigate> render once, then clear the flag
      const t = setTimeout(() => setRedirectHome(false), 0);
      return () => clearTimeout(t);
    }
  }, [redirectHome]);

  function handleLogin(userId) {
    localStorage.setItem('userId', userId);
    getInitialData(userId).then(({ user, menuItems }) => {
      setUser(user);
      setMenuItems(menuItems);
      setRedirectHome(true); // <-- trigger redirect to home
    });
  }

  function handleLogout() {
    localStorage.removeItem('userId');
    setUser(null);
    setMenuItems([]);
    setIsEditing(false);
    setIsMenuOpen(false);
    setRedirectHome(true); // <-- trigger redirect to home
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
          onLogout={handleLogout}
        />

        <main className="main-container flex s-row">
          {redirectHome && <Navigate to="/" replace />}
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/exemple" element={<Exemple />} />
            <Route path="/readme" element={<Readme />} />
            <Route 
              path="/admin" 
              element={
                ["admin", "superadmin"].includes(user?.role) 
                  ? <Admin user={user} onUserAccessSaved={(u) => setUser(u)} />
                  : <Navigate to="/" replace />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

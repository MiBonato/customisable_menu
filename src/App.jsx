import { useEffect, useState } from 'react';
import { getUserData } from './utils/api';
import Header from './components/MainHeader';

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
    <div className="App">
      <Header
        user={user}
        menuItems={menuItems}
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing(!isEditing)}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
      />
    </div>
  );
}

export default App;
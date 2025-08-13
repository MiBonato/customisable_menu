import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from './Menu';
import EditButton from './EditButton';
import LoginModal from './LoginModal';

function Header({ user, menuItems, isEditing, onToggleEdit, isMenuOpen, onToggleMenu, onLogin }) {
  const [openLogin, setOpenLogin] = useState(false);
  const navigate = useNavigate();

  const onLoginClick = () => {
    if (user) {
      navigate('/admin'); // si loggé, va à l’admin
    } else {
      setOpenLogin(true); // sinon ouvre la modal
    }
  };

  return (
    <header className="header">
      <div className="header-bar">
        <button
          className={`menu-mobile ${isMenuOpen ? 'open' : ''}`}
          onClick={onToggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <div className="header-actions">
          {/* Bouton Login / Username */}
          <button onClick={onLoginClick} className="login-btn">
            {user ? user.name : 'Login'}
          </button>

          {/* Bouton édition uniquement si loggé */}
          {user && (
            <EditButton isEditing={isEditing} onToggle={onToggleEdit} />
          )}
        </div>
      </div>

      {/* Menu toujours visible */}
      <div className={`menu-container ${isMenuOpen ? 'open' : ''}`}>
        <div className="items-container">
          <Menu user={user} menuItems={menuItems} isEditing={!!user && isEditing} />
        </div>
      </div>

      {/* Modal de login */}
      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onLogin={onLogin}
      />
    </header>
  );
}

export default Header;

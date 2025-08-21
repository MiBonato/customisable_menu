import { useState } from 'react';
import Menu from './Menu';
import EditButton from './EditButton';
import LoginModal from './LoginModal';

function Header({ user, menuItems, isEditing, onToggleEdit, isMenuOpen, onToggleMenu, onLogin, onLogout }) {
  const [loginOpen, setLoginOpen] = useState(false);

  const openLogin = () => setLoginOpen(true);
  const closeLogin = () => setLoginOpen(false);

  const isLogged = !!user;


  return (
    <header className="header flex s-row jc-end">
      {isLogged && (
        <button
          className={`menu-mobile ${isMenuOpen ? 'open' : ''}`}
          onClick={onToggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        
      )}
        
      {isLogged && (
        <nav className={`menu-container w-100 ${isMenuOpen ? 'open' : ''}`}>
          <div className="items-container flex s-col jc-start m-row m-jc-center">
            <Menu user={user} menuItems={menuItems} isEditing={!!user && isEditing} />
          </div>
        </nav>
      )}

      {!isLogged ? (
        <div className="menu-actions flex s-row">
          <button onClick={openLogin}>Login</button>
        </div>
        
      ):(

        <div className="menu-actions flex s-row">
          <span>{user.username}</span>
          <button type="button" onClick={onLogout}>Logout</button>
          <EditButton isEditing={isEditing} onToggle={onToggleEdit} />
        </div>

      )}

      <LoginModal
        open={loginOpen}
        onClose={closeLogin}
        onLogin={(userId) => {
          onLogin?.(userId);
          closeLogin();
        }}
      />
    </header>
  );
}

export default Header;

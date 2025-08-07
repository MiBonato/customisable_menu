import Menu from './Menu';
import EditButton from './EditButton';

function Header({ user, menuItems, isEditing, onToggleEdit, isMenuOpen, onToggleMenu }) {
  return (
    <header className="header">
      <div>
        <button className={`menu-mobile ${isMenuOpen ? 'open' : ''}`} onClick={onToggleMenu}>☰</button>
      </div>
      <div className={`menu-container ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-edit">
          <EditButton isEditing={isEditing} onToggle={onToggleEdit} />
        </div>
        <div className="items-container">
          <Menu user={user} menuItems={menuItems} isEditing={isEditing} />
        </div>
      </div>
      
    </header>
  );
}

export default Header;

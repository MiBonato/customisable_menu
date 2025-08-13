import { Link, useLocation } from "react-router-dom";

function MenuItem({ item, attributes, listeners, isDragging, isOver, isEditing }) {
  const location = useLocation();
  const isActive = location.pathname === item.url;
  const editableProps = {
    ...attributes,
    ...listeners,
    className: `menu-item ${isDragging ? 'dragging' : ''}`,
    'aria-disabled': 'true'
  };

  if (isEditing) {
    return (
      <div {...editableProps}>
        {item.name}
      </div>
    );
  }

  return (
    <Link
      to={item.url}
      className={`menu-item ${isActive ? 'active' : ''}`}
      draggable="false"
    >
      {item.name}
    </Link>
  );
}

export default MenuItem;

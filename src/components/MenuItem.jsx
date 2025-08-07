function MenuItem({ item, attributes, listeners, isDragging, isOver, isEditing }) {
  return (
    <div
      {...attributes}
      {...listeners}
      className={`menu-item ${isDragging ? 'dragging' : ''}`}
    >
      {item.name}
    </div>
  );
}

export default MenuItem;

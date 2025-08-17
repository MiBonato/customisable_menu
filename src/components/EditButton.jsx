function EditButton({ isEditing, onToggle }) {
  return (
    <button onClick={onToggle} >
      {isEditing ? '🔒' : '⚙️' }
    </button>
  );
}

export default EditButton;

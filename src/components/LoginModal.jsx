import { useEffect, useState } from "react";

export default function LoginModal({ open, onClose, onLogin }) {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (open) {
      const stored = localStorage.getItem("userId") || "";
      setUserId(stored);
    }
  }, [open]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    if (!userId.trim()) return;
    localStorage.setItem("userId", userId.trim());
    onLogin?.(userId.trim());
    onClose?.();
  };

  return (
    <div className="modal-backdrop flex s-col  jc-center" onClick={onClose}>
      <div className="modal flex s-col " onClick={(e) => e.stopPropagation()}>
        <h3>Login</h3>
        <form className="flex s-col  jc-around" onSubmit={submit}>
          <label >
            <input
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Id"
              autoFocus
            />
          </label>
          <label>
            <input type="password" placeholder="Password" />
          </label>
          <div className="modal-actions flex s-row jc-evenly">
            <button type="submit">Login</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

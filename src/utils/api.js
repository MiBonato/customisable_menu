const API = 'http://localhost:3001';

export async function getUserById(id) {
  const r = await fetch(`${API}/users/${id}`);
  if (!r.ok) throw new Error('User not found');
  return r.json();
}

export async function getMenuItems() {
  const r = await fetch(`${API}/menuItems`);
  return r.json();
}

export async function getInitialData(userId = 'u001') {
  const [user, menuItems] = await Promise.all([
    getUserById(userId),
    getMenuItems()
  ]);
  return { user, menuItems };
}

export async function getUsers() {
  const r = await fetch('http://localhost:3001/users');
  if (!r.ok) throw new Error('Users fetch failed');
  return r.json();
}

export async function patchUser(id, payload) {
  const r = await fetch(`${API}/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return r.json();
}

// Sauvegarde de l'ordre du menu
export async function saveUserOrder(userId, order) {
  return patchUser(userId, { order });
}

// Sauvegarde des droits d'accès
export async function saveUserAccess(userId, access) {
  return patchUser(userId, { access });
}

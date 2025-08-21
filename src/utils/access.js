// utils/access.js

// Retourne la liste des items accessibles (selon les droits)
// triés selon l'ordre utilisateur, puis ajoute à la fin les nouveaux items accessibles.
export function getAccessibleItems(user, menuItems, defaultOrder = []) {
  if (!Array.isArray(menuItems) || menuItems.length === 0) return [];

  // Non connecté → menu générique (ordre par défaut, ou tel que menuItems)
  if (!user) {
    const ids = defaultOrder.length ? defaultOrder : menuItems.map(i => i.id);
    const idSet = new Set(ids);
    const filtered = menuItems.filter(i => idSet.has(i.id));
    return filtered.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
  }

  const accessSet = new Set(user.access || []);
  const knownIds = new Set(menuItems.map(i => i.id));

  // Items autorisés
  const accessible = menuItems.filter(i => accessSet.has(i.id));

  // Ordre existant et valide
  const ordered = (user.order || []).filter(id => accessSet.has(id) && knownIds.has(id));

  // Nouveaux items accessibles non présents dans l’ordre
  const newOnes = accessible.map(i => i.id).filter(id => !ordered.includes(id));

  const finalIds = [...ordered, ...newOnes];
  const byId = Object.fromEntries(menuItems.map(i => [i.id, i]));
  return finalIds.map(id => byId[id]).filter(Boolean);
}

// Pratique pour éviter un PATCH inutile
export function arraysEqual(a = [], b = []) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

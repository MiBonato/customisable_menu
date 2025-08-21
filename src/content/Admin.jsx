import { useEffect, useMemo, useState } from 'react';
import { getUsers, getMenuItems, saveUserAccess } from '../utils/api';
import { arraysEqual } from '../utils/access';

export default function Admin({ user }) {
  const [allUsers, setAllUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [accessMap, setAccessMap] = useState({});
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState('');
  const [groupFilter, setGroupFilter] = useState('');

  if (!user || !['admin','superadmin'].includes(user.role)) {
    return <p>Access denied.</p>;
  }

  useEffect(() => {
    Promise.all([getUsers(), getMenuItems()]).then(([users, menu]) => {
      setAllUsers(users);
      setItems(menu);

      const initial = {};
      users.forEach(u => {
        initial[u.id] = new Set(u.access || []);
      });
      setAccessMap(initial);
    });
  }, []);

  const manageableUsers = useMemo(() => {
    if (!allUsers.length) return [];
    let subset = [];
    if (user.role === 'superadmin') {
      subset = allUsers.filter(u => u.role === 'admin' || u.role === 'user');
    } else if (user.role === 'admin') {
      subset = allUsers.filter(u => u.role === 'user');
    }

    // filter texte
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      subset = subset.filter(u =>
        u.id.toLowerCase().includes(s) || u.username.toLowerCase().includes(s)
      );
    }

    // filter group
    if (groupFilter) {
      subset = subset.filter(u => u.group === groupFilter);
    }

    return subset;
  }, [allUsers, user, search, groupFilter]);

  const groups = useMemo(() => {
    const g = new Set(allUsers.map(u => u.group).filter(Boolean));
    return Array.from(g);
  }, [allUsers]);

  const toggleAccess = (targetUserId, pageId) => {
    setAccessMap(prev => {
      const next = { ...prev };
      const set = new Set(next[targetUserId] || []);
      set.has(pageId) ? set.delete(pageId) : set.add(pageId);
      next[targetUserId] = set;
      return next;
    });
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      const promises = manageableUsers.map(u => {
        const current = Array.from(accessMap[u.id] || []);
        const original = u.access || [];
        if (arraysEqual([...current].sort(), [...original].sort())) {
          return null;
        }
        return saveUserAccess(u.id, current).then(() => {
          setAllUsers(prev =>
            prev.map(x => x.id === u.id ? { ...x, access: current } : x)
          );
        });
      });
      await Promise.all(promises.filter(Boolean));
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="admin-panel">
      <h1>Admin – Access management</h1>


      <p>Logged as: <strong>{user.username}</strong> ({user.role} - {user.id})</p>

      <div className="filters flex s-row jc-between ">
        <div className="w-33 flex s-row jc-start">
          <input
            type="text"
            placeholder="Search by ID or username"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="w-33 flex s-row">
          <select
            value={groupFilter}
            onChange={e => setGroupFilter(e.target.value)}
          >
            <option value="">All groups</option>
            {groups.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div className="w-33 flex s-row jc-end">
          <button onClick={saveAll} disabled={saving}>
            {saving ? 'Saving…' : 'Save all changes'}
          </button>
        </div>
      </div>

      <div className="table">
        <div className="flex s-row jc-evenly header-row">
          <div className="col id">ID</div>
          <div className="col name">Name</div>
          <div className="col group">Group</div>
          {items.map(item => (
            <div key={`h-${item.id}`} className="col page">{item.name}</div>
          ))}
        </div>

        <div className="flex s-col jc-evenly lines-container">
          {manageableUsers.map(u => (
            <div key={u.id} className="flex s-row jc-evenly">
              <div className="col id">{u.id}</div>
              <div className="col name">{u.username}</div>
              <div className="col group">{u.group}</div>
              {items.map(item => {
                const inputId = `chk-${u.id}-${item.id}`;
                const checked = accessMap[u.id]?.has(item.id) || false;
                return (
                  <div key={`${u.id}-${item.id}`} className="col page">
                    <div className="checkbox-container">
                      <input
                        id={inputId}
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAccess(u.id, item.id)}
                      />
                      <label htmlFor={inputId} />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          {!manageableUsers.length && (
            <p>No users to manage for your role.</p>
          )}
        </div>
      </div>
    </section>
  );
}

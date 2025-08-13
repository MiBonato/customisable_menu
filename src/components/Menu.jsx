import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import { saveUserOrder } from '../utils/api';

function arraysEqual(a = [], b = []) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

function SortableItem({ id, item, isEditing }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver
  } = useSortable({
    id,
    disabled: !isEditing, // drag actif uniquement en édition
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style}>
      <MenuItem
        item={item}
        // On ne passe les attributs/listeners qu'en mode édition
        attributes={isEditing ? attributes : undefined}
        listeners={isEditing ? listeners : undefined}
        isDragging={!!isDragging}
        isOver={!!isOver}
        isEditing={isEditing}
      />
    </div>
  );
}

function Menu({ user, menuItems, isEditing }) {
  const [visibleItems, setVisibleItems] = useState([]);
  const [orderedIds, setOrderedIds] = useState([]);

  const sensors = useSensors(useSensor(PointerSensor));

  // Initialise / réconcilie l'ordre à partir des droits + ordre utilisateur
 useEffect(() => {
  if (menuItems.length === 0) return;

  if (!user) {
    // Visiteur : ordre par défaut
    const defaultOrder = ['home','about','exemple','readme'].filter(id =>
      menuItems.some(m => m.id === id)
    );
    const idSet = new Set(defaultOrder.length ? defaultOrder : menuItems.map(m => m.id));
    const accessibleItems = menuItems.filter(m => idSet.has(m.id));
    const finalOrder = (defaultOrder.length ? defaultOrder : accessibleItems.map(i=>i.id));
    setOrderedIds(finalOrder);
    setVisibleItems(accessibleItems);
    return;
  }

  // Utilisateur loggé (ta logique existante)
  const accessSet = new Set(user.access);
  const knownIds = new Set(menuItems.map(item => item.id));

  const accessibleItems = menuItems.filter(item => accessSet.has(item.id));
  const ordered = user.order.filter(id => accessSet.has(id) && knownIds.has(id));
  const newItems = accessibleItems.map(item => item.id).filter(id => !ordered.includes(id));
  const finalOrder = [...ordered, ...newItems];

  setOrderedIds(finalOrder);
  setVisibleItems(accessibleItems);
}, [user, menuItems]);

  // Drag & drop
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = orderedIds.indexOf(active.id);
    const newIndex = orderedIds.indexOf(over.id);

    const newOrder = arrayMove(orderedIds, oldIndex, newIndex);
    setOrderedIds(newOrder);
  };

  // Sauvegarde uniquement si l'ordre a changé quand on quitte l'édition
  useEffect(() => {
    if (!isEditing && user) {
      if (!arraysEqual(orderedIds, user.order)) {
        // l'ordre actuel diffère de l'ordre stocké → on persiste
        saveUserOrder(user.id, orderedIds);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]); // on déclenche seulement sur changement du mode édition

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={orderedIds} strategy={verticalListSortingStrategy}>
        {orderedIds.map((id) => {
          const item = visibleItems.find((i) => i.id === id);
          return item ? (
            <SortableItem key={id} id={id} item={item} isEditing={isEditing} />
          ) : null;
        })}
      </SortableContext>
    </DndContext>
  );
}

export default Menu;

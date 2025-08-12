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
    disabled: !isEditing,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style}>
      <MenuItem
        item={item}
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

  useEffect(() => {
    if (!user || menuItems.length === 0) return;

    const accessSet = new Set(user.access);
    const knownIds = new Set(menuItems.map(item => item.id));

    const accessibleItems = menuItems.filter(item => accessSet.has(item.id));
    const ordered = user.order.filter(id => accessSet.has(id) && knownIds.has(id));
    const newItems = accessibleItems.map(item => item.id).filter(id => !ordered.includes(id));

    const finalOrder = [...ordered, ...newItems];

    setOrderedIds(finalOrder);
    setVisibleItems(accessibleItems);
  }, [user, menuItems]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = orderedIds.indexOf(active.id);
    const newIndex = orderedIds.indexOf(over.id);

    const newOrder = arrayMove(orderedIds, oldIndex, newIndex);
    setOrderedIds(newOrder);
  };

  const handleSave = () => {
    if (user) saveUserOrder(user.id, orderedIds);
  };

  useEffect(() => {
    if (!isEditing && user) handleSave();
  }, [isEditing]);

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

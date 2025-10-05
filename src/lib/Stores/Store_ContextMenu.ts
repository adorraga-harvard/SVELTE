import { writable } from 'svelte/store';

interface ContextMenuItem {
  id: string;
  label: string;
}

interface ContextMenuState {
  isVisible: boolean;
  x: number;
  y: number;
  items: ContextMenuItem[];
  onItemSelected: ((id: string) => void) | null;
}

const initialContextMenuState: ContextMenuState = {
  isVisible: false,
  x: 0,
  y: 0,
  items: [],
  onItemSelected: null,
};

export const contextMenu = writable<ContextMenuState>(initialContextMenuState);

export function showContextMenu(x: number, y: number, items: ContextMenuItem[], onItemSelected: (id: string) => void) {
  contextMenu.set({
    isVisible: true,
    x,
    y,
    items,
    onItemSelected,
  });
}

export function hideContextMenu() {
  contextMenu.update(state => ({ ...state, isVisible: false }));
}
import { create } from 'zustand';

const useMacBookStore = create((set) => ({
    color: '#2e2c2e',
    setColor: (color) => set({ color }),

    scalr: 0.08,
    setScale: (scale) => ({ scale }),

    reset: () => set({ color: '#2e2c2e', scale: 0.08 })
}));

export default useMacBookStore;
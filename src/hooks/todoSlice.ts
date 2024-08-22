import { create, StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface TodoSlice {
  todo: Map<string,string[]>,
  setTodo: (newTodo: Map<string,string[]>) => void,
}

export const createTodoSlice: StateCreator<TodoSlice, [], [["zustand/persist", unknown]], TodoSlice> =
  persist(
    (set) => ({
      todo: new Map<string, string[]>(),
      setTodo: (newTodo: Map<string,string[]>) => {set({todo: newTodo})},
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => localStorage),
      serialize: (state) => {
        return JSON.stringify({
          ...state,
          state: {
            ...state.state,
            todo: Array.from(state.state.todo.entries()),
          },
        });
      },
      deserialize: (str) => {
        const parsed = JSON.parse(str);
        return {
          ...parsed,
          state: {
            ...parsed.state,
            todo: new Map(parsed.state.todo),
          },
        };
      },
    },
  );
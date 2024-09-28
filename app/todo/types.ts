declare global {
  interface Window {
    min?: number;
    max?: number;
  }
}

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export type TodoAction =
  | { type: 'add'; payload: { todo: Todo } }
  | { type: 'edit'; payload: { id: number; updatedTodo: Todo } }
  | { type: 'delete'; payload: { id: number } }
  | { type: 'set'; payload: Todo[] };

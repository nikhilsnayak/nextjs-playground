import { Todo, TodoAction } from './types';

export function todosReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'add':
      return [action.payload.todo, ...state];
    case 'edit':
      return state.map((todo) => {
        if (todo.id === action.payload.id) return action.payload.updatedTodo;
        return todo;
      });
    case 'delete':
      return state.filter((todo) => todo.id !== action.payload.id);
    case 'set':
      return action.payload;
    default:
      return state;
  }
}

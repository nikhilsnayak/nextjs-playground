import { FormEvent, useCallback, useReducer } from 'react';

import { AddTodoForm } from './add-todo-form';
import { TodoItem, TodoList } from './todo-list';
import { todosReducer } from './todo-reducer';
import { Todo } from './types';

export function InMemoryTodo() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  const handleAddTodo = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get('title')!.toString();
    const id = Math.floor(Math.random() * 1000);
    dispatch({
      type: 'add',
      payload: {
        todo: {
          id,
          title,
          done: false,
        },
      },
    });
    form.reset();
  }, []);

  const handleStatusChange = useCallback((todo: Todo) => {
    return (done: boolean) => {
      dispatch({
        type: 'edit',
        payload: {
          id: todo.id,
          updatedTodo: {
            ...todo,
            done,
          },
        },
      });
    };
  }, []);

  const handleDelete = useCallback((todo: Todo) => {
    return () => {
      dispatch({
        type: 'delete',
        payload: {
          id: todo.id,
        },
      });
    };
  }, []);

  return (
    <section>
      <h2 className='mb-4'>In Memory Todo List (SYNC)</h2>
      <AddTodoForm onSubmit={handleAddTodo} />
      <TodoList>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onStatusChange={handleStatusChange(todo)}
            onDelete={handleDelete(todo)}
          />
        ))}
      </TodoList>
    </section>
  );
}

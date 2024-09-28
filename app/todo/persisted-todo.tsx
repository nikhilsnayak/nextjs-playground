import { FormEvent, useCallback, useEffect, useReducer, useState } from 'react';

import { AddTodoForm } from './add-todo-form';
import { createTodo, deleteTodo, updateTodo } from './db/mutations';
import { getTodos } from './db/queries';
import { TodoItem, TodoList } from './todo-list';
import { todosReducer } from './todo-reducer';
import { Todo } from './types';

export function PersistedTodo() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then((todos) =>
        dispatch({
          type: 'set',
          payload: todos,
        })
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAddTodo = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get('title')!.toString();

    const newTodo = await createTodo({
      done: false,
      title,
    });

    dispatch({
      type: 'add',
      payload: {
        todo: newTodo,
      },
    });

    form.reset();
  }, []);

  const handleStatusChange = useCallback((todo: Todo) => {
    return async (done: boolean) => {
      const updatedTodo = await updateTodo(todo.id, {
        ...todo,
        done,
      });

      dispatch({
        type: 'edit',
        payload: {
          id: todo.id,
          updatedTodo,
        },
      });
    };
  }, []);

  const handleDelete = useCallback((todo: Todo) => {
    return async () => {
      const deletedId = await deleteTodo(todo.id);
      dispatch({
        type: 'delete',
        payload: {
          id: deletedId,
        },
      });
    };
  }, []);

  return (
    <section>
      <h2 className='mb-4'>Persisted Todo List (ASYNC)</h2>
      <AddTodoForm onSubmit={handleAddTodo} />
      {isLoading ? (
        'Loading...'
      ) : (
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
      )}
    </section>
  );
}

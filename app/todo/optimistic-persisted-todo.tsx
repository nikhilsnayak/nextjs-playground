import { FormEvent, useCallback, useEffect, useReducer, useState } from 'react';

import { AddTodoForm } from './add-todo-form';
import { createTodo, deleteTodo, updateTodo } from './db/mutations';
import { getTodos } from './db/queries';
import { TodoItem, TodoList } from './todo-list';
import { todosReducer } from './todo-reducer';
import { Todo } from './types';

export function OptimisticPersistedTodo() {
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

    // Optimistically update the UI
    const optimisticTodo: Todo = {
      id: Date.now(), // Temporarily using a timestamp as ID until persisted
      done: false,
      title,
    };

    dispatch({
      type: 'add',
      payload: {
        todo: optimisticTodo,
      },
    });
    form.reset();

    try {
      const newTodo = await createTodo({
        done: false,
        title,
      });

      // Update with real data after successful creation
      dispatch({
        type: 'edit',
        payload: {
          id: optimisticTodo.id,
          updatedTodo: newTodo,
        },
      });
    } catch (error) {
      // Handle any error (revert if necessary)
      dispatch({
        type: 'delete',
        payload: {
          id: optimisticTodo.id,
        },
      });
      console.error('Failed to create todo:', error);
    }
  }, []);

  const handleStatusChange = useCallback((todo: Todo) => {
    return async (done: boolean) => {
      // Optimistically update UI
      const optimisticTodo = { ...todo, done };

      dispatch({
        type: 'edit',
        payload: {
          id: todo.id,
          updatedTodo: optimisticTodo,
        },
      });

      try {
        await updateTodo(todo.id, optimisticTodo);
      } catch (error) {
        // Revert if update fails
        dispatch({
          type: 'edit',
          payload: {
            id: todo.id,
            updatedTodo: todo,
          },
        });
        console.error('Failed to update todo:', error);
      }
    };
  }, []);

  const handleDelete = useCallback((todo: Todo) => {
    return async () => {
      // Optimistically remove the todo from UI
      dispatch({
        type: 'delete',
        payload: {
          id: todo.id,
        },
      });

      try {
        await deleteTodo(todo.id);
      } catch (error) {
        // Revert if deletion fails
        dispatch({
          type: 'add',
          payload: {
            todo,
          },
        });
        console.error('Failed to delete todo:', error);
      }
    };
  }, []);

  return (
    <section>
      <h2 className='mb-4'>Optimistic Persisted Todo List (ASYNC)</h2>
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

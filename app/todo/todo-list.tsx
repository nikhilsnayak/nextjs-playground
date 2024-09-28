import { ComponentProps } from 'react';

import { Todo } from './types';

export function TodoList(props: ComponentProps<'ul'>) {
  return <ul className='space-y-1 max-h-60 overflow-auto p-1' {...props} />;
}

export function TodoItem({
  todo,
  onStatusChange,
  onDelete,
}: {
  todo: Todo;
  onStatusChange?: (statue: boolean) => void;
  onDelete?: () => void;
}) {
  return (
    <li
      key={todo.id}
      className='flex justify-between items-center p-1 border-b gap-2'
    >
      <span
        className={`overflow-ellipsis overflow-hidden ${todo.done ? 'line-through' : ''}`}
      >
        {todo.title}
      </span>
      <span className='flex items-center gap-1 shrink-0'>
        <input
          type='checkbox'
          checked={todo.done}
          className='size-5'
          onChange={(e) => onStatusChange?.(e.target.checked)}
        />
        <button
          className='bg-red-500 text-white rounded size-5 flex items-center justify-center'
          onClick={onDelete}
        >
          -
        </button>
      </span>
    </li>
  );
}

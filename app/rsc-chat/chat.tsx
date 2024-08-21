'use client';

import { ElementRef, useEffect, useRef, useState, useTransition } from 'react';

import { cn } from '@/lib/utils';

import { continueConversation } from './actions';
import { Message } from './types';
import { getId } from './utils';

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, startTransition] = useTransition();

  const messagesListRef = useRef<ElementRef<'ul'>>(null);
  const messagesEndRef = useRef<ElementRef<'li'>>(null);

  useEffect(() => {
    const messagesList = messagesListRef.current;
    const messagesEnd = messagesEndRef.current;
    if (!messagesList || !messagesEnd) return;

    const observer = new MutationObserver(() => {
      messagesEnd.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });

    observer.observe(messagesList, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className='max-w-xl w-full p-4 bg-white rounded-lg shadow-lg'>
      <ul
        className='space-y-2 mb-4 border p-4 h-[50vh] overflow-auto relative rounded-lg'
        ref={messagesListRef}
      >
        {messages.length === 0 ? (
          <li className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            No Conversation
          </li>
        ) : (
          messages.map((message) => (
            <li
              key={message.id}
              className={cn(
                'bg-gray-100 p-2 rounded-lg max-w-max',
                message.role === 'user' && 'text-right ml-auto'
              )}
            >
              {message.display}
            </li>
          ))
        )}
        {isPending ? (
          <li className='bg-gray-100 p-2 rounded-lg max-w-max'>Thinking...</li>
        ) : null}
        <li ref={messagesEndRef} />
      </ul>
      <form
        className='grid gap-4 grid-cols-8'
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const query = formData.get('query')?.toString()?.trim();
          e.currentTarget.reset();
          if (!query) return;

          setMessages((prev) => {
            const id = getId();
            return [...prev, { id, role: 'user', display: <div>{query}</div> }];
          });

          startTransition(async () => {
            const response = await continueConversation(query);
            setMessages((prev) => {
              return [...prev, response];
            });
          });
        }}
      >
        <input
          type='text'
          name='query'
          className='flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 col-span-6'
          placeholder='Enter your message...'
        />
        <button
          type='submit'
          disabled={isPending}
          className='p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none disabled:bg-blue-300 col-span-2'
        >
          Ask
        </button>
      </form>
    </section>
  );
}

'use server';

import { Message } from './types';
import { getId } from './utils';

export async function continueConversation(query: string): Promise<Message> {
  const id = getId();

  await new Promise((res) => setTimeout(res, Math.random() * 1000));

  const display = (
    <div>
      <h2>Hello From Server Action</h2>
      <p>You asked : {query}</p>
    </div>
  );

  return {
    id,
    role: 'bot',
    display,
  };
}

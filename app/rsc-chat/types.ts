import { ReactNode } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'bot';
  display: ReactNode;
}

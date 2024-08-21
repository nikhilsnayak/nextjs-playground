import { Chat } from './chat';

export default function RSCChat() {
  return (
    <main className='w-full h-screen grid place-items-center p-4'>
      <h1 className='text-2xl font-bold text-center mb-4'>
        Welcome to RSC Chat
      </h1>
      <Chat />
    </main>
  );
}

export const DEFAULT_MIN = 1000;
export const DEFAULT_MAX = 5000;

export function randomDelay(shouldError: boolean = false): Promise<void> {
  const min = window?.min ?? DEFAULT_MIN;
  const max = window?.max ?? DEFAULT_MAX;
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (delay > max / 2 && shouldError) {
        reject();
      } else {
        resolve();
      }
    }, delay);
  });
}

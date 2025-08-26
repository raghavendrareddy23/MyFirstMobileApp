export type Task = { id: string; title: string; completed: boolean };

export const createTask = (title: string): Task => ({
  id: Date.now().toString(),
  title: title.trim(),
  completed: false,
});

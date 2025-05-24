export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch('/api/todos');
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
};

export const addTodo = async (title: string): Promise<Todo> => {
  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error('Failed to add todo');
  return res.json();
};

export const updateTodo = async (
  id: number,
  completed: boolean,
): Promise<Todo> => {
  const res = await fetch('/api/todos', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, completed }),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
  const res = await fetch('/api/todos', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error('Failed to delete todo');
};

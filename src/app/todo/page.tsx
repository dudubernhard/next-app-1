'use client';
import Menu from '@/components/Menu';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  Todo,
} from '@/lib/todoApi';

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchTodos()
      .then((data) => setTodos(data))
      .catch(() => setError('Failed to load todos'))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const newTodo = await addTodo(input.trim());
      setTodos((prev) => [newTodo, ...prev]);
      setInput('');
    } catch {
      setError('Failed to add todo');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id: number, completed: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateTodo(id, !completed);
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
    } catch {
      setError('Failed to update todo');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch {
      setError('Failed to delete todo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <Menu />
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-xl shadow-xl">
          <CardHeader className="items-center">
            <CardTitle className="text-3xl md:text-4xl font-bold text-center text-blue-900 dark:text-white mb-2">
              To Do List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new task"
                aria-label="Add a new task"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAdd();
                }}
                disabled={loading}
              />
              <Button
                onClick={handleAdd}
                aria-label="Add task"
                type="button"
                disabled={loading}
              >
                Add
              </Button>
            </div>
            {error && (
              <div className="text-red-500 text-center mb-2">{error}</div>
            )}
            <ul className="w-full">
              {loading && (
                <li className="text-gray-400 dark:text-gray-500 text-center">
                  Loading...
                </li>
              )}
              {!loading && todos.length === 0 && (
                <li className="text-gray-400 dark:text-gray-500 text-center">
                  No tasks yet.
                </li>
              )}
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between bg-white dark:bg-gray-800 rounded px-4 py-2 mb-2 shadow"
                >
                  <span
                    className={`flex-1 cursor-pointer ${
                      todo.completed ? 'line-through text-gray-400' : ''
                    }`}
                    tabIndex={0}
                    aria-label={
                      todo.completed
                        ? `Mark ${todo.title} as not done`
                        : `Mark ${todo.title} as done`
                    }
                    onClick={() => handleToggle(todo.id, todo.completed)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ')
                        handleToggle(todo.id, todo.completed);
                    }}
                  >
                    {todo.title}
                  </span>
                  <Button
                    variant="destructive"
                    className="ml-4"
                    onClick={() => handleRemove(todo.id)}
                    aria-label={`Remove ${todo.title}`}
                    type="button"
                    disabled={loading}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TodoPage;

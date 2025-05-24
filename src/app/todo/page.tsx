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
import { Trash2, CheckCircle, Circle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
] as const;
type Filter = (typeof FILTERS)[number]['value'];

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

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

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <Menu />
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-12">
        {/* Add New Task Card at the Top */}
        <Card className="w-full max-w-xl shadow-xl mb-6">
          <CardHeader className="items-center">
            <CardTitle className="text-2xl font-bold text-center text-blue-900 dark:text-white mb-2">
              Add a New Task
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 mb-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new task"
                aria-label="Add a new task"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAdd();
                  }
                }}
                disabled={loading}
                rows={2}
                className="resize-y"
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
          </CardContent>
        </Card>

        {/* List Card below */}
        <Card className="w-full max-w-xl shadow-xl flex flex-col flex-1 min-h-[400px] max-h-[70vh]">
          <CardHeader className="items-center">
            <CardTitle className="text-2xl font-bold text-center text-blue-900 dark:text-white mb-2">
              To Do List
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {/* Filter Buttons */}
            <div className="flex justify-center gap-2 mb-4">
              {FILTERS.map((f) => (
                <Button
                  key={f.value}
                  variant={filter === f.value ? 'default' : 'outline'}
                  onClick={() => setFilter(f.value)}
                  aria-label={`Show ${f.label} tasks`}
                  className="text-xs px-3 py-1"
                >
                  {f.label}
                </Button>
              ))}
            </div>
            <ul
              className="w-full flex-1 overflow-y-auto"
              style={{ maxHeight: '45vh' }}
            >
              {loading && (
                <li className="text-gray-400 dark:text-gray-500 text-center">
                  Loading...
                </li>
              )}
              {!loading && filteredTodos.length === 0 && (
                <li className="text-gray-400 dark:text-gray-500 text-center">
                  No tasks found.
                </li>
              )}
              {filteredTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between bg-white dark:bg-gray-800 rounded px-4 py-2 mb-2 shadow"
                >
                  <div className="flex-1 flex flex-col gap-1 cursor-pointer">
                    <span
                      className={`font-medium ${
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
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Created: {new Date(todo.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggle(todo.id, todo.completed)}
                      aria-label={
                        todo.completed
                          ? `Mark ${todo.title} as not done`
                          : `Mark ${todo.title} as done`
                      }
                      className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading}
                      type="button"
                    >
                      {todo.completed ? (
                        <CheckCircle
                          className="text-green-600"
                          aria-hidden="true"
                        />
                      ) : (
                        <Circle className="text-gray-400" aria-hidden="true" />
                      )}
                    </button>
                    <button
                      onClick={() => handleRemove(todo.id)}
                      aria-label={`Remove ${todo.title}`}
                      className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                      disabled={loading}
                      type="button"
                    >
                      <Trash2 className="text-red-600" aria-hidden="true" />
                    </button>
                  </div>
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

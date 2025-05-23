'use client';
import Menu from '@/components/Menu';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Todo = { id: number; text: string; done: boolean };

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  const handleRemove = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
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
              />
              <Button onClick={handleAdd} aria-label="Add task" type="button">
                Add
              </Button>
            </div>
            <ul className="w-full">
              {todos.length === 0 && (
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
                      todo.done ? 'line-through text-gray-400' : ''
                    }`}
                    tabIndex={0}
                    aria-label={
                      todo.done
                        ? `Mark ${todo.text} as not done`
                        : `Mark ${todo.text} as done`
                    }
                    onClick={() => handleToggle(todo.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ')
                        handleToggle(todo.id);
                    }}
                  >
                    {todo.text}
                  </span>
                  <Button
                    variant="destructive"
                    className="ml-4"
                    onClick={() => handleRemove(todo.id)}
                    aria-label={`Remove ${todo.text}`}
                    type="button"
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

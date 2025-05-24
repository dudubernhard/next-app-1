'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState, useEffect, useRef } from 'react';
import { sendMessageToServer } from './client';
import type { LLMModel } from './client';
import { observer } from 'mobx-react-lite';
import { chatStore, ChatMessage } from './chatStore';

const LLM_OPTIONS: { label: string; value: LLMModel }[] = [
  { label: 'Llama (Ollama)', value: 'ollama' },
  { label: 'OpenAI', value: 'openai' },
];

export default observer(function ChatPlayground() {
  const [inputValue, setInputValue] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [selectedLLM, setSelectedLLM] = useState<LLMModel>('ollama');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatStore.messages.length]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    chatStore.addMessage(userMessage);
    setInputValue('');
    setIsBotTyping(true);

    try {
      const reply = await sendMessageToServer(chatStore.messages, selectedLLM);
      if (reply) {
        const botMessage: ChatMessage = {
          id: Date.now() + 1,
          text: reply,
          sender: 'bot',
          timestamp: new Date(),
        };
        chatStore.addMessage(botMessage);
      } else {
        // Optionally handle error
      }
    } catch {
      // Optionally handle error
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-4">
      <Card className="w-full max-w-4xl mx-auto flex-1 flex flex-col">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-900 dark:text-white">
            Chat Playground
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <label
              htmlFor="llm-select"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              LLM:
            </label>
            <select
              id="llm-select"
              value={selectedLLM}
              onChange={(e) => setSelectedLLM(e.target.value as LLMModel)}
              className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Choose LLM"
            >
              {LLM_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <ScrollArea className="flex-1 p-4 border rounded-lg">
            <div className="space-y-4">
              {chatStore.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isBotTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 dark:bg-gray-800 opacity-70">
                    <p className="italic text-gray-500 dark:text-gray-300">
                      Bot is typing…
                    </p>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1"
              aria-label="Type your message"
            />
            <Button onClick={handleSendMessage} disabled={isBotTyping}>
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

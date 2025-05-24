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
import Menu from '@/components/Menu';

const LLM_OPTIONS: { label: string; value: LLMModel }[] = [
  { label: 'gemma3:4b (Ollama)', value: 'ollama' },
  { label: 'OpenAI', value: 'openai' },
];

// Utility function to detect RTL (Hebrew/Arabic)
const isRTL = (text: string) => {
  const rtlChar = /[\u0590-\u05FF\u0600-\u06FF]/;
  return rtlChar.test(text);
};

export default observer(function ChatPlayground() {
  const [inputValue, setInputValue] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [selectedLLM, setSelectedLLM] = useState<LLMModel>('ollama');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1');

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
    setErrorMessage(null);

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
        setErrorMessage(null);
      } else {
        setErrorMessage(
          "Oops! Our AI brain (Ollama) is taking a nap or lost in thought. Please try again when it's back from its coffee break!",
        );
      }
    } catch {
      setErrorMessage(
        "Yikes! The LLM failed to respond. Maybe Ollama isn't running, or the server is on vacation. Try again in a bit!",
      );
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-purple-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 animate-gradient-x">
      <Menu />
      <Card className="w-full max-w-4xl mx-auto flex-1 flex flex-col shadow-2xl border-2 border-blue-200 dark:border-gray-800 mt-8">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-center text-blue-900 dark:text-white tracking-tight drop-shadow-lg">
            Chat Playground
            <span className="ml-2 text-2xl" role="img" aria-label="chat">
              💬
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4">
          {errorMessage && (
            <div
              className="bg-red-100 text-red-800 p-4 rounded mb-2 border border-red-300 flex flex-col animate-shake shadow-lg"
              role="alert"
              aria-live="assertive"
              tabIndex={0}
            >
              <div className="flex items-center justify-between w-full">
                <span className="flex-1">{errorMessage}</span>
                <button
                  className="ml-4 underline text-blue-600 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
                  onClick={handleSendMessage}
                  aria-label="Retry sending message"
                >
                  Retry
                </button>
              </div>
              {isLocalhost && (
                <div className="mt-2 text-sm text-blue-700 bg-blue-50 rounded p-2 border border-blue-200">
                  <span role="img" aria-label="llama">
                    🦙
                  </span>{' '}
                  If you&apos;re running locally, don&apos;t forget to run{' '}
                  <span className="font-mono font-bold">yarn llama</span> in
                  your terminal to start Ollama. Otherwise, the AI will just
                  stare blankly into the void!
                </div>
              )}
            </div>
          )}
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
              className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow"
              aria-label="Choose LLM"
            >
              {LLM_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <ScrollArea className="flex-1 p-4 border rounded-lg bg-white/70 dark:bg-gray-900/70 shadow-inner">
            <div className="space-y-4">
              {chatStore.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl shadow-lg transition-all duration-300 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white border-2 border-blue-300'
                        : 'bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700'
                    } animate-fade-in`}
                    dir={isRTL(message.text) ? 'rtl' : 'ltr'}
                  >
                    <p className="text-base leading-relaxed">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isBotTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 dark:bg-gray-800 opacity-70 animate-pulse">
                    <p className="italic text-gray-500 dark:text-gray-300">
                      Bot is typing…
                    </p>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>
          <div className="flex gap-2 mt-2">
            <Input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 border-2 border-blue-200 dark:border-gray-700 shadow focus:ring-2 focus:ring-blue-400"
              aria-label="Type your message"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isBotTyping}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

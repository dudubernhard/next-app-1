import { makeAutoObservable } from 'mobx';

export type ChatMessage = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

class ChatStore {
  messages: ChatMessage[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addMessage(message: ChatMessage) {
    this.messages.push(message);
  }

  clearMessages() {
    this.messages = [];
  }
}

export const chatStore = new ChatStore(); 
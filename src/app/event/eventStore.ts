import { makeAutoObservable } from 'mobx';

export type EventType =
  | 'meeting'
  | 'party'
  | 'reminder'
  | 'conference'
  | 'other';

export type Event = {
  id: number;
  title: string;
  description: string;
  date: string; // ISO string
  location: string;
  createdBy: string;
  type: EventType;
};

class EventStore {
  events: Event[] = [
    {
      id: 1,
      title: 'Next.js Conference',
      description:
        'A conference about all things Next.js. Come for the code, stay for the coffee.',
      date: '2024-09-15',
      location: 'Tel Aviv',
      createdBy: 'Dudu',
      type: 'conference',
    },
    {
      id: 2,
      title: 'React Summit',
      description: 'React, React, and more React. And maybe some pizza.',
      date: '2024-10-10',
      location: 'Amsterdam',
      createdBy: 'Dudu',
      type: 'conference',
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addEvent(event: Event) {
    this.events.push(event);
  }

  removeEvent(id: number) {
    this.events = this.events.filter((e) => e.id !== id);
  }

  clearEvents() {
    this.events = [];
  }
}

export const eventStore = new EventStore();

'use client';
import { observer } from 'mobx-react-lite';
import { eventStore, Event, EventType } from '@/app/event/eventStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState, useRef } from 'react';

const Events = observer(() => {
  const [eventForm, setEventForm] = useState<Partial<Event>>({
    title: '',
    description: '',
    date: '',
    location: '',
    createdBy: 'Dudu',
    type: 'meeting',
  });
  const [eventError, setEventError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleEventInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setEventForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (eventError) setEventError(null);
  };

  const handleAddEvent = () => {
    if (!eventForm.title || !eventForm.date || !eventForm.location) {
      setEventError('Title, date, and location are required!');
      return;
    }
    eventStore.addEvent({
      id: Date.now(),
      title: eventForm.title!,
      description: eventForm.description || '',
      date: eventForm.date!,
      location: eventForm.location!,
      createdBy: eventForm.createdBy || 'Dudu',
      type: (eventForm.type as EventType) || 'other',
    });
    setEventForm({
      title: '',
      description: '',
      date: '',
      location: '',
      createdBy: 'Dudu',
      type: 'meeting',
    });
    setEventError(null);
    setShowModal(false);
  };

  // Close modal on overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex-1 flex flex-col mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-900 dark:text-white">
            Events
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eventStore.events.length === 0 ? (
              <div className="col-span-2 text-center text-gray-500 dark:text-gray-300">
                No events yet. Be the first to add one! 🎉
              </div>
            ) : (
              eventStore.events.map((event) => (
                <Card
                  key={event.id}
                  className="bg-white dark:bg-gray-800 shadow hover:scale-105 transition-transform"
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                      {event.title}
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-0.5 rounded-full ml-2">
                        {event.type}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-gray-700 dark:text-gray-200 mb-2">
                      {event.description}
                    </div>
                    <div className="flex flex-col gap-1 text-sm">
                      <span>
                        <strong>Date:</strong> {event.date}
                      </span>
                      <span>
                        <strong>Location:</strong> {event.location}
                      </span>
                      <span>
                        <strong>Created By:</strong> {event.createdBy}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      {/* Floating + Button */}
      <Button
        className="fixed bottom-8 right-8 z-50 rounded-full w-16 h-16 text-4xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="Add Event"
        onClick={() => setShowModal(true)}
      >
        +
      </Button>
      {/* Modal */}
      {showModal && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={handleOverlayClick}
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-lg relative animate-fade-in-up">
            <button
              className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
              aria-label="Close"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-blue-900 dark:text-white text-center">
              Create Event
            </h2>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddEvent();
              }}
              aria-label="Add new event"
            >
              <Input
                name="title"
                value={eventForm.title}
                onChange={handleEventInputChange}
                placeholder="Event Title"
                aria-label="Event Title"
                required
              />
              <Input
                name="date"
                type="date"
                value={eventForm.date}
                onChange={handleEventInputChange}
                aria-label="Event Date"
                required
              />
              <Input
                name="location"
                value={eventForm.location}
                onChange={handleEventInputChange}
                placeholder="Location"
                aria-label="Event Location"
                required
              />
              <select
                name="type"
                value={eventForm.type}
                onChange={handleEventInputChange}
                className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Event Type"
              >
                <option value="meeting">Meeting</option>
                <option value="party">Party</option>
                <option value="reminder">Reminder</option>
                <option value="conference">Conference</option>
                <option value="other">Other</option>
              </select>
              <Textarea
                name="description"
                value={eventForm.description}
                onChange={handleEventInputChange}
                placeholder="Description (optional, but make it fun!)"
                className="md:col-span-2"
                aria-label="Event Description"
                rows={2}
              />
              <Input
                name="createdBy"
                value={eventForm.createdBy}
                onChange={handleEventInputChange}
                placeholder="Created By"
                aria-label="Created By"
                className="md:col-span-2"
              />
              <Button type="submit" className="md:col-span-2">
                Add Event
              </Button>
            </form>
            {eventError && (
              <div
                className="bg-red-100 text-red-800 p-2 rounded border border-red-300 animate-shake mt-4"
                role="alert"
                aria-live="assertive"
                tabIndex={0}
              >
                {eventError} (Don&apos;t worry, we all forget things sometimes!)
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default Events;

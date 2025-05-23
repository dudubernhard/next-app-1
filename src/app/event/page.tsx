import Menu from '@/components/Menu';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const events = [
  { id: 1, name: 'Next.js Conference', date: '2024-09-15' },
  { id: 2, name: 'React Summit', date: '2024-10-10' },
  { id: 3, name: 'Frontend Masters Meetup', date: '2024-11-05' },
];

const EventPage = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
    <Menu />
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <Card className="w-full max-w-xl shadow-xl">
        <CardHeader className="items-center">
          <CardTitle className="text-3xl md:text-4xl font-bold text-center text-blue-900 dark:text-white mb-2">
            Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="w-full">
            {events.map((event) => (
              <li
                key={event.id}
                className="bg-white dark:bg-gray-800 rounded px-4 py-3 mb-3 shadow flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-medium">{event.name}</span>
                <span className="text-gray-500 text-sm mt-1 sm:mt-0">
                  {event.date}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default EventPage;

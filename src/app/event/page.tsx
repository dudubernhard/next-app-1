import Menu from '@/components/Menu';
import Events from '@/components/Events';

const EventPage = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
    <Menu />
    <Events />
  </div>
);

export default EventPage;

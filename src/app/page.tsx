import Menu from '@/components/Menu';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <Menu />
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-xl shadow-xl">
          <CardHeader className="items-center">
            <CardTitle className="text-4xl md:text-6xl font-bold text-center text-blue-900 dark:text-white mb-2">
              Welcome to Your Next.js App
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="text-lg md:text-xl text-center text-blue-700 dark:text-gray-300 mb-6 max-w-2xl">
              Build modern, beautiful web experiences with Next.js, TailwindCSS,
              and Shadcn. Start customizing your project now!
            </p>
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
              alt="A beautiful mountain landscape with a lake and forest"
              width={900}
              height={600}
              className="w-full max-w-lg rounded-2xl shadow-lg border border-blue-100 dark:border-gray-800"
              priority
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

'use client';
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'To Do List', href: '/todo' },
  { label: 'Events', href: '/event' },
];

const Menu = () => {
  const pathname = usePathname();
  return (
    <Menubar className="w-full flex justify-center mb-8">
      {menuItems.map((item) => (
        <MenubarMenu key={item.href}>
          <MenubarTrigger asChild>
            <Link
              href={item.href}
              className={`px-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm font-medium ${
                pathname === item.href
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-blue-100 dark:hover:bg-blue-900'
              }`}
              tabIndex={0}
              aria-label={item.label}
            >
              {item.label}
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
      ))}
    </Menubar>
  );
};

export default Menu;

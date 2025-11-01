import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { BookOpen, Folder, LayoutGrid, Users } from 'lucide-react';

export const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: dashboard(),
    icon: LayoutGrid,
  },
  {
    title: 'Users',
    href: '/users',
    icon: Users,
    items: [
      {
        title: 'Manage Users',
        href: '/users',
        icon: null,
      },
      {
        title: 'New User',
        href: '/users/create',
        icon: null,
      },
    ],
  },
];

export const footerNavItems: NavItem[] = [
  {
    title: 'Repository',
    href: 'https://github.com/laravel/react-starter-kit',
    icon: Folder,
  },
  {
    title: 'Documentation',
    href: 'https://laravel.com/docs/starter-kits#react',
    icon: BookOpen,
  },
];

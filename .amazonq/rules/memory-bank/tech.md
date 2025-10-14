# Laravel React Starter Kit - Technology Stack

## Core Technologies

### Backend Framework
- **Laravel 12.0** - PHP web application framework
- **PHP 8.2+** - Server-side programming language
- **Inertia.js Laravel 2.0** - Server-side adapter for seamless SPA experience

### Frontend Framework
- **React 19.0** - JavaScript library for building user interfaces
- **React DOM 19.0** - React renderer for web browsers
- **TypeScript 5.7.2** - Typed superset of JavaScript

### Build System & Development
- **Vite 7.0.4** - Next-generation frontend build tool
- **Laravel Vite Plugin 2.0** - Laravel integration for Vite
- **@vitejs/plugin-react 4.6.0** - React support for Vite

## UI & Styling

### Component Library
- **shadcn/ui 3.2.1** - Re-usable component library built on Radix UI
- **Radix UI Components** - Unstyled, accessible UI primitives:
  - Avatar, Checkbox, Dialog, Dropdown Menu, Label, Select, Tooltip, etc.
- **Lucide React 0.475.0** - Beautiful & consistent icon library

### Styling Framework
- **Tailwind CSS 4.0.0** - Utility-first CSS framework
- **@tailwindcss/vite 4.1.11** - Vite integration for Tailwind CSS
- **tailwindcss-animate 1.0.7** - Animation utilities for Tailwind
- **tailwind-merge 3.0.1** - Utility for merging Tailwind CSS classes

### Utility Libraries
- **class-variance-authority 0.7.1** - Component variant management
- **clsx 2.1.1** - Conditional className utility
- **cmdk 1.1.1** - Command palette component

## Backend Dependencies

### Laravel Ecosystem
- **Laravel Framework 12.0** - Core framework
- **Laravel Tinker 2.10.1** - REPL for Laravel
- **Laravel Wayfinder 0.1.9** - Route generation and management
- **Laravel Pail 1.2.2** - Log viewer
- **Laravel Sail 1.41** - Docker development environment

### Authentication & Security
- **Firebase PHP-JWT 6.11** - JSON Web Token implementation

### Development Tools
- **Laravel Debugbar** - Debug toolbar for development
- **Laravel Pint 1.18** - PHP code style fixer
- **Pest 4.0** - Testing framework for PHP
- **Pest Laravel Plugin 4.0** - Laravel-specific testing utilities

## Development Tools & Code Quality

### Linting & Formatting
- **ESLint 9.17.0** - JavaScript/TypeScript linting
- **@eslint/js 9.19.0** - ESLint JavaScript configurations
- **typescript-eslint 8.23.0** - TypeScript-specific ESLint rules
- **eslint-plugin-react 7.37.3** - React-specific ESLint rules
- **eslint-plugin-react-hooks 5.1.0** - React Hooks ESLint rules
- **eslint-config-prettier 10.0.1** - Prettier integration for ESLint

### Code Formatting
- **Prettier 3.4.2** - Code formatter
- **prettier-plugin-organize-imports 4.1.0** - Import organization
- **prettier-plugin-tailwindcss 0.6.11** - Tailwind class sorting

### Type Checking
- **@types/react 19.0.3** - React type definitions
- **@types/react-dom 19.0.2** - React DOM type definitions
- **@types/node 22.13.5** - Node.js type definitions

## Development Commands

### Frontend Development
```bash
npm run dev          # Start Vite development server
npm run build        # Build for production
npm run build:ssr    # Build with server-side rendering
npm run watch        # Watch mode for development
npm run format       # Format code with Prettier
npm run lint         # Lint and fix code with ESLint
npm run types        # Type check with TypeScript
```

### Backend Development
```bash
composer dev         # Start full development environment
composer dev:ssr     # Start with SSR support
composer test        # Run PHP tests
php artisan serve    # Start Laravel development server
php artisan migrate  # Run database migrations
```

### Integrated Development
- **Concurrently 9.0.1** - Run multiple commands simultaneously
- **Nodemon** - File watching for automatic rebuilds

## Database & Storage

### Database Support
- **SQLite** - Default development database (database.sqlite)
- **MySQL/PostgreSQL** - Production database options through Laravel configuration

### Testing Database
- **In-memory SQLite** - Fast testing database for unit/feature tests

## Production Optimizations

### Asset Optimization
- **Vite Build Optimization** - Tree shaking, code splitting, minification
- **Tailwind CSS Purging** - Unused CSS removal in production
- **TypeScript Compilation** - Type checking and transpilation

### Server Requirements
- **PHP 8.2+** - Minimum PHP version requirement
- **Composer** - PHP dependency management
- **Node.js** - Frontend build tools and development server

### Optional Dependencies
- **@rollup/rollup-linux-x64-gnu 4.9.5** - Linux-specific Rollup binary
- **@tailwindcss/oxide-linux-x64-gnu 4.0.1** - Linux-specific Tailwind binary
- **lightningcss-linux-x64-gnu 1.29.1** - Linux-specific CSS processing

## Environment Configuration

### Development Environment
- **Hot Module Replacement (HMR)** - Instant feedback during development
- **Source Maps** - Debugging support for TypeScript and CSS
- **Error Overlay** - Development error reporting

### Production Environment
- **Asset Versioning** - Cache busting for static assets
- **Code Splitting** - Optimized bundle loading
- **Compression** - Gzip/Brotli compression support
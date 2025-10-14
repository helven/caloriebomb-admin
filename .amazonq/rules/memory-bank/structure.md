# Laravel React Starter Kit - Project Structure

## Root Directory Organization

### Core Application Directories
- **`app/`** - Laravel application logic (Models, Controllers, Middleware, Providers)
- **`resources/`** - Frontend assets and views (React components, CSS, Blade templates)
- **`routes/`** - Application routing definitions (web, auth, console, settings)
- **`config/`** - Laravel configuration files for all services and features
- **`database/`** - Database migrations, seeders, and factories

### Development & Build
- **`public/`** - Web server document root with compiled assets
- **`storage/`** - Application storage (logs, cache, sessions, uploads)
- **`vendor/`** - Composer dependencies (Laravel ecosystem packages)
- **`tests/`** - Test suites (Feature and Unit tests using Pest)
- **`bootstrap/`** - Application bootstrap files and service cache

### Documentation & Configuration
- **`docs/`** - Project documentation and guides
- **`.github/workflows/`** - CI/CD pipelines for linting and testing
- **`.amazonq/rules/memory-bank/`** - AI assistant memory bank for project context

## Frontend Architecture (`resources/js/`)

### Component Organization
```
resources/js/
├── components/          # Reusable UI components
│   └── ui/             # shadcn/ui component library
├── layouts/            # Page layout components
├── pages/              # Page-specific components (Inertia pages)
├── types/              # TypeScript type definitions
├── lib/                # Utility functions and configurations
├── hooks/              # Custom React hooks
├── actions/            # Client-side actions and API calls
├── routes/             # Route-specific logic and utilities
└── wayfinder/          # Laravel Wayfinder integration
```

### Key Frontend Patterns
- **Page Components**: Located in `pages/` directory, correspond to Laravel routes
- **Layout System**: Centralized layouts in `layouts/` for consistent page structure
- **UI Components**: shadcn/ui based components in `components/ui/` for design consistency
- **Type Safety**: Comprehensive TypeScript definitions in `types/` directory

## Backend Architecture (`app/`)

### Laravel Application Structure
```
app/
├── Http/
│   ├── Controllers/    # Request handling and business logic
│   ├── Middleware/     # Request/response filtering
│   └── Requests/       # Form request validation
├── Models/             # Eloquent models and database interactions
├── Plugins/            # Custom application plugins
│   └── Auth/          # Authentication-related plugins
└── Providers/          # Service providers for dependency injection
```

### Database Layer (`database/`)
- **Migrations**: Version-controlled database schema changes
- **Seeders**: Database population for development and testing
- **Factories**: Model factories for testing and development data

## Configuration & Environment

### Build System
- **`vite.config.ts`** - Vite configuration for asset building and HMR
- **`tsconfig.json`** - TypeScript compiler configuration
- **`tailwind.config.js`** - Tailwind CSS configuration (implied by usage)
- **`components.json`** - shadcn/ui component configuration

### Code Quality
- **`eslint.config.js`** - ESLint configuration for JavaScript/TypeScript linting
- **`.prettierrc`** - Prettier configuration for code formatting
- **`phpunit.xml`** - PHP unit testing configuration
- **`Pest.php`** - Pest testing framework configuration

## Architectural Patterns

### Inertia.js Integration
- **Server-Side Rendering**: Optional SSR support through `ssr.tsx`
- **Page Props**: Data passed from Laravel controllers to React components
- **Form Handling**: Inertia's useForm hook for seamless form submissions
- **Navigation**: SPA-like navigation without full page reloads

### Component Architecture
- **Atomic Design**: UI components built with shadcn/ui following atomic design principles
- **Composition**: Higher-order components and hooks for shared functionality
- **Type Safety**: Props and state fully typed with TypeScript interfaces

### Laravel Patterns
- **MVC Architecture**: Traditional Model-View-Controller pattern with Inertia as the view layer
- **Service Providers**: Dependency injection and service binding
- **Middleware**: Request filtering and authentication
- **Eloquent ORM**: Database interactions through Laravel's ORM

## Development Workflow

### Asset Pipeline
1. **Development**: Vite dev server with HMR for instant feedback
2. **Building**: Vite build process for production optimization
3. **Watching**: File watching for automatic rebuilds during development

### Testing Strategy
- **Backend**: Pest PHP for feature and unit testing
- **Frontend**: TypeScript compilation for type checking
- **Integration**: Full-stack testing through Laravel's testing tools

### Deployment Structure
- **Environment Configuration**: `.env` files for environment-specific settings
- **Asset Compilation**: Production builds through Vite
- **Server Configuration**: Apache/Nginx configuration through `.htaccess`
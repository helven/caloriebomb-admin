# Laravel React Starter Kit - Development Guidelines

## Code Quality Standards

### Import Organization (5/5 files follow this pattern)
**Strict 6-section import structure** - All React/TypeScript files must follow this exact order:
```typescript
// ============================================================================
// 1 REACT & CORE IMPORTS
// ============================================================================
// 1.1 React and React ecosystem imports
import { useState, FormEvent } from 'react'
import { Head, useForm } from '@inertiajs/react';

// 1.2 Third-party libraries
// (e.g., lodash, date-fns, axios, etc.)

// 1.3 Asset imports (data, stores, constants)
// (e.g., mockData, stores, constants)

// 1.4 Project services and utilities
// (e.g., API services, custom hooks, utilities)

// ============================================================================
// 2 LAYOUT & COMPONENT IMPORTS
// ============================================================================
// 2.1 Layout components
import AppLayout from '@/layouts/app-layout';

// 2.2. Feature/page-specific components
// (e.g., UserCard, UserModal, etc.)

// ============================================================================
// 3 ICON IMPORTS
// ============================================================================
// 3.1 Icon imports

// 3.2 Image/media imports
// (e.g., import logo from '@/assets/logo.png')

// ============================================================================
// 4 TYPE IMPORTS
// ============================================================================
// 4.1 Type imports
import { type CommonData, type BreadcrumbItem, type User } from '@/types';

// ============================================================================
// 5 TYPE DEFINITIONS
// ============================================================================
interface Props {
  user: User;
  statuses: Array<{ id: number; name: string }>;
  [key: string]: CommonData;
}

// ============================================================================
// 6 CONSTANTS & STATIC DATA
// ============================================================================
```

### TypeScript Standards (4/5 files demonstrate)
- **Explicit type imports**: Use `import { type TypeName }` syntax for type-only imports
- **Interface definitions**: Define Props interfaces for all components with clear property types
- **Generic type constraints**: Use proper generic constraints like `<T extends Record<string, unknown>>`
- **Union types**: Leverage union types for method definitions: `Method | Method[]`
- **Optional parameters**: Use `?` for optional properties and parameters consistently

### Naming Conventions (5/5 files follow)
- **PascalCase**: Component names, interface names, type names
- **camelCase**: Function names, variable names, property names
- **SCREAMING_SNAKE_CASE**: Constants and configuration values
- **kebab-case**: CSS classes, file paths, HTML attributes
- **Descriptive naming**: Functions like `handleFormSubmit`, `toggleSidebar`, `applyUrlDefaults`

## Component Architecture Patterns

### React Component Structure (3/3 React files follow)
**Standard component organization**:
1. **Imports** (following 6-section structure above)
2. **Type definitions** (Props, FormData interfaces)
3. **Constants** (component-level constants)
4. **Main component function** with destructured props
5. **Hook usage** (useForm, useState, useCallback, useMemo)
6. **Event handlers** (prefixed with `handle`)
7. **JSX return** with semantic HTML structure

### Hook Usage Patterns (3/3 React files demonstrate)
- **Inertia.js forms**: `const { data, setData, put, processing, errors, reset } = useForm<FormData>()`
- **State management**: `const [state, setState] = useState(defaultValue)`
- **Memoization**: `const contextValue = React.useMemo(() => ({ ... }), [dependencies])`
- **Callbacks**: `const toggleSidebar = React.useCallback(() => { ... }, [dependencies])`

### Context Pattern (1/1 context file follows)
```typescript
// Context definition with null check
const SidebarContext = React.createContext<SidebarContext | null>(null)

// Custom hook with error handling
function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}
```

## Laravel Backend Patterns

### Configuration Structure (2/2 PHP files follow)
- **Environment-driven**: All configuration uses `env()` function with sensible defaults
- **Array return**: Configuration files return associative arrays with clear section comments
- **Comprehensive coverage**: Support multiple database drivers (sqlite, mysql, mariadb, pgsql, sqlsrv)
- **Service provider registration**: Automatic service discovery with proper eager/deferred loading

### Route Generation (1/1 route file demonstrates)
**Laravel Wayfinder integration**:
- **Type-safe routes**: Generated TypeScript definitions with proper method constraints
- **Multiple HTTP methods**: Support for GET, POST, PUT, PATCH, DELETE, HEAD
- **Parameter handling**: Automatic parameter parsing and URL building
- **Form helpers**: Dedicated form action generators for HTML forms
- **Query parameter support**: Built-in query string handling with merge capabilities

## UI/UX Development Standards

### shadcn/ui Integration (1/1 UI component follows)
- **Radix UI foundation**: All components built on Radix UI primitives for accessibility
- **Class Variance Authority**: Use `cva()` for component variant management
- **Tailwind CSS**: Utility-first styling with consistent design tokens
- **Compound components**: Export multiple related components from single files
- **Data attributes**: Use `data-*` attributes for component state and styling hooks

### Responsive Design (3/3 frontend files demonstrate)
- **Mobile-first**: Design for mobile, enhance for desktop
- **Breakpoint usage**: `md:`, `lg:` prefixes for responsive behavior
- **Grid layouts**: `grid-cols-1 md:grid-cols-2` patterns for responsive grids
- **Flexible spacing**: Use Tailwind spacing scale consistently

## Error Handling & Validation

### Form Validation (2/2 form files follow)
- **Inertia.js errors**: Use `errors` object from useForm hook
- **Visual feedback**: Apply error styles with conditional classes: `className={errors.field ? 'border-red-500' : ''}`
- **Error messages**: Display validation errors below form fields
- **Required field indicators**: Use asterisk (*) for required fields

### Type Safety (4/4 TypeScript files demonstrate)
- **Strict null checks**: Handle undefined/null values explicitly
- **Parameter validation**: Validate route parameters before URL generation
- **Generic constraints**: Use proper type constraints for reusable functions
- **Error boundaries**: Implement proper error handling in components

## Performance Optimization

### Code Splitting (2/2 build files support)
- **Dynamic imports**: Use dynamic imports for route-based code splitting
- **Lazy loading**: Implement lazy loading for non-critical components
- **Bundle optimization**: Vite configuration for optimal bundle sizes

### State Management (3/3 stateful components follow)
- **Minimal re-renders**: Use React.memo, useMemo, useCallback appropriately
- **Local state first**: Prefer local component state over global state
- **Context optimization**: Memoize context values to prevent unnecessary re-renders

## Development Workflow Standards

### File Organization (5/5 files demonstrate)
- **Feature-based structure**: Group related files by feature/domain
- **Clear separation**: Separate concerns (components, types, utilities, routes)
- **Consistent naming**: Follow established naming conventions across all file types
- **Index files**: Use index files for clean imports and exports

### Code Documentation (4/4 documented files follow)
- **JSDoc comments**: Document complex functions with proper JSDoc syntax
- **Inline comments**: Use comments to explain business logic and complex operations
- **Type annotations**: Comprehensive TypeScript annotations for all public APIs
- **README documentation**: Maintain up-to-date documentation for setup and usage

### Testing Considerations (Based on project structure)
- **Component testing**: Test React components in isolation
- **Integration testing**: Test full user workflows with Laravel Feature tests
- **Type checking**: Use TypeScript compiler for static analysis
- **Code quality**: Enforce standards with ESLint and Prettier

## Security Best Practices

### Authentication & Authorization (2/2 auth-related files follow)
- **CSRF protection**: Laravel's built-in CSRF protection for forms
- **Type-safe routes**: Prevent route manipulation through TypeScript constraints
- **Input validation**: Server-side validation for all user inputs
- **Secure defaults**: Use secure configuration defaults throughout

### Data Handling (3/3 data files demonstrate)
- **Sanitized output**: Proper escaping of user-generated content
- **Type validation**: Runtime type checking for critical data flows
- **Environment variables**: Sensitive configuration through environment variables
- **Database security**: Parameterized queries through Eloquent ORM
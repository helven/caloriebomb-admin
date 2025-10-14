// ============================================================================
// 1 REACT & CORE IMPORTS
// ============================================================================
// 1.1 React and React ecosystem imports

// 1.2 Third-party libraries
// (none)

// 1.3 Asset imports (data, stores, constants)
// (none)

// 1.4 Project services and utilities
// (none)

// ============================================================================
// 2 LAYOUT & COMPONENT IMPORTS
// ============================================================================
// 2.1 Layout components
// (none)

// 2.2 Feature/page-specific components
// (none)

// ============================================================================
// 3 ICON IMPORTS
// ============================================================================
// 3.1 Icon imports
import { Check, Trash2, Undo2, X } from 'lucide-react';

// 3.2 Image/media imports
// (none)

// ============================================================================
// 4 TYPE IMPORTS
// ============================================================================
// 4.1 Type imports
// (none)

// ============================================================================
// 5 TYPE DEFINITIONS
// ============================================================================
// 5.1 Interface definitions
// (none)

// 5.2 Type aliases
interface Props {
  actionType: 'activate' | 'deactivate' | 'delete' | 'restore';
  onClick: () => void;
}

// 5.4 Enums
// (none)

// ============================================================================
// 6 CONSTANTS & STATIC DATA
// ============================================================================
// 6.1 Static configurations, breadcrumbs, navigation items
// (none)

// 6.2 External data that doesn't change during render
// (none)

function ActionButton({ actionType, onClick }: Props) {
  // ============================================================================
  // 1 CONSTANTS & STATIC DATA
  // ============================================================================

  // ============================================================================
  // 2 STATE DECLARATIONS
  // ============================================================================

  // ============================================================================
  // 3 DERIVED DATA & COMPUTED VALUES
  // ============================================================================

  // ============================================================================
  // 4 UTILITY FUNCTIONS
  // ============================================================================

  // ============================================================================
  // 5 EVENT HANDLERS
  // ============================================================================

  // ============================================================================
  // 6 EFFECTS & SIDE EFFECTS
  // ============================================================================

  // ============================================================================
  // 7 RENDER
  // ============================================================================
  return (
    <button
      className={`flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
        actionType === 'activate'
          ? 'text-green-600'
          : actionType === 'deactivate'
            ? 'text-yellow-600'
            : actionType === 'delete'
              ? 'text-red-600'
              : ''
      }`}
      onClick={onClick}
    >
      {actionType === 'activate' && (
        <>
          <Check className="mr-2 h-4 w-4" /> Activate
        </>
      )}
      {actionType === 'deactivate' && (
        <>
          <X className="mr-2 h-4 w-4" /> Deactivate
        </>
      )}
      {actionType === 'delete' && (
        <>
          <Trash2 className="mr-2 h-4 w-4" /> Move to Trash
        </>
      )}
      {actionType === 'restore' && (
        <>
          <Undo2 className="mr-2 h-4 w-4" /> Restore
        </>
      )}
    </button>
  );
}

export { ActionButton };

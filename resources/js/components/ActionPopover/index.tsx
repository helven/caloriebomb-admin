// ============================================================================
// 1 REACT & CORE IMPORTS
// ============================================================================
// 1.1 React and React ecosystem imports
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

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
import { ActionButton } from '@/components/ActionPopover/actionbutton';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// ============================================================================
// 3 ICON IMPORTS
// ============================================================================
// 3.1 Icon imports
import { Edit, EllipsisVertical } from 'lucide-react';

// 3.2 Image/media imports
// (none)

// ============================================================================
// 4 TYPE IMPORTS
// ============================================================================
// 4.1 Type imports
import { type CommonData } from '@/types';

// ============================================================================
// 5 TYPE DEFINITIONS
// ============================================================================
// 5.1 Interface definitions
interface Props {
  item: Record<string, unknown>;
  actions?: {
    [key: string]: CommonData;
  };
}

interface ActionConfig {
  endpoint: string;
  message: string;
}

// 5.2 Type aliases
// (none)

// 5.4 Enums
// (none)

// ============================================================================
// 6 CONSTANTS & STATIC DATA
// ============================================================================
// 6.1 Static configurations, breadcrumbs, navigation items
const ACTION_CONFIGS: Record<string, ActionConfig> = {
  activate: {
    endpoint: 'activate',
    message: 'Are you sure you want to activate this item?',
  },
  deactivate: {
    endpoint: 'deactivate',
    message: 'Are you sure you want to deactivate this item?',
  },
  delete: {
    endpoint: 'trash',
    message: 'Are you sure you want to delete this item?',
  },
  restore: {
    endpoint: 'restore-trash',
    message: 'Are you sure you want to restore this item?',
  },
};

const ACTIONS_NEEDS_CONFIRMATION: Array<string> = ['duplicate', 'delete', 'restore'];
// 6.2 External data that doesn't change during render
// (none)

function ActionPopover({ item, actions }: Props) {
  // ============================================================================
  // 1 CONSTANTS & STATIC DATA
  // ============================================================================

  // ============================================================================
  // 2 STATE DECLARATIONS
  // ============================================================================
  const [popOverOpen, setPopOverOpen] = useState(false);

  // ============================================================================
  // 3 DERIVED DATA & COMPUTED VALUES
  // ============================================================================

  // ============================================================================
  // 4 UTILITY FUNCTIONS
  // ============================================================================

  // ============================================================================
  // 5 EVENT HANDLERS
  // ============================================================================
  const handleActionButtonClick = (actionType: string) => {
    const config = ACTION_CONFIGS[actionType];
    const customMessage = actions?.[`${actionType}Message`] as string;
    const message = customMessage || config.message;

    const needsConfirmation = ACTIONS_NEEDS_CONFIRMATION.includes(actionType);

    if (!needsConfirmation || confirm(message)) {
      setPopOverOpen(false);
      router.patch(
        `/users/${item.id}/${config.endpoint}`,
        {},
        {
          onSuccess: () => {},
          onError: (errors) => {},
        },
      );
    }
  };
  // ============================================================================
  // 6 EFFECTS & SIDE EFFECTS
  // ============================================================================

  // ============================================================================
  // 7 RENDER
  // ============================================================================
  return (
    <Popover open={popOverOpen} onOpenChange={setPopOverOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-0" align="end">
        <div className="py-1">
          {actions?.edit && (
            <Link href={(actions?.editHref as string) || '#'}>
              <button className="flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </button>
            </Link>
          )}
          {/*<button 
            className="flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={handleCopyButtonClick}
          >
            <Copy className="mr-2 h-4 w-4" />
            Make a copy
          </button>
          <button className="flex w-full items-center px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
            <Heart className="mr-2 h-4 w-4" />
            Favorite
          </button>*/}
          <hr className="my-1" />
          {actions?.duplicate && (
            <ActionButton actionType="activate" onClick={() => handleActionButtonClick('duplicate')} />
          )}
          {actions?.activate && item.status_id == 2 && (
            <ActionButton actionType="activate" onClick={() => handleActionButtonClick('activate')} />
          )}
          {actions?.deactivate && item.status_id == 1 && (
            <ActionButton actionType="deactivate" onClick={() => handleActionButtonClick('deactivate')} />
          )}
          {actions?.delete && item.status_id != 99 && (
            <ActionButton actionType="delete" onClick={() => handleActionButtonClick('delete')} />
          )}
          {actions?.restore && item.status_id == 99 && (
            <ActionButton actionType="restore" onClick={() => handleActionButtonClick('restore')} />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { ActionPopover };

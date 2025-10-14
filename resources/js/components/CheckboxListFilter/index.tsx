// ============================================================================
// 1 REACT & CORE IMPORTS
// ============================================================================
// 1.1 React and React ecosystem imports
import { useState, useEffect } from "react"

// 1.2 Third-party libraries
// (none)

// 1.3 Asset imports (data, stores, constants)
// (none)

// 1.4 Project services and utilities
import { cn } from "@/lib/utils"

// ============================================================================
// 2 LAYOUT & COMPONENT IMPORTS
// ============================================================================
// 2.1 Layout components
// (none)

// 2.2 Feature/page-specific components
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Checkbox } from "@/components/ui/checkbox"

// ============================================================================
// 3 ICON IMPORTS
// ============================================================================
// 3.1 Icon imports
import { X, CirclePlus } from "lucide-react"

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
interface CheckboxListFilterProps {
  listItems?: Array<{ value: string; label: string; count: number | null }>
  label?: string
  values?: string[]
  onChange?: (values: string[]) => void | undefined
}

// ============================================================================
// 6 CONSTANTS & STATIC DATA
// ============================================================================
// (none)

const CheckboxListFilter = ({
  listItems = [],
  label = "",
  values = [],
  onChange
}: CheckboxListFilterProps) => {
  // ============================================================================
  // 1 CONSTANTS & STATIC DATA
  // ============================================================================
  // [code constants & static data goes here]

  // ============================================================================
  // 2 STATE DECLARATIONS
  // ============================================================================
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [selectedValues, setSelectedValues] = useState<string[]>(values)
  
  // ============================================================================
  // 3 DERIVED DATA & COMPUTED VALUES
  // ============================================================================
  const selectedItems = listItems.filter((item) => {
    return selectedValues.includes(item.value)
  });

  // ============================================================================
  // 4 UTILITY FUNCTIONS
  // ============================================================================
  const updateSelectedValues = (values: string[]): void => {
    setSelectedValues(values)
    onChange?.(values)
  }

  // ============================================================================
  // 5 EVENT HANDLERS
  // ============================================================================
  const handleCheckboxToggle = (isChecked: boolean, value: string) => {
    updateSelectedValues(
      isChecked ?
        [...selectedValues, value] // include value
        : // else
        selectedValues.filter((selectedValue) => selectedValue !== value) // remove value
    )
  }

  const handleRemoveButtonClick = (value: string) => {
    updateSelectedValues(selectedValues.filter((selectedValue) => selectedValue !== value));
  }

  const handleClearAllButtonClick = () => {
    updateSelectedValues([]);
  }

  // ============================================================================
  // 6 EFFECTS & SIDE EFFECTS
  // ============================================================================
  useEffect(() => {
    setSelectedValues(values)
  }, [values.join(",")]);

  // ============================================================================
  // 7 RENDER
  // ============================================================================
  return (
    <div className="flex">
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <div className={cn(`flex items-center bg-background shadow-xs gap-2 p-1 border border-dashed rounded-md cursor-pointer transition-all duration-200 hover:bg-accent`, `${selectedValues.length > 0 ? 'pr-1' : ''}`)}>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={popoverOpen}
              className={` h-6 bg-transparent border-0 shadow-none cursor-pointer justify-start hover:bg-transparent ${selectedValues.length > 0 ? 'mr-0' : ''}`}
            >
              <CirclePlus />
              {label}
            </Button>

            {(selectedValues.length >= 1) ? <Separator orientation="vertical" className="mr-0 data-[orientation=vertical]:h-4" /> : ''}

            {/* chips to the right of the button */}
            {
              (selectedValues.length > 2) ? (
                <Badge variant="secondary" className="flex items-center h-6 gap-1 px-2">{selectedValues.length} selected</Badge>
              ) : (
                selectedItems.map((selectedItem, index) => {
                  return (
                    <Badge key={selectedItem.value} variant="secondary" className="flex items-center gap-1 h-6 px-2">
                      {selectedItem.label}
                      <button
                        type="button"
                        aria-label={`Remove ${selectedItem.label}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveButtonClick(selectedItem.value);
                        }}
                        className="cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </Badge>
                  )
                })
              )
            }
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[260px] p-0" align="start" side="bottom">
          <Command>
            <CommandInput placeholder={`Search ${label}...`} />
            <CommandList>
              <CommandEmpty>No {label} found.</CommandEmpty>

              <CommandGroup>
                {listItems.map((item) => {
                  const isChecked = selectedValues.includes(item.value)
                  return (
                    <CommandItem
                      key={item.value}
                      onSelect={() => handleCheckboxToggle(!isChecked, item.value)}
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={isChecked}
                            aria-label={item.label}
                          />
                          {item.label}
                        </div>
                        {item.count != null && item.count > 0 && (
                          <span className="text-muted-foreground">{item.count}</span>
                        )}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>

              <div className="border-t">
                <Button
                  variant="ghost"
                  className="w-full cursor-pointer"
                  onClick={handleClearAllButtonClick}
                >
                  Clear filters
                </Button>
              </div>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
export { CheckboxListFilter }

// -----------------------------------------------------------------------------
// EXTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// React
import { useEffect, useMemo, useState } from 'react';

// Third-party Libraries
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Search, Users } from 'lucide-react';

// -----------------------------------------------------------------------------
// INTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// Utils
import { formatDateTime } from '@/lib/utils';

// Components
import { ActionPopover } from '@/components/ActionPopover';
import { CheckboxListFilter } from '@/components/CheckboxListFilter';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
import type { BreadcrumbItem, CommonData, User } from '@/types';

interface UserStatus {
  id: number;
  label: string;
  users_count: number | null;
}

interface Props {
  users: {
    data: User[];
    current_page: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    total: number;
  };
  userStatuses: UserStatus[];
  [key: string]: CommonData;
}

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
const DEBOUNCE_DELAY = 500;
const DEFAULT_PER_PAGE = '15';

const BREADCRUMBS: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Users',
    href: '/users',
  },
];

// -----------------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------------
function UserIndex({ users, userStatuses }: Props) {
  // --- Hooks & Context ------------------------------------------------------
  const { url } = usePage();

  // --- URL State ------------------------------------------------------------
  // Memoize urlParams to prevent unnecessary recalculations if url object reference changes
  const urlParams = useMemo(() => new URLSearchParams(url.split('?')[1] || ''), [url]);

  // --- Local State ----------------------------------------------------------
  const [search, setSearch] = useState<string>(urlParams.get('search') || '');
  const [selectedUserStatuses, setSelectedUserStatuses] = useState<string[]>(
    urlParams.get('status') ? urlParams.get('status')!.split(',') : []
  );
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  // --- Derived / Computed ---------------------------------------------------
  const statusListItem = useMemo(() => {
    return userStatuses.map((status: UserStatus) => ({
      value: status.id.toString(),
      label: status.label,
      count: status.users_count || 0,
    }));
  }, [userStatuses]);

  const allUsersSelected = users.data.length > 0 && selectedUsers.length === users.data.length;
  const someUsersSelected = selectedUsers.length > 0 && selectedUsers.length < users.data.length;

  // --- Effects --------------------------------------------------------------
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params: Record<string, any> = {};

      if (search.trim()) params.search = search.trim();
      if (selectedUserStatuses.length > 0) params.status_id = selectedUserStatuses.join(',');

      router.get('/users', params, {
        preserveState: true,
        preserveScroll: false,
        replace: true,
      });
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [search, selectedUserStatuses]);

  // --- Handlers -------------------------------------------------------------
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedUserStatuses([]);
  };

  const handleSelectAllCheckboxChange = () => {
    if (allUsersSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.data.map((user) => user.id));
    }
  };

  const handleRowCheckboxChange = (userId: number) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.get(
      '/users',
      {
        ...Object.fromEntries(urlParams),
        per_page: e.target.value,
        page: '1',
      },
      {
        preserveState: true,
        preserveScroll: true,
      }
    );
  };

  // --- Render ---------------------------------------------------------------
  return (
    <AppLayout breadcrumbs={BREADCRUMBS}>
      <Head title="Users" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground">View all users in the system</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              All Users ({users.total})
            </CardTitle>
            <CardDescription>A list of all users in the system</CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-0 bg-gray-100 dark:bg-neutral-900">
          <CardHeader>
            <div className="item-center flex flex-wrap gap-2">
              <div className="relative flex w-full justify-center sm:min-w-72 lg:w-auto">
                <Input
                  type="text"
                  placeholder="Search users..."
                  className="bg-background pr-10"
                  value={search}
                  onChange={handleSearchChange}
                />
                <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              </div>

              <div className="flex w-full justify-start lg:w-auto">
                <CheckboxListFilter
                  listItems={statusListItem}
                  label="Status"
                  values={selectedUserStatuses}
                  onChange={setSelectedUserStatuses}
                />
              </div>

              <div className="flex w-full justify-center lg:ml-auto lg:w-auto">
                <Button variant="outline" className="bg-primary text-primary-foreground" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Users Table */}
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={allUsersSelected ? true : someUsersSelected ? 'indeterminate' : false}
                    onCheckedChange={handleSelectAllCheckboxChange}
                  />
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Created Date</TableHead>
                <TableHead className="hidden md:table-cell">Modified Date</TableHead>
                <TableHead className="w-12 text-center"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => handleRowCheckboxChange(user.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-sm">{user.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{user.name}</div>
                    <div className="md:hidden">{user.email}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="text-sm">{user.email}</div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        user.status_id == 1
                          ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20 ring-inset'
                          : user.status_id == 2
                            ? 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20 ring-inset'
                            : 'bg-red-50 text-red-700 ring-1 ring-red-600/20 ring-inset'
                      }`}
                    >
                      {user.status.label}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="text-sm text-muted-foreground">{formatDateTime(user.created_at)}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="text-sm text-muted-foreground">{formatDateTime(user.updated_at)}</div>
                  </TableCell>
                  <TableCell>
                    <ActionPopover
                      item={user}
                      actions={{
                        edit: true,
                        duplicate: false,
                        activate: true,
                        deactivate: true,
                        delete: true,
                        restore: true,
                        editHref: `/users/${user.id}/edit`,
                        activateMessage: `Are you sure you want to activate "${user.name}"?`,
                        deactivateMessage: `Are you sure you want to deactivate "${user.name}"?`,
                        deleteMessage: `Are you sure you want to move "${user.name}" to trash?`,
                        restoreMessage: `Are you sure you want to restore "${user.name}" from trash?`,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {users && (
          <div className="flex items-center justify-between">
            {/* Per Page Dropdown */}
            <div className="flex items-center gap-2">
              <select
                className="rounded-md border bg-background px-3 py-1 text-sm"
                value={urlParams.get('per_page') || DEFAULT_PER_PAGE}
                onChange={handlePerPageChange}
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span className="text-sm text-muted-foreground">per page</span>
            </div>

            {/* Pagination Links - Center */}
            <div className="flex items-center space-x-2">
              {users.links.map((link, index) => {
                let href = link.url;

                // Add per_page param if it exists and link has URL
                if (href && typeof window !== 'undefined') {
                  const currentPerPage = urlParams.get('per_page');
                  if (currentPerPage) {
                    const url = new URL(href);
                    url.searchParams.set('per_page', currentPerPage);
                    href = url.toString();
                  }
                }

                return (
                  <Link
                    key={index}
                    href={href || '#'}
                    className={`rounded-md px-3 py-1 text-sm ${
                      link.active
                        ? 'bg-primary text-primary-foreground'
                        : link.url
                          ? 'border bg-background hover:bg-accent'
                          : 'cursor-not-allowed text-muted-foreground'
                    }`}
                    preserveState
                    preserveScroll
                  >
                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                  </Link>
                );
              })}
            </div>

            {/* Empty div for balance */}
            <div></div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default UserIndex;

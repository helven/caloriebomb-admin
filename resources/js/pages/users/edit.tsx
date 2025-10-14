// ============================================================================
// 1 REACT & CORE IMPORTS
// ============================================================================
// 1.1 React and React ecosystem imports
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

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
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeft, Save, UserPen } from 'lucide-react';

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
import { formatDateTime } from '@/lib/utils';
import { type BreadcrumbItem, type CommonData, type User } from '@/types';

// ============================================================================
// 5 TYPE DEFINITIONS
// ============================================================================
interface Props {
  user: User;
  userStatuses: Array<{ id: number; label: string }>;
  [key: string]: CommonData;
}

interface FormData {
  name: string;
  email: string;
  status_id: string;
}
// ============================================================================
// 6 CONSTANTS & STATIC DATA
// ============================================================================

export default function UserEdit({ user, userStatuses = [] }: Props) {
  const { data, setData, put, processing, errors, reset } = useForm<FormData>({
    name: user.name || '',
    email: user.email || '',
    status_id: user.status_id?.toString() || '1',
  });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Users',
      href: '/users',
    },
    {
      title: 'Edit User',
      href: `/users/${user.id}/edit`,
    },
  ];

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Data being sent to server:', data);
    put(`/users/${user.id}`);
  };

  const handleFormReset = () => {
    reset();
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit User" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit User</h1>
            <p className="text-muted-foreground">Update user information in the system</p>
          </div>
          <Button variant="outline" asChild>
            <a href="/users">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Users
            </a>
          </Button>
        </div>

        {/* User Metadata */}
        <Card className="bg-slate-100 dark:bg-slate-800">
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <span className="font-medium">Email Verified:</span>{' '}
                {user.email_verified_at ? formatDateTime(user.email_verified_at) : 'Not verified'}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <span className="font-medium">Created:</span> {formatDateTime(user.created_at)}
              </div>
              <div>
                <span className="font-medium">Updated:</span> {formatDateTime(user.updated_at)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit User Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPen className="h-5 w-5" />
              User Information
            </CardTitle>
            <CardDescription>Update the user details below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Enter full name"
                    className={errors.name ? 'border-red-500' : ''}
                    required
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="Enter email address"
                    className={errors.email ? 'border-red-500' : ''}
                    required
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>

              {/* Status Field */}
              <div className="space-y-2">
                <Label htmlFor="status_id">Status *</Label>
                <Select value={data.status_id} onValueChange={(value) => setData('status_id', value)}>
                  <SelectTrigger className={errors.status_id ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {userStatuses.length > 0 ? (
                      userStatuses.map((status) => (
                        <SelectItem key={status.id} value={status.id.toString()}>
                          {status.label}
                        </SelectItem>
                      ))
                    ) : (
                      <>
                        <SelectItem value="1">Active</SelectItem>
                        <SelectItem value="2">Inactive</SelectItem>
                        <SelectItem value="3">Suspended</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                {errors.status_id && <p className="text-sm text-red-500">{errors.status_id}</p>}
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 border-t pt-4">
                <Button type="button" variant="outline" onClick={handleFormReset} disabled={processing}>
                  Reset
                </Button>
                <Button type="submit" disabled={processing}>
                  <Save className="mr-2 h-4 w-4" />
                  {processing ? 'Updating...' : 'Update User'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

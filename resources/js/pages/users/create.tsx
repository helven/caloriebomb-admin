// @ts-nocheck
// -----------------------------------------------------------------------------
// EXTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// React
import { FormEvent } from 'react';

// Third-party Libraries
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, UserPen } from 'lucide-react';

// -----------------------------------------------------------------------------
// INTERNAL DEPENDENCIES
// -----------------------------------------------------------------------------
// Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------
import type { BreadcrumbItem, CommonData } from '@/types';

interface Props {
  userStatuses: Array<{ id: number; label: string }>;
  [key: string]: CommonData;
}

interface FormData {
  name: string;
  email: string;
  status_id: string;
}

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
const BREADCRUMBS: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Users',
    href: '/users',
  },
  {
    title: 'Create User',
    href: `/users/create`,
  },
];

// -----------------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------------
export default function UserCreate({ userStatuses = [] }: Props) {
  // --- Hooks & Context ------------------------------------------------------
  const { data, setData, post, processing, errors, reset } = useForm<FormData>({
    name: '',
    email: '',
    status_id: '1',
  });

  // --- Handlers -------------------------------------------------------------
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Data being sent to server:', data);
    post(`/users`);
  };

  const handleFormReset = () => {
    reset();
  };

  // --- Render ---------------------------------------------------------------
  return (
    <AppLayout breadcrumbs={BREADCRUMBS}>
      <Head title="Create User" />

      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create User</h1>
            <p className="text-muted-foreground">Add new user to the system</p>
          </div>
          <Button variant="outline" asChild>
            <a href="/users">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Users
            </a>
          </Button>
        </div>

        {/* Create User Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPen className="h-5 w-5" />
              User Information
            </CardTitle>
            <CardDescription>Enter the user details below</CardDescription>
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
                <Button type="submit" disabled={processing}>
                  <Save className="mr-2 h-4 w-4" />
                  {processing ? 'Creating...' : 'Create User'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

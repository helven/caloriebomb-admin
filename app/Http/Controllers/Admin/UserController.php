<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\AdminController;
use App\Models\User;
use App\Models\UserStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends AdminController
{
    /**
     * Display a listing of users.
     */
    public function index(): Response
    {
        $users = User::query()
            ->with('status')
            ->orderBy('name', 'asc')
            ->when(request('search'), function ($query) {
                $query->where('name', 'like', '%' . request('search') . '%')
                    ->orWhere('email', 'like', '%' . request('search') . '%')
                    ->orWhere('username', 'like', '%' . request('search') . '%');
            })
            ->when(request('status_id'), function ($query) {
                $query->where('status_id', request('status_id'));
            })
            ->when(request('order_by'), function ($query) {
                $query->orderBy(request('order_by'), request('order_direction', 'asc'));
            })
            ->when(!request('order_by'), function ($query) {
                $query->orderBy('name', 'asc');
            })
            ->paginate(request('per_page', config('settings.pagination.per_page')));

        $userStatuses = UserStatus::orderByRaw('FIELD(id, 1, 2, 99)')->get();

        return Inertia::render('users/index', [
            ...$this->sharedViewData,
            'users' => $users,
            'userStatuses' => $userStatuses,
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create(): Response
    {
        $userStatuses = UserStatus::orderBy('label', 'asc')
            ->where('id', '!=', 99) // Exclude 'Trash' status
            ->get();

        return Inertia::render('users/create', [
            ...$this->sharedViewData,
            'userStatuses' => $userStatuses,
        ]);
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'status_id' => 'required|exists:user_statuses,id',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'username' => $validated['username'], // Use email as username
            'status_id' => $validated['status_id'],
            //'password' => bcrypt('password'), // Default password
        ]);

        return redirect()->route('users.index')->with('success', 'User created successfully');
    }

    /**
     * Display the specified user.
     * @param User $user
     */
    public function show(User $user): Response
    {
        return Inertia::render('users/show', [
            ...$this->sharedViewData,
            'userStatuses' => $userStatuses,
        ]);
    }

    /**
     * Show the form for editing the specified user.
     * @param User $user
     */
    public function edit(User $user): Response
    {
        $userStatuses = UserStatus::orderBy('label', 'asc')
            ->where('id', '!=', 99) // Exclude 'Trash' status
            ->get();

        return Inertia::render('users/edit', [
            ...$this->sharedViewData,
            'user' => $user,
            'userStatuses' => $userStatuses,
        ]);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'status_id' => 'required|exists:user_statuses,id',
        ]);

        $user->update($validated);

        return redirect()->route('users.index')->with('success', 'User updated successfully');
    }


    /**
     * Remove the specified user from storage.
     */
    //public function destroy(User $user)
    //{
    //    // Implementation for future use
    //}

    /**
     * Activate User (change status to 1).
     */
    public function activate(User $user)
    {
        $user->update(['status_id' => 1]);
        
        return redirect()->back()->with('success', 'User successfully activated');
    }

    /**
     * Deactivate User (change status to 2).
     */
    public function deactivate(User $user)
    {
        $user->update(['status_id' => 2]);
        
        return redirect()->back()->with('success', 'User successfully deactivated');
    }

    /**
     * Move user to trash (change status to 99).
     */
    public function trash(User $user)
    {
        $user->update(['status_id' => 99]);
        
        return redirect()->back()->with('success', 'User moved to trash successfully');
    }

    /**
     * Restore user (change status to 1).
     */
    public function restoreTrash(User $user)
    {
        $user->update(['status_id' => 1]);
    
        return redirect()->back()->with('success', 'User successfully restored from trash');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserStatus extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'label',
        'description',
        'is_system',
    ];

    /**
     * Get the users with this status.
     */
    public function users()
    {
        return $this->hasMany(User::class, 'status_id');
    }
}
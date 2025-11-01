<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FoodCategory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'image',
        'parent_id',
        'slug',
        'level',
    ];

    /**
     * Get the foods for the category.
     */
    public function foods()
    {
        return $this->hasMany(Food::class, 'category_id');
    }

    /**
     * Get the parent category.
     */
    public function parent()
    {
        return $this->belongsTo(FoodCategory::class, 'parent_id');
    }

    /**
     * Get the child categories.
     */
    public function children()
    {
        return $this->hasMany(FoodCategory::class, 'parent_id');
    }
}

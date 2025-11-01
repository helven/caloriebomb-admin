<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    use HasFactory;

    protected $table = 'foods';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'source_url',
        'source_id',
        'name',
        'category',
        'category_id',
        'energy_kj',
        'calories_kcal',
        'protein_g',
        'carbohydrate_g',
        'fat_g',
        'saturated_fat_g',
        'monounsaturated_fat_g',
        'polyunsaturated_fat_g',
        'cholesterol_mg',
        'fiber_g',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'source_id' => 'integer',
        'category_id' => 'integer',
        'energy_kj' => 'float',
        'calories_kcal' => 'float',
        'protein_g' => 'float',
        'carbohydrate_g' => 'float',
        'fat_g' => 'float',
        'saturated_fat_g' => 'float',
        'monounsaturated_fat_g' => 'float',
        'polyunsaturated_fat_g' => 'float',
        'cholesterol_mg' => 'float',
        'fiber_g' => 'float',
    ];

    /**
     * Get the category that owns the food.
     */
    public function category()
    {
        return $this->belongsTo(FoodCategory::class, 'category_id');
    }

    /**
     * Scope a query to search foods by name.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $name
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearchByName($query, $name)
    {
        return $query->where('name', 'like', '%' . str_replace(['%', '_'], ['\%', '\_'], $name) . '%');
    }
}
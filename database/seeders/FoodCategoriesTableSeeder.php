<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class FoodCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Temporarily disable foreign key constraints if needed
        Schema::disableForeignKeyConstraints();
        
        // Clear the table before seeding
        DB::table('food_categories')->truncate();
        
        $data = [
            [
                'id' => 1,
                'parent_id' => null,
                'name' => 'Beverage',
                'slug' => 'beverage',
                'emoji' => '🍹',
                'level' => 1,
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 2,
                'parent_id' => null,
                'name' => 'Condiments',
                'slug' => 'condiments',
                'emoji' => '🧂',
                'level' => 1,
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 3,
                'parent_id' => 12,
                'name' => 'Cream Crackers',
                'slug' => 'cream_crackers',
                'emoji' => '🍪',
                'level' => 2,
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 4,
                'parent_id' => null,
                'name' => 'Dairy',
                'slug' => 'dairy',
                'emoji' => '🐄',
                'level' => 1,
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 5,
                'parent_id' => null,
                'name' => 'Dessert',
                'slug' => 'dessert',
                'emoji' => '🍰',
                'level' => 1,
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 6,
                'parent_id' => null,
                'name' => 'Fruit',
                'slug' => 'fruit',
                'emoji' => '🍎',
                'level' => 1,
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 7,
                'parent_id' => null,
                'name' => 'Grain',
                'slug' => 'grain',
                'emoji' => '🌾',
                'level' => 1,
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 8,
                'parent_id' => null,
                'name' => 'Meat',
                'slug' => 'meat',
                'emoji' => '🥩',
                'level' => 1,
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 9,
                'parent_id' => null,
                'name' => 'Misc',
                'slug' => 'misc',
                'emoji' => '💣',
                'level' => 1,
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 10,
                'parent_id' => null,
                'name' => 'Oils Fats',
                'slug' => 'oils-fats',
                'emoji' => '🧈',
                'level' => 1,
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 11,
                'parent_id' => null,
                'name' => 'Seafood',
                'slug' => 'seafood',
                'emoji' => '🐟',
                'level' => 1,
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 12,
                'parent_id' => null,
                'name' => 'Snack',
                'slug' => 'snack',
                'emoji' => '🍿',
                'level' => 1,
                'created_at' => null,
                'updated_at' => null,
            ],
            [
                'id' => 13,
                'parent_id' => null,
                'name' => 'Vegetable',
                'slug' => 'vegetable',
                'emoji' => '🥦',
                'level' => 1,
                'created_at' => null,
                'updated_at' => null,
            ],
        ];
        
        // Insert the data
        DB::table('food_categories')->insert($data);
        
        // Re-enable foreign key constraints
        Schema::enableForeignKeyConstraints();
    }
}
<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Insert user statuses first
        DB::table('user_statuses')->insert([
            'id' => 1,
            'label' => 'Active',
            'description' => 'User is active and can log in.',
            'is_system' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('user_statuses')->insert([
            'id' => 2,
            'label' => 'Inactive',
            'description' => 'User is inactive and cannot log in.',
            'is_system' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('user_statuses')->insert([
            'id' => 99,
            'label' => 'Deleted',
            'description' => 'User is deleted and cannot log in.',
            'is_system' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Adminitrator',
            'email' => 'admin@caloriebomb.com',
            'status_id' => 1,
            'password' => bcrypt('admin123'), // Use bcrypt for password hashing
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
            'two_factor_confirmed_at' => null,
            'created_at' => now(),
            'updated_at' => now(),

        ]);
        
        // Call your static seeders
        $this->call([
            FoodCategoriesTableSeeder::class,
            FoodsTableSeeder::class,
            // Add other seeders as needed
        ]);
    }
}

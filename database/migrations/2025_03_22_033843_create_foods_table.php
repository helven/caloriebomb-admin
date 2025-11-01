<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('foods', function (Blueprint $table) {
            $table->integer('id', true); // Auto-incrementing primary key
            $table->string('source_url', 255)->nullable();
            $table->integer('source_id')->default(0);
            $table->string('name', 255)->nullable();
            $table->string('category', 255)->nullable();
            $table->integer('category_id')->default(0);
            $table->decimal('energy_kj', 10, 2)->nullable();
            $table->decimal('calories_kcal', 10, 2)->nullable();
            $table->decimal('protein_g', 10, 3)->nullable();
            $table->decimal('carbohydrate_g', 10, 3)->nullable();
            $table->decimal('fat_g', 10, 3)->nullable();
            $table->decimal('saturated_fat_g', 10, 3)->nullable();
            $table->decimal('monounsaturated_fat_g', 10, 3)->nullable();
            $table->decimal('polyunsaturated_fat_g', 10, 3)->nullable();
            $table->decimal('cholesterol_mg', 10, 3)->nullable();
            $table->decimal('fiber_g', 10, 3)->nullable();
            $table->timestamps();
            
            // Note: No updated_at field in the original schema
            
            // Add indexes for better performance
            $table->index('category_id');
            $table->index('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('foods');
    }
}; 
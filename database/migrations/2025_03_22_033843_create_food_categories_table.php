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
        Schema::create('food_categories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->string('name', 255)->charset('utf8mb4')->collation('utf8mb4_unicode_ci');
            $table->string('slug', 255)->unique()->charset('utf8mb4')->collation('utf8mb4_unicode_ci');
            $table->string('emoji', 20)->charset('utf8mb4')->collation('utf8mb4_unicode_ci');
            $table->unsignedTinyInteger('level')->default(1);
            $table->timestamps();
            
            // Add foreign key constraint for self-referencing relationship
            $table->foreign('parent_id')
                  ->references('id')
                  ->on('food_categories')
                  ->onDelete('set null');
                  
            // Add index for faster lookups
            $table->index('parent_id');
            $table->index('slug');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('food_categories');
    }
}; 
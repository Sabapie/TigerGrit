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
        Schema::create('exercises', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('parent_exercise_id')->nullable()->constrained('exercises')->nullOnDelete();
            $table->string('name');
            $table->text('description')->nullable();
            $table->text('observations')->nullable();
            $table->string('image')->nullable();
            $table->integer('duration')->default(0);
            $table->integer('rest')->nullable()->default(0);
            $table->integer('repetitions')->default(1);
            $table->integer('sets')->default(1);
            $table->string('muscle_group')->default('General');
            $table->string('muscle_area')->default('General');
            $table->string('weight')->nullable()->default('0');
            $table->string('weight_unit')->default('kg');
            $table->boolean('is_official')->default(false);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exercises');
    }
};

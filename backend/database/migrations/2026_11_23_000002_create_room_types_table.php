<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('room_types', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->text('description');
            $table->string('image')->nullable();
            $table->unsignedSmallInteger('size_sqm');
            $table->unsignedTinyInteger('max_guests');
            $table->string('bed');
            $table->jsonb('perks')->default('[]');
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });

        // Which room types each branch offers, at what nightly rate.
        Schema::create('branch_room_type', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained()->cascadeOnDelete();
            $table->foreignId('room_type_id')->constrained()->cascadeOnDelete();
            $table->decimal('price_per_night', 10, 2);
            $table->unsignedSmallInteger('inventory')->default(1);
            $table->timestamps();
            $table->unique(['branch_id', 'room_type_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('branch_room_type');
        Schema::dropIfExists('room_types');
    }
};

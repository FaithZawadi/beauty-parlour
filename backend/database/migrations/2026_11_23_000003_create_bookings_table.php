<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('reference', 16)->unique();
            $table->foreignId('branch_id')->constrained()->restrictOnDelete();
            $table->foreignId('room_type_id')->constrained()->restrictOnDelete();
            $table->date('check_in');
            $table->date('check_out');
            $table->unsignedTinyInteger('adults');
            $table->unsignedTinyInteger('children')->default(0);
            $table->string('guest_name');
            $table->string('guest_email');
            $table->string('guest_phone', 40);
            $table->text('special_requests')->nullable();
            $table->decimal('price_per_night', 10, 2);
            $table->unsignedSmallInteger('nights');
            $table->decimal('total_amount', 12, 2);
            $table->string('status', 20)->default('pending'); // pending, confirmed, cancelled
            $table->timestamps();
            $table->index(['branch_id', 'room_type_id', 'check_in', 'check_out']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};

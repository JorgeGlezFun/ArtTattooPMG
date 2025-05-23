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
        Schema::create('caracteristica_tatuaje', function (Blueprint $table) {
            $table->id();
            $table->foreignId('caracteristica_id')->constrained()->onDelete('cascade');
            $table->foreignId('tatuaje_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('caracteristica_tatuaje');
    }
};

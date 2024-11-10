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
        Schema::create('tatuajes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('artista_id')->constrained()->onDelete('cascade');
            $table->string('ruta_imagen');
            $table->string('tamano');
            $table->string('color');
            $table->string('tipo');
            $table->string('zona');
            $table->integer('precio');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tatuajes');
    }
};

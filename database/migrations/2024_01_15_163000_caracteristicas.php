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
        Schema::create('caracteristicas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('caracteristica_tipos_id')->constrained('caracteristica_tipos')->onDelete('cascade');
            $table->string('nombre');
            $table->float('precio');
            $table->integer('tiempo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('caracteristicas');
    }
};

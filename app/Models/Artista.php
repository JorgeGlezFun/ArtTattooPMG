<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artista extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'apellidos',
    ];

    public function tatuajes()
    {
        return $this->hasMany(Tatuaje::class);
    }

    public function reservas()
    {
        return $this->hasMany(Reserva::class);
    }
}

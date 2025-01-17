<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tatuaje extends Model
{
    use HasFactory;

    protected $fillable = [
        'ruta_imagen',
        'artista_id',
    ];

    public function artista()
    {
        return $this->belongsTo(Artista::class);
    }

    public function reservas()
    {
        return $this->hasMany(Reserva::class);
    }

    public function caracteristicas()
    {
        return $this->belongsToMany(Caracteristica::class, 'caracteristica_tatuaje');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tatuaje extends Model
{
    use HasFactory;

    protected $fillable = [
        'precio',
        'zona',
        'color',
        'tamano',
        'relleno',
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
}

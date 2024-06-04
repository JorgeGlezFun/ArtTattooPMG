<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Piercing extends Model
{
    use HasFactory;

    protected $fillable = [
        'precio',
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

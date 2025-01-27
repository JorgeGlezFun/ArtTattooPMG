<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;

    protected $fillable = [
        'cliente_id',
        'artista_id',
        'tatuaje_id',
        'fecha',
        'hora_inicio',
        'hora_fin',
        'duracion',
        'estado'
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    public function artista()
    {
        return $this->belongsTo(Artista::class);
    }

    public function tatuaje()
    {
        return $this->belongsTo(Tatuaje::class);
    }

}

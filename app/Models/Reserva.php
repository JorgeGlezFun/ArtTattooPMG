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
        'piercing_id',
        'fecha',
        'hora',
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

    public function piercing()
    {
        return $this->belongsTo(Piercing::class);
    }
}

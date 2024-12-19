<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Horario extends Model
{
    use HasFactory;

    protected $fillable = [
        'hora',
    ];

    public function estacion()
    {
        return $this->belongsToMany(Estacion::class, 'estacion_horario');
    }

}

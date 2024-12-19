<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estacion extends Model
{
    use HasFactory;

    protected $table = 'estaciones';

    protected $fillable = [
        'nombre',
    ];

    public function horas()
    {
        return $this->belongsToMany(Horario::class, 'estacion_horario');
    }
}

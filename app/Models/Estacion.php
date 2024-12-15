<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estacion extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'horario_id'
    ];

    public function horas()
    {
        return $this->hasMany(Horario::class);
    }
}

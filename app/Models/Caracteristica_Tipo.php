<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Caracteristica_Tipo extends Model
{
    use HasFactory;

    protected $table = 'caracteristica_tipos';

    protected $fillable = [
        'nombre'
    ];

    public function caracteristicas()
    {
        return $this->hasMany(Caracteristica::class);
    }
}

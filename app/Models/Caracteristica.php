<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Caracteristica extends Model
{
    use HasFactory;

    protected $fillable = [
        'caracteristica_tipos_id',
        'nombre',
        'precio',
        'tiempo'
    ];

    public function caracteristica_tipo()
    {
        return $this->belongsTo(Caracteristica_Tipo::class, 'caracteristica_tipos_id');
    }

    public function tatuajes()
    {
        return $this->belongsToMany(Tatuaje::class, 'caracteristica_tatuaje');
    }
}

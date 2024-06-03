<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'apellidos',
        'telefono',
        'email',
        'password',
    ];

    public function user () {
        return $this->belongsTo(User::class);
    }

    public function reservas () {
        return $this->hasMany(Reserva::class);
    }
}

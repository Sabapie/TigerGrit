<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Routine extends Model
{
    //
    public function user()
    {
        return $this->belongsTo(User::class); // Relación con el usuario que creó la rutina
    }

    public function exercises()
    {
        return $this->belongsToMany(Exercise::class) // Relación con los ejercicios que pertenecen a la rutina
            ->withPivot('order')
            ->withTimestamps();
    }
}

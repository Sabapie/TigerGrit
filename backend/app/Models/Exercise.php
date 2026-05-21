<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    //
    public function user()
    {
        return $this->belongsTo(User::class); // Relación con el usuario que creó el ejercicio
    }

    public function parent()
    {
        return $this->belongsTo( // Relación con el ejercicio padre (si es una variación)
            Exercise::class,
            'parent_exercise_id'
        );
    }

    public function routines()
    {
        return $this->belongsToMany(Routine::class); // Relación con las rutinas a las que pertenece el ejercicio
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    //

    protected $fillable = [

        'user_id',
        'parent_exercise_id',
        'name',
        'description',
        'image',
        'duration',
        'rest',
        'repetitions',
        'sets',
        'muscle_group',
        'muscle_area',
        'weight',
        'weight_unit',
        'observations',
        'is_official'
        
    ];

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
        return $this->belongsToMany(Routine::class, 'routine_exercise'); // Relación con las rutinas a las que pertenece el ejercicio
    }
}

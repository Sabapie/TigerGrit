<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Routine extends Model
{
    //

    protected $fillable = [

        'user_id',
        'name',
        'description'

    ];

    public function user()
    {
        return $this->belongsTo(User::class); // Relación con el usuario que creó la rutina
    }

    public function exercises()
    {
        return $this->belongsToMany(Exercise::class, 'routine_exercise') // Relación con los ejercicios que pertenecen a la rutina
            ->withPivot('order')
            ->withTimestamps();
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    //
    public function index()
    {
        $exercises = Exercise::all();

        return response()->json($exercises);
    }

    public function store(Request $request)
    {
        $request->validate([ // validacion

            'name' => 'required',
            'duration' => 'required|integer',
            'repetitions' => 'required|integer',
            'sets' => 'required|integer',
            'muscle_group' => 'required',
            'muscle_area' => 'required'

        ]);

        $exercise = Exercise::create([ // creacion del ejercicio

            'user_id' => $request->user()->id,
            'parent_exercise_id' =>$request->parent_exercise_id,
            'name' => $request->name,
            'description' => $request->description,
            'image' => $request->image,
            'duration' => $request->duration,
            'rest' => $request->rest,
            'repetitions' => $request->repetitions,
            'sets' => $request->sets,
            'muscle_group' => $request->muscle_group,
            'muscle_area' => $request->muscle_area,
            'observations' => $request->observations,
            'is_official' => false

        ]);

        return response()->json($exercise, 201); // devuelve el ejercicio creado con un código de estado 201 (creado)
    }
}

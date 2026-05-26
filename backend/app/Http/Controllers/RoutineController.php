<?php

namespace App\Http\Controllers;

use App\Models\Routine;
use Illuminate\Http\Request;

class RoutineController extends Controller
{
    //
    public function index(Request $request)
        {
            return response()->json(

                $request->user()
                    ->routines()
                    ->with('exercises')
                    ->get()

            );
        }

    public function store(Request $request)
    {
        $request->validate([

            'name' => 'required'

        ]);

        $routine = Routine::create([

            'user_id' =>
                $request->user()->id,

            'name' =>
                $request->name,

            'description' =>
                $request->description

        ]);

        return response()->json($routine, 201);
    }

    public function delete(Routine $routine)
    {
        $routine->delete();

        return response()->json([
            'message' => 'Rutina eliminada'
        ]);
    }

    public function attachExercise(Request $request, Routine $routine)
    {
        $request->validate([

            'exercise_id' =>
                'required|exists:exercises,id'

        ]);

        $routine->exercises()->attach(

            $request->exercise_id,

            [
                'order' => $request->order ?? 0
            ]

        );

        return response()->json([
            'message' => 'Ejercicio añadido'
        ]);
    }
}

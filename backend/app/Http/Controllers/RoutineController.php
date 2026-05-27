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

    public function syncExercises( // sincroniza los ejercicios de una rutina
        Request $request,
        Routine $routine
    )
    {
        $routine->exercises()->sync(

            $request->exercises

        );

        return response()->json([
            'message' => 'Ejercicios sincronizados'
        ]);
    }

    public function show(Routine $routine)
    {
        return response()->json(
            // carga los ejercicios seleccionados con su orden
            $routine->load('exercises')->toArray() // en las erramientas de desarrollador se puede ver esto en la respuesta de la API en la sección de red
        );
    }

    public function update(
        Request $request,
        Routine $routine
    )
    {
        $routine->update(

            $request->all()

        );

        return response()->json(
            $routine
        );
    }

    public function delete(Routine $routine)
    {
        $routine->delete();

        return response()->json([
            'message' => 'Rutina eliminada'
        ]);
    }

    public function attachExercise(Request $request, Routine $routine) // añade un ejercicio a una rutina
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

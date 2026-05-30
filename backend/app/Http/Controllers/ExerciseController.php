<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    //
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $exercises = Exercise::where(function ($query) use ($userId) {
            $query->where('user_id', $userId)
                ->orWhereNull('user_id');
        })->get();

        return response()->json($exercises);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'duration' => 'required|integer',
            'repetitions' => 'required|integer',
            'sets' => 'required|integer',
            'rest' => 'required|integer',
            'muscle_group' => 'required',
            'muscle_area' => 'required',
            'weight' => 'nullable|numeric',
            'weight_unit' => 'required|string',
            'image' => 'nullable',  // ← acepta cualquier cosa o null
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            // Es un archivo subido
            $imagePath = $request->file('image')->store('exercises', 'public');
        } elseif ($request->filled('image') && is_string($request->image)) {
            // Es una URL string
            $imagePath = $request->image;
        }

        $exercise = Exercise::create([
            'user_id' => $request->user()->id,
            'parent_exercise_id' => $request->parent_exercise_id,
            'name' => $request->name,
            'description' => $request->description,
            'image' => $imagePath,
            'duration' => $request->duration,
            'rest' => $request->rest,
            'repetitions' => $request->repetitions,
            'sets' => $request->sets,
            'muscle_group' => $request->muscle_group,
            'muscle_area' => $request->muscle_area,
            'weight' => $request->weight,
            'weight_unit' => $request->weight_unit,
            'observations' => $request->observations,
            'is_official' => false
        ]);

        return response()->json($exercise, 201);
    }

    public function show(Request $request, Exercise $exercise)
    {
        // Seguridad: solo puede ver sus ejercicios o los oficiales
        if ($exercise->user_id !== null && $exercise->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($exercise);
    }

    public function update(Request $request, Exercise $exercise)
    {
        $request->validate([

            'name' => 'required',
            'duration' => 'required|integer',
            'repetitions' => 'required|integer',
            'sets' => 'required|integer',
            'rest' => 'required|integer',
            'muscle_group' => 'required',
            'muscle_area' => 'required',
            'weight' => 'nullable|numeric',
            'weight_unit' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048' // validacion de imagen, opcional, debe ser un archivo de imagen con formato jpg, jpeg, png o webp y no debe superar los 2MB

        ]);

        $imagePath = $exercise->image;

        if ($request->hasFile('image')) {

            $imagePath = $request
                ->file('image')
                ->store('exercises', 'public');
        }

        // si es ejercicio oficial, crear copia personalizada
        if ($exercise->user_id === null) {

            // crear copia personalizada
            $newExercise = Exercise::create([

                'user_id' => $request->user()->id,

                'parent_exercise_id' => $exercise->id,

                'name' => $request->name,
                'description' => $request->description,
                'muscle_group' => $request->muscle_group,
                'muscle_area' => $request->muscle_area,
                'sets' => $request->sets,
                'repetitions' => $request->repetitions,
                'weight' => $request->weight,
                'weight_unit' => $request->weight_unit,
                'rest' => $request->rest,
                'duration' => $request->duration,
                'observations' => $request->observations,
                'image' => $imagePath,
            ]);

            return response()->json($newExercise, 201);
        }

        // verifica el propietario del ejercicio
        if ($exercise->user_id !== $request->user()->id) {

            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        // actualizar normal
        $exercise->update([

            'name' => $request->name,
            'description' => $request->description,
            'muscle_group' => $request->muscle_group,
            'muscle_area' => $request->muscle_area,
            'sets' => $request->sets,
            'repetitions' => $request->repetitions,
            'weight' => $request->weight,
            'weight_unit' => $request->weight_unit,
            'rest' => $request->rest,
            'duration' => $request->duration,
            'observations' => $request->observations,
            'image' => $imagePath,

        ]);

        return response()->json($exercise);
    }

    public function delete(Exercise $exercise)
    {
        $exercise->delete();

        return response()->json([
            'message' => 'Ejercicio eliminado'
        ]);
    }
}

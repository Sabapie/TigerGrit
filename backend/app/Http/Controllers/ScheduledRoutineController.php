<?php

namespace App\Http\Controllers;
use App\Models\ScheduledRoutine;
use Illuminate\Http\Request;

class ScheduledRoutineController extends Controller
{
    //
    protected $fillable = [

        'user_id',
        'routine_id',
        'scheduled_date',
        'completed'

    ];

    
    public function index(Request $request)
    {
        return response()->json(

            $request->user()
                ->scheduledRoutines()
                ->with('routine')
                ->get()

        );
    }

    public function store(Request $request)
    {
        $request->validate([

            'routine_id' =>
                'required|exists:routines,id',

            'scheduled_date' =>
                'required|date'

        ]);

        $scheduledRoutine =
            ScheduledRoutine::create([

                'user_id' =>
                    $request->user()->id,

                'routine_id' =>
                    $request->routine_id,

                'scheduled_date' =>
                    $request->scheduled_date

            ]);

        return response()->json(
            $scheduledRoutine,
            201
        );
    }

    public function delete(Request $request, ScheduledRoutine $scheduledRoutine)
    {
        if ($scheduledRoutine->user_id !== $request->user()->id) { // Verificar que el usuario es el propietario de la rutina programada
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $scheduledRoutine->delete();

        return response()->json(['message' => 'Scheduled routine deleted']);
    }
}

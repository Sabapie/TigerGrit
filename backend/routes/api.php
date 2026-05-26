<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\RoutineController;
use App\Http\Controllers\ScheduledRoutineController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/exercises', [ExerciseController::class, 'store']);
    Route::get('/routines', [RoutineController::class, 'index']);
    Route::post('/routines', [RoutineController::class, 'store']);
    Route::post('/routines/{routine}/exercises', [RoutineController::class, 'attachExercise']);
    Route::get('/exercises', [ExerciseController::class, 'index']);
    Route::get('/calendar', [ScheduledRoutineController::class, 'index']);
    Route::post('/calendar', [ScheduledRoutineController::class, 'store']);
    Route::delete('/calendar/{scheduledRoutine}', [ScheduledRoutineController::class, 'delete']);
    Route::delete('/routines/{routine}', [RoutineController::class, 'delete']);
    Route::delete('/exercises/{exercise}', [ExerciseController::class, 'delete']);
    Route::put('/exercises/{exercise}', [ExerciseController::class, 'update']);
    Route::get('/exercises/{exercise}', [ExerciseController::class, 'show']);
    Route::post('/routines/{routine}/sync-exercises', [RoutineController::class, 'syncExercises']);
    Route::get('/routines/{routine}', [RoutineController::class, 'show']);
    Route::put('/routines/{routine}', [RoutineController::class, 'update']);
});
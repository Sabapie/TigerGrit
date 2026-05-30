<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\RoutineController;
use App\Http\Controllers\ScheduledRoutineController;use App\Http\Controllers\CommunityController;

// Sesion
Route::post('/register', [AuthController::class, 'register']); //Cuenta nueva
Route::post('/login', [AuthController::class, 'login']); //Usuario existente


Route::middleware('auth:sanctum')->group(function () {

    // Usuario
    Route::get('/user', [AuthController::class, 'user']); // info
    Route::post('/logout', [AuthController::class, 'logout']); // salir

    // Calendario
    Route::get('/calendar', [ScheduledRoutineController::class, 'index']); // info 
    Route::post('/calendar', [ScheduledRoutineController::class, 'store']); // guardar
    Route::delete('/calendar/{scheduledRoutine}', [ScheduledRoutineController::class, 'delete']); // borrar


    // Ejercicios    
    Route::get('/exercises', [ExerciseController::class, 'index']); // info
    Route::post('/exercises', [ExerciseController::class, 'store']); // guardar
    Route::delete('/exercises/{exercise}', [ExerciseController::class, 'delete']); // borrar id
    Route::put('/exercises/{exercise}', [ExerciseController::class, 'update']); // actualizar id
    Route::get('/exercises/{exercise}', [ExerciseController::class, 'show']); // info id


    // Rutinas
    Route::get('/routines', [RoutineController::class, 'index']); // info
    Route::post('/routines', [RoutineController::class, 'store']); // guardar
    Route::get('/routines/{routine}', [RoutineController::class, 'show']); // info id
    Route::put('/routines/{routine}', [RoutineController::class, 'update']); // actualizar id
    Route::delete('/routines/{routine}', [RoutineController::class, 'delete']); // borrar id
    Route::post('/routines/{routine}/exercises', [RoutineController::class, 'attachExercise']); // guardar id
    Route::post('/routines/{routine}/sync-exercises', [RoutineController::class, 'syncExercises']); // guardar id ejer

    // Comunidad
    Route::get('/users', [CommunityController::class, 'users']); // info us
    Route::post('/conversations/private', [CommunityController::class, 'createPrivate']); // crear priv
    Route::get('/conversations', [CommunityController::class, 'conversations']); // info con
    Route::get('/conversations/{conversation}', [CommunityController::class, 'show']); // info mess
    Route::post('/messages', [CommunityController::class, 'sendMessage']); // enviar
    Route::get('/messages/{conversation}', [CommunityController::class, 'messages']); // info mess
    
});
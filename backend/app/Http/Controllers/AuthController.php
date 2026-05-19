<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Hash; // Metodo de encriptacion

class AuthController extends Controller
{
    // Registro de usuario
    public function register(Request $request)
    {
        // Valida los datos de entrada
        $request->validate([
            'name' => 'required|string|max:30', // El campo name es obligatorio, debe ser una cadena de texto y no puede tener más de 30 caracteres
            'email' => 'required|email|unique:users', // El campo email es obligatorio, debe ser un email válido y no puede repetirse en la tabla users
            'password' => 'required|min:6' // El campo password es obligatorio y debe tener al menos 6 caracteres
        ]);

        // Crea el usuario
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password) // Hash::make() se utiliza para encriptar la contraseña antes de guardarla en la base de datos
        ]);

        // Crea un token de autenticación para el usuario
        $token = $user->createToken('auth_token')->plainTextToken;

        // Devuelve la respuesta con el usuario y el token
        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) { // Hash::check() se utiliza para comparar la contraseña ingresada con la contraseña encriptada almacenada en la base de datos

            return response()->json([
                'message' => 'Credenciales incorrectas'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }
    
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete(); 

        return response()->json([
            'message' => 'Sesión cerrada correctamente'
        ]);
    }

}

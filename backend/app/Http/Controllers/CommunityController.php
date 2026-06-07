<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class CommunityController extends Controller
{
    // GET /users — lista de usuarios para iniciar chat
    public function users(Request $request)
    {
        $users = User::where('id', '!=', $request->user()->id)
            ->select('id', 'name', 'email')
            ->get();

        return response()->json($users);
    }

    // POST /conversations/private — crear chat privado
    public function createPrivate(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id'
        ]);

        // Busca si ya existe una conversación privada entre los dos
        $existing = $request->user()
            ->conversations()
            ->where('type', 'private')
            ->whereHas('users', fn($q) => $q->where('users.id', $request->user_id)) // filtra solo los registros con la id del usuario
            ->first();

        if ($existing) {
            return response()->json($existing);
        }

        // Crea la conversación
        $conversation = Conversation::create([
            'type' => 'private'
        ]);

        // Añade los dos usuarios
        $conversation->users()->attach([
            $request->user()->id,
            $request->user_id
        ]);

        return response()->json($conversation, 201);
    }

    // GET /conversations — lista de conversaciones del usuario
    public function conversations(Request $request)
    {
        $conversations = $request->user()
            ->conversations()
            ->with(['users:id,name', 'messages' => fn($q) => $q->latest()->limit(1)]) // obtiene las conversaciones del usuario
            ->get();

        return response()->json($conversations);
    }

    // GET /conversations/{id} — conversación con sus mensajes
    public function show(Conversation $conversation)
    {
        $conversation->load([
            'users:id,name',
            'messages.user:id,name' 
        ]);

        return response()->json($conversation);
    }

    // POST /messages — enviar mensaje
    public function sendMessage(Request $request)
    {
        $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
            'content'         => 'required_without_all:exercise_id,routine_id|nullable|string',
            'type'            => 'in:text,exercise,routine',
            'exercise_id'     => 'nullable|exists:exercises,id',
            'routine_id'      => 'nullable|exists:routines,id',
        ]);

        $message = Message::create([
            'conversation_id' => $request->conversation_id,
            'user_id'         => $request->user()->id,
            'type'            => $request->type ?? 'text',
            'content'         => $request->content,
            'exercise_id'     => $request->exercise_id,
            'routine_id'      => $request->routine_id,
        ]);

        $message->load([
            'user:id,name',
            'exercise',   
            'routine'     
        ]);

        return response()->json($message, 201);
    }

    // GET /messages/{conversation} — mensajes de una conversación
    public function messages(Conversation $conversation)
    {
        $messages = $conversation->messages() // obtiene todos los mensajes de la conversación en orden
            ->with(
            'user:id,name',
            'exercise', 
            'routine' 
            )
            ->orderBy('created_at')
            ->get();

        return response()->json($messages);
    }
}
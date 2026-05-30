<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'conversation_id',
        'user_id',
        'type',
        'content',
        'exercise_id',
        'routine_id'
    ];

    public function conversation()
    {
        return $this->belongsTo(
            Conversation::class
        );
    }

    public function user()
    {
        return $this->belongsTo(
            User::class
        );
    }

    public function exercise()
    {
        return $this->belongsTo(
            Exercise::class
        );
    }

    public function routine()
    {
        return $this->belongsTo(
            Routine::class
        );
    }
}
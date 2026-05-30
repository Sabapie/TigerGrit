<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // <-- Agrega esta línea para usar Sanctum
use App\Models\Conversation;
use App\Models\Message;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function exercises()
    {
        return $this->hasMany(Exercise::class); // Relación con los ejercicios creados por el usuario
    }

    public function routines()
    {
        return $this->hasMany(Routine::class); // Relación con las rutinas creadas por el usuario
    }

    public function scheduledRoutines()
    {
        return $this->hasMany(ScheduledRoutine::class); // Relación con las programaciones de rutinas del usuario
    }

    public function conversations()
    {
        return $this->belongsToMany(
            Conversation::class,
            'conversation_user'
        )
        ->withPivot('last_read_at')
        ->withTimestamps();
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
    
}

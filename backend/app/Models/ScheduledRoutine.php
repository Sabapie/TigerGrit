<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduledRoutine extends Model
{
    //
    protected $fillable = [

        'user_id',
        'routine_id',
        'scheduled_date',
        'completed'

    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function routine()
    {
        return $this->belongsTo(Routine::class);
    }
    
}

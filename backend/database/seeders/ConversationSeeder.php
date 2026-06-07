<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Conversation;

class ConversationSeeder extends Seeder
{
    public function run(): void
    {
        Conversation::create([
            'id' => 1,
            'type' => 'group',
            'name' => 'Chat grupal',
            'description' => 'Chat entre 2 usuarios',
        ]);

        Conversation::create([
            'id' => 2,
            'type' => 'community',
            'name' => 'Chat global',
            'description' => 'Chat de todos los usuarios',
        ]);
    }
}
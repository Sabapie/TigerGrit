<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Conversation;

class ConversationUserSeeder extends Seeder
{
    public function run(): void
    {
        $user1 = User::where('email', 'user1@test.com')->first();
        $user2 = User::where('email', 'user2@test.com')->first();
        $user3 = User::where('email', 'user3@test.com')->first();

        // Chat grupal (user1 + user2)
        DB::table('conversation_user')->insert([
            [
                'conversation_id' => 1,
                'user_id' => $user1->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'conversation_id' => 1,
                'user_id' => $user2->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Chat global (los 3)
        DB::table('conversation_user')->insert([
            [
                'conversation_id' => 2,
                'user_id' => $user1->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'conversation_id' => 2,
                'user_id' => $user2->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'conversation_id' => 2,
                'user_id' => $user3->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

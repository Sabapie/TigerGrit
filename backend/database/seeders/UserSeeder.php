<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Usuario 1',
            'email' => 'user1@test.com',
            'password' => Hash::make('123456'),
        ]);

        User::create([
            'name' => 'Usuario 2',
            'email' => 'user2@test.com',
            'password' => Hash::make('123456'),
        ]);

        User::create([
            'name' => 'Usuario 3',
            'email' => 'user3@test.com',
            'password' => Hash::make('123456'),
        ]);
    }
}
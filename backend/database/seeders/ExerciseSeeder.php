<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Exercise;

class ExerciseSeeder extends Seeder
{
    public function run(): void
    {
        $exercises = [

            // PECHO
            [
                'name' => 'Press banca inclinado',
                'description' => 'Ejercicio de pecho superior con barra',
                'duration' => 20,
                'rest' => 90,
                'repetitions' => 10,
                'sets' => 4,
                'weight' => 70,
                'weight_unit' => 'kg',
                'muscle_group' => 'Pecho',
                'muscle_area' => 'Pectoral superior',
            ],
            [
                'name' => 'Press banca plano',
                'description' => 'Ejercicio principal para desarrollo del pecho',
                'duration' => 20,
                'rest' => 120,
                'repetitions' => 8,
                'sets' => 4,
                'weight' => 80,
                'weight_unit' => 'kg',
                'muscle_group' => 'Pecho',
                'muscle_area' => 'Pectoral medio',
            ],
            [
                'name' => 'Fondos en paralelas',
                'description' => 'Ejercicio para pecho inferior y tríceps',
                'duration' => 15,
                'rest' => 90,
                'repetitions' => 12,
                'sets' => 4,
                'weight' => 0,
                'weight_unit' => 'kg',
                'muscle_group' => 'Pecho',
                'muscle_area' => 'Pectoral inferior',
            ],

            // ESPALDA
            [
                'name' => 'Dominadas',
                'description' => 'Ejercicio de dorsal con peso corporal',
                'duration' => 20,
                'rest' => 90,
                'repetitions' => 10,
                'sets' => 4,
                'weight' => 0,
                'weight_unit' => 'kg',
                'muscle_group' => 'Espalda',
                'muscle_area' => 'Dorsal',
            ],
            [
                'name' => 'Remo con barra',
                'description' => 'Trabajo de espalda media',
                'duration' => 20,
                'rest' => 90,
                'repetitions' => 10,
                'sets' => 4,
                'weight' => 80,
                'weight_unit' => 'kg',
                'muscle_group' => 'Espalda',
                'muscle_area' => 'Dorsal medio',
            ],
            [
                'name' => 'Peso muerto',
                'description' => 'Ejercicio compuesto para espalda y piernas',
                'duration' => 30,
                'rest' => 180,
                'repetitions' => 5,
                'sets' => 5,
                'weight' => 120,
                'weight_unit' => 'kg',
                'muscle_group' => 'Espalda',
                'muscle_area' => 'Lumbar',
            ],

            // HOMBRO
            [
                'name' => 'Press militar',
                'description' => 'Trabajo principal del deltoides',
                'duration' => 20,
                'rest' => 90,
                'repetitions' => 10,
                'sets' => 4,
                'weight' => 50,
                'weight_unit' => 'kg',
                'muscle_group' => 'Hombro',
                'muscle_area' => 'Deltoides anterior',
            ],
            [
                'name' => 'Elevaciones laterales',
                'description' => 'Aislamiento del deltoides lateral',
                'duration' => 15,
                'rest' => 60,
                'repetitions' => 15,
                'sets' => 3,
                'weight' => 10,
                'weight_unit' => 'kg',
                'muscle_group' => 'Hombro',
                'muscle_area' => 'Deltoides lateral',
            ],

            // BICEPS
            [
                'name' => 'Curl con barra',
                'description' => 'Ejercicio básico de bíceps',
                'duration' => 15,
                'rest' => 60,
                'repetitions' => 12,
                'sets' => 4,
                'weight' => 30,
                'weight_unit' => 'kg',
                'muscle_group' => 'Bíceps',
                'muscle_area' => 'Bíceps',
            ],
            [
                'name' => 'Curl martillo',
                'description' => 'Trabajo del braquial',
                'duration' => 15,
                'rest' => 60,
                'repetitions' => 12,
                'sets' => 3,
                'weight' => 16,
                'weight_unit' => 'kg',
                'muscle_group' => 'Bíceps',
                'muscle_area' => 'Braquial',
            ],

            // TRICEPS
            [
                'name' => 'Press francés',
                'description' => 'Ejercicio clásico de tríceps',
                'duration' => 15,
                'rest' => 60,
                'repetitions' => 12,
                'sets' => 4,
                'weight' => 30,
                'weight_unit' => 'kg',
                'muscle_group' => 'Tríceps',
                'muscle_area' => 'Tríceps',
            ],

            // PIERNAS
            [
                'name' => 'Sentadilla',
                'description' => 'Ejercicio principal para piernas',
                'duration' => 25,
                'rest' => 120,
                'repetitions' => 8,
                'sets' => 4,
                'weight' => 100,
                'weight_unit' => 'kg',
                'muscle_group' => 'Piernas',
                'muscle_area' => 'Cuádriceps',
            ],
            [
                'name' => 'Prensa de piernas',
                'description' => 'Trabajo de cuádriceps en máquina',
                'duration' => 20,
                'rest' => 90,
                'repetitions' => 12,
                'sets' => 4,
                'weight' => 150,
                'weight_unit' => 'kg',
                'muscle_group' => 'Piernas',
                'muscle_area' => 'Cuádriceps',
            ],
            [
                'name' => 'Curl femoral',
                'description' => 'Trabajo de isquiotibiales',
                'duration' => 15,
                'rest' => 60,
                'repetitions' => 12,
                'sets' => 4,
                'weight' => 40,
                'weight_unit' => 'kg',
                'muscle_group' => 'Piernas',
                'muscle_area' => 'Isquiotibiales',
            ],

            // GLÚTEO
            [
                'name' => 'Hip Thrust',
                'description' => 'Ejercicio principal para glúteos',
                'duration' => 20,
                'rest' => 90,
                'repetitions' => 12,
                'sets' => 4,
                'weight' => 80,
                'weight_unit' => 'kg',
                'muscle_group' => 'Glúteo',
                'muscle_area' => 'Glúteo mayor',
            ],

            // CORE
            [
                'name' => 'Plancha',
                'description' => 'Ejercicio isométrico abdominal',
                'duration' => 60,
                'rest' => 60,
                'repetitions' => 1,
                'sets' => 4,
                'weight' => 0,
                'weight_unit' => 'kg',
                'muscle_group' => 'Core',
                'muscle_area' => 'Abdomen',
            ],
            [
                'name' => 'Crunch abdominal',
                'description' => 'Trabajo básico del abdomen',
                'duration' => 15,
                'rest' => 45,
                'repetitions' => 20,
                'sets' => 4,
                'weight' => 0,
                'weight_unit' => 'kg',
                'muscle_group' => 'Core',
                'muscle_area' => 'Abdomen',
            ],

            // CARDIO
            [
                'name' => 'Correr en cinta',
                'description' => 'Ejercicio cardiovascular',
                'duration' => 900,
                'rest' => 0,
                'repetitions' => 1,
                'sets' => 1,
                'weight' => 0,
                'weight_unit' => 'kg',
                'muscle_group' => 'General',
                'muscle_area' => 'Cardio',
            ],
        ];

        foreach ($exercises as $exercise) {
            Exercise::create([
                ...$exercise,
                'user_id' => null, // Oficial
            ]);
        }
    }
}
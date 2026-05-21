<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Exercise;

class ExerciseSeeder extends Seeder
{
    public function run(): void
    {

    Exercise::create([
        'name' => 'Press banca inclinado',
        'description' => 'Ejercicio de pecho superior con barra',
        'duration' => 20,
        'rest' => 90,
        'repetitions' => 10,
        'sets' => 4,
        'weight' => '70kg',
        'muscle_group' => 'Pecho',
        'muscle_area' => 'Pectoral superior',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Aperturas con mancuernas',
        'description' => 'Ejercicio de pecho con mancuernas en banco plano',
        'duration' => 15,
        'rest' => 60,
        'repetitions' => 12,
        'sets' => 3,
        'weight' => '20kg',
        'muscle_group' => 'Pecho',
        'muscle_area' => 'Pectoral medio',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Fondos en paralelas',
        'description' => 'Ejercicio de pecho inferior con peso corporal',
        'duration' => 15,
        'rest' => 90,
        'repetitions' => 12,
        'sets' => 4,
        'weight' => null,
        'muscle_group' => 'Pecho',
        'muscle_area' => 'Pectoral inferior',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Remo con barra',
        'description' => 'Ejercicio de espalda media con barra',
        'duration' => 20,
        'rest' => 90,
        'repetitions' => 10,
        'sets' => 4,
        'weight' => '80kg',
        'muscle_group' => 'Espalda',
        'muscle_area' => 'Dorsal medio',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Peso muerto',
        'description' => 'Ejercicio compound de espalda baja y piernas',
        'duration' => 30,
        'rest' => 180,
        'repetitions' => 5,
        'sets' => 5,
        'weight' => '120kg',
        'muscle_group' => 'Espalda',
        'muscle_area' => 'Lumbar',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Jalón al pecho',
        'description' => 'Ejercicio de dorsal en polea alta',
        'duration' => 15,
        'rest' => 60,
        'repetitions' => 12,
        'sets' => 4,
        'weight' => '60kg',
        'muscle_group' => 'Espalda',
        'muscle_area' => 'Dorsal',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Press militar',
        'description' => 'Ejercicio de hombro con barra en pie',
        'duration' => 20,
        'rest' => 90,
        'repetitions' => 10,
        'sets' => 4,
        'weight' => '50kg',
        'muscle_group' => 'Hombro',
        'muscle_area' => 'Deltoides anterior',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Elevaciones laterales',
        'description' => 'Ejercicio de hombro lateral con mancuernas',
        'duration' => 15,
        'rest' => 60,
        'repetitions' => 15,
        'sets' => 3,
        'weight' => '10kg',
        'muscle_group' => 'Hombro',
        'muscle_area' => 'Deltoides lateral',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Pájaros',
        'description' => 'Ejercicio de hombro posterior con mancuernas',
        'duration' => 15,
        'rest' => 60,
        'repetitions' => 15,
        'sets' => 3,
        'weight' => '8kg',
        'muscle_group' => 'Hombro',
        'muscle_area' => 'Deltoides posterior',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Curl con barra',
        'description' => 'Ejercicio básico de bíceps con barra',
        'duration' => 15,
        'rest' => 60,
        'repetitions' => 12,
        'sets' => 4,
        'weight' => '30kg',
        'muscle_group' => 'Bíceps',
        'muscle_area' => 'Bíceps',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Curl martillo',
        'description' => 'Ejercicio de bíceps con agarre neutro',
        'duration' => 15,
        'rest' => 60,
        'repetitions' => 12,
        'sets' => 3,
        'weight' => '16kg',
        'muscle_group' => 'Bíceps',
        'muscle_area' => 'Braquial',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Press francés',
        'description' => 'Ejercicio de tríceps con barra en banco',
        'duration' => 15,
        'rest' => 60,
        'repetitions' => 12,
        'sets' => 4,
        'weight' => '30kg',
        'muscle_group' => 'Tríceps',
        'muscle_area' => 'Tríceps',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Extensión en polea',
        'description' => 'Ejercicio de tríceps en polea alta',
        'duration' => 15,
        'rest' => 60,
        'repetitions' => 15,
        'sets' => 3,
        'weight' => '25kg',
        'muscle_group' => 'Tríceps',
        'muscle_area' => 'Tríceps',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Prensa de piernas',
        'description' => 'Ejercicio de cuádriceps en máquina',
        'duration' => 20,
        'rest' => 90,
        'repetitions' => 12,
        'sets' => 4,
        'weight' => '150kg',
        'muscle_group' => 'Piernas',
        'muscle_area' => 'Cuádriceps',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Curl femoral',
        'description' => 'Ejercicio de isquiotibiales en máquina',
        'duration' => 15,
        'rest' => 60,
        'repetitions' => 12,
        'sets' => 4,
        'weight' => '40kg',
        'muscle_group' => 'Piernas',
        'muscle_area' => 'Isquiotibiales',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Zancadas',
        'description' => 'Ejercicio de piernas con mancuernas en movimiento',
        'duration' => 20,
        'rest' => 90,
        'repetitions' => 12,
        'sets' => 3,
        'weight' => '20kg',
        'muscle_group' => 'Piernas',
        'muscle_area' => 'Cuádriceps',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Hip thrust',
        'description' => 'Ejercicio de glúteo con barra en banco',
        'duration' => 20,
        'rest' => 90,
        'repetitions' => 12,
        'sets' => 4,
        'weight' => '80kg',
        'muscle_group' => 'Glúteo',
        'muscle_area' => 'Glúteo mayor',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Patada de glúteo en polea',
        'description' => 'Ejercicio de glúteo en polea baja',
        'duration' => 15,
        'rest' => 60,
        'repetitions' => 15,
        'sets' => 3,
        'weight' => '15kg',
        'muscle_group' => 'Glúteo',
        'muscle_area' => 'Glúteo mayor',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Plancha',
        'description' => 'Ejercicio isométrico de core',
        'duration' => 60,
        'rest' => 60,
        'repetitions' => 1,
        'sets' => 4,
        'weight' => null,
        'muscle_group' => 'Core',
        'muscle_area' => 'Abdomen',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Crunch abdominal',
        'description' => 'Ejercicio básico de abdomen',
        'duration' => 15,
        'rest' => 45,
        'repetitions' => 20,
        'sets' => 4,
        'weight' => null,
        'muscle_group' => 'Core',
        'muscle_area' => 'Abdomen',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Rueda abdominal',
        'description' => 'Ejercicio avanzado de core con rueda',
        'duration' => 15,
        'rest' => 60,
        'repetitions' => 12,
        'sets' => 3,
        'weight' => null,
        'muscle_group' => 'Core',
        'muscle_area' => 'Abdomen',
        'is_official' => true
    ]);

    Exercise::create([
        'name' => 'Correr en cinta',
        'description' => 'Ejercicio de cardio en cinta',
        'duration' => 900,
        'rest' => 0,
        'repetitions' => 1,
        'sets' => 1,
        'weight' => null,
        'muscle_group' => 'default',
        'muscle_area' => 'default',
        'is_official' => true
    ]);

    }
}
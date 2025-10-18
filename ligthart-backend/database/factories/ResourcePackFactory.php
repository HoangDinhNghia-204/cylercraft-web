<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ResourcePack>
 */
class ResourcePackFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['Gói tài nguyên cho Java Edition', 'Gói tài nguyên cho Bedrock Edition']),
            'description' => fake()->sentence(10),
            'download_url' => '#', // Để tạm link là #
        ];
    }
}

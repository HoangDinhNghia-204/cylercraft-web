<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class WikiArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // Sửa lại dòng này
            'command' => '/' . fake()->word(), // Tạo ra một lệnh ngẫu nhiên, ví dụ: /home
            'description' => fake()->sentence(12),
            'category' => fake()->randomElement(['co-ban', 'nang-cao', 'khac']),
        ];
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true), // Tạo tên sản phẩm ngẫu nhiên
            'description' => fake()->sentence(15), // Tạo mô tả ngẫu nhiên
            'price' => fake()->randomElement([50000, 100000, 150000, 250000]), // Giá ngẫu nhiên
            'image_url' => 'item' . fake()->numberBetween(1, 4) . '.png', // Tên ảnh ngẫu nhiên
        ];
    }
}

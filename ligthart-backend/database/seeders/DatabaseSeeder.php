<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\ResourcePack;
use App\Models\WikiArticle;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Tạo 10 người dùng ảo
        User::factory(10)->create();

        // Tạo 4 sản phẩm giống như trên trang shop.html
        Product::factory(4)->create();

        // Tạo 6 bài viết wiki giống như trên trang wiki.html
        WikiArticle::factory(6)->create();

        // Tạo 2 gói tài nguyên
        ResourcePack::factory(2)->create();
    }
}

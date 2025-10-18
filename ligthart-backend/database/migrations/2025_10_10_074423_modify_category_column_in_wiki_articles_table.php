<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('wiki_articles', function (Blueprint $table) {
            // Thay đổi cột 'category' để cho phép giá trị NULL
            $table->string('category')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('wiki_articles', function (Blueprint $table) {
            // Hoàn tác lại nếu cần
            $table->string('category')->nullable(false)->change();
        });
    }
};

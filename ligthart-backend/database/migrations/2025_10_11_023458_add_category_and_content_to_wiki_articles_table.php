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
            $table->renameColumn('command', 'title'); // Đổi lại thành 'title' cho tổng quát
            $table->foreignId('wiki_category_id')->nullable()->constrained()->onDelete('set null');
            $table->text('content')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('wiki_articles', function (Blueprint $table) {
            //
        });
    }
};

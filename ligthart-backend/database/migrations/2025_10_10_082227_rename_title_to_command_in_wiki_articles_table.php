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
            $table->renameColumn('title', 'command');
        });
    }

    public function down(): void
    {
        Schema::table('wiki_articles', function (Blueprint $table) {
            $table->renameColumn('command', 'title');
        });
    }
};

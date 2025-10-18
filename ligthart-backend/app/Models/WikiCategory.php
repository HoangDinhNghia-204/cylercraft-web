<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WikiCategory extends Model
{
    use HasFactory;
    protected $fillable = ['name'];
    public function wikiArticles()
    {
        return $this->hasMany(WikiArticle::class);
    }
}

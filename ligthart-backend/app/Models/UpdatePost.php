<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UpdatePost extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'content', 'image_url'];
}

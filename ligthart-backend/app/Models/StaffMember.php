<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StaffMember extends Model
{
    protected $fillable = ['name', 'in_game_name', 'avatar_url', 'staff_category_id'];
    public function staffCategory()
    {
        return $this->belongsTo(StaffCategory::class);
    }
}

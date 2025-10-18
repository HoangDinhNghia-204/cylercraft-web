<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffCategory extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'order'];

    /**
     * Sửa lại tên hàm thành camelCase
     */
    public function staffMembers()
    {
        return $this->hasMany(StaffMember::class);
    }
}

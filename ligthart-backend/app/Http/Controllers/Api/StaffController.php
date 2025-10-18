<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StaffCategory;

class StaffController extends Controller
{
    public function indexByCategory()
    {
        // Tên 'staffMembers' bây giờ sẽ khớp với tên hàm trong Model
        return StaffCategory::whereHas('staffMembers')
            ->with('staffMembers')
            ->orderBy('order')
            ->get();
    }
}

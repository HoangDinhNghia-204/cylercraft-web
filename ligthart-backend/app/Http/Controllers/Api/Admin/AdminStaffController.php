<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\StaffMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminStaffController extends Controller
{
    public function index()
    {
        return StaffMember::with('staffCategory')->orderBy('id')->get();
    }

    public function show(StaffMember $staffMember)
    {
        return $staffMember;
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'in_game_name' => 'required|string|max:255',
            'staff_category_id' => 'required|exists:staff_categories,id', // <-- THÊM LẠI DÒNG NÀY
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        // Đoạn code còn lại đã đúng, không cần thay đổi
        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('staff-avatars', 'public');
            $validatedData['avatar_url'] = $path;
        }

        unset($validatedData['avatar']);
        $staffMember = StaffMember::create($validatedData);

        return response()->json($staffMember, 201);
    }

    public function update(Request $request, StaffMember $staffMember)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'in_game_name' => 'required|string|max:255',
            'staff_category_id' => 'required|exists:staff_categories,id',
            'avatar' => 'nullable|image|max:2048',
        ]);

        // Lấy tất cả dữ liệu đã validate trừ 'avatar'
        $updateData = collect($validatedData)->except('avatar')->toArray();

        if ($request->hasFile('avatar')) {
            if ($staffMember->avatar_url) {
                Storage::disk('public')->delete($staffMember->avatar_url);
            }
            $path = $request->file('avatar')->store('staff-avatars', 'public');
            $updateData['avatar_url'] = $path;
        }

        $staffMember->update($updateData);

        return response()->json($staffMember);
    }

    public function destroy(StaffMember $staffMember)
    {
        if ($staffMember->avatar_url) {
            Storage::disk('public')->delete($staffMember->avatar_url);
        }
        $staffMember->delete();

        return response()->json(null, 204);
    }
}

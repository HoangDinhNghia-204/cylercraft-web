<?php
namespace App\Http\Controllers\Api\Admin;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AdminUserController extends Controller
{
    public function index() { return User::latest('id')->get(); }

    public function show(User $user) {
        return $user;
    }

    public function update(Request $request, User $user) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'is_admin' => 'required|boolean',
            'password' => 'nullable|string|min:8', // Mật khẩu không bắt buộc
        ]);

        $updateData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'is_admin' => $validated['is_admin'],
        ];

        // Chỉ cập nhật mật khẩu nếu admin có nhập vào
        if (!empty($validated['password'])) {
            $updateData['password'] = Hash::make($validated['password']);
        }

        $user->update($updateData);

        return response()->json($user);
    }

    public function destroy(User $user) {
        // Ngăn admin tự xóa chính mình
        if ($user->id === auth()->id()) {
            return response()->json(['message' => 'Bạn không thể xóa chính mình.'], 403);
        }
        $user->delete();
        return response()->json(null, 204);
    }
}

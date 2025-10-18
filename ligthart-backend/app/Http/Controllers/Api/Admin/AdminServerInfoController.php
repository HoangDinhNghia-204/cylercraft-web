<?php
namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServerInfo;
use Illuminate\Http\Request;

class AdminServerInfoController extends Controller
{
    // Lấy thông tin server duy nhất
    public function show()
    {
        // Tìm record đầu tiên, nếu không có thì tạo mới với giá trị rỗng
        return ServerInfo::firstOrCreate([], ['ip_address' => '', 'discord_url' => '']);
    }

    // Cập nhật thông tin server
    public function update(Request $request)
    {
        $validated = $request->validate([
            'ip_address' => 'required|string|max:255',
            'discord_url' => 'required|url|max:255',
        ]);

        $serverInfo = ServerInfo::firstOrCreate([]);
        $serverInfo->update($validated);

        return response()->json($serverInfo);
    }
}

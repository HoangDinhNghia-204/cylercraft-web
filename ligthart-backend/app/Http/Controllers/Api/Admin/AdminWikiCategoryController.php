<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\WikiCategory;
use Illuminate\Http\Request;

class AdminWikiCategoryController extends Controller
{
    /**
     * Lấy danh sách tất cả các danh mục Wiki.
     */
    public function index()
    {
        return WikiCategory::orderBy('name')->get();
    }

    /**
     * Lưu một danh mục Wiki mới vào database.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:wiki_categories,name',
        ]);

        $wikiCategory = WikiCategory::create($validatedData);

        return response()->json($wikiCategory, 201);
    }

    /**
     * Lấy thông tin chi tiết của một danh mục Wiki.
     */
    public function show(WikiCategory $wikiCategory)
    {
        return $wikiCategory;
    }

    /**
     * Cập nhật thông tin của một danh mục Wiki.
     */
    public function update(Request $request, WikiCategory $wikiCategory)
    {
        $validatedData = $request->validate([
            // Quy tắc unique sẽ bỏ qua ID của chính record đang được sửa
            'name' => 'required|string|max:255|unique:wiki_categories,name,' . $wikiCategory->id,
        ]);

        $wikiCategory->update($validatedData);

        return response()->json($wikiCategory);
    }

    /**
     * Xóa một danh mục Wiki.
     */
    public function destroy(WikiCategory $wikiCategory)
    {
        $wikiCategory->delete();

        return response()->json(null, 204);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UpdatePost;

class UpdatePostController extends Controller
{
    /**
     * Lấy danh sách tất cả bài viết.
     */
    public function index()
    {
        return UpdatePost::latest()->get();
    }

    /**
     * Lấy bài viết mới nhất.
     */
    public function latest()
    {
        return UpdatePost::latest()->first();
    }

    /**
     * Lấy chi tiết một bài viết.
     */
    public function show(UpdatePost $updatePost)
    {
        return $updatePost;
    }

    /**
     * Lấy các bài viết gần đây, ngoại trừ bài viết hiện tại.
     */
    public function recent(UpdatePost $excludePost)
    {
        return UpdatePost::where('id', '!=', $excludePost->id)
            ->latest()
            ->take(5)
            ->get();
    }
}

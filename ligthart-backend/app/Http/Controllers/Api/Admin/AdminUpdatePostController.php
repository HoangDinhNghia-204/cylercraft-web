<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\UpdatePost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminUpdatePostController extends Controller
{
    public function index()
    {
        return UpdatePost::latest()->get();
    }

    public function show(UpdatePost $updatePost)
    {
        return $updatePost;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image_url'] = $request->file('image')->store('updates', 'public');
        }

        $post = UpdatePost::create($validated);

        return response()->json($post, 201);
    }

    public function update(Request $request, UpdatePost $updatePost)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $updateData = [
            'title' => $validated['title'],
            'description' => $validated['description'],
            'content' => $validated['content'],
        ];

        if ($request->hasFile('image')) {
            if ($updatePost->image_url) {
                Storage::disk('public')->delete($updatePost->image_url);
            }
            $updateData['image_url'] = $request->file('image')->store('updates', 'public');
        }

        $updatePost->update($updateData);

        return response()->json($updatePost);
    }

    public function destroy(UpdatePost $updatePost)
    {
        if ($updatePost->image_url) {
            Storage::disk('public')->delete($updatePost->image_url);
        }
        $updatePost->delete();

        return response()->json(null, 204);
    }

    /**
     * Xử lý upload ảnh từ trình soạn thảo Rich Text.
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $path = $request->file('image')->store('content-images', 'public');

        return response()->json([
            'url' => asset('storage/' . $path)
        ]);
    }
}

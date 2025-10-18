<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ResourcePack;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminResourcePackController extends Controller
{
    public function index()
    {
        return ResourcePack::latest()->get();
    }

    public function show(ResourcePack $resourcePack)
    {
        return $resourcePack;
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'resource_file' => 'required|file|mimes:zip,mcpack|max:20480',
        ]);

        if ($request->hasFile('resource_file')) {
            $path = $request->file('resource_file')->store('resource-packs', 'public');
            $validatedData['download_url'] = $path;
        }

        unset($validatedData['resource_file']);
        $resourcePack = ResourcePack::create($validatedData);

        return response()->json($resourcePack, 201);
    }

    public function update(Request $request, ResourcePack $resourcePack)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'resource_file' => 'nullable|file|mimes:zip,mcpack|max:20480',
        ]);

        if ($request->hasFile('resource_file')) {
            if ($resourcePack->download_url) {
                Storage::disk('public')->delete($resourcePack->download_url);
            }
            $path = $request->file('resource_file')->store('resource-packs', 'public');
            $validatedData['download_url'] = $path;
        }

        unset($validatedData['resource_file']);
        $resourcePack->update($validatedData);

        return response()->json($resourcePack);
    }

    public function destroy(ResourcePack $resourcePack)
    {
        if ($resourcePack->download_url) {
            Storage::disk('public')->delete($resourcePack->download_url);
        }
        $resourcePack->delete();

        return response()->json(null, 204);
    }
}

<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\StaffCategory;
use Illuminate\Http\Request;

class AdminStaffCategoryController extends Controller
{
    public function index()
    {
        return StaffCategory::orderBy('order')->get();
    }

    public function show(StaffCategory $staffCategory)
    {
        return $staffCategory;
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:staff_categories,name',
            'order' => 'required|integer',
        ]);

        $staffCategory = StaffCategory::create($validatedData);

        return response()->json($staffCategory, 201);
    }

    public function update(Request $request, StaffCategory $staffCategory)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:staff_categories,name,' . $staffCategory->id,
            'order' => 'required|integer',
        ]);

        $staffCategory->update($validatedData);

        return response()->json($staffCategory);
    }

    public function destroy(StaffCategory $staffCategory)
    {
        $staffCategory->delete();

        return response()->json(null, 204);
    }
}

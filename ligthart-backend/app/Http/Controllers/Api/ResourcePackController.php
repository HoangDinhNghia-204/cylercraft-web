<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ResourcePack;
use Illuminate\Http\Request;

class ResourcePackController extends Controller
{
    public function index()
    {
        return ResourcePack::all();
    }
}

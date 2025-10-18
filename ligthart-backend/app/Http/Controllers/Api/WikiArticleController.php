<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\WikiArticle;
use Illuminate\Http\Request;

class WikiArticleController extends Controller
{
    // Hàm mới có khả năng lọc
    public function index(Request $request)
    {
        $query = WikiArticle::with('wikiCategory')->latest();

        if ($request->has('category') && $request->input('category') != '') {
            $query->where('wiki_category_id', $request->input('category'));
        }

        return $query->get();
    }
    public function show(WikiArticle $wikiArticle)
    {
        // Eager load category để có thông tin cho breadcrumb
        return $wikiArticle->load('wikiCategory');
    }
}

<?php
namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\WikiArticle;
use Illuminate\Http\Request;

class AdminWikiController extends Controller
{
    public function index() { return WikiArticle::with('wikiCategory')->latest()->get(); }
    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'content' => 'required|string',
            'wiki_category_id' => 'required|exists:wiki_categories,id',
        ]);
        $article = WikiArticle::create($validated);
        return response()->json($article, 201);
    }
    public function show(WikiArticle $wikiArticle) { return $wikiArticle->load('wikiCategory'); }
    public function update(Request $request, WikiArticle $wikiArticle) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'content' => 'required|string',
            'wiki_category_id' => 'required|exists:wiki_categories,id',
        ]);
        $wikiArticle->update($validated);
        return response()->json($wikiArticle);
    }
    public function destroy(WikiArticle $wikiArticle) {
        $wikiArticle->delete();
        return response()->json(null, 204);
    }
}

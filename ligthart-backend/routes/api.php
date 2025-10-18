<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\ServerInfo;

// Import Controllers
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\WikiArticleController;
use App\Http\Controllers\Api\ResourcePackController;
use App\Http\Controllers\Api\UpdatePostController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\StaffController;

// Import Admin Controllers
use App\Http\Controllers\Api\Admin\AdminCategoryController;
use App\Http\Controllers\Api\Admin\AdminProductController;
use App\Http\Controllers\Api\Admin\AdminResourcePackController;
use App\Http\Controllers\Api\Admin\AdminServerInfoController;
use App\Http\Controllers\Api\Admin\AdminStaffController;
use App\Http\Controllers\Api\Admin\AdminUpdatePostController;
use App\Http\Controllers\Api\Admin\AdminUserController;
use App\Http\Controllers\Api\Admin\AdminWikiArticleController;
use App\Http\Controllers\Api\Admin\AdminWikiCategoryController;
use App\Http\Controllers\Api\Admin\AdminWikiController;
use App\Models\User;
use App\Http\Controllers\Api\Admin\AdminStaffCategoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ===================================
//      PUBLIC ROUTES
// ===================================

// --- Xác thực ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// --- Dữ liệu công khai ---
Route::get('/server-info', fn () => ServerInfo::first());

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::get('/categories', [AdminCategoryController::class, 'index']);

Route::get('/wiki-articles', [WikiArticleController::class, 'index']);
Route::get('/wiki-articles/{wikiArticle}', [WikiArticleController::class, 'show']);
Route::get('/wiki-categories', [AdminWikiCategoryController::class, 'index']);
Route::get('/wiki-categories/{wikiCategory}', [AdminWikiCategoryController::class, 'show']);

Route::get('/updates', [UpdatePostController::class, 'index']);
Route::get('/updates/latest', [UpdatePostController::class, 'latest']);
Route::get('/updates/recent/{excludePost}', [UpdatePostController::class, 'recent']);
Route::get('/updates/{updatePost}', [UpdatePostController::class, 'show']);

Route::get('/resource-packs', [ResourcePackController::class, 'index']);
Route::get('/staff', [StaffController::class, 'index']);
Route::get('/staff-by-category', [StaffController::class, 'indexByCategory']);

// ===================================
//      PROTECTED ROUTES
// ===================================
Route::middleware('auth:sanctum')->group(function () {

    // --- Route cho người dùng đã đăng nhập ---
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', fn (Request $request) => User::find($request->user()->id));
    Route::put('/user/password', [ProfileController::class, 'updatePassword']);
    Route::post('/user/avatar', [ProfileController::class, 'updateAvatar']);

    // --- ADMIN ONLY ROUTES ---
    Route::middleware('is.admin')->prefix('admin')->group(function () {

        // Quản lý Thông tin Server
        Route::get('/server-info', [AdminServerInfoController::class, 'show']);
        Route::put('/server-info', [AdminServerInfoController::class, 'update']);

        // Quản lý Người dùng
        Route::apiResource('/users', AdminUserController::class)->except(['store']);

        // Quản lý Sản phẩm & Danh mục Sản phẩm
        Route::apiResource('/products', AdminProductController::class);
        Route::apiResource('/categories', AdminCategoryController::class);

        // Quản lý Wiki & Danh mục Wiki
        Route::apiResource('/wiki-categories', AdminWikiCategoryController::class)->parameters(['wiki-categories' => 'wikiCategory']);
        Route::apiResource('/wiki', AdminWikiController::class)->parameters(['wiki' => 'wikiArticle']);

        // Quản lý Cập nhật
        Route::apiResource('/updates', AdminUpdatePostController::class)->parameters(['updates' => 'updatePost']);
        Route::post('/upload-image', [AdminUpdatePostController::class, 'uploadImage']);

        // Quản lý Gói Tài nguyên
        Route::apiResource('/resource-packs', AdminResourcePackController::class);

        // Quản lý Staff
        Route::apiResource('/staff', AdminStaffController::class)->parameters(['staff' => 'staffMember']);
        Route::apiResource('/staff-categories', AdminStaffCategoryController::class)->parameters(['staff-categories' => 'staffCategory']);
    });
});

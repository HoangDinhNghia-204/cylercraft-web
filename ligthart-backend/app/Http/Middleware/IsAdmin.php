<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Kiểm tra xem người dùng đã đăng nhập và có is_admin = true hay không
        if (auth()->check() && auth()->user()->is_admin) {
            return $next($request);
        }

        // Nếu không, trả về lỗi 403 Forbidden
        return response()->json(['message' => 'Forbidden: Requires admin privileges.'], 403);
    }
}

<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute; // Thêm use statement này
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WikiArticle extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'wiki_category_id', 'content'];

    public function wikiCategory() {
        return $this->belongsTo(WikiCategory::class);
    }

    /**
     * Tự động chuyển đổi ký tự xuống dòng thành thẻ <br>
     * khi truy cập thuộc tính 'content'.
     */
    protected function content(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => nl2br(e($value)),
        );
    }
}

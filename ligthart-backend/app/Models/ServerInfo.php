<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServerInfo extends Model
{
    protected $fillable = ['ip_address', 'discord_url'];
}

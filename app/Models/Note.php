<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class Note extends Model
{
    //Les attributs de note
    use HasFactory;
    
    protected $fillable = [
        'note',
        'message',
    ];
}

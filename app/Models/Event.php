<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;


class Event extends Model
{
    //Les attributs d'un événement
    use HasFactory;
    protected $fillable = [
        'title',
        'start',
        'end',
      

    ];

}

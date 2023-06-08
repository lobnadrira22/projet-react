<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\Reponse ;
use App\Models\Test;





class Question extends Model 
{
    use HasFactory;

    //Relation avec réponse
    public static function reponses() {
        return $this->embedsMany(Reponse::class);
    }
    //Les attributs de question
    protected $fillable = [
        'question',
        'niveau',
        'duree',
        'etat',
        'points',
        'réponses',
    ];

    //Realtion avec test
    public static function test() {
        return $this->embedsOne(Test::class);
    }
}





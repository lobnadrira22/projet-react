<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\Question;

class Reponse extends Model
{
    //Les attributs de réponse
    use HasFactory;
    protected $fillable = [

        'repimage',
        'reptext',
        'repcorrecte',
        'questions_id'
        
    ];

    //Relation avec question
    public static function questions() {
        return $this->embedsOne(Question::class);
    }

}

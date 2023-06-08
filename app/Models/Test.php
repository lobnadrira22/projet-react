<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\Question;

class Test extends Model
{
    //Les attributs de test
    use HasFactory;
    protected $fillable = [

        'titre',
        'departement',
        'niveaustagiaire',
        'niveautest',
        'duree',
        'questions',
        'note'
    ];

    //Relation avec question
    public static function questions() {
        return $this->embedsMany(Question::class);
    }

}


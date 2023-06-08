<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

//Relation
use App\Models\User;

class SujetStage extends Model
{

    //Les attributs de sujet de stage
    use HasFactory;

    protected $fillable = [
        'sujet',
        'technologies',
        'description',
        'datedebut',
        'nom_dept',
        'typestage',
        'etatsujet',

        'periode',

     
    ];

    
        //relation sujet de stage avec utilisateur
        public function getuser() {
            return $this->embedsOne(User::class);
            }




}

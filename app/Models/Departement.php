<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

//relation
use App\Models\User;


class Departement extends Model


{
  
      //Les attributs de département
    use HasFactory;
    protected $fillable = [
        'nom_dept',
        'nom_chef_dept',
        'etat',
         //Relation
        'users',

    ];

    //Relation avec utilisateur
    public static function users(){
        return $this->embedsMany(User::class);
    }
}

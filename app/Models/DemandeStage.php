<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

//Relation
use App\Models\DemandeStage;
use App\Models\Stagiaire;

class DemandeStage extends Model
{

      //Les attributs de demande de stage
    use HasFactory;
    protected $fillable = [
    
        'typestage',
        'nom_dept',
        'cv',
       
       
    ];

    


   
    //relation dossier avec stagiaire
    public function getstagiaire() {
      return $this->embedsOne(Stagiaire::class);
      }

} 



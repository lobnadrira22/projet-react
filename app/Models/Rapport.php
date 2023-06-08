<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\Stagiaire;
class Rapport extends Model
{

    //Les attributs de rapport
    use HasFactory;
    
    protected $fillable = [
        'filerapport',
        
    
    ];
    
    //relation dossier avec stagiaire
    public function getstagiaire() {
        return $this->embedsOne(Stagiaire::class);
        }
}

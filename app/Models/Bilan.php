<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\Stagiaire;
class Bilan extends Model
{

    //Les attributs de bilan
    use HasFactory;
    protected $fillable = [
        'bfile',
        
    
    ];

      
    //relation dossier avec stagiaire
    public function getstagiaire() {
        return $this->embedsOne(Stagiaire::class);
        }
}

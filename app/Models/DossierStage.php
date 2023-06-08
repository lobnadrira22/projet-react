<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\Stagiaire;
class DossierStage extends Model
{
    //Les attributs de dossier de stage
    use HasFactory;
    protected $fillable = [
     
        'cinfile',
        'convfile',
        'cvfile',
        'lettfile',
    
    
    ];
//relation dossier avec stagiaire
    public function getstagiaire() {
        return $this->embedsOne(Stagiaire::class);
        }
}

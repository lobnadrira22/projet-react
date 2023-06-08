<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Jenssegers\Mongodb\Auth\User as Authenticatable;

use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


//relation
use App\Models\Departement;
use App\Models\SujetStage;

use App\Notifications\ResetPasswordNotification;



class User  extends Authenticatable
{
  

    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    //Les attributs d'un utilisateur
    protected $fillable = [
    
        'nom',
        'prenom',
        'email',
        'numTel',
        'datenaissance',
       
        'role',
        'etat',
        'password',
        'matricule',
        //Relation
        'departement',

        //relation avec sujets de stage
        'Sujets',
        'premlog',



       
    ];
       //Relation avec sujet de stage
       public  function sujets(){
        return $this->embedsMany(SujetStage::class);
        
     } 
    //relation avec département
    public static function departements(){
        return $this->embedsOne(Departement::class);
    }


    
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];



    //Envoyer le lien de réinitialiser mot de passe à l'email de l'utilisateur
    public function sendPasswordResetNotification($token)
    {
        //https://spa.test   $url = 'http://localhost:3000/U-reset?token=' . $token;
        $url = 'http://localhost:3000/U-reset/' . $token;

        $this->notify(new ResetPasswordNotification($url));
    }



}

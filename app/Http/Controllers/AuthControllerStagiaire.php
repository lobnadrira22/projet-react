<?php

namespace App\Http\Controllers;
use App\Models\Stagiaire;
use App\Models\DemandeStage;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Jenssegers\Mongodb\Eloquent\Model;



class AuthControllerStagiaire extends Controller
{




     //Retourner la liste des stagiaires
     public function index()
     {
         $stagiaire = Stagiaire::all();
         return response()->json([
             'status' =>200,
             'stagiaire' => $stagiaire,
         ]);
     }
 

    //ajouter un stagiaire

    public function register(Request $request) {

     
        $validator = Validator::make($request->all(), [
            'name'=> 'required|string|min:3|max:20',
            'prenom'=> 'required|string|min:3|max:20',
            'email'=> 'required|email|unique:stagiaires,email',
            'password'=> 'required|string|confirmed|min:5',
            'telephone'=>'required|digits:8',
            'datenaissance'=>'required|date',
            'adresse'=> 'required|string|max:50',
            'cinoupassport_stagiaire'=> 'required|unique:stagiaires,cinoupassport_stagiaire', 
            'niveauetude'=>'required|string',
            'specialite'=>'required|string',
            'filiere'=>'required|string',


        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'validation_errors'=>$validator->messages(),
            ]);
        }
        else {

       

        $stagiaire = Stagiaire::create([
            'name'=> $request->name,
            'prenom'=> $request->prenom,
            'email'=> $request->email,
            'password'=>Hash::make($request->password),
            'telephone'=>$request->telephone,
            'datenaissance'=>$request->datenaissance,
            'adresse'=> $request->adresse,

            'cinoupassport_stagiaire'=> $request->cinoupassport_stagiaire,

            'niveauetude'=>$request->niveauetude,
            'specialite'=>$request->specialite,
            'filiere'=>$request->filiere,
             'etatSt'=>'etudiant',
             'role'=> 'stagiaire',

            //relation avec dossier de stage
            'DossierStage' => $request->DossierStage,

            //relation avec rapport
            'Rapport'=> $request->Rapport,

             //relation avec bilan
             'Bilan'=> $request->Bilan,
            
             
              
            //relation avec demande de stage
            'DemandeStage'=> $request->DemandeStage,
          

             //relation avec les traveaux
            'Traveaux'=> $request->Traveaux,
              
         
        
            
        ]);
           
        //Créer Token
        $token = $stagiaire->createToken('auth_token')->plainTextToken;
       return response()->json([
           'status'=>200,
           'username'=>$stagiaire->name,
           'stagiaire' => $stagiaire,
           'token'=>$token,
           'role' => 'stagiaire',
           'message'=> 'vous êtes inscrits',
       ]);
    }
    }


    

//connecter stagiaire
public function login (Request $request) {
    $validator = Validator::make($request->all(), [
        'email'=>'required|email|unique:stagiaires,email ',
        'password' => 'required|string|min:5',
    ]);
    if ($validator->fails())
    {
        return response([
            'validation_errors' => $validator->messages() ,
            'status'=>422,
            ]
            
        );
    }

    
     $stagiaire = Stagiaire::where('email', $request->email)->first();
    if ($stagiaire) {
        if (Hash::check($request->password, $stagiaire->password))
         {
          

                 $role='stagiaire';
                 $token = $stagiaire->createToken('StagiaireToken' , ['server:stagiaire'] )->plainTextToken;
           
        

           
            $response = ['token' => $token];
            return response()->json(
                ['message' => 'Bienvenu!',
                'id'=>$stagiaire->_id,
                'access_token' => $token, 
                'token_type' => 'Bearer',
                'username' => $stagiaire->name,
                'etatSt'=> $stagiaire->etatSt, 
                'niveauetude'=> $stagiaire->niveauetude, 
                'dossiervalideSt'=> $stagiaire->dossiervalideSt,
                'status'=>200,
               
                ] );
        } else{

            return response([
                'message' => 'Stagiaire non existe',
                'status'=>401,
            ]);
        }
        
    } 

    else{

        return response([
            'message' => 'Stagiaire non existe',
            'status'=>401,
        ]);
    }
}




 //verifier la connexion
 public function incheck (){
    return response()->json([
        'message' => 'You are in' ,
         'status' =>200,
         'user' => auth()->user(),
    ],200);
}


   //Deconnexion
   public function logout(Request $request) {
    auth()->user()->tokens()->delete();

     return response()->json(
            [
                'status'=>200,
                'message' => 'Logged out successfully',
            ]);
}


//Envoyer la note de Test 
public function submit_score (Request $request, $id){
    $stagiaire = Stagiaire::where('_id', '=', $id)->first();
    $stagiaire->update($request->all());
    return response()->json(
        [
            'status' => 200,
            'message' => 'Score ajouté avec succée',
        ]
    );
    
}


//modifier profil
public function update_profile (Request $request){
    $validator = Validator::make($request->all(), [
        'name'=> 'required|string|min:3|max:20',
        'prenom'=> 'required|string|min:3|max:20',
        'email'=> 'required|email',
        'telephone'=>'required|digits:8',
        'datenaissance'=>'required|date',
        'adresse'=> 'required|string|max:50',
        'cinoupassport_stagiaire'=> 'unique:stagiaires,cinoupass_stagiaire', 
        'niveauetude'=>'required|string',
        'specialite'=>'required|string',
        'filiere'=>'required|string',
    ]);
    if ($validator->fails()) {
        return response()->json([
            'message'=>'Validations fails',
            'validation_errors'=>$validator->messages()
        ],422);
    } 

    $user=$request->user();

    $user->update([
        'name'=> $request->name,
        'prenom'=> $request->prenom,
        'email'=> $request->email,
        'telephone'=>$request->telephone,
        'datenaissance'=>$request->datenaissance,
        'adresse'=> $request->adresse,
        'cinoupassport_stagiaire'=> $request->cinoupassport_stagiaire,
        'niveauetude'=>$request->niveauetude,
        'specialite'=>$request->specialite,
        'filiere'=>$request->filiere,


       
    ]);

    return response()->json([
        'message'=>'Profil modifié avec succès',
    ],200);


}



}
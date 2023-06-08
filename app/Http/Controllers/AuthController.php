<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Stagiaire;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

//relation
use App\Models\Departement;

use Auth;
use Validator;

//premiere fois
use Carbon\Carbon;

class AuthController extends Controller
{


 //Ajouter utilisateur
 public function register(Request $request)
 {
     $validator = Validator::make($request->all(),[
         'nom'=>'required|string|min:3|max:20 ',
         'prenom'=>'required|string|min:3|max:20 ',
         'email'=>'required|email|unique:users,email',
         'numTel'=>'required|numeric',
         'datenaissance'=>' required|date',
         'matricule'=>'required|numeric|unique:users,matricule',
          'role'=>'required ',

          'departement'=>'required ',

         'password'=>'required|string|confirmed|min:5',

     ]);

     if($validator->fails()){
        return response([
           
            'validation_errors' => $validator->messages() ,
            'status'=>422,
           
            ]
            
        );

     }


     $user = User::create([
         'nom' => $request->nom,
         'prenom'=> $request->prenom,
          'email' => $request->email,
          'numTel'=> $request->numTel,
         'datenaissance' =>$request->datenaissance,
         'role'=> $request->role,
         'etat'=> 'Active',//$request->etat,
          'matricule'=> $request->matricule,
         'password' => Hash::make($request->password),
        'departement'=>$request->departement,
        'premlog'=>'oui',


        //Relations
        'Sujets'=> $request->Sujets,
              

         
      ]);


      $token = $user->createToken($user->mail.'_auth_token')->plainTextToken;

      return response()->json(
          ['message' => 'Compte est ajouté avec succès',
          'access_token' => $token, 
          'token_type' => 'Bearer',
          'departement'=>$user->departement,
          'username' => $user->nom,
          'role' => $user->role,
          'status'=>200,
          ] );

 }




// connecter utilisateur
 public function login(Request $request){
    $fields = $request->validate([
        'email'=>'required|email|unique:users,email ',
        'password' =>'required|string|min:5',
    ]);

    
    //vérifier email
    $user = User::where('email',$fields['email'])->first();
    //vérifier mot de passe
   if(!$user || !Hash::check($fields['password'],$user->password )){
     //   if(!$user || ($fields['password'] !==$user->password )){    
        return response()->json([
            'status'=>401,
             'message'=>' email ou mot de passe invalide ',
    ]);
    }

    //si un utilisateur est désactivé , il ne peut pas connecter
    if($user->etat === ' Désactive'){
        return response([
            'message' => 'vous étes Désactivé ',
            'status'=>402, 
        ]);
    }

     //Créer les Tokens des utilisateur 
    if($user->role == 'encadrant')
    {
        $role='encadrant';
        $token = $user->createToken($user->email.'_EncadrantToken' , ['server:encadrant'])->plainTextToken;

    }else if($user->role == 'chef_dept')
    {
        $role='chef_dept';
        $token = $user->createToken($user->email.'_Chef_deptToken' , ['server:chef_dept'])->plainTextToken;

    }

else if($user->role == 'service_formation')
{
    $role='service_formation';
    $token = $user->createToken($user->email.'_Service_formationToken' , ['server:service_formation'])->plainTextToken;

}


else if($user->role == 'coordinateur')
{
    $role='coordinateur';
    $token = $user->createToken($user->email.'_Coordinateur' , ['coordinateur'])->plainTextToken;

}


    $response = ['token' => $token];
    return response()->json(
        ['message' => 'Welcome !',
        'access_token' => $token, 
        'token_type' => 'Bearer',
        'username' => $user->nom,
        'lastname' => $user->prenom,
      
       
        'id' => $user->id,
        'status'=>200,
        'role'=>$role,
         

        'premlog'=>$user->premlog,
        ] );

}


//réinitialiser mot de passe d'un utilisateur
public function resetmdp(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'password' => 'required|string|min:8|confirmed'
        ]);

        if ($validator->fails())
        {
            return response()->json(
                ['validation_errors' => $validator->messages(),
                 'status'=>422,
            ]);
        }
        else{
                $user=User::find($id);
                if(Hash::check($request['password'], $user->password)){
                   return response()->json([
                       'status'=>402,
                       'message'=>'Même mot de passe !'
                   ]);
                }
                else{
                    $user->password = bcrypt($request['password']);
                    $user->premlog = 'non';
                    $user->save();
                    return response()->json([
                        'status'=>200,
                        'message'=>'Mot de passe changé !'
                    ]);
                }
        }
    }
 
//Deconnexion
 public function logout(Request $request) {
    auth()->user()->tokens()->delete();

     return response()->json(
            [
                'status'=>200,
                'message' => 'Déconnecté avec succès',
            ]);
}


 //verifier la connexion
   public function incheck (){
    return response()->json([
        'message' => 'You are in' ,
         'status' =>200,
          'user' => auth()->user(),
    ],200);
}




  // afficher profil
    public function profile(){
    
 return response()->json([
        
         'status' =>200,
        'valid' => auth()->check() ,
 
        'user'=> response()->json (auth()->user()),

  
   ]); 
     
}   
 




//modifier profil
public function update_profile (Request $request){
    $validator = Validator::make($request->all(), [
        'nom'=>'required|string|min:3|max:20 ',
        'prenom'=>'required|string|min:3|max:20 ',
        'email'=>'required|email|unique:users,email ',
        'numTel'=>'required|numeric',
        'datenaissance'=>' required|date',
        'matricule'=>'required|numeric  ',
       
    ]);
    if ($validator->fails()) {
        return response()->json([
            'message'=>'Validations fails',
            'validation_errors'=>$validator->messages()
        ],422);
    } 

    $user=$request->user();

    $user->update([
        'nom' => $request->nom,
        'prenom'=> $request->prenom,
         'email' => $request->email,
         'numTel'=> $request->numTel,
        'datenaissance' =>$request->datenaissance,
        'matricule'=> $request->matricule,
        'role'=> $request->role,
     
    ]);

    return response()->json([
        'message'=>'Profil modifié avec succès',
    ],200);


}



}



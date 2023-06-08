<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Validation\Rules\Password as RulesPassword;

// use Illuminate\Support\Facades\BD;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Stagiaire;




class NewPasswordController extends Controller
{
    
 // Utilisateur : Oublier mot de passe : envoyer  email contient un lien pour le réinitialiser 
        public function UforgotPassword(Request $request) 
    {
        $request->validate([
            'email' => 'required|email',
        ]);

   

        $user =User::where('email',$request->email )->first();
        if($user){
            $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status == Password::RESET_LINK_SENT) {
            return response()->json(
             [
             
                'status' => __($status),
                'message' =>'Vérifier votre Email',
            ]


            ) ;
        }

        }
       
         else if(!$user){
            return response()->json(
            [
                'status'=>404,
                'message' =>'Aucun utilisateur avec cet email',
            ]

        );
         }

    }







//Utilisateur : réinitialiser le mot de passe
public function UresetPassword(Request $request)
{/* 
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => ['required', 'confirmed', RulesPassword::defaults()],
    ]);
     */


    $validator = Validator::make($request->all(), [
            
        'token' => 'required',
        'email' => 'required|email',
        'password' => ['required', 'confirmed', RulesPassword::defaults()],
        
                 ]);
    if($validator->fails()) {
        return response()->json([
            'status'=>422,
            'validation_errors' => $validator->messages() ,
            'message'=>'vérifier les champs il ya un erreur',
        ]);
    }
 

    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user) use ($request) {
            $user->forceFill([
                'password' => Hash::make($request->password), //$request->password
                'remember_token' => Str::random(200),
                'premlog'=>'non',
                
            ])->save();

            $user->tokens()->delete();

            event(new PasswordReset($user));
            
          
        }
    );

    if ($status == Password::PASSWORD_RESET) {
        
        return response()->json(
            [
               
                'status'=>200,
                'message'=> 'Mot de passe utilisateur réinitialisé avec succès',
                'premlog' => 'non',
               
            ]

        );
    }
   
    return response([
        'status'=>500,
        'message'=>'utililisateur avec cet email non existe',

    ]);

}

}

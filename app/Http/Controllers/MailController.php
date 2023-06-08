<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use Illuminate\Support\Facades\Mail;
use App\Mail\MailAcceptationStagiaire;
use App\Mail\MailRefusStagiaire;
use App\Models\Stagiaire;

class MailController extends Controller
{
    
 

//Accepter dossier de stage
public function accepterEtu(Request $request , $id){
 
  
    $stagiaire = Stagiaire::find($id);
    if($stagiaire){
      $stagiaire->etatSt = 'stagiaire_accepte_p';
      $stagiaire->save();
     
     // try{
        // Mail::mailer('smtp')->to($stagiaire->email)->send( new MailAcceptationStagiaire ($stagiaire));receiver@gmail.com
           Mail::to($stagiaire->email)->send(new MailAcceptationStagiaire ($stagiaire));
 
     
    return response()->json([
              'status'=>200,
              'message '=> 'Email Acceptation du stagiaire envoyé avec succès',
 
         ],200);
    // }
 /*     
     catch(\Exception $err){
         return response()->json([
             'status'=>500,
             'errors '=> 'Email Acceptation stagiaire non envoyé réessayer!',
 
        ],500);
     }     */
    }


    else{
        return response()->json(
            [    'status'=>404,
                'message' =>"Email Acceptation stagiaire non envoyé réessayer!" ,
              
            ]);   ;
     } 
   


}


//Refuser dossier de stage
public function refuserEtu(Request $request , $id){
 
  
    $stagiaire = Stagiaire::find($id);
    if($stagiaire){
      $stagiaire->etatSt = 'stagiaire_accepte_p_non';
      $stagiaire->save();
     
     // try{
        // Mail::mailer('smtp')->to($stagiaire->email)->send( new MailAcceptationStagiaire ($stagiaire));receiver@gmail.com
           Mail::to($stagiaire->email)->send(new MailrefusStagiaire ($stagiaire));
 
     
    return response()->json([
              'status'=>200,
              'message '=> 'Email Refus  du stagiaire envoyé avec succès',
             // 'etatSt'=> 'stagiaire_accepte_p',
 
         ],200);
    // }
 /*     
     catch(\Exception $err){
         return response()->json([
             'status'=>500,
             'errors '=> 'Email Acceptation stagiaire non envoyé réessayer!',
 
        ],500);
     }     */
    }


    else{
        return response()->json(
            [    'status'=>404,
                'message' =>"Email Refus Acceptation stagiaire non envoyé réessayer!" ,
              
            ]);   ;
     } 
   


}

}

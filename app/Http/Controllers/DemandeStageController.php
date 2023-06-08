<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Stagiaire;
use App\Models\DemandeStage;

use Validator;


use Illuminate\Support\Facades\DB;
class DemandeStageController extends Controller
{


      //Retourner la liste demandes de stage
      public function index()
      {
          $demande = DemandeStage::all();
          return response()->json([
              'status' =>200,
              'demandeStage' =>$demande
          ]);
      }
  

       //Ajouter demande de stage
       public function store(Request $request, $id)
       {
           $validator = Validator::make($request->all(),[
            
              'typestage'=>'required',
               'nom_dept'=>'required',
               //'cv'=>'required|file',
        
           ]);
   
           if($validator->fails()){
               return response()->json(
                   [ 'validation_errors' => $validator->messages() ,
                     'status'=>400,
                   ]);   
   
           }
   
   
           else{    

            $demande = new DemandeStage;
            $demande ->typestage =$request->typestage;
            $demande ->nom_dept =$request->nom_dept;
            $demande ->cv =$request->cv;
           
         
          
          if($request->hasFile('cv')){
                $file = $request->file('cv');
                $filename = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                
                $finalName = time(). '_' . $filename ;
                $request->file('cv')->storeAs('public/Upload/Cvs' , $finalName );
                $demande->cv='public/Upload/Cvs/'.$finalName;
          } 
                $demande->save();
 
                                       
            $insert_demndeStage_stagiaire= Stagiaire::where('_id', '=', $id)->update(['DemandeStage' => ['_id' => $id  ,'typestage'=>  $demande ->typestage ,'nom_dept'=>  $demande ->nom_dept ,'cv'=>  $demande ->cv ] ]);

            return response()->json(
                ['message' => 'Demande de stage ajoutée avec succès',
                'status'=>200,
                'demandeStage' =>$demande,
               
               
                ] );
           }
       }




    //supprimer demande de stage
    public function destroy($id){
        $demande = DemandeStage::find($id);
        if($demande){
            $demande->delete();
                return response()->json([
                    'status' =>200,
                    'message' =>'Demande de stage supprimée avec succès',
                ]);
        }
        else{
            return response()->json([
                'status' =>404,
                'message' =>'Demande de stage avec cet ID introuvable',
            ]);
        }
    }




}

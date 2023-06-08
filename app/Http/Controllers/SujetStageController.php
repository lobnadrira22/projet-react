<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\SujetStage;
use App\Models\User;
use Validator;

class SujetStageController extends Controller
{
    
      //Retourner la liste sujets de stages
      public function index()
      {
          $sujet = SujetStage::all();
          return response()->json([
              'status' =>200,
              'sujetStage' =>$sujet
          ]);
      }
  



       //Ajouter sujet de stage
       public function store(Request $request , $id)
       {
           $validator = Validator::make($request->all(),[
               'sujet'=>'required',
               'technologies'=>'required',
               'description'=>'required',
               'datedebut'=>'required',
               'nom_dept'=>'required',
               'typestage'=>'required',
               'periode'=>'required',
             
           ]);
   
           if($validator->fails()){
               return response()->json(
                   [ 'validation_errors' => $validator->messages() ,
                     'status'=>400,
                   ]);   
   
           }
   
   
           else{    

              $sujet = SujetStage::create([
               'sujet' => $request->sujet,
               'technologies'=> $request->technologies,
               'description'=> $request->description,

               'datedebut'=> $request->datedebut,
               'nom_dept'=> $request->nom_dept,
               'typestage'=> $request->typestage,
               'periode'=> $request->periode,
               'etatsujet'=> 'Publié',
  
            ]);
                     //Relation 
            $insert_sujets = User::where('_id', '=', $id)->push(['Sujets' => ['_id' => $id  ,'sujet'=> $sujet->sujet,'technologies'=> $sujet->technologies ] ]);

   
            return response()->json(
                ['message' => 'Sujet de stage ajouté avec succès',
                'status'=>200,
                'sujetStage' =>$sujet
   
                ] );
           }
       }






       

    //Supprimer sujet de stage
    public function destroy($id){
        $sujet =SujetStage::find($id);
        if($sujet){
            $sujet->delete();
                return response()->json([
                    'status' =>200,
                    'message' =>'Sujet de stage supprimée avec succès',
                ]);
        }
        else{
            return response()->json([
                'status' =>404,
                'message' =>'Sujet de stage avec cet ID introuvable ',
            ]);
        }
    } 










    
    //retourner un sujet de stage par Id
   public function show($id){

    $sujet= SujetStage::find($id);
    if($sujet){

     return   response()->json(
     [
     
     'sujet' => $sujet,
     'status'=>200,
     ] );

    }else{
     return response()->json(
         [ 'validation_errors' => 'Not found sujet' ,
           'status'=>404,
         ]);   
     
    }
 


} 





     //Modifier sujet de stage
     public function update(Request $request, $id)
     {
     
         $validator = Validator::make($request->all(),[
            'sujet'=>'required',
            'technologies'=>'required',
            'description'=>'required',

            'datedebut'=>'required',
            'nom_dept'=>'required',
            'typestage'=>'required',
            'periode'=>'required',
            'etatsujet'=>'required',
            
           
         ]);
     
         if($validator->fails()){
             return response()->json(
                 [ 'validation_errors' => $validator->messages() ,
                   'status'=>422,
                 ]);   
     
         }
         else{
              $sujet = SujetStage::find($id);
              if($sujet){
     
                $sujet->update($request->all());
             
                 $sujet->save();
               
                  return response()->json(
                     [    'status'=>200,
                         'message' =>'Sujet de stage modifié avec succès' ,
                       
                     ]);   
              }
              else{
                 return response()->json(
                     [    'status'=>404,
                         'message' =>'Sujet de stage with this ID not found' ,
                       
                     ]);   ;
              } 
         }
     
        }
    
}

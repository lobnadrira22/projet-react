<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\DossierStage;
use App\Models\Stagiaire;
use Validator;

class DossierStageController extends Controller
{
   

    //Ajouter dossier de stage 
    public function ajouterDossier(Request $request , $id)
    {
      
      $validator = Validator::make($request->all(),[
        'name'=> 'string|min:3|max:20',
        'prenom'=> 'string|min:3|max:20',
     /*   'cinfile'=>'file|mimes:pdf,docx ',
       'convfile'=>'file|mimes:pdf,docx ',
       'cvfile'=>'file|mimes:pdf,docx ',
       'lettfile'=>'file|mimes:pdf,docx ', */
       
      
     ]);

     if($validator->fails()){
      return response()->json(
          [ 'validation_errors' => $validator->messages() ,
            'status'=>400,
          ]);   
       }

       else{    
         $dossier = new DossierStage;
      
         
          
            if($request->hasFile('cinfile')){
              $file = $request->file('cinfile');
             $filename = $file->getClientOriginalName();
             $extension = $file->getClientOriginalExtension();
             
             $finalName = time(). '_' . $filename ;
             $request->file('cinfile')->storeAs('public/Upload/DossierStage' , $finalName );
             $dossier->cinfile='public/Upload/DossierStage/'.$finalName; 


            /*  $filenameWithExt = $request->file('cinfile')->getClientOriginalName();
             $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
             $extension = $request->file('cinfile')->getClientOriginalExtension();
             $fileNameToStore= $filename.'_'.time().'.'.$extension;
             $pathcinfile = $request->file('cinfile')->storeAs('public/Upload/DossierStage' , $fileNameToStore);
              */
      
             } 

             if($request->hasFile('convfile')){
                $file = $request->file('convfile');
                $filename = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                
                $finalName = time(). '_' . $filename ;
                $request->file('convfile')->storeAs('public/Upload/DossierStage' , $finalName );
                $dossier->convfile='public/Upload/DossierStage/'.$finalName; 
/* 
                $filenameWithExt = $request->file('convfile')->getClientOriginalName();
                $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
                $extension = $request->file('convfile')->getClientOriginalExtension();
                $fileNameToStore= $filename.'_'.time().'.'.$extension;
                $pathconvfile = $request->file('convfile')->storeAs('public/Upload/DossierStage' , $fileNameToStore);
                 */
                } 
            
                if($request->hasFile('cvfile')){
                   $file = $request->file('cvfile');
                    $filename = $file->getClientOriginalName();
                    $extension = $file->getClientOriginalExtension();
                    
                    $finalName = time(). '_' . $filename ;
                    $request->file('cvfile')->storeAs('public/Upload/DossierStage' , $finalName );
                    $dossier->cvfile='public/Upload/DossierStage/'.$finalName; 
/* 
                    $filenameWithExt = $request->file('cvfile')->getClientOriginalName();
                    $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
                    $extension = $request->file('cvfile')->getClientOriginalExtension();
                    $fileNameToStore= $filename.'_'.time().'.'.$extension;
                    $pathcvfile = $request->file('cvfile')->storeAs('public/Upload/DossierStage' , $fileNameToStore);
                     */
                    } 

                    if($request->hasFile('lettfile')){
                        $file = $request->file('lettfile');
                        $filename = $file->getClientOriginalName();
                        $extension = $file->getClientOriginalExtension();
                        
                        $finalName = time(). '_' . $filename ;
                        $request->file('lettfile')->storeAs('public/Upload/DossierStage' , $finalName );
                        $dossier->lettfile='public/Upload/DossierStage/'.$finalName; 

                    /*     $filenameWithExt = $request->file('lettfile')->getClientOriginalName();
                        $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
                        $extension = $request->file('lettfile')->getClientOriginalExtension();
                        $fileNameToStore= $filename.'_'.time().'.'.$extension;
                        $pathlettfile = $request->file('lettfile')->storeAs('public/Upload/DossierStage' , $fileNameToStore);
                         */
                        } 


                   
$insert_dossier_stagiaire= Stagiaire::where('_id', '=', $id)->update(['DossierStage' => ['_id' => $id  ,'cinfile'=> $request->cinfile,
'cvfile'=> $request->cvfile, 'lettfile'=> $request->lettfile ,'convfile'=> $request->convfile ] ]);

                  $dossier ->save();
            
    

           
           
                return response()->json(
                    ['message' => 'Dossier déposé avec succès',
                    'status'=>200,
                    'dossier' =>$dossier ,
       
                    ] );
       
               }


    }



     //Retourner la liste dossiers de stage
     public function index()
     {
         $dossier = DossierStage::all();
         return response()->json([
             'status' =>200,
             'dossier' => $dossier
         ]);
     }





     //Valide dossier de stage
          
 public function valideDoss (Request $request, $id)
 {
       $stagiaire = Stagiaire::find($id);
          if($stagiaire){
 
             //l'état du dossier du stagiaire est valide 
            $stagiaire->dossiervalideSt = 'oui';
            $stagiaire->save();
           
              return response()->json(
                 [    'status'=>200,
                     'message' =>'Dossier Stagiaire est valide ' ,
                   
                 ]);   
          }
          else{
             return response()->json(
                 [    'status'=>404,
                     'message' =>"Dossier d'un Stagiare avec cet ID introuvable" ,
                   
                 ]);   ;
          } 
    
 
    }




    //invalide dossier dossier de stage
 public function invalideDoss (Request $request, $id)
 {
 
          $stagiaire = Stagiaire::find($id);
          if($stagiaire){
            //l'état du dossier du stagiaire est invalide 
            $stagiaire->dossiervalideSt = 'non';
            $stagiaire->save();
         
              return response()->json(
                 [    'status'=>200,
                     'message' =>'Dossier Stagiaire est invalide ' ,
                   
                 ]);   
          }
          else{
             return response()->json(
                 [    'status'=>404,
                     'message' =>"Dossier d'un Stagiare avec cet ID introuvable" ,
                   
                 ]);   ;
          } 
    
 
    }







  
}

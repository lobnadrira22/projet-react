<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\Travail;
use App\Models\Stagiaire;
use Validator;
use Illuminate\Http\Request;

class TravailController extends Controller
{



  //Retourner la liste traveaux
  public function getAll(){

    $traveau_files = Travail::all();



  }
  

  //Ajouter travail
  public function store(Request $request, $id)
  {
    $validator = Validator::make($request->all(),[
     // 'bfile'=>'file|mimes:pdf,docx ',
      'description'=>'string|max:200 ',
    
   ]);

   if($validator->fails()){
    return response()->json(
        [ 'validation_errors' => $validator->messages() ,
          'status'=>400,
        ]);   
     }

     else{    
       $travail = new Travail;
       $travail->description =$request->description;
        
          if($request->hasFile('tfile')){
           $file = $request->file('tfile');
           $filename = $file->getClientOriginalName();
           $extension = $file->getClientOriginalExtension();
           
           $finalName = time(). '_' . $filename ;
           $request->file('tfile')->storeAs('public/Upload/Traveaux' , $finalName );
           $travail->tfile='public/Upload/Traveaux/'.$finalName;
           } 


                                         
$insert_traveaux_stagiaire= Stagiaire::where('_id', '=', $id)->push(['Traveaux' => ['_id' => $id  ,'tfile'=> $travail->tfile ,'description'=> $travail->description ] ]);

           $travail ->save();
          

              return response()->json(
                  ['message' => 'Travail déposé avec succès',
                  'status'=>200,
                  'travail' =>$travail ,
     
                  ] );
     
             }

  }
   
}
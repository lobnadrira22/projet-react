<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Note;
use Validator;
class NoteController extends Controller
{
    

        //Retourner la liste notes
        public function index()
        {
            $note = Note::all();
            return response()->json([
                'status' =>200,
                'note' =>$note
            ]);
        }
  //Ajouter note
  public function store(Request $request)
  {
    $validator = Validator::make($request->all(),[
      'note'=>'required',
       'message'=>'required ',
    
   ]);

   if($validator->fails()){
    return response()->json(
        [ 'validation_errors' => $validator->messages() ,
          'status'=>400,
        ]);   
     }

     else{    
       $note = new Note;
       $note->note =$request->note;
       $note->message =$request->message; 



           $note ->save();
          
  

              return response()->json(
                  ['message' => 'Travail déposé avec succès',
                  'status'=>200,
                  'note' =>$note ,
     
                  ] );
     
             }


  }
}

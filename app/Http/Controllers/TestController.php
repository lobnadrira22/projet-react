<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Test;
use Illuminate\Support\Facades\Validator;
use App\Models\Question;


class TestController extends Controller
{
   
    //Retourner la liste Tests
    public function index()
    {
        $test = Test::all();
        return response()->json([
            'status' => 200,
            'test' => $test,

        ]);
    }

    //Retourner aléatoirement les Tests selon niveau d'étude d'un stagiaire d'état étudiant
    public function random($niveau_stagiaire)
    {
        if ($niveau_stagiaire == 'Licence')
            $req = Test::where('niveautest', 'moyen')->get();
        else if ($niveau_stagiaire == 'BTS' || $niveau_stagiaire == 'Bac')
            $req = Test::where('niveautest', 'facile')->get();
        else
            $req = Test::where('niveautest', 'difficile')->get();

        $req = $req->random(1);

        $sum = $req->pluck('time');

        return response()->json([
            'test' => $req,
            'full Time' => $sum->sum(),

        ]);
    }


    //Ajouter test
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titre' => 'required',
            'niveaustagiaire' => 'required',
            'niveautest' => 'required',
            'duree' => 'required',
            'note' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);
        } else {
            Test::create([
                'titre' => $request['titre'],
                'departement' => $request['departement'],
                'niveaustagiaire' => $request['niveaustagiaire'],
                'niveautest' => $request['niveautest'],
                'duree' => $request['duree'],
                'note' => $request['note'],
                'questions' => [],
                'réponses' => []

            ]);


            return response()->json([
                'status' => 200,
                'message' => 'paramètre de test a été bien crée',
            ]);
        }
    }
}
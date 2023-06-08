<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStagiairesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stagiaires', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('prenom'); 
            $table->date('datenaissance');
            $table->string('email')->unique();
            $table->string('cinoupassport_stagiaire')->unique(); 
           // $table->integer('passport'); 
            $table->string('niveauetude');
            $table->string('specialite');
            $table->string('filiere');
            $table->string('adresse'); 
            $table->string('telephone');
           
          

              //Relation2
           $table->array('Traveaux');
              
              
            //////
            $table->string('etatSt');
            //$table->object('dossierSt');
            $table->string('dossiervalideSt');
            $table->string('entretientechSt');
            $table->string('entretienvalideSt');


            //relation avec demande de stage
            $table->object('DemandeStage');
            //relation avec dossier de stage
            $table->object('DossierStage');
            //relation avec rapport
            $table->object('Rapport');
             //relation avec bilan
             $table->object('Bilan');


              //////
            $table->string('password');
            $table->string('password_confirmation');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stagiaires');
    }
}

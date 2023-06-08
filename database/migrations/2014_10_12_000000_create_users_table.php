<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {

            $table->id(); 
            
            $table->string('nom');
            $table->int('prenom'); 
            $table->string('numTel');
            $table->date('datenaissance');
            $table->string('matricule');  
            $table->string('role');
           // $table->string('etat' , ['active' , 'inactive'])->default('active'); 
            $table->string('etat');
            $table->string('departement');

            //Relation
           // $table->array('sujetsEn');

            //Relation
            $table->array('Sujets');
            
              
            //--
            $table->string('premlog');
          
            $table->string('password');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}

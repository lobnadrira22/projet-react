<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;


//Model intermédiare entre question et réponse
class QuestionsReponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'correctAnswer',
        'question_id',
        'reponse_id'     
    ];
}
<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\DemandeStage;
use App\Models\Departement;
use App\Models\SujetStage;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_example()
    {
        $this->assertTrue(true);
    }
    public function test_update_sujet() {
        $donnees = [
            'nom_dept'=>'IT',
            'nom_chef_dept'=>'lobna drira',
            'sujet'=> 'plateforme de stage',
        'technologies'=>'laravel',
        'description'=>'conception et réalisation de plateforme de stage',
        'datedebut'=>'12-02-2022',
        'nom_dept'=>'IT',
        'typestage'=>'licence',
        ];
        $sujet=SujetStage::find('62799cbd664300000c002423');
        $update=$sujet->update($donnees);
        $this->assertTrue($update);
    }
    public function test_delete_demande() {
        
        $demande=DemandeStage::find('6277cea6b1560000c600544f');
        $demande->delete('6277cea6b1560000c600544f');
        $this->assertTrue($demande);
    }

}

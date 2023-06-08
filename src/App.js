import React from 'react';
import {Routes,Route, Link, BrowserRouter  } from 'react-router-dom';
import Login from './pages/Authentification/Login';
import UForgotPassword from './pages/Authentification/UForgotPassword';

//coordinateur
import Acceuil from './components/Acceuil';
import PageAjouterCompte from './pages/coordinateurPages/PageAjouterCompte';
import PageModifierCompte from './pages/coordinateurPages/PageModifierCompte';
import PageConsulterCompte from './pages/coordinateurPages/PageConsulterCompte';

//Les espaces
import Dashboard from './pages/Dashboard';
import EDashboard from './pages/EDashboard';
import ChDashboard from './pages/ChDashboard';
import SDashboard from './pages/SDashboard';
import StDashboard from './pages/StDashboard';
//Erreur 403 et 404
import Page404 from './pages/Authentification/Page404';
import Page403 from './pages/Authentification/Page403';
import axios from 'axios';
//responsable de formation
import PageAjouterDepartement from './pages/serviceDeFormationPages/PageAjouterDepartement';
import PageModifierDepartement from './pages/serviceDeFormationPages/PageModifierDepartement';
import PageConsulterDemandeStage from './pages/serviceDeFormationPages/PageConsulterDemandeStage';
import PageConsulterDossierStage from './pages/serviceDeFormationPages/PageConsulterDossierStage';
import PageConsulterBilan from './pages/serviceDeFormationPages/PageConsulterBilan';
import PageConsulterRapport from './pages/serviceDeFormationPages/PageConsulterRapport';

import PageModifierQuestion from './pages/serviceDeFormationPages/PageModifierQuestion';
import PageModifierReponse from './pages/serviceDeFormationPages/PageModifierReponse';
import PageParamsQuiz from './pages/serviceDeFormationPages/PageParamsQuiz';
import PageParamsQuestions from './pages/serviceDeFormationPages/PageParamsQuestions';
import PageParamsReponses from './pages/serviceDeFormationPages/PageParamsReponses';
import CrudTableDept from './pages/serviceDeFormationPages/CrudTableDept';





//Utilistaeur : réinitialiser mot de passe
import UResetPassword from './pages/Authentification/UResetPassword';
//stagiaire : s'inscrire et connecter
import RegisterStagiaire from './pages/Authentification/RegisterStagiaire';
import LoginStagiaire from './pages/Authentification/LoginStagiaire';


import Landing from './components/Landing';

//Stagiaire
import PageAjouterDemandeStage from './pages/stagiairePages/PageAjouterDemandeStage';
import PageAjouterDemandeStageAvecSujet from './pages/stagiairePages/PageAjouterDemandeStageAvecSujet';
import PageDeposerRapport from './pages/stagiairePages/PageDeposerRapport';
import PageDeposerBilan from './pages/stagiairePages/PageDeposerBilan';
import PageDeposerTravail from './pages/stagiairePages/PageDeposerTravail';
import PageDeposerDossierStage from './pages/stagiairePages/PageDeposerDossierStage';
import ListeSujets from './components/ListeSujets';
import Quiz from './components/TestPsycho/Quiz';


//Encadrant
import PageAjouterSujet from './pages/encadrantPages/PageAjouterSujet';
import PageConsulterSujetStage from './pages/encadrantPages/PageConsulterSujet';
import PageModifierSujet from './pages/encadrantPages/PageModifierSujet';
import PageNoterTravail from './pages/encadrantPages/PageNoterTravail';
import PageCalendrier from './pages/encadrantPages/PageCalendrier';

//Chef de département
import ChProtectedRoute from './components/privateRoute/ChProtectedRoute';

//Profil
import TProfile from './components/TProfile';




axios.defaults.baseURL="http://localhost:8000/";
axios.defaults.headers.post['Content-type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;


//logout  vérifier Barear Token
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem(`auth_token`);
  config.headers.Authorization = token ? `Bearer ${token}` : '';


  return config;
});







 function App() {
  return (
     <>
       <Routes>

    
 
       {/* <Route path="/Landing"  exact element={< Landing/>}></Route> */}
          <Route path="/Page404"  exact element={<Page404/>}></Route>
          <Route path="/Page403"  exact element={<Page403/>}></Route>
         {/*  <Route path="/register-stagiaire"  exact element={<RegisterStagiaire/>}></Route>
          <Route path="/login-stagiaire"  exact element={<LoginStagiaire/>}></Route>
 */}
          
         <Route path="/" exact element={ <Landing/>}>
             <Route path="login" exact element={<Login/>} />

             <Route path="U-forgot"  exact element={<UForgotPassword />}/>
             <Route path="U-reset/:token"   exact element={< UResetPassword />}/>


             <Route path="register-stagiaire"  exact element={<RegisterStagiaire/>}/>
             <Route path="login-stagiaire"  exact element={<LoginStagiaire/>}/>
         

         {/* 
           <Route path="demande-stage" exact element={<DemandeStage/>} />
           <Route path="liste-sujets" exact element={<ListeSujets/>} />
           <Route path="demande-stage-avec-sujet" exact element={<DemandeStageAvecSujet/>} />
        */}
         </Route>




        {/* <Route path="/" element={< EtuProtectedRoute/> }>  */}
         <Route path="/" exact element={ <Landing/>}>
           <Route path="demande-stage" exact element={<PageAjouterDemandeStage/>} />
           <Route path="liste-sujets" exact element={<ListeSujets/>} />
           <Route path="demande-stage-avec-sujet" exact element={<PageAjouterDemandeStageAvecSujet/>} />
         </Route> 
         <Route path="/quiz/test" exact element={<Quiz/>} />
        {/* </Route>  */}

 
        {/* Interface Coordinateur */}


   {/* <Route path="/" element={< CoProtectedRoute   /> }>   */}
        <Route path="/coordinateur/" element={<Dashboard/>} > 
          <Route path="acceuil"  element={<Acceuil/>} />
          <Route path="afficher-tous" element={<PageConsulterCompte/>} />
          <Route path="ajouter-compte" element={<PageAjouterCompte/>} /> 
          <Route path="modifier-compte/:id" exact element={<PageModifierCompte/>} />
        
          <Route path="profile" exact  element={< TProfile />} />
        </Route>
   {/* </Route> */}
 
 {/*  Interface Stagiaire*/}    
 

   {/* <Route path="/" element={< StProtectedRoute/> }>  */}
       {/* Interface Stagiaire */}
         <Route path="/etudiant/acceuil"  exact element={<Acceuil/>} ></Route> 
          <Route path="/stagiaire/" element={<StDashboard/>} > 
            <Route path="acceuil"  element={<Acceuil/>} />
            <Route path="profile"  element={< TProfile />} />
            <Route path="deposer-dossier-stage"  element={< PageDeposerDossierStage />} />
            <Route path="deposer-travail"  element={< PageDeposerTravail  />} />
            <Route path="deposer-rapport"  element={< PageDeposerRapport  />} />
            <Route path="deposer-bilan"  element={< PageDeposerBilan  />} />



          </Route>
    {/* </Route> */}

 

         {/* Interface Chef departement */}
   <Route path="/" element={< ChProtectedRoute/>}>     
         <Route path="chef-departement/" element={<ChDashboard/>} > 
             <Route path="acceuil"  element={<Acceuil/>} />
             <Route path="profile" exact   element={< TProfile  />} /> 
        </Route>
    </Route>    


 {/*  Interface Encadrant*/}    
 {/* <Route path="/" element={< EProtectedRoute/>}>   */}
        <Route path="encadrant/" element={<EDashboard/>} >  
             <Route path="acceuil"  element={<Acceuil/>} />
              <Route path="profile" exact  element={< TProfile  />} />
              <Route path="ajouter-sujet-stage" element={<PageAjouterSujet/>} /> 
              <Route path="afficher-sujets-stages" element={<PageConsulterSujetStage/>} /> 
              <Route path="modifier-sujet/:id" exact  element={<PageModifierSujet/>} /> 
              <Route path="noter-travail" exact  element={<PageNoterTravail/>} /> 
              <Route path="calendrier" exact  element={<PageCalendrier/>} /> 
        </Route> 
 {/* </Route>   */}




   {/* Interface Responsable de formation */}
{/* <Route path="/" element={< SProtectedRoute/>}>    */}
     
      <Route path="service-de-formation/" element={<SDashboard/>} > 
          <Route path="acceuil"  element={<Acceuil/>} />
          <Route path="profile"  element={< TProfile />} />
          <Route path="ajouter-departement" element={<PageAjouterDepartement/>} /> 
          <Route path="afficher-departements" element={<CrudTableDept/>} /> 
          <Route path="modifier-departement/:id" exact  element={<PageModifierDepartement/>} /> 
          <Route path="afficher-demandes-stages"  element={< PageConsulterDemandeStage  />} />
           <Route path="modifier-question/:id" exact  element={< PageModifierQuestion  />} /> 
           <Route path="modifier-reponse/:id" exact  element={< PageModifierReponse  />} /> 
          <Route path="paramQuiz" element={< PageParamsQuiz />} /> 
           <Route path="paramQuiz/:id" element={< PageParamsQuestions />} />
           <Route path="paramQuiz/:id/paramQuestion/:id" element={< PageParamsReponses />} />
           


          <Route path="afficher-dossies-stage" element={< PageConsulterDossierStage/>} />
          <Route path="afficherBilans" element={< PageConsulterBilan/>} />
          <Route path="afficherRapports" element={< PageConsulterRapport/>} />
   

     </Route>
      {/* </Route>  */}
{/* </Route>  */}
  

        



 


 {/* </Route>   */}

       </Routes> 
     </>
  );
  }
  
  export default App;
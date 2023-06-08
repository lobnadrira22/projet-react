import React from 'react'

import { Link  } from 'react-router-dom';
function Home() {
  return (
    <>          
                <br/>
                <h4>Suite à la premiére connexion à la plateforme</h4>
            

             
            <div class="card">
              
              <div class="card-body row">
                <div class="col-md-1">
                  
  
                  <button type="button" class="btn btn-warning " >
                     <Link to="/register">Register</Link>
                    </button>
                 </div>
                 <div class="col-md-1">
                   

                    <div class="btn-group">
                    <button type="button" class="btn btn-info  ">Login</button>
                    <button type="button" class="btn btn-info dropdown-toggle dropdown-hover dropdown-icon" data-toggle="dropdown">
                      <span class="sr-only">Login</span>
                    </button>
                    <div class="dropdown-menu" role="menu">
                      
                      <Link to="/reset-password-utilisateur" class="dropdown-item">Coordinateur</Link>
                      <Link to="/reset-password-utilisateur" class="dropdown-item">Encadrant</Link>
                      <Link to="/reset-password-utilisateur" class="dropdown-item">Service de formation</Link>
                      <Link to="/login" class="dropdown-item">Stagiaire</Link>
                   
                      <div class="dropdown-divider"></div>
                      
                    </div>
                  </div>
                
                </div>


              
              </div>
            </div>
            


                
                      
      

                 
          
 
      {/* <Link to="/acceuil-coordinateur">Acceuil Coordinateur</Link><br/>
       <Link to="/acceuil-encadrant">Acceuil Encadrant</Link><br/>
       <Link to="/acceuil-service-de-formation">Acceuil Service de formation</Link><br/>
      <Link to="/consulter-profile">Consulter Profile</Link><br/>
      <Link to="/ajouter-compte">Ajouter compte</Link><br/>
      <Link to="/modifier-compte">Modifier compte</Link><br/>
      <Link to="/desactiver-compte">Désactiver compte</Link><br/>
      <Link to="/deconnexion-utilisateur">Deconnexion compte</Link><br/>
      <Link to="/afficher-tous">Afficher Tous</Link><br/>
      <Link to="/login">Login</Link><br/>
      <Link to="/register-login">Register et Login</Link><br/>
      <Link to="/forgot-password">Oublier Mot de passe</Link><br/>
      <Link to="/login-utilisateur">Login Utilisateur</Link><br/>
      <Link to="/forgot-password-utilisateur">Oublier Mot de passe</Link><br/>
      <Link to="/reset-password-utilisateur">Reset password utilisateur</Link><br/>
      <Link to="/reset-password-utilisateur">Stagiaire PageEtat0</Link><br/>  */}
    </>
  )
}

export default Home

import React from 'react'
import { Link  } from 'react-router-dom';
 {/*   le component qui contient la liste des liens de l'espace du responsable de formation */}
function SSideList() {
  return (
    <>
     
    <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            
  
              
                <li className="nav-item">
                  {/*   le lien d'accueil */}
                  <Link to="/service-de-formation/acceuil" className="nav-link">
                  <i class="nav-icon   far fa-circle"></i>
                    Acceuil
                  </Link>
                </li>


               <li className="nav-item">
               {/*   le lien de profil */}
                  <Link to="/service-de-formation/profile"  className="nav-link">
                    <i class="nav-icon fas fa-cog"></i>
                    Profil
                  </Link>
                </li>


<li className="nav-item">
   {/*   le lien de gestion des départements */}
  <li className="nav-link text-white" type="button"  aria-expanded="false">

  <i class="nav-icon  far fa-circle "></i>
              
              Département
              <i class="fas fa-angle-left right"></i>
  </li>
  <ul className="nav nav-treeview">
  <li className="nav-item">
    {/*   le lien ajouter département */}
                  <Link to="/service-de-formation/ajouter-departement"  className="nav-link">
                  <i class="nav-icon  fas fa-plus-circle"></i>
                    Ajouter 
                  </Link>
                </li>
                <li className="nav-item">
                    {/*   le lien afficher départements */}
                  <Link to="/service-de-formation/afficher-departements" className="nav-link">
                  <i class="nav-icon  fas fa-clipboard-list"></i>
                    Afficher 
                  </Link>
                </li>
  </ul>
</li>




<li className="nav-item">
   {/*   le lien de gestion des demandes de stages */}
  <li className="nav-link text-white" type="button"  aria-expanded="false">
  
  <i className="nav-icon  far fa-circle "></i>
              
               Demande de stages
               <i class="fas fa-angle-left right"></i>
  </li>
  <ul className="nav nav-treeview">
  <li className="nav-item">
    {/*   le lien afficher les demandes de stages */}
                  <Link to="/service-de-formation/afficher-demandes-stages" className="nav-link">
                  <i class="nav-icon  fas fa-clipboard-list"></i>
                    Afficher 
                  </Link> 
                </li>
       
  </ul>
</li>



{/*   le lien de gestion des dossiers de stages */}
          <li className="nav-item">
  <li className="nav-link  text-white" type="button"  aria-expanded="false">

  <i className="nav-icon  far fa-circle "></i>
              Dossier de stages
              <i class="fas fa-angle-left right"></i>
  </li>
  <ul className="nav nav-treeview">
  <li className="nav-item">
    {/*   le lien afficher les dossiers de stages */}
                  <Link to="/service-de-formation/afficher-dossies-stage" className="nav-link">
                  <i class="nav-icon  fas fa-clipboard-list"></i>
                    Afficher 
                  </Link> 
                </li>
       
  </ul>
</li>

{/*   le lien de gestion des tests*/}
<li className="nav-item">
  <li className="nav-link text-white" type="button" aria-expanded="false">
  <i class="nav-icon  far fa-circle "></i>
              
              Test 
              <i class="fas fa-angle-left right"></i>
  </li>
  <ul className="nav nav-treeview">
  <li className="nav-item">
     {/*   le lien pour paramètrer les tests */}
                  <Link to="/service-de-formation/paramQuiz" className="nav-link">
                  <i class="nav-icon  fas fa-clipboard-list"></i>
                     Paramètrer 
                  </Link>
                </li>
       
  </ul>
</li>


  {/*   le lien afficher rapports */}                         
<li className="nav-item">
                  <Link to="/service-de-formation/afficherRapports" className="nav-link">
                  <i class="nav-icon   far fa-circle"></i>
                    Rapports
                  </Link>
</li>

  {/*   le lien afficher bilans */}                               
<li className="nav-item">
                  <Link to="/service-de-formation/afficherBilans" className="nav-link">
                  <i class="nav-icon   far fa-circle"></i>
                    Bilans
                  </Link>
 </li>      
      </ul>
    </nav>

    </>
  )
}

export default SSideList

import React from 'react'
import { Link  } from 'react-router-dom';


 {/*   le component qui contient la liste des liens de l'espace encadrant */}
function ESideList() {
  return (
    <>
     
    <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

 

<li className="nav-item">
  {/*   le lien d'accueil */}
                  <Link to="/encadrant/acceuil"className="nav-link" >
                    <i class="nav-icon  far fa-circle"></i>
                    Accueil
                  </Link>
                </li> 
<li className="nav-item nav-link">
   {/*   le lien de profil */}
                  <Link to="/encadrant/profile">
                    <i class="nav-icon fas fa-cog"></i>
                    Profil
                  </Link>
                </li>



<li className="nav-item">
 {/*   le lien de gestion des sujets */}
  <li className="nav-link  text-white" type="button"  aria-expanded="false">
  <i className="nav-icon  far fa-circle "></i>
              
              Sujet
               <i class="fas fa-angle-left right"></i>
              
  </li>
  <ul className="nav nav-treeview">
  <li className="nav-item">
    {/*   le lien ajouter sujet */}
                  <Link to="/encadrant/ajouter-sujet-stage" className="nav-link">
                    <i class="nav-icon  fas fa-plus-circle"></i>
                    Ajouter 
                  </Link>
                </li>   
                


                <li className="nav-item">
                  {/*   le lien afficher sujets */}
                  <Link to="/encadrant/afficher-sujets-stages" className="nav-link">
                    <i class="nav-icon  fas fa-clipboard-list"></i>
                    Afficher 
                  </Link>
                </li>

  </ul>
</li>
     
          <li className="nav-item">
               {/*   le lien noter un travail */}
                  <Link to="/encadrant/noter-travail" className="nav-link">
                    <i class="nav-icon   far fa-file"></i>
                    Noter
                  </Link>
                </li>
                
                <li className="nav-item">
                     {/*   le lien du calendrier */}
                  <Link to="/encadrant/calendrier" className="nav-link">
                    <i class="nav-icon   far fa-calendar-alt"></i>
                    Calendrier
                  </Link>
                </li>

      </ul>
    </nav>
   
    </>
  )
}

export default ESideList

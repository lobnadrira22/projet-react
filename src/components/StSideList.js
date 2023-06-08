import React from 'react'
import { Link  } from 'react-router-dom';


 {/*   le component qui contient la liste des liens de l'espace stagiaire */}
function StSideList() {


 
  return (
    <>

    <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
 

<li className="nav-item">
          {/*   le lien d'accueil */}
                  <Link to="/stagiaire/acceuil" className="nav-link">
                    <i class="nav-icon far fa-circle"></i>
                    Accueil
                  </Link>
                </li>

                <li className="nav-item">
           {/*   le lien de profil */}
                  <Link to="/stagiaire/profile" className="nav-link">
                    <i class="nav-icon  fas fa-cog"></i>
                    Profil
                  </Link>
                </li><br/>

    <li className="nav-item">
       {/*   le lien ajouter dossier de stage */}
    <Link to="/stagiaire/deposer-dossier-stage" className="nav-link">
      <i class="nav-icon  fas fa-window-maximize"></i>
      Déposer Dossier
    </Link>
  </li><br/>
       {/*   le lien ajouter travail */}   
              <li className="nav-item">
                  <Link to="/stagiaire/deposer-travail" className="nav-link">
                    <i class="nav-icon  fas fa-window-maximize"></i>
                    Déposer Travail
                  </Link>
                </li><br/>
       {/*   le lien ajouter rapport */}

                <li className="nav-item">
                  <Link to="/stagiaire/deposer-rapport" className="nav-link">
                    <i class="nav-icon  fas fa-window-maximize"></i>
                    Déposer Le Rapport
                  </Link>
                </li><br/>
         {/*   le lien ajouter bilan */} 
                <li className="nav-item">
                  <Link to="/stagiaire/deposer-bilan" className="nav-link">
                    <i class="nav-icon  fas fa-window-maximize"></i>
                    Déposer Le Bilan
                  </Link>
                </li><br/>
       
       
      </ul>
    </nav>

    </>
  )
}

export default StSideList
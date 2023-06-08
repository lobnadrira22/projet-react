import React from 'react'
import { Link  } from 'react-router-dom';

 {/*   le component qui contient la liste des liens de l'espace coordinateur */}
function SideList() {
  return (
    
    <>

    <nav class="mt-2">
                  <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false"> 
<li className="nav-item">
  {/*   le lien d'accueil */}
                  <Link to="/coordinateur/acceuil"className="nav-link">
                    <i class="nav-icon  far fa-circle"></i>
                    Accueil
                  </Link>
                </li>
<li className="nav-item " >
   {/*   le lien de profil */}
                  <Link to="/coordinateur/profile" className="nav-link">
                  <i class="nav-icon fas fa-cog"></i>
                    Profil
                   
                  </Link>
                </li>
 {/*   le lien de gestion des utilisateurs */}
<li className="nav-item">
  <li className="nav-link  text-white" type="button"  aria-expanded="false">
      <i class="nav-icon  fas fa-user-alt"></i>
      Utilisateurs
      <i class="fas fa-angle-left right"></i>
              
  </li>
  <ul className="nav nav-treeview">
        <li className="nav-item">
           {/*   le lien ajouter utilisateur */}
                  <Link to="/coordinateur/ajouter-compte" className="nav-link">
                    <i class="nav-icon  fas fa-plus-circle"></i>
                   Ajouter
                  </Link>
        </li>
         <li className="nav-item">
            {/*   le lien afficher utilisateurs */}
                  <Link to="/coordinateur/afficher-tous" className="nav-link">
                    <i class="nav-icon  fas fa-clipboard-list"></i>
                    Consulter 
                  </Link>
          </li>
  </ul>
</li>           
      </ul>
    </nav>
    </>
   
  )
}

export default SideList

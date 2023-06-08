import React from 'react'
import { Link  } from 'react-router-dom';
function ChSideList() {
  return (
    <>
       

    <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">



        <li className="nav-item">
            {/*   le lien d'accueil */}
                  <Link to="/chef-departement/acceuil">
                    <i class="nav-icon  fas fa-window-maximize"></i>
                    Acceuil
                  </Link>
                </li><br/>


                <li className="nav-item">
                  {/*   le lien de profil */}
                  <Link to="/chef-departement/profile">
                    <i class="nav-icon   fas fa-user-cog"></i>
                    Profil
                  </Link>
                </li><br/>
      </ul>
    </nav>
    </>
  )
}

export default ChSideList

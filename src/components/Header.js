import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

function Header() {
  const Swal = require('sweetalert2');
    const navigate = useNavigate();



//deconnexion
 //En cliquant sur le bouton  Deconnexion
  const logoutSubmit = (e) =>{
    e.preventDefault();
    //appeler l'api du backend pour effectuer la déconnexion
    axios.post(`api/logout`).then(res =>{
           if(res.data.status === 200){
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_name');
            localStorage.removeItem('role');
            Swal.fire ("Succès" , res.data.message ,"success");
           navigate('/');
           }
    });
  }
  

  // envoyer une notification qui indique que le dossier est complet ou incomplet selon l'état du dossier
  var msg= "";
  if(localStorage.getItem('dossiervalideSt') == 'oui'){
    msg=<p className="dropdown-item-title"> 
    <span className="float-right text-sm  text-success  "><i className="fas fa-check" /></span>
    Votre dossier est Complet 

  </p>
  }

  else if(localStorage.getItem('dossiervalideSt') == 'non'){
    msg=<p className="dropdown-item mt-100">
       <span className="float-right text-sm  text-danger "><i className="fas fa-ban " /></span>
    Votre dossier est Incomplet
 
  </p>
  }





//indique que la notification est envoyé à un stagiaire 
  var ntf = "" ;
  if(localStorage.getItem('dossiervalideSt') == 'oui'  || localStorage.getItem('dossiervalideSt') == 'non' ){
    ntf =  <span className="badge bg-danger rounded-pill  ">1</span>
  }
  
  
 //la notification est affiché dans l'espace stagiaire 
 var notification = "" ;
if(localStorage.getItem('role')== 'stagiaire'){
 
  notification =  <li className="nav-item dropdown">
    <a className="nav-link" data-toggle="dropdown" href="#">
      <i className="far fa-comments" />
      {ntf}
    </a>
    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
  
      <div className="dropdown-divider" />
      <a href="#" className="dropdown-item">
        <div className="media">
         
          <div className="media-body">
           {msg}
           
          </div>
        </div>
      </a></div></li>
  
}

  
  return (
    <>


  
     <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <li className="nav-item d-none d-sm-inline-block">
        <Link to="/" className="nav-link">Home </Link> 
        </li>
         <ul className="navbar-nav ml-auto ">
     

{notification}

  <li className="nav-item">

  {/* Le bouton deconnexion */}
 <button  onClick ={logoutSubmit}   className=" btn btn-secondary ">
                    <i className="fa-solid fa-cloud-exclamation"> </i>
                    Deconnexion
      </button>
 </li>

        <li className="nav-item float-end">
          <a className="nav-link" data-widget="fullscreen" href="#" role="button">
            <i className="fas fa-expand-arrows-alt" />
          </a>
        </li>

   
      </ul>
      <br/>

           
  
    </nav>
    
    </>
  )
}

export default Header

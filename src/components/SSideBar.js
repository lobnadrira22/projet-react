
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SSideList from './SSideList'
function SSideBar() {


//profil
const [ userInput , setUser] =useState ([]);


useEffect(()=> {
 //appeler l'api du backend pour consulter le profil d'un responsable de formation
  axios.get('api/profile').then(res=> {
    if(res.status ===200){
      setUser(res.data.user.original)
      

    }
   
  });
},[]);
  return (
    <>
   
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
     
      <a href="../../index3.html" className="brand-link">
        <img src="../../dist/img/topnet.jpg" alt="TopStage" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
          {/* Le nom de la plateforme */}
        <span className="brand-text font-weight-light">TopStage</span>
      </a>
   
      <div className="sidebar">
     
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src="../../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
          </div>
           {/* Le nom du responsable de formation connecté */}
          <div className="info">
            <a href="#" className="d-block">{userInput.nom ? <span>{userInput.nom}</span> : localStorage.getItem('auth_name')}</a>
          </div> 
          
        </div> 
         {/*   le component qui contient la liste des liens  */}
        <SSideList/>
      </div>
    
       
    </aside>
     

      
    </>
  )
}

export default SSideBar

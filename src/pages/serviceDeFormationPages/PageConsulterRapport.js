import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import _ from "lodash";
import swal from 'sweetalert';
import Swal from 'sweetalert2';

function PageConsulterRapport() {


  const Swal = require('sweetalert2');
  
   const[loading,setLoading] = useState(true);


   //rechercher
  // const[searchTerm,setSearchTerm] = useState("");

    
      const[userlist,setUserlist] = useState([]);
      useEffect(()=> {
                //appeler l'api du backend pour consulter la liste des rapports déposés par les stagiaires
        axios.get('api/afficher-stagiaire').then(res=> {
          if(res.status ===200){
            setUserlist(res.data.stagiaire)
          }
          setLoading(false);
        });
    },[]);
  

//chargement des données
if(loading){
  return <div class="d-flex justify-content-center "
 style={{marginTop: '.150' ,  position: 'absolute',
 height: '100px',
 width: '100px',
 top:' 50%',
 left: '50%',
}}>
 <div class="spinner-grow spinner-grow-sm " role="status"> </div>
 <div class="spinner-grow spinner-grow-sm " role="status"> </div>
 <div class="spinner-grow spinner-grow-sm " role="status"> </div>
</div>
}
else{
      //afficher la liste des rapports déposés par des stagiaires  
    var afficher_Rapport_Table ="";
  afficher_Rapport_Table =
    //rechercher rapport par mot clé
 userlist.filter(val =>{
 /*   if(searchTerm === ""){
     return val;
   }else if( val.nom_dept.toLowerCase().includes(searchTerm.toLowerCase()) ||   val.nom_chef_dept.toLowerCase().includes(searchTerm.toLowerCase())) {
     return val;
   } */
 }).map( (item , index) => {
     
    if(item.Rapport !==null  ){  
    return(
          
          <tr key={item._id}>

             <td>{index+1}</td>
             <td>
              <a href="#" className="btn" data-toggle="modal" data-target="#exampleModal"> <i className="fas fa-eye" style={{color: '#f4901e'}}></i></a>
              </td>
             <td>{item.Rapport.rfife}</td>
             
         

          

       {/* Afficher les détails du stagiaire qui a déposé un rapport de stage*/}
<div>


  {/* Modal */}
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Stagiaire</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">

  <div className="col-md-offset-3 col-md-12">
       <strong> Nom   </strong> {item.name} <br/>
       <strong>Prénom  </strong>  {item.prenom} <br/>
       <strong>Date de naissance   </strong>  {item.datenaissance} <br/>
       <strong> Email   </strong>{item.email} <br/> 
       <strong>Cin ou Passport , </strong> {item.cinoupassport_stagiaire} <br/>
       <strong>Niveau étude   </strong> {item.niveauetude} <br/>
       <strong>Spécialite   </strong>{item.specialite} <br/>
       <strong>Filiére   </strong> {item.filiere} <br/>
       <strong>Adresse   </strong>{item.adresse} <br/>
       <strong>Télephone  </strong>{item.telephone} <br/>
       
  </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
        </div>
      </div>
    </div>
  </div>
</div>

       {/* .Afficher les détails du stagiaire qui a déposé un rapport de stage*/}
            
          </tr>
    )}
 });
}



  return (
    <>
      
      <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">

          <div className="col-sm-6">
            <h3>Rapports</h3>
    

          </div>


          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
            

              


<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/acceuil'>Acceuil </NavLink> <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/afficherRapports'>Rapports</NavLink>


            
            
            </ol>
          </div>


        </div>
      </div>
    </section> 


    

  <div className="container ">
   <div className="card mt-4">
     <div className="card-header">
        
    {/*  <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
            <div class="input-group">
              <input type="search" placeholder="Que cherchez-vous?" aria-describedby="button-addon1" class="form-control border-0 bg-light"
               onChange={(e)=> {
                  setSearchTerm(e.target.value);
               }}
              
              />
              <div class="input-group-append">
                <button id="button-addon1" type="submit" class="btn btn-link text-primary"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div> */}
     <div className="card-body mt-4"> 
         <br/>
         <table className="table table-striped projects ">
           <thead>
             <tr>
               <th>ID</th>
               <th>Stagiaire</th>
               <th>Rapport</th>
             </tr>
           </thead>

           <tbody >

                {afficher_Rapport_Table}

           </tbody>
         </table>
            

     </div>

   </div>
  </div>

</div>

<br/><br/><br/><br/><br/><br/><br/>




    </>
  )
}

export default PageConsulterRapport

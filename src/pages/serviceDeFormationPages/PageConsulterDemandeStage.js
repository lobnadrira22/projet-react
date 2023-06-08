import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

import swal from 'sweetalert';
import Swal from 'sweetalert2';
function PageConsulterDemandeStage() {
   
  const Swal = require('sweetalert2');

  //rechercher
  const[searchTerm,setSearchTerm] = useState("");
  const[loading,setLoading] = useState(true);


  const[userlist,setUserlist] = useState([]);

  useEffect(()=> {
  //appeler l'api du backend pour consulter la liste des demandes de stages déposés par les stagiaires
    axios.get('api/afficher-stagiaire').then(res=> {
      if(res.status ===200){
        setUserlist(res.data.stagiaire)
      }
      setLoading(false);
    });
},[]);
 

//fonction accepter demande de stage
const accepter = (e , id) => {
  e.preventDefault();
  //appeler l'api du backend pour pouvoir envoyer un email d'acceptation de demande de stage d'un stagiaire
  axios.put(`api/accepter-demande/${id}`).then(res=>{
    if(res.data.status === 200){
      Swal.fire("Succès","Email Acceptation du stagiaire envoyé avec succès" ,"success")
      window.location.href="/service-de-formation/afficher-demandes-stages" 
    }
      else if(res.data.status === 404){
        Swal.fire("Erreur","Email Acceptation stagiaire non envoyé réessayer!"  ,"error")
    } 
});

}


// fonction refuser demande de stage
const refuser = (e , id ) => {
  e.preventDefault();


  //appeler l'api du backend pour pouvoir envoyer un email de refus de demande de stage d'un stagiaire
  axios.put(`api/refuser-demande/${id}`).then(res=>{
    if(res.data.status === 200){
      Swal.fire("Succès","Email Refus du  enstagiairevoyé avec succès" ,"success")
      window.location.href="/service-de-formation/afficher-demandes-stages" 
      
    }
      else if(res.data.status === 404){
        Swal.fire("Erreur","Email Refus stagiaire non envoyé réessayer!"  ,"error")
    } 
});
    
}


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
    //afficher la liste des demandes de stages déposées par des stagiaires 
 var afficher_Demande_Cards ="";
  afficher_Demande_Cards =
  userlist.filter(val =>{
    if(val.DemandeStage){

  
    if(searchTerm === ""){
     
      return val;
    }
    
    
    else if(  val.demandeStages.typestage.toLowerCase().includes(searchTerm.toLowerCase()) || val.demandeStages.nom_dept.toLowerCase().includes(searchTerm.toLowerCase())  ) {
      return val;
    }
      }
  }).map( (dm , index) => { 

  

      



if(dm.DemandeStage !==null  && dm.etatSt =='etudiant' && dm.score  ){




 return(
         <>

<tr className="col-md-offset-3 col-md-3" > 
<div className="card card-primary  bg-light">
  <div className="card-header">
    <h3 className="card-title">Demande{index+1}</h3>
  </div>
  <div className="card-body"    >
    <strong>Nom et Prénom:</strong>
      <p>{dm.name} {dm.prenom} </p>

      <strong>Email:</strong>
      <p>{dm.email} </p>


 
    <strong>Type de stage</strong>  <br/>
      <p>{dm.DemandeStage.typestage}</p>


      <strong>Nom Département</strong>  <br/>
     
      <p>{dm.DemandeStage.nom_dept }</p>


<button type="button" className="btn btn-primary " > Score Test {dm.score}</button><br/><br/>
                       



   
<div>
  <div className="text-right py-0 align-middle">
<div class="btn-group btn-group-sm ">
               {/* bouton : pour voir les détails du stagiaire qui a déposé une demande de stage  */}
                  <Link to="#" class="btn btn-info" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-eye"></i></Link>
                     {/* 2 boutons : pour accepter ou refuser une demande de stage  */}
                   <button type="button" className="btn btn-success" onClick={(e) => accepter(e , dm._id  ) }><i className="fas fa-chevron-circle-down"></i></button>
                   <button type="button" className="btn btn-danger " onClick={(e) => refuser(e , dm._id )} ><i className="fas fa-ban"></i></button>
                                   
</div></div>
  {/* Afficher les détails du stagiaire qui a déposé une demande de stage*/}
  {/* Modal */}
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Demande</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">

  <div className="col-md-offset-3 col-md-12">
       <strong> Nom </strong> {dm.name} <br/>
       <strong>Prénom</strong>  {dm.prenom} <br/>
       <strong>Date de naissance</strong>  {dm.datenaissance} <br/>
       <strong> Email</strong>{dm.email} <br/> 
       <strong>Cin ou Passport </strong> {dm.cinoupassport_stagiaire} <br/>
       <strong>Niveau étude</strong> {dm.niveauetude} <br/>
       <strong>Spécialite</strong>{dm.specialite} <br/>
       <strong>Filiére</strong> {dm.filiere} <br/>
       <strong>Adresse</strong>{dm.adresse} <br/>
       <strong>Télephone</strong>{dm. telephone} <br/>
       
  </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
        </div>
      </div>
    </div>
  </div>
</div>

 {/* . Afficher les détails du stagiaire qui a déposé une demande de stage*/}
</div>
</div>
</tr>

         </>
     )

    }


  //demande accepté
  

  if(dm.DemandeStage !==null &&  dm.etatSt== 'stagiaire_accepte_p' ){


    return(
            <>
   <tr className="col-md-offset-3 col-md-3" > 
   <div className="card card-success  bg-light">
     <div className="card-header">
       <h3 className="card-title">Demande{index+1}</h3>
       <i className="fas fa-chevron-circle-down float-right"></i>
     </div>
     <div className="card-body"    >
       <strong>Nom et Prénom:</strong>
         <p>{dm.name} {dm.prenom} </p>
   
         <strong>Email:</strong>
         <p>{dm.email} </p>
   
   
    
       <strong>Type de stage</strong>  <br/>
         <p>{dm.DemandeStage.typestage}</p>
   
   
         <strong>Nom Département</strong>  <br/>
        
         <p>{dm.DemandeStage.nom_dept}</p>
   

     <div>
     <div className="text-right py-0 align-middle">
   <div class="btn-group btn-group-sm ">
    {/* bouton : pour voir les détails du stagiaire qui a déposé une demande de stage  */}
    <Link to="#" class="btn btn-success" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-eye"></i></Link>                       
   </div></div>
  {/* Afficher les détails du stagiaire qui a été accepté*/}
     {/* Modal */}
     <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div className="modal-dialog">
         <div className="modal-content">
           <div className="modal-header">
             <h5 className="modal-title" id="exampleModalLabel">Demande</h5>
             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">×</span>
             </button>
           </div>
           <div className="modal-body">
   
     <div className="col-md-offset-3 col-md-12">
          <strong> Nom </strong> {dm.name} <br/>
          <strong>Prénom</strong>  {dm.prenom} <br/>
          <strong>Date de naissance</strong>  {dm.datenaissance} <br/>
          <strong> Email</strong>{dm.email} <br/> 
          <strong>Cin ou Passport </strong> {dm.cinoupassport_stagiaire} <br/>
          <strong>Niveau étude</strong> {dm.niveauetude} <br/>
          <strong>Spécialite</strong>{dm.specialite} <br/>
          <strong>Filiére</strong> {dm.filiere} <br/>
          <strong>Adresse</strong>{dm.adresse} <br/>
          <strong>Télephone</strong>{dm. telephone} <br/>
     </div>
           </div>
           <div className="modal-footer">
             <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
           </div>
         </div>
       </div>
     </div>
   </div>
  {/* .Afficher les détails du stagiaire qui a été accepté*/}
   </div>
   </div>
   </tr>

   
            </>
        )
   
       }
   
  //.demande acceptée
    
  });
 
}




return (
  <>
         <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">

          <div className="col-sm-6">
            <h3>Demandes Stages</h3>
    

          </div>


          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
            

              


<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/acceuil'>Acceuil </NavLink> <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/afficher-demandes-stages'>Demandes Stages</NavLink>


            
            
            </ol>
          </div>


        </div>
      </div>
    </section> 





    <div className="container ">
   <div className="card mt-4">
     <div className="card-header">



    <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
            <div class="input-group">
              <input type="search" placeholder="Vous pouvez cherchez  demande de stage selon type de stage et nom de département ?" aria-describedby="button-addon1" class="form-control border-0 bg-light"
               onChange={(e)=> {
                  setSearchTerm(e.target.value);
               }}
              
              />
              <div class="input-group-append">
                <button id="button-addon1" type="submit" class="btn btn-link text-primary"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div>

          
      
    <div className="row container"> 
    {afficher_Demande_Cards}

    </div>
<br/><br/><br/><br/><br/><br/><br/>


</div>
</div>
    </div>

  </>
)

}
export default PageConsulterDemandeStage

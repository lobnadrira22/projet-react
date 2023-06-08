import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

import swal from 'sweetalert';
import Swal from 'sweetalert2';

function PageConsulterSujetStage() {
   

  //rechercher
  const[searchTerm,setSearchTerm] = useState("");
  const[loading,setLoading] = useState(true);
  const[sujetlist,setSujetlist] = useState([]);




  useEffect(()=> {
  //appeler l'api du backend pour consulter la liste des sujets
     axios.get('api/afficher-sujets-stages').then(res=> {
        if(res.status ===200){
          setSujetlist(res.data.sujetStage) 
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
    //etat d'un sujet
  var SujetEtat = '';
 //afficher la liste des utilisateurs
 var afficher_Sujet_Cards ="";
  afficher_Sujet_Cards =
   //rechercher sujet par mot clé
  sujetlist.filter(val =>{
    if(searchTerm === ""){
      return val;
    }else if( val.sujet.toLowerCase().includes(searchTerm.toLowerCase()) || val.periode.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
    }
  }).map( (item , index) => {
    
      //etat d'un sujet publié ou dépublié
      if(item.etatsujet == 'Publié'){
        SujetEtat =  <button type="button" className="btn btn-success " ><i className="fas fa-check "></i>{item.etatsujet}</button> 
      
        }
        else if(item.etatsujet == 'Dépublié'){
          SujetEtat =  <button type="button" className="btn btn-danger " ><i className="fas  fas fa-ban "></i>{item.etatsujet}</button> 
        
        }

        
     return(
         <>
<tr key={item._id} className="col-md-offset-3 col-md-6">
        
<div className="card card-primary bg-light" >
  <div className="card-header">
  
  </div>
  <div className="card-body"    >
    
  


  <strong>Durée</strong>
      <p>{item.periode} mois</p>

    <strong>Sujet{index+1}</strong>
      <p>{item.sujet}</p>
  
  
    <strong>Technologies:</strong>
      <p className="text-uppercase">{item.technologies}</p>

    
    


{/* Afficher les détails du sujet*/}
<div>

  <div className="text-right py-0 align-middle">
<div class="btn-group btn-group-sm ">
                       
                       

                        
</div></div>

  {/* Modal */}
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Sujet{index+1} En Détails</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
        <strong className="text-secondary"> Etat Sujet  </strong>{item.etatsujet} <br/><br/>
        <strong className="text-secondary"> Période  </strong>{item.periode}/ mois <br/><br/>
        <strong className="text-secondary"> Date Début  </strong>{item.datedebut} <br/><br/>
        <strong className="text-secondary"> Type Stage  </strong>{item.typestage} <br/><br/>
        <strong className="text-secondary"> Département </strong>{item.nom_dept} <br/><br/>
        <strong className="text-secondary"> Matricule </strong>{item.matricule_sj} <br/><br/>
        <strong className="text-secondary">Sujet{index+1} </strong>{item.sujet} <br/><br/>
        <strong className="text-secondary "> Technologies  </strong> {item.technologies} <br/><br/>
        <strong className="text-secondary"> Description</strong>{item.description} <br/><br/>
      
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary text-uppercase" data-dismiss="modal">Fermer</button>
        </div>
      </div>
    </div>
  </div>
</div>

{/* . Afficher les détails du sujet*/}





{/* 2 boutons : pour modifier ou pour voir un sujet  */}
<div>
  
  
  <div className="text-right py-0 align-middle">
<div class="btn-group btn-group-sm ">
                       {/* 2 boutons : pour modifier ou voir un sujet  */}
                       <Link to="#" class="btn btn-info" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-eye"></i></Link>
                        < Link to={`/encadrant/modifier-sujet/${item._id}`}   class="btn btn-primary" ><i class="fas fa-pencil-alt"></i></Link>
                       {/* bouton pour afficher l'état du sujet */}
                        {SujetEtat}
                   
</div></div>



</div>

</div>
</div>

         
</tr>
         </>
     )
  });

}



return (
  <>
         <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">

          <div className="col-sm-6">
            <h3>Sujets Stages</h3>
 
          </div>


          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
            

              


<NavLink className={(ndata) => ndata.isActive && "active" }  to='/encadrant/acceuil'>Acceuil </NavLink> <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/encadrant/afficher-sujets-stages'>Sujets Stages</NavLink>


            
            
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
              <input type="search" placeholder="Vous pouvez cherchez sujet selon le titre et la période ?" aria-describedby="button-addon1" class="form-control border-0 bg-light"
               onChange={(e)=> {
                  setSearchTerm(e.target.value);
               }}
              
              />
              <div class="input-group-append">
                <button id="button-addon1" type="submit" class="btn btn-link text-primary"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div>



    <div className="row container "> 
 
    {afficher_Sujet_Cards}
    </div>
<br/><br/><br/><br/><br/><br/><br/>


</div>
</div>
    </div>




   
  </>
)
















}
export default PageConsulterSujetStage

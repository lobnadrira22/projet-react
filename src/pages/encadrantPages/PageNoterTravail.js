import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink ,useNavigate} from 'react-router-dom';
import _ from "lodash";
import swal from 'sweetalert';
import Swal from 'sweetalert2';
function PageNoterTravail() {


  const Swal = require('sweetalert2');

  const [noteInput,setNote] =useState({});

    
    const[userlist,setUserlist] = useState([]);
    useEffect(()=> {
      //afficher la liste des stagiaires qui ont déposé leurs travaux
      axios.get('api/afficher-stagiaire').then(res=> {
        if(res.status ===200){
          setUserlist(res.data.stagiaire)
        }
        setLoading(false);
      });
  },[]);
   
  const handleInput = (e) => {
    e.persist();
    setNote({...noteInput,[e.target.name] : e.target.value})

  }
 
//En cliquant sur le bouton envoyer, les données seront envoyées dans la base de données
  //chaque travail a sa propre note 
const submitNote = (e) => {
    e.preventDefault();
    const data = {
      note:noteInput.note,
      message:noteInput.message,
     
    }
           //appeler l'api du backend pour effectuer l'ajout d'une note
    axios.post('/api/ajouter-note',data).then(res =>
      {
        if(res.data.status === 200) {
          Swal.fire("Success",res.data.message,"success");
          window.location.reload(false);
        }
      })
  }
   
    const[loading,setLoading] = useState(true);
   

    //rechercher
  //  const[searchTerm,setSearchTerm] = useState("");
   


//Chargement des données
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
  
  var afficher_User_Table ="";
  //afficher la liste des stagiaires qui ont déposé leurs travaux
   afficher_User_Table =
   //rechercher stagiaire par mot clé
  userlist.filter(val =>{
   /*  if(searchTerm === ""){
      return val;
    }else if( val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
    } */
  }).map( (ntrv , index) => {
    if(ntrv.Traveaux !==null  ){  
     return(
           
           <tr key={ntrv._id}>

              <td>{index+1}</td>
              <td>{ntrv.name}</td>
              <td>{ntrv.prenom}</td>  
              <td>
              <a href="#" className="btn" data-toggle="modal" data-target="#exampleModal"> <i className="fas fa-eye" style={{color: '#f4901e'}}></i></a>
              </td>
               <td>



                 {/* Le formulaire de l'ajout d'une note d'un travail déposé*/}

               <form onSubmit={submitNote}>
              <div className="row"> 
              
    <div className="wrap-input100   col-lg-2 form-group  ">
                    <input className="input100 mt-4" type="text"  name="note"  onChange={handleInput} value={noteInput.note}    placeholder="Travail" />
                    <span className="focus-input111" />
                 
              </div>
              {/* note envoyé par l'encadrant*/}
              <div className="wrap-input100   col-lg-3 form-group  ">
                    <input className="input100 mt-4" type="text"  name="note"  onChange={handleInput} value={noteInput.note}    placeholder="Note" />
                    <span className="focus-input111" />
                 
              </div>
               {/* message envoyé par l'encadrant*/}
               <div className="wrap-input100   col-lg-4   form-group" >
                   <textarea className="input100" type="text"  name="message" placeholder="Message" onChange={handleInput} value={noteInput.message}     style={{height: '80px'}}/>
                   <span className="focus-input111" />
               </div>   

               <div className="  col-lg-3 mt-10  ">
               <button type="submit" className="login100-form-btn float form-group "> 
                   <Link to="#"  style={{color: 'white'}}>
                   Envoyer
                  </Link> 
               </button>
               </div>
             
               </div>
               </form>
               </td>










              
{/* Afficher les détails du travail déposé*/}
<div>

{/* Modal */}
<div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Détails</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">

<div className="col-md-offset-3 col-md-12">
     <strong> Nom   </strong>{ntrv.name} <br/>
     <strong>Prénom   </strong>{ntrv.prénom}   <br/>
    
     <strong> Email   </strong>{ntrv.email}<br/> 
   
     <strong>Niveau étude  </strong> {ntrv.niveauetude}<br/>
     <strong>Spécialite  </strong>{ntrv.specialite}<br/>
     <strong>Filiére  </strong> {ntrv.filiere} <br/>

</div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
      </div>
    </div>
  </div>
</div>
</div>

{/* Afficher les détails du travail déposé*/}



{/* Afficher détails  */}
<div>

  {/* Modal */}
  <div className="modal fade" id="trv" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Noter</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">

  <div className="col-md-offset-3 col-md-12">
 

  </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
        </div>
      </div>
    </div>
  </div>
</div>

{/* .Afficher détails   */}
         
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
            <h3>Noter Traveaux</h3>
    

          </div>


          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
             

              


<NavLink className={(ndata) => ndata.isActive && "active" }  to='/encadrant/acceuil'>Acceuil </NavLink> <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/encadrant/noter-travail'>Notes</NavLink>


            
            
            </ol>
          </div>


        </div>
      </div>
    </section> 


    

  <div className="container ">
   <div className="card mt-4">
     <div className="card-header">
        
{/*      <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
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
               <th>Nom</th>
               <th>Prénom</th>
               <th>détails</th>
               <th>Noter</th>
        
              
              
               
              
             </tr>
           </thead>

           <tbody >

                {afficher_User_Table}

           </tbody>
         </table>
            

     </div>

   </div>
  </div>

</div>



    </>
  )
}

export default PageNoterTravail

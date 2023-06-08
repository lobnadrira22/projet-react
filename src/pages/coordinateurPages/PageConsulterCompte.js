import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import _ from "lodash";

function PageConsulterCompte() {


    const[loading,setLoading] = useState(true);
    const[userlist,setUserlist] = useState([]);

    //rechercher
    const[searchTerm,setSearchTerm] = useState("");

    useEffect(()=> {
      //appeler l'api du backend pour consulter la liste des comptes utilisateurs
        axios.get('api/comptes').then(res=> {
          if(res.status ===200){
            setUserlist(res.data.user)
          }
          setLoading(false);
        });
    },[]);


var afficher_User_Table ="";
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
  //etat d'un utilisateur
  var UtiEtat = '';
  //afficher la liste des utilisateurs
   afficher_User_Table =
  //rechercher utilisateur par mot clé
  userlist.filter(val =>{
    if(searchTerm === ""){
      return val;
    }else if( val.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||val.prenom.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
    }
  }).map( (item , index) => {
    
    //etat d'un utilisateur activé ou désactivé
    if(item.etat == 'Active'){
    UtiEtat = <i className=" fas fa-user-check  text-success"></i>
   
    
    }
    else if(item.etat == 'Désactive'){
     UtiEtat =<i className=" fas fa-user-alt-slash  text-danger"> </i>
   
      
    }
     return(
           
           <tr key={item._id}>

              <td>{index+1}</td>
              <td>{item.nom}</td>
              <td>{item.prenom}</td>
              <td>{item.email}</td>
              <td>{item.numTel}</td>
            
              <td>{item.matricule}</td>
              <td>{item.departement}</td>
              <td  className="btn btn-primary btn-sm p-0 rounded-pill mt-2">{item.role}</td> 
               <td>{UtiEtat}</td>

              <td>
                  {/* lien : pour modifier un compte */}
                 <Link to={`/coordinateur/modifier-compte/${item._id}`}>
                   <i className="fas fa-pencil-alt  text-success"></i></Link>
              </td>
           </tr> 
     )
  });
}


  return (
    <>
  
  <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">

          <div className="col-sm-6">
            <h3>Comptes</h3>
    

          </div>


          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
  
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/coordinateur/acceuil'>Acceuil </NavLink> <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/coordinateur/afficher-tous'>Comptes</NavLink>

     
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
              <input type="search" placeholder="Vous pouvez cherchez selon nom et prénom utilisateur ?" aria-describedby="button-addon1" class="form-control border-0 bg-light"
               onChange={(e)=> {
                  setSearchTerm(e.target.value);
               }}
              
              />
              <div class="input-group-append">
                <button id="button-addon1" type="submit" class="btn btn-link text-primary"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div>

  

     <div className="card-body mt-4"> 
         <br/>
         
         <table className="table table-striped projects ">
           <thead>
             <tr>
               <th>ID</th>
               <th>Nom</th>
               <th>Prénom</th>
               <th>Email</th>
               <th>NumTél</th>
               <th>Matricule</th> 
               <th>Département</th>
               <th>Rôle</th> 
               <th>Etat</th>
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

<br/><br/><br/><br/><br/><br/>
    </>
  )
}

export default PageConsulterCompte

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import _ from "lodash";
import swal from 'sweetalert';
import Swal from 'sweetalert2';

function CrudTableDept() {
  
   const[loading,setLoading] = useState(true);
   const[deptlist,setDeptlist] = useState([]);

   //rechercher
   const[searchTerm,setSearchTerm] = useState("");

   useEffect(()=> {
     //appeler l'api du backend pour consulter la liste des départements
      axios.get('api/afficher-departements').then(res=> {
         if(res.status ===200){
           setDeptlist(res.data.dept) //user 
         }
         setLoading(false);
       }); 
   },[]);




var afficher_Dept_Table ="";
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
    //etat d'un département
    var DeptEtat = '';
    //afficher la liste des départements
  afficher_Dept_Table =
  //rechercher département par mot clé
 deptlist.filter(val =>{
   if(searchTerm === ""){
     return val;
   }else if( val.nom_dept.toLowerCase().includes(searchTerm.toLowerCase()) ||   val.nom_chef_dept.toLowerCase().includes(searchTerm.toLowerCase())) {
     return val;
   }
 }).map( (item , index) => {
     
   
     //etat d'un département activé ou désactivé
    if(item.etat == 'Active'){
   
        DeptEtat =  <button type="button" className="btn btn-success btn-sm  rounded-pill " ><i className="fas fa-check "></i>{item.etat}</button> 
      
        }
        else if(item.etat == 'Désactive'){
     
          DeptEtat =  <button type="button" className="btn btn-danger btn-sm rounded-pill" ><i className="fas  fas fa-ban "></i>{item.etat}</button> 
        
        }
    return(
          
          <tr key={item._id}>

             <td>{index+1}</td>
             <td>{item.nom_dept}</td>
             <td>{item.nom_chef_dept}</td>
             
             <td>
                <Link to={`/service-de-formation/modifier-departement/${item._id}`}>
                  <i className="fas fa-pencil-alt  text-success"></i></Link>
             </td>
             <td>{DeptEtat}</td>
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
            <h3>Départements</h3>
    

          </div>


          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
            

              


<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/acceuil'>Acceuil </NavLink> <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/afficher-departements'>Départements</NavLink>


            
            
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
              <input type="search" placeholder="Que cherchez-vous?" aria-describedby="button-addon1" class="form-control border-0 bg-light"
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
               <th>Nom Département</th>
               <th>Nom Chef Département</th>
             </tr>
           </thead>

           <tbody >

                {afficher_Dept_Table}

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

export default CrudTableDept

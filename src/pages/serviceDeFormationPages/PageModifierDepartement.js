import React , { useEffect, useState } from 'react'
import { useNavigate ,Link , NavLink ,useParams} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2';


function PageModifierDepartement() {

  const Swal = require('sweetalert2');
  const navigate = useNavigate();

   //validation des données

    const [utiErrnomchefdept,setUtiErrnomchefdept]=useState(false);
    const [utiErrstrchefdept,setUtiErrstrchefdept]=useState(false);

  const params=useParams();
  
  const [ deptInput , setDept] =useState ([]);
  const [ error , setError] =useState ([]);
  const[loading,setLoading] = useState(true);
 
 
  useEffect(() => {
     
    const deptId = params.id;
         //appeler l'api du backend qui effectue la recherche d'un département par son id
    axios.get(`api/find-departement/${deptId}`).then(res =>{
       if(res.data.status === 200 ){
        setDept(res.data.dept);
       }
       else if(res.data.status === 404){
        Swal.fire ("Erreur",res.data.message,"error");
         navigate('/service-de-formation/afficher-departements');
       }
        setLoading(false);
     });
  }, [params]);
 
 
  
 
  
 const handleInput = (e) => {
   e.persist();
  
   setDept({ ... deptInput , [e.target.name]: e.target.value})

 
      //erreur nom chef de département

      if(deptInput.nom_chef_dept.length < 2 || deptInput.nom_chef_dept.length >20){
        setUtiErrnomchefdept(true)
       }
       else{
        setUtiErrnomchefdept(false)
       }
     


        //le nom du chef de département doit etre string 
        if( !(deptInput.nom_chef_dept.match('[a-z-A-Z]')) ) {  
          setUtiErrstrchefdept(true)
         }
         else{
          setUtiErrstrchefdept(false)
         }
    
 }
 
 //En cliquant sur le bouton modifier, les données seront modifiées dans la base de données
 const updateDept = (e) => {
    e.preventDefault();
 
    const deptId = params.id;
    const data = deptInput;
 
 
 //appeler l'api du backend qui effectue la modification d'un département à travers son id
    axios.put(`api/modifier-departement/${deptId}` , data).then( res => {
      if(res.data.status === 200){
        Swal.fire("Succès" , res.data.message , "success");
        navigate('/service-de-formation/afficher-departements');
        setError([]);
 
      }
       else if(res.data.status === 422){
             setError(res.data.validation_errors);
      }
      else if(res.data.status === 404){
        Swal.fire("Erreur" , res.data.message , "error");
       navigate('/service-de-formation/afficher-departements');
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
  <div  class="spinner-grow spinner-grow-sm " role="status"> </div>
  <div class="spinner-grow spinner-grow-sm " role="status"> </div>
  <div class="spinner-grow spinner-grow-sm " role="status"> </div>
 </div>
 }





  return (
    <>
      
            
<section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h3>Modifier Département</h3>
          </div>

          
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
          

<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/acceuil'>Acceuil</NavLink>  <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/modifier-departement'>Modifier Département</NavLink>

            </ol>
          </div>
        </div>
      </div>
    </section>


    <br/>
      <div className="col-md-offset-3 col-md-12">
        <div className="form-container">

<form onSubmit={updateDept}>
  <div className="row">
{/* Le nom du département*/}
    <div className="wrap-input100   col-lg-6 mb-4 " >
<select  name="nom_dept" onChange={handleInput} value={deptInput.nom_dept}  className="input100 border-0 " type="text" required >
  
       <option   selected hidden>--Nom département--</option>
       <option name="nom_dept" value="IT">IT</option>
    <option name="nom_dept" value="Marketing">Marketing</option>
    <option name="nom_dept" value="BI"> BI</option>
    <option name="nom_dept" value="Développement">Développement </option>
    <option name="nom_dept" value="DSI">DSI </option>
    <option name="nom_dept" value="Finance">Finance </option>

 </select>
 {error.nom_dept ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />Vous devez choisir un Département!</span> :""}  

</div>

     {/* Le nom du chef de département */}
     <div className="wrap-input100   col-lg-6 mb-4  " >
          <input className="input100" type="text"  name="nom_chef_dept"    onChange={handleInput} value={deptInput.nom_chef_dept}  placeholder="Nom Chef déparatement"  required/>
          <span className="focus-input111" />
          <span className="symbol-input111">
          </span>
           {utiErrstrchefdept ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> nom chef est chaine de caractéres! </span> :""}  
          {utiErrnomchefdept ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> nom chef max 20 caractéres!</span> :""}  
         
        </div>
      


{/* L'état du département*/}
<div className="wrap-input100   col-lg-6 mb-4 " >
<select  name="etat"  onChange={handleInput} value={deptInput.etat}  className="input100 border-0 " type="text" >

  
        <option selected  name="etat"  value="Active">Activer</option>
        <option  name="etat"  value="Désactive">Désactiver</option> 
 </select>

        
          <span className="focus-input111" />
          <span className="symbol-input111">
          </span>
        </div>


 
{/* Le bouton annuler */}
    <div className="wrap-input100   col-lg-6 mb-4 " ></div>
    <div className="form-group col-lg-2 ">
   
          <button className="persb-btn">

           <Link to="/service-de-formation/afficher-departements"  style={{color: 'white'}}>
          Annuler
            </Link> 

          </button>
       
        </div>

    {/* Le bouton modifier département */}
        <div className="form-group col-lg-3  ">
          <button type="submit" className="login100-form-btn"  style={{color: 'white'}}>
            
          Modifier Département
         
          </button>
  </div>    
  
     </div>


</form>
   
        </div>
      </div>
   <br/><br/><br/> <br/><br/><br/> <br/>



    </>
  )
}

export default PageModifierDepartement

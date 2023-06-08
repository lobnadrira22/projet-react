import React , { useEffect, useState } from 'react'
import { useNavigate ,Link , NavLink ,useParams} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
function PageModifierSujet() {

  const Swal = require('sweetalert2');
    const navigate = useNavigate();

   //validation des données
    const [utiErrsujet,setUtiErrsujet]=useState(false);
    const [utiErrtechnologies,setUtiErrtechnologies]=useState(false);
    const [utiErrstrsujet,setUtiErrstrsujet]=useState(false);
    const [utiErrnom_dept,setUtiErrnom_dept]=useState(false);

    const [utiErrstrnom_dept ,setUtiErrstrnom_dept ]=useState(false);
    const [utiErrstrtechnologies,setUtiErrstrtechnologies ]=useState(false);
    

    const params=useParams();   
     const [ sujetInput , setSujet] =useState ([]);
     const [ error , setError] =useState ([]);
     const[loading,setLoading] = useState(true);
  
  

     useEffect(() => {
     
        const sujetId = params.id;
         
        axios.get(`api/find-sujet/${sujetId}`).then(res =>{
           if(res.data.status === 200 ){
            setSujet(res.data.sujet);
           }
           else if(res.data.status === 404){
            Swal.fire("Erreur",res.data.message,"error");
             navigate('/encadrant/afficher-sujets-stages');
           }
            setLoading(false);
         });
      }, [params]);
     
   
   
   
   
   const handleInput = (e) => {
      e.persist();
     
      setSujet({ ...sujetInput , [e.target.name]: e.target.value})

       //erreur sujet
  
       if(sujetInput.sujet.length > 50){
        setUtiErrsujet(true)
       }
       else{
        setUtiErrsujet(false)
       }
       
          //erreur technologies
  
          if(sujetInput.technologies.length > 50){
            setUtiErrtechnologies(true)
           }
           else{
            setUtiErrtechnologies(false)
           }

               //erreur  nom_dept
  
          if(sujetInput. nom_dept.length > 30){
            setUtiErrnom_dept(true)
           }
           else{
            setUtiErrnom_dept(false)
           }
        
       
       //le sujet doit etre string
       if( !(sujetInput.sujet.match('[a-z-A-Z]')) ) {  
        setUtiErrstrsujet(true)
       }
       else{
        setUtiErrstrsujet(false)
       }


       
         if( !(sujetInput.technologies.match('[a-z-A-Z]')) ) {  
          setUtiErrstrtechnologies(true)
         }
         else{
          setUtiErrstrtechnologies(false)
         }

          
       if( !(sujetInput.nom_dept.match('[a-z-A-Z]')) ) {  
        setUtiErrstrnom_dept(true)
       }
       else{
        setUtiErrstrnom_dept(false)
       }

        
      
   }
   
   
 //En cliquant sur le bouton modifier, les données seront modifiées dans la base de données
   const updateSujet = (e) => {
    e.preventDefault();
 
    const sujetId = params.id;
    const data = sujetInput;
 
 //appeler l'api du backend qui effectue la modification d'un sujet à travers de son id

    axios.put(`api/modifier-sujet/${sujetId}` , data).then( res => {
      if(res.data.status === 200){
        Swal.fire("Succès" , res.data.message , "success");
        navigate('/encadrant/afficher-sujets-stages');
        setError([]);
 
      }
       else if(res.data.status === 422){
             setError(res.data.validation_errors);
             swal("Erreur dans les champs" , "Vérifier les champs!", "error");
             
      }
      else if(res.data.status === 404){
        Swal.fire("Erreur" , res.data.message , "error");
       navigate('/encadrant/afficher-sujets-stages');
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




  return (
    <>
          
<section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h3>Modifier Sujet</h3>

          </div>

          
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
          

<NavLink className={(ndata) => ndata.isActive && "active" }  to='/encadrant/acceuil'>Acceuil</NavLink>  <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/encadrant/modifier-sujet'>Modifier Sujet</NavLink>

            </ol>
          </div>
        </div>
      </div>
    </section>


    <br/>
      <div className="col-md-offset-3 col-md-12">
        <div className="form-container">
<form onSubmit={updateSujet} >
  <div className="row">



   {/* Sujet */}
   <div className="wrap-input100   col-lg-6 mb-4  validate-input" >
          <input className="input100" type="text"  name="sujet"  onChange={handleInput} value={sujetInput.sujet}  placeholder="Sujet" />
          <span className="focus-input111" />
          <span className="symbol-input111">
          </span>
           {utiErrstrsujet ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> sujet est chaine de caractéres!</span> :""}  
          {utiErrsujet ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> sujet max 50 caractéres!</span> :""}  
         
        </div>

   {/* Technologies */}
        <div className="wrap-input100   col-lg-6 mb-4  validate-input" >
          <input className="input100" type="text"  name="technologies"  onChange={handleInput} value={sujetInput.technologies}  placeholder="Technologies" />
          <span className="focus-input111" />
          <span className="symbol-input111">
          </span>
          {utiErrstrtechnologies ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> Technologies est chaine de caractéres!</span> :""}  
          {utiErrtechnologies ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> Technologies max 30 caractéres!</span> :""}  
         
        </div>






 {/*Type de stage */}
 <div className="wrap-input100    col-lg-6 mb-4" >
<select  name="typestage"  onChange={handleInput} value={sujetInput.typestage}  className="input100 border-0 " type="text" >
<option  selected hidden >--Type du stage--</option>
      
<option name="typestage" value="PFE Licence">PFE Licence</option> 
    <option name="typestage" value="PFE Master">PFE Master</option> 
    <option name="typestage" value="PFE Cycle d'ingénieur">PFE Cycle d'ingénieur</option> 
  


<option name="typestage" value="Pérfectionnement">Pérfectionnement</option>

 </select>

        
          <span className="focus-input111" />
           {error.typestage ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />Vous devez choisir un Type de Stage!</span> :""}  

        </div>

{/* nom département*/} 
<div className="wrap-input100   col-lg-6 mb-4  " >
<select name="nom_dept" onChange={handleInput} value={sujetInput.nom_dept} className="input100 border-0 " type="text" >
<option   selected hidden>--Nom Département--</option>
    <option name="nom_dept" value="IT">IT</option>
    <option name="nom_dept" value="Marketing">Marketing</option>
    <option name="nom_dept" value="BI"> BI</option>
    <option name="nom_dept" value="Développement">Développement </option>
    <option name="nom_dept" value="DSI">DSI </option>
    <option name="nom_dept" value="Finance">Finance </option>
 </select>
<span className="focus-input111" />
<span className="symbol-input111">
</span>
{error.nom_dept ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />Vous devez choisir une Département!</span> :""}  

</div>

{/* Date de début de stage*/}
<p style={{marginLeft: '40px'}}>Début Début   </p>
<div className="wrap-input100   col-lg-12 mb-4  " >
          <input className="input100" type="date"  name="datedebut"  onChange={handleInput} value={sujetInput.datedebut}  required/> 
        
        </div>
  {/* Période de stage */}
  <div className="wrap-input100   col-lg-6 mb-4  validate-input" >
          <input className="input100" type="number" min="1" max="12"  name="periode"  onChange={handleInput} value={sujetInput.periode}  placeholder="Période de stage par mois" />
          <span className="focus-input111" />
        </div>



 {/* Etat */}
<div className="wrap-input100   col-lg-6 mb-4 " >
<select  name="etatsujet"  onChange={handleInput} value={sujetInput.etatsujet}  className="input100 border-0 " type="text" >
        <option selected  name="etatsujet"  value="Publié">Publier</option>
        <option  name="etatsujet"  value="Dépublié">Dépublier</option> 
 </select>


</div>

 {/*Description du sujet */}
 <div className="wrap-input100   col-lg-12 mb-4  form-group" >
          <textarea className="input100" type="text"  name="description"  onChange={handleInput}  value={sujetInput.description} placeholder="Description"  style={{height: '80px'}}/>
          <span className="focus-input111" />
          <span className="symbol-input111">
            {/* <i className=" fas fa-file-alt"  aria-hidden="true" />  */}
          </span>
       
        </div>

 

  
    {/* Le bouton annuler */}
    <div className="form-group col-lg-2 ">
   
          <button className="persb-btn">

           <Link to="/encadrant/afficher-sujets-stages"  style={{color: 'white'}}>
          Annuler
            </Link> 

          </button>
       
        </div>

    
        {/* Le bouton modifier sujet */}
        <div className="form-group col-lg-3  i">
          <button type="submit" className="login100-form-btn"  style={{color: 'white'}}>
            
          Modifier Sujet
         
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

export default PageModifierSujet

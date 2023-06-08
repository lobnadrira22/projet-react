import {React,useState,useEffect} from 'react'
import { useNavigate,useParams ,Link, NavLink} from 'react-router-dom';
import {Button, Form, FormGroup} from 'react-bootstrap'

import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

function PageModifierQuestion() {

  const Swal = require('sweetalert2');
  const navigate = useNavigate();
  const params=useParams();
  
  const [ questionInput , setQuestion] =useState ([]);
  
   //validation des données
 const [error, setError] = useState([]);
  
 
 
 
  useEffect(() => {
    const questionId = params.id;
         //appeler l'api du backend qui effectue la recherche d'une question par son id
    axios.get(`api/question/${questionId}`).then(res =>{
       if(res.data.status === 200 ){
        setQuestion(res.data.question);
      
       }
       else if(res.data.status === 404){
        Swal.fire ("Error",res.data.message,"error");
         
       }
       
     });
  }, [params]);
 
 
  
 
  
 const handleInput = (e) => {
   e.persist();
  
   setQuestion({ ... questionInput , [e.target.name]: e.target.value})
 }
 
 //En cliquant sur le bouton modifier, les données seront modifiées dans la base de données
 const updateQuestion = (e) => {
    e.preventDefault();
 
    const questionId = params.id;
    const data = questionInput;
    
 
 
 //appeler l'api du backend qui effectue la modification d'une question à travers son id
    axios.put(`api/question/${questionId}` , data).then( res => {
      if(res.data.status === 200){
        Swal.fire ("Sucess" , res.data.message , "success");
        navigate("/service-de-formation/paramQuiz")
        setError([]);
 
      }
      else if(res.data.status === 422){
             setError(res.data.validation_errors);
             Swal.fire ("erreur dans champs" , " ", "error");
      }
      else if(res.data.status === 404){
        Swal.fire ("Error" , res.data.message , "error");
      
      }
    });
 
 
 }
 
 
 
return(
   <>
             
<section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h3>Modifier Question</h3>
          </div>

          
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
          

<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/acceuil'>Acceuil</NavLink>  <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/modifier-question'>Modifier Question</NavLink>

            </ol>
          </div>
        </div>
      </div>
    </section>


    <br/>
      <div className="col-md-offset-3 col-md-10 mx-auto">
        <div className="form-container">
<form onSubmit={updateQuestion}>
  <div className="row">


      {/*La question*/}
      <div className="wrap-input100   col-lg-12 mb-4" >
              <input className="input100" type="textarea" name="question"   placeholder="Taper question"
        onChange={handleInput} value={questionInput.question}
        rows={3}  required/>
              <span className="focus-input111" />
              <span className="symbol-input111">
            
              </span>
            
            </div>
            

              {/*Le niveau de difficulté d'une question*/}
    <div className="wrap-input100   col-lg-6 mb-4 " >
       <select name="niveau"
          onChange={handleInput} value={questionInput.niveau} className="input100 border-0 " type="text" >
        <option selected hidden>--Niveau-- </option> 
           <option name="niveau" value="facile">facile</option>
           <option name='niveau' value="moyen">moyen</option>
           <option name='niveau' value="difficile">difficile</option>
     </select>
          <span className="focus-input111" />
          {error.niveau? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />Vous devez choisir Le niveau de difficulté de la question !</span> :""}  

        </div>
            

         {/*La durée d'une question */}
         <div className="wrap-input100   col-lg-6 mb-4" >
              <input className="input100" name='duree'
    type="number" min="1" 
      placeholder='durée de la question'
      onChange={handleInput} value={questionInput.duree}
      required  />
              <span className="focus-input111" />
              <span className="symbol-input111">
            
              </span>
            
            </div>
 
                    {/*Les points d'une question*/}
         <div className="wrap-input100   col-lg-6 mb-4" >
              <input className="input100" 
   name='points'
   type="number" min="1" 
   placeholder='points du question'
   onChange={handleInput} value={questionInput.points} 

   required  />
              <span className="focus-input111" />
              <span className="symbol-input111">
            
              </span>
            
            </div>
             
     

{/* L'état de question*/}
<div className="wrap-input100   col-lg-6 mb-4 " >
<select  name="etat"  onChange={handleInput} value={questionInput.etat}  className="input100 border-0 " type="text" >
        <option selected  name="etat"  value="active">Activer</option>
        <option  name="etat"  value="désactive">Désactiver</option> 
 </select>

        
          <span className="focus-input111" />
          <span className="symbol-input111">
          </span>
        </div>



 
{/* Le bouton annuler */}
<br/>
    <div className="form-group col-lg-2 ">
   
          <button className="persb-btn">

           <Link to="/service-de-formation/paramQuiz"  style={{color: 'white'}}>
          Annuler
            </Link> 

          </button>
       
        </div>

    {/* Le bouton modifier question */}
        <div className="form-group col-lg-3 ">
          <button type="submit" className="login100-form-btn"  style={{color: 'white'}}>
            
          Modifier Question
         
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

export default PageModifierQuestion
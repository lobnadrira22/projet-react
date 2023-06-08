import {React,useState,useEffect} from 'react'
import { useNavigate,useParams ,Link, NavLink} from 'react-router-dom';
import {Button, Form, FormGroup} from 'react-bootstrap'

import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

function PageModifierReponse() {

  const Swal = require('sweetalert2');
    const [reponseInput,setReponse] =useState([]);
  const navigate = useNavigate();
  const [image ,setRepimage] = useState([]);


  const [repType, setRepType] = useState(null);

  

  const params=useParams();
  
  
  const [ error , setError] =useState ([]);
 
  const handleImage = (e) => {
    setRepimage({image:e.target.files[0]});
  }
 
  useEffect(() => {
     
    const reponseId = params.id;
         //appeler l'api du backend qui effectue la recherche d'une réponse par son id
    axios.get(`api/reponse/${reponseId}`).then(res =>{
       if(res.data.status === 200 ){
        setReponse(res.data.reponse);
       }
       else if(res.data.status === 404){
        Swal.fire ("Error",res.data.message,"error");
         
       }
       
     });
  }, [params]);
 
 
  
 
  
 const handleInput = (e) => {
   e.persist();
  
   setReponse({ ...reponseInput , [e.target.name]: e.target.value})
 }
 
 //En cliquant sur le bouton modifier, les données seront modifiées dans la base de données
 const updateReponse = (e) => {
    e.preventDefault();
 
    const reponseId = params.id;
   // const data = reponseInput;
   const data = {
    id_question: reponseId,
    repcorrecte: reponseInput.niveaustagiaire,
    reptext: reponseInput.duree,
  } 
 
 
 
 //appeler l'api du backend qui effectue la modification d'une réponse à travers son id
    axios.put(`api/reponse/${reponseId}` , data).then( res => {
      if(res.data.status === 200){
        Swal.fire("Sucess" , res.data.message , "success");
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
            <h3>Modifier Reponse</h3>
          </div>

          
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
          

<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/acceuil'>Acceuil</NavLink>  <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/modifier-reponse'>Modifier Reponse</NavLink>

            </ol>
          </div>
        </div>
      </div>
    </section>


    <br/>
      <div className="col-md-offset-3 col-md-10 mx-auto">
        <div className="form-container">
<form onSubmit={updateReponse}>
  <div className="row">
   {/* Réponse */}


   <div className="wrap-input100   col-lg-12 mb-4 " >
                        <select name='niveaustagiaire' onChange={handleInput} value={reponseInput.niveaustagiaire} className="input100 border-0 ">
                          <option selected hidden>--Correcte?--</option>
                          <option name="niveaustagiaire" value={true}>Oui</option>
                          <option name="niveaustagiaire" value={false}>Non</option>
                        </select>

                      </div>

                      <div className='wrap-input100   col-lg-12 mb-4'>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <input type='radio' id='repText' name='rep' onClick={() => setRepType(0)} />
                            <p style={{ marginLeft: 5 }}>Réponse </p>
                          </div>
                        {/*   <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <input type='radio' id='repImage' name='rep' onClick={() => setRepType(1)} />
                            <p style={{ marginLeft: 5 }}>Réponse Image</p>
                          </div> */}
                        </div>
                      </div>

                      {
                        repType === 0 ?
                        // Réponse Texte
                          <div className="wrap-input100 col-lg-12 mb-4 ">
                            <input name="duree" className="input100 border-0 " type="text" placeholder="Réponse" onChange={handleInput} value={reponseInput.duree}  required />
                          </div>
                          : repType === 1 ?
                         // Réponse Image
                          <div className="wrap-input100 col-lg-12 mb-4">
                            <input name="note" className="input100 border-0 " type="file" onChange={handleInput} value={reponseInput.note} />
                          </div>
                          : null
                      }



{/* Le bouton annuler */}
    <br/>
    <div className="form-group col-lg-2 ">
   
          <button className="persb-btn">

           <Link to="/service-de-formation/paramQuiz"  style={{color: 'white'}}>
          Annuler
            </Link> 

          </button>
       
        </div>


    {/* Le bouton modifier réponse */}
    
        <div className="form-group col-lg-3 ">
          <button type="submit" className="login100-form-btn"  style={{color: 'white'}}>
            
          Modifier Reponse
         
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

export default PageModifierReponse
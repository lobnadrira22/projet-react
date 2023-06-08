import React , { useState} from 'react'
import { useNavigate ,Link , NavLink} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

function PageAjouterDemandeStage() {

  const Swal = require('sweetalert2');
    const navigate = useNavigate();

     //le fichier cv
      const [ filedata , setFiledata] = useState([]);
    //validation des données
    const [ error , setError] =useState ([]);

     
   
    const [ userInput , setUser] =useState ({
        niveauetude: '',
       typestage:'',
        nom_dept:'', 
       // cv:[],
        error_list:[],
     
      
     
      });
     
      const handleInput = (e) => {
        e.persist();
       
        setUser({ ...userInput , [e.target.name]: e.target.value} )
     
      }     

  
   const handleFile  = (e) =>{
    setFiledata({cv:e.target.files[0]});
   }
 
   //En cliquant sur le bouton Ajouter une demande de stage, les données seront envoyées à la base de données
      const demandeSubmit = (e) => {
        e.preventDefault();
      
      
         const data = {
          typestage:userInput.typestage,
          nom_dept:userInput.nom_dept,
          cv:filedata.cv,
          
          } 

       /*    const formData = new FormData();

		formData.append('cv', filedata.cv);
    formData.append('cin', userInput.cin);
    formData.append('typestage', userInput.typestage);
    formData.append('nom_dept', userInput.nom_dept); */

     //appeler l'id du stagiaire connecté 
    const StId =   localStorage.getItem('id'); 
          //appeler l'api du backend pour effectuer l'ajout d'une demande de stage
           axios.post(`api/ajouter-demande-stage/${StId}`,data ).then(res =>{
                if(res.data.status === 200){
                  Swal.fire("Succès" , res.data.message ,"success");
                  navigate('/quiz/test');
                  setError([]);
                  
                 }
              
                else if(res.data.status === 400){
                  setError(res.data.validation_errors);
                  Swal.fire("Erreur" , " Vous devez remplir tous les champs", "error");
           }
         
      
        });
     
      
      }
      

  return (
    <>







<div className="mx-auto form-container col-md-offset-3 col-md-8 ">
      
      <form  onSubmit={demandeSubmit}>
        
        
<div className="row">
{/* Le type de stage*/}
<div className="wrap-input100   col-lg-12 mb-4  " >
<select  name="typestage"  onChange={handleInput} value={userInput.typestage} className="input100 border-0 " type="text" >
<option  selected hidden>--Type de stage--</option>
    <option name="typestage" value="Pérfectionnement">Pérfectionnement</option>
    <option name="typestage" value="Observation">Observation</option>
    <option name="typestage" value="Initiation">Initiation</option>
 </select>
<span className="focus-input111" />
<span className="symbol-input111">
<i className="fas fa-user-graduate" aria-hidden="true" />
</span>
</div>



{/* Le nom du département*/}
<div className="wrap-input100   col-lg-12 mb-4  " >
<select name="nom_dept" onChange={handleInput} value={userInput.nom_dept} className="input100 border-0 " type="text" >
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
<i className=" fas fa-building"  aria-hidden="true" />
</span>
</div>




{/* cv */}
 <div className="wrap-input100   col-lg-12 mb-4  form-group " >   
<p className="text-center   text-secondary"> Déposer votre CV</p>
     
   <div className="frame">
      <div className="d-flex justify-content-center ">
       
          <div className="dropzone">
              <img src="http://100dayscss.com/codepen/upload.svg" className="upload-icon  " />
              <input type="file" name="cv"  onChange={handleFile}  className="upload-input " />
         </div>
     </div> 


  </div>
</div> 
       
 
   {/* Le bouton ajouter demande de stage */}
    <div className="container-login100-form-btn col-md-6 ">
          <button type="submit" className="login100-form-btn" >
          Envoyer
          </button>
        </div>

    {/* Le bouton annuler */}
        <div className="container-login100-form-btn col-md-6 ">
        <Link  to="/" className="login100-form-btn" style={{color: 'white'}}>Annuler</Link>
        </div>
 

 </div>

      </form>
   </div>

    </>
  )
}

export default PageAjouterDemandeStage

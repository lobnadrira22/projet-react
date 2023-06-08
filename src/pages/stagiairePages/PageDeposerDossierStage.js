import React , { useState} from 'react'
import { useNavigate ,Link , NavLink} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2';



function  PageDeposerDossierStage() {

  const Swal = require('sweetalert2');

    const navigate = useNavigate();

    const [ error , setError] =useState ([]);
  
    const [ dossierInput , setDossier] =useState ({});
   
   
 
     //les fichiers cin , convention de stage , cv , lettre d'affectation
  const [ filedata , setFiledata] = useState([]);

  const handleFile  = (e) =>{
    setFiledata({ cinfile:e.target.files[0] , convfile:e.target.files[1]  , cvfile:e.target.files[2]  ,lettfile:e.target.files[3] });
   }

   //En cliquant sur le bouton Ajouter un dossier, les données seront envoyées à la base de données
   const dossierSubmit = (e) => {
     e.preventDefault();
   
   
     const data = {
        
        cinfile:filedata.cinfile,
        convfile:filedata.convfile,
        cvfile:filedata.cvfile,
        lettfile:filedata.lettfile,
       }


      //appeler l'id du stagiaire connecté 
       const StId =   localStorage.getItem('id'); 
  
         //appeler l'api du backend pour effectuer le dépot d'un dossier
        axios.post(`api/ajouter-dossier-stage/${StId}`, data).then(res =>{
             if(res.data.status === 200){
              Swal.fire ("Succès" , res.data.message ,"success");

             }

          else if(res.data.status === 400){
           setError(res.data.validation_errors);
           
        }
      
   
     });
   } 
   


  return (
    <>
      
<section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h3>Ajouter le Dossier de stage</h3>

         



          </div>

          
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
          

<NavLink className={(ndata) => ndata.isActive && "active" }  to='/stagiaire/acceuil'>Acceuil</NavLink>  <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/stagiaire/deposer-dossier-stage'>Ajouter dossier</NavLink>

            </ol>
          </div>
        </div>
      </div>
    </section>


    <br/>
      <div className="col-md-offset-3 col-md-12">
        <div className="form-container">

<form onSubmit={dossierSubmit} >
  <div className="row">

 {/* Copie de CIN  */}  
<div className="wrap-input100   col-lg-3 mb-3  form-group " >   
<p className=" text-center text-secondary"> Déposer votre copie de CIN</p>
  <div className="frame">
  <div className="d-flex justify-content-center ">
         <div className="dropzone">
             <img src="http://100dayscss.com/codepen/upload.svg" className="upload-icon  " />
             <input type="file" name="cinfile"   onChange={handleFile}   className="upload-input " />
      </div>  
    </div> 

   
 </div>
</div>




{/* Convention de stage */}  
<div className="wrap-input100   col-lg-3 mb-3  form-group " >   
<p className=" text-center text-secondary"> Déposer votre convention de stage</p>
  <div className="frame">
  <div className="d-flex justify-content-center ">
         <div className="dropzone">
             <img src="http://100dayscss.com/codepen/upload.svg" className="upload-icon  " />
             <input type="file" name="convfile" onChange={handleFile}   className="upload-input " />
      </div>  
    </div> 

   
 </div>
</div>


{/* Cv */}  
<div className="wrap-input100   col-lg-3 mb-3  form-group " >   
<p className=" text-center text-secondary"> Déposer votre CV</p>
  <div className="frame">
  <div className="d-flex justify-content-center ">
         <div className="dropzone">
             <img src="http://100dayscss.com/codepen/upload.svg" className="upload-icon  " />
             <input type="file" name="cvfile"  onChange={handleFile}   className="upload-input " />
      </div>  
    </div> 

   
 </div>
</div>


{/* Lettre d'affectation */}  
<div className="wrap-input100   col-lg-3 mb-3  form-group " >   
<p className=" text-center text-secondary"> Déposer votre lettre d'affectation</p>
  <div className="frame">
  <div className="d-flex justify-content-center ">
         <div className="dropzone">
             <img src="http://100dayscss.com/codepen/upload.svg" className="upload-icon  " />
             <input type="file" name="lettfile"  onChange={handleFile}   className="upload-input " />
      </div>  
    </div> 

   
 </div>
</div>


    {/*  Le bouton annuler */}
    
    <div className="form-group col-lg-2 ">
   
          <button className="persb-btn">

           <Link to="/service-de-formation/afficher-departements"  style={{color: 'white'}}>
          Annuler
            </Link> 

          </button>
       
        </div>

       {/* Le bouton déposer dossier */}
        <div className="form-group col-lg-3  i">
          <button type="submit" className="login100-form-btn"  style={{color: 'white'}}>
            
          Ajouter Dossier
         
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

export default PageDeposerDossierStage

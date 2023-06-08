import React , { useState} from 'react'
import { useNavigate ,Link, NavLink ,useParams} from 'react-router-dom';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import axios from 'axios';
function PageDeposerTravail() {

  const Swal = require('sweetalert2');
  const navigate = useNavigate();

   // le champs description du travail
  const [ travailInput , setTravail] =useState ([]);
  const handleInput = (e) => {
    e.persist();
   
    setTravail({ ...travailInput , [e.target.name]: e.target.value})
  }

      
  //le fichier du travail
 const [ filedata , setFiledata] = useState([]);
  const handleFile  = (e) =>{
    setFiledata({ tfile:e.target.files[0]});
   }


     //En cliquant sur le bouton Ajouter un travail, les données seront envoyées à la base de données
   const travailSubmit = (e) => {
    e.preventDefault();
    
    const data = {
       tfile:filedata.tfile,
       description:travailInput.description,

      } 
       //appeler l'id du stagiaire connecté 
      const StId = localStorage.getItem('id');
      //appeler l'api du backend pour effectuer le dépot d'un travail 
    axios.post(`api/deposer-travail/${StId} `, data).then(res =>{
                  if(res.data.status === 200){
                    Swal.fire("Succès" , res.data.message ,"success");
                   navigate('/stagiaire/acceuil');
                  }
      
                 else if(res.data.status === 400){
                  Swal.fire("Erreur" , res.data.message ,"error");
   
                 }
           
        
      });


   }


  return (
    <>



<section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h3>Déposer Travail</h3>
          </div>

          
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
        
              <NavLink className={(ndata) => ndata.isActive && "active" }  to='/stagiaire/acceuil'>Acceuil</NavLink>  <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/stagiaire/deposer-travail'>Déposer Travail</NavLink>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <br/>


     <div className="col-md-offset-3 col-md-12">
        <div className="form-container"> 
    <form onSubmit={travailSubmit}>



<div className="wrap-input100   col-lg-12 mb-4  form-group " >   
<p className="text-center   text-secondary"> Déposer votre Travail</p>
  <div className="frame">
     <div className="d-flex justify-content-center ">
         <div className="dropzone">
             <img src="http://100dayscss.com/codepen/upload.svg" className="upload-icon  " />
             <input type="file" name="tfile"  onChange={handleFile}  className="upload-input " />
        </div>
    </div> 

   
 </div>
</div>

 {/*La description du travail*/}
 <div className="wrap-input100   col-lg-12 mb-4  form-group" >
          <textarea className="input100" type="text"  name="description"  onChange={handleInput}  value={travailInput.description} placeholder="Description"  style={{height: '80px'}}/>
          <span className="focus-input111" />
          <span className="symbol-input111">
          </span>
       
        </div>

        {/* Le bouton déposer travail */}
         <div className="form-group col-lg-2 ">
          <button type="submit" className="login100-form-btn">
          

            <Link to="#"  style={{color: 'white'}}>
            Déposer
            </Link> 
          </button>
          <br/><br/>
          </div>
 
 
    </form>
       </div>
    </div> 

    <br/><br/><br/>  <br/><br/><br/>  <br/><br/>
    </>
  )
}

export default PageDeposerTravail
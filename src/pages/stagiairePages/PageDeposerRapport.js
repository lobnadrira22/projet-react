import React , { useState} from 'react'
import { useNavigate ,Link, NavLink ,useParams} from 'react-router-dom';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import axios from 'axios';
function PageDeposerRapport() {

  const Swal = require('sweetalert2');
  const navigate = useNavigate();

 //le fichier rapport
 const [ filerapport, setFilerapport] = useState([]);

    const handleFile  = (e) =>{
      setFilerapport({ rfile:e.target.files[0]});
   }
 

     //En cliquant sur le bouton Ajouter un rapport, les données seront envoyées à la base de données
   const rapportSubmit = (e) => {
    e.preventDefault();
    
    const data = {
  // rfile:filedata.rfile,
       filerapport:filerapport.name,
      } 
     
    
            //appeler l'id du stagiaire connecté 
      const StId =   localStorage.getItem('id'); 
          //appeler l'api du backend pour effectuer le dépot d'un rapport
    axios.post(`api/deposer-rapport/${StId}`, data).then(res =>{
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
            <h3>Déposer Rapport</h3>
          </div>

          
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
        
              <NavLink className={(ndata) => ndata.isActive && "active" }  to='/stagiaire/acceuil'>Acceuil</NavLink>  <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/stagiaire/deposer-rapport'>Déposer Rapport</NavLink>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <br/>


     <div className="col-md-offset-3 col-md-12">
        <div className="form-container"> 
    <form onSubmit={rapportSubmit}>
   {/* Le rapport  */}     
 <div className="wrap-input100   col-lg-12 mb-4  form-group " >   
 <p className="text-center   text-secondary"> Déposer votre Rapport</p>
   <div className="frame">
      <div className="d-flex justify-content-center ">
          <div className="dropzone">
              <img src="http://100dayscss.com/codepen/upload.svg" className="upload-icon  " />
              <input type="file"   name="filerapport"  className="upload-input "  onChange={(e) => {setFilerapport(e.target.files[0]);}}/>
             
         </div>
     </div> 
     {/* Le bouton déposer rapport */}
     <div className="d-flex justify-content-center">
     <div className="form-group col-lg-2  "> 

          <button type="submit" className="login100-form-btn   ">
          

            <Link to="#"  style={{color: 'white'}}>
            Déposer
            </Link> 
          </button>
          
          </div>
    </div>

  </div>
</div>



 
    </form>
       </div>
    </div> 

    <br/><br/><br/>  <br/>
    </>
  )
}

export default PageDeposerRapport




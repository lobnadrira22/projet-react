import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate  ,useParams ,Link} from 'react-router-dom'; 
/* la page de profil selon le role de l'acteur :  utilisateur et page stagiaire 
                                                -coordinateur
                                                -responsable formation
                                                -encadrant
                                                -chef de département
*/
function TProfile() {




    const Swal = require('sweetalert2');
    const navigate = useNavigate();
  
    const params=useParams();
      const[loading,setLoading] = useState(true);
 
    const [userInput , setUserInput] =useState ([]);
  
      const [ error , setError] =useState ([]);
  
      




      //validation des données
      const [utiErremail,setUtiErremail]=useState(false);
      const [utiErrtelephone,setUtiErrtelephone]=useState(false);
      const [utiErrtel,setUtiErrtel]=useState();

     
  
  
      const handleInput = (e) => {
        e.persist();
       
        setUserInput({ ... userInput , [ e.target.name ]: e.target.value})

     
          //erreur e-mail
          if(!userInput.email.includes('@')){
            setUtiErremail(true)
           }
           else{
            setUtiErremail(false)
           }

           
   //erreur telephone
     
   if( !(userInput.numTel.match('[0-9]{7}'))  ||  !(userInput.telephone.match('[0-9]{7}'))) {  
    setUtiErrtelephone(true)
   }
   else{
    setUtiErrtelephone(false)
   }

          //erreur e-mail
       if(!userInput.email.includes('@')){
        setUtiErremail(true)
       }
       else{
        setUtiErremail(false)
       }
      }    
  

     useEffect(()=> {
        /*appeler l'api du backend pour consulter le profil 
        d'un utilisateur ou stagiaire selon le role de l'acteur connecté*/
        axios.get('api/profile').then(res=> {
             setUserInput(res.data.user.original)
          setLoading(false);
        });
    },[]);
  
  
   ////En cliquant sur le bouton modifier le profil utilisateur

      const updatProfile = (e) => {
        e.preventDefault();

        const data = userInput;
       
         //appeler l'api du backend pour effectuer la modification du profil utilisateur
        axios.put('api/modifier-profile' , data ).then(res=> {
          if(res.status ===200){
            Swal.fire("Succès" , res.data.message , "success ");
            window.location.reload(false);
            
          }
          else if(res.data.status === 422){
            setError(res.data.validation_errors);
            Swal.fire("Erreur dans les champs" , "Vérifier les champs!", "error");
     }
         
        }); 
   
       
  
      };




   ////En cliquant sur le bouton modifier le profil stagiaire
      const updatProfileStagiaire = (e) => {
        e.preventDefault();
        const data = userInput;
       
         //appeler l'api du backend pour effectuer la modification du profil satagiaire
        axios.put('api/modifier-profile-stagiaire' , data ).then(res=> {
          if(res.status ===200){
            Swal.fire("Succès" , res.data.message , "success");
            window.location.reload(false);
          }
          else if(res.data.status === 422){
            setError(res.data.validation_errors);
            Swal.fire("Erreur dans les champs" , " Vérifier les champs!", "error");
     }
     
         
        }); 
   
       
  
      };
    
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

  //si l'acteur connecté est un utilisateur     
      else if(userInput.role === 'encadrant' || userInput.role === 'chef_dept' ||userInput.role === 'service_formation'||userInput.role === 'coordinateur'  ){
  //afficher profil utilisateur
  return (
    <>
      
          
<section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h3>Profil</h3>

           

          </div>

          
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
          

            </ol>
          </div>
        </div>
      </div>
    </section>


    <br/>
      <div className="col-md-offset-3 col-md-9  mx-auto "  >
        <div className="form-container ">
   
<form  >
            <div className="float-left">
            </div>
            <h3 className="profile-username  mb-5 text-secondary "> {userInput.nom} {userInput.prenom}</h3>
           
            


           <div className="row">
               <div className="col-md-6">

           <ul className="list-group list-group-unbordered mb-3">
           <li >
              <p>  Nom et Prénom </p> <a className=" text-secondary">{userInput.nom} {userInput.prenom}</a>
              </li>
              <li>
                <p >Email</p> <a className=" text-secondary"> {userInput.email}</a>
              </li>
              <li >
                <p >Num Télephone</p> <a className=" text-secondary">{userInput.numTel}</a>
              </li>
           
           </ul>



               </div> 

               <div className="col-md-6">

               <ul className="list-group list-group-unbordered mb-3">
              <li>
                <p > Matricule</p> <a className="text-secondary">{userInput.matricule}</a>
              </li>
              <li>
                <p >Role</p> <a className="text-secondary">{userInput.role}</a>
              </li>

              <li>
                <p >Date naissance</p> <a className="text-secondary">{userInput.datenaissance}</a>
              </li>
        
            </ul>
                   
               </div>


           </div>
   

  {/* Le bouton modifier profil utilisateur */}
    

    <br/>
        <div className="form-group col-lg-3 ">
      
          <a href="#" className="login100-form-btn  "  data-toggle="modal" data-target="#exampleModal" style={{color: 'white'}}>Modifier</a>  
          Modifier
         
       </div>
  <br/>
    


</form>
   
        </div>
      </div>
      <br/><br/>












{/* Modifier profil utilisateur   */}
<div>


  {/* Modal */}
  <div className="modal fade col-md-12" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog  ">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Modifier Profil</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
        <div className="col-md-offset-3 col-md-12">

<form  onSubmit={updatProfile}  >
  <div className="row">


 
     {/* Le nom utilisateur */}
     <div className="wrap-input100   col-lg-6 mb-4" >
          <input className="input100" type="text"  placeholder="Nom" name="nom"   onChange={handleInput} value={userInput.nom} readOnly/>
          <span className="focus-input111" />
          <span className="symbol-input111">
        
          </span>
        
        </div>
             {/*Le prénom utilisateur */}
     <div className="wrap-input100   col-lg-6 mb-4" >
          <input className="input100" type="text" placeholder="Prénom"  name="prenom" onChange={handleInput} value={userInput.prenom} readOnly/>
          <span className="focus-input111" />
          <span className="symbol-input111">
         
          </span>
        
        </div>
             {/*L'email utilisateur */}
     <div className="wrap-input100   col-lg-12 mb-4" >
          <input className="input100" type="text"   placeholder="Email" name="email" onChange={handleInput} value={userInput.email}/>
       
      
          {utiErremail ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> email doit contenir symbol @ </span> :""}  

         
        
        </div>

       

        {/*Le telephone utilisateur */}
     <div className="wrap-input100   col-lg-6 mb-4" >
          <input className="input100" type="number" min="0"  placeholder="Num Télephone" name="numTel"   onChange={handleInput} value={userInput.numTel}  required />
          <span className="focus-input111" />
          <span className="symbol-input111">
        
         
          </span>
          {utiErrtelephone ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />le numéro de télephone doit contenir 8 chiffres </span> :""}  

        </div>
             {/*La date de naissance utilisateur */}
     <div className="wrap-input100   col-lg-6 mb-4" >
          <input className="input100" type="date"  placeholder="Date naissance"  name="datenaissance" onChange={handleInput} value={userInput.datenaissance} readOnly />
          <span className="focus-input111" />
          <span className="symbol-input111">
           
          </span>
        
        </div>

          {/*La matricule utilisateur */}
          <div className="wrap-input100   col-lg-6 mb-4" >
          <input className="input100" type="number" placeholder="Matricule" name="matricule"  onChange={handleInput} value={userInput.matricule} readOnly/>
          <span className="focus-input111" />
          <span className="symbol-input111">
            
          </span>
        
        </div>

     {/* Le role utilisateur */}
        <div className="wrap-input100   col-lg-6 mb-4 " >
<select name="role"   onChange={handleInput} value={userInput.role}   className="input100 border-0 " type="text" >
  
       <option   selected hidden>--Rôle--</option>
  
       <option  name="role"  value="coordinateur">coordinateur</option>
       <option  name="role"  value="encadrant">Encadrant</option>
        <option  name="role"  value="chef_dept">Chef département</option> 
        <option  name="role"   value="service_formation"> Responsable de formation</option>
 </select>
</div>
 



  

    {/* Le bouton  modifier profil utilisateur */}
        <div className="form-group col-lg-6">
          <button type="submit" className="login100-form-btn"  style={{color: 'white'}}>
            
          Modifier
         
          </button>
  </div>    
  
     </div>


</form>

      </div>




        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
        </div>
      </div>
    </div>
  </div>
</div>

{/* . Modifier profil utilisateur   */}

    </>
  )
      }





      //si l'acteur connecté est un stagiare
      else{
      //afficher profil satagiaire
        return (
          <>
            
                
      <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h3>Profil</h3>
      
                 
      
                </div>
      
                
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                
      
                  </ol>
                </div>
              </div>
            </div>
          </section>
      
      
          <br/>
            <div className="col-md-offset-3 col-md-9  mx-auto "  >
              <div className="form-container ">
         
      <form  >
                  <div className="float-left">
                  </div>
                  <h3 className="profile-username  mb-5 text-secondary "> {userInput.name} {userInput.prenom}</h3>
                 
                  
      
      
                 <div className="row">
                     <div className="col-md-6">
      
                 <ul className="list-group list-group-unbordered mb-3">
                 <li >
                    <p>  Email</p> <a className=" text-secondary">{userInput.email}</a>
                    </li>
                    <li>
                      <p >Num Cin/Passport</p> <a className=" text-secondary"> {userInput.cinoupassport_stagiaire}</a>
                    </li>
                    <li >
                      <p >Date naissance</p> <a className=" text-secondary">{userInput.datenaissance}</a>
                    </li>
                 
                    <li>
                      <p > Num Télephone</p> <a className="text-secondary">{userInput.telephone}</a>
                    </li>
                 </ul>
      
      
      
                     </div> 
      
                     <div className="col-md-6">
      
                     <ul className="list-group list-group-unbordered mb-3">
                   
                    <li>
                      <p >Adresse</p> <a className="text-secondary">{userInput.adresse}</a>
                    </li>
      
                    <li>
                      <p >Niveau d'étude</p> <a className="text-secondary">{userInput.niveauetude}</a>
                    </li>

                    <li>
                      <p >Spécialité</p> <a className="text-secondary">{userInput.specialite}</a>
                    </li>

                    <li>
                      <p >Filiére</p> <a className="text-secondary">{userInput.filiere}</a>
                    </li>
              
                  </ul>
                         
                     </div>
      
      
                 </div>
         
       {/* Le bouton modifier profil stagiaire */}
          
      
          <br/>
              <div className="form-group col-lg-3 ">
            
                <a href="#" className="login100-form-btn  "  data-toggle="modal" data-target="#exampleModal" style={{color: 'white'}}>Modifier</a>  
                Modifier
               
             </div>
        <br/>
          
      
      
      </form>
         
              </div>
            </div>
            <br/><br/>
      
  
      
      
      {/* Modifier profil stagaire  */}
      <div>
      
      
        {/* Modal */}
        <div className="modal fade col-md-12" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog  ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modifier Profil</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
      
   
      
              <div className="col-md-offset-3 col-md-12">
  
      <form onSubmit={updatProfileStagiaire }  >
        <div className="row">
      
      
      
      
       
           {/* Le nom stagiaire */}
           <div className="wrap-input100   col-lg-6 mb-4" >
                <input className="input100" type="text"  placeholder="Nom" name="name"   onChange={handleInput} value={userInput.name} readOnly/>
                <span className="focus-input111" />
                <span className="symbol-input111">
              
                </span>
              
              </div>
                   {/* Le prénom stagiaire */}
           <div className="wrap-input100   col-lg-6 mb-4" >
                <input className="input100" type="text" placeholder="Prénom"  name="prenom" onChange={handleInput} value={userInput.prenom} readOnly />
                <span className="focus-input111" />
                <span className="symbol-input111">
               
                </span>
              
              </div>
                   {/* L'email stagiaire */}
           <div className="wrap-input100   col-lg-12 mb-4" >
                <input className="input100" type="text"   placeholder="Email" name="email" onChange={handleInput} value={userInput.email}/>
                {utiErremail ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> email doit contenir symbol @ </span> :""}  

              </div>
      
              {/* La telephone stagiaire */}
           <div className="wrap-input100   col-lg-6 mb-4" >
                <input className="input100" type="number" min="0"  placeholder="Num Télephone" name="telephone"   onChange={handleInput} value={userInput.telephone}  required/>
               <span className="focus-input111" />
                <span className="symbol-input111"> 
               
                </span> 
                 {utiErrtel? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />le numéro de télephone doit contenir 8 chiffres </span> :""}  

              </div>
                   {/* La date de naissance */}
           <div className="wrap-input100   col-lg-6 mb-4" >
                <input className="input100" type="date"  placeholder="Date naissance"  name="datenaissance" onChange={handleInput} value={userInput.datenaissance} readOnly />
                <span className="focus-input111" />
                <span className="symbol-input111">
                 
                </span>
              
              </div>
      
                {/* L'adresse stagiaire */}
                <div className="wrap-input100   col-lg-12 mb-4" >
                <input className="input100" type="text" placeholder="Adresse" name="adresse"  onChange={handleInput} value={userInput.adresse}  required />
                <span className="focus-input111" />
                <span className="symbol-input111">
                  
                </span>
              
              </div>

                {/* Le niveau d'étude stagiaire */}
                <div className="wrap-input100   col-lg-12 mb-4" >
                <input className="input100" type="text" placeholder="Niveau d'étude" name="niveauetude"  onChange={handleInput} value={userInput.niveauetude}  required/>
                <span className="focus-input111" />
                <span className="symbol-input111">
                  
                </span>
              
              </div>
                {/*La spécialite stagiare */}
                <div className="wrap-input100   col-lg-12 mb-4" >
                <input className="input100" type="text" placeholder="Spécialite" name="specialite"  onChange={handleInput} value={userInput.specialite}  required/>
                <span className="focus-input111" />
                <span className="symbol-input111">
                  
                </span>
              
              </div>

                   {/*La filiére stagiaire */}
                   <div className="wrap-input100   col-lg-12 mb-4" >
                <input className="input100" type="text" placeholder="Filiére" name="filiere"  onChange={handleInput} value={userInput.filiere} required/>
                <span className="focus-input111" />
                <span className="symbol-input111">
                  
                </span>
              
              </div>
      

      
             {/* Le bouton modifier profil stagiaire */}
              <div className="form-group col-lg-6">
                <button type="submit" className="login100-form-btn"  style={{color: 'white'}}>
                  
                Modifier
               
                </button>
        </div>    
        
           </div>
      
      
      </form>

            </div>
      
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
         
              </div>
            </div>
          </div>
        </div>
      </div>
      
  {/*. Modifier profil stagaire  */}
      
          </>
        )
            }
}

export default TProfile

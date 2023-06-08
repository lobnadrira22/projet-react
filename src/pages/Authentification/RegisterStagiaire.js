

import React , { useState} from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2';


function RegisterStagiaire() {
  const Swal = require('sweetalert2');

const [etatcheckbox,setEtatcheckbox]= useState([]);


//checkbox pour choisir d'entrer le numéro de Cin ou Passport
const handleCheckbox = (e) => {
  e.preventDefault();
  
    setEtatcheckbox({ ...etatcheckbox,[e.target.name]:e.target.checked});
  
    console.log("Vous étes", etatcheckbox.etat);
  
 
}

    const navigate = useNavigate();

    //validation erreurs

    const [stgErrnom,setStgErrnom]=useState(false);
    const [stgErrprenom,setStgErrprenom]=useState(false);
    const [stgErremail,setStgErremail]=useState(false);
    const [stgErrcin,setStgErrcin]=useState(false);
    const [stgErrtelephone,setStgErrtelephone]=useState(false);
    const [stgErrmtpasse,setStgErrmtpasse]=useState(false);
    const [stgErrconfmtpasse,setStgErrconfmtpasse]=useState(false);
    const [stgErrstrn,setStgErrstrn]=useState(false);
    const [stgErrstrp,setStgErrstrp]=useState(false);

    const [ error , setError] =useState ([]);
      //Inscription
     const [ registerInput , setRegister] =useState ({
       name: '',
       prenom: '',
       datenaissance:'',
       email: '',
       cinoupassport_stagiaire:'', 
       niveauetude:'', 
       specialite:'',
       filiere:'',
       adresse:'',
       telephone:'',
       password:'',
       password_confirmation:'',
       error_list :[],
      
     
    
     });
  
   
  
  
  
  
  
  
    const handleInput = (e) => {
       e.persist();
       setRegister({ ... registerInput , [e.target.name]: e.target.value})

      //erreur nom 
  
       if(registerInput.name.length < 2 || registerInput.name.length >20){
        setStgErrnom(true)
       }
       else{
        setStgErrnom(false)
       }
       
      //erreur prénom
       if(registerInput.prenom.length < 2  || registerInput.prenom.length >20){
        setStgErrprenom(true)
       }
       else{
        setStgErrprenom(false)
       }
  
       //erreur e-mail
       if(!registerInput.email.includes('@')){
        setStgErremail(true)
       }
       else{
        setStgErremail(false)
       }

  
       //erreur telephone
     
       if( !(registerInput.telephone.match('[0-9]{7}' )) ) {  
        setStgErrtelephone(true)
       }
       else{
        setStgErrtelephone(false)
       }
  
        //erreur mot de passe 
        if(registerInput.password.length <4  ){
          setStgErrmtpasse(true)
         }
         else{
          setStgErrmtpasse(false)
         }
  
          //erreur confirmation  mot de passe !!!!!
        if(registerInput.password_confirmation === registerInput.password){
          setStgErrconfmtpasse(false)
         }
         else{
          setStgErrconfmtpasse(true)
         }
  
  
  
  
      
            //le nom doit etre string 
       if( !(registerInput.name.match('[a-z-A-Z]')) ) {  
        setStgErrstrn(true)
       }
       else{
        setStgErrstrn(false)
       }

       
          if( !(registerInput.prenom.match('[a-z-A-Z]')) ) {  
            setStgErrstrp(true)
           }
           else{
            setStgErrstrp(false)
           }
      
  
  
  
  
       
    }
  
  
  
  
  
  
  //En cliquant sur le bouton s'inscrire, les données seront envoyées à la base de données
    const registerSubmit = (e) => {
      e.preventDefault();
  
      const data = {
        name:registerInput.name,
        prenom:registerInput.prenom,
        datenaissance:registerInput.datenaissance,
        email:registerInput.email,
        cinoupassport_stagiaire:registerInput.cinoupassport_stagiaire,
        niveauetude:registerInput.niveauetude,
        specialite:registerInput.specialite,
        filiere:registerInput.filiere,
        adresse:registerInput.adresse,
        telephone:registerInput.telephone,
        password:registerInput.password,
        password_confirmation:registerInput.password_confirmation,
  
        }
  
      
  
       //token == sécurité
      axios.get('/sanctum/csrf-cookie').then(response => {
          //appeler l'api du backend pour effectuer l'inscription d'un stagiaire 
         axios.post('api/register-stagiaire', data).then(res =>{
              if(res.data.status === 200){
                //mettre les informations d'un stagiaire connecté dans localStorage
                  localStorage.setItem('auth_token' , res.data.access_token);
                  localStorage.setItem('auth_name' , res.data.name);
            
              if( res.data.password === res.data.password_confirmation){
              
                Swal.fire("Succès" , res.data.message , "success");
         
                     navigate('/login-stagiaire');
                    
                  }

    }



              else if(res.data.status === 422){
                setError(res.data.validation_errors); 
               
               if(res.data.validation_errors.email){
                  Swal.fire("Erreur dans les champs" , "Email erroné ou Email déjà existe!!", "error");
                }
               else  if(res.data.validation_errors.cinoupassport_stagiaire){
                    Swal.fire("Erreur dans les champs" , " Num Cin ou Passeport erroné ou Num Cin ou Passeport déjà existe!!", "error");
                }
              else{
                Swal.fire("Erreur dans les champs" , "Vérifier les champs!", "error");
                 }
              }

      });
    });
    
  }
  
  

  // le champ num Passport
  var afficher_champ="";
  if(etatcheckbox.etat){
  afficher_champ =
   
           <>
            <div className="wrap-input100 validate-input" >
            <input className="input100" type="number" min="0"   name="cinoupassport_stagiaire" onChange={handleInput} value={registerInput.cinoupassport_stagiaire} placeholder="Num Passport" required/>
            <span className="focus-input100" />
            <span className="symbol-input100">
              <i className="fas fa-atlas"  aria-hidden="true" />
            </span>
          </div>
       
           
           </>
        
             
          
  }else {
    //le champ num Cin
   afficher_champ =
    <>
   
    <div className="wrap-input100 validate-input">
    <input className="input100" type="number"  min="0"  name="cinoupassport_stagiaire" onChange={handleInput} value={registerInput.cinoupassport_stagiaire} placeholder="Num Cin" required/>
    <span className="focus-input100" />
    <span className="symbol-input100">
      <i className=" fas fa-address-card"  aria-hidden="true" />
    </span>
   
  </div>
  {error.cinoupassport_stagiaire? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />Cin Déjà existe!</span> :""}  

 
  </>
  }







  return (
    <>

    <div className="wrap-login101 border ">
     <form onSubmit={registerSubmit}>
        
  <div className="row"> 
 
<div className="col-lg-6">
 
        <img src="../../dist/img/topnetStage.png"  className="brand-image img-circle col-lg-11"/>

         {/* Le nom stagiaire */}
        <div className="wrap-input100 validate-input" >
          <input className="input100" type="text" name="name"  onChange={handleInput} value={registerInput.name}  placeholder="Nom" required />
            
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fas fa-user" aria-hidden="true" />
          </span>
        </div>

  {stgErrstrn ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> nom est chaine de caractéres! <br/></span> :""}  
  {stgErrnom ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> nom entre 3 et 20 caractéres!</span> :""}  

  
  
       
          {/* Le prénom stagiaire */}
        <div className="wrap-input100 validate-input" >
          <input className="input100" type="text" name="prenom" onChange={handleInput} value={registerInput.prenom} placeholder="Prénom" required/>
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fas fa-user" aria-hidden="true" />
          </span>
        </div>
      
        {stgErrstrp ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> prénom est chaine de caractéres! <br/></span> :""}  
        {stgErrprenom ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />prénom entre 3 et 20 caractéres!</span> :""}  
        
        {/* L'email stagiaire */}
        <div className="wrap-input100 validate-input" >
          <input className="input100" type="text" name="email" onChange={handleInput} value={registerInput.email}  placeholder="Email" />
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fa fa-envelope" aria-hidden="true" />
          </span>
        </div>
       {stgErremail ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> email doit contenir symbol @ </span> :""}  

       {/* La date de naissance */}
        <div className="wrap-input100 validate-input" >
          <input className="input100" type="date" name="datenaissance" onChange={handleInput} value={registerInput.datenaissance} placeholder="Date de naissance" required />
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fas fa-calendar"  aria-hidden="true" />
          </span>
        </div>
      
   
   {/* Le numéro de Cin ou Passport  */}
   <div className="form-group form-check">
    <input type="checkbox"  name="etat" onChange={ handleCheckbox} defaultChecked={etatcheckbox.etat}   class="form-check-input" id="exampleCheck1" />
    <label className="form-check-label text-secondary" for="exampleCheck1">je suis un étranger</label>
  </div>


      {afficher_champ} 


</div> <div className="col-lg-6">
<br/> <br/><br/>


        {/* Le niveau d'étude stagiaire */}
       <div className="wrap-input100   " >
                        <select name="niveauetude"     onChange={handleInput} value={registerInput.niveauetude}  className="input100 border-0 "  required>
                          <option selected hidden>--Niveau d'étude--</option>
                          <option name="niveauetude" value="Bac">Bac</option>
                          <option name="niveauetude" value="BTS">BTS</option>
                          <option name="niveauetude" value="Licence">Licence</option>
                          <option name="niveauetude" value="Master">Master</option>
                          <option name="niveauetude" value="Ingénieur">cycle ingénieur</option>
                        </select>
                        <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fas fa-user-graduate" aria-hidden="true" />
          </span>
                      </div>

        
         {/*La spécialite stagiare */}
        <div className="wrap-input100 validate-input" >
          <input className="input100" type="text" name="specialite"onChange={handleInput} value={registerInput.specialite}  placeholder="Spécialité" required />
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className=" fas fa-book-reader" aria-hidden="true" />
          </span>
        </div>
       
            {/*La filiére stagiaire */}
        <div className="wrap-input100 validate-input" >
          <input className="input100" type="text" name="filiere" onChange={handleInput} value={registerInput.filiere} placeholder="Filiére" required/>
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className=" fas fa-book-open" aria-hidden="true" />
          </span>
        </div>
      

        {/* L'adresse stagiaire */}
        <div className="wrap-input100 validate-input" >
          <input className="input100" type="text" name="adresse" onChange={handleInput} value={registerInput.adresse} placeholder="Adresse" required/>
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="  fas fa-map-marked-alt" aria-hidden="true" />
          </span>
        </div>
     
      
      {/* La telephone stagiaire */}
        <div className="wrap-input100 validate-input" >
          <input className="input100" type="number" min="0"  
          name="telephone" onChange={handleInput} value={registerInput.telephone}
           placeholder="Télephone" required/>
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="  fas fa-phone-alt" aria-hidden="true" />
          </span>
        </div>

        {stgErrtelephone ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />le numéro de télephone doit contenir 8 chiffres </span> :""}  

         

        {/* Mot de passe */}
        <div className="wrap-input100 validate-input" >
          <input className="input100" type="password" name="password" onChange={handleInput} value={registerInput.password}  placeholder="Mot de passe" required/>
         
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fa fa-lock" aria-hidden="true" />
          </span>
        </div>
       {stgErrmtpasse? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />le mot de passe doit contenir au minimum  5 caractères </span> :""}  

         
        
   

      
       {/* Confirmation mot de passe */}
        <div className="wrap-input100 validate-input" >
          <input className="input100" type="password" name="password_confirmation"  onChange={handleInput} value={registerInput.password_confirmation} placeholder="Confirmer Mot de passe" required />
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fa fa-lock" aria-hidden="true" />
          </span>
       </div>  
       {stgErrconfmtpasse? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> vous devez Confirmer le mot de passe</span> :""}  

 
        
    {/* Le bouton s'inscrire*/}
 <div className="container-login100-form-btn ">
          <button type="submit" className="login100-form-btn">
            
            S'inscrire
         
          </button>
          <br/> <br/>
          <div className="text-center p-t-136 ">
             {/* Le lien connecter */}
          <Link to="/login-stagiaire" className="text-decoration-none" >  j'ai déjà un compte , connecter</Link>  
          </div>
   </div>

        
        </div>



   

 
 
   </div>     
 
 
    
      </form>
    </div>

    </>
  )
}

export default RegisterStagiaire
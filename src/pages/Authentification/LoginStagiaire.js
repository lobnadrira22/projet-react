import React , { useState} from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';

function LoginStagiaire() {

  const Swal = require('sweetalert2');


    const navigate = useNavigate();


    //validation des données
    const [stgErremail,setStgErremail]=useState(false);
    const [stgErrmtpasse,setStgErrmtpasse]=useState(false);

    
 
    //Connexion

    const [ loginInput , setLogin] =useState ({
     
     email: '',
     password:'',
     error_list:[],
   
  
   });
   const handleInput = (e) => {
     e.persist();
     setLogin({ ... loginInput , [e.target.name]: e.target.value})


       //erreur e-mail
       if(!loginInput.email.includes('@')){
        setStgErremail(true)
       }
       else{
        setStgErremail(false)
       }
  
        //erreur mot de passe 
        if(loginInput.password.length <4  ){
          setStgErrmtpasse(true)
         }
         else{
          setStgErrmtpasse(false)
         }
  
 
 
     
  }
 
 //En cliquant sur le bouton connecter, les données seront envoyées à la base de données
  const loginSubmit = (e) => {
    e.preventDefault();
 
 
    const data = {
     
      email:loginInput.email,
      password:loginInput.password,
      
    }
 
    //token == sécurité
    axios.get('/sanctum/csrf-cookie').then(response => {
      //appeler l'api du backend pour effectuer la connexion à la plateforme
       axios.post( 'api/login-stagiaire', data).then(res =>{   
            if(res.data.status === 200){
             //mettre les informations d'un stagiaire connecté dans localStorage
                localStorage.setItem('id' , res.data.id);
                localStorage.setItem('auth_token' , res.data.access_token);
                localStorage.setItem('auth_name' , res.data.username);  
                localStorage.setItem('role' , 'stagiaire');
                localStorage.setItem('etatSt' , res.data.etatSt );  
                localStorage.setItem('niveauetude' , res.data.niveauetude ); 
                localStorage.setItem('dossiervalideSt' , res.data.dossiervalideSt);
                Swal.fire("Succès" , res.data.message , "success");
              
                /* si l'état de stagiaire "etudiant", le système redirige le stagiaire vers le landing page
                pour pouvoir consulter la liste des sujets et passer une demande de stage */
                if(localStorage.getItem('etatSt' ) == 'etudiant'){
                 window.location.href="/" 
                  navigate('/');
                }
             // si l'état de stagiaire "stagiaire_accepte_p", le système redirige le stagiaire vers son espace
                if(localStorage.getItem('etatSt' ) == 'stagiaire_accepte_p'){
                  navigate('/stagiaire/acceuil');
                }
              
 
 
            }
           
            else if(res.data.status === 401){
              Swal.fire(" " , res.data.message , "warning");
            
            } 
          
       
 
    });
  });
  
   }



  return (
    <>

        <div className="wrap-login102">
      <form onSubmit={loginSubmit}>
        {/* L'email */}
        <div className="wrap-input100 " >
          <input className="input100" type="text"  name="email"  onChange={handleInput} value={loginInput.email}  placeholder="Email" />
         
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fa fa-envelope" aria-hidden="true" />
          </span>
        </div>
        {stgErremail ? <span className='text-warning txt00 '><i className="far fa-times-circle" aria-hidden="true" /> email doit contenir symbol @ </span> :""}  

        
         {/* Le mot de passe */}
        <div className="wrap-input100 " >
          <input className="input100" type="password" name="password"  onChange={handleInput} value={loginInput.password}  placeholder="Password" />
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fa fa-lock" aria-hidden="true" />
          </span>
        </div>
        {stgErrmtpasse ? <span className='text-warning txt00 '><i className="far fa-times-circle" aria-hidden="true" />le mot de passe doit contenir au minimum  5 caractères </span> :""}  

        {/* Le bouton  connecter*/}
        <div className="container-login100-form-btn ">
          <button type="submit" className="login100-form-btn"   >
            
          Connecter
         
          </button>
        </div>
        <br/>


<div className="text-center p-t-136">
   {/* Le lien s'inscrire */}
<Link to="/register-stagiaire" className="text-decoration-none"> S'inscrire</Link>  
</div>

      </form>
    </div>

    </>
  )
}

export default LoginStagiaire

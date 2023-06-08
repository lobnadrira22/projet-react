import React , { useState} from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

function Login() {

  const Swal = require('sweetalert2');
  const navigate = useNavigate();

  //validation des données
   const [utiErremail,setUtiErremail]=useState(false);
   const [utiErrmtpasse,setUtiErrmtpasse]=useState(false);

   //calculer le nombre d'essai d'authentification 
   const [count, setCount] = useState(0);
   const incrementCount = () => {
    setCount(count + 1);
    console.log(count)
  };


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
        setUtiErremail(true)
       }
       else{
        setUtiErremail(false)
       }
  
        //erreur mot de passe 
        if(loginInput.password.length <4  ){
          setUtiErrmtpasse(true)
         }
         else{
          setUtiErrmtpasse(false)
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
      axios.post('api/login', data).then(res =>{
           if(res.data.status === 200){

         //mettre les informations d'un utilisateur connecté dans localStorage
              localStorage.setItem('auth_token' , res.data.access_token);
               localStorage.setItem('auth_name' , res.data.username);
               localStorage.setItem('auth_lastname' , res.data.lastname);
           
               localStorage.setItem('role' , res.data.role);
               localStorage.setItem('premlog' , res.data.premlog);
              
               Swal.fire ("Succès" , res.data.message , "success");
            

              //L'état de la première connexion 
              //si l'état de la première connexion est "oui", le système redirige l'utilisateur vers la page de forgot password pour réinitialiser le mot de passe
              if(res.data.premlog == 'oui'){
                navigate('/U-forgot');
              }
              else if(res.data.role === 'encadrant' && res.data.premlog == 'non'){
                navigate('/encadrant/acceuil');
          
              }
              else if(res.data.role === 'chef_dept' && res.data.premlog == 'non'){
                navigate('/chef-departement/acceuil');
              
              }
              else if(res.data.role === 'service_formation' && res.data.premlog == 'non'){
                navigate('/service-de-formation/acceuil' );
               
              }
            
              else if(res.data.role === 'coordinateur'&& res.data.premlog == 'non'){
                navigate('/coordinateur/acceuil');
               
              }

            
             } 
          
          //si le nombre d'essai de connexion dépasse les 3 fois d'essai, le système redirige l'utilisateur vers la page forgot password
           else if(res.data.status === 401){
            Swal.fire ("" , res.data.message , "warning");
            if( count>3){
                Swal.fire ("" , "réinitialiser votre mot de passe", "warning");
                 navigate('/U-forgot');
            }

          }
         


          else if(res.data.status === 402){
            Swal.fire ("" , res.data.message , "error");
          } 
 
   });
 });
 
  }

  return (
    <>

        <div className="wrap-login102">
      <form onSubmit={loginSubmit}>
        

        {/* L'email */}
        <div className="wrap-input100 ">
          <input className="input100" type="text"  name="email"  onChange={handleInput} value=  {loginInput.email}  placeholder="Email" />
         
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fa fa-envelope" aria-hidden="true" />
    
          </span>
        </div>
        {utiErremail ? <span className='text-warning txt00 '><i className="far fa-times-circle" aria-hidden="true" /> email doit contenir symbol @ </span> :""}  

        
          {/* Le mot de passe */}
        <div className="wrap-input100 validate-input" data-validate="Password is required">
          <input className="input100" type="password" name="password"  onChange={handleInput} value={loginInput.password}  placeholder="Password" />
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fa fa-lock" aria-hidden="true" />
          </span>
        </div>
        {utiErrmtpasse ? <span className='text-warning txt00 '><i className="far fa-times-circle" aria-hidden="true" />le mot de passe doit contenir au minimum  5 caractères </span> :""}  



         {/* Le bouton  connecter*/}
        <div className="container-login100-form-btn ">
          <button type="submit" className="login100-form-btn" onClick={incrementCount} >
            
          Connecter
         
          </button>
        </div>

 
        <br/>
         {/* Le lien oublier le mot de passe */}
        <div className="text-center p-t-136">
        <Link to="/U-forgot"  className="text-decoration-none">  Oublier le mot de passe ?</Link>  
        </div>



      </form>
    </div>

    </>
  )
}

export default Login

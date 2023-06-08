import React , { useEffect, useState } from 'react'
import { useNavigate ,Link , NavLink ,useParams} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2';


function UResetPassword (){
  
  const Swal = require('sweetalert2');

  
   //validation erreurs
   const [utiErremail,setUtiErremail]=useState(false);
   const [utiErrmtpasse,setUtiErrmtpasse]=useState(false);
   const [ error , setError] =useState ([]);

  const params=useParams();
  const [ passInput , setPass] =useState ([]);

  const handleInput = (e) => {
    e.persist();
   
    setPass({ ... passInput , [e.target.name]: e.target.value})

       //erreur e-mail
       if(!passInput.email.includes('@')){
        setUtiErremail(true)
       }
       else{
        setUtiErremail(false)
       }
  
        //erreur mot de passe 
        if(passInput.password.length <4  ){
          setUtiErrmtpasse(true)
         }
         else{
          setUtiErrmtpasse(false)
         }
  
  } 
  

  
  //En cliquant sur le bouton réinitialiser mot de passe , les données seront envoyées à la base de données
 const resetPass = (e) => {
  e.preventDefault();

  

  const data = {
    token:params.token,
    email:passInput.email,
    password:passInput.password,
    password_confirmation:passInput.password_confirmation
  };

  //appeler l'api du backend pour effectuer la réinitialisation de mot de passe
  axios.post(`api/u-reset-password`,data).then( res => {
    if(res.data.status === 200){
      Swal.fire ("Succès" , res.data.message , "success");
     localStorage.setItem('premlog' , res.data.premlog);
      setError([]);

    }
    else if(res.data.status === 422){
      Swal.fire ("Attention" , res.data.message , "warning");
  
       setError(res.data.validation_errors);

    }
    else if(res.data.status === 500){
           setError(res.data.validation_errors);
           Swal.fire ("Erreur " , res.data.message, "error");
    }
   
  });

}

  return (
    <>

<div className="wrap-login102">
<form onSubmit={resetPass} className="login100-form validate-form" >
{/* L'email utilisateur */}
<div className="wrap-input100 validate-input" >
  <input className="input100" type="type" name="email" onChange={handleInput} value={passInput.email}  placeholder="votre email" />
  <span className="focus-input100" />
  <span className="symbol-input100">
    <i className="fa fa-envelope" aria-hidden="true" />
  </span>
</div>

{utiErremail ? <span className='text-warning txt00 '><i className="far fa-times-circle" aria-hidden="true" /> email doit contenir symbol @ </span> :""}  

{/* Mot de passe utilisateur */}     
<div className="wrap-input100 validate-input" >
  <input className="input100" type="password" name="password" onChange={handleInput} value={passInput.password}  placeholder="nouveau mot de passe" />
  <span className="focus-input100" />
  <span className="symbol-input100">
    <i className="fa fa-lock" aria-hidden="true" />
  </span>
</div>
{utiErrmtpasse ? <span className='text-warning txt00 '><i className="far fa-times-circle" aria-hidden="true" />le mot de passe doit contenir au minimum  5 caractères </span> :""}  



{/* Confirmation de mot de passe utilisateur */} 
<div className="wrap-input100 validate-input" >
  <input className="input100" type="password"  name="password_confirmation" onChange={handleInput} value={passInput.password_confirmation}  placeholder="confirmer nouveau mot de passe"  />
  <span className="focus-input100" />
  <span className="symbol-input100">
    <i className="fa fa-lock" aria-hidden="true" />
  </span>
</div>

{error.password? <span className='text-warning txt00 '><i className="far fa-times-circle" aria-hidden="true" /> vous devez Confirmer le mot de passe</span> :""}  



 {/* Le bouton changer Mot de passe   */}
<div className="container-login100-form-btn">
  <button type="submit" className="login100-form-btn">

   Changer Mot de passe 
   
  </button>
</div>


</form>
    </div>

    </>
  )
}

export default UResetPassword

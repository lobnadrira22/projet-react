import React, { Component }  from 'react'
import { Link  } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2';


class UForgotPassword extends Component{


 

 
  state= {  }
  //validation erreurs

  // utiErremail:false,
  // error:[],
 


/* 
  handleInput = (e) => {
    e.persist();



    
       //erreur e-mail
       if(!this.email.includes('@')){
         this.state.utiErremail =true;
         return this.state.utiErremail;

       }
       else{
        this.state.utiErremail =false;
        return this.state.utiErremail;
       }

 }
 */

  handleSubmit = (e) => {
    const Swal = require('sweetalert2');
    e.preventDefault();

    const data = {
      email:this.email
    };
     //appeler l'api du backend pour effectuer envoyer un email pour réinitialiser le mot de passe
    axios.post('api/u-forgot-password',data).then(res =>{
    if(res.status ===200){
      Swal.fire("" , res.data.message, "");
      this.state.error=[];
    }
    else if(res.status === 404) {
      Swal.fire("" ,  res.data.message, "");
    }
    else if(res.status === 422) {
      this.state.error= [res.data.validation_errors];
      Swal.fire("Attention" ,  res.data.message, "warning");
    }
    }
    )
  };

  render() {
    

    

  return (
    <>

        <div className="wrap-login102">
      <form  className="login100-form validate-form"  onSubmit={this.handleSubmit}>
     
        {/* L'email utilisateur */}
        <div className="wrap-input100 ">
          <input className="input100" type="text" name="email" placeholder="Email" onChange={ (e) =>this.email = e.target.value} />
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fa fa-envelope" aria-hidden="true" />
          </span>
       
        </div>
   {/* {this.state.utiErremail ? <span className='text-warning txt00 '><i className="far fa-times-circle" aria-hidden="true" /> email doit contenir symbol @ </span> :" "}   */}


          {/* Le bouton  envoyer*/}
        <div className="container-login100-form-btn">
          <button type="submit" className="login100-form-btn">

           Envoyer 
           
          </button>
        </div>

        <br/>
        <div className="text-center p-t-136">
           {/* Le lien connecter*/}
        <Link to="/login" className="text-decoration-none" >Connecter</Link>  
        </div>
      </form>
    </div>
    
</>
    )
  }
}
export default UForgotPassword
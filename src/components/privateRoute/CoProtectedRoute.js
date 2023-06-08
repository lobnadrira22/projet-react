import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate ,Navigate, Outlet} from "react-router-dom";
import swal from 'sweetalert';
import Swal from 'sweetalert2';

//Protéger les routes de coordinateur
    function CoProtectedRoute () {
        const Swal = require('sweetalert2');
	const navigate = useNavigate();
      
        
        const [Authentificated , setAuthentificated] = useState(false);
        const [loading , setloading] = useState(true);

        useEffect(()=> {
               //appeler l'api du backend pour vérifier  la connexion à la plateforme
            axios.get( `/api/checkingAuthenticated`).then(res => {
                if(res.status ===  200)
                {
                    setAuthentificated(true);
                }
                setloading(false);
            });
            return() =>{
                    setAuthentificated(false)
            };
        } , []);
        

        axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
            if(err.response.status ===  401 )
            {
                Swal.fire("Non autorisé!" ,"vous n'êtes pas autorisé" ,"warning");//err.response.data.message 
                navigate('/login');
            }
            return Promise.reject(err);
        }     
        
        
        );
       


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

      if(Authentificated && localStorage.getItem('role')=='coordinateur'){
            return <Outlet/>  
      }else if(Authentificated && (localStorage.getItem('role')=='chef_dept' ||localStorage.getItem('role')=='service_formation'|| localStorage.getItem('role')=='stagiaire' || localStorage.getItem('role')=='encadrant')){
        Swal.fire("Interdit!" ,"vous n'êtes pasencadrant" ,"warning"); //error.response.data.message
        return <Navigate to ="/Page403"/>
      }else{
        Swal.fire("Non autorisé!" , "vous n'êtes pas autorisé","warning");
        return <Navigate to ="/login"/>
      }
   
   


     

        }
export default CoProtectedRoute
 
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate ,Navigate, Outlet} from "react-router-dom";
import swal from 'sweetalert';
import Swal from 'sweetalert2';


//Protéger les routes de responsable de formation

    function SProtectedRoute () {
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
                Swal.fire("Non autorisé!" , "vous n'êtes pas autorisé","warning");
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
   

      if(Authentificated && localStorage.getItem('role')=='service_formation'){
            return <Outlet/>  
      }else if(Authentificated && (localStorage.getItem('role')=='chef_dept' ||localStorage.getItem('role')=='encadrant' ||localStorage.getItem('role')=='stagiaire' || localStorage.getItem('role')=='coordinateur')){
        Swal.fire("Interdit!" ,"vous n'êtes pas service de formation" ,"warning"); //error.response.data.message
        return <Navigate to ="/Page403"/>
      }else{
        Swal.fire("Non autorisé!" , "vous n'êtes pas autorisé","warning");
        return <Navigate to ="/login"/>
      }
   
   


     

        }
export default SProtectedRoute
 
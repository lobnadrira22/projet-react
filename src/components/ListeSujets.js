import { waitFor } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink, Navigate} from 'react-router-dom';

import swal from 'sweetalert';
import Landing from './Landing';

function ListeSujets() {
   
  

  //rechercher
  const[searchTerm,setSearchTerm] = useState("");
  const[loading,setLoading] = useState(true);
  const[sujetlist,setSujetlist] = useState([]);
  

  const[sujetvide,setSujetvide] = useState("");

 
  

//afficher sujets stages
  useEffect(()=> {
     axios.get('api/afficher-sujets-stages').then(res=> {
        if(res.status ===200){
          setSujetlist(res.data.sujetStage) 
        }
        setLoading(false);
      }); 
  },[]);
  
     
  
  



  
 

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
else{
 var afficher_Sujet_Cards ="";
 
 if(afficher_Sujet_Cards =""){
  setSujetvide (true);

}


  afficher_Sujet_Cards =
  sujetlist.filter(val =>{
    if(searchTerm === ""){
      return val;
    }else if( val.sujet.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
    }
  }).map( (item , index) => {
  if(item.etatsujet == 'Publié'){/////////
    return(
      <>
      {/* Card 1 */}
<div className=" col-md-offset-3 col-md-6  " > 
<div className="card card-primary">
<div className="card-header">

</div>
<div className="card-body"    >
  {/*  <strong>Sujet</strong> 
{index+1} */}
   <strong>{item.sujet}</strong> <br/>

  <strong className="text-primary"> {item.periode} mois </strong>
  <br/>



 {/*  <strong>Technologies</strong>
  <p>{item.technologies}</p> */}
  <strong >Technologies</strong> <p  className="btn btn-secondary btn-sm p-0  mt-0  text-uppercase ">{item.technologies}</p>

  <br/>


 


   <div className="  col-lg-6 mb-0 float-right">

       <Link  to="/demande-stage-avec-sujet "  className="btn btn-primary rounded-pill p-2 float-right text-uppercase "> Postuler</Link>
      </div>


<div>


<div className="text-right float-left">
<div class="btn-group btn-group-sm ">
<Link to="#" class="btn btn-info" data-toggle="modal" data-target="#exampleModal"><i className="fas fa-eye"></i></Link>
                 {/*     < Link to={`/encadrant/modifier-sujet/${item._id}`}   class="btn btn-primary" ><i class="fas fa-pencil-alt"></i></Link>
                     < Link to= "#" class="btn btn-danger" ><i class="fas fa-trash"></i></Link> */}
</div></div>



</div> 




{/* Afficher détails   */}
<div>
{/* Button trigger modal */}

<div className="text-right py-0 align-middle">
<div class="btn-group btn-group-sm ">
                     {/* <a href="#" class="btn btn-info" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-eye"></i></a> */}
                     {/* <a href="#" class="btn btn-danger" ><i class="fas fa-trash"></i></a>  */}
                    

                     
</div></div>

{/* Modal */}
<div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
 <div className="modal-dialog">
   <div className="modal-content">
     <div className="modal-header">
       <h5 className="modal-title" id="exampleModalLabel">Sujet{index+1} En Détails</h5>
       <button type="button" className="close" data-dismiss="modal" aria-label="Close">
         <span aria-hidden="true">×</span>
       </button>
     </div>
     <div className="modal-body">
    
        <strong className="text-secondary"> Période  </strong>{item.periode} mois <br/><br/>
        <strong className="text-secondary"> Date Début  </strong>{item.datedebut} <br/><br/>
        <strong className="text-secondary"> Type Stage  </strong>{item.typestage} <br/><br/>
        <strong className="text-secondary"> Domaine  </strong>{item.domaine} <br/><br/>
        <strong className="text-secondary">Sujet </strong>{item.sujet} <br/><br/>
        <strong className="text-secondary "> Technologies  </strong>{item.technologies} <br/><br/>
        <strong className="text-secondary"> Description</strong>{item.description} <br/><br/>
      
     </div>
     <div className="modal-footer">
       <button type="button" className="btn btn-secondary text-uppercase" data-dismiss="modal">Fermer</button>
       {/* <button type="button" className="btn btn-primary">Save changes</button> */}
     </div>
   </div>
 </div>
</div>
</div>

{/* .Afficher détails   */}




</div>
</div>
</div>
{/* .Card 1 */}
      
      
      
      </>
  )



  }////////////
    
  });

}


//  


 if(sujetvide == true){


  swal("aucun sjuet trouvé à afficher" , " ", "warning");
  return <Navigate to ="/"/>

}

if(sujetvide == false){


  
return (
  <>
      






    <div class="p-2 bg-light rounded-pill shadow-sm mb-4  col-md-10 mx-auto" >
            <div class="input-group">
              <input type="search" placeholder="Que cherchez-vous?" aria-describedby="button-addon1" class="form-control border-0 bg-light"
               onChange={(e)=> {
                  setSearchTerm(e.target.value);
               }}
              
              />
              <div class="input-group-append">
                <button id="button-addon1" type="submit" class="btn btn-link text-primary"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div>

         


    <div className="row container mx-auto"> 
    
    {afficher_Sujet_Cards}
    </div>
<br/><br/><br/><br/><br/><br/><br/>



  </>
)

}














}
export default ListeSujets

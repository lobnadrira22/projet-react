import { React, useState, useEffect } from 'react';
import { useNavigate, useParams, NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineBars } from "react-icons/ai";

import swal from 'sweetalert';
import Swal from 'sweetalert2';

function PageParamsQuestions() {
  const Swal = require('sweetalert2');
  const testId = useParams().id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [Questionlist, setQuestionlist] = useState([]);

 const [Testlist, setTestlist] = useState([]);


 //validation des données
 const [error, setError] = useState([]);


  const [testInput, setTest] = useState({
    titre: '',
    niveaustagiaire: '',
    duree: '',
    note: '',


  });

  const handleInput = (e) => {
    e.persist();
    setTest({ ...testInput, [e.target.name]: e.target.value })

    
        

  }

  //En cliquant sur le bouton Ajouter une question, les données seront envoyées à la base de données
  const submitQuestion = (e) => {
    e.preventDefault();

    const data = {
      question: testInput.titre,
      niveau: testInput.niveaustagiaire,
      duree: testInput.duree,
      points: testInput.note,
      idTest: testId
    }
 //appeler l'api du backend pour effectuer l'ajout d'une question
    axios.post('/api/question', data).then(res => {

      if (res.data.status === 200) {
        Swal.fire("Success", res.data.message, "success");
        setTest({
          ...testInput,
          titre: '',
          niveaustagiaire: '',
          duree: '',
          note: '',
        });
        window.location.href="/service-de-formation/paramQuiz" 
        return loading;
        setError([]);
      }
      else if (res.data.status === 400) {
        Swal.fire("tous les champs sont requis", "", "error");
        setError(res.data.errors);
      }
    });

  }




const [searchTerm, setSearchTerm] = useState("");

  //Afficher Question 

  useEffect(() => {
    //appeler l'api du backend qui affiche les questions à travers l'id de test 
    axios.get(`/api/questionTest/${testId}`).then(res => {
      if (res.status === 200) {
        setQuestionlist(res.data.questions)
      }
      setLoading(false);
    });
  }, []);

  //Afficher Test
  useEffect(() => {
     //appeler l'api du backend pour consulter la liste des tests
    axios.get('/api/test').then(res => {
      if (res.status === 200) {
        setTestlist(res.data.test)
      }
    });
  }, []);


  


  //Question
  
  var AfficherQuestion_HTMLTABLE = "";
  //L'etat d'une question
  var qetat ="";
  //chargement des données
  if (loading) {
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
  else {
      //afficher la liste des questions
    AfficherQuestion_HTMLTABLE =
      Questionlist.filter(val => {
        if (searchTerm === "") {
          return val;
        } else if (val.question.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val;
        }
      }).map((item, index) => {
   

     //etat d'une question activé ou désactivé
    if(item.etat == 'active'){
   
      qetat =  <button type="button" className="btn btn-success btn-sm  rounded-pill " ><i className="fas fa-check "></i></button> 
    
      }
      else if(item.etat == 'désactive'){
   
        qetat =  <button type="button" className="btn btn-danger btn-sm rounded-pill" ><i className="fas  fas fa-ban "></i></button> 
      
      }
        return (
       
          <tr key={item._id}>
            <td>{ qetat }</td>
            <td>{item._id}</td>
            <td>{item.question}</td>
            <td>{item.niveau}</td>
            <td>{item.duree}</td>
            <td>{item.points}</td>
            <td>
              {/* lien : pour modifier une question */}
              <Link to={`/service-de-formation/modifier-question/${item._id}`}>
                <i size={25} className="fas fa-pencil-alt  text-success"></i></Link>
            </td>
            <td>
              {/* lien : pour consulter la liste des réponses à travers l'id d'une question */}
              <Link to={`paramQuestion/${item._id}`}>
                <AiOutlineBars size={25} color={'green'} />
              </Link>
            </td>
          </tr>
        )
      });
  }




  //Test
  //chargement des données
  if (loading) {
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
/*   else {

    var AfficherTest_HTMLTABLE = ""
      //afficher la liste des tests
    AfficherTest_HTMLTABLE =
      Testlist.filter(val => {
        if (searchTerm === "") {
          return val;
        } else if (val.niveautest.toLowerCase().includes(searchTerm.toLowerCase()) || val.niveaustagiaire.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val;
        }
      }).map((item, index) => {


 
        return (
          <tr key={item._id}>
       <td>{ qetat }</td>
            <td>{item._id}</td>
           
            <td>{item.titre}</td>
           
            <td>{item.niveaustagiaire}</td>
            <td>{item.niveautest}</td>
            <td>{item.note}</td>
            <td>{item.duree}</td>
            <td>
              <Link to =''><AiOutlineBars size={25} color={'green'} /></Link>
              </td>
          </tr>
        )
      });
  }


 */

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h3>Paramètres des Questions</h3>
            </div>


            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">


                <NavLink className={(ndata) => ndata.isActive && "active"} to='/service-de-formation/acceuil'>Acceuil</NavLink>  <span> / </span>
                <NavLink className={(ndata) => ndata.isActive && "active"} to='/service-de-formation/paramQuiz'>Paramètres des Questions</NavLink>

              </ol>
            </div>
          </div>
        </div>
      </section>


      <div className="container ">
        <div className="card mt-4">

          <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4 col-md-9  " style={{ marginLeft: "1cm", marginRight: "1cm", marginTop: "1cm" }}>
            <div class="input-group">
              <input type="search" placeholder="Vous pouvez cherchez question ?" aria-describedby="button-addon1" class="form-control border-0 bg-light "
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}

              />
              <div class="input-group-append">
                <button id="button-addon1" type="submit" class="btn btn-link text-primary"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div>


          <div className="card-tools">
            <div className="form-inline float-right">

              {/* bouton : pour ajouter une question */}
              <a href="#" className="btn btn-primary btn-sm " data-toggle="modal" data-target="#z" style={{ marginRight: "1cm" }} > + Ajouter une question</a>
            </div>

          </div>

          <br />

          <div className="card card-primary" style={{ marginLeft: "1cm", marginRight: "1cm" }}>


            <div className="card-header">


              <h3 className="card-title">Questions</h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                  <i className="fas fa-minus" />
                </button>
              </div>
            </div>

            <div className="card-body p-0">
              <table className="table">
                <thead>
                  <tr>  
                     <th>Etat</th> 
                    <th>ID</th>
                   <th>Question</th>
                    <th>Niveau du difficulté</th>
                    <th>Durée (sec) </th>
                    <th>Points</th>
                    <th>Modifier</th>
                    <th>Réponses</th>
                  </tr>
                </thead>
                <tbody>


                  {AfficherQuestion_HTMLTABLE}



                </tbody>
              </table>


            </div>
          </div>


        </div>
      </div>










  
      {/* Ajouter question  */}
      <div>


        {/* Modal */}
        <div className="modal fade col-md-12" id="z" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog  ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="#exampleModalLabel">Ajouter une question</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">


                <div className="col-md-offset-3 col-md-12">
                  <form onSubmit={submitQuestion}>
                    <div className="row">



                      {/* La question */}
                      <div className="wrap-input100   col-lg-12 mb-4 " >


                        <input className="input100" type="text" name="titre" placeholder="Question" onChange={handleInput} value={testInput.titre} required  />
                        <span className="focus-input111" />
                   


                      </div>
                       {/* Le niveau de difficulté de la question */}
                      <div className="wrap-input100   col-lg-12 mb-4 " >
                        <select name='niveaustagiaire' onChange={handleInput} value={testInput.niveaustagiaire} className="input100 border-0 ">
                          <option selected hidden>--Niveau--</option>
                          <option name="niveaustagiaire" value="facile">Facile</option>
                          <option name="niveaustagiaire" value="moyen">Moyen</option>
                          <option name="niveaustagiaire" value="difficile">Difficile</option>
                        </select>
                        {error.niveau? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />Vous devez choisir Le niveau de difficulté de la question !</span> :""}  


                      </div>
                       {/* La durée de la question*/}
                      <div className="wrap-input100   col-lg-12 mb-4 " >
                        <input name="duree" className="input100 border-0 " type="number" min="1"  placeholder="Durée du Question en secondes" onChange={handleInput} value={testInput.duree} />
                      </div>
                       {/* Les points de la question*/}
                      <div className="wrap-input100   col-lg-12 mb-4 " >
                        <input name="note" className="input100 border-0 " type="number" min="1"  placeholder="Points" onChange={handleInput} value={testInput.note} />
                      </div>

                    {/* Le bouton ajouter question */}
                      <div className="form-group col-lg-6">
                        <button type="submit" className="login100-form-btn" style={{ color: 'white' }}>

                          Ajouter

                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* Le bouton annuler */}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    {/*. Ajouter question  */}

    </>
  )
}

export default PageParamsQuestions
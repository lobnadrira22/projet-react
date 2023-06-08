import { React, useState, useEffect } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineBars } from "react-icons/ai";

import swal from 'sweetalert';
import Swal from 'sweetalert2';

function PageParamsQuiz() {
  const Swal = require('sweetalert2');

 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [Questionlist, setQuestionlist] = useState([]);

  const [Testlist, setTestlist] = useState([]);


    //validation des données
   const [utiErrstrtitre,setUtiErrstrtitre]=useState(false);
   const [error, setError] = useState([]);
 
  const [testInput, setTest] = useState({
    titre: '',
    departement: '',
    niveaustagiaire: '',
    niveautest: '',
    duree: '',
    note: '',


  });

  const handleInput = (e) => {
    e.persist();
    setTest({ ...testInput, [e.target.name]: e.target.value })

     
         //le titre doit etre string 
         if( !(testInput.titre.match('[a-z-A-Z]')) ) {  
          setUtiErrstrtitre(true)
         }
         else{
          setUtiErrstrtitre(false)
         }
  }
   //En cliquant sur le bouton Ajouter un test , les données seront envoyées à la base de données
  const submitTest = (e) => {
    e.preventDefault();
    const data = {
      titre: testInput.titre,
      niveaustagiaire: testInput.niveaustagiaire,
      niveautest: testInput.niveautest,
      duree: testInput.duree,
      note: testInput.note
    }

    
//appeler l'api du backend pour effectuer l'ajout d'un test
    axios.post('/api/test', data).then(res => {

      if (res.data.status === 200) {
        Swal.fire("Success", res.data.message, "success");
        setTest({
          ...testInput,
          titre: '',
          niveaustagiaire: '',
          niveautest: '',
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



  //Afficher Question 
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
      //appeler l'api du backend qui affiche la liste des questions 
    axios.get('/api/allquestion').then(res => {
      if (res.status === 200) {
        setQuestionlist(res.data.questions)
      }
      setLoading(false);
    });
  }, []);

  //Afficher Test
  useEffect(() => {
     //appeler l'api du backend qui affiche la liste des tests
    axios.get('/api/test').then(res => {
      if (res.status === 200) {
        setTestlist(res.data.test)
      }
    });
  }, []);




  //Question
  var AfficherQuestion_HTMLTABLE = "";

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
        } else if (val.question.toLowerCase().includes(searchTerm.toLowerCase()) ) {
          return val;
        }
      }).map((item, index) => {

        return (
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.question}</td>
            <td>{item.niveau}</td>
            <td>{item.duree}</td>
            <td>{item.points}</td>
           <td>
              {/* lien : pour modifier une question */}
              <Link to={`/service-de-formation/modifier-question/${item._id}`}>
                <i className="fas fa-pencil-alt  text-success"></i></Link>
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
  else {
     
    var AfficherTest_HTMLTABLE = ""
     //afficher la liste des tests
    AfficherTest_HTMLTABLE =
      Testlist.filter(val => {
        if (searchTerm === "") {
          return val;
        } else if (val.niveautest.toLowerCase().includes(searchTerm.toLowerCase()) ) {
          return val;
        }
      }).map((item, index) => {

        return (
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.titre}</td>
            <td>{item.niveaustagiaire}</td>
            <td>{item.niveautest}</td>
            <td>{item.note}</td>
            <td>{item.duree}</td>
            <td>
                    {/* lien : pour consulter la liste des questions  à travers l'id d'un test */}
              <a href={`paramQuiz/${item._id}`}><AiOutlineBars size={25} color={'green'}/>
              </a></td>
          </tr>
        )
      });
  }

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h3>Paramètres du test</h3>
            </div>


            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">


                <NavLink className={(ndata) => ndata.isActive && "active"} to='/service-de-formation/acceuil'>Acceuil</NavLink>  <span> / </span>
                <NavLink className={(ndata) => ndata.isActive && "active"} to='/service-de-formation/paramQuiz'>Paramètres du test</NavLink>

              </ol>
            </div>
          </div>
        </div>
      </section>










      <div className="container ">
        <div className="card mt-4">


          <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4  col-md-9 " style={{ marginLeft: "1cm", marginRight: "1cm", marginTop: "1cm" }}>
            <div class="input-group">
              <input type="search" placeholder="Vous pouvez cherchez test selon le niveau de difficulté  facile - moyen - difficile ?" aria-describedby="button-addon1" class="form-control border-0 bg-light"
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
                {/* bouton : pour ajouter un test */}
              <a href="#" className="btn btn-success btn-sm " data-toggle="modal" data-target="#z" style={{ marginRight: "1cm" }}> + Ajouter un Test</a>

            </div>

          </div>

          <br />




          <div className="card card-success" style={{ marginLeft: "1cm", marginRight: "1cm" }}>


            <div className="card-header">


              <h3 className="card-title">Tests</h3>
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
                    <th>ID</th>
                    <th>Titre</th>
                    <th>Niveau Stagiaire</th>
                    <th>Niveau Test</th>
                    <th>Note</th>
                    <th>Durée</th>
                    <th>Questions</th>
                  </tr>
                </thead>
                <tbody>


                  {AfficherTest_HTMLTABLE}



                </tbody>
              </table>


            </div>
          </div>
        </div>
      </div>


      {/* Ajouter test */}
      <div>


        {/* Modal */}
        <div className="modal fade col-md-12" id="z" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog  ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="#exampleModalLabel">Ajouter Test</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">


                <div className="col-md-offset-3 col-md-12">
                  <form onSubmit={submitTest}>
                    <div className="row">



                      {/* Titre */}
                      <div className="wrap-input100   col-lg-12 mb-4 " >


                        <input className="input100" type="text" name="titre" placeholder="Titre du test" onChange={handleInput} value={testInput.titre} required/>
                        <span className="focus-input111" />
                        {utiErrstrtitre ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> Titre est chaine de caractéres!</span> :""}  


                      </div>

 

                      {/* Niveau d'étude Stagiaire */}
                      <div className="wrap-input100   col-lg-12 mb-4 " >
                        <select name='niveaustagiaire' onChange={handleInput} value={testInput.niveaustagiaire} className="input100 border-0 ">
                          <option selected hidden>--Niveau d'étude--</option>
                          <option name="niveaustagiaire" value="Bac">Bac</option>
                          <option name="niveaustagiaire" value="BTS">BTS</option>
                          <option name="niveaustagiaire" value="Licence">Licence</option>
                          <option name="niveaustagiaire" value="Master">Master</option>
                          <option name="niveaustagiaire" value="Ingénieur">cycle ingénieur</option>
                        </select>
                          {error.niveaustagiaire ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />Vous devez choisir le niveau de stagiaire!</span> :""}  

                      </div>
                     

                      {/* Niveau de test*/}
                      <div className="wrap-input100   col-lg-12 mb-4 " >
                        <select name="niveautest" className="input100 border-0 " onChange={handleInput} value={testInput.niveautest} >
                          <option selected hidden>--Niveau--</option>
                          <option name="niveautest">facile</option>
                          <option name="niveautest">moyen</option>
                          <option name="niveautest">difficile</option>

                        </select>
                        {error.niveautest ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />Vous devez choisir le niveau de test!</span> :""}  

                      </div>
                
                    {/* La durée */}
                      <div className="wrap-input100   col-lg-12 mb-4 " >
                        <input name="duree" className="input100 border-0 " type="number" min="1"  placeholder="Durée du Test en secondes" onChange={handleInput} value={testInput.duree} required/>
                      </div>
                      

                     {/* La note */}
                      <div className="wrap-input100   col-lg-12 mb-4 " >
                        <input name="note" className="input100 border-0 " type="number" min="1" placeholder="Note" onChange={handleInput} value={testInput.note}  required/>
                      </div>

                       {/* Le bouton ajouter test */}
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

 {/*. Ajouter test */}

 

    </>
  )
}

export default PageParamsQuiz
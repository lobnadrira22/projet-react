import { React, useState, useEffect } from 'react';
import { useNavigate, useParams, NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineBars } from "react-icons/ai";

import swal from 'sweetalert';
import Swal from 'sweetalert2';

function PageParamsReponses() {
  const Swal = require('sweetalert2');
  const questionId = useParams().id;
  const [errorlist, setError] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [Questionlist, setQuestionlist] = useState([]);

  const [Testlist, setTestlist] = useState([]);



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
   //En cliquant sur le bouton Ajouter une réponse, les données seront envoyées à la base de données
  const submitReponses = (e) => {
    e.preventDefault();
   /*  const formData = new FormData();
    formData.append('titre',testInput.titre);
    
    formData.append('nid_question', questionId);
    formData.append(' repcorrecte',testInput.niveaustagiaire);
    formData.append('reptext',testInput.duree);
    formData.append('note',testInput.note); */
    const data = {
      id_question: questionId,
      repcorrecte: testInput.niveaustagiaire,
      reptext: testInput.duree,
    } 

    
    //appeler l'api du backend pour effectuer l'ajout d'une réponse
    axios.post('/api/reponse', data).then(res => {

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
      else if (res.data.status === 422) {
        Swal.fire("tous les champs sont requis", "", "error");
        setError(res.data.errors);
      }
    });

  }



  //Afficher Réponses
  const [searchTerm, setSearchTerm] = useState("");
  const [repType, setRepType] = useState(null);

  useEffect(() => {
    //appeler l'api du backend qui affiche les réponses à travers l'id de question
    axios.get(`/api/reponse-question/${questionId}`).then(res => {
      if (res.status === 200) {
        setQuestionlist(res.data.reponses)
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


  //Réponse
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
    //afficher la liste des réponses
    AfficherQuestion_HTMLTABLE =
      Questionlist.filter(val => {
        if (searchTerm === "") {
          return val;
        } else if (val.repcorrecte.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val;
        }
      }).map((item, index) => {

        return (
          <tr key={item._id}>
            <td>{item._id}</td>
            {/* <td>{item.repimage}</td> */}
            <td>{item.reptext}</td>
            <td>{item.repcorrecte}</td>
            <td>
              {/* lien : pour modifier une réponse*/}
              <Link to={`/service-de-formation/modifier-reponse/${item._id}`}>
                <i size={25} className="fas fa-pencil-alt  text-success"></i></Link>
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
  /* else {
    var AfficherTest_HTMLTABLE = ""
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
            <td>{item._id}</td>
            <td>{item.titre}</td>
            <td>{item.departement}</td>
            <td>{item.niveaustagiaire}</td>
            <td>{item.niveautest}</td>
            <td>{item.note}</td>
            <td>{item.duree}</td>
            <td><a href=''><AiOutlineBars size={25} color={'green'} /></a></td>
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
              <h3>Paramètres des Réponses</h3>
            </div>


            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">


                <NavLink className={(ndata) => ndata.isActive && "active"} to='/service-de-formation/acceuil'>Acceuil</NavLink>  <span> / </span>
                <NavLink className={(ndata) => ndata.isActive && "active"} to='/service-de-formation/paramQuiz'>Paramètres des Réponses</NavLink>

              </ol>
            </div>
          </div>
        </div>
      </section>


      <div className="container ">
        <div className="card mt-4">

          <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4 col-md-5  " style={{ marginLeft: "1cm", marginRight: "1cm", marginTop: "1cm" }}>
            <div class="input-group">
              <input type="search" placeholder="Vous pouvez cherchez selon la réponse correcte ?" aria-describedby="button-addon1" class="form-control border-0 bg-light "
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
              {/* bouton : pour ajouter une réponse  */}
             <a href="#" className="btn btn-primary btn-sm " data-toggle="modal" data-target="#z" style={{ marginRight: "1cm" }} > + Ajouter une réponse</a>
            
            </div>

          </div>

          <br />

          <div className="card card-primary" style={{ marginLeft: "1cm", marginRight: "1cm" }}>


            <div className="card-header">


              <h3 className="card-title">Réponses</h3>
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
                    {/* <th>Réponse Image</th> */}
                    <th>Réponse </th>
                    <th>Réponse Correcte?</th>
                    <th>Modifier</th>
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










         {/* Ajouter réponse */}
      <div>


        {/* Modal */}
        <div className="modal fade col-md-12" id="z" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog  ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="#exampleModalLabel">Ajouter une réponse</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">

                <div className="col-md-offset-3 col-md-12">
                  <form onSubmit={submitReponses}>
                    <div className="row">



                      {/* Réponse */}


                      <div className="wrap-input100   col-lg-12 mb-4 " >
                        <select name='niveaustagiaire' onChange={handleInput} value={testInput.niveaustagiaire} className="input100 border-0 ">
                          <option selected hidden>--Correcte?--</option>
                          <option name="niveaustagiaire" value={true}>Oui</option>
                          <option name="niveaustagiaire" value={false}>Non</option>
                        </select>

                      </div>

                      <div className='wrap-input100   col-lg-12 mb-4'>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <input type='radio' id='repText' name='rep' onClick={() => setRepType(0)} />
                            <p style={{ marginLeft: 5 }}>Réponse </p>
                          </div>
                        {/*   <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <input type='radio' id='repImage' name='rep' onClick={() => setRepType(1)} />
                            <p style={{ marginLeft: 5 }}>Réponse Image</p>
                          </div> */}
                        </div>
                      </div>

                      {
                        repType === 0 ?
                        // Réponse Texte
                          <div className="wrap-input100 col-lg-12 mb-4 ">
                            <input name="duree" className="input100 border-0 " type="text" placeholder="Réponse" onChange={handleInput} value={testInput.duree}  required/>
                          </div>
                          : repType === 1 ?
                         // Réponse Image
                          <div className="wrap-input100 col-lg-12 mb-4">
                            <input name="note" className="input100 border-0 " type="file" onChange={handleInput} value={testInput.note} />
                          </div>
                          : null
                      }





                     {/* Le bouton ajouter réponse */}
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
 {/* . Ajouter réponse */}
    </>
  )
}

export default PageParamsReponses
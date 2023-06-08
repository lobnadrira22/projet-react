import React from 'react'

//la page d'accueil de tous les espaces, qui contient les informations de topnet
function Acceuil() {

  return (
    <> 

            
    <br/><br/><br/>
       <div className="col-12 col-sm-12 col-md-12 d-flex align-items-stretch flex-column">
  <div className="card bg-light d-flex flex-fill">

    <div className="card-body pt-0">
      <div className="row">
        <div className="col-7">
        <br/><br/><br/>
         <b  className="text-muted text-sm">TOPNET: </b>
          <p className="text-muted text-sm"> est une entreprise tunisienne qui a démarré ses activités le 02 mai 2001, elle est le leader, aujourd’hui, des Fournisseurs d'accès Internet en Tunisie.<br/><br/>

          devient une filiale de groupe Tunisie Télécom, en Juin 2010, cette acquisition est considérée par Tunisie Télécom comme étant une opération stratégique permettant le renforcement de son leadership à travers un acteur qui, en quelques années, a réussi à se hisser en leader sur le marché des fournisseurs de services Internet (FSI).

 </p>

 <br/><br/>
        </div>
        <div className="col-3 text-center">
          <img src="../../dist/img/topnetStage.png" alt="user-avatar" className="img-circle img-fluid" />
        </div>
      </div>
    </div>
    <div className="card-footer">
      <div className="text-right">
        <br/>
      </div>
    </div>
  </div>
</div>
<br/><br/>
         
 
    </>
  )
}

export default Acceuil

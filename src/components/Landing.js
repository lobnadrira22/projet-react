import React from 'react'
import { Outlet ,Link} from 'react-router-dom'




function Landing() {

   if(  localStorage.getItem('role' ) ==='stagiaire'  &&  localStorage.getItem('etatSt' ) ==='etudiant'){
    var afficher_S ="";
   afficher_S = <div className="hero-cta"><a className="button button-primary" href="/liste-sujets">Liste sujets</a><a className="button" href="/demande-stage">Passer demande de stage</a></div>
  
  } 


  return (
    <>



   {/* La barre de navigation */}


<div style={{background: '#011642'}}>

<br/>
<section className="ftco-section container">

<div className="container ">


<nav  className="navbar navbar-expand-lg rounded" id="ftco-navbar" style={{background: '#c6cbd5'}}>

<div className="container">
   <Link to="/" className="brand-link">
        <img src="../../dist/img/topnet.jpg" alt="TopStage" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
      </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className=" fas fa-bars" />
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">


    <li className="nav-item"> <Link to="/" className="nav-link text-decoration-none"   >Acceuil</Link> </li>
          {/*   <li class="nav-item dropdown">
            <Link class="nav-link dropdown-toggle text-decoration-none" to="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
          Espace
        </Link>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <Link to="/coordinateur/acceuil" className="dropdown-item txt2 text-decoration-none" >Coordinateur</Link> 
        <Link to="/service-de-formation/acceuil" className="dropdown-item txt2 text-decoration-none" >Responsable formation</Link> 
        <Link to="/chef-departement/acceuil" className="dropdown-item txt2 text-decoration-none" >Chef de département</Link> 
        <Link to="/encadrant/acceuil" className="dropdown-item txt2 text-decoration-none" >Encadrant</Link> 
        <Link to="/stagiaire/acceuil" className="dropdown-item txt2 text-decoration-none" >Stagiaire</Link> 
        </div>
      </li>

 */}
            <li class="nav-item dropdown">
        <Link class="nav-link dropdown-toggle text-decoration-none" to="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
          Stagiaire
        </Link>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <Link to="/register-stagiaire" className="dropdown-item txt2 text-decoration-none" >S'inscrire</Link> 
        <Link to="/login-stagiaire" className="dropdown-item txt2 text-decoration-none" >Connecter</Link> 
        </div>
      </li>

      <li class="nav-item dropdown">
      <Link class="nav-link dropdown-toggle text-decoration-none" to="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
          Utilisateur
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <Link to="/login" className="dropdown-item txt2 text-decoration-none" >Connecter</Link> 
       
        </div>
      </li>

    </ul>
  
  </div>


</div>
</nav>

</div>
 
</section>

    
     <div className="body-wrap">
      <br/><br/>
      {/* Contenu */}
          <Outlet /> 

    <section className="cta section">
      <div className="container">

<div>
  <div className="hero-inner  col-md-7">
    <div className="hero-copy ">
      <h1 className="hero-title mt-0 text-white">Topnet Stages</h1>
      <p className="hero-paragraph">Topstage est une plateforme de stages dédiée aux nouveaux stagiaires
qui souhaitent postuler à un stage au sein de l'agence Topnet.</p>
      { afficher_S }
    </div>
  </div>

   
 <br /><br />
</div>
        <div className="cta-inner section-inner">
          <h3 className="section-title mt-0  text-white">pour plus d'informations sur l'agence Topnet</h3>
          <div className="cta-cta">
            <a className="button button-primary button-wide-mobile" href="https://www.topnet.tn/">Lien Topnet</a>
          </div>
        </div>
      </div> 
    </section>
 

  

  <footer className="site-footer">
    <div className="container">
      <div className="site-footer-inner">
        <div className="brand footer-brand">
          <a href="#">
            <img className="header-logo-image" src="../../dist111/images/logo.svg" alt="Logo" />
          </a>
        </div>
        <ul className="footer-social-links list-reset">
          <li>
            <a href="#">
              
              <svg width={16} height={16} xmlns="http://www.w3.org/2000/svg">
                <path d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z" fill="#0270D7" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
             
              <svg width={16} height={16} xmlns="http://www.w3.org/2000/svg">
                <path d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z" fill="#0270D7" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
           
              <svg width={16} height={16} xmlns="http://www.w3.org/2000/svg">
                <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" fill="#0270D7" />
              </svg>
            </a>
          </li>
        </ul>
        <div className="footer-copyright text-white">© 2022, tous droits réservés</div>
      </div>
    </div>
  </footer>



</div>
</div>  


  
    </>
  )
}

export default Landing

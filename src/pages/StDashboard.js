import React from 'react'
import {Routes , Route ,useParams , Outlet} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StSideBar from '../components/StSideBar';

//Espace stagiaire
function StDashboard() {
  return (
    <>
         <Header/>
        {/* contenu  */}
       <main className="content-wrapper">
            <Outlet />
      </main>
      <StSideBar/>
      <Footer/> 
    </>
  )
}

export default StDashboard

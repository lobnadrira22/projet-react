import React from 'react'

import {Routes , Route ,useParams , Outlet} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SSideBar from '../components/SSideBar';


//Espace responsable de formation
function SDashboard() {
  return (
    <>
          <Header/>
        {/* Contenu  */}
       <main className="content-wrapper">
            <Outlet />
      </main>
      <SSideBar/>
      <Footer/> 
    </>
  )
}

export default SDashboard

import React from 'react'

import {Routes , Route ,useParams , Outlet} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChSideBar from '../components/ChSideBar';



//Espace chef de département
function ChDashboard() {
  return (
    <>
        <Header/>
        {/* Contenu*/}
       <main className="content-wrapper">
            <Outlet />
      </main>
      <ChSideBar/>
      <Footer/> 
    </>
  )
}

export default ChDashboard

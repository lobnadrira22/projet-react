import React from 'react'

import {Routes , Route ,useParams , Outlet} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ESideBar from '../components/ESideBar';

//Espace encadrant
function EDashboard() {
  return (
    <>
        <Header/>
        {/* Contenu  */}
       <main className="content-wrapper">
            <Outlet />
      </main>
      <ESideBar/>
      <Footer/> 
    </>
  )
}

export default EDashboard

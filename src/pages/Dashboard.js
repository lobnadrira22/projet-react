import React from 'react'

import {Routes , Route ,useParams , Outlet} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';


//Espace coordinateur
function Dashboard() {
  

  return (
    <>
       <Header/>
        {/* Contenu  */}
       <main className="content-wrapper">
            <Outlet />
      </main>
      <SideBar/>
      <Footer/> 
    </>
  )
}

export default Dashboard

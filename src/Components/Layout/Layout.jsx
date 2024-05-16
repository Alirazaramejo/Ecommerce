import React from 'react'
import Header from '../Header/Header'
import AdminNav from '../../Admin/AdminNav'
import Footer from '../Footer/Footer'
import Routers from '../../routers/Routers'
import { useLocation } from 'react-router-dom'
function Layout() {
  const location = useLocation()
  return (
   <>
   {
      location.pathname.startsWith("/dashboard") ? <AdminNav/> : <Header/>
   }
  
   <div>
        <Routers/>
   </div>
   <Footer/>
   </>
  )
}

export default Layout
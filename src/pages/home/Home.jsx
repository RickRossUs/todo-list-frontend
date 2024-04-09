import React from 'react'
import Portada from '../../components/portada/Portada'
import Header from '../../components/header/Header'
import SobreNosotros from '../../components/sobre/SobreNosotros'
import Servicios from '../../components/servicios/Servicios'
import SeccionContador from '../../components/contadores/SeccionContador'
import Productos from '../../components/productos/Productos'
import Contacto from '../../components/contacto/Contacto'
import Footer from '../../components/footer/Footer'
import Testimonios from '../../components/testimonios/Testimonios'
// import Video from '../../components/bannerVid/Video'

const Home = () => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <Portada/>
      <Header/>
      <SobreNosotros/>
      <Servicios/>
      <SeccionContador/>
      <Productos/>
      <Testimonios/>
      <Contacto/>
      <Footer/>
    </div>
  )
}

export default Home

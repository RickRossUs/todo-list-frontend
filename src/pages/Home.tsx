import React from 'react'
import Portada from '@/components/home/Portada'
import Header from '@/components/header/Header'
import SobreNosotros from '@/components/sobre/SobreNosotros'
import Servicios from '@/components/home/Servicios'
import SeccionContador from '@/components/home/SeccionContador'
import ProductosMasVendidos from '@/components/producto/ProductosMasVendidos'
import Contacto from '@/components/home/Contacto'
import Footer from '@/components/home/Footer'
import Testimonios from '@/components/home/Testimonios'

const Home = () => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <Portada/>
      <Header/>
      <SobreNosotros/>
      <Servicios/>
      <SeccionContador/>
      <ProductosMasVendidos/>
      <Testimonios/>
      <Contacto/>
      <Footer/>
    </div>
  )
}

export default Home

import { Box } from '@mui/material'
import img1 from '@/assets/img/Fondos/Vegetable-Wallpaper-About-Murals.jpg'
import img2 from '@/assets/img/Fondos/43118830681105a4c9691da8ed8cda0e.jpeg'
import img3 from '@/assets/img/Fondos/desktop-wallpaper-vegetable-background-vegetable-garden-vegetable-and-rice-vegetable-veggie.jpg'
import img4 from '@/assets/img/Fondos/iPhoneXSMax-1242x2688-wallpaper_01307.jpg'
import img5 from '@/assets/img/Fondos/prevencion-cancer-frutas-verduras-3.jpg'

const Carrusel = () => {
  return (
    <div>
        <Box sx={{ width:"98%", height:'70vh', ml:'1%', display:'flex'}}>
          <Box sx={{ width:"300%", height:"100%", display:'flex', justifyContent:"space-between", alignItems:"center", gap:2, overflowX:'scroll'}}>
            <Box component="img" src={img1} alt="Foto-1" sx={{width:'50%', height:"100%", borderRaduis:5}}></Box>  
            <Box component="img" src={img2} alt="Foto-2" sx={{width:'50%', height:"100%", borderRaduis:5}}></Box>  
            <Box component="img" src={img3} alt="Foto-3" sx={{width:'50%', height:"100%", borderRaduis:5}}></Box>  
            <Box component="img" src={img4} alt="Foto-4" sx={{width:'50%', height:"100%", borderRaduis:5}}></Box>  
            <Box component="img" src={img5} alt="Foto-5" sx={{width:'50%', height:"100%", borderRaduis:5}}></Box>  
          </Box>
      </Box>
    </div>
  )
}

export default Carrusel
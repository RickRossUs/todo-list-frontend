import React, { useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material';

const FiltroCarrito = () => {
  
  const [value, setValue] = useState('1')
  const handleChange = (event: React.SyntheticEvent, newValue: string)=>{
    setValue(newValue);
  }
  
  return (
    <div>
      <Box className="TabContext" >
        <Box sx={{borderBottom: 2, borderColor:"divider"}}>
            <Tabs aria-label='Tabs example' onChange={handleChange}>
                <Tab label="Tab Uno" value="1"></Tab>
            </Tabs>
        </Box>
      </Box>
    </div>
  )
}

export default FiltroCarrito

import React, { useState } from 'react'
import './formInput.css'
import { Box, TextField, Typography} from '@mui/material'

const FormInput = (props) => {

  const [focused, setFocused] = useState(false)
    const {onChange, errorMessage, id, ...inputProps} = props;
    const handleFocus = (e) =>{
      setFocused(true);
    }

  return (
    <div className='formInput'>
      {/* <TextField className="input" {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()} color="success" size="small" sx={{width:{xs:"300px", sm:"400px", md:"500px"}, height:{xs:"2vh"}}} /> */}
      <Box component="input"
       className="input" 
       {...inputProps} 
       onChange={onChange} 
       onBlur={handleFocus} 
       focused={focused.toString()} 
       color="success" size="small" 
       sx={{width:{xs:"300px", sm:"400px", md:"500px"}, 
       height:{xs:"2vh", md:"6vh"}, borderRadius:2, p:2}} />
      {/* <input className="input" {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()} /> */}
      <Typography component="span"
       sx={{display:"block", mt:2, color:"red", 
       fontSize:{lg:"12px"}}} >
        <Typography component="i" 
          className='bi bi-exclamation-diamond' 
          sx={{mx:1, fontSize:{lg:"12px"}}}/> {props.errorMessage}
      </Typography>
    </div>
  )
}

export default FormInput
 
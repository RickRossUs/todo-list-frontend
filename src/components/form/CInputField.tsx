import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const InputField = ({ name, control, label, type, rules, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      defaultValue=""
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          size="small"
          color="success"
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          error={!!errors[name]}
          helperText={errors[name]?.message}
          sx={{ width: "100%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {type === "password" && (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    color="success"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default InputField;

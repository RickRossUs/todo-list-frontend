import { useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputFieldProps } from "@/types/InputFieldProps";

const InputField = <T extends FieldValues>({
  name,
  control,
  label,
  type,
  rules,
  errors,
  defaultValue,
}: InputFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
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
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Typography,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AuthContext from "../auth/AuthContext";

const LoginView = () => {
  const [isLogin, setIsLogin] = React.useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = React.useState(false);
  const { loginUser, registerUser } = useContext(AuthContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleLogin = () => setIsLogin((is) => !is);

  const onSubmit = (data) => {
    if (isLogin)
      loginUser({ username: data.username, password: data.password });
    else registerUser(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 1000,
          py: 7,
          px: 5,
          bgcolor: "rgba(255,255,255,0.5)",
          borderRadius: 3,
          boxShadow: "10px  10px  10px rgba(0,0,0,0.4)",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography
          sx={{
            pb: 3,
            m: 0,
            fontSize: { sm: "2rem", md: "3rem" },
            fontWeight: "bold",
            color: "#5ABE5D",
            lineHeight: 1,
          }}
        >
          {isLogin ? "LOGIN" : "REGISTER"}
        </Typography>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          sx={{ width: "100%", mb: 2 }}
          {...register("username", {
            required: "Username is required",
            maxLength: {
              value: 100,
              message: "Must be less than 100 characters",
            },
          })}
          error={errors.username}
          helperText={errors.username?.message}
        />
        {!isLogin ? (
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-email-input">Email</InputLabel>
            <OutlinedInput
              id="outlined-email-input"
              type="email"
              label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Required valid email",
                },
              })}
              error={errors.email}
            />
            <FormHelperText sx={{ color: "red" }}>
              {errors.email?.message}
            </FormHelperText>
          </FormControl>
        ) : null}
        <FormControl sx={{ width: "100%", mt: 2 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Must be more than 100 characters",
              },
            })}
            error={errors.password}
          />
          <FormHelperText sx={{ color: "red" }}>
            {errors.password?.message}
          </FormHelperText>
        </FormControl>
        <Button
          size="small"
          sx={{
            height: 40,
            width: "100%",
            mt: 2,
            bgcolor: "#E5514C",
            borderRadius: 3,
            border: "1px solid #E5514C",
            color: "white",
            fontSize: { md: "1rem", xs: ".8rem" },
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#E5514C",
              border: "1px solid #E5514C",
            },
          }}
          type="submit"
        >
          {isLogin ? "LOGIN" : "REGISTER"}
        </Button>
        <Typography
          sx={{
            pt: 2,
            m: 0,
            fontSize: { sm: ".8rem", md: "1rem" },
            color: "#E5514C",
            cursor: "pointer",
          }}
          onClick={handleLogin}
        >
          {!isLogin ? "Login >" : "Register >"}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginView;

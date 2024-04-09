import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Grid,
  Select,
  MenuItem,
  Button,
} from "@mui/material/";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import EventsContext from "../context/EventsContext";

const EventFormView = () => {
  const navigate = useNavigate();
  const { postEvent } = useContext(EventsContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleReturn = () => {
    navigate("/");
  };

  const onSubmit = (data) => {
    postEvent(data);
    navigate("/");
  };

  return (
    <>
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
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            position: "relative",
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
        >
          <Button
            sx={{
              position: "absolute",
              top: "10px",
              left: "10px",
              height: "30px",
              width: "30px",
              m: 1,
              borderRadius: 3,
            }}
            onClick={handleReturn}
          >
            <ArrowBackIosIcon
              sx={{ p: 0, m: 0, height: 30, width: 30, color: "#5ABE5D" }}
            />
          </Button>
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
            Create Event
          </Typography>
          <TextField
            fullWidth
            label="Name"
            id="Name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Description is required",
              },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ my: 1 }}
          />
          <TextField
            id="outlined-multiline-flexible"
            fullWidth
            label="Description"
            multiline
            maxRows={4}
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 1,
                message: "Description is required",
              },
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
            sx={{ my: 1 }}
          />
          <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth sx={{}}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Capacity
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  type="text"
                  startAdornment={
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  }
                  label="Capacity"
                  {...register("total_available_attendees", {
                    required: "Capacity is required",
                    min: {
                      value: 1,
                      message: "Capacity must be greater than 0",
                    },
                    valueAsNumber: true,
                  })}
                  error={!!errors.total_available_attendees}
                  helperText={errors.total_available_attendees?.message}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Price
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  type="text"
                  startAdornment={
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  }
                  label="Price"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be greater than 0" },
                    valueAsNumber: true,
                  })}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                {...register("date", { required: "Fecha requerida" })}
                type="datetime-local"
                label="Fecha"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            </Grid>
          </Grid>
          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              {...register("categorie_id", {
                required: "Category is required",
              })}
              error={!!errors.categorie_id}
              helperText={errors.categorie_id?.message}
            >
              <MenuItem value={1}>Concert</MenuItem>
              <MenuItem value={3}>Conference</MenuItem>
              <MenuItem value={2}>Game</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            size="small"
            sx={{
              height: 40,
              width: "100%",
              mt: 2,
              bgcolor: "#E5514C",
              borderRadius: 3,
              border: "1px solid #E5514C", // Cambia el fondo a rojo al pasar el mouse
              color: "white",
              fontSize: { md: "1rem", xs: ".8rem" },
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "transparnt", // Cambia el fondo a rojo al pasar el mouse
                color: "#E5514C",
              },
            }}
          >
            CREATE
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default EventFormView;

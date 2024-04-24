import { Box, Typography } from "@mui/material";
import { getImageSrc } from '@/helpers/imageHelper';
import { ImageUploaderProps } from "@/types/ImageUploaderProps";

const ImageUploader = ({
  imagen,
  fileName,
  setFileName,
  setImage,
  register,
  errors,
}: ImageUploaderProps) => {
  return (
    <form
      className="form-img-add"
      onClick={() => (document.querySelector(".input-img") as HTMLInputElement)?.click()}
      onChange={(event) => {
        const { files } = event.target as HTMLInputElement;
        files?.[0] && setFileName(files[0].name);
        if (files) {
          setImage(URL.createObjectURL(files[0]));
        }
      }}
    >
      <input
        type="file"
        accept="image/*"
        required
        className="input-img"
        hidden
        {...register("imagen", {})}
        error={!!errors?.imagen}
        helperText={errors?.imagen?.message}
      />
      {imagen ? (
        <Box
          component="img"
          src={getImageSrc(imagen)}
          sx={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
            borderRadius: { xs: 2, md: 5 },
            position: "relative",
          }}
          alt={fileName}
        />
      ) : (
        <>
          <Box
            component="i"
            color="white"
            fontSize={40}
            sx={{
              height: "250px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontFamily: "poppins", color: "white" }}>
              Subir una imagen..
            </Typography>
          </Box>
        </>
      )}
    </form>
  );
};

export default ImageUploader;

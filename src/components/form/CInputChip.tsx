import { Controller } from "react-hook-form";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { CInputChipProps } from "@/types/CInputChipProps";

const CInputChip = ({
  // name,
  control,
  // label,
  // rules,
  errors,
  lista,
  checked,
  setChecked,
}: CInputChipProps) => (
  <div>
    <Controller
      name="categoria"
      control={control}
      rules={{ required: "Categoría es requerida" }}
      render={({ field }) => (
        <RadioGroup
          {...field}
          row
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="hide-radio-button"
        >
          {lista.map((categoria) => (
            <FormControlLabel
              key={categoria.id}
              value={categoria.id}
              control={<Radio />}
              label={categoria.nombre}
              className="hide-radio-button"
              sx={{
                bgcolor: checked === categoria.id ? "lightgreen" : "green",
                p: 1,
                borderRadius: "15px",
                m: 1,
                color: "white",
              }}
              onClick={() => {
                setChecked(categoria.id);
              }}
            />
          ))}
        </RadioGroup>
      )}
    />
    {errors?.categoria && <p>{errors.categoria.message}</p>}
  </div>
);

export default CInputChip;

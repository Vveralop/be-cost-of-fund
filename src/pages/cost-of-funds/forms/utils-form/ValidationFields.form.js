import React from "react";
import { Controller } from "react-hook-form";
import CustomTextField from "../../../../components/forms/custom-elements/CustomTextField";

const ValidationFieldForm = ({ control, errors }) => {
  return (
    <>
      <div>
        <Controller
          name="minStartTenor"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <CustomTextField
              id="minStartTenor"
              size="small"
              type="text"
              variant="outlined"
              sx={{ display: "none" }}
              disabled
              InputLabelProps={{ shrink: true }}
              fullWidth
              {...field}
              error={errors.minStartTenor ? true : false}
              helperText={errors.minStartTenor?.message}
            />
          )}
        />
        </div>
 
        <div>
        <Controller
          name="maxStartTenor"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <CustomTextField
              id="maxStartTenor"
              size="small"
              type="text"
              variant="outlined"
              sx={{ display: "none" }}
              disabled
              InputLabelProps={{ shrink: true }}
              fullWidth
              {...field}
              error={errors.maxStartTenor ? true : false}
              helperText={errors.maxStartTenor?.message}
            />
          )}
        />
      </div>
      <div>
        <Controller
          name="maxEndTenor"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <CustomTextField
              id="maxEndTenor"
              size="small"
              type="text"
              variant="outlined"
              sx={{ display: "none" }}
              disabled
              InputLabelProps={{ shrink: true }}
              fullWidth
              {...field}
              error={errors.maxEndTenor ? true : false}
              helperText={errors.maxEndTenor?.message}
            />
          )}
        />
     </div>
     <div>
        <Controller
          name="minNotional"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <CustomTextField
              id="minNotional"
              size="small"
              type="text"
              variant="outlined"
              sx={{ display: "none" }}
              disabled
              InputLabelProps={{ shrink: true }}
              fullWidth
              {...field}
              error={errors.minNotional ? true : false}
              helperText={errors.minNotional?.message}
            />
          )}
        />
      </div>
      <div>
        <Controller
          name="maxNotional"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <CustomTextField
              id="maxNotional"
              size="small"
              type="text"
              variant="outlined"
              sx={{ display: "none" }}
              disabled
              InputLabelProps={{ shrink: true }}
              fullWidth
              {...field}
              error={errors.maxNotional ? true : false}
              helperText={errors.maxNotional?.message}
            />
          )}
        />
       </div>
    </>
  );
};

export default ValidationFieldForm;

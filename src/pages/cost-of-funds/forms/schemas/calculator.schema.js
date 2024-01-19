import * as Yup from "yup";
import parseTenorDate from "../../../../utils/parseTenorDate";

const tenorRegex = /^(\d+[Yy])?(\d+[Mm])?(\d+[Ww])?(\d+[Dd])?$/;

const calculatorSchema = (isRequired) => {
  return Yup.object().shape({
    curve_index: Yup.string(),
    product_name: Yup.string(),
    start_tenor: Yup.string()
      .required("Campo obligatorio")
      .matches(tenorRegex, "Debe ingresar un tenor válido"),
    end_tenor: isRequired
      ? Yup.string()
          .required("Campo obligatorio")
          .matches(tenorRegex, "Plazo inválido")
      : Yup.string().matches(tenorRegex, "Plazo inválido"),
    start_date: Yup.date(),
    end_date: Yup.date(),
    rate: Yup.string().max(25, "No debe exceder los 25 caracteres."),
    structure: Yup.string().max(25, "No debe exceder los 25 caracteres."),
    currency: Yup.string().max(25, "No debe exceder los 25 caracteres."),
    frecuency_payment: Yup.string()
      .required("Campo obligatorio")
      .max(50, "No debe exceder los 50 caracteres."),
    spread: Yup.number()
      .typeError("Spread comercial debe ser un valor positivo")
      .min(0, "Spread comercial debe ser un valor positivo")
      .max(20, "Spread comercial no debe ser mayor a 20%")
      // .transform((value) => (isNaN(value) ? undefined : value))
      .required("Campo obligatorio"),
    notional: Yup.string()
      .transform((value) => (isNaN(value) ? value : value))
      .required("Campo obligatorio"),
    minStartTenor: Yup.string(),
    maxStartTenor: Yup.string(),
    maxEndTenor: Yup.string(),
    minNotional: Yup.string(),
    maxNotional: Yup.string(),
  });
};

export default calculatorSchema;

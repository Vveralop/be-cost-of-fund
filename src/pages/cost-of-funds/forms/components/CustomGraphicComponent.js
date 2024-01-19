import React, { useState, useMemo, useCallback, useEffect } from "react";
import SimpleBar from "simplebar-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Grid ,useMediaQuery} from "@mui/material";

// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { es } from "date-fns/locale";
import CustomDropdownSelect from "../../../../components/forms/custom-elements/custom-dropdown-select/CustomDropdownSelect";
import CustomTextField from "../../../../components/forms/custom-elements/CustomTextField";
import Typography from "../../../../themes/overrides/Typography";
import { groupDatesFromProfile } from "../../../../utils/groupDatesFromProfile";
import { DatePicker } from "@mui/x-date-pickers";

const CustomGraphicComponent = ({ rows }) => {
  const [entries, setEntries] = useState(rows);
  const [labels, setLabels] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [monthlyValues, setMonthlyValues] = useState(null);
  const [quarterly, setQuarterly] = useState([]);
  const [quarterlyValues, setQuarterlyValues] = useState(null);
  const [annual, setAnnual] = useState([]);
  const [annualValues, setAnnualValues] = useState(null);
  const [dataValues, setDataValues] = useState([]);
  const [dateFromSelect, setDateFromSelect] = useState(null);
  const [dateToSelect, setDateToSelect] = useState(null);

  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const filteredEntries = entries.filter((payment)=>{
    let min;
    let max;

    if(dateFromSelect && dateToSelect){
   
      min = Date.parse(dateFromSelect);
      max = Date.parse(dateToSelect);


      return (Date.parse(payment.date) >= min && Date.parse(payment.date) <= max);
    }

    return payment;
  })

  const groupingDates = useMemo(() => {
    const dateGrouped = groupDatesFromProfile(filteredEntries);

    console.log("dateGrouped", dateGrouped);
    setMonthly(dateGrouped.monthly.labels);
    setMonthlyValues(dateGrouped.monthly);
    setQuarterly(dateGrouped.quarterly.labels);
    setQuarterlyValues(dateGrouped.quarterly);
    setAnnual(dateGrouped.annual.labels);
    setAnnualValues(dateGrouped.annual);

    // init values
    setLabels(dateGrouped.monthly.labels);
    setDataValues(dateGrouped.monthly);
  }, [entries,dateFromSelect,dateToSelect]);

  const data = {
    labels,
    datasets: [
      {
        label: "Desembolso",
        data: dataValues.disbursements ? dataValues.disbursements.map((el)=> -el) : labels.map(() => 0),
        backgroundColor: "#003399",
        borderRadius: 10,
      },
      {
        label: "Amortización",
        data: dataValues.redemptions ? dataValues.redemptions : labels.map(() => 0),
        backgroundColor: "#EC7000",
        borderRadius: 10,
      },
    ],
  };

  const options = {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 5,
            boxHeight: 5,
          },
        },
        title: {
          display: true,
          text: "Chart.js Bar Chart",
        },
      },
    },
  };

  const _typesGroup = [
    {
      id: 0,
      label: "Anual",
    },
    {
      id: 1,
      label: "Mensual",
    },
    {
      id: 2,
      label: "Trimestral",
    },
  ];

  const handleSelect = (option) => {
    if (option == null) {
      setLabels([]);
      setDataValues(null);
    }
    console.log(option);
    if (option) {
      if (option.value === 0) {
        setLabels(annual);
        setDataValues(annualValues);
      } else if (option.value === 1) {
        setLabels(monthly);
        setDataValues(monthlyValues);
      } else {
        setLabels(quarterly);
        setDataValues(quarterlyValues);
      }
    }
  };

  const userLocale = {
    ...es,
    dateFormat: "dd/MM/yyyy",
    firstDayOfWeek: 1,
  };

  return (
    <Grid container spacing={1}>
      <Grid item lg={6} md={6} sm={12} sx={{ mt: 1, mb: 1 }}>
        <CustomDropdownSelect
          customLabel={"Tipos de agrupación"}
          small
          options={_typesGroup.map((el) => {
            return {
              label: el.label,
              value: el.id,
            };
          })}
          onSelect={handleSelect}
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} sx={{ mb: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={userLocale}>
          <DemoContainer components={["DatePicker", "DatePicker"]} sx={{...(matchDownXL && {height:"48px"})}}>
            <DemoItem component="DateRangePicker">
              <DatePicker
                label="Desde"
                value={dateFromSelect}
                onChange={(newValue) => {
                  console.log("FromValueIn", newValue);
                  setDateFromSelect(newValue)
                }}
                sx= {
                  {
                    '.MuiSvgIcon-root': {
                      width:"0.875rem",
                      height:"0.875rem"
                    },
                    '.MuiInputLabel-root': {
                      top:-1,
                    },
                    [theme.breakpoints.down("xl")]: {
                      // height: "38px",
                      // fontSize: "12px",
                      '.MuiOutlinedInput-input':{
                        padding:"5px 12px 8px 10px"
                      },
                      '.MuiInputLabel-root': {
                        top:-5,
                      },
                      '.MuiInputLabel-shrink': {
                        top:1,
                      },
                    },
                  }
                }
                
                
              />
            </DemoItem>
            <DemoItem  component="DateRangePicker">
              <DatePicker
                label="Hasta"
                value={dateToSelect}
                onChange={(newValue) => {
                  console.log("toValueIn", newValue);
                  setDateToSelect(newValue)
                }}
                sx= {
                  {
                    '.MuiSvgIcon-root': {
                      width:"0.875rem",
                      height:"0.875rem"
                    },
                    '.MuiInputLabel-root': {
                      top:-1,
                    },
                    [theme.breakpoints.down("xl")]: {
                      '.MuiOutlinedInput-input':{
                        padding:"5px 12px 8px 10px"
                      },
                      '.MuiInputLabel-root': {
                        top:-5,
                      },
                      '.MuiInputLabel-shrink': {
                        top:1,
                      },
                    },
                  }
                }
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
   
      <Grid item lg={12} md={12} sm={12} sx={{ mt: 2, mb: 1 }}>
      <SimpleBar style={{ height: "100%", maxHeight: matchDownXL ? 195 :"100%" }}>
        <Bar options={options} data={data} />
        </SimpleBar>
      </Grid>
    </Grid>
  );
};

export default CustomGraphicComponent;

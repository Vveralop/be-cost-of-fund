export default function parseFrecuencyPayment(str) {
 
    switch (str) {
        case "Daily":
          return {
            value:"Daily",
            name:"Diario"
          }
          break;
        case "Biweekly":
          return {
            value:"Biweekly",
            name:"Quincenal"
          }
          break;
        case "Bimonthly":
          return {
            value:"Bimonthly",
            name:"Bimensual"
          }
          break;
        case "EveryFourthMonth":
          return {
            value:"EveryFourthMonth",
            name:"Cada cuarto mes"
          }
          break;
        case "EveryFourthWeek":
          return {
            value:"EveryFourthWeek",
            name:"Cada cuarta semana"
          }
          break;
        case "Weekly":
          return {
            value:"Weekly",
            name:"Semanal"
          }
          break;
        case "Monthly":
          return {
            value:"Monthly",
            name:"Mensual"
          }
          break;
        case "Quarterly":
          return {
            value:"Quarterly",
            name:"Trimestral"
          }
          break;
        case "Semiannual":
          return {
            value:"Semiannual",
            name:"Semestral"
          }
          break;
        case "Annual":
          return {
            value:"Annual",
            name:"Anual"
          }
          break;
        case "NoFrequency":
          return {
            value:"NoFrequency",
            name:"Sin frecuencia"
          }
          break;
        case "Once":
          return {
            value:"Once",
            name:"Una vez"
          }
          break;
        case "OtherFrequency":
          return {
            value:"OtherFrequency",
            name:"Otra frecuencia"
          }
          break;
        case "Days":
          return {
            value:"Days",
            name:"Días"
          }
          break;
        case "Months":
          return {
            value:"Months",
            name:"Meses"
          }
          break;
        case "Weeks":
          return {
            value:"Weeks",
            name:"Semanas"
          }
          break;
        case "Years":
          return {
            value:"Years",
            name:"Años"
          }
          break;
        case "NullCalendar":
          return {
            value:"NullCalendar",
            name:"Calendario nulo"
          }
          break;
      
        default:
          return {
            value:"",
            name:""
          }
          break;
      }
}
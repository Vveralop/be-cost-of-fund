export default function stringParseFrecuencyPayment(str) {
  switch (str) {
    case "Daily":
      return "Diario";
      break;
    case "Biweekly":
      return "Quincenal";
      break;
    case "Bimonthly":
      return "Bimensual";
      break;
    case "EveryFourthMonth":
      return "Cada cuarto mes";
      break;
    case "EveryFourthWeek":
      return "Cada cuarta semana";
      break;
    case "Weekly":
      return "Semanal";
      break;
    case "Monthly":
      return "Mensual";
      break;
    case "Quarterly":
      return "Trimestral";
      break;
    case "Semiannual":
      return "Semestral";
      break;
    case "Annual":
      return "Anual";
      break;
    case "NoFrequency":
      return "Sin frecuencia";
      break;
    case "Once":
      return "Una vez";
      break;
    case "OtherFrequency":
      return "Otra frecuencia";
      break;
    case "Days":
      return "Días";
      break;
    case "Months":
      return "Meses";
      break;
    case "Weeks":
      return "Semanas";
      break;
    case "Years":
      return "Años";
      break;
    case "NullCalendar":
      return "Calendario nulo";
      break;

    default:
      return str;
      break;
  }
}

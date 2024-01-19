import {
  isValid,
  parse,
  format,
  addQuarters,
  addMonths,
  getYear,
  getQuarter,
} from "date-fns";

export function groupDatesFromProfile(entries) {
  console.log(entries);
  const dateGroups = {
    monthly: { labels: [], disbursements: [], redemptions: [] },
    quarterly: { labels: [], disbursements: [], redemptions: [] },
    annual: { labels: [], disbursements: [], redemptions: [] },
  };

  entries.forEach((entry) => {
    console.log("entryDate", entry.date);
    console.log("entryDateSplit", entry.date.split("-"));
    const formatDate = entry.date.split("-");
    const date = new Date(
      formatDate[1] + "-" + formatDate[2] + "-" + formatDate[0]
    );
    console.log("date", date);
    const month = format(date, "MMMM");
    const quarter = format(addQuarters(date, 1), "q");
    const year = format(date, "yyyy");

    // Monthly grouping
    const monthlyLabel = `${month.substring(0, 3)}-${year.substring(2)}`;
    const monthlyIndex = dateGroups.monthly.labels.indexOf(monthlyLabel);

    if (monthlyIndex === -1) {
      dateGroups.monthly.labels.push(monthlyLabel);
      dateGroups.monthly.disbursements.push(entry.disbursement);
      dateGroups.monthly.redemptions.push(entry.redemption);
    } else {
      dateGroups.monthly.disbursements[monthlyIndex] += entry.disbursement;
      dateGroups.monthly.redemptions[monthlyIndex] += entry.redemption;
    }

    //Quarterly grouping
    const totals = {};

    entries.forEach((entry) => {
        const formatDate = entry.date.split("-");
    const date = new Date(
      formatDate[1] + "-" + formatDate[2] + "-" + formatDate[0]
    );
    //   const date = parse(entry.date, "dd-MM-yyyy", new Date());
      const year = getYear(date);
      const trimester = getQuarter(date);

      const key = `${year}-Q${trimester}`;

      if (!totals[key]) {
        totals[key] = {
          disbursement: 0,
          redemption: 0,
        };
      }

      totals[key].disbursement += entry.disbursement;
      totals[key].redemption += entry.redemption;
    });

    const labels = Object.keys(totals);
    const disbursements = labels.map((label) => totals[label].disbursement);
    const redemptions = labels.map((label) => totals[label].redemption);

    const quarterly = {
      labels,
      disbursements,
      redemptions,
    };

    Object.assign(dateGroups, { quarterly: quarterly });

    // Annual grouping
    const annualIndex = dateGroups.annual.labels.indexOf(year);
    if (annualIndex === -1) {
      dateGroups.annual.labels.push(year);
      dateGroups.annual.disbursements.push(entry.disbursement);
      dateGroups.annual.redemptions.push(entry.redemption);
    } else {
      dateGroups.annual.disbursements[annualIndex] += entry.disbursement;
      dateGroups.annual.redemptions[annualIndex] += entry.redemption;
    }
  });

  return dateGroups;
}

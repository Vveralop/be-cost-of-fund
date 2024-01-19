// ==============================|| DEFAULT THEME - TYPOGRAPHY  ||============================== //

const Typography = (fontFamily) => ({
  htmlFontSize: 16,
  fontFamily,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  h1: {
    fontWeight: 600,
    fontSize: "2.375rem",
    lineHeight: 1.21,
  },
  h2: {
    fontWeight: 600,
    fontSize: "1.875rem",
    lineHeight: 1.27,
  },
  h3: {
    fontWeight: 600,
    fontSize: "1.5rem",
    lineHeight: 1.33,
  },
  h4: {
    fontWeight: 600,
    fontSize: "1.25rem",
    lineHeight: 1.4,
  },
  h5: {
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: 1.5,
  },
  h6: {
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: 1.57,
  },
  // ITAU PAT TYPOGRAPHY
  titlePage: {
    fontWeight: 700,
    fontSize: "1.75rem", // 28px
    lineHeight: 1.21, // normal - 100-120%
  },
  subtitlePage: {
    fontWeight: 400,
    fontSize: "1.125rem", // 18px
    lineHeight: 1.5, // 24px - 133.33%
  },
  itemBreadcrumb: {
    fontWeight: 400,
    fontSize: "0.875rem", // 14px
    lineHeight: 1.25, // 20px - 142.857%
  },
  titleBreadcrumb: {
    fontWeight: 700,
    fontSize: "0.875rem", // 14px
    lineHeight: 1.25, // 20px - 142.857%
  },
  normal12:{
    fontWeight: 400,
    fontSize: "0.75rem", // 12px
    lineHeight: 0.75, // 12px - 100%
  },
  normalBold12:{
    fontWeight: 700,
    fontSize: "0.75rem", // 12px
    lineHeight: 0.75, // 12px - 100%
  },
  normal14:{
    fontWeight: 400,
    fontSize: "0.875rem", // 14px
    lineHeight: 0.875, // 14px - 100%
  },
  normal14lh20:{
    fontWeight: 400,
    fontSize: "0.875rem", // 14px
    lineHeight: 1.25, // 20px - 142.857%
  },
  normalBold14:{
    fontWeight: 700,
    fontSize: "0.875rem", // 14px
    lineHeight: 0.875, // 14px - 100%
  },
  normal16:{
    fontWeight: 400,
    fontSize: "1rem", // 16px
    lineHeight: 1.375, // 22px - 137.5%
  },
  normalBold16:{
    fontWeight: 700,
    fontSize: "1rem", // 16px
    lineHeight: 1.125, // 22px - 137.5%
  },
  normal18:{
    fontWeight: 400,
    fontSize: "1.125rem", // 18px
    lineHeight: 1.5, // 24px - 133.33%
  },
  normalBold18:{
    fontWeight: 700,
    fontSize: "1.125rem", // 18px
    lineHeight: 1.5, // 24px - 133.33%
  },
  normalBold20:{
    fontWeight: 700,
    fontSize: "1.25rem", // 20px
    lineHeight: 1.25, // 14px - 100%
  },
  normalBold28:{
      fontWeight: 700,
      fontSize: "1.75rem", // 28px
      lineHeight: 1.21, // normal - 100-120%
  },

  display14:{ // ADD -> font-family:Roboto
    fontWeight: 400,
    fontSize: "0.875rem", // 14px
    lineHeight: 0.875, // 14px - 100%
  },
  displaySemiBold14:{ // ADD -> font-family:Roboto
    fontWeight: 600,
    fontSize: "0.875rem", // 14px
    lineHeight: 0.875, // 14px - 100%
  },
  display18:{ // ADD -> font-family:Roboto
    fontWeight: 400,
    fontSize: "1.125rem", // 18px
    lineHeight: 1.125, // 18px - 100%
  },
  displaySemiBold18:{ // ADD -> font-family:Roboto
    fontWeight: 600,
    fontSize: "1.125rem", // 18px
    lineHeight: 1.125, // 18px - 100%
  },
  display20:{ // ADD -> font-family:Roboto
    fontWeight: 400,
    fontSize: "1.25rem", // 20px
    lineHeight: 1.25, // 20px - 100%
  },
  displaySemiBold20:{ // ADD -> font-family:Roboto
    fontWeight: 600,
    fontSize: "1.25rem", // 20px
    lineHeight: 1.25, // 20px - 100%
  },
  displayBold20:{ // ADD -> font-family:Roboto
    fontWeight: 700,
    fontSize: "1.25rem", // 20px
    lineHeight: 1.25, // 14px - 100%
  },
  displayBold28:{ // ADD -> font-family:Roboto
    fontWeight: 700,
    fontSize: "1.75rem", // 28px
    lineHeight: 1.75, // 28px - 100%
  },
  // OLD STYLES
  menuTitleText12: {
    fontWeight: 400,
    fontSize: "0.75rem", // 12px
    lineHeight: "16px",
  },
  menuTitleText: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "16px",
  },
  appBarTextLight: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "14px",
  },
  appBarTextBold: {
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "20px",
  },

  titleH4: {
    fontWeight: 700,
    fontSize: "1.125rem",
    lineHeight: 1.4,
  },
  subtitle12: {
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: 1.25,
  },
  subtitle16: {
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: 1.66,
  },
  titleDialog: {
    fontSize: "22px",
    fontWeight: 700,
    lineHeight: "normal",
  },
  subTitleDialog: {
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "22px",
  },
  titleExeption: {
    fontWeight: 700,
    fontSize: "1.5rem",
    lineHeight: 1.66,
  },
  titleCard: {
    fontWeight: 700,
    fontSize: "1.125rem",
    lineHeight: 1.66,
  },
  caption: {
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: 1.66,
  },
  body1: {
    fontSize: "0.875rem",
    lineHeight: 1.57,
  },
  body2: {
    fontSize: "0.75rem",
    lineHeight: 1.66,
  },
  subtitle1: {
    fontSize: "0.875rem",
    fontWeight: 600,
    lineHeight: 1.57,
  },
  subtitleWhite: {
    fontSize: "0.875rem",
    color: "#ffffff",
    fontWeight: 600,
    lineHeight: 1.57,
  },
  subtitle2: {
    fontSize: "0.75rem",
    fontWeight: 500,
    lineHeight: 1.66,
  },
  subtitleCard: {
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "16px",
  },
  overline: {
    lineHeight: 1.66,
  },
  textButton: {
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: 1.66,
  },
  textButtonSmall: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: 1.66,
  },
  customTextButton: {
    fontSize: "14px",
    fontWeight: 700,
    lineHeight: 1.66,
  },
  button: {
    textTransform: "capitalize",
  },
});

export default Typography;

import React from "react";
import {useNavigate} from "react-router-dom";
import {
  useMsal,
} from "@azure/msal-react";
import PageContainer from "../../components/PageContainer";
import { Grid } from "@mui/material";
import BannerMainXl from "../../assets/images/banner/banner-1-xl-home.svg";
import MailItauImage from "../../assets/images/mail-itau-image.svg";
import PageItauImage from "../../assets/images/page-itau-image.svg";
import SearchItauImage from "../../assets/images/search-itau-image.svg";
import CardBannerXL from "../../components/cards/CardBannerXL";
import CardCustomMD from "../../components/cards/CardCustomMD";
import CardCustomXL from "../../components/cards/CardCustomXL";

const Home = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const navigate = useNavigate();
  console.log("activeAccount",activeAccount)

  const redirectToLogin = () => {
    navigate("/login");
  }


  if(!activeAccount){
    redirectToLogin();
  }
 


  return (
    <PageContainer title="PAT - Inicio">
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <CardBannerXL
            title="Banner-main-xl"
            url={BannerMainXl}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <CardCustomMD
            url={MailItauImage}
            title="Lorem ipsum dolor"
            subtitle="Nam eleifend felis in semper varius. Praesent convallis
                    porta elit nec faucibus."
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <CardCustomMD
            url={PageItauImage}
            title="Lorem ipsum dolor"
            subtitle="Nam eleifend felis in semper varius. Praesent convallis
                    porta elit nec faucibus."
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <CardCustomXL
            url={SearchItauImage}
            title="Lorem ipsum dolor"
            subtitle="Nam eleifend felis in semper varius. Praesent convallis
                    porta elit nec faucibus."
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Home;

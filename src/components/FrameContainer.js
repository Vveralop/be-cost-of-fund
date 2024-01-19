import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  IconBuutton,
  CardHeader,
  Button,
  IconButton,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Breadcrumb from "../layout/breadcrumb/Breadcrumb";

const FrameContainer = ({ BCItems, title, to, children }) => (
  <>
    <Breadcrumb title={title} items={BCItems} />
    <Card>
      <CardHeader
        action={
            <div
                style={{marginRight:"15px"}}
            >

          <IconButton aria-label="settings">
            {
              <Button variant="contained" size="small" component={Link} to={to}>
                Cotizar
              </Button>
            }
          </IconButton>
            </div>
        }
      />
    
    <CardContent>
      <Box
        sx={{
          overflow: {
            xs: "auto",
            sm: "unset",
          },
        }}
      >
        <div>{children}</div>
      </Box>
    </CardContent>
    </Card>
  </>
);

FrameContainer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default FrameContainer;

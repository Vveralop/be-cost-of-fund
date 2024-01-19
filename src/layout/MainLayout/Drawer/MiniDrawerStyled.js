// Material-ui
import { styled,useTheme } from '@mui/material/styles';
import { Drawer, useMediaQuery } from "@mui/material";

// Project import
import { drawerWidth } from './../../../config.js';

const openedMixin = (theme) => {

    console.log(theme.breakpoints.down("xl")); 

    return ({
        width: drawerWidth,
        [theme.breakpoints.down("xl")]:{
            width: 180
        },
        backgroundColor:'#FFFFFF',
        borderRight: 'none',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
        overflowX: 'hidden',
        boxShadow: 'none'
    })

};

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor:'#FFFFFF',
    overflowX: 'hidden',
    width: 120,
    [theme.breakpoints.down("xl")]:{
        width: 90
    },
    borderRight: 'none',
    boxShadow: 'none'
});

// ==============================|| DRAWER - MINI STYLED ||============================== //

const MiniDrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
    [theme.breakpoints.down("xl")]:{
        width: 180
    },
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme)
    })
}));

export default MiniDrawerStyled;
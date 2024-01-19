// Material-ui
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';

// Project import
import { drawerWidth } from '../../../config.js';

// ==============================|| HEADER - APP BAR STYLED ||============================== //


const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => {
    return ({
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor:"#E6E6E7",
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: `calc(100% - ${120}px)`,
        [theme.breakpoints.down("xl")]:{
            width: `calc(100% - ${90}px)`,
            height: "65px",
        },
        height:"80px",
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            [theme.breakpoints.down("xl")]:{
                width: `calc(100% - ${180}px)`,
                height: "65px",
            },
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        })
    })
});

export default AppBarStyled;
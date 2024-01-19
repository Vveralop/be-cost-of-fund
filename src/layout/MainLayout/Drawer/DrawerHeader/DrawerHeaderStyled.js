// Material-ui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ==============================|| DRAWER HEADER - STYLED ||============================== //

const DrawerHeaderStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    borderTopRightRadius:24,
    backgroundColor:"#001E4F", // BACKGROUND COLOR DRAWER HEADER
    justifyContent: open ? 'center' : 'center',
    paddingLeft: theme.spacing(open ? 0 : 0)
}));

export default DrawerHeaderStyled;
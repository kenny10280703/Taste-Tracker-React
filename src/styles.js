import { styled } from '@mui/material/styles';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { CardMedia, TextField, Typography, TableCell } from '@mui/material';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

/* Defines custom styled components */

export const MyContainer = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 0, 6),
  }));
  
  export const MyTitle = styled(Typography)(({ theme }) => ({
    position: 'absolute',
    left: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
    zIndex: 1,
    fontSize: '3rem', // default font size
    [theme.breakpoints.up('sm')]: {
        fontSize: '4rem', // font size for small screens and up
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '5rem', // font size for medium screens and up
    },
    top: '25vh', // default position
    [theme.breakpoints.up('sm')]: {
        top: '19vh', // position for small screens and up
    },
    [theme.breakpoints.up('md')]: {
        top: '15vh', // position for medium screens and up
    },
}));

export const MySlogan = styled(Typography)(({ theme }) => ({
    position: 'absolute',
    left: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF',
    zIndex: 1,
    fontSize: '3rem', // default font size
    [theme.breakpoints.up('sm')]: {
      fontSize: '4rem', // font size for small screens and up
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '5rem', // font size for medium screens and up
    },
}));

export const MyFrontImage = styled(CardMedia)({
    height: '100%',
    filter: 'brightness(70%)',
});

export const MyIconButton = () => {
    return (
        <IconButton component={Link} to='/' sx={{
            borderRadius: 1,
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            ":hover": { backgroundColor: "rgba(255, 255, 255, 0.04)" },
            "& .MuiTouchRipple-root .MuiTouchRipple-child": {
              borderRadius: "8px"
            }}}>
            <RestaurantIcon fontSize='large' sx={{  color: '#F45152', marginRight: '5px' }}/>
            <Typography variant="h2" color='secondary' >
               TasteTracker
            </Typography>
        </IconButton>
    )
};

export const MySearch = styled(TextField)({
    ml: '20px', 
    width: '10vw',
    color: '#FFFFFF',
});

export const MyCard = styled('Card')(({ theme }) => ({
    boxShadow: '3px 3px 10px grey',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
}));

export const MyCardMedia = styled('CardMedia')(({ theme }) => ({
    paddingTop: '56.25%', // 16:9
}));

export const MyCardContent = styled('CardContent')(({ theme }) => ({
    flexGrow: 1,
}));

export const MyBold = styled('Typography')(({ theme }) => ({
    fontWeight: 'bold',
}));

export const MyTableCell = (props) => (
    <TableCell sx={{paddingY: '4px'}} {...props} />
);

export default MyIconButton;
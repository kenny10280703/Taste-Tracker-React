import { createTheme, responsiveFontSizes } from '@mui/material';

/* Sets the theme of the website */

const theme = createTheme({
    palette: {
        primary: {
            main: '#1F1F1F',
        },
        secondary: {
            main: '#FFFFFF',
        }
    },
    typography: {
        h1: {
            fontSize: '3rem',
            fontWeight: 600,
        },
        h2: {
            fontSize: '1.75rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 600,
        }
    }
});

export default responsiveFontSizes(theme);
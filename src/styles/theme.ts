import { createMuiTheme } from '@material-ui/core/styles';
import { blue, indigo } from '@material-ui/core/colors';

export default createMuiTheme({
  breakpoints: {
    values: {
      lg: 1200,
      md: 960,
      sm: 768,
      xl: 1920,
      xs: 500
    }
  },
  palette: {
    secondary: {
        main: blue[900]
    },
    primary: {
        main: indigo[700]
    }
  },
  typography: {
      // Use the system font instead of the default Roboto font.
      fontFamily: [
          '"Lato"',
          'sans-serif'
      ].join(',')
  }
});

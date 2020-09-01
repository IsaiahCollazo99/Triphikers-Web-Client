import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#FF832B',
        light: '#ffa533',
        dark: '#b26400'
      },
      secondary: {
        main: '#0091ea',
        light: '#33a7ee',
        dark: '#0065a3'
      }
    }
});

export default theme;
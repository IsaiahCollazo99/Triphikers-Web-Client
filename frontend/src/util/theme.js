import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#ff8f00',
        light: '#ffa533',
        dark: '#b26400'
      },
      secondary: {
        main: '#82F0F2',
        light: '#9bf3f4',
        dark: '#5ba8a9'
      }
    }
});

export default theme;
import { TextField, InputBase } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const CustomTextField = withStyles({
    root: {
        '& label': {
          color: 'black',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#0065a3',
          },
          '&:hover fieldset': {
            borderColor: '##003F65',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#FF832B',
          },
        },
      },
})(TextField);

export const CustomInputBase = withStyles({
  root: {
    '& label': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#0065a3',
      },
      '&:hover fieldset': {
        borderColor: '##003F65',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FF832B',
      },
    },
  }
})(InputBase);

export default CustomTextField;
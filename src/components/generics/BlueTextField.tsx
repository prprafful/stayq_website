import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

// export const BlueTextField = withStyles({
//   root: {
//     '& label.Mui-focused': {
//       color: '#319CE5',
//     },
//     '& .MuiInput-underline:after': {
//       borderBottomColor: '#319CE5',
//     },
//     '& .MuiOutlinedInput-root': {
//       '& fieldset': {
//         borderColor: '#93B5D3',
//       },
//       '&:hover fieldset': {
//         borderColor: '#0684FC',
//       },
//       '&.Mui-focused fieldset': {
//         borderColor: '#319CE5',
//       },
//     },
//   },
// })(TextField);

export function BlueTextField(props) {
  return (
    <TextField
      {...props}
      style={{
        ...props.style,
        ...{
          border: '1px solid #319CE5',
        }
      }}
    />
  )
}

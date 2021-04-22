import { Button as MuButton } from '@material-ui/core';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    button: {
        
    }
})

function Button({
    children,
    ...props
}) {
    const classes = useStyles()

    return (
        <MuButton
            className={classes.button}
            {...props}
        >
            {children}
        </MuButton>
    )
}

export default Button;
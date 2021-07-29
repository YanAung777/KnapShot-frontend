import React from 'react';
import PropType from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
}));

export default function Tooltip(props) {
    const classes = useStyles();

    const { label, visible } = props;

    const [open, setOpen] = React.useState(visible);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            ContentProps={{ 'aria-describedby': 'message-id' }}
            message={<span id="message-id">{label}</span>}
            action={[
                <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    className={classes.close}
                    onClick={handleClose} >
                    <CloseIcon />
                </IconButton>,
            ]}
        />
    );
}

Tooltip.defaultProps = {
    label: "",
    visible: false
};

Tooltip.propTypes = {
    label: PropType.string.isRequired,
    visible: PropType.bool
}


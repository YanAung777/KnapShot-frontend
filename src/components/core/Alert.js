import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Alert = (props) => {

    const { visible, title, content, cancelLabel, submitLabel, onSubmit, onCancel } = props;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        onCancel();
    }

    const handleSubmit = () => {
        setOpen(false);
        onSubmit();
    }

    React.useEffect(() => {
        setOpen(visible);
    }, [visible]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="title"
            aria-describedby="description">
            <DialogTitle id="title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="description">{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">{cancelLabel}</Button>
                <Button onClick={handleSubmit} color="primary" autoFocus>{submitLabel}</Button>
            </DialogActions>
        </Dialog>
    );
}

Alert.defaultProps = {
    visible: true,
    title: "",
    content: "",
    cancelLabel: "Cancel",
    submitLabel: "Ok",
    onSubmit: () => { },
    onCancel: () => { }
}

Alert.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.string,
    cancelLabel: PropTypes.string,
    submitLabel: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func
}

export default Alert;
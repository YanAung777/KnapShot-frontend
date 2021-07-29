import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { Clear } from '@material-ui/icons';


function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

export default function DraggableConfirmBox({ getConfirm, styleProps, onSubmit, onCancel }) {
    const [open, setOpen] = React.useState(false);
    // const [confirm, setConfirm] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (condition) => {
        if (condition) onSubmit()
        else onCancel()
        setOpen(false);
    };

    return (
        <div>
            <Clear style={{ ...styleProps }} onClick={handleClickOpen} />
            <Dialog
                open={open}
                onClose={() => handleClose(false)}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Confirmation
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => handleClose(true)} color="primary">
                        Yes
                    </Button>
                    <Button onClick={() => handleClose(false)} color="primary">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

DraggableConfirmBox.defaultProps = {
    getConfirm: () => { },
    styleProps: {},
    onSubmit: () => { },
    onCancel: () => { }
}

DraggableConfirmBox.propTypes = {
    getConfirm: PropTypes.func,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    styleProps: PropTypes.object
}
import React, { Fragment, useState } from 'react';
import PropType from 'prop-types';
import { makeStyles, Popover, Typography, ButtonBase } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 0,
        padding: 0
    }
}));

export default function CustomPopOver(props) {
    const classes = useStyles();

    const { label, content } = props;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => {
        // console.log("enter")
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        // console.log("leave")
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div style={{ zIndex: 1 }} onMouseLeave={(e) => handleClose(e)}>
            <ButtonBase
                aria-describedby={id}
                onClick={handleClick}
                onMouseOver={(e) => handleClick(e)}
                className={classes.root}>
                {label}
            </ButtonBase>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {content}
            </Popover>
        </div>
    );
}

CustomPopOver.defaultProps = {

}

CustomPopOver.propType = {
    content: PropType.node.isRequired,
    label: PropType.node.isRequired
}
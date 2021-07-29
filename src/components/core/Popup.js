import React, { Fragment, useState } from 'react';
import PropType from 'prop-types';
import { makeStyles, Popover } from '@material-ui/core';



export default function Popup(props) {

    const { children, onClick } = props;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const id = open ? 'simple-popover' : undefined;

    return (
        <Fragment>
            {/* <ButtonBase aria-describedby={id} className={classes.root} {...props} />
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
                }} >
                {children}
            </Popover> */}
        </Fragment>
    );
}
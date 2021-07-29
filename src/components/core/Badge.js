import React from 'react';
import PropsTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    badge: {
        "backgroundColor": "lightgray",
        "padding": "4px 6px",
        "borderRadius": "20px",
        "fontSize": "13px",
        "width": "75px"
    }
}));

export default function Badge(props) {
    const classes = useStyles();
    const { label } = props;
    return (
        <span className={classes.badge} {...props}>{label}</span>
    )
}

Badge.defaultProps = {
    label: "",
}

Badge.propTypes = {
    label: PropsTypes.string.isRequired
}

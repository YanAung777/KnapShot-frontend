import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, InputBase, IconButton, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px 2px 10px',
        margin: "10px 0px",
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}));

export default function TextInput(props) {

    const classes = useStyles();

    const { label, value, icon, onChange } = props;

    return (
        <Paper component="form" className={classes.root}>

            <Typography>{label}</Typography>

            <InputBase
                className={classes.input}
                placeholder={label}
                inputProps={{ 'aria-label': label }}
                value={value}
                onChange={onChange}
                {...props}
            />

            <IconButton type="button" className={classes.iconButton} aria-label={label} >
                {icon}
            </IconButton>

        </Paper>
    );
}

TextInput.defaultProps = {
    label: "",
    value: "",
    onChange: () => { }
}

TextInput.propType = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    icon: PropTypes.node,
    onChange: PropTypes.func
}

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Button } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    button: {
        margin: '10px 0px',
        textTransform: 'capitalize',
        width: '100%',
        backgroundColor: '#fc9803',
        '&:hover': {
            backgroundColor: '#fc9803',
            color: '#FFF'
        }
    },
}));

export default function Btn(props) {
    const classes = useStyles();
    const { value, variant, onClick } = props;
    return (
        <Button
            variant={variant}
            className={classes.button}
            color="primary"
            onClick={onClick}
            {...props}>{value}</Button>
    );
}

Btn.defaultProps = {
    value: "",
    variant: "contained",
    onClick: () => { }
}

Btn.propType = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.string
}
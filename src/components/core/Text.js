import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    item: {
        color: grey[900],
        fontSize: 12,
    }
}));

export default function Text(props) {
    const classes = useStyles();
    const { value, onClick } = props;
    return (
        <>
            <Typography onClick={onClick} className={classes.item} {...props}>
                {value}
            </Typography>
            
        </>
    );
}

Text.defaultProps = {
    value: "",
    onClick: () => { }
}

Text.propType = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}
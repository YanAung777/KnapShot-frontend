import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, ButtonBase } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'transparent',
        border: `1px solid ${grey[300]}`,
        borderRadius: 10,
        minWidth: 120
    }
}));

export default function OutlineBtn(props) {
    const classes = useStyles();
    const { value, onClick, score } = props;
    return (
        <ButtonBase className={classes.root} {...props}>
            {score && score}
            {value}
        </ButtonBase>
    );
}

OutlineBtn.defaultProps = {
    value: "",
    onClick: () => { }
}

OutlineBtn.propType = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    score: PropTypes.node
}
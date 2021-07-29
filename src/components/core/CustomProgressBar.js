import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { LinearProgress, Typography } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

const BorderLinearProgress = withStyles({
    root: {
        height: 35,
        backgroundColor: 'lightgray'
    },
    bar: {
        backgroundColor: '#ec407a',
    },
})(LinearProgress);

const useStyles = makeStyles(theme => ({
    root: {
        margin: '5px 0',
        width: '100%'
    },
    percent: {
        color: "white",
        position: "absolute",
        top: 10,
        left: 10
    }
}));

export default function CustomProgressBar(props) {

    const classes = useStyles();

    const { value, tooltip, } = props;
    return (
        <div style={{ position: "relative" }}>
            {/* <Tooltip title={tooltip || value}> */}
                <BorderLinearProgress
                    className={classes}
                    variant="determinate"
                    color="primary"
                    value={value}
                />
            {/* </Tooltip> */}
            <Typography className={classes.percent} variant="caption" >{value}%</Typography>
        </div>
    );
}

CustomProgressBar.defaultProps = {
    value: 0,
    tooltip: ""
}

CustomProgressBar.propType = {
    value: PropTypes.number.isRequired,
    tooltip: PropTypes.string
}
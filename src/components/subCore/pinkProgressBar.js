import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';

const BorderLinearProgress = withStyles({
    root: {
        height: 10,
        borderRadius: 10,
        backgroundColor: 'lightgray'
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#ec407a',
    },
})(LinearProgress);

const useStyles = makeStyles(theme => ({
    root: {
        margin: '5px 0',
        width: '100%'
    }
}));

export default function AdvancedProgressBar(props) {

    const classes = useStyles();

    const { value, tooltip, onClick } = props;
    return (
        // <Tooltip title={tooltip || value} placement="top-start">
            <BorderLinearProgress
                className={classes}
                variant="determinate"
                color="primary"
                value={value}
                onClick={onClick}
            />
        // </Tooltip>
    );
}

AdvancedProgressBar.defaultProps = {
    value: 0,
    tooltip: "",
    onClick: () => { }
}

AdvancedProgressBar.propType = {
    value: PropTypes.number.isRequired,
    tooltip: PropTypes.string,
    onClick: PropTypes.func,
}
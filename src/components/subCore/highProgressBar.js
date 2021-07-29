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
        backgroundColor: '#70AD47',
    },
})(LinearProgress);

const useStyles = makeStyles(theme => ({
    root: {
        margin: '5px 0',
        width: '100%'
    }
}));

export default function HighProgressBar(props) {

    const classes = useStyles();

    const { value, tooltip,  } = props;
    return (
        <Tooltip title={tooltip || value}>
            <BorderLinearProgress
                className={classes}
                variant="determinate"
                color="primary"
                value={value}
            />
        </Tooltip>
    );
}

HighProgressBar.defaultProps = {
    value: 0,
    tooltip: ""
}

HighProgressBar.propType = {
    value: PropTypes.number.isRequired,
    tooltip: PropTypes.string
}
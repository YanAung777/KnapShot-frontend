import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';

//com
import FirstProgressBar from './firstProgressbar'
import SecondProgressBar from './secondProgressBar'
import ThirdProgressBar from './thrdProgressBar'
import FouthProgressBar from './fouthProgressBar'
import FifthProgressBar from './fifthProgressBar';
import SliderWithProgressBar from './SliderWithProgressBar'

const variantBar = {
    First: FirstProgressBar,
    Second: SecondProgressBar,
    Third: ThirdProgressBar,
    Fouth: FouthProgressBar,
    Fifth: FifthProgressBar,
    Slider: SliderWithProgressBar
};

const useStyles = makeStyles(theme => ({
    root: {
        margin: "5px 0",
        width: '100%'
    }
}))

export default function ProgressBar(props) {

    const classes = useStyles();

    const { value, tooltip, variant, onClick } = props;
    const Bar = variantBar[variant];
    return (
        <Tooltip title={tooltip || value}>
            <Bar value={value} tooltip={tooltip} onClick={onClick} />
        </Tooltip>
    );
}


ProgressBar.defaultProps = {
    value: 0,
    tooltip: "",
    variant: 'First',
    onClick: () => { }
}

ProgressBar.propType = {
    value: PropTypes.number.isRequired,
    tooltip: PropTypes.string,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['first', 'second', 'third', 'fouth', 'fifth', 'slider'])
} 

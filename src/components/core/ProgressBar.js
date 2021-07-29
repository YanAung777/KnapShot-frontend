import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';

//sub Core
import BasicProgressBar from '../subCore/basicProgressBar'
import HighProgressBar from '../subCore/highProgressBar'
import IntermediateProgressBar from '../subCore/intermediateProgressBar'
import AdvancedProgressBar from '../subCore/advancedProgressBar'
import pinkProgressBar from '../subCore/pinkProgressBar'
import DefaultProgressBar from '../subCore/defaultProgressBar';


const variantBar = {
    Basic: BasicProgressBar,
    Intermediate: HighProgressBar,
    High: IntermediateProgressBar,
    Advanced: AdvancedProgressBar,
    Pink: pinkProgressBar,
    Default: DefaultProgressBar
};


const BorderLinearProgress = withStyles(theme => ({
    root: {
        height: 10,
        borderRadius: 10,
        backgroundColor: 'lightgray'
    },
    bar: {
        borderRadius: 20,
        backgroundColor: "#3c3dbc",
    },
    // Basic: {
    //     borderRadius: 20,
    //     backgroundColor: "#000",
    // },
    // Intermediate: {
    //     borderRadius: 20,
    //     backgroundColor: "#70AD47",
    // },
    // High: {
    //     borderRadius: 20,
    //     backgroundColor: "#03B1F1",
    // },
    // Advanced: {
    //     borderRadius: 20,
    //     backgroundColor: "#4472C5",
    // },

})(LinearProgress));

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
    variant: 'Default',
    onClick: () => { }
}

ProgressBar.propType = {
    value: PropTypes.number.isRequired,
    tooltip: PropTypes.string,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['Basic', 'Intermediate', 'High', 'Advanced', 'Default', 'Pink'])
} 

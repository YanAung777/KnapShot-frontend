import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
// import RangeSlider from 'reactrangeslider'
const BorderLinearProgress = withStyles({
    root: {
        width:250,
        height: 10,
        borderRadius: 5,
        backgroundColor:  'lightgray'
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#0071fc',
    },
})(LinearProgress);
const marks = [
    {
      value: 0,
      label: 'Available Field Type',
    },
   
    {
      value: 100,
      label: 'Missing Field Type',
    },
  ];
const useStyles = makeStyles(theme => ({
    root: {
        margin: '5px 0',
        width: '100%'
    }
}));

export default function SliderWithProgressBar(props) {

    const classes = useStyles();

    const { value, tooltip,  } = props;
    return (
        <Tooltip title={tooltip || value}>
            {/* <RangeSlider
      value={ value }
      onChange={ onChange }
      min={ 20 }
      max={ 100 }
      step={ 5 }
    /> */}
            <BorderLinearProgress
                className={classes}
                variant="determinate"
                color="primary"
                value={value}
                marks={marks}
            />
        </Tooltip>
    );
}

SliderWithProgressBar.defaultProps = {
    value: 0,
    tooltip: ""
}

SliderWithProgressBar.propType = {
    value: PropTypes.number.isRequired,
    tooltip: PropTypes.string
}
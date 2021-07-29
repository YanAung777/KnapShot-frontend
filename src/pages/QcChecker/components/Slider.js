import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
    root: {
        width:250,
        backgroundColor: '#fc6900'
    },
    // bar: {
    //     borderRadius: 5,
    //     backgroundColor: '#0071fc',
    // },
 
}));

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

function valuetext(value) {
  return `${value}°C`;
}

export default function TrackInvertedSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="track-inverted-range-slider" gutterBottom>
        Inverted track range
      </Typography>
      <Slider
        style={{width:'100'}}
        track="inverted"
        aria-labelledby="track-inverted-range-slider"
        getAriaValueText={valuetext}
        defaultValue={[20, 37]}
        marks={marks}
      />
    </div>
  );
}

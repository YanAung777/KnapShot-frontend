import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Text from 'components/core/Text';
import Slider from '@material-ui/core/Slider';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import "./slider.css";

const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      thumb: {
        color: "#f3bd16",
        width: 18,
        height: 18,
        position: "absolute",
        zIndex: 2,
        border: "2px solid #ED7C30"
      },
      track: {
        color: 'lightgray'
      },
      rail: {
        color: 'lightgray'
      }
    }
  }
});


const BorderLinearProgress = withStyles({
  root: {
    width: "100%",
    height: 10,
    borderRadius: 5,
    backgroundColor: 'lightgray',
    position: "absolute",
    bottom: "9px",
    zIndex: 1
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#4572C6'
    ,
  },
})(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // position: "relative"
  },
  margin: {
    height: theme.spacing(3),
  },
}));


export default function TrackInvertedSlider({ percent, aLabel, mLabel, a, m }) {
  const classes = useStyles();
  // console.log("log",  a)
  return (
    <div className={classes.root}>
      {/* <div className={classes.margin} /> */}
      <BorderLinearProgress
        className={classes}
        variant="determinate"
        color="primary"
        value={percent}
      />
      <Text value={"Available Field Type"} style={{ fontSize: 9, position: "absolute", left: "2%" }} />
      <Text value={"Missing Field Type"} style={{ fontSize: 9, position: "absolute", right: "-2%" }} />
      <Text value={aLabel} style={{ fontSize: 10, position: "absolute", left: -22, bottom: 6 }} />
      <Text value={mLabel} style={{ fontSize: 10, position: "absolute", right: -22, bottom: 6 }} />
      <div style={{ position: "absolute", width: "100%", bottom: "1px" }}>
        <ThemeProvider theme={muiTheme}>
          <Slider value={[a, m]} className="slider-control" />
        </ThemeProvider>

      </div>
    </div >
  );
}
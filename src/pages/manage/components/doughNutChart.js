import React, { useEffect, useState, useRef } from 'react';
import Chart from "chart.js";
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { grey,red,pink,yellow,amber } from '@material-ui/core/colors';


//constants
import { digitals } from 'constants/digitals';

//components
import Text from 'components/core/Text';

//context
import { useAppValue } from 'context/app';

const useStyles = makeStyles(theme => ({
    wrapper: {
        //width: '100%',
        //"position": "relative",
        //"margin": "0px 25%",
        "alignSelf": "center",
        // "paddingBottom": "15px"
    },
    label: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "flex-start"
    }
}));

let myDChart;

export default function CustomMap(props) {
    const classes = useStyles();

    const [state, dispatch] = useAppValue();
    const { totalDigitalEngagement } = state;

    useEffect(() => { buildChart() }, []);

    const donutChartRef = useRef();

    const buildChart = () => {
        const myDonutChart = donutChartRef.current.getContext("2d");
        if (myDChart) {
            myDChart.destroy();
        }


        myDChart = new Chart(myDonutChart, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [20, 15, 15,10,10,10,10,15],
                    backgroundColor: [red['A700'],red['A400'],pink['A200'],grey[900],grey[600],grey[400],grey[300],amber['A700']],
                    borderWidth: 0
                }],
            
                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'Marketing & advertising',
                    'Consumer Good/service',
                    'Hospitality and Travel',
                    'Information Technology & Services',
                    'Financial Services',
                    'Insurance',
                    'Event Services',
                    'Others'
                ]
            },
            // options:  {
            //     aspectRatio: 1,
            //     layout: {
            //         padding: {
            //             left: 10,
            //             right: 10,
            //             top: 0,
            //             bottom: 0,
            //         }
            //     },
            //     responsive: false,
            //     cutoutPercentage: 55,
            //     legend: {
            //         display: true,
            //         align: 'start',
            //         position: 'bottom',
            //         labels: {
            //             fontSize: 12,
            //             boxWidth: 12,
            //             fullWidth: true,
            //         },
            //         fullWidth: true
            //     },
            // }
        });
    }

    return (
        <div className={classes.wrapper}>
            <canvas
                id="myChart"
                ref={donutChartRef}
                style={{ background: 'white', width: '100%' }}
            />
        </div>
    );
}

CustomMap.defaultProps = {

}

CustomMap.propType = {

}
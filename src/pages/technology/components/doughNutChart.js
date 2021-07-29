import React, { useEffect, useState, useRef } from 'react';
import Chart from "chart.js";
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';


//constants
import { digitals } from 'constants/digitals';

//components
import Text from 'components/core/Text';

//context
import { useAppValue } from 'context/app';

const useStyles = makeStyles(theme => ({
    wrapper: {
        "position": "relative",
        "margin": "0px 25%",
        "alignSelf": "center",
        // "paddingBottom": "15px"
    },
    label: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center"
    }
}));

let myDChart;

export default function CustomMap(props) {
    const classes = useStyles();

    const [state, dispatch] = useAppValue();
    // const { totalDigitalEngagement } = state;

    let { chartData } = props

    useEffect(() => {  chartData && buildChart() }, [chartData]);

    const donutChartRef = useRef();

    const buildChart = () => {
        const myDonutChart = donutChartRef.current.getContext("2d");
        if (myDChart) {
            myDChart.destroy();
        }


        myDChart = new Chart(myDonutChart, {
            type: 'pie',
            data: {
                labels: ['Basic', 'Intermediate', 'High', 'Advanced'],
                datasets: [{
                    data: chartData.data.map(a => {
                        return a.count
                    }),
                    backgroundColor: ["#000000", "#70AD47", "#03B1F1", "#4472C5"],
                }],
                text: '2419 Accounts'
            },
            options: {
                responsive: true,
                cutoutPercentage: 75,
                outerRadius: 100,
                circumference: Math.PI,
                rotation: 1.0 * Math.PI,
                percentageInnerCutout: 10,
            }
        });
    }

    return (
        <div className={classes.wrapper}>
            <canvas
                id="myChart"
                ref={donutChartRef}
                style={{ background: 'white', width: 200 }}
            />
             {
                chartData &&
                <div className={classes.label}>
                    <Text value={`${chartData.count}`} className="text" style={{ marginRight: 5 }} />
                    <Text value={"Accounts"} className="text" style={{ marginLeft: 5 }} />
                </div>
            }
        </div>
    );
}

CustomMap.defaultProps = {

}

CustomMap.propType = {

}
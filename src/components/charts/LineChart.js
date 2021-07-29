import React, { useEffect, useRef } from 'react'
import { makeStyles, IconButton } from '@material-ui/core';
import Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = false;
Chart.defaults.global.elements.line.tension = 0;

const useStyles = makeStyles(theme => ({
    root: {
        // backgroundColor: "#FFFFFF",
        // borderRadius: 5,
        position: 'relative',
        width: '100%',
        height: 100
        // width: 110,
        // height: 110
    },
    button: {
        color: '#000'
    }
}));

const LineChart = (props) => {

    const classes = useStyles();

    const chartRef = useRef();

    const buildChart = () => {
        const myChartRef = chartRef.current.getContext("2d");

        let dataset = {
            labels: ["one", "two", "three"],
            datasets: [
                {
                    backgroundColor: "lightgreen",
                    borderColor: "#e0e0e0",
                    borderWidth: 3,
                    borderJoinStyle: 'round',
                    pointBackgroundColor: "#979797",
                    pointBorderWidth: 0,
                    lineTension: 0.3,
                    data: [0, 0, 0],
                    fill: false,
                }
            ]
        };

        let options = {
            maintainAspectRatio: false,
            responsive: true,
            layout: {
                padding: {
                    top: 10,
                    right: 10,
                    bottom: 10,
                    left: 5
                }
            },
            tooltips: {
                enabled: false
            },
            title: {
                display: false,
            },
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    ticks: { display: false },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }],
                yAxes: [{
                    ticks: { display: false },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }]
            }
        }

        new Chart(myChartRef, {
            type: 'line',
            data: dataset,
            options: options
        });
    }

    useEffect(() => {
        buildChart();
    }, []);

    return (
        <div className={classes.root}>
            <canvas id="myChart" ref={chartRef} />
        </div>
    )
}

export default LineChart;   
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import * as $ from 'jquery';

//constants
import endpoints from 'constants/endpoints';

//context
import { useAppValue } from 'context/app';

//API
import api from 'api';

//hook
import { useOverviewHook } from 'pages/overview/useOverviewHook';



Chart.defaults.scale.gridLines.display = false;

let myChart;

let basicId = [];
let intermediateId = [];



const StackedBarChart = (props) => {

    const [state, dispatch] = useAppValue();
    const { sortFilter, selectedDataset, selectedFilename, technologyFilter, restrictTechnologyFilter } = state;

    const { totalIndustries, results } = props;

    const [industryType, setIndustryType] = useState()
    const [digitalType, setDigitalType] = useState()
    const [otherCompanyIds, setCompanyIds] = useState()
    let [counter, setCounter] = useState(0)
    const [data, setData] = useState("")
    const [page, setPage] = useState(1)
    const [height, setHeight] = useState("")

    useOverviewHook(null, industryType, digitalType)

    const stackedChart = useRef();

    const renderLoading = () => {
        return (
            <div className="fa-1x">
                <i className="fas fa-spinner fa-spin"></i>
            </div>
        )
    }

    useEffect(() => {
        buildCharData(results, totalIndustries);
    }, [results, totalIndustries]);

    useEffect(() => {
        async function fetchData() {

            let obj = {
                dataset: selectedDataset,
                file_name: selectedFilename,
                industryType,
                digitalType,
                technologyFilter,
                restrictTechnologyFilter,
                sortFilter,
                otherCompanyIds
            }

            const response = await api().post(
                endpoints.getAllCompanies + "?page=" + 1, obj
            );

            if (response.status === 200) {
                setData(response.data)
                dispatch({
                    type: "resetSelectedCompanies",
                    companies: response.data.companies,
                    count: response.data.count,
                    loading: false
                });
            }
        }

        industryType && fetchData();

    }, [sortFilter, counter]);

    const buildCharData = (results, totalIndustries) => {

        let data = [];
        let labels = [];
        let basic = [];
        let intermediate = [];
        let high = [];
        let advanced = [];
        basicId = []
        intermediateId= []

        results.map(r => {
            if (r.count > 0) {
                labels.push(r.label);
                basic.push(r.basic);
                intermediate.push(r.intermediate);
                high.push(r.high);
                advanced.push(r.advanced);
                if (r.id) {
                    basicId.push(r.id.basic)
                    intermediateId.push(r.id.intermediate)
                }
                else {
                    basicId.push(null)
                    intermediateId.push(null)
                }
            }
        });

        let obj1 = {
            label: "Basic",
            data: basic,
            backgroundColor: "#000000",
        }
        let obj2 = {
            label: "Intermediate",
            data: intermediate,
            backgroundColor: "#70AD47",
        }
        let obj3 = {
            label: "High",
            data: high,
            backgroundColor: "#03B1F1",
        }
        let obj4 = {
            label: "Advanced",
            data: advanced,
            backgroundColor: "#4472C5",
        }
        data.push(obj4, obj3, obj2, obj1);
        let height = labels.length * 40 + 25;
        setHeight(height)

        buildChart(data, labels, totalIndustries);

    }

    const buildChart = (data, labels, totalIndustries) => {
        const myStackedChart = stackedChart.current.getContext("2d");
        if (myChart) {
            myChart.destroy();
        }
        let myChartConfig = {
            type: 'horizontalBar',
            data: {
                labels: labels,
                datasets: data
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                showAllTooltips: false,
                tooltips: {
                    mode: 'nearest',
                    custom: function (tooltip) {
                        if (!tooltip) return;
                        tooltip.displayColors = false;
                    },
                    callbacks: {
                        label: function (tooltipItem, data) {
                            let p;
                            totalIndustries.map(t => {
                                if (t.name === tooltipItem.label) {
                                    p = parseFloat(((tooltipItem.xLabel / t.count) * 100).toFixed(1));
                                }
                            });
                            return tooltipItem.xLabel + " | " + p + " %";
                        },
                        title: function (tooltipItem, data) {
                            return;
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontFamily: "'Open Sans Bold', sans-serif",
                            fontSize: 11
                        },
                        scaleLabel: {
                            display: false
                        },
                        stacked: true,
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false,
                            color: "#fff",
                            zeroLineColor: "#fff",
                            zeroLineWidth: 0,
                            offsetGridLines: true
                        },
                        ticks: {
                            fontFamily: "'Open Sans Bold', sans-serif",
                            fontSize: 10,
                        },
                        stacked: true,
                        scaleLabel: {
                            display: true,
                            fontSize: 10,
                        }
                    }]
                },
                legend: {
                    display: false
                },
                pointLabelFontFamily: "Quadon Extra Bold",
                scaleFontFamily: "Quadon Extra Bold",
                onClick: chartClickEvent
            }
        }

        myChart = new Chart(myStackedChart, myChartConfig);

    }


    const chartClickEvent = (event, array) => {
        if (myChart === undefined || myChart == null) {
            return;
        }
        if (event === undefined || event == null) {
            return;
        }
        if (array === undefined || array == null) {
            return;
        }
        if (array.length <= 0) {
            return;
        }
        var active = myChart.getElementAtEvent(event);
        if (active === undefined || active == null) {
            return;
        }
        var elementIndex = active[0]._datasetIndex;
        if (array[elementIndex] === undefined || array[elementIndex] == null) {
            return;
        }

        var chartData = array[elementIndex]['_chart'].config.data;
        var idx = array[elementIndex]['_index'];

        var label = chartData.labels[idx];
        // console.log("basicIdArr",basicId)
        var basic = basicId[idx];
        // console.log("basic",basic)

        // console.log("intermediateIdArr",intermediateId)
        var intermediate = intermediateId[idx];
        // console.log("intermediate",intermediate)
        // I was here
        var value = chartData.datasets[elementIndex].data[idx];
        var series = chartData.datasets[elementIndex].label;

        setIndustryType(label)
        setDigitalType(series)
        if (series === "Basic") setCompanyIds(basic)
        else if (series === "Intermediate") setCompanyIds(intermediate)
        else setCompanyIds()
        setCounter(counter++)
    }

    return (
        <div>
            <div style={{ position: 'relative', margin: 'auto', width: '100%', height: height, overflowY: 'scroll' }}>
                <canvas
                    id="myChart"
                    ref={stackedChart}
                />
            </div>
        </div>
    );
}

export default StackedBarChart;
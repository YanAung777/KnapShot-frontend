import React, { useRef, useEffect, useState, useMemo } from 'react';
import { makeStyles, Paper, ButtonBase, Divider, Popover, Tooltip, Grid, Typography } from '@material-ui/core';
import { Check, Clear, Twitter, AssignmentReturnOutlined } from '@material-ui/icons';
import pink from '@material-ui/core/colors/pink';

//css
import 'react-circular-progressbar/dist/styles.css';

//components
import Text from 'components/core/Text';

import Chart from "chart.js";
import QuestionSection from './QuestionSection'

//API
import api from 'api';

//constants
import endpoints from 'constants/endpoints';
//context
import { useAppValue } from 'context/app';

var stackedBar

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: '5px 30px'
    },
    button: {
        border: '1.2px solid lightgray',
        borderRadius: 20,
        height: 25,
        minWidth: 150,
        float: 'right'
    },
    button1: {
        height: 25,
        minWidth: '100%',
        float: 'right'
    },
    icon: {
        float: 'right',
        fontSize: 18,
        padding: 0
    },
    text: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'lightgray'
        },
        marginBottom: 5
    },
    option: {
        display: 'flex',
        boxShadow: 'none',
        minWidth: 170,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '5px'
    },
    dropdown: {
        border: 'none',
        borderRadius: 5,
        height: 25,
        minWidth: 85,
    },
    square: {
        width: '13px',
        height: '13px',
    },
}));

const RightSide = ({ getQuestionRespondent, selectedExcelName,setCompanyList,setSurveyType,setSurveyLabel,surveyType,surveyLabel,breakdown, setBreakdown }) => {

    const classes = useStyles();
    const stackedBarRef = useRef();
    const [labels, setLabels] = useState(null);
    const [totalCountArr, setTotalCountArr] = useState([]);
    // const [breakdown, setBreakdown] = useState('Choose One');
    const [visible, setVisible] = useState(false);
    const [anchorEl, setAnchorEl] = useState()
    const [value, setValue] = useState();
    const [id, setId] = useState('Q-0')
    const [overlay, setOverlay] = useState(null)
    let brands = []
    // const [brands, setBrands] = useState([])
    const colorArr = [pink[50], pink[100], pink[300], pink[500], pink[700], pink[900]]
    let cData = []
    const [chartData, setChartData] = useState([])
    const [state, dispatch] = useAppValue();

    const lists = [
        'Vertical',
        'Employee Size',
        'Years in Operations',
        'Country Presence',
        'City Presence',
        'Company Revenue',
        'Knapshot Score',
        'Digital Tools Usage'
    ]

    const toggle = () => {
        setVisible(!visible);
    }

    const handleClose = () => {
        setVisible(false);
    }

    const recordButtonPosition = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const onClick = async (value) => {
        setValue(value);
        setVisible(false);
        setBreakdown(value)
        const response = await api().post(
            endpoints.getOverlayData + "?excelname=" + selectedExcelName,
            {
                value: value,
                qid : id
            }
        );
        if (response.status === 200) {
            setOverlay(response.data.data)
            
        }
    }

    let totalCountArr1 = [], questions = [], types = []
    if (getQuestionRespondent)
        for (let [key, value] of Object.entries(getQuestionRespondent)) {
            totalCountArr1.push(Object.values(value.value).reduce((accumulator, currentValue) => accumulator + currentValue))
            types.push({ [key]: value.type })
            questions.push({ key: key, label: value.label, type: value.type, length: value.responses.length })
        }

    useEffect(() => {
        if (getQuestionRespondent) {
            for (let [key, value] of Object.entries(getQuestionRespondent)) {
                let totalCount = 0
                if (key === id && value.type === 'Choose one') {
                    setLabels(Object.keys(value.value));
                    setTotalCountArr(Object.values(value.value))
                }
            }
        }
    }, [getQuestionRespondent, id])

    useEffect(() => {
        const fetchOverlay = async () => {
            setBreakdown('Choose one')
            // setValue()
            if (overlay && breakdown !== 'Choose one') {
                const response = await api().post(
                    endpoints.getOverlayData + "?excelname=" + selectedExcelName,
                    {
                        value: breakdown
                    }
                );
                if (response.status === 200) {
                    setOverlay(response.data.data)
    
                }
            }
        }
        fetchOverlay()
    }, [selectedExcelName,id])

    useEffect(() => {
        buildChart()
    }, [labels, chartData, overlay]);

    
    useEffect(() => {
        let valueLabels = [], valueCounts = []
        if (overlay) for (let [key, value] of Object.entries(overlay)) {

            for (let x in value) {
                if (!valueLabels.includes(x)) {
                    valueLabels.push(x)
                }
            }
            valueCounts.push(value)
        }

        for (let i = 0; i < valueLabels.length; i++) {
            let subChartData = []
            for (let j = 0; j < valueCounts.length; j++) {
                let z = 1
                for (let [key, value] of Object.entries(valueCounts[j])) {
                    if (key === valueLabels[i]) {
                        subChartData.push(value)
                        z = 1
                    }
                    else if (z < Object.keys(valueCounts[j]).length) {
                        z++
                    }
                    else subChartData.push(0)
                }
            }

            let obj = {
                label: valueLabels[i],
                data: subChartData,
                backgroundColor: colorArr[i],
                barThickness: 28,
            }
            cData.push(obj)
        }
        setChartData(cData)

        for (let k in chartData) {
            brands.push({ name: chartData[k].label, color: chartData[k].backgroundColor })
        }

    }, [selectedExcelName, overlay])

    const chartClickEvent = async (event, array) => {

        const responseMap = {
            'Vertical': 'S2',
            'Employee Size': 'S4',
            'Years in Operations': 'S6',
            'Country Presence': 'S5.1',
            'City Presence': 'S5.2',
            'Company Revenue': 'S7',
            'Digital Tools Usage': 'S8'
        }
        const overlayType = responseMap[value]

        if (stackedBar === undefined || stackedBar == null) {
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
        var active = stackedBar.getElementAtEvent(event);
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
        setSurveyLabel(chartData.labels[idx])
        // var value = chartData.datasets[elementIndex].data[idx];
        var series = chartData.datasets[elementIndex].label;
        setSurveyType(chartData.datasets[elementIndex].label)

        const response = await api().post(
            endpoints.getCompanyByOverlay,
            {
                value: series,
                filename: selectedExcelName,
                label: label,
                overlayType: overlayType,
                qi: id
            }
        );
        if (response.status === 200) {
            setCompanyList(response.data.data)
        }
    }

    const buildChart = () => {
        const barChart = stackedBarRef.current.getContext("2d");

        let barChartConfig = {
            type: 'horizontalBar',
            data: {
                labels: labels,
                datasets: chartData.length > 0 ? chartData : [{
                    data: totalCountArr,
                    barThickness: 28,
                    // backgroundColor: "rgba(63,103,126,1)",
                    // hoverBackgroundColor: "rgba(50,90,100,1)",
                    // barPercentage: 0.5,
                }]
            },
            options: {
                responsive: true,
                maintainAspecRation: false,
                showAllTooltips: false,
                tooltips: {
                    mode: 'nearest',
                    custom: function (tooltip) {
                        if (!tooltip) return;
                        tooltip.displayColors = false;
                    },
                    callbacks: {
                        // label: function (tooltipItem, data) {
                        //     let p;
                        //     totalIndustries.map(t => {
                        //         if (t.name === tooltipItem.label) {
                        //             p = parseFloat(((tooltipItem.xLabel / t.count) * 100).toFixed(1));
                        //         }
                        //     });
                        //     return tooltipItem.xLabel + " | " + p + " %";
                        // },
                        title: function (tooltipItem, data) {
                            return;
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        // scaleLabel: {
                        //     display: true,
                        //     labelString: 'Company Count',
                        // },
                        ticks: {
                            beginAtZero: true,
                            fontFamily: "'Open Sans Bold', sans-serif",
                            fontSize: 11,
                            // fontColor: '#fff',
                        },
                        gridLines: {
                            display: true,
                            drawOnChartArea: false,
                            drawBorder: true,
                        },
                        stacked: true,
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true,
                            drawOnChartArea: false,
                            drawBorder: true,
                            offsetGridLines: false
                        },
                        ticks: {
                            fontFamily: "'Open Sans Bold', sans-serif",
                            fontSize: 11,
                            // reverse : true
                            lineWidth: 1
                            // fontColor: '#fff',
                        },
                        stacked: true,
                        // scaleLabel: {
                        //     display: true,
                        //     labelString: 'Advertising Budget',
                        // },
                    }]
                },
                onClick: chartData.length > 0 ? chartClickEvent : null//excelDownload
            }
        }
        if (stackedBar) {
            stackedBar.destroy();
        }
        stackedBar = new Chart(barChart, barChartConfig)
    }
    
    return (
        <div className={classes.root}>
            {/* <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> */}
            <QuestionSection id={id} setId={setId} totalCountArr1={totalCountArr1} questions={questions} types={types} />
            <Divider style={{ margin: '5px' }} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ width: '80%' }}>
                    <Text value="Advertising Budget" style={{ fontSize: '12px', marginTop: '3%', paddingLeft: '20%', marginBottom: '3px' }} />
                    <canvas
                        id="stackedBar"
                        ref={stackedBarRef}
                        style={{ background: 'white' }}
                    />
                    <Text value="Company Count" style={{ float: 'right', fontSize: '12px', marginTop: '2px', marginBottom: '3px' }} />
                </div>
                <div style={{ width: '30%' }}>
                    {/* <Text value="" style={{ fontSize: '13px', marginTop: '5px' }} /> */}
                    <ButtonBase className={classes.button} style={{ border: 'none', }} >
                        <div style={{ margin: "0 auto", fontSize: '12px' }}>Overlay With</div>
                    </ButtonBase>
                    <div onClick={toggle}>
                        <ButtonBase className={classes.button} onClick={recordButtonPosition} style={{ marginBottom: '20px' }}>
                            <div style={{ margin: "0 auto", fontSize: '12px' }}>{breakdown}</div>
                        </ButtonBase>
                    </div>
                    <Popover
                        onClose={handleClose}
                        open={visible}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        style={{ minWidth: '100%' }}
                    >
                        <Paper className={classes.option}>
                            {
                                lists.map(x =>
                                    <Typography
                                        className={classes.text}
                                        onClick={() => onClick(x)}>
                                        {x}
                                        {x === value && <Check className={classes.icon} />}
                                    </Typography>
                                )
                            }
                        </Paper>
                    </Popover>
                    {
                        brands.map(x => (
                            <Grid container style={{ display: 'flex', marginTop: '5px' }}>
                                <Grid item md={4} >

                                </Grid>
                                <Grid item md={1} >
                                    <div className={classes.square} style={{ backgroundColor: x.color }}></div>
                                </Grid>
                                <Grid item md={7}>
                                    <Text value={x.name} style={{ marginLeft: '15px', fontSize: '11px', alignItems: 'center' }} />
                                </Grid>
                            </Grid>
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

RightSide.defaultProps = {

}

RightSide.propTypes = {

}


export default RightSide;

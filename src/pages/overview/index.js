import React, { useReducer, useContext, useState, useEffect } from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Popper } from '@material-ui/core';

//components
import DoughNutChart from './components/doughNutChart';
import ProgressBar from 'components/core/ProgressBar'
import Text from 'components/core/Text';
import CompanyLists from './components/CompanyLists';
import CustomMap from 'pages/home/components/Map';
import IndustryBreakDown from "./IndustryBreakDown";
import DigitalEngagementBreakDown from "./DigitalEngagementBreakDown";

//context
import { useAppValue } from 'context/app';

//hook
import { useOverviewHook } from './useOverviewHook';

//util
import { checkAuth } from 'util/check-auth';

//route
import { history } from 'router/history';

//constants
import { digitals } from 'constants/digitals';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 5px',
    },
    center2: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    centerBorderBottom: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 5px',
        borderBottom: '2px solid #777',
        marginBottom: 20,
        fontWeight: "bold"
    },
    filterWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 5px',
    },
    filterWrapper2: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 5px',
    },
    marginBoxShadow: {
        margin: "20px 10%",
        boxShadow: "5px 5px 5px 0px #ccc",
        height: window.innerHeight - 200,
        overflowY: 'scroll'
    },
    filterItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    btnGroup: {
        backgroundColor: 'transparent',
        border: 'none'
    },
    popupItem: {
        // "position": "absolute",
        // "left": "60px",
        "border": "1px solid lightgray",
        "borderRadius": "5px",
        "padding": "5px",
        "background": "#FFF",
        "zIndex": "1",
        "width": "200px"
    },
    rowItem: {
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "space-between"
    },
    count: {
        "background": "#000",
        "borderRadius": "20px",
        "height": "20px",
        "minWidth": "80px",
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center"
    }
}));

export default function Home(props) {

    const [filter, setFilter] = useState('')
    const [index, setIndex] = useState(4)
    const [toggle, setToggle] = useState([false, false, false, false])
    const [anchorEl, setAnchorEl] = useState(null)

    const [state, dispatch] = useAppValue();

    let [chartData, setChartData] = useState()

    const { overviewTab, selectedCompany } = state

    const { totalDigitalEngagement, company } = state;

    const classes = useStyles();

    if (!checkAuth()) {
        history.push("/login");
    }

    useOverviewHook()

    useEffect(() => {
        function toggle() {

            setToggle([index === 0 && Boolean(anchorEl), index === 1 && Boolean(anchorEl), index === 2 && Boolean(anchorEl), index === 3 && Boolean(anchorEl)])
        }
        toggle()
    }, [index, anchorEl])

    useEffect(() => {
        company.count === totalDigitalEngagement.count && setChartData(totalDigitalEngagement)
    }, [totalDigitalEngagement, company])

    const handleClick = (event, index) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setIndex(index)
    };

    const renderListItems = (data) => {
        return data.map((d, index) => {
            return (
                <div key={index} style={{ position: 'relative' , margin: "10px 0px"}}>
                    <div className={classes.center}>
                        <i className="fa fa-question-circle" style={{ color: "gray" }} onClick={(e) => handleClick(e, index)} />
                        {renderPopups(d.label, index)}
                        <Text value={d.label} />
                        <Text value={`${d.count} | ${calculatePercent(d.count)}%`} float="right" />
                    </div>
                    {renderProgressBar(d.label, d.count)}
                </div>
            )
        });
    }

    const renderPopups = (label, index) => {
        if (label === "Basic") return (
            <Popper open={toggle[index]} anchorEl={anchorEl} >
                <div className={classes.popupItem} style={{ top: '-90px' }}>
                    <div className={classes.rowItem}>
                        <span style={{ fontSize: 13, textAlign: 'right', marginRight: 10 }}>Digital Engagement Status</span>
                        <div className={classes.count}><span style={{ color: '#FFF', fontSize: 12 }}>Basic</span></div>
                    </div>
                    <div className={classes.rowItem}>
                        <span style={{ fontSize: 13, textAlign: 'right', marginLeft: '16%' }}>Knapshot Score</span>
                        <div className={classes.count} style={{ background: 'lightgray' }}><span style={{ color: '#000' }}> {`< 3`} </span></div>
                    </div>
                    <hr />
                    <p style={{ fontSize: 13, marginBottom: 3 }}>Business with no website</p>
                    <p style={{ fontSize: 13, marginBottom: 3 }}>Has no / limited social accounts.</p>
                    <p style={{ fontSize: 13, marginBottom: 3 }}>Marketing activity focused on traditional advertising or word of mouth.</p>
                    <p style={{ fontSize: 13, marginBottom: 3 }}>Unlikely to use digital tools</p>
                </div>
            </Popper>
        )

        else if (label === "Intermediate") return (
            <Popper open={toggle[index]} anchorEl={anchorEl} >
                <div className={classes.popupItem} style={{ top: "-100px", right: '115px' }}>
                    <div className={classes.rowItem}>
                        <span style={{ fontSize: 13, textAlign: 'right', marginRight: 10 }}>Digital Engagement Status</span>
                        <div className={classes.count} style={{ background: '#70AD47' }}><span style={{ color: '#FFF', fontSize: 12 }}>Intermediate</span></div>
                    </div>
                    <div className={classes.rowItem}>
                        <span style={{ fontSize: 13, textAlign: 'right', marginLeft: '16%' }}>Knapshot Score</span>
                        <div className={classes.count} style={{ background: 'lightgray' }}><span style={{ color: '#000' }}> 3 - 5 </span></div>
                    </div>
                    <hr />
                    <p style={{ fontSize: 13, marginBottom: 3 }}>Business with simple website with no-commerce or booking capabilities</p>
                    <p style={{ fontSize: 13, marginBottom: 3 }}>Listed on couple of online directories and > 1 social accounts.</p>
                    <p style={{ fontSize: 13, marginBottom: 3 }}>Uses limited online marketing tools</p>
                </div>
            </Popper>
        )

        else if (label === "High") return (
            <Popper open={toggle[index]} anchorEl={anchorEl} >
                <div className={classes.popupItem} style={{ top: '-120px' }}>
                    <div className={classes.rowItem}>
                        <span style={{ fontSize: 13, textAlign: 'right', marginRight: 10 }}>Digital Engagement Status</span>
                        <div className={classes.count} style={{ background: "#03B1F1" }}><span style={{ color: '#FFF', fontSize: 12 }}>High</span></div>
                    </div>
                    <div className={classes.rowItem}>
                        <span style={{ fontSize: 13, textAlign: 'right', marginLeft: '16%' }}>Knapshot Score</span>
                        <div className={classes.count} style={{ background: 'lightgray' }}><span style={{ color: '#000' }}> 5 - 8 </span></div>
                    </div>
                    <hr />
                    <p style={{ fontSize: 13, marginBottom: 3 }}>Business with advanced website with e-commerce capabilities</p>
                    <p style={{ fontSize: 13, marginBottom: 3 }}>Has several social accounts</p>
                    <p style={{ fontSize: 13, marginBottom: 3 }}>Uses online marketing/advertising tools</p>
                </div>
            </Popper>
        )

        else return (
            <Popper open={toggle[index]} anchorEl={anchorEl} >
                <div className={classes.popupItem} style={{ top: '-160px', right: '90px' }}>
                    <div className={classes.rowItem}>
                        <span style={{ fontSize: 13, textAlign: 'right', marginRight: 10 }}>Digital Engagement Status</span>
                        <div className={classes.count} style={{ background: "#4472C5" }}><span style={{ color: '#FFF', fontSize: 12 }}>Advanced</span></div>
                    </div>
                    <div className={classes.rowItem}>
                        <span style={{ fontSize: 13, textAlign: 'right', marginLeft: '16%' }}>Knapshot Score</span>
                        <div className={classes.count} style={{ background: 'lightgray' }}><span style={{ color: '#000' }}> > 8 </span></div>
                    </div>
                    <hr />
                    <p style={{ fontSize: 13, marginBottom: 3 }}>Business with advanced website with e-commerce capabilities</p>
                    <p style={{ fontSize: 13, marginBottom: 3 }}>Has several social accounts</p>
                    <p style={{ fontSize: 13, marginBottom: 3 }}>Uses sophisticated online marketing/advertising/analytic tools</p>
                </div>
            </Popper>
        )

    }

    const calculatePercent = (value) => {
        return Math.round((value / chartData.count) * 100);
    }

    const renderProgressBar = (label, value) => {
        let p = (value / chartData.count) * 100;
        let color = digitals[label];
        return (
            <ProgressBar value={p} variant={label} />
        )
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12} sm={4} md={4}>
                    {
                        selectedCompany.count > 0 ? <CompanyLists />
                            :
                            (
                                <div className={classes.marginBoxShadow}>
                                    <div style={{ margin: "0px 50px" }}>
                                        <Text value={"Digital Engagement Segmentation"} className={classes.centerBorderBottom} />
                                        <Text value={"Account Breakdown"} className={classes.center2} />
                                        <DoughNutChart chartData={chartData} />
                                        {
                                            chartData && renderListItems(chartData.data)
                                        }
                                    </div>
                                </div>

                            )
                    }

                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                    {overviewTab === 0 && < CustomMap />}
                    {overviewTab === 1 && < IndustryBreakDown />}
                    {overviewTab === 2 && < DigitalEngagementBreakDown />}
                </Grid>
            </Grid>
        </div >
    );
}
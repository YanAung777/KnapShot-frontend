import React, { useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import StackedBarChart from 'components/charts/stackedBarChart';

//constants
import { countryName } from 'constants/countryName';

//context
import { useAppValue } from 'context/app';

const useStyles = makeStyles(theme => ({
    centerItem: {
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center"
    },
    pills: {
        "width": "50px",
        "height": "12px",
        "borderRadius": "20px",
        "background": "#000"
    },
    pillsWrapper: {
        "minWidth": "100px",
        "borderRight": "2px dashed gray",
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center"
    },
    StackedBarChartWrapper: {
        margin: "50px 10%"
    }

}));

export default function IndustryBreakDown(props) {

    const [state, dispatch] = useAppValue();
    const { IndustryBreakDown, selectedDataset, selectedFilename, totalDigitalEngagement, frimographicFilter, company } = state;

    const { results, totalIndustries } = IndustryBreakDown
    const { data, dataByCountry, count } = totalDigitalEngagement

    let [pillsData,setPillData] = useState()

    useEffect(() => {
        company.count === count && setPillData(totalDigitalEngagement.dataByCountry)
    }, [totalDigitalEngagement,company])



    const classes = useStyles();

    let filteredTotalIndustries = totalIndustries
    let filteredResult = results

    if (frimographicFilter && frimographicFilter.industry) {
        filteredTotalIndustries = totalIndustries.filter(industry => frimographicFilter.industry.includes(industry.name))
        filteredResult = results.filter(industry => frimographicFilter.industry.includes(industry.label))
    }

    return (
        <div style={{
            position: 'relative',
            height: window.innerHeight - 220,
            overflowY: 'scroll'
        }}>
            <div className={classes.centerItem}>
                <Typography style={{ fontSize: 14, fontWeight: '600', paddingTop: "20px" }}>Industry Breakdown with Digital Engagement Segmentation</Typography>
            </div>
            {
                <div className={classes.StackedBarChartWrapper}>
                    <StackedBarChart
                        results={filteredResult}
                        totalIndustries={filteredTotalIndustries}
                    />
                </div>
            }
            <div className={classes.centerItem} style={{ marginTop: 10 }}>
                <div className={classes.centerItem}>
                    <div className={classes.pillsWrapper}>
                        <div>
                            <i className="fa fa-globe" style={{ marginRight: 10, fontSize: 18, color: 'gray' }} />
                            <span style={{ fontSize: 14, color: 'gray' }}>Country</span>
                        </div>
                    </div>
                    <div className={classes.pillsWrapper}>
                        <span style={{ fontSize: 14, color: 'gray' }}>Total</span>
                    </div>
                    <div className={classes.pillsWrapper}>
                        <div className={classes.pills}></div>
                    </div>
                    <div className={classes.pillsWrapper}>
                        <div className={classes.pills} style={{ background: "#70AD47" }}></div>
                    </div>
                    <div className={classes.pillsWrapper}>
                        <div className={classes.pills} style={{ background: "#03B1F1" }}></div>
                    </div>
                    <div className={classes.pillsWrapper}>
                        <div className={classes.pills} style={{ background: "#4472C5" }}></div>
                    </div>
                </div>
            </div>

            {
                pillsData && RenderChild(pillsData)
            }

        </div>
    )
}

function RenderChild(obj) {
    if (Object.keys(obj).length) return Object.entries(obj).map(([key, value]) => <RenderData name={key} value={value} />)
}

function RenderData({ name, value }) {
    const classes = useStyles();

    return (
        <div className={classes.centerItem}>
            <div className={classes.centerItem} style={{ background: '#F2F2F2' }}>
                <div className={classes.pillsWrapper}>
                    <div className={classes.centerItem}>
                        <div className={classes.centerItem}>
                            <div style={{
                                width: 20,
                                height: 15,
                                marginRight: 5,
                                background: countryName[name.toLowerCase()] ? countryName[name.toLowerCase()]["color"] : ""
                            }}></div>
                            <span style={{ fontSize: 14, color: 'gray' }}>{name}</span>
                        </div>
                    </div>
                </div>
                {
                    Object.keys(value) ?
                        Object.keys(value).map((a, index) => {
                            return (
                                <div className={classes.pillsWrapper} key={index}>
                                    <span style={{ fontSize: 14, color: 'gray' }}>{value[a]}</span>
                                </div>
                            )
                        })
                        :
                        null
                }
                <br />
            </div>
        </div>
    )
}






















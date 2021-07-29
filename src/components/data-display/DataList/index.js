import React, { useEffect, useState } from 'react'

// MUI
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// Component
import CustomProgressBar from 'components/core/CustomProgressBar'
import CustomMiniSelect from 'components/core/CustomMiniSelect'
import ProgressBar from 'components/core/ProgressBar'
import LinearDeterminate from 'components/core/LinearProgress';

// Hook
import { useTechnologyHook } from 'pages/technology/useTechnologyHook'
import { Hook } from './hook'


import { useAppValue } from 'context/app';



const keyValues = {
    "Advertising": [
      "ads txt",
      "Audience Targeting",
      "Contextual Advertising",
      "Dynamic Creative Optimization",
      "Digital Video Ads",
      "Retargeting / Remarketing"
    ],
    "Analystics": [
      "Application Performance",
      "Conversion Optimization",
      "Advertiser Tracking",
      "Tag Management",
      "Audience Measurement",
      "Visitor Count Tracking"
    ],
    "Ecommerce": [
      "Non Platform",
      "Hosted Solution",
      "Open Source",
      "Checkout Buttons",
      "Payments Processor",
      "Payment Currency"
    ],
    "Widgets": [
      "Live Chat",
      "Login",
      "Ticketing System",
      "Bookings",
      "Social Sharing",
      "Schedule Management"
    ],
    "Hosting": [
      "Cloud Hosting",
      "Cloud PaaS",
      "Dedicated Hosting",
      "Business Email Hosting",
      "Web Hosting Provider Email",
      "Marketing Platform"
    ],
    "Productivity": [
      "CRM",
      "Campaign Management",
      "Lead Generation",
      "Product Recommendations",
      "Feedback Forms and Surveys",
      "Marketing Automation"
    ]
  }

const useStyles = makeStyles(theme => ({
    table: {
        width: "100%",
    },
    cell: {
        width: "13.5%"
    },
    background: {
        backgroundColor: "#eee"
    },
    // noBreak: {
    //     // "overflow": "hidden",
    //     // "textOverflow": "ellipsis",
    //     "whiteSpace": "pre"
    // }
    provider: {
        height: 40,
        display: "flex",
        alignItems: "flex-end",
        // justifyContent: "center"
    },
    headerWrapper: {
        display: "flex",
        // justifyContent: "center",
        alignItems: "center"
    }
}))


function RenderComp(props) {

    const classes = useStyles()
    useTechnologyHook();
    const [state,] = useAppValue();
    const { data } = state.totalTechnology;

    if(data.length) return (
        <table className={classes.table} cellspacing="10">
            <tbody>
                {
                    Object.entries(keyValues).map(([k, v]) =>
                        data.map((x, i) => (
                            x.type === k &&
                            <DataItem key={i} value={x} keyValues={[k, v]} />
                        )))
                }
            </tbody>
        </table>
    )

    else return (<LinearDeterminate />)
}

function DataItem(props) {
    return (
        <React.Fragment>
            <DataHeader {...props} />
            <DataRow {...props} />
            <DataSelect {...props} />
        </React.Fragment>
    )
}

function DataHeader({ value, keyValues }) {
    const classes = useStyles()
    const [, v] = keyValues
    return (
        <tr>
            <td align="center">
                <Typography>Type</Typography>
            </td>
            <td align="center">
                <Typography>Count</Typography>
            </td>
            {
                v.map((x, i) => {
                    return i < 6 ?
                        <td className={classes.cell}>
                            <div className={classes.headerWrapper}>
                                {/* <i style={{ color: 'gray' }} className={`${Icons[x]}`} aria-hidden="true" /> &nbsp; */}
                                <Typography>{x}</Typography>
                            </div>
                        </td> : null
                })
            }
        </tr>
    )
}

function DataRow({ value, keyValues }) {
    const classes = useStyles()
    const { options } = value;
    const [k, v] = keyValues

    const [companyIds, setCompanyIds] = useState()

    const [state, dispatch] = useAppValue();
    const { selectedDataset, selectedFilename } = state;

    Hook([companyIds])

    return (
        <tr>
            <td align="center" className={classes.background}>
                <Typography>
                    {value.type === "Analytics and Tracking" ? "Analytics" : value.type}
                </Typography>
            </td>
            <td align="center" className={classes.background}><Typography>{value.count}</Typography></td>

            {
                v.map((val, j) => {
                    let index = options.findIndex(option => option.label === val)
                    return index > -1 ?
                        <td className={classes.cell} onClick={() => {
                            setCompanyIds([...new Set(options[index].id)])
                            dispatch({ type: "setTechnoCompanyIds", ids:[...new Set(options[index].id)]})
                            dispatch({
                                type: "setBreakDown",
                                breakdownType: "-",
                                name: val
                            });
                        }}>
                            <CustomProgressBar value={`${Math.round((options[index].count / value.count) * 100)}`} tooltip={options[index].count} />
                        </td> :
                        <td className={classes.cell}>
                            <CustomProgressBar value={0} tooltip={0} />
                        </td>
                })
            }
        </tr>
    )
}

function DataSelect({ value, keyValues }) {
    const { industries, industryData, options, provider, categories, categoryData } = value;
    // console.log("value", value)
    const [state, dispatch] = useAppValue();
    const classes = useStyles()
    const [k, v] = keyValues
    const [type, setType] = React.useState({})
    const [companyIds, setCompanyIds] = useState()

    Hook([companyIds])

    return (
        <React.Fragment>
            <tr>
                <td colSpan={2}>
                    <CustomMiniSelect onSelectChange={setType} />
                </td>
            </tr>
            {
                type === "Category Breakdown" &&
                categoryData.map((cData, i) =>

                    <React.Fragment>
                        <tr key={i}>
                            <td colSpan={2} align="right">
                                <Typography>{cData}</Typography>
                            </td>
                            {
                                v.map((val, j) => {
                                    let index = categories.findIndex(category => category.label === cData && category.key === val)
                                    // console.log("index", index)

                                    let optionIndex = options.findIndex(option => option.label === val)
                                    return index > -1 ?
                                        <td className={classes.cell}>
                                            <ProgressBar
                                                onClick={() => {
                                                    setCompanyIds([...new Set(categories[index].id)])
                                                    dispatch({ type: "setTechnoCompanyIds", ids:[...new Set(categories[index].id)] })
                                                    dispatch({
                                                        type: "setBreakDown",
                                                        breakdownType: "Category",
                                                        name: val
                                                    });
                                                }}
                                                tooltip={categories[index].count}
                                                value={`${Math.round((categories[index].count / options[optionIndex].count) * 100)}`}
                                                variant={"Pink"}
                                            />
                                        </td> :
                                        <td className={classes.cell}>
                                            <ProgressBar value={0} variant={"Pink"} />
                                        </td>
                                })
                            }
                        </tr>
                    </React.Fragment>
                )
            }
            {
                type === "Industry Breakdown" &&
                industryData.map((iData, i) =>

                    <React.Fragment>
                        <tr key={i}>
                            <td colSpan={2} align="right">
                                <Typography>{iData}</Typography>
                            </td>
                            {
                                v.map((val, j) => {
                                    let index = industries.findIndex(industry => industry.label === iData && industry.key === val)
                                    let optionIndex = options.findIndex(option => option.label === val)
                                    return index > -1 ?
                                        <td className={classes.cell}>
                                            <ProgressBar
                                                onClick={() => {
                                                    setCompanyIds([...new Set(industries[index].id)])
                                                    dispatch({ type: "setTechnoCompanyIds", ids: [...new Set(industries[index].id)] })
                                                }}
                                                tooltip={industries[index].count}
                                                value={`${Math.round((industries[index].count / options[optionIndex].count) * 100)}`}
                                                variant={"Pink"}
                                            />
                                        </td> :
                                        <td className={classes.cell}>
                                            <ProgressBar value={0} variant={"Pink"} />
                                        </td>
                                })
                            }
                        </tr>
                    </React.Fragment>
                )
            }
            {
                type === "Provider Breakdown" &&
                <tr>
                    <td colSpan={2} align="right" />
                    {
                        v.map((val, j) => {
                            let index = provider.findIndex(prov => prov.type === val)
                            {/* let optionIndex = options.findIndex(option => option.label === val) */ }
                            return index > -1 ?
                                <td className={classes.cell} valign="top">
                                    {
                                        Object.keys(provider[index].brand).map((brand, j) =>
                                            j < 5 && <React.Fragment>
                                                <div className={classes.provider}>
                                                    <Typography className={classes.noBreak} gutterBottom>{brand} </Typography>
                                                </div>
                                                <ProgressBar
                                                    onClick={() => {
                                                        setCompanyIds([...new Set(provider[index].id[`${brand}`])])
                                                        dispatch({ type: "setTechnoCompanyIds", ids: [...new Set(provider[index].id[`${brand}`])] })
                                                        dispatch({
                                                            type: "setBreakDown",
                                                            breakdownType: "Provider",
                                                            name: val
                                                        });
                                                    }}
                                                    tooltip={Object.values(provider[index].brand)[j]}
                                                    value={`${(Object.values(provider[index].brand)[j] / provider[index].count * 100)}`}
                                                    variant={"Pink"}
                                                />
                                                <br />
                                            </React.Fragment>
                                        )
                                    }
                                </td> : <td />
                        })
                    }
                </tr>
            }
        </React.Fragment >
    )
}

export default RenderComp
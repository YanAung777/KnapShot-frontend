import React, { useEffect, useState } from 'react'

// MUI
import { Typography } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'

// Component
import CustomProgressBar from 'components/core/CustomProgressBar'
import CustomMiniSelect from 'components/core/CustomMiniSelect'
import ProgressBar from 'components/core/ProgressBar'
import Tooltip from '@material-ui/core/Tooltip';

// Hook
import { useTechnologyHook } from 'pages/technology/useTechnologyHook'
import { Hook } from './hook'

//constants
import endpoints from 'constants/endpoints';
import { Icons } from 'constants/icons';
//context
import { useAppValue } from 'context/app';

//API
import api from 'api';



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
    //     "overflow": "hidden",
    //     "textOverflow": "ellipsis",
    //     "whiteSpace": "pre"
    // },
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
    },
    breakLine: {
        borderBottom: "2px dashed gray"
    }
}))

const LightTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

function labelCounter(label) {
    return label.length >= 18 ? label.substring(0, 15) + "..." : label
}

function RenderComp(props) {

    const classes = useStyles()
    useTechnologyHook();
    const [state,] = useAppValue();
    const { data, results, provider, digitalAssets, digitalAssetsData } = state.digitalEngagementPageData;


    return (
        <table className={classes.table} cellspacing="10">
            <tbody>
                {digitalAssets && <DataItem data={digitalAssetsData} digitalAssets={digitalAssets} />}

                {results && <DataItem data={data} results={results} provider={provider} />}
            </tbody>
        </table>
    )
}

function DataItem(props) {
    return (
        <React.Fragment>
            <DataHeader {...props} />
            <DataRow {...props} />
            {props.results && <DataSelect {...props} />}
            {props.digitalAssets && <DataSelectForDigitalAssets {...props} />}
        </React.Fragment>
    )
}

function DataHeader({ results, digitalAssets }) {
    const classes = useStyles()
    return (
        <tr>
            <td align="center">
                <Typography>Type</Typography>
            </td>
            <td align="center">
                <Typography>Count</Typography>
            </td>
            {
                digitalAssets && digitalAssets.map((x, i) => {
                    return i < 6 ?
                        <td className={classes.cell}>
                            <div className={classes.headerWrapper}>
                                <i style={{ color: 'gray' }} className={`${Icons[x.label]}`} aria-hidden="true" /> &nbsp;
                                <Typography>{x.label}</Typography>
                            </div>
                        </td> : null
                })
            }
            {
                results && results.map((x, i) => {
                    return i < 6 ?
                        <td className={classes.cell}>
                            <div className={classes.headerWrapper}>
                                <i style={{ color: 'gray' }} className={`${Icons[x.label]}`} aria-hidden="true" /> &nbsp;
                                <Typography>{x.label}</Typography>
                            </div>
                        </td> : null
                })
            }

        </tr>
    )
}

function DataRow({ results, digitalAssets }) {
    const classes = useStyles()

    const [companyIds, setCompanyIds] = useState()

    const [state, dispatch] = useAppValue();
    const { selectedDataset, selectedFilename } = state;


    Hook([companyIds])

    return (
        <tr>
            <td align="center" className={classes.background}>
                {results && <Typography>Directory Presence</Typography>}
                {digitalAssets && <Typography>Digital Assets</Typography>}
            </td>
            {digitalAssets && <td align="center" className={classes.background}><Typography>{digitalAssets[6]}</Typography></td>}
            {results && <td align="center" className={classes.background}><Typography>{results[6]}</Typography></td>}

            {
                digitalAssets && digitalAssets.map((val, j) => {
                    {/* let index = options.findIndex(option => option.label === val) */ }
                    if (j > 5) return null
                    return val.count > 0 ?
                        <td className={classes.cell} onClick={() => {
                            setCompanyIds([...new Set(val.id)])
                            // dispatch({ type: "technoCompanyIds", ids: [...new Set(val.id)] })
                        }}>
                            <CustomProgressBar value={`${Math.round((val.count / digitalAssets[6]) * 100)}`} tooltip={val.count} />
                        </td> :
                        <td className={classes.cell}>
                            <CustomProgressBar value={0} tooltip={0} />
                        </td>
                })
            }
            {
                results && results.map((val, j) => {
                    {/* let index = options.findIndex(option => option.label === val) */ }
                    if (j > 5) return null
                    return val.count > 0 ?
                        <td className={classes.cell} onClick={() => {
                            setCompanyIds([...new Set(val.id)])
                            // dispatch({ type: "technoCompanyIds", ids: [...new Set(val.id)] })
                        }}>
                            <CustomProgressBar value={`${Math.round((val.count / results[6]) * 100)}`} tooltip={val.count} />
                        </td> :
                        <td className={classes.cell}>
                            <CustomProgressBar value={0} tooltip={0} />
                        </td>
                })
            }

        </tr>
    )
}

function DataSelect({ data, provider }) {
    const classes = useStyles()
    const [type, setType] = React.useState({})
    const [companyIds, setCompanyIds] = useState()
    const [state, dispatch] = useAppValue();

    const DirectoryNameArr = ["Blogger", "BusinessDir", "Forums", "JobDir", "LocationDir", "MarketPlaceDir"]

    Hook([companyIds])

    return (
        <React.Fragment>
            <tr>
                <td colSpan={2}>
                    <CustomMiniSelect onSelectChange={setType} />
                </td>
            </tr>
            {
                type === "Industry Breakdown" &&
                Object.keys(data).map((key, i) =>
                    <React.Fragment>
                        <tr key={i}>
                            <td colSpan={2} align="right">
                                <Typography>{key}</Typography>
                            </td>
                            { //Object.values(Object.values(data)[i].industries)
                                DirectoryNameArr.map((dir, k) => {
                                    let index = Object.keys(Object.values(data)[i].industries).findIndex(name => name === dir)
                                    return Object.values(Object.values(data)[i].industries)[index].count > 0 ?
                                        <td className={classes.cell}>
                                            <ProgressBar
                                                onClick={() => {
                                                    setCompanyIds([...new Set(Object.values(Object.values(data)[i].industries)[index].id)])
                                                    // dispatch({ type: "technoCompanyIds", ids: [...new Set(Object.values(Object.values(data)[i].industries)[index].id)] })
                                                }}
                                                tooltip={Object.values(Object.values(Object.values(data)[i].industries)[index]).count}
                                                value={`${Math.round((Object.values(Object.values(data)[i].industries)[index].count / Object.values(data)[i].count) * 100)}`}
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
                        DirectoryNameArr.map((name, j) => {
                            let index = Object.keys(provider).findIndex(prov => prov === name)
                            {/* let optionIndex = options.findIndex(option => option.label === val) */ }
                            return index > -1 ?
                                <td className={classes.cell} valign="top">
                                    {
                                        Object.values(Object.values(provider)[index].label).map((label, j) =>
                                            j < 5 && <React.Fragment>
                                                <div className={classes.provider}>
                                                    <LightTooltip title={label} placement="top">
                                                        <Typography className={classes.noBreak} gutterBottom>{labelCounter(label)}</Typography>
                                                    </LightTooltip>
                                                </div>
                                                <ProgressBar
                                                    onClick={() => {
                                                        setCompanyIds([...new Set(Object.values(provider)[index].id[j])])
                                                        // dispatch({ type: "technoCompanyIds", ids: [...new Set(Object.values(provider)[index].id[j])] })
                                                    }}
                                                    // tooltip={Object.values(provider[index].brand)[j]}
                                                    value={`${((Object.values(provider)[index]).count[j] / (Object.values(provider)[index]).totalCount * 100)}`}
                                                    variant={"Pink"}
                                                />
                                                <br />
                                            </React.Fragment>
                                        )
                                    }
                                </td> :
                                <td />
                        })
                    }
                </tr>
            }
        </React.Fragment >
    )
}

function DataSelectForDigitalAssets({ data }) {
    const classes = useStyles()
    const [type, setType] = React.useState({})
    const [companyIds, setCompanyIds] = useState()
    const [state, dispatch] = useAppValue();

    const NameArr = ["Website", "LinkedIn", "Facebook", "Youtube", "Instagram", "Twitter"]

    Hook([companyIds])

    return (
        <React.Fragment>
            <tr>
                <td colSpan={2}>
                    <CustomMiniSelect onSelectChange={setType} />
                </td>
            </tr>
            {
                type === "Industry Breakdown" &&
                Object.keys(data).map((key, i) =>

                    <React.Fragment>
                        <tr key={i}>
                            <td colSpan={2} align="right">
                                <Typography>{key}</Typography>
                            </td>
                            {
                                NameArr.map((n, k) => {
                                    let index = Object.keys(Object.values(data)[i].industries).findIndex(name => name === n)
                                    return Object.values(Object.values(data)[i].industries)[index].count > 0 ?
                                        <td className={classes.cell}>
                                            <ProgressBar
                                                onClick={() => {
                                                    setCompanyIds([...new Set(Object.values(Object.values(data)[i].industries)[index].id)])
                                                    // dispatch({ type: "technoCompanyIds", ids: [...new Set(Object.values(Object.values(data)[i].industries)[index].id)] })

                                                }}
                                                tooltip={Object.values(Object.values(Object.values(data)[i].industries)[index]).count}
                                                value={`${Math.round((Object.values(Object.values(data)[i].industries)[index].count / Object.values(data)[i].count) * 100)}`}
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

        </React.Fragment >
    )
}

export default RenderComp
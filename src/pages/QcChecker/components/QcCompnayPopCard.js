import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, Typography, Grid, IconButton, Box, Divider, ButtonBase, Fab, Tooltip } from '@material-ui/core';
import { Favorite, Add, LocationOn, Phone, Language, AcUnitOutlined, EmailOutlined, Facebook, Twitter, LinkedIn, Instagram } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';
import { CircularProgressbar } from 'react-circular-progressbar';

//components
import CustomIcon from 'components/core/CustomIcon';
import CustomPopOver from 'components/core/CustomPopOver';
import Text from 'components/core/Text';
import OutlineBtn from '../../../components/core/OutlineBtn';

//constants
import { digitals } from 'constants/digitals';
import endpoints from 'constants/endpoints';
import { keyValues } from 'constants/keyValues'

//API
import api from 'api';

import { Hook } from 'components/data-display/DataList/hook'

//util
import { getSession } from 'util/check-auth';

//context
import { useAppValue } from 'context/app';


const useStyles = makeStyles(theme => ({
    main: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        padding: 10,
        borderBottom: `1px solid ${grey[300]}`,
        minHeight: 90,
        minWidth: 390,
        cursor: 'pointer'
    },
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'space-between',
        padding: 10
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    simpleColumn: {
        display: "flex",
        flexDirection: "column",
    },
    simpleRow: {
        display: "flex",
        flexDirection: "row",
    },
    divider: {
        borderRight: `2px solid ${grey[300]}`
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        minHeight: 110
    },
    digitalEngagementItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '15px 0'
    },
    // row: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'space-between'
    // },
    profile: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        backgroundColor: grey[400],
        borderRadius: 10,
        position: 'relative'
    },
    profileIcon: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    popover: {
        padding: 5,
        maxWidth: 300
    },
    link: {
        textDecoration: 'none'
    },
    score: {
        width: 70,
        height: 70,
        fontWeight: '600'
    },
    digitalEngagementText: {
        fontSize: 10,
        fontWeight: '600',
        padding: "5px 0px"
    },
}));

function calcKScore(ksScore) {
    let score
    if (ksScore < 2) score = { type: "Basic", color: digitals["Basic"] };
    else if (ksScore >= 2 && ksScore < 5) score = { type: "Intermediate", color: digitals["Intermediate"] };
    else if (ksScore >= 5 && ksScore < 8) score = { type: "High", color: digitals["High"] };
    else score = { type: "Advanced", color: digitals["Advanced"] };
    return score
}


export default function CompanyDetailCard(props) {
    const classes = useStyles();

    let { toggleCheck, setToggleCheck } = props

    // let [toggleCheck, setToggleCheck] = React.useState(false)

    const [state, dispatch] = useAppValue();

    const { selectedDataset, selectedFilename, totalCountries, technoCompanyIds, reloadTechnoCompany, sortFilter,
        userProductServiceFilter, userSubPartner, userPartner, userEmpSizeFilter } = state

    const { page } = state.selectedTechnologyCompany;


    const {
        id,
        dataset,
        company_name,
        overall_knapshot_score,
        main_line_number,
        website,
        company_email_address,
        facebook,
        linkedIn,
        instagram,
        twitter,
        category,
        fav_company_lists,
    } = props.company;


    const onCompanySelect = async () => {
        // console.log("id", id)
        dispatch({ type: "setActive", index: id });
        let filterConditionObj = {
            user_id: getSession("user").id,
            dataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
            file_name: selectedFilename,
            company_id: id,
            // categoryFilter: userCategoryFilter,
            // empSizeFilter: userEmpSizeFilter,
            partnerFilter: [...userSubPartner, ...userPartner],
            productServiceFilter: userProductServiceFilter,
        }
        // console.log("filterConditionObj",filterConditionObj)
        const response = await api().post(endpoints.getCompanyExpertiseData, filterConditionObj);
        if (response.status === 200) {
            // console.log(response.data)
            let tmpData = response.data.data[0]
            let tmpObj = {}
            let assets = JSON.parse(tmpData.asset);

            let checkSame = {}

            assets && Object.values(assets).forEach(item => {

                Object.keys(item).forEach(key => {
                    if (keyValues[key]) {

                        // console.log(key, item[key].length)
                        // if (checkSame[`${key},${keyValues[key]}`]) return;
                        // else checkSame[`${key},${keyValues[key]}`] = 'check'

                        checkSame[`${key},${keyValues[key]}`] = [...new Set(item[key])].length
                    }
                });
            });

            Object.keys(checkSame).map(key => {
                if (tmpObj[key.split(",")[1]]) {
                    tmpObj[key.split(",")[1]] += checkSame[key];
                }
                else {
                    tmpObj[key.split(",")[1]] = checkSame[key];
                }

            })

            let advertising = tmpObj["Advertising"] ? tmpObj["Advertising"] : 0;
            let analytics = tmpObj["Analytics and Tracking"] ? tmpObj["Analytics and Tracking"] : 0;
            let ecommerce = tmpObj["Ecommerce"] ? tmpObj["Ecommerce"] : 0;
            let widgets = tmpObj["Widgets"] ? tmpObj["Widgets"] : 0;
            let hosting = tmpObj["Hosting"] ? tmpObj["Hosting"] : 0;
            let productivity = tmpObj["Productivity"] ? tmpObj["Productivity"] : 0;

            tmpData.Advertising = advertising
            tmpData.Analytics = analytics
            tmpData.Ecommerce = ecommerce
            tmpData.Widgets = widgets
            tmpData.Hosting = hosting
            tmpData.Productivity = productivity
            dispatch({
                type: "setEachCompanyData",
                data: tmpData,
            })
        }
    }


    const addToFav = async (company_name, id, companyData) => {

        if (companyData.fav_company_lists.length) {
            const response = await api().post(
                endpoints.addCompToFavList,
                {
                    company_name: company_name,
                    user_id: getSession("user").id,
                }
            );
            if (response.status === 200) {
                setToggleCheck(!toggleCheck)
                // dispatch({ type: "setTechnoCompanyIds", ids: id })
            }
        }

        else {
            dispatch({ type: "addToFav", condition: false })
            const favList = await api().get(`${endpoints.getDefaultFavList}/${getSession("user").id}`)
            let listData = favList.data.data
            if (listData) {
                const response = await api().post(
                    endpoints.addCompToFavList,
                    {
                        company_name: company_name,
                        user_id: getSession("user").id,
                        list_name: listData.name,
                        list_id: listData.id,
                    }
                );
                if (response.status === 200) {
                    setToggleCheck(!toggleCheck)
                    // dispatch({ type: "setTechnoCompanyIds", ids: id })
                }
            }
            else {
                dispatch({ type: "setOpenFavList", condition: true, company: company_name })
                // dispatch({ type: "setTechnoCompanyIds", ids: id })
            }
        }
    }


    return (
        <Grid container style={{ borderBottom: "1px solid lightgrey", padding: 10 }}  >
            <Grid item xs={12} sm={3} md={3}>
                <div className={classes.digitalEngagementItem}>
                    <Text className={classes.digitalEngagementText} value="Digital Engagemnet" />
                    <div className={classes.score} style={{ position: "relative" }}>
                        <CircularProgressbar value={overall_knapshot_score * 10} text={overall_knapshot_score} />
                        <Text style={{
                            position: "absolute",
                            top: 42,
                            left: 10,
                            fontSize: 7,
                        }} value="Knapshot Score" />
                    </div>
                    <Text className={classes.digitalEngagementText} value={calcKScore(overall_knapshot_score).type} />
                </div>
            </Grid>
            <Grid className={classes.column} item xs={12} sm={9} md={9} style={{ padding: 10, borderLeft: "1px solid lightgrey" }}>
                <Grid container  >
                    <Grid item xs={11} sm={11} md={11}>
                        <Text value={company_name} />
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} className={classes.row}>
                        <Favorite style={{ fontSize: 26, cursor: "pointer ", color: fav_company_lists && fav_company_lists.length ? "#0080ff" : grey[400] }} onClick={() => addToFav(company_name, id, props.company)} />
                    </Grid>
                </Grid>
                <Grid container  >
                    <Grid item xs={11} sm={11} md={11}>
                        <div className={classes.simpleRow} >
                            {
                                dataset &&
                                <CustomIcon icon={<Tooltip title={dataset}><LocationOn style={{ fontSize: 22, padding: 10 }} /></Tooltip>} />
                            }
                            {
                                main_line_number &&
                                <a href={`tel:${main_line_number}`}>
                                    <CustomIcon icon={<Tooltip title={main_line_number}><Phone style={{ fontSize: 22, padding: 10 }} /></Tooltip>} />
                                </a>
                            }
                            {
                                website &&
                                <a href={website} target="_blank">
                                    <CustomIcon icon={<Tooltip title={website}><Language style={{ fontSize: 22, padding: 10 }} /></Tooltip>} />
                                </a>
                            }
                            {
                                company_email_address &&
                                <a href={`mailto:${company_email_address}`} target="_top">
                                    <CustomIcon icon={<Tooltip title={company_email_address}><EmailOutlined style={{ fontSize: 22, padding: 10 }} /></Tooltip>} />
                                </a>
                            }
                            {
                                (facebook || twitter || linkedIn || instagram) &&
                                <CustomPopOver
                                    label={<CustomIcon icon={<AcUnitOutlined style={{ fontSize: 22, padding: 10 }} />} />}
                                    content={
                                        <Paper className={classes.popover}>
                                            {
                                                facebook && facebook !== '-' &&
                                                <a href={facebook} target="_blank">
                                                    <CustomIcon icon={<Tooltip title={facebook}><Facebook style={{ fontSize: 22, padding: 10 }} /></Tooltip>} />
                                                </a>
                                            }
                                            {
                                                twitter && twitter !== '-' &&
                                                <a href={twitter} target="_blank">
                                                    <CustomIcon icon={<Tooltip title={twitter}><Twitter style={{ fontSize: 22, padding: 10 }} /></Tooltip>} />
                                                </a>
                                            }
                                            {
                                                linkedIn && linkedIn !== '-' &&
                                                <a href={linkedIn} target="_blank">
                                                    <CustomIcon icon={<Tooltip title={linkedIn}><LinkedIn style={{ fontSize: 22, padding: 10 }} /></Tooltip>} />
                                                </a>
                                            }
                                            {
                                                instagram && instagram !== '-' &&
                                                <a href={instagram} target="_blank">
                                                    <CustomIcon icon={<Tooltip title={instagram}><Instagram style={{ fontSize: 22, padding: 10 }} /></Tooltip>} />
                                                </a>
                                            }
                                        </Paper>
                                    }
                                />
                            }

                        </div>

                    </Grid>
                    <Grid item xs={1} sm={1} md={1} className={classes.row}>
                        <Add
                            // onClick={() => openPopUp(i)}
                            onClick={onCompanySelect}
                            style={{ fontSize: 22, padding: 5, borderRadius: "50%", backgroundColor: "#f3bd16", cursor: "pointer" }}
                        />
                    </Grid>
                </Grid>
                <div className={classes.simpleRow}>
                    <Text value={category} style={{ border: '#ccc solid 1px', borderRadius: 22, whiteSpace: "nowrap", padding: 8, textAlign: "center", width: "40%" }} />
                </div>
            </Grid>
        </Grid >

    );
}

CompanyDetailCard.defaultProps = {
    company: {},
    index: 0
}

CompanyDetailCard.propType = {
    company: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
}
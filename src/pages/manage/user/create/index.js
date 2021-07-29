import React, { useReducer, useContext, useState, useEffect } from 'react';
import { makeStyles, Paper, Grid, Divider, ButtonGroup, IconButton, Button } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { Add } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import Icon from "@material-ui/core/Icon";
import SearchBar from 'material-ui-search-bar'
import { Search, Close } from '@material-ui/icons';
import { grey, red, pink, yellow, amber } from '@material-ui/core/colors';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

//util
import { checkAuth } from 'util/check-auth';

//context
import { useAppValue } from 'context/app';

//route
import { history } from 'router/history';

//components
import CrumbList from 'components/core/CrumbList'
import UserItems from 'components/core/UserItems';
import Text from 'components/core/Text';
import CustomProgressBar from 'components/core/CustomProgressBar'
import CustomMiniSelect from 'components/core/CustomMiniSelect'
import ProgressBar from 'components/core/ProgressBar'
import AppBar from '@material-ui/core/AppBar';

import TabPanel from './tabs/TabPanel'
import InputUserDetails from './tabs/form/InputUserDetails'
import VerifyPlan from './tabs/form/VerifyPlan'
import Review from './tabs/form/ReviewAndConfirm'

//API
import api from 'api';

//constants
import endpoints from 'constants/endpoints';


function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    tab: {
        textTransform: 'capitalize',
        marginLeft: '15px',
        marginRight: '15px',
    },
    paper: {
        //flexGrow: 1,
        maxHeight: window.innerHeight - 260,
        overflowY: 'scroll'
    },
    search: {
        marginLeft: 20,
        marginTop: 10,
        marginRight: 5,
        marginBottom: 15,
        width: '65%',
        height: 30,
        '& .MuiInput-input': {
            fontSize: '13px',
        },
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '2%',
        marginLeft: '3%',
        marginRight: '3%',
        marginBottom: '1%'
    },
}));

export default function User(props) {

    const classes = useStyles()

    if (!checkAuth()) {
        history.push("/login");
    }
    const [value, setValue] = React.useState(0);
    const [tabOn, setTabOn] = React.useState(false)
    const [tabOn1, setTabOn1] = React.useState(false)
    const [allTextbox, setAllTextbox] = React.useState({});
    const [allEmails, setAllEamils] = useState([])
    const [slist, setSlist] = useState('Select Country')
    const [checkBox, setCheckBox] = useState([])
    const [checkedData, setCheckedData] = useState([])
    const [date, setDate] = React.useState('Select Plan Expiry')
    const [display, setDisplay] = React.useState('Select Plan Expiry')
    const [selectedValue, setSelectedValue] = React.useState();
    const [plan, setPlan] = React.useState('starter');
    const [allCheckBox, setAllCheckBox] = React.useState({"ab_testing_filter": false,"activities_tab": false,"ad_analytics_filter": false,"ad_exchange_filter": false,"ad_server_filter": false,"ads_txt_filter": false,"advertiser_tracking_filter": false,"advertising": false,"affiliate_program_filter": false,"analytics": false,"app_performance_filter": false,"audience_measurement_filter": false,"audience_targeting_filter": false,"avertising_network_filter": false,"bookings_filter": false,"business_email_hosting_filter": false,"campaign_mgmt_filter": false,"checkout_button_filter": false,"cloud_hosting_filter": false,"cloud_paas_filter": false,"company_contact_downloadable": false,"company_info_tab": false,"company_staff_filter": false,"contact_asset_filter": false,"contextual_advertising_filter": false,"conversion_optimization_filter": false,"countries_filter": false,"crm_filter": false,"dedicated_hosting_filter": false,"designation_search_filter": false,"digital_asset": false,"digital_engagement_industry_view": false,"digital_engagement_level_filter": false,"digital_engagement_provider_view": false,"digital_presence_downloadable": false,"digital_presence_tab": false,"digital_video_ads_filter": false,"dir_presence": false,"dir_presence_filter": false,"dynamic_creative_optimiztion_filter": false,"ecommerce": false,"emp_size_filter": false,"facebook_exchange_filter": false,"feedback_form_&_survey_filter": false,"frimographic_data_downloadable": false,"header_bidding_filter": false,"hosted_solution_filter": false,"hosting": false,"hq_location_filter": false,"industry_chart":false,"industry_filter": false,"lead_generation_filter": false,"live_chat_filter": false,"location_map": false,"login_filter": false,"marketing_automation_filter": false,"marketing_platform_filter": false,"non_platform_filter": false,"open_source_filter": false,"payment_acceptance_filter": false,"payment_currency_filter": false,"payment_processor_filter": false,"people_tab": false,"presonal_contact_downloadable": false,"product_recommendation_filter": false,"productivity": false,"retargeting_filter": false,"role_search_filter": false,"schedule_mgmt_filter": false,"scoring_chart": false,"social_acc_filter": false,"social_sharing_filter": false,"tag_mgmt_filter": false,"technographic_data_downloadable": false,"technology_industry_view": false,"technology_provider_view": false,"technology_tab": false,"ticketing_sys_filter": false,"visitor_count_tracking_filter": false,"web_hosting_provider_email_filter": false,"widgets": false})
    let [confirmData, setConfirmData] = React.useState()
    let [search, setSearch] = useState('')
    //let [count, setCount] = useState(0)
    let filterID = confirmData && confirmData[0].id
    const [idArr, setIdArr] = React.useState([])
    const [confirmArr, setConfirmArr] = useState([])
    // let 

    useEffect(() => {
        let arr = []
        //confirmData && setFilterID(confirmData[confirmData.length-1].id)
        confirmData && confirmData.filter(y => y.email !== 'admin@admin.com' && y.confirmed === false).map(x => arr.push(x.id))
        setConfirmArr(arr)
        // filterID && setCount(count + filterID && Object.keys(filterID).length)
    }, [confirmData]);

    const handleChange = (event, newValue) => {
        if (newValue === 0) {
            setTabOn(false)
            setTabOn1(false)
        }
        else if (newValue === 1) {
            setTabOn1(false)
        }
        setValue(newValue);
    };

    useEffect(() => {
        async function fetchData() {
            const response = await api().get(endpoints.GetUsers);
            if (response.status === 200) {
                setConfirmData(response.data.data)
            }
        }

        value === 2 && fetchData();


    }, [value])

    return (
        <>

            <div className={classes.root}>

            </div>
            <Grid container className={classes.root}>
                <Grid item xs={12} sm={4} md={4} style={{ paddingLeft: '25px', paddingTop: '15px' }} >
                    <CrumbList />
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                    {null}
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    {null}
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="initial"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="1. Input User Details" {...a11yProps(0)} className={classes.tab} />
                        <Tab label="2. Verify Plan" {...a11yProps(1)} className={classes.tab} disabled={!tabOn} />
                        {/* disabled={!tabOn} */}
                        <Tab label="3. Review and Confirm" {...a11yProps(2)} className={classes.tab} disabled={!tabOn1} />
                    </Tabs>
                </Grid>
            </Grid>
            <Divider />
            <Grid container>
                <Grid item xs={12} sm={4} md={4}>
                    {
                        confirmData &&
                        <Paper elevation={15} square style={{ height: window.innerHeight - 180 }}>
                            <div>
                                <div className={classes.title} >
                                    <div className={classes.title} >
                                        <Text value={`1`} style={{ marginRight: '5px', fontWeight: 600 }} />
                                        <Text value="Newly Registered Users" />
                                    </div>
                                </div>
                                <Divider />
                                <SearchBar
                                    closeIcon={<Close style={{ fontSize: 18, marginTop: -7 }} />}
                                    searchIcon={<Search style={{ fontSize: 18, marginTop: -7 }} />}
                                    className={classes.search}
                                    value={search}
                                    placeholder={`Type user or company name`}
                                    onChange={(newValue) => {
                                        setSearch(newValue)
                                        //brandFilter(newValue)
                                    }}
                                    //onRequestSearch={brandFilter}
                                    onCancelSearch={() => {
                                        setSearch('')
                                        //brandFilter('')
                                    }}
                                />
                            </div>
                            <div className={classes.paper} >
                                {confirmData && confirmData.filter(y => y.email !== 'admin@admin.com' && y.confirmed === false).map(x =>
                                    <UserItems
                                        countryBased={x.hqlocation}
                                        id={x.id}
                                        name={x.middlename !== null ? x.firstname + ' ' + x.middlename + ' ' + x.lastname : x.firstname + ' ' + x.lastname}
                                        title={x.title}
                                        company={x.company_name}
                                        overall_knapshot_score={x.Company && x.Company.overall_knapshot_score}
                                        phone={x.contactnumber}
                                        email={x.email}
                                        plan={x.plan_type}
                                        accCreated={x.acc_created_data}
                                        coverage={x.coverage}
                                        idArr={idArr}
                                        setIdArr={setIdArr}
                                    />)
                                }
                            </div>
                        </Paper>
                    }
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                    <TabPanel value={value} index={0}>
                        <InputUserDetails
                            setTabOn={setTabOn}
                            setTabOn1={setTabOn1}
                            changeTab={handleChange}
                            allTextbox={allTextbox}
                            setAllTextbox={setAllTextbox}
                            plan={plan}
                            setPlan={setPlan}
                            allEmails={allEmails}
                            setAllEamils={setAllEamils}
                            filterID={filterID}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <VerifyPlan
                            slist={slist}
                            setSlist={setSlist}
                            checkBox={checkBox}
                            setCheckBox={setCheckBox}
                            checkedData={checkedData}
                            setCheckedData={setCheckedData}
                            date={date}
                            setDate={setDate}
                            display={display}
                            setDisplay={setDisplay}
                            selectedValue={selectedValue}
                            setSelectedValue={setSelectedValue}
                            allTextbox={allTextbox}
                            plan={plan}
                            allCheckBox={allCheckBox}
                            setAllCheckBox={setAllCheckBox}
                            setTabOn1={setTabOn1}
                            changeTab={handleChange}
                            filterID={filterID}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Review idArr={idArr} confirmArr={confirmArr} />
                    </TabPanel>
                </Grid>
            </Grid>
        </>
    );
}
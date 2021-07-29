import React, { } from 'react';
import queryString from 'query-string';
import { makeStyles, Paper, Grid, Tab, Tabs } from '@material-ui/core';

//components
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import Company from './components/Company';
import Technology from './components/Technology';
import DigitalPresence from './components/DigitalPresence';
import People from './components/People';
import Activities from './components/Activities';

//util
import { checkAuth } from 'util/check-auth';

//route
import { history } from 'router/history';

//hook
import { Hook } from './hook';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 10,
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        position: "fixed",
        overflow: "hidden",
        height: '100%'
    },
    tab: {
        fontSize: 13,
        fontWeight: '600'
    }
}));

const CompanyProfile = (props) => {

    if (!checkAuth()) {
        history.push("/login");
    }

    const classes = useStyles();

    const company_name = props.match.params.companyName;

    // console.log("company_name",company_name)

    const [activeTab, handleChange, company] = Hook(company_name);

    return (

        <div className={classes.root}>
            <div style={{ width: '20%' }}>
                <LeftSide company={company} />
            </div>
            <div style={{ width: '60%' }}>
                <Tabs
                    value={activeTab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="tab">
                    <Tab label="Company" className={classes.tab} style={{ color: activeTab === 0 ? '#3c8dbc' : '#000' }} />
                    <Tab label="Digital Presence" className={classes.tab} style={{ color: activeTab === 1 ? '#3c8dbc' : '#000' }} />
                    <Tab label="Technology" className={classes.tab} style={{ color: activeTab === 2 ? '#3c8dbc' : '#000' }} />
                    <Tab label="People" className={classes.tab} style={{ color: activeTab === 3 ? '#3c8dbc' : '#000' }} />
                    <Tab label="Activities" className={classes.tab} style={{ color: activeTab === 4 ? '#3c8dbc' : '#000' }} />
                </Tabs>
                {activeTab === 0 && <Company value={"Company"} index={0} company={company} />}
                {activeTab === 1 && <DigitalPresence value={"Digital Presence"} index={1} company={company} />}
                {activeTab === 2 && <Technology value={"Technology"} index={2} company={company} />}
                {activeTab === 3 && <People value={"People"} index={3} company={company} />}
                {activeTab == 4 && <Activities value={"Activities"} index={4} company={company} />}
            </div>
            <div style={{ width: '20%' }}>
                <RightSide company={company} />
            </div>
        </div>
    );
}

export default CompanyProfile;
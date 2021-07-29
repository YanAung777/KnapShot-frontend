import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, ButtonBase, Divider, Popover, Button } from '@material-ui/core';
import countries from 'i18n-iso-countries';

//components
import Text from 'components/core/Text';

//route
import { history } from 'router/history';

import { Selector1, Selector2 } from './Selectors'
import ContentAccess from './ContentAccess'

//constants
import endpoints from 'constants/endpoints';

//API
import api from 'api';
import { AirlineSeatLegroomExtraTwoTone } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    upper: {
        fontWeight: 400,
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        textTransform: 'capitalize',
        backgroundColor: '#000',
        display: 'flex',
        margin: '3px 10px 3px auto'
    },
}));

export default function VerifyPlan(props) {

    countries.registerLocale(require("i18n-iso-countries/langs/en.json"))
    const classes = useStyles()

    const { setTabOn1, changeTab, slist, display, allTextbox, plan,date, allCheckBox, setAllCheckBox,checkedData,filterID} = props

    const country = ['Indonesia', 'Thailand']
    // console.log('allCheckBox',allCheckBox)
    const handleChange = (e) => {
        const checkBoxName = e.target.value;
        const checked = e.target.checked;
        let tempCheckBox = { ...allCheckBox }
        tempCheckBox[checkBoxName] = checked
        setAllCheckBox(tempCheckBox)
    }

    const onClick = async () => {
        const response = await api().post(
            endpoints.UserCreate,
            {
                allCheckBox,
                allTextbox,
                plan,
                checkedData,
                date,
                filterID,
                role: plan == "qc checker" ? "qc checker" : "ksUser"
            },
        );
        // console.log('role',role)
        if (response.status === 200) {
            // dispatch({
            //     type: "resetSelectedCompanies",
            //     companies: response.data.companies,
            //     count: response.data.count,
            //     loading: false
            // });
            setTabOn1(true)
            changeTab('', 2)
        }
    }

    return (
        <Paper elevation={12}>
            <div className={classes.upper}>
                <Text value="Plan" style={{ fontWeight: 700, marginRight: '35px' }} />
                <Selector1 {...props} country={country} />
                <Selector2 {...props} />
                {
                    (slist && slist !== 'Select Country') && (display && display !== 'Select Plan Expiry') ?
                        <Button disableRipple variant="contained" size="small" className={classes.text} style={{ float: 'right', minWidth: 'auto', marginRight: '20px', backgroundColor: 'black' }}>
                            <Text value="Next" style={{ color: 'white', fontSize: '12px' }} onClick={() => onClick(null)} />
                        </Button>
                        : ''
                }
            </div>
            <Divider className={classes.divider} />
            <ContentAccess allCheckBox={allCheckBox} setAllCheckBox={setAllCheckBox} handleChange={handleChange} plan={plan}/>
        </Paper>
    )
}


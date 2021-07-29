import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Grid, Divider, ButtonGroup, IconButton, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import TabPanel from '../../TabPanel'
import Radio from '@material-ui/core/Radio';
import AddIcon from '@material-ui/icons/Add';

//components
import Text from 'components/core/Text';
import TextBox from 'components/core/TextBox'

//route
import { history } from 'router/history';

//API
import api from 'api';

//constants
import endpoints from 'constants/endpoints';

const useStyles = makeStyles(theme => ({
    root: {
        '&.MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    text: {
        fontWeight: 400,
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 15,
    },
    watchlistIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'center',
        marginLeft: '10px',
        marginRight: '20px',
        cursor: 'pointer'
    },
    divider: {
        marginLeft: '15px',
        marginRight: '15px'
    },
    button: {
        textTransform: 'capitalize',
        backgroundColor: 'black',
        display: 'flex',
        margin: '10px 35px 10px auto'
    },
}));

export default function InputUserDetails(props) {

    const classes = useStyles()

    let { setTabOn, setTabOn1, changeTab, allTextbox, setAllTextbox, plan, setPlan, allEmails, setAllEamils,filterID } = props

    const [validate, setValidate] = useState({});


    const handleChange = event => {
        setPlan(event.target.value);
    };

    useEffect(() => {
        async function fetchData() {
            const response = await api().get(endpoints.GetUserEmail);
            if (response.status === 200) {
                setAllEamils(response.data.data)
            }
        }
        fetchData();
    }, [])

    function handleClick(value) {
        if (value === 'create')
            // history.push('/manage/user/create')
            console.log("I was Clicked")
    }

    async function onBtnClick() {
        setTabOn(true)
        setTabOn1(false)
        if (plan === "ksUser") {
            // frontend\src\pages\manage\user
            const response = await api().post(
                endpoints.UserCreate,
                {
                    ksUser: true,
                    allTextbox,
                    plan,
                    filterID
                }
            );
            if (response.status === 200) changeTab('', 2)
        }
        else changeTab('', 1)
    }

    // let formData = [
    //     { id: "fname", label: "First Name", require: true },
    //     { id: "lname", label: "Last Name", require: true },
    //     { id: "mname", label: "Middle Name", require: false },
    //     { id: "email", label: "Work Email Address", require: true },
    //     { id: "phone", label: "Contact Number", require: false },
    //     { id: "country", label: "Country Based", require: true },
    //     { id: "company", label: "Company", require: true },
    //     { id: "designation", label: "Designation", require: false },
    // ]
    let formData = [
        { id: "firstname", label: "First Name", require: true },
        { id: "lastname", label: "Last Name", require: true },
        { id: "middlename", label: "Middle Name", require: false },
        { id: "email", label: "Work Email Address", require: true },
        { id: "contactnumber", label: "Contact Number", require: false },
        { id: "hqlocation", label: "Country Based", require: true },
        { id: "company_name", label: "Company", require: true },
        { id: "title", label: "Designation", require: false },
    ]

    // let requiredFields = ["First Name", "Last Name", "Work Email Address", "Country Based", "Company"]
    let requiredFields = ["firstname", "lastname", "email", "hqlocation", "company_name"]

    function check() {
        let pass = []
        for (let i in requiredFields)
            for (let [key, value] of Object.entries(allTextbox)) {
                if (requiredFields[i] === key && value) pass.push(true)
            }
        return pass.length === requiredFields.length
    }

    let radioData = [
        { name: "Starter", value: "starter" },
        { name: "Comprehensive", value: "comprehensive" },
        { name: "Custom", value: "custom" },
        // { name: "KnapShot User", value: "ksUser" },
        {name: "QC Checker", value:"qc checker"}
    ]
    // console.log('plan',plan)
    return (
        <Paper elevation={12} style={{ height: window.innerHeight - 180 }}>
            <Text value="Individual" className={classes.text} />
            <Divider className={classes.divider} />
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container>
                    {
                        formData.map(x => (
                            <Grid Item={4}>
                                <TextBox
                                    id={x.id}
                                    label={x.label}
                                    require={x.require}
                                    allTextbox={allTextbox}
                                    onChange={setAllTextbox}
                                    btnOnOff={setValidate}
                                    allEmails={allEmails}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
                <Divider className={classes.divider} />
                <div style={{ paddingLeft: '10px', paddingTop: '10px' }}>
                    <Text value="Select Plan" className={classes.text} style={{ color: '#9c9797', padding: '0 0 0 10px' }} />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {
                            radioData.map(y => (
                                <>
                                    <Radio
                                        checked={plan === y.value}
                                        onChange={handleChange}
                                        value={y.value}
                                        name="plan"
                                        style={{ color: '#3c8dbc' }}
                                        
                                    />
                                    <Text value={y.name} style={{ marginRight: '50px' }} />
                                </>
                            ))
                        }
                    </div>
                </div>
                <Divider className={classes.divider} />
                <div style={{ paddingBottom: '10px' }}>
                    <div className={classes.watchlistIcon} style={{ paddingLeft: '10px', paddingTop: '10px' }} onClick={() => handleClick('create')}>
                        <AddIcon style={{ color: 'grey', fontSize: 'small' }} />
                        <Text value="Add user from same company" />
                    </div>
                    <Button variant="contained" className={classes.button} size="medium" disabled={!check() || !validate} onClick={onBtnClick}>
                        <Text value="Next" style={{ color: 'white' }} />
                    </Button>
                </div>
            </form>
        </Paper>
    )
}
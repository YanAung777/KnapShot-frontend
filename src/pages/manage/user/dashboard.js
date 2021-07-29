import React, { useReducer, useContext, useState, useEffect } from 'react';
import { makeStyles, Paper, Grid, Divider, Popover, IconButton, Button } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { Add, DesktopWindows } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import Icon from "@material-ui/core/Icon";
import SearchBar from 'material-ui-search-bar'
import { Search, Close } from '@material-ui/icons';
import { grey, red, pink, yellow, amber } from '@material-ui/core/colors';

//util
import { checkAuth } from 'util/check-auth';

//context
import { useAppValue } from 'context/app';

//route
import { history } from 'router/history';

//components
import DoughNutChart from 'pages/manage/components/doughNutChart';
import UserItems from 'components/core/UserItems';
import Text from 'components/core/Text';
import CustomProgressBar from 'components/core/CustomProgressBar'
import CustomMiniSelect from 'components/core/CustomMiniSelect'
import ProgressBar from 'components/core/ProgressBar'

//API
import api from 'api';

//constants
import endpoints from 'constants/endpoints';

const useStyles = makeStyles(theme => ({
    root: {
        //flexGrow: 1,
        maxHeight: window.innerHeight - 260,
        overflowY: 'scroll'
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
    text: {
        textAlign: 'center',
        marginLeft: '15px',
        marginRight: '15px'
    },
    option: {
        display: 'flex',
        boxShadow: 'none',
        minWidth: '85%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '5px'
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
    watchlistIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'center',
        marginLeft: '15px',
        marginRight: '15px',
        cursor: 'pointer'
    },
    rightSide: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '15px',
        marginBottom: '5px'
    },
    box: {
        border: '1px solid #ccc',
        borderRadius: '15px',
        width: '200px'
    },
    verticalDivider: {
        display: 'flex',
        alignItems: 'center',
        border: '0px solid #ccc',
        height: 'auto',
        marginTop: '2%',
        marginBottom: '2%'
    },
    subHeader: {
        paddingTop: '13px',
        paddingBottom: '3px',
        textAlign: 'center',
        fontWeight: 'bolder'
    },
    date: {
        fontSize: 11,
        textAlign: 'center',
        fontWeight: 'bolder'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1'
    },
    number: {
        marginTop: '5px',
        fontSize: 20
    },
    word: {
        fontSize: 10,
        marginBottom: '5px'
    },
    paper: {
        marginTop: '20px',
        marginLeft: '43px',
        marginRight: 'auto',
        width: '75%',
        borderRadius: '10px'
    },
    square: {
        width: '17px',
        height: '17px',
    },
    margin: {
        margin: theme.spacing(1),
    },
    btn: {
        textTransform: 'capitalize',
        backgroundColor: '#000',
        display: 'flex',
        margin: '3px 10px 3px auto'
    },
}));

export default function UserCreate(props) {

    const classes = useStyles()

    if (!checkAuth()) {
        history.push("/login");
    }

    function handleClick(value) {
        if (value === 'create')
            history.push('/manage/user/create')
    }

    const onDelete = async () => {
        const response = await api().post(
            endpoints.userIds,
            {
                idArr
            }
        );
        if (response.status === 200) {
            window.location.reload()
        }
    }

    const [state, dispatch] = useAppValue();
    let [search, setSearch] = useState('')
    let [confirmData, setConfirmData] = React.useState()
    let [count, setCount] = React.useState(0)
    const [idArr, setIdArr] = React.useState([])
    const [visible, setVisible] = useState(false);
    const [anchorEl, setAnchorEl] = useState()

    useEffect(() => {
        async function fetchData() {
            const response = await api().get(endpoints.GetUsers);
            if (response.status === 200) {
                setConfirmData(response.data.data)
            }
        }
        fetchData();
    }, [])

    let idCount = confirmData && confirmData.filter(y => y.email !== "admin@admin.com" && y.confirmed === true && y.status === 'ACTIVE').map(x => (x.id))

    useEffect(() => {
        idCount && setCount(count + idCount && Object.keys(idCount).length)
    }, [idCount]);

    const toggle = () => {
        setVisible(!visible);
    }

    const handleClose = () => {
        setVisible(false);
    }

    const recordButtonPosition = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const arr = [
        {
            name: 'country1',
            value: '15'
        },
        {
            name: 'country2',
            value: '5'
        },
        {
            name: 'country3',
            value: '13'
        },
        {
            name: 'country4',
            value: '10'
        },
        {
            name: 'country5',
            value: '2'
        },
        {
            name: 'country6',
            value: '78'
        },
        {
            name: 'country7',
            value: '23'
        },
        {
            name: 'country8',
            value: '54'
        },
        {
            name: 'country9',
            value: '16'
        },
        {
            name: 'country10',
            value: '90'
        },
    ]

    const desc = [
        {
            name: 'Marketing & advertising',
            color: red['A700']
        },
        {
            name: 'Consumer Good/service',
            color: red['A400']
        },
        {
            name: 'Hospitality and Travel',
            color: pink['A200']
        },
        {
            name: 'Information Technology & Services',
            color: grey[900]
        },
        {
            name: 'Financial Services',
            color: grey[600]
        },
        {
            name: 'Insurance',
            color: grey[400]
        },
        {
            name: 'Event Services',
            color: grey[300]
        },
        {
            name: 'Others',
            color: amber['A700']
        },
    ]

    return (

        <Grid container>

            <Grid item xs={12} sm={4} md={4}>
                <Paper elevation={15} style={{ minHeight: window.innerHeight - 170 }}>
                    <div>
                        <div className={classes.title} >
                            <div className={classes.title} >
                                <Text value={`${count}`} style={{ marginRight: '5px', fontWeight: 600 }} />
                                <Text value="Current Users" />
                            </div>
                            <div className={classes.title} style={{ minWidth: '35%' }}>
                                {/* <Text value="Delete" onClick={() => onDelete()} style={{cursor: 'pointer'}}/> */}
                                <div onClick={toggle}>
                                    <Text value="Delete" style={{ cursor: 'pointer' }} onClick={recordButtonPosition} />
                                    <Popover
                                        onClose={handleClose}
                                        open={visible}
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                        style={{ minWidth: '100%' }}
                                    >
                                        <Paper className={classes.option}>
                                            <Text value="Are you sure?" style={{ paddingLeft: '7px', cursor: 'pointer' }} onClick={recordButtonPosition} />
                                            <div style={{ paddingLeft: '7px', display: 'flex', flexDirection: 'row' }}>
                                                <Button variant="contained" size="small" className={classes.btn} style={{ minWidth: 'auto', backgroundColor: red[700] }} onClick={() => onDelete()}>
                                                    <Text value="Yes" style={{ color: grey[200], fontSize: '9px' }} />
                                                </Button>
                                                <Button variant="contained" size="small" className={classes.btn} style={{ minWidth: 'auto', backgroundColor: grey[200] }} >
                                                    <Text value="No" style={{ color: grey[900], fontSize: '9px' }} />
                                                </Button>
                                            </div>
                                        </Paper>
                                    </Popover>
                                </div>
                                <Text value="Edit" />
                                <Text value="Sort" />
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
                    <div className={classes.root} >
                        {confirmData && confirmData.filter(y => y.email !== "admin@admin.com" && y.confirmed === true && y.status === 'ACTIVE').map(x =>
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
                                lstLgIn={x.last_log_in}
                                coverage={x.coverage}
                                idArr={idArr}
                                setIdArr={setIdArr}
                            />)
                        }
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={8} md={8}>
                <div className={classes.column}>
                    <div className={classes.rightSide}>
                        <Text value="User Dashboard" className={classes.text} style={{ paddingLeft: '10px', color: '#3c8dbc' }} />
                        <Text value="Individual User Profile" className={classes.text} />
                        <div className={classes.watchlistIcon} style={{ marginLeft: '15px' }} onClick={() => handleClick('create')}>
                            <AddIcon style={{ color: 'grey', fontSize: 'small' }} />
                            <Text value="Create New User" />
                        </div>
                    </div>
                    <Divider className={classes.text} />
                    <Paper elevation={10} style={{ margin: '15px 15px 15px 15px', borderRadius: '35px', minHeight: window.innerHeight - 210 }}>
                        <Grid container spacing={3}>
                            <Grid item md={4} style={{ borderRight: `1px solid #ccc`, marginTop: '2%', marginBottom: '2%' }}>
                                <Text value="User Account Breakdown" style={{ textAlign: 'center', fontWeight: 'bolder' }} />
                                <Paper elevation={10} className={classes.paper}>
                                    <Text value="Current Users To Date" className={classes.subHeader} />
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', textAlign: 'center' }}>
                                        <div className={classes.column}>
                                            <Text value="49" className={classes.number} />
                                            <Text value="Companies" className={classes.word} />
                                        </div>
                                        <Divider orientation='vertical' className={classes.verticalDivider} />
                                        <div className={classes.column}>
                                            <Text value="120" className={classes.number} />
                                            <Text value="Users" className={classes.word} />
                                        </div>
                                    </div>
                                </Paper>
                                <Paper elevation={10} className={classes.paper}>
                                    <Text value="New Users Sign Up" className={classes.subHeader} />
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', textAlign: 'center' }}>
                                        <div className={classes.column}>
                                            <Text value="0" className={classes.number} />
                                            <Text value="Companies" className={classes.word} />
                                        </div>
                                        <Divider orientation='vertical' className={classes.verticalDivider} />
                                        <div className={classes.column}>
                                            <Text value={confirmData && confirmData.length - 1} className={classes.number} />
                                            <Text value="Users" className={classes.word} />
                                        </div>
                                    </div>
                                    <Text value="Jan 2020" className={classes.date} />
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', textAlign: 'center' }}>
                                        <div className={classes.column}>
                                            <Text value="0" className={classes.number} />
                                            <Text value="Companies" className={classes.word} />
                                        </div>
                                        <Divider orientation='vertical' className={classes.verticalDivider} />
                                        <div className={classes.column}>
                                            <Text value={confirmData && confirmData.length - 1} className={classes.number} />
                                            <Text value="Users" className={classes.word} />
                                        </div>
                                    </div>
                                    <Text value="Jan-Mar 2020" className={classes.date} />
                                </Paper>
                            </Grid>
                            <Grid item md={4} style={{ position: 'relative', borderRight: `1px solid #ccc`, marginTop: '2%', marginBottom: '2%' }}>
                                <Text value="Top 7 Industry Breakdown" className={classes.subHeader} style={{ paddingBottom: '15px', marginBottom: '5px' }} />
                                <div style={{ position: 'absolute', top: '120px', left: '120px' }}>
                                    <Text value="49" style={{ fontWeight: 600, textAlign: 'center', fontSize: '16px' }} />
                                    <Text value="Companies" style={{ fontSize: '11px', textAlign: 'center', marginTop: '-6px' }} />
                                </div>
                                <DoughNutChart />
                                <Grid container spacing={2} style={{ marginTop: '15px' }}>
                                    {
                                        desc.map((x, i) => {
                                            if (i > -1 && i < desc.length)
                                                return (
                                                    <Grid item md={6} style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Grid item md={1} >
                                                            <div className={classes.square} style={{ backgroundColor: x.color }}></div>
                                                        </Grid>
                                                        <Grid item md={11}>
                                                            <Text value={x.name} style={{ marginLeft: '15px', fontSize: '10px' }} />
                                                        </Grid>
                                                    </Grid>)
                                        })
                                    }
                                </Grid>
                            </Grid>
                            <Grid item md={4} style={{ position: 'relative', borderRight: `1px solid #ccc`, marginTop: '2%', marginBottom: '2%' }}>
                                <Text value="Top 10 Country/Roles Breakdown" className={classes.subHeader} style={{ paddingBottom: '15px' }} />
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', width: "50%", marginLeft: '10px' }}>
                                        {
                                            arr.map(x => (
                                                <div style={{ marginBottom: '3px' }} >
                                                    <Text value={x.name} className={classes.word} style={{}} />
                                                    <ProgressBar value={x.value} variant={"Pink"} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', width: "50%", marginLeft: '10px', marginRight: '10px' }}>
                                        {
                                            arr.map(x => (
                                                <div style={{ marginBottom: '3px' }}>
                                                    <Text value={x.name} className={classes.word} style={{}} />
                                                    <ProgressBar value={x.value} variant={"Pink"} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </Grid>
        </Grid>
    );
}
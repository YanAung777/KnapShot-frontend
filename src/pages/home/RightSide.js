import React, { useReducer, useContext, useState, useEffect } from 'react';
import { makeStyles, Paper, Popper, Grid, Divider, ButtonGroup, IconButton, Checkbox, Button, Tooltip } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Language } from '@material-ui/icons';
import Popover from '@material-ui/core/Popover';

//util
import { checkAuth } from 'util/check-auth';

//route
import { history } from 'router/history';

//components
import CustomIcon from 'components/core/CustomIcon';
import GroupButton from './components/GroupButton';
import Text from 'components/core/Text'

//constants
import { digitals } from 'constants/digitals';

//context
import { useAppValue } from 'context/app';

//constants
import endpoints from 'constants/endpoints';

// api
import api from 'api'

const useStyles = makeStyles(theme => ({
    gridItem: {
        paddingTop: '10px'
    },
    gridContainer: {
        '& .MuiGrid-item': {
            padding: '5px'
        }
    },
    gridText: {
        fontSize: '12px'
    },
    gridDetailText: {
        fontSize: '12px',
        height: 'auto',
        lineHeight: '25px'
    }
}));

export default function RightSide({ company }) {
    const classes = useStyles()
    const [count, setCount] = useState('')
    const { lists, page, activeIndex, loading } = company;
    const [state, dispatch] = useAppValue();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl1, setAnchorEl1] = React.useState(null);

    const open = Boolean(anchorEl);
    const open1 = Boolean(anchorEl1);
    const id = open ? 'simple-popover' : undefined;
    const id1 = open1 ? 'simple-popover' : undefined;

    const handleClose = () => {
        setAnchorEl(null);
    };

    const loadMore = () => {
        dispatch({ type: "loading" });
        dispatch({ type: "setPage", page: page + 1 });
    }

    const P1BtnClick = event => {
        setAnchorEl(event.currentTarget);
    }

    const P2BtnClick = event => {
        setAnchorEl1(event.currentTarget);
    }

    const checkCount = () => {
        if (page * 10 < count) {
            return loading ?
                <div className="fa-2x" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50 }}>
                    <i className="fas fa-spinner fa-spin"></i>
                </div>
                : <Text value="Load More" onClick={loadMore} style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue', textAlign: 'center' }} />
        }
        else { return null }
    }

    useEffect(() => {
        setCount(company.count)
    }, [company])

    // useEffect(()=>{
    //     let companyNameArr = []
    //     if(company.lists) company.lists.map(x => companyNameArr.push(x.company_name))
    //     async function fetchKeywords() {
    //         const response = await api().post(
    //             endpoints.getKeywordsByCompany, {company_name:companyNameArr}
    //         );
    //     }
    //     fetchKeywords()
    // },[company.lists])

    return (
        <div style={{ minHeight: '100px', overFlowY: 'scroll' }}>
            <Grid container className={classes.gridContainer} >
                <Grid item md={4} className={classes.gridItem} style={{ display: 'flex' }}>
                    <Text value={`Total`} style={{ marginTop: '10px' }} className={classes.gridText} />&nbsp;
                <Text value={`${count}`} style={{ marginTop: '10px', fontWeight: 700 }} className={classes.gridText} />&nbsp;
                <Text value={`companies`} style={{ marginTop: '10px' }} className={classes.gridText} />
                </Grid>
                <Grid item md={8} className={classes.gridItem}>
                    {/* <Button style={{ height: '30px' }} onClick={P1BtnClick}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Text value={`P1 Keywords`} style={{ fontSize: 12, textTransform: 'capitalize', width: '100px', lineHeight: 'normal' }} className={classes.gridText} />
                            <ExpandMoreIcon />
                        </div>
                    </Button>
                    <Popover
                        id={id}
                        open={open}
                        onClose={handleClose}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <Paper className={classes.downloadPaper}>
                            <Text value={`digital marketing|google adwords`} style={{ padding: '10px', fontSize: '12px' }} />
                        </Paper>
                    </Popover>
                    <Button onClick={P2BtnClick}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Text value={`P2 Keywords`} style={{ fontSize: 12, textTransform: 'capitalize', width: '100px', lineHeight: 'normal' }} className={classes.gridText} />
                            <ExpandMoreIcon />
                        </div>
                    </Button>
                    <Popover
                        id={id1}
                        open={open1}
                        onClose={handleClose}
                        anchorEl={anchorEl1}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <Paper className={classes.downloadPaper}>
                            <Text value={`email marketing`} style={{ padding: '10px', fontSize: '12px' }} />
                        </Paper>
                    </Popover> */}
                </Grid>
                <Grid item md={6} style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                    <Grid container className={classes.gridContainer} spacing={3}>
                        <Grid item md={4}>
                            <Text value={`Company Name`} className={classes.gridText} style={{ paddingLeft: '5px' }} />
                        </Grid>
                        <Grid item md={2}>
                            <Text value={`Country`} className={classes.gridText} style={{ textAlign: 'center' }} />
                        </Grid>
                        <Grid item md={4}>
                            <Text value={`Digital Engagement`} className={classes.gridText} style={{ textAlign: 'center' }} />
                        </Grid>
                        <Grid item md={2}>
                            <Text value={`KS Score`} className={classes.gridText} style={{ textAlign: 'center' }} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={6} style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                    <Grid container className={classes.gridContainer} spacing={3}>
                        <Grid item md={2}>
                            <Text value={`Website`} className={classes.gridText} style={{ textAlign: 'center' }} />
                        </Grid>
                        <Grid item md={10}>
                            <Text value={`Offering keywords`} className={classes.gridText} style={{ textAlign: 'center' }} />
                        </Grid>
                        {/* <Grid item md={2} style={{ paddingLeft: 0 }}>
                            <Text value={`P1 Keywords`} className={classes.gridText} style={{ textAlign: 'center' }} />
                        </Grid>
                        <Grid item md={2} style={{ paddingLeft: 0 }}>
                            <Text value={`P2 Keywords`} className={classes.gridText} style={{ textAlign: 'center' }} />
                        </Grid> */}
                    </Grid>
                </Grid>
                {
                    company.lists.map(x => {
                        let score = {};

                        if (x.overall_knapshot_score < 2) score = { type: "Basic", color: digitals["Basic"] };
                        else if (x.overall_knapshot_score >= 2 && x.overall_knapshot_score < 5) score = { type: "Intermediate", color: digitals["Intermediate"] };
                        else if (x.overall_knapshot_score >= 5 && x.overall_knapshot_score < 8) score = { type: "High", color: digitals["High"] };
                        else score = { type: "Advanced", color: digitals["Advanced"] };

                        return <GridDetails x={x} score={score} />
                    })
                }
                {checkCount()}
            </Grid>
        </div>
    )
}

const GridDetails = ({ x, score }) => {
    const classes = useStyles()

    return (
        <>
            <Grid item md={6} style={{ paddingTop: '15px' }}>
                <Grid container className={classes.gridContainer} spacing={3}>
                    <Grid item md={4} style={{ display: 'flex' }}>
                        <Checkbox
                            // id={id}
                            // checked={checked}
                            // onChange={handleChange}
                            color="default"
                            value="default"
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                            style={{ marginTop: '-5px' }}
                        />
                        <Text value={x.company_name} className={classes.gridDetailText} style={{ paddingLeft: '5px' }} />
                    </Grid>
                    <Grid item md={2}>
                        <Text value={x.dataset} className={classes.gridDetailText} style={{ textAlign: 'center' }} />
                    </Grid>
                    <Grid item md={4} style={{ paddingLeft: '27px' }}>
                        <Text value={score.type} className={classes.gridDetailText} style={{ fontSize: '11px',backgroundColor: score.color, textAlign: 'center', color: 'white', width: '106px' }} />
                    </Grid>
                    <Grid item md={2}>
                        <Text value={x.overall_knapshot_score} className={classes.gridDetailText} style={{ textAlign: 'center' }} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={6} style={{ paddingTop: '15px' }}>
                <Grid container className={classes.gridContainer} spacing={3}>
                    <Grid item md={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                        {/* <Text value={`Website`} className={classes.gridDetailText} /> */}
                        <a target="blank" href={x.website} style={{ textDecoration: 'none' }}>
                            <CustomIcon icon={<Tooltip title={x.website}><Language /></Tooltip>} />
                        </a>
                    </Grid>
                    <Grid item md={8}>
                        <div style={{ border: '1px solid #ebedeb', display: 'flex', flexWrap: 'wrap',width: '370px' }}>
                            {/* asdfasdf asdfasdf online reputation management asdfasdf pr media asdf technology display */}
                            <Text value={`digital marketing|media|pr|google adwords|website|email marketing|remarketing`} className={classes.gridDetailText} style={{ padding: '2px', lineHeight: 'inherit',display:'flex',flexWrap: 'wrap' }} />
                            {/* <Text value={`digital marketing`} className={classes.gridDetailText} style={{ padding: '2px', lineHeight: 'inherit', color: 'red' }} />|
                            <Text value={`media`} className={classes.gridDetailText} style={{ padding: '2px', lineHeight: 'inherit' }} />|
                            <Text value={`pr`} className={classes.gridDetailText} style={{ padding: '2px', lineHeight: 'inherit' }} />|
                            <Text value={`google adwords`} className={classes.gridDetailText} style={{ padding: '2px', lineHeight: 'inherit', color: 'red' }} />|<br />
                            <Text value={`website`} className={classes.gridDetailText} style={{ padding: '2px', lineHeight: 'inherit' }} />|
                            <Text value={`email marketing`} className={classes.gridDetailText} style={{ padding: '2px', lineHeight: 'inherit', color: '#3ee654' }} />|
                            <Text value={`remarketing`} className={classes.gridDetailText} style={{ padding: '2px', lineHeight: 'inherit' }} />| */}
                        </div>
                    </Grid>
                    {/* <Grid item md={2} style={{ paddingLeft: 0 }}>
                        <Text value={`75%`} className={classes.gridDetailText} style={{ textAlign: 'center' }} />
                    </Grid>
                    <Grid item md={2} style={{ paddingLeft: 0 }}>
                        <Text value={`14%`} className={classes.gridDetailText} style={{ textAlign: 'center' }} />
                    </Grid> */}
                </Grid>
            </Grid>
        </>
    )
}


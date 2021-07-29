import React, { } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { makeStyles, Paper, ButtonBase, Divider, Grid, Tooltip, Typography } from '@material-ui/core';
import { Favorite, Add, LocationOn, Phone, Language, AcUnitOutlined, EmailOutlined, Facebook, Twitter, LinkedIn, Instagram, YouTube, BorderRight } from '@material-ui/icons';
import CreateIcon from '@material-ui/icons/Create';
import PublicIcon from '@material-ui/icons/Public';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ScoreIcon from '@material-ui/icons/Score';
import BuildIcon from '@material-ui/icons/Build';

//components
import Icon from 'components/core/CustomIcon';
import Text from 'components/core/Text';
import ProgressBar from 'components/core/ProgressBar';

import ResponseItems from './components/ResponseItems'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        // padding: '0 15px',
        height: window.innerHeight - 190,
        overflowY: 'scroll',
    },
    button: {
        // marginLeft: '5px',
        // marginRight: '5px',
        border: '1.2px solid lightgray',
        borderRadius: 5,
        // padding: '3px 10px',
        height: 30,
        minWidth: 120,
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'flex-end'
        // float: 'right'
    },
}));


const LeftSide = ({ respondent }) => {

    const classes = useStyles();
    let totalCountArr = [null]
    respondent && respondent.map((x, i) => {
        let totalCount = 0
        // console.log("Object.values",Object.values(x.count))
        Object.values(x.count).map(y => totalCount += parseInt(y))

        totalCountArr.push(totalCount)
    })
    // console.log("Total", totalCountArr)

    const icons = {
        'Vertical': <FlightTakeoffIcon fontSize="medium" />,
        'Employee Size': <SupervisorAccountIcon fontSize="medium" />,
        'Years in Operations': <ScheduleIcon fontSize="medium" />,
        'Country Presence': <PublicIcon fontSize="medium" />,
        'City Presence': <PublicIcon fontSize="medium" />,
        'Company Revenue': <AttachMoneyIcon fontSize="medium" />,
        'Knapshot Score': <ScoreIcon fontSize="medium" />,
        'Digital Tools Usage': <BuildIcon fontSize="medium" />,
    }

    const Main = () =>
        <div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{
                    width: '60px',
                    borderRight: `2px solid #ccc`,
                    padding: '2%',
                    marginTop: '2%'
                }}>
                    <Text value={<CreateIcon fontSize="medium" />} style={{ textAlign: 'center' }} />
                    <Text value="Survey Take Up" style={{ fontSize: '10px', maxWidth: '40px', textAlign: 'center', padding: '2%' }} />
                </div>
                <Grid container>
                    <Grid item md={2} style={{ marginTop: '5%', display: 'felx', justifyContent: 'space-around' }}>
                        <Text value={Math.max(...totalCountArr)} style={{ fontSize: '15px', width: '100%', textAlign: 'center', }} />
                        <Text value="Total Responses" style={{ fontSize: '10px', width: '100%', textAlign: 'center', }} />
                    </Grid>
                </Grid>
            </div>
            {respondent ? respondent.map((x, index) =>
                // console.log(`x ${index}`,x)
                x.labelname && <ResponseItems value={x.count} name={x.labelname} icon={icons[x.labelname]} />
            ) : null}
        </div>


    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Paper className={classes.root} elevation={5}>
                <div style={{ display: 'flex', justifyContent: 'space-around',marginTop: '2px' }}>
                    <ButtonBase className={classes.button} >
                        <div style={{ margin: "0 auto", fontSize: '12px' }}>View List</div>
                    </ButtonBase>
                    <ButtonBase className={classes.button} >
                        <div style={{ margin: "0 auto", fontSize: '12px' }}>Response Co-relation</div>
                    </ButtonBase>
                    <ButtonBase className={classes.button} >
                        <div style={{ margin: "0 auto", fontSize: '12px' }}>Response by question</div>
                    </ButtonBase>
                </div>
                <Divider style={{ margin: '5px' }} />
                <Text value="Respondents Firmographic Summary" style={{ fontSize: '13px', textAlign: 'center', marginTop: '5px' }} />
                <Main />
            </Paper>
        </div>
    )
}


LeftSide.defaultProps = {
    company: {}
}

LeftSide.propTypes = {
    company: PropTypes.object
}

export default LeftSide;

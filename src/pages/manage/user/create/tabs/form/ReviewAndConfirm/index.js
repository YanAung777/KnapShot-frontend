import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, ButtonBase, Divider, Popover, Button,Grid } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import countries from 'i18n-iso-countries';

//components
import Text from 'components/core/Text';

//route
import { history } from 'router/history';

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
    box: {
        backgroundColor: '#e8e8e8',
        width: '500px',
        margin: '50px auto',
        padding: '20px',
        borderRadius: '10px'
    }
}));

export default function Review(props) {

    countries.registerLocale(require("i18n-iso-countries/langs/en.json"))
    const classes = useStyles()

    const { idArr,confirmArr } = props

    const onClick = async () => {
        const response = await api().post(
            endpoints.confirmUser,
            {
                idArr : idArr.length  ? idArr : confirmArr
                // confirmArr
            }
        );
        if (response.status === 200) {
            history.push('/manage/user/dashboard')
        }
    }

    return (
        <Paper elevation={12} style={{height: window.innerHeight - 180}}>
            <div className={classes.upper}>
                <Button disableRipple variant="contained" size="small" className={classes.text} style={{ float: 'right', minWidth: 'auto', marginRight: '20px', backgroundColor: '#1165ed' }}>
                    <Text value="Confirm" style={{ color: 'white', fontSize: '12px' }} onClick={() => onClick()} />
                </Button>
            </div>
            <Divider style={{marginLeft: '10px', marginRight: '10px'}} />
            <Paper elevation={8} className={classes.box}>
                <Grid container>
                        <Grid item md={1}>
                            <InfoIcon style={{color: 'grey', fontSize: '30px'}} />
                        </Grid>
                        <Grid item md={10}>
                            <Text value="Verify user info display on left is correct & click to confirm.
                                        Else click on “input User Detail” to made changes" />
                        </Grid>
                </Grid>
            </Paper>
        </Paper>
    )
}


import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Typography, ButtonBase, Divider, Popover, Button } from '@material-ui/core';

import {CheckBox} from './UpperColums/UFifthColumn'

//components
import Text from 'components/core/Text';

const useStyles = makeStyles(theme => ({
    btn: {
        //marginLeft: 'auto',
        //marginRight: 'auto',
        border: '1.2px solid lightgray',
        borderRadius: 20,
        padding: '3px 10px',
        height: 25,
        width: 100,
        display: 'flex',
        alignItems: 'center',
    },
    btn1: {
        //marginLeft: 'auto',
        //marginRight: 'auto',
        border: '1.2px solid #3c8dbc',
        borderRadius: 20,
        padding: '3px 10px',
        height: 25,
        width: 100,
        display: 'flex',
        alignItems: 'center',
    },
    btnColor: {
        fontSize: '12px'
    },
    btnColor1:{
        fontSize: '12px',
        color: '#3c8dbc',
        fontWeight: 600
    },
    wipe: {
        border: '1.2px solid lightgray',
        borderRadius: 20,
        padding: '3px 10px',
        height: '100%',
        width: 1,
        display: 'flex',
        alignItems: 'center',
        marginTop: '3px'
    },
}));

export function HorizontalButton({ value,plan }) {
    const classes = useStyles()
    // console.log('value',value)
    // console.log('plan',plan)
    return (
        <ButtonBase disableRipple className={
                                value.toLowerCase() == plan ? 
                                    classes.btn1 : 
                                    classes.btn}
        >
            <div className={
                value.toLowerCase() === plan ? 
                    classes.btnColor1 :
                    classes.btnColor
            }
            >
                {value}
            </div>
        </ButtonBase>
    )
}

export function VerticalButton({ value, type,name,onChange,allCheckBox, plan }) {
    const classes = useStyles()
    return (
        <ButtonBase disableRipple className={classes.wipe} style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between',paddingBottom: '45px' }}>
            <CheckBox type={type} value={name} onChange={onChange} allCheckBox={allCheckBox} plan={plan}/>
            <div style={{ fontSize: '10px', transform: 'rotate(-90deg)',whiteSpace: 'nowrap' }}>{value}</div>
        </ButtonBase>
    )
}

export function VerticalButtonNoWrap({ value, type,name,onChange,allCheckBox,plan }) {
    const classes = useStyles()
    return (
        <ButtonBase disableRipple className={classes.wipe} style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between',paddingBottom: '15px' }}>
            <CheckBox type={type} value={name} onChange={onChange} allCheckBox={allCheckBox} plan={plan} />
            <div style={{ fontSize: '10px', transform: 'rotate(-90deg)' }}>{value}</div>
        </ButtonBase>
    )
}
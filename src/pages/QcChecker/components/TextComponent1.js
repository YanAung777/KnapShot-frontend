import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Popper, Grid, Divider, ButtonGroup, IconButton, Checkbox, Button, Tooltip } from '@material-ui/core';
import Text from 'components/core/Text';
import { MDCSelectIcon, Favorite, Add, LocationOn, Phone, Language, AcUnitOutlined, EmailOutlined, Facebook, Twitter, LinkedIn, Instagram } from '@material-ui/icons';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    row: {
        display: 'flex',
        flexDirection: "row"
    },
}));

export default function TextComponent1() {
    const classes = useStyles()
    return (

        <div className={classes.row}>
         <div style={{backgroundColor:'lightgray',display:'flex',flexDirection:'row',marginBottom:'18px',marginLeft:'10px',alignItems:'center'}}>
         <CheckCircleOutlineIcon  />
            <HighlightOffIcon />
            <Text value={'Get Office Number'} style={{fontSize:'8px'}} />
           
            </div>
            <Add
                            // onClick={() => openPopUp(i)}
                            // onClick={onCompanySelect}
                            style={{ fontSize: 22, padding: 5, borderRadius: "50%",  cursor: "pointer" }}
                        />
        </div>
    )
}


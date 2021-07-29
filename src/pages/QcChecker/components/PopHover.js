import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, Paper, ButtonBase, Typography, Popper, Checkbox, Button, Divider, TextField, Radio } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
// import clsx from 'clsx';
import OutsideClickHandler from 'react-outside-click-handler';
//constants
import NativeSelect from '@material-ui/core/NativeSelect';
import { color } from 'constants/color';

//context
import InputBase from '@material-ui/core/InputBase';
import { useAppValue } from 'context/app';
import CustomPopOver from 'components/core/CustomPopOver2';
import ApartmentOutlinedIcon from '@material-ui/icons/ApartmentOutlined';
import LocalPhoneOutlinedIcon from '@material-ui/icons/LocalPhoneOutlined';
const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        marginLeft: 10,
        height: 70
      },
   textField: {
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingBottom: 0,
      marginTop: 0,
      fontWeight: 500
   },
   button: {
      zIndex: -1,
      // border: '1.2px solid lightgray',
      // borderRadius: 20,
      padding: '3px 10px 3px 0px',
      height: 30,
      // minWidth: 120,
      display: 'flex',
      alignItems: 'center',
      // justifyContent: 'flex-start'
   },
   option: {
      position: 'absolute',
      height: '9%',
      width:'50%',
      marginLeft:'26%',
      marginTop:'18%',
      zIndex: 2,
      padding: 10
   },
   rootMain: {
      position: 'absolute',
      top: -20,
      right: "-238%",
      width: '473%',
      height: '1147px',
      zIndex: 2,
      padding: 10,
      backgroundColor: "#0807079e",
      overflowY: 'scroll'
   },
   text: {
      cursor: 'pointer',
      '&:hover': {
         backgroundColor: 'lightgray'
      },
      marginBottom: 5
   },
   icon: {
      float: 'right',
      fontSize: 18,
      padding: 0
   },
   center: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      margin: "10px 0px"
   },
   textButton: {
      color: color.primary,
      cursor: "pointer", padding: "5px"
   },
   row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
   },
   simpleRow: {
      display: "flex",
      flexDirection: "row"
   },
   popover: {
    padding: 5,
    maxWidth: 300
},
icon: {
   color: "grey"
 },
}));

 function PhonePopUp(){
    const classes = useStyles();
    return(
                 <CustomPopOver
                label={<LocalPhoneOutlinedIcon className={classes.icon} />}
                                    content={"Check website to capture any available local phone number (1st preference). If not, check if it is available on FB page ( 2nd preference) and provide link In the green box. Capture number with country code, e.g. 62 XX XXXXXXIf not available, click on the tick in the green box."  }/>
     );
 }
export default {
    PhonePopUp
}
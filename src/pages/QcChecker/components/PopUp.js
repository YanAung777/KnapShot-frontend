import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, Paper, ButtonBase, Typography, Popper, Checkbox, Button, Divider, TextField, Radio, Grid } from '@material-ui/core';
import { AssignmentReturnRounded, Clear } from '@material-ui/icons';
import Text from 'components/core/Text';
// import clsx from 'clsx';
import OutsideClickHandler from 'react-outside-click-handler';
//constants
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { color } from 'constants/color';

//context
import InputBase from '@material-ui/core/InputBase';
import { useAppValue } from 'context/app';
import { Check, ExpandMore } from '@material-ui/icons';
import CustomPopOver from 'components/core/CustomPopOver2';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import { PopUpData } from './PopupData';
//API
import api from 'api';

//util
import { getSession } from 'util/check-auth';
//constants
import endpoints from 'constants/endpoints';

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
      width: '50%',
      marginLeft: '26%',
      marginTop: '18%',
      zIndex: 2,
      padding: 10
   },
   options: {
      position: 'absolute',
      // top: 30,
      // width: '110%',
      zIndex: 2,
      padding: 10,
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
   icons: {
      color: 'grey'
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
   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
   }
}));
const BootstrapInput = withStyles((theme) => ({
   root: {
      'label + &': {
         marginTop: theme.spacing(3),
      },
   },
   input: {
      borderRadius: 4,
      position: 'relative',
      width: '100%',
      height: 'inherat',
      backgroundColor: 'transparent',
      fontSize: 12,
      padding: '10px 26px 10px 12px',
      // Use the system font instead of the default Roboto font.
      fontFamily: [
         '-apple-system',
         'BlinkMacSystemFont',
         '"Segoe UI"',
         'Roboto',
         '"Helvetica Neue"',
         'Arial',
         'sans-serif',
         '"Apple Color Emoji"',
         '"Segoe UI Emoji"',
         '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
         borderRadius: 4,
      },
   },
}))(InputBase);


const CustomSelector2 = ({ options, defaultVal, valGetter, outerVal, style, noNone, selectOpen, setSelectOpen, type, setSelectedValue, selectedValue, id }) => {
   const [value, setValue] = React.useState();
   const classes = useStyles();

   // const [selectChange, setSelectChange] = useState(false)

   const handleChange = (event) => {
      setValue(event.target.value)
   };

   // console.log('outerVal', outerVal)
   // console.log('value', value)


   useEffect(() => {
      if (value !== '') valGetter(value)
      else valGetter(defaultVal)
   }, [value, defaultVal])
// console.log('des',defaultVal)
// console.log('value',value)
// console.log('outerArr',outerVal)
// console.log('selectedVal',selectedValue)
   useEffect(()=>{
      if(selectedValue ='') setSelectedValue(selectedValue)
   },[selectedValue])
   const toggle = () => {
      setSelectOpen(!selectOpen);
   }
   useEffect(() => {
      if (value !== '' ) valGetter(value)
   }, [value])

   useEffect(() => {
      setValue(outerVal)
   }, [outerVal, id])

   const onClick = (value) => {
      // console.log('value', value)
      if (valGetter) valGetter(value)
      // setSelectedValue(value)
      setValue(value)
   }

   // console.log('select value', selectedValue)

   if (type == "issue") return (
      <div style={{ position: "relative" }}>
         <OutsideClickHandler onOutsideClick={() => {
            setSelectOpen(false)
         }} >
            <Grid container onClick={toggle} style={{ display: "flex", flexDirection: "row", width: "135px" }}>
               <Grid item xs={11} >
                  <Text value={value} style={{ fontSize: '10px', marginTop: 2, marginLeft: 6, overflow: 'hidden', textOverflow: 'ellipsis', width: "100%", whiteSpace: "nowrap" }} />
               </Grid>
               <Grid item xs={1}>
                  <ExpandMore style={{ marginLeft: '14px' }} />
               </Grid>
            </Grid>
            {
               selectOpen &&
               <Paper className={classes.options} elevation={3} style={{ width: 205, marginLeft: '-48px' }} >
                  <Text style={{ fontWeight: 700, marginBottom: 10 }} value="Select One" />
                  {
                     options.map(option => (
                        <div
                           style={{ display: "flex", flexDirection: "row" }}
                           className={classes.text}
                           onClick={() => {
                              onClick(option)
                              setSelectOpen(false)
                              // setSelectChange(true)
                           }}
                        >
                           {/* <div style={{ width: 20 }}>
                              {selectChange ?
                                 <>{selectedValue.includes(option) && <Check className={classes.icon} />}</>
                                 :
                                 <> {outerVal.includes(option) && <Check className={classes.icon} />}</>
                              }
                           </div> */}
                           <div style={{ width: 20 }}>
                              {value == option && <Check className={classes.icon} />}
                           </div>
                           <Text value={option} />
                        </div>
                     ))
                  }
               </Paper>
            }
         </OutsideClickHandler>
      </div>
      // <Select
      //    open={selectOpen}
      //    onOpen={() => setSelectOpen(true)}
      //    onClose={() => setSelectOpen(false)}
      //    style={{ ...style }}
      //    value={value || defaultVal}
      //    onChange={handleChange}
      //    // onClick={(e) => console.log("select clicked", e)}
      //    // onFocus={(e) => console.log("select focused", e)}
      //    input={<BootstrapInput />}
      // >
      //    {!noNone && <option aria-label="None" value="" />}
      //    {
      //       options.map(child => <option value={child}>{child}</option>)
      //    }
      // </Select>

   )

   else return (
      <NativeSelect
         style={{ ...style }}
         value={value || defaultVal}
         onChange={handleChange}
         onClick={(e) => console.log("select clicked", e)}
         onFocus={(e) => console.log("select focused", e)}
         input={<BootstrapInput />}
      >
         {!noNone && <option aria-label="None" value="" />}
         {
            options.map(child => <option value={child} style={{ wordWrap: "break-word", whiteSpace: "normal", width: 50 }}>{child}</option>)
         }
      </NativeSelect>)

}

function CustomSelect({ dataObj, handleClose, lists, visible, onFileChange, setVisible, selectOpen, setSelectOpen }) {

   const classes = useStyles();
   let { company_data, id, verified, missing, availible } = dataObj
   // const { options, icon } = props;

   //   const valSetter = (name, data) => setTempData({ ...tempData, [name]: data })


   return (
      <OutsideClickHandler onOutsideClick={() => { setVisible(false) }}>
         <div className={classes.root}>
            <Paper style={{ display: 'flex', alignItems: 'center', backgroundColor: '#DAE3F4', height: '37%', width: '112%', marginLeft: '-12px' }} >
               <CustomPopOver
                  label={<Typography style={{ marginLeft: '15px', cursor: 'pointer' }}>{`Irrelevant`}</Typography>}
                  content={PopUpData.irrelevant}
               />

               <Divider className={classes.divider} style={{ marginLeft: '15px' }} orientation="vertical" />
               <CustomSelector2
                  noNone={true}
                  style={{ width: "100%", backgroundColor: '#DAE3F4', height: '72%' }}
                  options={lists}
                  valGetter={onFileChange} />
            </Paper>
            {
               visible &&
               <div className={classes.rootMain}>
                  <Paper className={classes.option}>
                     <Clear
                        onClick={() => { handleClose() }}
                        style={{ position: "absolute", cursor: "pointer", right: 25, fontSize: 32, color: "lightGrey" }} />
                     <Typography style={{ marginTop: '7%', marginLeft: '10%' }}>Since this company is irrelevant, move on to the next company</Typography>
                  </Paper>
               </div>
            }
         </div>
      </OutsideClickHandler >
   );
}

function IssueSelect({ issue, onsSelectChange, outerVal, selectOpen, setSelectOpen, type, id }) {
   const classes = useStyles()
   const [selectedValue, setSelectedValue] = useState('')

   return (

      <Paper style={{ display: 'flex', alignItems: 'center', backgroundColor: '#DAE3F4', height: '37%', width: '112%' }} >
         <CustomPopOver
            label={<div style={{ marginLeft: '3%', display: 'flex', cursor: 'pointer' }}>
               <LanguageOutlinedIcon className={classes.icon} /> <Typography style={{ marginLeft: '1%' }}>{`Issue`}</Typography></div>}
            content="If the website has issues, select the reasons from the drop down menu. Continue with the rest of the QC check"
         />
         <Divider className={classes.divider} style={{ marginLeft: '15px' }} orientation="vertical" />
         <CustomSelector2
            id={id}
            type={type}
            selectOpen={selectOpen}
            setSelectOpen={setSelectOpen}
            noNone={true}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            style={{ width: "100%", backgroundColor: '#DAE3F4', height: '72%' }}
            valGetter={onsSelectChange}
            outerVal={outerVal}
            options={issue}
         />
      </Paper>
   );
}

export default {
   CustomSelect,
   IssueSelect
}
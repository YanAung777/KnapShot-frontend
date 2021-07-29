import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Paper, Popper, Grid, Divider, ButtonGroup, IconButton, Checkbox, Button, Tooltip } from '@material-ui/core';
import Text from 'components/core/Text';
import QcFieldList from './QcfieldList'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { Clear, ChevronRight, CheckBoxOutlineBlank, CheckBox, ExpandMore, ExpandLess, ArrowDropDownIcon, CheckCircleOutline, RadioButtonUnchecked, ArrowBackIos, ControlPoint, Close, LocalDining } from '@material-ui/icons';
import { object } from 'prop-types';
const useStyles = makeStyles({
    root: {
        position: 'relative',
        marginLeft: 10,
        height: 70
    },
    field: {
        height: window.innerHeight - 140,
        overflowY: 'scroll'
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "fix-Start",
        // justifyContent: "space-between"
    },
    simpleRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 70
    },
    column: {
        display: 'flex',
        // alignItems: 'center',
        marginLeft: 30,
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: "column"
    },
    text: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'lightgray'
        },
        // marginBottom: 5
        marginLeft: 110,
        marginTop: 31,
        width: 80,
        height: 36,
        backgroundColor: 'lightGray'
    },
});

export default function SmallHeader(props) {
    let { dataObj } = props
    let { company_data } = dataObj
    const classes = useStyles();
    const [open, setOpen] = useState(false)

    React.useEffect(() => {

        if (company_data && Object.keys(company_data).length) {
            setOpen(true)
        }


    }, [company_data]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: "flex", flexDirection: "row", backgroundColor: 'white', borderBottom: "1px solid lightgrey", padding: '10px' }}>
                <Text
                    // onClick={() => { setOpen(false) }} 

                    value={`Task Details`} style={{
                        cursor: 'pointer', '&:hover': { backgroundColor: 'lightgray' }, marginLeft: 110,
                        padding: '12px',
                        borderRadius: '10%',
                        backgroundColor: open ? 'white' : 'lightGray'
                    }} />
                <Text
                    // onClick={() => { setOpen(true) }} 
                    value={`Checker Dashboard`} style={{
                        cursor: 'pointer',
                        padding: '12px',
                        marginLeft: '120px',
                        borderRadius: '10%',
                        backgroundColor: open ? 'lightgray' : 'white'
                    }} />
            </div>

            {/* <div style={{width:'100%',padding:'65px'}}> */}
            {open ?
                <div className={classes.field}>
                    <QcFieldList {...props} />
                </div>
                : (
                    <Paper style={{ boxShadow: "5px 5px 5px 0px #ccc", display: 'flex', alignItems: 'center', flexDirection: 'row', width: '80%', marginLeft: '50px', marginTop: '35px', padding: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Paper style={{ padding: '10px' }}>
                                <div className={classes.row}>
                                    <NotificationsNoneIcon style={{ width: '5%', height: '20%' }} />
                                    <div className={classes.column} style={{ marginBottom: '10px' }}>
                                        <Text style={{ fontSize: '12', fontWeight: 'bold' }} value={'Welcome on board!'} />
                                        <Text value={"Here's quick portal orientation."} />
                                        <Text value={"The assigned file to qc is indicated on top left hand corner."} />
                                        <Text value={"Turn around time and number of companies to QC is indicted below the file name."} />
                                        <Text value={"List of assigned companies are listed on the left hand side."} />
                                    </div>
                                </div>
                            </Paper>
                            <Paper style={{ padding: '10px' }}>
                                <div className={classes.row}>
                                    <NotificationsNoneIcon style={{ width: '5%', height: '20%' }} />
                                    <div className={classes.column}>
                                        <Text style={{ fontSize: '12', fontWeight: 'bold' }} value={'Assigned tasks are as follows:'} />
                                        <Text value={"1     QC assigned companies.Click on the orange sign to expand view of company profile."} />
                                        <Text value={"2     Check provide fields are correct.If not, indicate as incorrect and replace with right info."} />
                                        <Text value={"3     For those missing fields,do google research to check whether info is available and append."} />
                                    </div>
                                </div>
                            </Paper>
                        </div>
                        <Text value="X" onClick={() => { setOpen(false) }} style={{ float: 'right', display: 'flex', marginBottom: '52%', cursor: "pointer" }} />
                    </Paper>
                )
            }
        </div>
        // </div>
    );
}

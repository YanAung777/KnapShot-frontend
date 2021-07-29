import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, ButtonBase, Divider, Popover,Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import countries from 'i18n-iso-countries';
import moment from 'moment'

//components
import Text from 'components/core/Text';

//route
import { history } from 'router/history';

let countryISO3

const useStyles = makeStyles(theme => ({
    button: {
        marginLeft: '5px',
        marginRight: '5px',
        border: '1.2px solid lightgray',
        borderRadius: 20,
        padding: '3px 10px',
        height: 25,
        minWidth: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    option: {
        display: 'flex',
        boxShadow: 'none',
        minWidth: 170,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    text: {
        textTransform: 'capitalize',
        backgroundColor: '#000',
        display: 'flex',
        margin: '3px 10px 3px auto'
    },
}));

export function Selector1({ slist, setSlist, country, checkBox, setCheckBox,checkedData, setCheckedData  }){

    const classes = useStyles()
    let sslist

    const [visible, setVisible] = useState(false);
    const [anchorEl, setAnchorEl] = useState()

    const onChange = (e) => {
        const checkBoxName = e.target.value;
        const checked = e.target.checked;
        const index = e.target.id;
        let temp = [...checkedData];
        let tempCheckBox = checkBox

        tempCheckBox[index] = !tempCheckBox[index]
        if (checked) temp.push(checkBoxName);
        else temp.splice(temp.indexOf(checkBoxName), 1);

        setCheckedData(temp)
        setCheckBox(tempCheckBox)
    }

    countryISO3 = country.map(x => {
        return { "name": x, "iso3": countries.getAlpha3Code(x, 'en') }
    })

    const recordButtonPosition = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const toggle = () => {
        setVisible(!visible);
    }

    const handleClose = () => {
        setVisible(false);
    }

    const onClick = (value) => {
        setVisible(!visible)
        sslist = ""
        if (checkedData.length > 0) {
            checkedData.map(x => {
                sslist = sslist + x + ","
            })
            setSlist(sslist)
        }
        else { setSlist('Select Country') }
    }

    return (
        <div>
            <div onClick={toggle}>
                <ButtonBase className={classes.button} onClick={recordButtonPosition} >
                    <div style={{ margin: "0 auto", fontSize: '12px' }}>{slist[slist.length - 1] === ',' ? slist.slice(0, -1) : slist}</div>
                </ButtonBase>
            </div>
            <Popover
                onClose={handleClose}
                open={visible}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Paper className={classes.option}>
                    <Text value="Select Single/Multiple" style={{ fontSize: '12px', margin: '4px 6px' }} />
                    <Divider />
                    {
                        countryISO3.map((x, i) => (
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '25px' }}>
                                <Checkbox
                                    id={i}
                                    checked={checkBox[i]}
                                    value={x.iso3}
                                    onChange={onChange}
                                    color="default"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    size="small"
                                />
                                <Text value={`${x.name} (${x.iso3})`} style={{ fontSize: '12px' }} />
                            </div>
                        ))
                    }
                    <Divider />
                    <Button variant="contained" size="small" className={classes.text} style={{ float: 'right', minWidth: 'auto', backgroundColor: 'black' }} >
                        <Text value="Save" style={{ color: 'white', fontSize: '12px' }} onClick={() => onClick(null)} />
                    </Button>
                </Paper>
            </Popover>
        </div>
    )
}

export function Selector2  (props)  {

    const classes = useStyles()

    const {date, setDate, display, setDisplay,selectedValue, setSelectedValue}=props

    const [visible, setVisible] = useState(false);
    const [anchorEl, setAnchorEl] = useState()

    let expiry = [
        { name: "30 Days Expiry", value: "30d" },
        { name: "60 Days Expiry", value: "60d" },
        { name: "1 year Subscription", value: "1yr" },
    ]

    const onChange = (e) => {
        setSelectedValue(e.target.value)
    }

    const recordButtonPosition = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const toggle = () => {
        setVisible(!visible);
    }

    const handleClose = () => {
        setVisible(false);
    }

    const onClick = (value) => {
        setVisible(!visible)
        setDisplay(value)
    }

    useEffect(() => {
        if (selectedValue === '30d') setDate(moment().add(30, 'days').format('D MMM YYYY'))
        if (selectedValue === '60d') setDate(moment().add(60, 'days').format('D MMM YYYY'))
        if (selectedValue === '1yr') setDate(moment().add(1, 'year').format('D MMM YYYY'))
    }, [selectedValue])

    return (
        <div>
            <div onClick={toggle}>
                <ButtonBase className={classes.button} onClick={recordButtonPosition} >
                    <div style={{ margin: "0 auto", fontSize: '12px' }}>{display}</div>
                </ButtonBase>
            </div>
            <Popover
                onClose={handleClose}
                open={visible}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Paper className={classes.option}>
                    <Text value="Select One" style={{ fontSize: '12px', margin: '4px 6px' }} />
                    <Divider />
                    {
                        expiry.map((x) => (
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '25px' }}>
                                <Radio
                                    checked={selectedValue === x.value}
                                    onChange={onChange}
                                    value={x.value}
                                    name="plan"
                                    size="small"
                                    style={{ color: '#3c8dbc' }}
                                />
                                <Text value={x.name} style={{ fontSize: '12px' }} />
                            </div>
                        ))
                    }
                    <div style={{ height: 40, padding: '5px 13px' }}>
                        {
                            date && date !== 'Select Plan Expiry' ?
                                <>
                                    <Text value="Expiry Date" style={{ fontWeight: 600, fontSize: '12px', marginBottom: '5px' }} />
                                    <Text value={date} style={{ fontSize: '12px', marginTop: '5px' }} />
                                </>
                                : ''
                        }
                    </div>
                    <Divider />
                    <Button variant="contained" size="small" className={classes.text} style={{ float: 'right', minWidth: 'auto', backgroundColor: 'black' }}>
                        <Text value="Save" style={{ color: 'white', fontSize: '12px' }} onClick={() => onClick(date)} />
                    </Button>
                </Paper>
            </Popover>
        </div>
    )
}
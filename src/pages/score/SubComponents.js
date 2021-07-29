import React, { useState, useEffect } from 'react';
import PropTypes, { object } from 'prop-types';
import { makeStyles, withStyles, Paper, Typography, Checkbox, Divider, TextField, NativeSelect, InputBase } from '@material-ui/core';
import { Clear, LockOpen, Lock, ArrowRight, ArrowDropDown, ChevronRight, CheckBoxOutlineBlank, CheckBox, ExpandMore, ExpandLess, ArrowDropDownIcon, CheckCircleOutline, RadioButtonUnchecked, ArrowBackIos, ControlPoint, Close } from '@material-ui/icons';
import OutsideClickHandler from 'react-outside-click-handler';
import { uuid } from 'uuidv4';

import Text from 'components/core/Text'

import { grey, blueGrey } from '@material-ui/core/colors';
import CheckboxTree from 'react-checkbox-tree';
import { nodes } from 'constants/technoNode';
import ThreeColorProgressBar from 'components/core/ThreeColorProgressBar';
//API
import api from 'api';
import { keyValues } from 'constants/keyValuesPair2'

//util
import { getSession } from 'util/check-auth';
//constants
import endpoints from 'constants/endpoints';
import { useStateWithPromise } from 'constants/useStateWithPromise';
import prototypes from 'constants/prototypes';
import Tooltip from '@material-ui/core/Tooltip';
import Confirmation from 'components/core/Confirmation';
//context
import { useAppValue } from 'context/app';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        marginLeft: 10,
    },
    option: {
        position: 'absolute',
        top: 50,
        height: window.innerHeight / 1.15,
        right: window.innerWidth / 9,
        width: window.innerWidth * 0.75,
        zIndex: 2,
        padding: 10
    },
    rootMain: {
        position: 'absolute',
        top: -20,
        right: "-160%",
        width: window.innerWidth,
        height: window.innerHeight,
        zIndex: 2,
        padding: 10,
        backgroundColor: "#0807079e"
    },
    text: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'lightgray'
        },
        marginBottom: 5
    },
    center: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: "10px 0px"
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
    scrollbar: {
        backgroundColor: "#F5F5F5",
        height: window.innerHeight * .68,
        overflowY: "scroll"
    }
}));

const useStylesForTextField = makeStyles(theme => ({
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        }
    }
}));

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        // borderRadius: 4,
        minWidth: 0,
        height: 20,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 12,
        padding: '5px 15px 5px 6px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);


const CustomSelector = ({ options, defaultVal, valGetter, outerValue, style, noNone }) => {
    const [value, setValue] = React.useState();

    const handleChange = (event) => {
        setValue(event.target.value);
    };


    // useEffect(() => {
    //     if (value !== '') valGetter(value)
    //     else valGetter(defaultVal)
    // }, [value, defaultVal])



    // useEffect(() => {
    //     if (value !== '') valGetter(value)
    // }, [value])

    useEffect(() => {
        if (outerValue) setValue(outerValue);
    }, [outerValue])

    return (
        <NativeSelect
            style={{ ...style }}
            value={value || defaultVal}
            onChange={handleChange}
            input={<BootstrapInput />}
        >
            {!noNone && <option aria-label="None" value="" />}
            {
                options.map(child => <option value={child}>{child}</option>)
            }
        </NativeSelect>
    )
}

const CustomSelector2 = ({ options, defaultVal, valGetter, outerValue, style, noNone }) => {
    const [value, setValue] = React.useState();

    const handleChange = (event) => {
        setValue(event.target.value);
    };


    // useEffect(() => {
    //     if (value !== '') valGetter(value)
    //     else valGetter(defaultVal)
    // }, [value, defaultVal])



    useEffect(() => {
        if (value !== '') valGetter(value)
    }, [value])

    useEffect(() => {
        if (outerValue) setValue(outerValue);
    }, [outerValue])

    return (
        <NativeSelect
            style={{ ...style }}
            value={value || defaultVal}
            onChange={handleChange}
            input={<BootstrapInput />}
        >
            {!noNone && <option aria-label="None" value="" />}
            {
                options.map(child => <option value={child}>{child}</option>)
            }
        </NativeSelect>
    )
}

function CheckWithPercent({ name, index, handleCategoryCheckbox, checkOrNot, color, textColor, styleProps, outerVal, valChanges }) {
    const classes = useStyles();
    const classes2 = useStylesForTextField();
    const [toggle, setToggle] = useState(false)
    const [value, setValue] = useState();

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        // const timer = setTimeout(() => valChanges(name, value), 1500);
        // return () => clearTimeout(timer);
        toggle && valChanges(name, value)
    }, [value]);

    useEffect(() => {
        setValue(outerVal)
    }, [outerVal])

    return <Paper style={{
        justifyContent: 'space-evenly', position: 'relative', width: '80%', height: 32,
        marginTop: '10px', backgroundColor: color, marginLeft: '50px', borderRadius: '25px',
        ...styleProps
    }} >
        <div className={classes.row}>
            <div className={classes.simpleRow} >

                <Checkbox
                    style={{ marginBottom: "7px" }}
                    name={name}
                    checked={checkOrNot(name)}
                    onChange={handleCategoryCheckbox}
                    icon={<RadioButtonUnchecked style={{ backgroundColor: 'white', borderRadius: '50%' }} />}
                    checkedIcon={<CheckCircleOutline style={{ backgroundColor: 'white', borderRadius: '50%', color: "grey" }} />}
                />
                <Typography key={index} style={{ fontSize: "12px", paddingLeft: 10, display: "flex", alignItems: "center", color: textColor, marginBottom: "7px" }}>{name}</Typography>
            </div>
            <div className={classes.simpleRow} style={{ marginRight: '15px' }}>
                <div style={{ marginRight: '15px', alignItems: 'center', cursor: 'pointer', color: "white", marginTop: "5px" }}>
                    {
                        toggle ? <LockOpen onClick={() => setToggle(old => !old)} />
                            : <Lock onClick={() => setToggle(old => !old)} />
                    }
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <span style={{ borderRadius: 25, backgroundColor: 'white', width: 25, height: 25, display: "flex", alignItems: "center", justifyContent: "center" }} >
                        <TextField
                            disabled={!toggle}
                            inputProps={{
                                // classes2
                                style: {
                                    textAlign: 'center',
                                    fontSize: 10,
                                    borderRadius: 40,
                                    // ...classes.underline,
                                    borderBottom: "none"
                                }
                            }}
                            value={value}
                            onChange={handleChange}
                        />

                    </span></div>

            </div>
        </div>
    </Paper>
}

function CheckWithPercentChild({ name, index, handleCategoryCheckbox, checkOrNot, color, textColor, styleProps, outerVal, valChanges }) {
    const classes = useStyles();
    const classes2 = useStylesForTextField();
    const [toggle, setToggle] = useState(false)
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(outerVal)
    }, [outerVal])

    useEffect(() => {
        // const timer = setTimeout(() => valChanges(name, value), 1500);
        // return () => clearTimeout(timer);
        toggle && valChanges(name, value)
    }, [value]);


    // const refresh = () => {
    //     let maxTotal = max
    //     let tempObj = { ...valChangesObj }
    //     let filteredArr = Object.values(valChangesObj).filter(val => val != each)
    //     for (let minus of filteredArr) maxTotal -= minus
    //     let eachVal = (maxTotal / (renderData.length - filteredArr.length)).toFixed(2)
    //     for (let key of Object.keys(valChangesObj)) if (valChangesObj[key] == each) tempObj[key] = eachVal
    //     
    //     setValChangesObj(tempObj)
    // }

    return <Paper style={{
        justifyContent: 'space-evenly', position: 'relative', width: '80%', height: 32,
        marginTop: '10px', backgroundColor: color, marginLeft: '50px', borderRadius: '25px',
        ...styleProps
    }} >
        <div className={classes.row}>
            <div className={classes.simpleRow} >

                <Checkbox
                    style={{ marginBottom: "7px" }}
                    name={name}
                    checked={checkOrNot(name)}
                    onChange={(e) => handleCategoryCheckbox(e, name)}
                    icon={<RadioButtonUnchecked style={{ backgroundColor: 'white', borderRadius: '50%' }} />}
                    checkedIcon={<CheckCircleOutline style={{ backgroundColor: 'white', borderRadius: '50%', color: "grey" }} />}
                />
                <Typography key={index} style={{ fontSize: "12px", paddingLeft: 10, display: "flex", alignItems: "center", color: textColor, marginBottom: "7px" }}>{name}</Typography>
            </div>
            <div className={classes.simpleRow} style={{ marginRight: '15px' }}>
                <div style={{ marginRight: '15px', alignItems: 'center', cursor: 'pointer', color: "white", marginTop: "5px" }}>
                    {
                        toggle ? <LockOpen onClick={() => setToggle(old => !old)} />
                            : <Lock onClick={() => setToggle(old => !old)} />
                    }
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <span style={{ borderRadius: 25, backgroundColor: 'white', width: 25, height: 25, display: "flex", alignItems: "center", justifyContent: "center" }} >
                        <TextField
                            disabled={!toggle}
                            inputProps={{
                                // classes2
                                style: {
                                    textAlign: 'center',
                                    fontSize: 10,
                                    borderRadius: 40,
                                    // ...classes.underline,
                                    borderBottom: "none"
                                }
                            }}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />

                    </span></div>

            </div>
        </div>
    </Paper>
}

function CheckWithPercent2({ name, setSelectedDataFunc, index, handleCategoryCheckbox, checkOrNot, parentTrueOrNot, outerVal, valChanges, setChildScoreFunc, allPercent }) {
    const classes = useStyles();
    const [toggle, setToggle] = useState(false)
    const [collapse, setCollapse] = useState(false)
    const [value, setValue] = useState();
    const [oldCheck, setOldCheck] = useState('')
    const [allCheckBoxes, setAllCheckBoxes] = useState(false)
    const [category, setCategory] = useState([]);
    const [max, setMax] = useState(0)
    const [valChangesObj, setValChangesObj] = useStateWithPromise({})
    const [changes, setChanges] = useState(false)

    useEffect(() => {
        setMax(outerVal)
    }, [outerVal])


    useEffect(() => {
        if (allPercent && Object.keys(allPercent).length) {
            let eachVal = Object.values(allPercent).find(element => element.split('+')[1] == 'default').split('+')[0]
            eachVal = parseFloat(eachVal).toFixed(2)
            setValChangesObj(allPercent).then(res => { if (Object.keys(res).length) setChanges(old => !old) })
            setOldCheck(eachVal)
        }
        else {
            let tempObj = { ...valChangesObj }
            let eachVal = (max / 6).toFixed(2)
            for (let key of keyValues[name]) tempObj[key] = eachVal + "+" + "default"
            setValChangesObj(tempObj).then(res => { if (Object.keys(res).length) setChanges(old => !old) })

        }
    }, [max])

    const valChanges2 = (name, val) => {
        let tempObj = { ...valChangesObj }
        tempObj[name] = val + "+" + "changed"
        setValChangesObj(tempObj).then(res => { if (Object.keys(res).length) setChanges(old => !old) })
    }

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        // const timer = setTimeout(() => valChanges(name, value), 1500);
        // return () => clearTimeout(timer);
        toggle && valChanges(name, value)
    }, [value]);

    useEffect(() => {
        setValue(outerVal)
        setChanges(!changes)
    }, [outerVal])

    useEffect(() => {
        setChildScoreFunc({ [name]: valChangesObj })
    }, [valChangesObj])

    useEffect(() => {
        const refresh = () => {

            let maxTotal = max
            let tempObj = { ...valChangesObj }
            let filteredArr = Object.values(valChangesObj).filter(val => val.split('+')[1] == 'changed')
            for (let minus of filteredArr) maxTotal -= minus.split('+')[0]
            let eachVal = (maxTotal / (6 - filteredArr.length)).toFixed(2)
            for (let key of Object.keys(valChangesObj)) if (valChangesObj[key].split('+')[1] == 'default') tempObj[key] = eachVal + "+" + "default"

            if (Object.keys(valChangesObj).length) setValChangesObj(tempObj)

            setChildScoreFunc({ [name]: tempObj })


        }
        refresh()
    }, [changes])
    const checkOrNot2 = (name) => allCheckBoxes && allCheckBoxes[name] ? true : false
    const handleCategoryCheckbox2 = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;

        let tempObj = { ...valChangesObj }
        let tempCheckBox = { ...allCheckBoxes };
        let tempCategory = [...category];

        tempCheckBox[name] = checked
        if (checked) {
            tempObj[name] = oldCheck + "+" + "default"
        }
        if (checked && !tempCategory.includes(name)) {
            tempCategory.push(name);
        }
        else {
            setOldCheck(tempObj[name])
            tempCategory.splice(tempCategory.indexOf(name), 1);
            tempObj[name] = "0+changed"
        }

        setCategory(tempCategory)
        setAllCheckBoxes(tempCheckBox)
        setSelectedDataFunc(tempCheckBox, "tech")

        setValChangesObj(tempObj).then(res => {
            if (Object.keys(res).length) setChanges(old => !old)
        })

        // setChanges(old => !old)

    }

    return (
        <React.Fragment>
            <Paper style={{
                justifyContent: 'space-evenly', position: 'relative', width: '80%', height: 32,
                marginTop: '10px', backgroundColor: "#F2346A", marginLeft: '50px', borderRadius: '25px'
            }} >
                <div className={classes.row} >
                    <div className={classes.simpleRow}  >
                        {collapse ?
                            <ArrowRight style={{ fontSize: 32, cursor: 'pointer', color: 'white', marginBottom: "7px" }} onClick={() => setCollapse(old => !old)} />
                            :
                            <ArrowDropDown style={{ fontSize: 32, cursor: 'pointer', color: 'white', marginBottom: "7px" }} onClick={() => setCollapse(old => !old)} />
                        }
                        <Checkbox
                            style={{ marginBottom: "7px" }}
                            name={name}
                            checked={parentTrueOrNot(name)}
                            onChange={(e) => handleCategoryCheckbox(e)}
                            icon={<RadioButtonUnchecked style={{ backgroundColor: 'white', borderRadius: '50%' }} />}
                            checkedIcon={<CheckCircleOutline style={{ backgroundColor: 'white', borderRadius: '50%', color: "grey" }} />}
                        />
                        <Typography key={index} style={{ fontSize: "12px", paddingLeft: 10, display: "flex", alignItems: "center", color: 'white', marginBottom: "7px" }}>{name}</Typography>
                    </div>
                    <div className={classes.simpleRow} style={{ marginRight: '15px' }}>
                        <div style={{ marginRight: '15px', alignItems: 'center', cursor: 'pointer', color: 'white', marginTop: '5px' }}>
                            {
                                toggle ? <LockOpen onClick={() => setToggle(old => !old)} />
                                    : <Lock onClick={() => setToggle(old => !old)} />
                            }
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                            <span style={{ borderRadius: 25, backgroundColor: 'white', width: 25, height: 25, display: "flex", alignItems: "center", justifyContent: "center" }} >
                                <TextField
                                    disabled={!toggle}
                                    style={{ textDecoration: 'none', borderRadius: 25, display: 'flex' }}
                                    inputProps={{
                                        style: {
                                            textAlign: 'center',
                                            fontSize: 10,
                                            borderRadius: 40,
                                        }
                                    }}
                                    value={value}
                                    onChange={handleChange}
                                />

                            </span>
                        </div>
                    </div>
                </div>
            </Paper>
            {
                collapse &&
                keyValues[name].map(key => <CheckWithPercentChild name={key}
                    index={index}
                    styleProps={{ marginLeft: 80, width: "75%" }}
                    checkOrNot={checkOrNot}
                    handleCategoryCheckbox={handleCategoryCheckbox2}
                    color={"#F2346A"}
                    textColor={"white"}
                    outerVal={valChangesObj[key] ? valChangesObj[key].split('+')[0] : ''}
                    valChanges={valChanges2}
                />)
            }
        </React.Fragment>
    )
}

const CompanyContacts = ({ setSelectedDataFunc, handleCategoryCheckbox2, setSelectedScore, allData, setCheckboxVisible, MaxRange, percent, allPercent }) => {

    const classes = useStyles();

    const [category, setCategory] = useState([]);
    const [oldCheck, setOldCheck] = useState("");

    const renderData = ["Company Name", "Country", "Website", "LinkedIn", "Facebook", "Instagram", "Twitter", "Youtube", "Main Line Number", "Email Address"]

    const [allCheckBoxes, setAllCheckBoxes] = useState({});
    const [max, setMax] = useState(0)
    const [valChangesObj, setValChangesObj] = useStateWithPromise({});
    const [changes, setChanges] = useState(false)

    useEffect(() => {
        if (allPercent && Object.keys(allPercent).length) {
            setValChangesObj(allPercent)
            setSelectedScore({ "Company Contacts": allPercent })
        }

    }, [allPercent])

    useEffect(() => {
        async function settingData() {
            const filtered = await Object.keys(allData)
                .filter(key => renderData.includes(key))
                .reduce((obj, key) => {
                    obj[key] = allData[key];
                    return obj;
                }, {});
            setAllCheckBoxes(filtered)
        }
        settingData()
    }, [allData])

    useEffect(() => {
        setMax(MaxRange * percent / 100)
    }, [percent, MaxRange])

    useEffect(() => {

        if (allPercent && Object.keys(allPercent).length) {
            let eachVal = Object.values(allPercent).find(element => element.split('+')[1] == 'default').split('+')[0]
            eachVal = parseFloat(eachVal).toFixed(2)
            setOldCheck(eachVal)
        }
        else {
            let tempObj = { ...valChangesObj }
            let eachVal = (max / renderData.length).toFixed(2)
            for (let key of renderData) tempObj[key] = eachVal + "+" + "default"
            setValChangesObj(tempObj)
        }
    }, [max])



    const valChanges = (name, val) => {
        let tempObj = { ...valChangesObj }
        tempObj[name] = val + "+" + "changed"
        setValChangesObj(tempObj).then(res => setChanges(old => !old))
    }

    useEffect(() => {
        const refresh = () => {
            let maxTotal = max
            let tempObj = { ...valChangesObj }
            let filteredArr = Object.values(valChangesObj).filter(val => val.split('+')[1] == 'changed')
            for (let minus of filteredArr) maxTotal -= minus.split('+')[0]
            let eachVal = (maxTotal / (renderData.length - filteredArr.length)).toFixed(2)
            for (let key of Object.keys(valChangesObj)) if (valChangesObj[key].split('+')[1] == 'default') tempObj[key] = eachVal + "+" + "default"
            if (Object.keys(valChangesObj).length) {
                setValChangesObj(tempObj)
                setSelectedScore({ "Company Contacts": tempObj })
            }
        }
        if (!(allPercent && Object.keys(allPercent).length)) refresh()
        refresh()
    }, [changes])

    const clearFilter = () => {

        let arr = { ...allCheckBoxes }
        let tempCategory = [...category];
        renderData.map(comp => {
            arr[comp] = false
            tempCategory.splice(tempCategory.indexOf(comp), 1)
        })
        setAllCheckBoxes(arr)
        setCategory(tempCategory)
        setSelectedDataFunc(arr, "comp")
    }

    const checkAll = (event) => {
        let arr = {}
        renderData.map(comp => arr[comp] = true)
        setAllCheckBoxes(arr)
        setCategory(renderData)
        setSelectedDataFunc(arr, "comp")
    }

    const checkOrNot = (name) => allCheckBoxes && allCheckBoxes[name] ? true : false

    const handleCategoryCheckbox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;

        let tempObj = { ...valChangesObj }
        let tempCheckBox = { ...allCheckBoxes };
        let tempCategory = [...category];
        tempCheckBox[name] = checked
        // if (checked) {
        //     tempObj[name] = oldCheck
        // }
        if (checked && !tempCategory.includes(name)) {
            tempCategory.push(name);
            tempObj[name] = oldCheck + "+" + "default"
        }

        else {
            setOldCheck(tempObj[name])
            tempCategory.splice(tempCategory.indexOf(name), 1);
            tempObj[name] = "0+changed"
        }

        setCategory(tempCategory)
        setAllCheckBoxes(tempCheckBox)
        setSelectedDataFunc(tempCheckBox, "comp")

        setValChangesObj(tempObj).then(res => {
            if (Object.keys(res).length) setChanges(!changes)
        })
        // setChanges(old => !old)

    }
    return (
        <div style={{ width: "100%", height: "100%", border: "0.5px solid lightgrey", borderRadius: 4 }}>
            <OutsideClickHandler onOutsideClick={() => setCheckboxVisible(false)}>
                <Text value={"Company Contacts"} style={{ textIndent: "5px", fontSize: "13px", padding: 5 }} />
                <Divider />
                <div className={classes.center} style={{ justifyContent: "space-between", padding: "0px 5px" }}>
                    <Text value={"Clear Filter"} className={classes.textButton} onClick={clearFilter} />
                    <Text value={"Select All"} className={classes.textButton} onClick={checkAll} />
                </div>
                <Divider />
                <div className={classes.scrollbar} >
                    {Object.keys(valChangesObj).map((key, index) => (
                        <CheckWithPercent
                            outerVal={valChangesObj[key] ? valChangesObj[key].split('+')[0] : ''}
                            valChanges={valChanges}
                            name={key}
                            index={index}
                            checkOrNot={checkOrNot}
                            handleCategoryCheckbox={handleCategoryCheckbox}
                            color="#5A9BD5"
                            textColor={"black"} />
                    ))}
                </div>
            </OutsideClickHandler >
        </div>
    )
}

const CompanyFrimographic = ({ setSelectedDataFunc, setSelectedScore, allData, setCheckboxVisible, MaxRange, percent, allPercent }) => {

    const classes = useStyles();

    const [category, setCategory] = useState([]);
    const [oldCheck, setOldCheck] = useState('');
    const renderData = ["Industry", "Category", "Products/Services", "Years in Operation", "Employee Size", "HQ Location", "Partners", "Awards"]

    // const [allCheckBoxes, setAllCheckBoxes] = useState({});
    const [allCheckBoxes, setAllCheckBoxes] = useState();
    const [max, setMax] = useState(0)
    const [valChangesObj, setValChangesObj] = useStateWithPromise({});
    const [changes, setChanges] = useState(false)

    useEffect(() => {
        if (allPercent && Object.keys(allPercent).length) {
            setValChangesObj(allPercent)
            setSelectedScore({ "Firmographic": allPercent })
        }
    }, [allPercent])

    useEffect(() => {
        async function settingData() {
            const filtered = await Object.keys(allData)
                .filter(key => renderData.includes(key))
                .reduce((obj, key) => {
                    obj[key] = allData[key];
                    return obj;
                }, {});
            setAllCheckBoxes(filtered)
        }
        settingData()

    }, [allData])


    useEffect(() => {
        setMax(MaxRange * percent / 100)
    }, [percent, MaxRange])

    useEffect(() => {
        if (allPercent && Object.keys(allPercent).length) {
            let eachVal = Object.values(allPercent).find(element => element.split('+')[1] == 'default').split('+')[0]
            eachVal = parseFloat(eachVal).toFixed(2)
            setOldCheck(eachVal)
        }
        else {
            let tempObj = { ...valChangesObj }
            let eachVal = (max / renderData.length).toFixed(2)
            for (let key of renderData) tempObj[key] = eachVal + "+" + "default"
            setValChangesObj(tempObj)
        }
    }, [max])

    const valChanges = (name, val) => {
        let tempObj = { ...valChangesObj }
        tempObj[name] = val + "+" + "changed"
        setValChangesObj(tempObj).then(res => setChanges(old => !old))
    }

    useEffect(() => {
        const refresh = () => {
            let maxTotal = max
            let tempObj = { ...valChangesObj }
            let filteredArr = Object.values(valChangesObj).filter(val => val.split('+')[1] == 'changed')
            for (let minus of filteredArr) maxTotal -= minus.split('+')[0]
            let eachVal = (maxTotal / (renderData.length - filteredArr.length)).toFixed(2)
            for (let key of Object.keys(valChangesObj)) if (valChangesObj[key].split('+')[1] == 'default') tempObj[key] = eachVal + "+" + "default"
            if (Object.keys(valChangesObj).length) {
                setValChangesObj(tempObj)
                setSelectedScore({ "Firmographic": tempObj })
            }
        }
        if (!(allPercent && Object.keys(allPercent).length)) refresh()
        refresh()
    }, [changes])

    const clearFilter = () => { // pass true or false to check or uncheck all

        let arr = { ...allCheckBoxes }
        let tempCategory = [...category];
        renderData.map(comp => {
            arr[comp] = false
            tempCategory.splice(tempCategory.indexOf(comp), 1)
        })
        setAllCheckBoxes(arr)
        setCategory(tempCategory)
        setSelectedDataFunc(arr, "frimo")
    }

    const checkAll = (event) => { // pass true or false to check or uncheck all
        let arr = {}
        renderData.map(comp => arr[comp] = true)
        setAllCheckBoxes(arr)
        setCategory(renderData)
        setSelectedDataFunc(arr, "frimo")
    }

    const checkOrNot = (name) => allCheckBoxes && allCheckBoxes[name] ? true : false

    const handleCategoryCheckbox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;

        let tempObj = { ...valChangesObj }
        let tempCheckBox = { ...allCheckBoxes };
        let tempCategory = [...category];

        tempCheckBox[name] = checked
        if (checked) {
            tempObj[name] = oldCheck + "+" + "default"
        }
        if (checked && !tempCategory.includes(name)) {
            tempCategory.push(name);
        }
        else {
            setOldCheck(tempObj[name])
            tempCategory.splice(tempCategory.indexOf(name), 1);
            tempObj[name] = "0+changed"
        }

        setCategory(tempCategory)
        setAllCheckBoxes(tempCheckBox)
        setSelectedDataFunc(tempCheckBox, "frimo")

        setValChangesObj(tempObj).then(res => {
            if (Object.keys(res).length) setChanges(old => !old)
        })
    }

    // useEffect(() => {
    //     let tempObj = { ...allCheckBoxes }
    //     Object.keys(tempObj).forEach(function (key) {
    //         tempObj[key] = allData[key]
    //     })
    //     setAllCheckBoxes(tempObj)
    // }, [allData])

    return (
        <div style={{ width: "100%", height: "100%", border: "0.5px solid lightgrey", borderRadius: 4 }}>
            <OutsideClickHandler onOutsideClick={() => setCheckboxVisible(false)}>
                <Text value={"Company Frimographic"} style={{ textIndent: "5px", fontSize: "13px", padding: 5 }} />
                <Divider />
                <div className={classes.center} style={{ justifyContent: "space-between", padding: "0px 5px" }}>
                    <Text value={"Clear Filter"} className={classes.textButton} onClick={clearFilter} />
                    <Text value={"Select All"} className={classes.textButton} onClick={checkAll} />
                </div>
                <Divider />
                <div className={classes.scrollbar} >
                    {renderData.map((key, index) => (
                        <CheckWithPercent
                            outerVal={valChangesObj[key] ? valChangesObj[key].split('+')[0] : ''}
                            valChanges={valChanges}
                            name={key}
                            index={index}
                            checkOrNot={checkOrNot}
                            handleCategoryCheckbox={handleCategoryCheckbox}
                            color="#A9D18F"
                            textColor={"black"} />
                    ))}
                </div>
            </OutsideClickHandler>
        </div>
    )
}

const CompanyTechnographic = ({ setSelectedDataFunc, setSelectedScore, handleCategoryCheckbox2, allData, setCheckboxVisible, technoCheckbox, MaxRange, percent, allPercent }) => {

    let allPercentProps = allPercent.percent
    let allPercentChildProps = allPercent.child

    const classes = useStyles();

    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [oldCheck, setOldCheck] = useState('')
    const [oldParentCheck, setOldParentCheck] = useState('')
    const [haha, setHaha] = useState('')
    const [max, setMax] = useState(0)
    const [valChangesObj, setValChangesObj] = useStateWithPromise({});
    const [childScore, setChildScore] = useStateWithPromise({})
    const [changes, setChanges] = useState(false)
    const [allCheckBoxes, setAllCheckBoxes] = useState();

    useEffect(() => {
        if (allPercentProps && Object.keys(allPercentProps).length) setValChangesObj(allPercentProps)
    }, [allPercentProps])

    const setChildScoreFunc = (obj) => {
        setChildScore(old => {
            return { ...old, ...obj }
        }).then(res => {
            if (Object.keys(res)) setChanges(old => !old)
        })
    }

    const renderData = ["Advertising", "Analystics", "Ecommerce", "Widgets", "Hosting", "Productivity"]

    const filterData = ["ads txt", "Audience Targeting", "Contextual Advertising", "Dynamic Creative Optimization",
        "Digital Video Ads", "Retargeting / Remarketing",
        "Application Performance", "Conversion Optimization",
        "Advertiser Tracking", "Tag Management", "Audience Measurement",
        "Visitor Count Tracking", "Non Platform", "Hosted Solution", "Open Source",
        "Checkout Buttons", "Payments Processor", "Payment Currency", "Live Chat",
        "Login", "Ticketing System", "Bookings", "Social Sharing", "Schedule Management",
        "Cloud Hosting", "Cloud PaaS", "Dedicated Hosting", "Business Email Hosting", "Web Hosting Provider Email",
        "Marketing Platform", "CRM", "Campaign Management", "Lead Generation", "Product Recommendations", "Feedback Forms and Surveys", "Marketing Automation"]


    useEffect(() => {
        async function settingData() {
            const filtered = await Object.keys(allData)
                .filter(key => filterData.includes(key))
                .reduce((obj, key) => {
                    obj[key] = allData[key];
                    return obj;
                }, {});
            setAllCheckBoxes(filtered)
        }
        settingData()

    }, [allData])

    useEffect(() => {
        setSubCategory(technoCheckbox)
    }, [technoCheckbox])

    useEffect(() => {
        setMax(MaxRange * percent / 100)
    }, [percent, MaxRange])

    useEffect(() => {
        if (allPercentProps && Object.keys(allPercentProps).length) {
            let eachVal = Object.values(allPercentProps).find(element => element.split('+')[1] == 'default').split('+')[0]
            eachVal = parseFloat(eachVal).toFixed(2)
            setOldParentCheck(eachVal)
        }
        else {
            let tempObj = { ...valChangesObj }
            let eachVal = (max / renderData.length).toFixed(2)

            for (let key of renderData) tempObj[key] = eachVal + "+" + "default"
            setValChangesObj(tempObj)
        }
    }, [max])

    const valChanges = (name, val) => {
        let tempObj = { ...valChangesObj }
        tempObj[name] = val + "+" + "changed"
        setValChangesObj(tempObj).then(res => {
            if (Object.keys(res)) setChanges(old => !old)
        })
        // setChanges(old => !old)
    }

    useEffect(() => {
        const refresh = () => {
            let maxTotal = max
            let tempObj = { ...valChangesObj }
            let filteredArr = Object.values(valChangesObj).filter(val => val.split('+')[1] == 'changed')
            for (let minus of filteredArr) maxTotal -= minus.split('+')[0]
            let eachVal = (maxTotal / (renderData.length - filteredArr.length)).toFixed(2)
            for (let key of Object.keys(valChangesObj)) if (valChangesObj[key].split('+')[1] == 'default') tempObj[key] = eachVal + "+" + "default"

            if (Object.keys(valChangesObj).length) setValChangesObj(tempObj)
            setSelectedScore({ "Technographic": { "percent": tempObj, "child": childScore } })
        }
        refresh()
    }, [changes])

    const clearFilter = () => { // pass true or false to check or uncheck all

        let arr = { ...allCheckBoxes }
        let tempCategory = [...category];
        filterData
            // .filter(d => !["Company Name", "Country"].includes(d))
            .map(comp => {
                arr[comp] = false
                tempCategory.splice(tempCategory.indexOf(comp), 1)
            })
        setAllCheckBoxes(arr)
        // setCategory(tempCategory)
        setSelectedDataFunc(arr, "tech")
    }

    const parentTrueOrNot = (cate) => prototypes.contains(keyValues[cate], subCategory)

    const checkAll = (event) => { // pass true or false to check or uncheck all
        let arr = {}
        filterData.map(comp => arr[comp] = true)
        setAllCheckBoxes(arr)
        // setCategory(renderData)
        setSelectedDataFunc(arr, "tech")
    }

    // useEffect(() => {
    //     let arr = {}
    //     subCategory.map(comp => arr[comp] = true)
    //     setAllCheckBoxes(arr)
    // }, [subCategory])

    const checkOrNot = (name) => allCheckBoxes && allCheckBoxes[name] ? true : false

    const handleCategoryCheckbox = (e, keyName) => {
        const name = e.target.name;
        const checked = e.target.checked;

        let tempObj = { ...valChangesObj }
        let tempSubCategory = [...subCategory]
        let tempCheckBox = { ...allCheckBoxes };

        // let tempCategory = [...category];


        // if (checked && !tempCategory.includes(name)) tempCategory.push(name);
        // else tempCategory.splice(tempCategory.indexOf(name), 1);

        if (keyName) {
            tempCheckBox[name] = checked
            if (checked) {
                tempObj[name] = oldCheck + "+" + "default"
            }
            if (checked && !tempSubCategory.includes(name)) tempSubCategory.push(name);
            else {
                setOldCheck(tempObj[name])
                tempSubCategory.splice(tempSubCategory.indexOf(name), 1);
            }
        }
        else {
            if (!checked) {
                // const clone = tempObj[name].slice();
                setOldParentCheck(tempObj[name])
            }
            keyValues[name].map(subKey => {
                tempCheckBox[subKey] = checked


                if (checked) {
                    tempObj[name] = oldParentCheck + "+" + "default"
                    tempSubCategory.push(subKey)
                }
                else {

                    tempSubCategory.splice(tempSubCategory.indexOf(subKey), 1);
                    tempObj[name] = "0+changed"
                }
            })
        }
        setSubCategory(tempSubCategory)
        setSelectedDataFunc(tempCheckBox, "tech")
        setValChangesObj(tempObj).then(res => {
            if (Object.keys(res).length) setChanges(old => !old)
        })


    }
    return (
        <div style={{ width: "100%", height: "100%", border: "0.5px solid lightgrey", borderRadius: 4 }}>
            <OutsideClickHandler onOutsideClick={() => setCheckboxVisible(false)}>
                <Text value={"Technographic"} style={{ textIndent: "5px", fontSize: "13px", padding: 5 }} />
                <Divider />
                <div className={classes.center} style={{ justifyContent: "space-between", padding: "0px 5px" }}>
                    <Text value={"Clear Filter"} className={classes.textButton} onClick={clearFilter} />
                    <Text value={"Select All"} className={classes.textButton} onClick={checkAll} />
                </div>
                <Divider />
                <div className={classes.scrollbar} >
                    {renderData.map((key, index) => (
                        <CheckWithPercent2
                            outerVal={valChangesObj[key] ? valChangesObj[key].split('+')[0] : ''}
                            valChanges={valChanges}
                            parentTrueOrNot={parentTrueOrNot}
                            name={key}
                            index={index}
                            checkOrNot={checkOrNot}
                            handleCategoryCheckbox={handleCategoryCheckbox}
                            setSelectedDataFunc={setSelectedDataFunc}
                            MaxRange={valChangesObj[key]}
                            setChildScoreFunc={setChildScoreFunc}
                            allPercent={allPercentChildProps ? allPercentChildProps[key] : {}}
                        />
                    ))}
                </div>
            </OutsideClickHandler >
        </div>
    )
}

const CustomScore = ({ configIndex, value, setScoreDataFunc, setScoreDataArrFunc, index, scoreData, lowerRange, upperRange, range }) => {
    const classes = useStyles();
    const [LB, getLB] = useState()
    const [UB, getUB] = useState()
    const [arr, setArr] = useState([])
    const [outerValArr, setOuterValArr] = useState([])

    const [scoreName, setScoreName] = useStateWithPromise('')

    useEffect(() => {
        setScoreName(value)
    }, [value])

    useEffect(() => {
        if (Object.keys(scoreData).length && scoreData[value]) {
            setOuterValArr(scoreData[value].split('-'))
        }
        else setOuterValArr([])
    }, [scoreData])

    const handleLB = (event) => {
        getLB(event.target.value);
    };

    const handleUB = (event) => {
        getUB(event.target.value);
    };

    const handleChange = e => {
        let currentValue = e.target.value
        let oldVal, newVal
        setScoreName(old => {
            oldVal = old
            newVal = currentValue ? currentValue : ""
            return currentValue ? currentValue : ""
        }).then(res => {
            setScoreDataArrFunc(currentValue, "edit", index)
            setScoreDataFunc(scoreName, { [oldVal]: [newVal] })
        })

    }

    const handleDelete = () => {
        setScoreDataArrFunc(scoreName, "del", index)
        setScoreDataFunc(scoreName)
    }

    useEffect(() => {
        if (LB && UB) setScoreDataFunc({ [scoreName]: LB + "-" + UB })
        else if (LB && outerValArr.length) setScoreDataFunc({ [scoreName]: LB + "-" + outerValArr[1] })
        else if (UB && outerValArr.length) setScoreDataFunc({ [scoreName]: outerValArr[0] + "-" + UB })
    }, [LB, UB])

    useEffect(() => {
        // let temp = prototypes.range(0, 10, 0.1).map(x => x.toFixed(1))
        let temp = []
        if ((lowerRange || lowerRange == 0) && upperRange)
            temp = prototypes.range(parseInt(lowerRange), parseInt(upperRange), 0.1).map(x => x.toFixed(1))
        setArr(temp)
    }, [lowerRange, upperRange])

    return (
        <div>
            <div className={classes.simpleRow} style={{ justifyContent: 'space-evenly', marginTop: '5px', alignItems: "center" }}  >
                <Close style={{ cursor: 'pointer' }} onClick={() => handleDelete()} />
                <TextField
                    onChange={handleChange}
                    inputProps={{ style: { padding: 9, fontSize: 11 } }}
                    style={{ border: '1px solid #ced4da', width: '30%' }}
                    value={scoreName} />
                <NativeSelect
                    // key={uuid()}
                    value={LB ? LB : (outerValArr.length ? outerValArr[0] : '')}
                    onChange={handleLB}
                    input={<BootstrapInput />}
                >
                    <option aria-label="None" value="" />
                    {
                        arr.map((child, childIndex) => <option key={configIndex + "+" + index + "+" + childIndex} value={child}>{child}</option>)
                    }
                </NativeSelect>
                <Text style={{ textColor: 'bold' }} value={'-'} />
                <NativeSelect
                    // key={uuid()}
                    value={UB || (outerValArr.length ? outerValArr[1] : '')}
                    onChange={handleUB}
                    input={<BootstrapInput />}
                >
                    <option aria-label="None" value="" />
                    {
                        arr.map(child => <option value={child}>{child}</option>)
                    }
                </NativeSelect>
            </div >
        </div>
    );
}

const NumberBlock = ({ number, label }) => {
    const classes = useStyles();


    return (
        <div className={classes.simpleRow} style={{ margin: "15px 0px 0px 5px" }}>
            <Paper style={{
                backgroundColor: 'black', padding: "6px 12px", borderRadius: 5,
                position: "relative",
                border: "3px solid #5A9BD5",
            }}>
                <Text style={{ fontWeight: 'bold', color: 'white', textAlign: "center" }} value={number} />
            </Paper>
            <Text value={label} style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingLeft: 10 }} />
        </div>
    );
}

export default {
    CustomSelector,
    CustomSelector2,
    CompanyFrimographic,
    CompanyContacts,
    CompanyTechnographic,
    CustomScore,
    NumberBlock

}
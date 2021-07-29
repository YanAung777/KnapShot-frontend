import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, Paper, Typography, Checkbox, Divider, TextField, } from '@material-ui/core';
import { Clear, ChevronRight, CheckBoxOutlineBlank, CheckBox, ExpandMore, ExpandLess, ArrowDropDownIcon, CheckCircleOutline, RadioButtonUnchecked, ArrowBackIos, ControlPoint, Close, LocalDining } from '@material-ui/icons';
// import clsx from 'clsx';
import OutsideClickHandler from 'react-outside-click-handler';
// import uuid from 'react-uuid'

import Text from 'components/core/Text'
import CustomSelect from 'components/core/CustomSelect'

import { grey, blueGrey } from '@material-ui/core/colors';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import CheckboxTree from 'react-checkbox-tree';
import { nodes } from 'constants/technoNode';
import ThreeColorProgressBar from 'components/core/ThreeColorProgressBar';
//API
import api from 'api';

//util
import { getSession } from 'util/check-auth';
//constants
import endpoints from 'constants/endpoints';
import prototypes from 'constants/prototypes';
import Tooltip from '@material-ui/core/Tooltip';
import Confirmation from 'components/core/Confirmation';
import { useStateWithPromise } from 'constants/useStateWithPromise';
import { keyValues } from 'constants/keyValuesPair2'
//context
import { useAppValue } from 'context/app';

//css
import './react-checkbox-tree.css';

//subComponents
import SubComponents from './SubComponents'


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
    }
}));


export default function ScoreComponent(props) {
    const classes = useStyles();

    const { visibleProp, setOpenPopUp } = props;

    const [state, dispatch] = useAppValue();
    const { openFavList1, _1stTimeFavComp, filenames } = state

    const [configIndex, setConfigIndex] = useState();
    const [configData, setConfigData] = useState({});
    const [scoreConfigList, setScoreConfigList] = useState({});

    const [userData, setUserData] = React.useState({});
    const [visible, setVisible] = useState(false);
    const [createListShow, setCreateListShow] = useState(false);
    const [configure, setConfigure] = useState(false);
    const [checkboxVisible, setCheckboxVisible] = useState(false)
    const [changes, setChanges] = React.useState(false);

    const [listName, setListName] = useState('');
    const [renderData, setRenderData] = useState([]);

    const [activeList, setActiveList] = React.useState('');

    const [scoreData, setScoreData] = useState({});
    const [lowerRange, setLowerRange] = useState('');
    const [upperRange, setUpperRange] = useState('');
    const [scoreDataArr, setScoreDataArr] = useState(['Basic', 'Intermediate', 'High', 'Advance']);
    const [mainColor, setMainColor] = useState(["blue", "green", "red"]);
    // const [mainColor, setMainColor] = useState([]);
    const [percent, setPercent] = useStateWithPromise({})
    const [red, setRed] = useState()
    const [green, setGreen] = useState()
    const [blue, setBlue] = useState()
    const [redOld, setRedOld] = useState()
    const [greenOld, setGreenOld] = useState()
    const [blueOld, setBlueOld] = useState()
    const [allData, setAllData] = useState({});
    const [allScoreData, setAllScoreData] = useState({});
    // const [allData, setAllData] = useState({ "Company Name": true, "Country": true });
    const [allCheckBoxes, setAllCheckBoxes] = useState({ "blue": true, "green": true, "red": true });
    const [companyCheckbox, setCompanyCheckbox] = useState([]);
    const [frimographicCheckbox, setFrimographicCheckbox] = useState([]);
    const [technoCheckbox, setTechnoCheckbox] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [companyPercent, setCompanyPercent] = useState({})
    const [frimoPercent, setFrimoPercent] = useState({})
    const [technoPercent, setTechnoPercent] = useState({})
    const [loading, setLoading] = useState(false)
    const [fileName, setFileName] = useState()
    const [oldCheck, setOldCheck] = useState('')
    let colorMapping = { blue: "Company Contact", green: "Firmographic", red: "Technographic" }

    const setVarToDefault = () => {
        setLowerRange(0)
        setUpperRange(10)
        // setBlue()
        // setGreen()
        // setRed()
        setScoreData({})
        // setAllScoreData({
        //     "Technographic": { "percent": { "Advertising": "0.17+default", "Analystics": "0.17+default", "Ecommerce": "0.17+default", "Widgets": "0.17+default", "Hosting": "0.17+default", "Productivity": "0.17+default" }, "child": { "Productivity": { "CRM": "0.03+default", "Campaign Management": "0.03+default", "Lead Generation": "0.03+default", "Product Recommendations": "0.03+default", "Feedback Forms and Surveys": "0.03+default", "Marketing Automation": "0.03+default" }, "Hosting": { "Cloud Hosting": "0.03+default", "Cloud PaaS": "0.03+default", "Dedicated Hosting": "0.03+default", "Business Email Hosting": "0.03+default", "Web Hosting Provider Email": "0.03+default", "Marketing Platform": "0.03+default" }, "Widgets": { "Live Chat": "0.03+default", "Login": "0.03+default", "Ticketing System": "0.03+default", "Bookings": "0.03+default", "Social Sharing": "0.03+default", "Schedule Management": "0.03+default" }, "Ecommerce": { "Non Platform": "0.03+default", "Hosted Solution": "0.03+default", "Open Source": "0.03+default", "Checkout Buttons": "0.03+default", "Payments Processor": "0.03+default", "Payment Currency": "0.03+default" }, "Analystics": { "Application Performance": "0.03+default", "Conversion Optimization": "0.03+default", "Advertiser Tracking": "0.03+default", "Tag Management": "0.03+default", "Audience Measurement": "0.03+default", "Visitor Count Tracking": "0.03+default" }, "Advertising": { "ads txt": "0.03+default", "Audience Targeting": "0.03+default", "Contextual Advertising": "0.03+default", "Dynamic Creative Optimization": "0.03+default", "Digital Video Ads": "0.03+default", "Retargeting / Remarketing": "0.03+default" } } }, "Firmographic": { "Industry": "0.25+default", "Category": "0.25+default", "Products/Services": "0.25+default", "Years in Operation": "0.25+default", "Employee Size": "0.25+default", "HQ Location": "0.25+default", "Partners": "0.25+default", "Awards": "0.25+default" }, "Company Contacts": { "Company Name": "0.70+default", "Country": "0.70+default", "Website": "0.70+default", "LinkedIn": "0.70+default", "Facebook": "0.70+default", "Instagram": "0.70+default", "Twitter": "0.70+default", "Youtube": "0.70+default", "Main Line Number": "0.70+default", "Email Address": "0.70+default" }
        // })
        // setAllData({
        //     "Company Name": true, "Country": true, "Email Address": true, "Facebook": true, "Instagram": true, "LinkedIn": true, "Main Line Number": true,
        //     "Twitter": true, "Website": true, "Youtube": true, "Awards": true, "Category": true, "Employee Size": true, "HQ Location": true, "Industry": true,
        //     "Partners": true, "Products/Services": true, "Years in Operation": true, "Advertiser Tracking": true, "Application Performance": true, "Audience Measurement": true,
        //     "Audience Targeting": true, "Bookings": true, "Business Email Hosting": true, "CRM": true, "Campaign Management": true, "Checkout Buttons": true, "Cloud Hosting": true,
        //     "Cloud PaaS": true, "Contextual Advertising": true, "Conversion Optimization": true, "Dedicated Hosting": true, "Digital Video Ads": true, "Dynamic Creative Optimization": true,
        //     "Feedback Forms and Surveys": true, "Hosted Solution": true, "Lead Generation": true, "Live Chat": true, "Login": true, "Marketing Automation": true, "Marketing Platform": true,
        //     "Non Platform": true, "Open Source": true, "Payment Currency": true, "Payments Processor": true, "Product Recommendations": true, "Retargeting / Remarketing": true,
        //     "Schedule Management": true, "Social Sharing": true, "Tag Management": true, "Ticketing System": true, "Visitor Count Tracking": true, "Web Hosting Provider Email": true, "ads txt": true,
        // })
        setAllData({})
        // setScoreDataArr(['', '', '', ''])
        setCompanyCheckbox([])
        setFrimographicCheckbox([])
        setTechnoCheckbox([])
        setMainColor(["blue", "green", "red"])
        setAllCheckBoxes({ "blue": true, "green": true, "red": true })
        setFileName()
    }

    useEffect(() => {
        setVarToDefault()
        if (scoreConfigList) {
            let { id, list_id, list_name, lower_range, percent, score, selected_value, upper_range, score_percent, fileName } = scoreConfigList
            setLowerRange(lower_range)
            setUpperRange(upper_range)
            if (percent) {
                let tempColor = []
                let obj = JSON.parse(percent)

                setPercent(obj)
                if (obj["Company Contact"]) {
                    setBlue(obj["Company Contact"])
                    setBlueOld(obj["Company Contact"])
                    tempColor.push("blue")
                }
                if (obj["Firmographic"]) {
                    setGreen(obj["Firmographic"])
                    setGreenOld(obj["Firmographic"])
                    tempColor.push("green")
                }
                if (obj["Technographic"]) {
                    setRed(obj["Technographic"])
                    setRedOld(obj["Technographic"])
                    tempColor.push("red")
                }
                setMainColor(tempColor)
                let colorTempObj = {}
                tempColor.map(c => colorTempObj[c] = true)
                setAllCheckBoxes(colorTempObj)
            }
            if (score) {
                setScoreData(JSON.parse(score))
                setScoreDataArr(Object.keys(JSON.parse(score)))
            }
            if (score_percent) {
                let tempObj = JSON.parse(score_percent)
                if (tempObj['Company Contacts']) setCompanyPercent(tempObj['Company Contacts'])
                if (tempObj['Firmographic']) setFrimoPercent(tempObj['Firmographic'])
                if (tempObj['Technographic']) setTechnoPercent(tempObj['Technographic'])
                setAllScoreData(tempObj)
            }
            if (selected_value) {
                let obj = JSON.parse(selected_value)
                if (obj["Company Contact"]) {
                    setCompanyCheckbox(obj["Company Contact"])
                    setAllData(old => {
                        let tempObj = {}
                        obj["Company Contact"].map(name => tempObj[name] = true)
                        return { ...old, ...tempObj }
                    })
                }
                if (obj["Firmographic"]) {
                    setFrimographicCheckbox(obj["Firmographic"])
                    setAllData(old => {
                        let tempObj = {}
                        obj["Firmographic"].map(name => tempObj[name] = true)
                        return { ...old, ...tempObj }
                    })
                }
                if (obj["Technographic"]) {
                    setTechnoCheckbox(obj["Technographic"])
                    setAllData(old => {
                        let tempObj = {}
                        obj["Technographic"].map(name => tempObj[name] = true)
                        return { ...old, ...tempObj }
                    })
                }
            }
            if (fileName) setFileName(fileName)
        }
        else {
            setVarToDefault()
            setScoreDataArr(['Basic', 'Intermediate', 'High', 'Advance'])
        }

    }, [scoreConfigList, changes])


    useEffect(() => {
        let tempObj = { ...allScoreData }
        if (tempObj['Company Contacts']) setCompanyPercent(tempObj['Company Contacts'])
        if (tempObj['Firmographic']) setFrimoPercent(tempObj['Firmographic'])
        if (tempObj['Technographic']) setTechnoPercent(tempObj['Technographic'])
    }, [allScoreData])

    let ScoreDataObj = {
        "blue": "Company Contact-#5A9BD5",
        "green": "Firmographic-#A9D18F",
        "red": "Technographic-#F2346A"
    }

    const getKeyArr = (obj, val) => {
        return Object.keys(obj).filter(key => obj[key] === val)
    };

    const setSelectedDataFunc = (obj, objName) => {

        let tempObj = { ...allData, ...obj }

        let setData = []
        if (objName == "comp") setData = [...companyCheckbox]
        if (objName == "frimo") setData = [...frimographicCheckbox]
        if (objName == "tech") setData = [...technoCheckbox]

        let falseData = getKeyArr(obj, false)

        Object.keys(obj).map(key => {
            if (obj[key] && !setData.includes(key)) setData.push(key)
        })

        falseData.map(d => {
            let index = setData.indexOf(d)
            if (index > -1) setData.splice(setData.indexOf(d), 1)
        })

        if (objName == "comp") setCompanyCheckbox(setData)
        else if (objName == "frimo") setFrimographicCheckbox(setData)
        else if (objName == "tech") setTechnoCheckbox(setData)
        setAllData(tempObj)

    }
    // console.log('techno',technoCheckbox)

    const setSelectedScore = (obj, objName) => {
        let tempObj = { ...allScoreData, ...obj }
        setAllScoreData(tempObj)
    }

    const resetCheckBoxes = (obj) => {
        // let tempObj = { ...allCheckBoxes, ...obj }
        // setAllCheckBoxes(tempObj)
    }

    React.useEffect(() => {
        // console.log("blue", blue)
        if (upperRange) {
            const renderData = ["Company Name", "Country", "Website", "LinkedIn", "Facebook", "Instagram", "Twitter", "Youtube", "Main Line Number", "Email Address"]
            let tempObj = {}
            let max = upperRange * blue / 100
            let eachVal = (max / renderData.length).toFixed(2)
            for (let key of renderData) tempObj[key] = eachVal + "+" + "default"
            // setPercent(obj => {
            //     return { ...obj, "Company Contact": blue }
            // })

            if (blue != blueOld) {
                setCompanyPercent(tempObj)
                setOldCheck(blue)
                setSelectedScore({ "Company Contacts": tempObj })
                let arr = ["Company Name", "Country", "Website", "LinkedIn", "Facebook", "Instagram", "Twitter", "Youtube", "Main Line Number", "Email Address"]
                setCompanyCheckbox(arr)
                setAllData(old => {
                    let tempObj = {}
                    arr.map(name => tempObj[name] = true)
                    return { ...old, ...tempObj }
                })
            }
        }

    }, [blue]);

    React.useEffect(() => {
        // console.log("red", red)
        if (upperRange) {
            const renderData = ["Advertising", "Analystics", "Ecommerce", "Widgets", "Hosting", "Productivity"]

            let tempObj = {}, tempObj2 = {}
            let max = upperRange * red / 100
            let eachVal = (max / renderData.length).toFixed(2)
            for (let key of renderData) tempObj[key] = eachVal + "+" + "default"

            for (let name of renderData) {
                let max = tempObj[name].split('+')[0]
                let eachVal = (max / 6).toFixed(2)
                for (let key of keyValues[name]) {
                    if (!tempObj2[name]) tempObj2[name] = {}
                    tempObj2[name][key] = eachVal + "+" + "default"
                }
            }

            let tempData = {
                percent: tempObj,
                child: tempObj2
            }
            // setPercent(obj => {
            //     return { ...obj, "Firmographic": green }
            // })

            if (red != redOld) {
                setTechnoPercent(tempData)
                setOldCheck(red)
                setSelectedScore({ "Technographic": tempData })
                let arr = ["ads txt", "Audience Targeting", "Contextual Advertising", "Dynamic Creative Optimization",
                    "Digital Video Ads", "Retargeting / Remarketing",
                    "Application Performance", "Conversion Optimization",
                    "Advertiser Tracking", "Tag Management", "Audience Measurement",
                    "Visitor Count Tracking", "Non Platform", "Hosted Solution", "Open Source",
                    "Checkout Buttons", "Payments Processor", "Payment Currency", "Live Chat",
                    "Login", "Ticketing System", "Bookings", "Social Sharing", "Schedule Management",
                    "Cloud Hosting", "Cloud PaaS", "Dedicated Hosting", "Business Email Hosting", "Web Hosting Provider Email",
                    "Marketing Platform", "CRM", "Campaign Management", "Lead Generation", "Product Recommendations", "Feedback Forms and Surveys", "Marketing Automation"]
                setTechnoCheckbox(arr)
                setAllData(old => {
                    let tempObj = {}
                    arr.map(name => tempObj[name] = true)
                    return { ...old, ...tempObj }
                })
            }
        }
    }, [red]);

    React.useEffect(() => {
        // console.log("green", green)
        if (upperRange) {
            const renderData = ["Industry", "Category", "Products/Services", "Years in Operation", "Employee Size", "HQ Location", "Partners", "Awards"]
            let tempObj = {}
            let max = upperRange * green / 100
            let eachVal = (max / renderData.length).toFixed(2)
            for (let key of renderData) tempObj[key] = eachVal + "+" + "default"
            // setPercent(obj => {
            //     return { ...obj, "Firmographic": green }
            // })

            if (green != greenOld) {
                setFrimoPercent(tempObj)
                setOldCheck(green)
                setSelectedScore({ "Firmographic": tempObj })
                let arr = ["Industry", "Category", "Products/Services", "Years in Operation", "Employee Size", "HQ Location", "Partners", "Awards"]
                setFrimographicCheckbox(arr)
                setAllData(old => {
                    let tempObj = {}
                    arr.map(name => tempObj[name] = true)
                    return { ...old, ...tempObj }
                })
            }
        }
    }, [green]);

    // console.log("blue", blue, "green", green, "red", red)
    // console.log("percent", percent)

    // console.log('allScoreData', allScoreData)


    // console.log("upperRange",upperRange)
    // console.log("socre",allData)
    const renderActiveUI = () => {
        switch (activeIndex) {
            case "blue": return <SubComponents.CompanyContacts
                resetCheckBoxes={resetCheckBoxes}
                setCheckboxVisible={setCheckboxVisible}
                setSelectedDataFunc={setSelectedDataFunc}
                setSelectedScore={setSelectedScore}
                allData={allData}
                MaxRange={upperRange}
                percent={mainColor.includes("blue") ? blue : 0}
                allPercent={companyPercent}
            />

            case "green": return <SubComponents.CompanyFrimographic
                setCheckboxVisible={setCheckboxVisible}
                resetCheckBoxes={resetCheckBoxes}
                setSelectedDataFunc={setSelectedDataFunc}
                setSelectedScore={setSelectedScore}
                allData={allData}
                MaxRange={upperRange}
                percent={mainColor.includes("green") ? green : 0}
                allPercent={frimoPercent}
            />
            case "red": return <SubComponents.CompanyTechnographic
                technoCheckbox={technoCheckbox}
                setCheckboxVisible={setCheckboxVisible}
                resetCheckBoxes={resetCheckBoxes}
                setSelectedDataFunc={setSelectedDataFunc}
                setSelectedScore={setSelectedScore}
                allData={allData}
                MaxRange={upperRange}
                percent={mainColor.includes("red") ? red : 0}
                allPercent={technoPercent}

            />
            default: return null
        }
    }
    // console.log("hiii",frimoPercent)
    // console.log("company",companyPercent)
    const getColorValuesFunc = (redC, greenC, blueC) => {
        if (redC) setRed(redC)
        if (greenC) setGreen(greenC)
        if (blueC) setBlue(blueC)
    }

    function renameKeys(obj, newKeys) {
        const keyValues = Object.keys(obj).map(key => {
            const newKey = newKeys[key] || key;
            return { [newKey]: obj[key] };
        });
        return Object.assign({}, ...keyValues);
    }

    const setScoreDataFunc = (obj, oldValKeyPair) => {
        if (oldValKeyPair) {
            setScoreData(old => {
                // console.log("check", oldValKeyPair, renameKeys(old, oldValKeyPair))
                return renameKeys(old, oldValKeyPair)
            })
        }
        if (typeof obj == "object")
            setScoreData(old => {
                return { ...old, ...obj }
            })
        else setScoreData(old => {
            if (old && old[obj]) delete old[obj]
            return { ...old }
        })
    }

    const setScoreDataArrFunc = (name, newOrDelete, arrIndex) => {
        if (newOrDelete == "new") setScoreDataArr(old => {
            return [...old, name]
        })
        else if (newOrDelete == "edit") {
            setScoreDataArr(old => {
                old[arrIndex] = name
                return [...old]
            })
        }
        else setScoreDataArr(old => {
            old.splice(arrIndex, 1)
            return [...old]
        })
    }

    // console.log("scoreDataArr", scoreDataArr)
    // console.log("scoreData", scoreData)

    const getColorByValue = value => {
        if (value == "Company Contact") return blue ? blue + "%" : null
        if (value == "Firmographic") return green ? green + "%" : null
        if (value == "Technographic") return red ? red + "%" : null
    }

    const checkOrNot = (name) => allCheckBoxes[name] ? true : false

    let funcObj = { setBlue, setRed, setGreen }

    const capitalize = str => str.charAt(0).toUpperCase() + str.substring(1)

    const handleCheckbox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        let tempObj = { ...percent }
        let tempCheckBox = { ...allCheckBoxes };
        let tempMainColor = [...mainColor];
        let tempCompanyCB = [...companyCheckbox]
        let tempFrimoCB = [...frimographicCheckbox]
        let tempTechnoCB = [...technoCheckbox]

        tempCheckBox[name] = checked
        if (checked) {
            tempObj[name] = oldCheck
        }
        if (checked && !tempMainColor.includes(name)) {
            tempMainColor.push(name)

        }
        else {
            setOldCheck(tempObj[name])
            tempMainColor.splice(tempMainColor.indexOf(name), 1);
            tempObj[name] = '0'
        }

        setPercent(old => {
            let tempPercent = { ...old }
            let index = tempMainColor.length - 1

            if (!checked) {
                funcObj["set" + capitalize(name)](0)
                // if (tempMainColor.indexOf(name) == 0) tempPercent[colorMapping[tempMainColor[1]]] += tempPercent[colorMapping[name]]
                // else tempPercent[colorMapping[tempMainColor[0]]] += tempPercent[colorMapping[name]]
                // tempPercent[colorMapping[name]] = 0
            }
            // if (checked) {
            //     tempPercent[colorMapping[name]] = 10
            //     console.log("check Percent", tempPercent[colorMapping[tempMainColor[index - 1]]])
            //     if (tempPercent[colorMapping[tempMainColor[index - 1]]] > 10) tempPercent[colorMapping[tempMainColor[index - 1]]] -= 10
            //     else tempPercent[colorMapping[tempMainColor[index - 2]]] -= 10
            // }
            // else {
            //     let totalMinus = 0
            //     totalMinus = tempPercent[colorMapping[tempMainColor[0]]]
            //     if (tempPercent[colorMapping[tempMainColor[1]]]) totalMinus += tempPercent[colorMapping[tempMainColor[1]]]
            //     tempPercent[colorMapping[tempMainColor[index]]] += (100 - totalMinus)
            // }

            // new cmt
            if (tempMainColor.length == 1) {
                tempPercent[colorMapping[tempMainColor[0]]] = 100
                let otherColor = prototypes.arr_diff(tempMainColor, ['red', 'green', 'blue'])
                tempPercent[colorMapping[otherColor[0]]] = 0
                tempPercent[colorMapping[otherColor[1]]] = 0
            }

            if (tempMainColor.length == 2) {
                if (checked) {
                    let arr = []
                    arr.push(name)
                    let otherColor = prototypes.arr_diff(arr, tempMainColor)
                    tempPercent[colorMapping[name]] = 10
                    tempPercent[colorMapping[otherColor]] = 90
                }
                else {
                    tempPercent[colorMapping[tempMainColor[0]]] += tempPercent[colorMapping[name]]
                    tempPercent[colorMapping[name]] = 0
                }
            }

            if (tempMainColor.length == 3) {
                if (checked) {
                    tempPercent[colorMapping[name]] = 10
                    if (tempPercent[colorMapping[tempMainColor[index - 1]]] > 10) tempPercent[colorMapping[tempMainColor[index - 1]]] -= 10
                    else tempPercent[colorMapping[tempMainColor[index - 2]]] -= 10
                }
                else {
                    // tempPercent[colorMapping[name]] = 0
                }
            }

            return tempPercent
        }).then(res => {
            // console.log("setTempPercent", res)
            if (checked) {
                if (colorMapping[name] == "Company Contact") {
                    // console.log("company check")
                    let arr = ["Company Name", "Country", "Website", "LinkedIn", "Facebook", "Instagram", "Twitter", "Youtube", "Main Line Number", "Email Address"]
                    setCompanyCheckbox(arr)
                    setAllData(old => {
                        let tempObj = {}
                        arr.map(name => tempObj[name] = true)
                        return { ...old, ...tempObj }
                    })
                }
                if (colorMapping[name] == "Firmographic") {
                    // console.log("Firmographic check")
                    let arr = ["Industry", "Category", "Products/Services", "Years in Operation", "Employee Size", "HQ Location", "Partners", "Awards"]
                    setFrimographicCheckbox(arr)
                    setAllData(old => {
                        let tempObj = {}
                        arr.map(name => tempObj[name] = true)
                        return { ...old, ...tempObj }
                    })
                }
                if (colorMapping[name] == "Technographic") {
                    // console.log("Technographic check")
                    let arr = ["ads txt", "Audience Targeting", "Contextual Advertising", "Dynamic Creative Optimization",
                        "Digital Video Ads", "Retargeting / Remarketing",
                        "Application Performance", "Conversion Optimization",
                        "Advertiser Tracking", "Tag Management", "Audience Measurement",
                        "Visitor Count Tracking", "Non Platform", "Hosted Solution", "Open Source",
                        "Checkout Buttons", "Payments Processor", "Payment Currency", "Live Chat",
                        "Login", "Ticketing System", "Bookings", "Social Sharing", "Schedule Management",
                        "Cloud Hosting", "Cloud PaaS", "Dedicated Hosting", "Business Email Hosting", "Web Hosting Provider Email",
                        "Marketing Platform", "CRM", "Campaign Management", "Lead Generation", "Product Recommendations", "Feedback Forms and Surveys", "Marketing Automation"]
                    setTechnoCheckbox(arr)
                    setAllData(old => {
                        let tempObj = {}
                        arr.map(name => tempObj[name] = true)
                        return { ...old, ...tempObj }
                    })
                }
            }

            else {
                if (colorMapping[name] == "Company Contact") {
                    // console.log("company uncheck")
                    let arr = ["Company Name", "Country", "Website", "LinkedIn", "Facebook", "Instagram", "Twitter", "Youtube", "Main Line Number", "Email Address"]
                    setCompanyCheckbox([])
                    setAllData(old => {
                        let tempObj = {}
                        arr.map(name => tempObj[name] = false)
                        return { ...old, ...tempObj }
                    })
                }
                if (colorMapping[name] == "Firmographic") {
                    // console.log("Firmographic uncheck")
                    let arr = ["Industry", "Category", "Products/Services", "Years in Operation", "Employee Size", "HQ Location", "Partners", "Awards"]
                    setFrimographicCheckbox([])
                    setAllData(old => {
                        let tempObj = {}
                        arr.map(name => tempObj[name] = false)
                        return { ...old, ...tempObj }
                    })
                }
                if (colorMapping[name] == "Technographic") {
                    // console.log("Technographic uncheck")
                    let arr = ["ads txt", "Audience Targeting", "Contextual Advertising", "Dynamic Creative Optimization",
                        "Digital Video Ads", "Retargeting / Remarketing",
                        "Application Performance", "Conversion Optimization",
                        "Advertiser Tracking", "Tag Management", "Audience Measurement",
                        "Visitor Count Tracking", "Non Platform", "Hosted Solution", "Open Source",
                        "Checkout Buttons", "Payments Processor", "Payment Currency", "Live Chat",
                        "Login", "Ticketing System", "Bookings", "Social Sharing", "Schedule Management",
                        "Cloud Hosting", "Cloud PaaS", "Dedicated Hosting", "Business Email Hosting", "Web Hosting Provider Email",
                        "Marketing Platform", "CRM", "Campaign Management", "Lead Generation", "Product Recommendations", "Feedback Forms and Surveys", "Marketing Automation"]
                    setTechnoCheckbox([])
                    setAllData(old => {
                        let tempObj = {}
                        arr.map(name => tempObj[name] = false)
                        return { ...old, ...tempObj }
                    })
                }
            }
            setMainColor(tempMainColor)
            setAllCheckBoxes(tempCheckBox)
        })

    }

    React.useEffect(() => {
        setVisible(visibleProp)

    }, [visibleProp]);

    React.useEffect(() => {
        async function getUserData() {
            setUserData(getSession("user"))
        }
        getUserData()

    }, []);

    React.useEffect(() => {
        async function getListCount() {
            const CompanyCount = await api().get(`${endpoints.getScoreListCount}/${userData.id}`);
            if (CompanyCount.status === 200) {
                setRenderData(CompanyCount.data.mainData)
            }
        }

        getListCount()

    }, [visible, changes, openFavList1]);

    const onSelect = (arr, activeIndex) => {
        // dispatch({ type: "setUserFavCompFilter", companies: arr });
        setActiveList(activeIndex)
        setVisible(false)
    }

    const handleDeleteList = async (list_id) => {
        await api().post(endpoints.deleteScoreListById, { list_id }).then(res => {
            if (res.status === 200) {
                setChanges(!changes)
                // dispatch({ type: "setUserFavCompFilter", companies: [] });
                // dispatch({
                //     type: "resetSelectedTechnologyCompanies",
                //     companies: [],
                //     count: 0,
                //     loading: false
                // });

            }
        })
    }


    const handleSave = async () => {
        if (listName) {
            const response = await api().post(
                endpoints.createScoreList,
                {
                    name: listName,
                    created_by: userData.id,
                    updated_by: userData.id
                }
            );
            if (response.status === 200) {
                setCreateListShow(false)

                const CompanyCount = await api().get(`${endpoints.getScoreListCount}/${userData.id}`);
                if (CompanyCount.status === 200) {
                    // setListData(CompanyCount.data.data)
                    setRenderData(CompanyCount.data.mainData)
                    setListName('')
                }
            }
        }
    }

    const handleConfigSave = async () => {
        let saveObj = {
            user_id: userData.id,
            list_name: configData.score_name,
            list_id: configData.id,
            lower_range: lowerRange,
            upper_range: upperRange,
            percent: JSON.stringify({
                "Company Contact": mainColor.includes('blue') ? blue : 0,
                "Firmographic": mainColor.includes('green') ? green : 0,
                "Technographic": mainColor.includes('red') ? red : 0,
            }),
            score: JSON.stringify(scoreData),
            score_percent: JSON.stringify(allScoreData),
            selected_value: JSON.stringify({
                "Company Contact": companyCheckbox,
                "Firmographic": frimographicCheckbox,
                "Technographic": technoCheckbox,
            }),
            fileName
        }
        // console.log("mainpercent", percent)
        // console.log("scorepercent", allScoreData)
        // console.log("companyCheckbox", companyCheckbox,)
        // console.log("frimographicCheckbox", frimographicCheckbox,)
        // console.log("technoCheckbox", technoCheckbox,)
        // console.log("companyCheckbox", companyPercent,)
        // console.log("frimographicCheckbox", frimoPercent,)
        // console.log("technoCheckbox", technoPercent,)
        // console.log('allScoreData', allScoreData)
        if (saveObj) {
            const response = await api().post(
                endpoints.addConfigToScoreList,
                saveObj
            );
            if (response.status === 200) {
                setConfigure(false)

                const CompanyCount = await api().get(`${endpoints.getScoreListCount}/${userData.id}`);
                if (CompanyCount.status === 200) {
                    setConfigure(false)
                    setRenderData(CompanyCount.data.mainData)
                    setListName('')
                    setVarToDefault()
                }
            }
        }
    }


    // const onFileChange = (val) => {
    //     if (val) setFileName(val)
    //     // else setFileName('')
    // }
    const onFileChange = (filename) => {
        if (filename) setFileName(filename);
    }

    // console.log("GileName",fileName)

    const getFileStatus = (data) => {
        if (data.file_name && data.default) return data.file_name + " Applied"
        else if (data.file_name && !data.default) return data.file_name
        // else return ""
    }



    let range = prototypes.range(0, 10, 1)

    return (
        <div className={classes.root}  {...props}>
            {
                (visible || openFavList1) &&
                <div className={classes.rootMain}>
                    <Paper className={classes.option}>
                        <div className={classes.row} style={{ margin: 5 }}>

                            <div className={classes.simpleRow} style={{ position: "relative" }}>
                                {configure ?
                                    <>
                                        <ArrowBackIos style={{ cursor: 'pointer' }} onClick={() => setConfigure(false)} />
                                        <Text value={`Configure < ${configData.score_name} >`} />
                                    </>
                                    :
                                    <Text style={{ fontWeight: "bold" }} value={"Score"} />
                                }
                            </div>
                            <>
                                {configure ?
                                    <></>
                                    :
                                    <>
                                        <div className={classes.simpleRow} style={{ position: "relative" }}>
                                            <Text value={"Create New Score"} onClick={() => {
                                                setCreateListShow(true)
                                                setConfigure(false)
                                            }} style={{ padding: "3px 12px", border: "2px solid lightgrey", borderRadius: 15, marginRight: 20, cursor: "pointer" }} />
                                        </div>
                                        <Clear
                                            onClick={() => {
                                                setVisible(false)
                                                setOpenPopUp(false)
                                                setConfigure(false)
                                                // dispatch({ type: "setOpenFavList", openFavList1: false })
                                            }}
                                            style={{ position: "absolute", cursor: "pointer", top: 5, right: 5, fontSize: 26, color: "black" }} />
                                    </>
                                }
                            </>
                        </div>
                        <Divider style={{ height: 3 }} />
                        <div className={classes.simpleRow} style={{ position: "relative" }}>
                            <div style={{ width: "45%", paddingRight: 32 }}>
                                {!renderData.length ?
                                    <div className={classes.simpleRow}>
                                        <Text value={"Nothing score yet."} style={{ fontSize: 10, whiteSpace: "nowrap", padding: 20 }} />
                                    </div>
                                    :
                                    <>
                                        {configure ?
                                            <Paper style={{ boxShadow: "5px 5px 5px 0px #ccc", }} >
                                                <div className={classes.simpleRow} style={{ justifyContent: "space-between", padding: 5 }}>
                                                    <Text style={{ fontWeight: "bold", cursor: "default" }} value={"Configurator"} />
                                                    <Text value={"Save"} onClick={handleConfigSave} style={{ cursor: "pointer" }} />
                                                </div>
                                                <Divider style={{ height: 2 }} />
                                                <div style={{ height: (window.innerHeight * .8) - 20, overflowY: "scroll" }}>
                                                    <SubComponents.NumberBlock number="1" label='Set the lower and upper score range &' />
                                                    <div className={classes.simpleRow} style={{ margin: "10px 5px 15px 5px" }}>
                                                        <div >
                                                            <SubComponents.CustomSelector2 options={range}
                                                                defaultVal={lowerRange}
                                                                valGetter={setLowerRange} />
                                                        </div>
                                                        <div style={{ width: "80%" }}>
                                                            <ThreeColorProgressBar
                                                                mainColor={mainColor}
                                                                getValues={getColorValuesFunc}
                                                                percent={percent}

                                                            />
                                                            {/* <div className={classes.simpleRow} style={{ marginTop: 15 }}>
                                                            {
                                                                scoreConfigList && scoreConfigList.percent && <Text value="Old data" style={{ fontSize: 9, color: "lightgrey" }} />
                                                            }
                                                            {
                                                                scoreConfigList && scoreConfigList.percent &&
                                                                (
                                                                    Object.keys(JSON.parse(scoreConfigList.percent)).map(key => <>
                                                                        <Text value={` , ${key}`} style={{ fontSize: 9, color: "lightgrey" }} />
                                                                        <Text value={`: ${JSON.parse(scoreConfigList.percent)[key]}% `} style={{ fontSize: 9, color: "lightgrey" }} />
                                                                    </>)
                                                                )
                                                            }
                                                        </div> */}
                                                        </div>
                                                        <div >
                                                            <SubComponents.CustomSelector2 options={range}
                                                                defaultVal={upperRange}
                                                                valGetter={setUpperRange} />
                                                        </div>
                                                    </div>

                                                    <SubComponents.NumberBlock number="2" label='Select following assets for scoring' />
                                                    {
                                                        Object.keys(ScoreDataObj).map(key =>
                                                            <Paper style={{
                                                                justifyContent: 'space-evenly', position: 'relative', width: '80%', height: 32,
                                                                marginTop: '10px', backgroundColor: ScoreDataObj[key].split("-")[1], marginLeft: '50px', borderRadius: '25px'
                                                            }} >
                                                                <div className={classes.row}>
                                                                    <div className={classes.simpleRow}>
                                                                        <Checkbox
                                                                            name={key}
                                                                            checked={checkOrNot(key)}
                                                                            onChange={handleCheckbox}
                                                                            icon={<RadioButtonUnchecked style={{ backgroundColor: 'white', borderRadius: '50%' }} />}
                                                                            checkedIcon={<CheckCircleOutline style={{ backgroundColor: 'white', borderRadius: '50%', color: "grey" }} />}
                                                                        />
                                                                        <Text style={{ paddingLeft: 10, display: "flex", alignItems: "center", color: key == "red" ? "white" : "black" }} value={ScoreDataObj[key].split("-")[0]} />
                                                                    </div>
                                                                    <div className={classes.simpleRow}>
                                                                        {
                                                                            checkOrNot(key) && getColorByValue(ScoreDataObj[key].split("-")[0]) ?
                                                                                <span style={{ borderRadius: 25, backgroundColor: 'white', width: 25, height: 25, display: "flex", alignItems: "center", justifyContent: "center" }} >
                                                                                    <Text style={{ fontSize: 9 }} value={getColorByValue(ScoreDataObj[key].split("-")[0])} />
                                                                                </span>
                                                                                :
                                                                                <span style={{ borderRadius: 25, backgroundColor: 'white', width: 25, height: 25, display: "flex", alignItems: "center", justifyContent: "center" }} >
                                                                                    <Text style={{ fontSize: 9 }} value="0%" />
                                                                                </span>
                                                                        }
                                                                        <ChevronRight style={{ paddingLeft: 10 }} onClick={() => {
                                                                            setActiveIndex(key)
                                                                            setCheckboxVisible(true)
                                                                        }} />
                                                                    </div>
                                                                </div>
                                                            </Paper>
                                                        )
                                                    }

                                                    <SubComponents.NumberBlock number="3" label='Categorise the score' />
                                                    <div style={{ position: "relative", height: 25 }}>
                                                        <Text value="Range Scores"
                                                            style={{
                                                                backgroundColor: "grey",
                                                                color: "white", width: 80,
                                                                position: "absolute", right: "16%",
                                                                padding: "2px 5px", marginBottom: 5
                                                            }} />
                                                    </div>
                                                    {
                                                        scoreDataArr && scoreDataArr.map((key, index) => <SubComponents.CustomScore
                                                            key={configIndex + "-" + index}
                                                            configIndex={configIndex}
                                                            lowerRange={lowerRange}
                                                            upperRange={upperRange}
                                                            range={range}
                                                            value={key}
                                                            index={index}
                                                            scoreData={scoreData}
                                                            setScoreDataArrFunc={setScoreDataArrFunc}
                                                            setScoreDataFunc={setScoreDataFunc} />)
                                                    }
                                                    <div className={classes.simpleRow} style={{ alignItems: "center", margin: "11px 0px 15px 11px" }} >
                                                        <ControlPoint
                                                            onClick={() => setScoreDataArrFunc('', "new")}
                                                            style={{ cursor: 'pointer', margin: "5px 5% 0px 5%", fontSize: 24 }} />
                                                        <Text value={'Add New'} />
                                                    </div>
                                                    <SubComponents.NumberBlock number="4" label="Apply this score" />
                                                    <Paper style={{ display: 'flex', alignItems: 'center', margin: "15px 10%" }}>
                                                        <div style={{ border: "1px solid lightgrey" }}>
                                                            <Text value="FileName" style={{ margin: '6px 15px', fontWeight: 700 }} />
                                                        </div>
                                                        <SubComponents.CustomSelector2
                                                            noNone={true}
                                                            style={{ width: "100%" }}
                                                            options={filenames}
                                                            defaultVal={fileName}
                                                            valGetter={onFileChange} />
                                                    </Paper>
                                                </div>

                                            </Paper>
                                            :
                                            (<div style={{ height: "80%", width: "100%", overflowY: "scroll" }}>
                                                {
                                                    renderData.map((data, index) =>
                                                        <div
                                                            style={{
                                                                padding: 10,
                                                                // width: "100%",
                                                                boxShadow: "5px 5px 5px 0px #ccc",
                                                                position: "relative",
                                                                margin: "10px",
                                                                // cursor: "pointer",
                                                                border: activeList === index ? "1px solid #0080ff" : "0.5px solid lightgrey"
                                                            }}>
                                                            <div className={classes.simpleRow}
                                                                style={{ padding: 5, cursor: "pointer" }}
                                                            // onClick={() => onSelect(data.favCompList, index)}
                                                            >

                                                                <i className="fa fa-list" style={{ paddingRight: 8 }} />
                                                                <Text value={data.score_name} />

                                                            </div>
                                                            <div className={classes.simpleRow} style={{ position: "absolute", top: 5, right: 5 }}>

                                                                <Confirmation styleProps={{ marginLeft: 10, cursor: "pointer" }} onSubmit={() => handleDeleteList(data.id)} />
                                                            </div>
                                                            <Divider style={{ height: 2 }} />
                                                            {data.count ?
                                                                <div className={classes.simpleRow} style={{ cursor: "pointer" }} onClick={() => onSelect(data.favCompList, index)}>
                                                                    <Text value={data.count} style={{ padding: "8px 1px 8px 30px", fontSize: 13, fontWeight: 600 }} />
                                                                    <Text value={`in the list`} style={{ padding: "8px 30px 8px 1px" }} />
                                                                </div>
                                                                :
                                                                <div className={classes.row} style={{ margin: 3 }}>
                                                                    <Text style={{ cursor: "pointer" }} onClick={() => {
                                                                        setConfigIndex(index)
                                                                        setConfigure(true)
                                                                        setConfigData(data)
                                                                        setChanges(!changes)
                                                                        setScoreConfigList(data.scoreConfigList)
                                                                    }} value="Configure" />
                                                                    <Text style={{ cursor: "pointer" }} value={getFileStatus(data)} />
                                                                </div>


                                                            }
                                                        </div>
                                                    )}

                                            </div>
                                            )
                                        }
                                    </>

                                }
                            </div>
                            {createListShow &&
                                <div style={{ position: "absolute", top: 10, left: "66%", width: "100%" }}>
                                    <div style={{
                                        width: "33%", position: "relative", boxShadow: "5px 5px 5px 0px #ccc",
                                        border: "1px solid #aaa",
                                    }}>
                                        <Clear onClick={() => {
                                            setCreateListShow(false)
                                            setListName('')
                                        }} style={{ position: "absolute", cursor: "pointer", top: 10, left: 5 }} />
                                        <Text value={"Create New Score"} style={{ textAlign: "center", padding: 10 }} />
                                        <Divider style={{ height: 2 }} />
                                        <div style={{ padding: 16 }}>
                                            <TextField
                                                inputProps={{
                                                    style: {
                                                        padding: 9, fontSize: 11
                                                    }
                                                }}
                                                placeholder="Provide Score Name"
                                                style={{ padding: 2 }}
                                                value={listName}
                                                fullWidth
                                                variant="outlined"
                                                onChange={e => setListName(e.target.value)}
                                            />
                                        </div>
                                        <Divider style={{ height: 2 }} />
                                        <div className={classes.row} style={{ margin: 10 }}>
                                            <Text value={"Cancel"} onClick={() => {
                                                setCreateListShow(false)
                                                setListName('')
                                            }} style={{ cursor: "pointer" }} />
                                            <Text value={"Save"} onClick={handleSave} style={{ cursor: "pointer" }} />
                                        </div>
                                    </div>
                                </div>
                            }
                            <div style={{ width: "45%", marginLeft: '5px', height: window.innerHeight * .8 }}>
                                {checkboxVisible &&
                                    renderActiveUI(window.innerHeight * .8)
                                }
                            </div>

                        </div>
                    </Paper>
                </div>
            }
        </div>

    );
}

ScoreComponent.defaultProps = {
    options: [],
    label: ""
}

ScoreComponent.propType = {
    options: PropTypes.array.isRequired,
    icon: PropTypes.node,
    label: PropTypes.string
}
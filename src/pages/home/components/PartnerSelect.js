import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, ButtonBase, Typography, Popper, Checkbox, Button, Divider } from '@material-ui/core';
import { Check, Search, Close, ArrowRight, PriorityHigh } from '@material-ui/icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import clsx from 'clsx';
import OutsideClickHandler from 'react-outside-click-handler';
import Text from 'components/core/Text'

import SearchBar from 'material-ui-search-bar'

//API
import api from 'api';

//constants
import endpoints from 'constants/endpoints';
import { color } from 'constants/color';

//context
import { useAppValue } from 'context/app';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        // marginleft: 10,
        cursor: "pointer"
    },
    button: {
        zIndex: -1,
        // border: '1.2px solid lightgray',
        // borderRadius: 20,
        padding: '3px 10px',
        height: 30,
        //  minWidth: 120,
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'flex-start'
    },
    option: {
        position: 'absolute',
        top: 30,
        // right: 0,
        width: 250,
        zIndex: 2,
        padding: 10
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
    simpleRow: {
        display: "flex",
        flexDirection: "row",
    },
    center: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: "7px 0px"
    },
    textButton: {
        color: color.primary,
        cursor: "pointer", padding: "5px"
    },
    scroll: {
        width: "100%",
        // height: "63%",
        height: 290,
        overflowY: 'scroll',
        overflowX: 'scroll'
    },
    scroll2: {
        // width: "120%",
        height: 250,
        overflowY: 'scroll',
        overflowX: 'scroll'
    },
}));

function checkCount(arr, length) {
    const func = (trueOrFalse) => trueOrFalse;
    // let count = 0
    // arr.map((v) => v && count++)
    // return count === length
    let trueCount = 0, falseCount = 0
    for (let bool of arr) func(bool) ? trueCount++ : falseCount++
    // if (trueCount === 0 || falseCount === 0) return false
    //console.log("count",trueCount)
    if (trueCount > 0) return true
    // return !arr.every(func)
}

function checkCountOneFalse(arr, length) {
    const func = (trueOrFalse) => trueOrFalse;
    let trueCount = 0, falseCount = 0
    for (let bool of arr) func(bool) ? trueCount++ : falseCount++
    if (trueCount === length) return true
    else return false
}

export default function PartnerSelect(props) {
    const classes = useStyles();

    const { options, icon } = props;


    const [state, dispatch] = useAppValue();
    const { userPartner, userSubPartner, totalCountries, selectedDataset, selectedFilename, userProductServiceFilter, userDigitalEngagementFilter, userCompanyFilter, userCompanyExpertiseFilter, userCategoryFilter, userYearIOFilter, userEmpSizeFilter } = state


    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState();

    const [partnerList, setPartnerList] = useState([]);
    const [partnerMark, setPartnerMark] = useState([]);
    const [subPartnerList, setSubPartnerList] = useState(userSubPartner);
    const [allCheckBoxes, setAllCheckBoxes] = useState({});

    let [search, setSearch] = useState('')
    let [mainData, setMainData] = useState({})
    let [renderData, setRenderData] = useState([])

    const toggle = () => {
        setVisible(!visible);
    }

    const handleCancel = () => {
        if (userPartner.length) {
            let arr = {}
            Object.keys(mainData).map(comp => arr[comp] = userPartner.includes(comp) ? true : false)
            setPartnerList((oldPartnerList) => {
                // return [...oldPartnerList, ...userCompanyFilter]
                return userPartner
            })
            setAllCheckBoxes(arr)
        }
        setVisible(false);
    }

    const checkOrNot = (name) => allCheckBoxes[name] ? true : false

    const setSubPartnerListFunc = (subPartner, checked) => {
        // console.log(subPartner, checked, typeof subPartner)
        let tempArr = [...subPartnerList]
        if (typeof subPartner === "object") {
            if (checked) setSubPartnerList(oldSubPartner => ([...new Set([...oldSubPartner, ...subPartner])]));
            else setSubPartnerList(oldSubPartner => (oldSubPartner.filter(val => subPartner.indexOf(val) < 0)));
        }
        else {
            // console.log(subPartner, checked)
            if (checked) tempArr.push(subPartner);
            else tempArr.splice(tempArr.indexOf(subPartner), 1);
            setSubPartnerList(tempArr)
        }
    }

    const setParentCheckBoxFunc = (name, checkValue) => {
        let tempObj = { ...allCheckBoxes }
        tempObj[name] = checkValue
        setAllCheckBoxes(tempObj)
        // console.log("setParentCheckBoxFunc", name, checkValue, tempObj)
    }

    useEffect(() => {
        if (Object.keys(mainData).length) {
            setRenderData(Object.keys(mainData))
            let arr = {}
            Object.keys(mainData).map(key => {
                let data = mainData[key].subPartner
                if (userSubPartner.length && userSubPartner.some(r => Object.keys(data).indexOf(r) >= 0)) {
                    setPartnerMark(oldPartnerMark => ([...new Set([...oldPartnerMark, key])]));
                }
                else setPartnerMark(oldPartnerMark => (oldPartnerMark.filter(val => val !== key)))

                if (key == "Blank") {
                    if (userPartner.length) arr[key] = true
                    else arr[key] = false
                }

                else {
                    if (userSubPartner.length && Object.keys(data).every(r => userSubPartner.indexOf(r) >= 0)) arr[key] = true
                    else arr[key] = false
                }
            })
            setAllCheckBoxes(arr)
        }
        else setRenderData([])
        // tempData.map(comp => {
        //     arr[comp] = userSubPartner.includes(comp) ? true : false
        // })
    }, [mainData, userSubPartner, userPartner])

    // useEffect(() => {
    //     if (Object.keys(mainData).length) {
    //         setRenderData(Object.keys(mainData))
    //         // let arr = new Array(Object.keys(mainData).length).fill(true)
    //         let arr = {}

    //         if (userPartner.length) {
    //             Object.keys(mainData).map(comp => arr[comp] = userPartner.includes(comp) ? true : false)
    //             setPartnerList((oldPartnerList) => {
    //                 return [...new Set([...oldPartnerList, ...userPartner])]
    //             })
    //         }
    //         else Object.keys(mainData).map(comp => arr[comp] = false) // default check or unCheck
    //         setAllCheckBoxes(arr)
    //     }
    //     else setRenderData([])
    // }, [mainData, userPartner])

    useEffect(() => {
        async function fetchData() {
            const response = await api().post(
                endpoints.getTotalPartners,
                {
                    dataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
                    file_name: selectedFilename,
                    companyFilter: userCompanyFilter,
                    categoryFilter: userCategoryFilter,
                    yearIOFilter: userYearIOFilter,
                    digitalEngagementFilter: userDigitalEngagementFilter,
                    empSizeFilter: userEmpSizeFilter,
                    productServiceFilter: userProductServiceFilter
                }
            );
            if (response.status === 200) {
                const { partner } = response.data
                setMainData(partner)
            }
        }
        fetchData();

    }, [selectedDataset, selectedFilename, totalCountries, userCompanyFilter, userCategoryFilter, userYearIOFilter, userDigitalEngagementFilter, userEmpSizeFilter, userProductServiceFilter]);

    const handleSave = () => {
        if (allCheckBoxes["Blank"]) dispatch({ type: "setUserPartnerFilter", partner: ["Blank"] });
        else dispatch({ type: "setUserPartnerFilter", partner: [] });

        dispatch({ type: "setUserSubPartnerFilter", partner: subPartnerList });

        // setCompanyFilter(partnerList)
        setVisible(false);
        setSearch('')
    }


    const clearFilter = () => {

        let arr = { ...allCheckBoxes }
        let tempCompanyName = [...partnerList];
        renderData.map(comp => {
            arr[comp] = false
            tempCompanyName.splice(tempCompanyName.indexOf(comp), 1)
        })
        setAllCheckBoxes(arr)
        setPartnerList(tempCompanyName)
        dispatch({ type: "setUserSubPartnerFilter", partner: [] });
    }

    const checkAll = (event) => {
        let arr = {}
        renderData.map(comp => arr[comp] = true)
        setAllCheckBoxes(arr)
        setPartnerList(renderData)
        // let arr = {}
        // Object.keys(mainData).map(comp => arr[comp] = event.target.checked)
        // setAllCheckBoxes(arr)
        // event.target.checked ? setPartnerList(mainData) : setPartnerList([])
    }

    const renderCompanyName = () => {
        // if (!renderData.length) return <div>Loading...</div>
        if (checkCount(Object.values(allCheckBoxes)) || partnerMark.length || userPartner.length) return (
            <React.Fragment>
                <Text value={"Partner"} />
                <Text value={"!"} style={{ fontSize: "20px", color: color.primary, paddingLeft: "5px" }} />
            </React.Fragment>
        )
        else return <Text value={"Partner"} />
    }

    const handleCompanyCheckbox = (e, data) => {
        const name = e.target.name;
        const checked = e.target.checked;

        let tempCheckBox = { ...allCheckBoxes };
        let tempCompanyName = [...partnerList];
        let tempArr = [...subPartnerList]

        tempCheckBox[name] = checked

        if (checked && !tempCompanyName.includes(name)) {
            tempCompanyName.push(name);
            if (data) tempArr.push(...Object.keys(data))
        }
        else {
            tempCompanyName.splice(tempCompanyName.indexOf(name), 1);
        }

        setPartnerList(tempCompanyName)
        setAllCheckBoxes(tempCheckBox)

        // if (!tempArr.includes(subPartner)) tempArr.push(subPartner);
        // else tempArr.splice(tempArr.indexOf(subPartner), 1);
        // setSubPartnerList(tempArr)

    }

    const companyFilter = (search) => {
        let inputData = search.toLowerCase();
        const master = [...Object.keys(mainData)];
        if (inputData === '') {
            setRenderData(master)
        } else {
            const clone = master
                .filter(key => key.toLowerCase().includes(inputData))
            setRenderData(clone)
        }
    }

    return (
        <OutsideClickHandler onOutsideClick={() => { setVisible(false) }}>
            <div className={classes.root} {...props}>
                <div onClick={toggle}>
                    <div className={classes.button} >
                        {renderCompanyName()}
                        <ArrowDropDownIcon />
                    </div>
                </div>

                {
                    visible &&
                    <Paper className={classes.option}>
                        <Text value={"Partner"} style={{ textIndent: "5px", fontSize: "13px" }} />
                        <Divider />
                        <div className={classes.center} style={{ justifyContent: "space-between" }}>
                            <Text value={"Clear Filter"} className={classes.textButton} onClick={clearFilter} />
                            <Text value={"Select All"} className={classes.textButton} onClick={checkAll} />
                        </div>
                        <Divider />
                        <div className={classes.center} style={{ justifyContent: "space-between", backgroundColor: "rgba(204, 204, 204, 0.42)", margin: "5px", padding: "8px" }}>
                            <Text value={"Cancel"} style={{ paddingRight: "40%", cursor: "pointer" }} onClick={handleCancel} />
                            <Text value={"Save"} style={{ cursor: "pointer" }} onClick={() => handleSave()} />
                        </div>
                        <SearchBar
                            closeIcon={<Close style={{ fontSize: 20, marginTop: -7 }} />}
                            searchIcon={<Search style={{ fontSize: 20, marginTop: -7 }} />}
                            // InputProps={{
                            //     classes: {
                            //         input: {
                            //             fontSize: "11px"
                            //         }
                            //     },
                            // }}
                            style={{ height: 30, margin: 5 }}
                            placeholder={"Type Partner"}
                            value={search}
                            onChange={(newValue) => {
                                setSearch(newValue)
                                companyFilter(newValue)
                            }}
                            onRequestSearch={companyFilter}
                            onCancelSearch={() => {
                                setSearch('')
                                companyFilter('')
                            }}
                        />
                        <div className={classes.scroll}>
                            {renderData.length ?
                                renderData.map((key, index) => (
                                    <>
                                        <div className={classes.center} style={{ justifyContent: "space-between", backgroundColor: active == index ? "#d3d3d369" : "white" }}>
                                            <div className={classes.center}>
                                                {key === "Blank" &&
                                                    <input
                                                        type="checkbox"
                                                        checked={checkOrNot(key)}
                                                        id={key}
                                                        name={key}
                                                        onChange={(e) => handleCompanyCheckbox(e, mainData[key].subPartner)}
                                                    />
                                                }
                                                <Typography key={index} style={{ fontSize: "12px" }}>{key}&nbsp;( {mainData[key].count} ) </Typography>
                                                {
                                                    partnerMark.includes(key) && <PriorityHigh style={{ color: color.primary, paddingLeft: "5px" }} />
                                                }
                                            </div>
                                            <InnerPopUp
                                                setActive={setActive}
                                                outerIndex={index}
                                                innerName={key}
                                                setParentCheckBox={setParentCheckBoxFunc}
                                                data={mainData[key].subPartner}
                                                setSubPartner={setSubPartnerListFunc}
                                                parentTrue={checkOrNot(key)} />
                                        </div>
                                    </>
                                ))
                                :
                                <Typography style={{ fontSize: "12px" }}>{"No Data"}</Typography>
                            }
                        </div>

                        <Divider />
                    </Paper>
                }
            </div>
        </OutsideClickHandler>
    );
}

const InnerPopUp = ({ data, setSubPartner, setParentCheckBox, parentTrue, innerName, outerIndex, setActive }) => {
    const classes = useStyles();
    const [state, dispatch] = useAppValue();
    const { userSubPartner } = state

    // console.log("userSubPartner", userSubPartner)
    const [innerVisible, setInnerVisible] = useState(false);
    const [innerAllCheckBoxes, setInnerAllCheckBoxes] = useState({});

    let [renderData, setRenderData] = useState([])


    useEffect(() => {
        setRenderData(data ? Object.keys(data) : [])
    }, [data])

    // useEffect(() => {
    //     if (Object.keys(data).length) {
    //         setRenderData(Object.keys(data))
    //         let arr = {}

    //         if (userSubPartner.length) {
    //             Object.keys(data).map(comp => arr[comp] = userSubPartner.includes(comp) ? true : false)
    //             // setPartnerList((oldPartnerList) => {
    //             //     return [...new Set([...oldPartnerList, ...userPartner])]
    //             // })
    //         }
    //         else
    //             Object.keys(data).map(comp => arr[comp] = false) // default check or unCheck
    //         setInnerAllCheckBoxes(arr)
    //     }
    //     else setRenderData([])
    // }, [data, userSubPartner])

    // useEffect(() => {
    //     if (Object.keys(data).length) {
    //         setRenderData(Object.keys(data))
    //         let arr = {}

    //         if (parentTrue) Object.keys(data).map(comp => arr[comp] = true)
    //         else Object.keys(data).map(comp => arr[comp] = false)
    //         setInnerAllCheckBoxes(arr)
    //     }
    //     else setRenderData([])
    // }, [parentTrue])

    useEffect(() => {
        let tempData = data ? Object.keys(data) : []
        if (tempData.length) {
            setRenderData(tempData)
            let arr = {}
            if (userSubPartner.length && userSubPartner.some(r => Object.keys(data).indexOf(r) >= 0))
                // if (userSubPartner.length)
                tempData.map(comp => {
                    arr[comp] = userSubPartner.includes(comp) ? true : false
                })
            else if (!parentTrue) {
                tempData.map(comp => arr[comp] = false)
                setSubPartner(tempData, false)
            }
            if (parentTrue) {
                tempData.map(comp => arr[comp] = true)
                setSubPartner(tempData, true)
            }

            // else {
            //     tempData.map(comp => arr[comp] = false)
            //     setSubPartner(tempData, false)
            // }
            setInnerAllCheckBoxes(arr)
        }
        else setRenderData([])
        // }, [parentTrue, data])
    }, [parentTrue, data, userSubPartner])

    const checkOrNot = (name) => innerAllCheckBoxes[name] ? true : false

    const handleInnerCompanyCheckbox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;

        let tempCheckBox = { ...innerAllCheckBoxes };
        tempCheckBox[name] = checked

        // setParentCheckBox(innerName, checkCountOneFalse(Object.values(tempCheckBox), Object.keys(data).length)) // later to control parent checkbox
        setInnerAllCheckBoxes(tempCheckBox)
        setSubPartner(name, checked)

    }

    const clearFilter = () => {
        let tempData = Object.keys(data)
        let arr = { ...innerAllCheckBoxes }
        // let tempCompanyName = [...partnerList];
        renderData.map(comp => {
            arr[comp] = false
            // tempCompanyName.splice(tempCompanyName.indexOf(comp), 1)
        })
        setInnerAllCheckBoxes(arr)
        setSubPartner(tempData, false)
    }


    const checkAll = (event) => {
        let tempData = Object.keys(data)
        let arr = {}
        renderData.map(comp => arr[comp] = true)
        setInnerAllCheckBoxes(arr)
        setSubPartner(tempData, true)
    }

    const getCheckedCount = (data) => {
        let count = 0
        for (let name of data) if (userSubPartner.includes(name)) count++
        return count
    }

    return (
        <OutsideClickHandler onOutsideClick={() => {
            setInnerVisible(false)
            setActive()
        }}>
            <div style={{ position: "relative" }} />
            <div className={classes.simpleRow} style={{ justifyContent: "space-between" }}>
                {
                    renderData.length > 0 &&
                    <>
                        <Typography style={{ fontSize: "12px", color: getCheckedCount(renderData) == renderData.length ? color.primary : "black" }}>( {getCheckedCount(renderData)} /{renderData.length} )</Typography>
                        <ArrowRight onClick={() => {
                            setActive(outerIndex)
                            setInnerVisible(!innerVisible)
                        }} />
                    </>
                }

            </div>
            {
                innerVisible &&

                <Paper style={{ width: "120%", height: 300, position: "absolute", left: 270, marginTop: -35 - (outerIndex * 38 + outerIndex) }} >
                    <div className={classes.center} style={{ justifyContent: "space-between" }}>
                        <Text value={"Clear Filter"} className={classes.textButton} onClick={clearFilter} />
                        <Text value={"Select All"} className={classes.textButton} onClick={checkAll} />
                    </div>
                    <Divider />
                    <div className={classes.scroll2}>
                        {
                            renderData.length ?
                                renderData.map((key, index) =>
                                    <div className={classes.center} style={{ paddingLeft: 5 }} key={key}>
                                        <input
                                            type="checkbox"
                                            checked={checkOrNot(key)}
                                            id={key}
                                            name={key}
                                            onChange={handleInnerCompanyCheckbox}
                                        />
                                        <Typography key={index} style={{ fontSize: "12px" }}>{key}&nbsp;( {data[key]} ) </Typography>
                                    </div>
                                )
                                :
                                <Typography style={{ fontSize: "12px", padding: 5 }}>{"No Data"}</Typography>
                        }
                    </div>
                </Paper>
            }
        </OutsideClickHandler>
    )


}

PartnerSelect.defaultProps = {
    options: [],
    label: ""
}

PartnerSelect.propType = {
    options: PropTypes.array.isRequired,
    icon: PropTypes.node,
    label: PropTypes.string
}
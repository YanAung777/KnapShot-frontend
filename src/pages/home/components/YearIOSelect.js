import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, ButtonBase, Typography, Popper, Checkbox, Button, Divider } from '@material-ui/core';
import { Check, Search, Close } from '@material-ui/icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import clsx from 'clsx';
import OutsideClickHandler from 'react-outside-click-handler';
import Text from 'components/core/Text'
import RangeSelector from './RangeSelectorForYearIO'

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
        // cursor: "pointer"
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
        width: 250,
        zIndex: 2,
        padding: 10
    },
    text: {
        // cursor: 'pointer',
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
        // cursor: "pointer", 
        padding: "5px"
    },
    scroll: {
        width: "100%",
        // height: "63%",
        height: 180,
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

export default function CustomSelect(props) {
    const classes = useStyles();

    const { options, icon } = props;


    const [state, dispatch] = useAppValue();
    const { totalCountries, selectedDataset, selectedFilename, userYearIOFilter, userCompanyFilter, yearIORangeFilter,
        userCompanyExpertiseFilter, userDigitalEngagementFilter, userProductServiceFilter,
        userEmpSizeFilter, userCategoryFilter, userSubPartner,userPartner } = state

    const [visible, setVisible] = useState(false);

    const [yearIO, setYearIO] = useState([]);
    const [allCheckBoxes, setAllCheckBoxes] = useState({});

    let [search, setSearch] = useState('')
    let [mainData, setMainData] = useState([])
    let [renderData, setRenderData] = useState([])

    let [rangeValue, setRangeValue] = useState(yearIORangeFilter)
    // let [rangeValue, setRangeValue] = useState([])

    const toggle = () => {
        setVisible(!visible);
    }


    // console.log("rangeValue", rangeValue)

    const selectRangeValues = (index, min, max, selectValue, id) => {
        let tempArr = [...rangeValue]
        tempArr[index] = {
            min: min || '',
            max: max || '',
            selectValue: selectValue || "-",
            id: id,
        }
        // setRangeValue(tempArr)
        dispatch({ type: "setYearIORangeFilter", filter: tempArr });

    }

    const deleteRange = async (index) => {
        let tempArr = [...rangeValue]
        tempArr.splice(index, 1)
        // setRangeValue(tempArr)
        dispatch({ type: "setYearIORangeFilter", filter: tempArr });
        
        const response2 = await api().post(endpoints.getTotalYearInOperation, {
            dataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
            file_name: selectedFilename,
            expertiseCompanyFilter: userCompanyExpertiseFilter,
            categoryFilter: userCategoryFilter,
            empSizeFilter: userEmpSizeFilter,
            yearIOFilter: tempArr,
            digitalEngagementFilter: userDigitalEngagementFilter,
            productServiceFilter: userProductServiceFilter,
            companyFilter: userCompanyFilter,
            partnerFilter: [...userSubPartner,...userPartner],
        })
        if (response2.status === 200) {
            const { data } = response2.data
            setMainData(data)
        }
        setYearIO([])
    }

    const handleCancel = () => {
        if (userYearIOFilter.length) {
            let arr = {}
            Object.keys(mainData).map(cate => arr[cate] = userYearIOFilter.includes(cate) ? true : false)
            setYearIO((oldYearIO) => {
                // return [...oldYearIO, ...userYearIOFilter]
                return userYearIOFilter
            })
            setAllCheckBoxes(arr)
        }
        setVisible(false);
    }

    const checkOrNot = (name) => allCheckBoxes[name] ? true : false

    // useEffect(() => {
    //     setYearIO(mainData)
    // }, [])

    useEffect(() => {
        if (Object.keys(mainData).length) {
            setRenderData(Object.keys(mainData))
            // let arr = new Array(Object.keys(mainData).length).fill(true)
            let arr = {}

            if (userYearIOFilter.length) {
                Object.keys(mainData).map(cate => arr[cate] = userYearIOFilter.includes(cate) ? true : false)
                setYearIO((oldYearIO) => {
                    return [...new Set([...oldYearIO, ...userYearIOFilter])]
                })
            }
            else Object.keys(mainData).map(cate => arr[cate] = false) // default check or unCheck
            setAllCheckBoxes(arr)
        }
    }, [mainData, userYearIOFilter])


    useEffect(() => {
        setRangeValue(yearIORangeFilter)
    }, [yearIORangeFilter])


    useEffect(() => {
        async function fetchData() {
            const response = await api().post(
                endpoints.getTotalYearInOperation,
                {
                    dataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
                    file_name: selectedFilename,
                    companyFilter: userCompanyFilter,
                    expertiseCompanyFilter: userCompanyExpertiseFilter,
                    empSizeFilter: userEmpSizeFilter,
                    categoryFilter: userCategoryFilter,
                    digitalEngagementFilter: userDigitalEngagementFilter,
                    productServiceFilter: userProductServiceFilter,
                    partnerFilter: [...userSubPartner,...userPartner]
                }
            );
            if (response.status === 200) {
                const { data } = response.data
                setMainData(data)
            }
        }
        fetchData();

    }, [selectedDataset, selectedFilename, totalCountries, userCompanyFilter, userSubPartner,userPartner,
        userCompanyExpertiseFilter, userEmpSizeFilter, userCategoryFilter, userDigitalEngagementFilter, userProductServiceFilter]);

    const handleSave = () => {
        dispatch({ type: "setUserYearIOFilter", year: rangeValue.length && (rangeValue[0].min || rangeValue[0].max) ? rangeValue : yearIO });
        // setYearIOFilter(yearIO)
        setVisible(false);
    }

    const clearFilter = () => { // pass true or false to check or uncheck all

        let arr = { ...allCheckBoxes }
        let tempYearIO = [...yearIO];
        renderData.map(comp => {
            arr[comp] = false
            tempYearIO.splice(tempYearIO.indexOf(comp), 1)
        })
        setAllCheckBoxes(arr)
        setYearIO(tempYearIO)
        // onSelectChange([])
    }

    const checkAll = (event) => { // pass true or false to check or uncheck all
        let arr = {}
        renderData.map(comp => arr[comp] = true)
        setAllCheckBoxes(arr)
        setYearIO(renderData)
        // let arr = {}
        // Object.keys(mainData).map(comp => arr[comp] = event.target.checked)
        // setAllCheckBoxes(arr)
        // event.target.checked ? setYearIO(mainData) : setYearIO([])
    }

    const renderYearIO = () => {
        if (!renderData.length) return <div>Loading...</div>
        if (checkCount(Object.values(allCheckBoxes)) || rangeValue.length && (rangeValue[0].min || rangeValue[0].max)) return (
            <React.Fragment>
                <Text value={"Year In Operation"} />
                <Text value={"!"} style={{ fontSize: "20px", color: color.primary, paddingLeft: "5px" }} />
            </React.Fragment>
        )
        else return <Text value={"Year In Operation"} />
    }

    const handleYearIOCheckbox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;

        let tempCheckBox = { ...allCheckBoxes };
        let tempYearIO = [...yearIO];

        tempCheckBox[name] = checked

        if (checked && !tempYearIO.includes(name)) tempYearIO.push(name);
        else tempYearIO.splice(tempYearIO.indexOf(name), 1);

        setYearIO(tempYearIO)
        setAllCheckBoxes(tempCheckBox)

    }

    const yearIOFilter = (search) => {
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
                        {renderYearIO()}
                        <ArrowDropDownIcon />
                    </div>
                </div>

                {
                    visible &&
                    <Paper className={classes.option}>
                        <Text value={"Year In Operation"} style={{ textIndent: "5px", fontSize: "13px" }} />
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
                        <Text style={{ fontWeight: 600, paddingLeft: 5, cursor: "pointer" }} value="+ Add new rangeValue" onClick={
                            () => {
                                let obj = { min: '', max: '', selectValue: "-", id: Math.random().toString(36).substr(2, 16) }
                                dispatch({ type: "setYearIORangeFilter", filter: [obj, ...rangeValue] });
                                // let tempArr = [...rangeValue]
                                // setRangeValue((oldRangeValue) => {
                                //     let obj = { min: '', max: '', selectValue: "-", id: Math.random().toString(36).substr(2, 16) }
                                //     dispatch({ type: "setYearIORangeFilter", filter: [obj, ...oldRangeValue] });
                                //     // return [...oldRangeValue, { min: '', max: '', selectValue: "-", id: Math.random().toString(36).substr(2, 16) }]
                                //     return [obj, ...oldRangeValue]
                                // })
                            }
                        } />
                        {
                            rangeValue.map((r, index) => <RangeSelector
                                setMainData={setMainData}
                                key={r.id}
                                keyValue={r.id}
                                setValues={selectRangeValues}
                                index={index}
                                value={r}
                                deleteRange={deleteRange}
                            />)
                        }

                        {/* <SearchBar
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
                            placeholder={"Type yearIO"}
                            value={search}
                            onChange={(newValue) => {
                                setSearch(newValue)
                                yearIOFilter(newValue)
                            }}
                            onRequestSearch={yearIOFilter}
                            onCancelSearch={() => {
                                setSearch('')
                                yearIOFilter('')
                            }}
                        /> */}
                        <div className={classes.scroll}>
                            {renderData.map((key, index) => (
                                <div className={classes.center} key={`${key, index}`}>
                                    <input
                                        type="checkbox"
                                        checked={checkOrNot(key)}
                                        id={key}
                                        name={key}
                                        onChange={handleYearIOCheckbox}
                                    />
                                    <Typography key={index} style={{ fontSize: "12px" }}>{key}</Typography>
                                    <Typography key={mainData[key]} style={{ fontSize: "12px" }}>&nbsp;( {mainData[key]} ) </Typography>
                                </div>
                            ))}
                        </div>
                        <Divider />
                    </Paper>
                }
            </div>
        </OutsideClickHandler>
    );
}

CustomSelect.defaultProps = {
    options: [],
    label: ""
}

CustomSelect.propType = {
    options: PropTypes.array.isRequired,
    icon: PropTypes.node,
    label: PropTypes.string
}
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, ButtonBase, Typography, Popper, Checkbox, Button, Divider } from '@material-ui/core';
import { Check, Search, Close } from '@material-ui/icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import clsx from 'clsx';
import OutsideClickHandler from 'react-outside-click-handler';
import Text from 'components/core/Text'
import RangeSelector from './RangeSelectorForEmpSize'

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
    scroll: {
        width: "100%",
        // height: "63%",
        height: 290,
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
    const { totalCountries, selectedDataset, selectedFilename, userDigitalEngagementFilter, userProductServiceFilter, userSubPartner,userPartner, empSizeRangeFilter,
        userEmpSizeFilter, userCompanyFilter, userCompanyExpertiseFilter, userCategoryFilter, userYearIOFilter } = state

    const [visible, setVisible] = useState(false);

    const [empSize, setEmpSize] = useState([]);
    const [allCheckBoxes, setAllCheckBoxes] = useState({});

    let [search, setSearch] = useState('')
    let [mainData, setMainData] = useState([])
    let [renderData, setRenderData] = useState([])
    let [rangeValue, setRangeValue] = useState(empSizeRangeFilter)

    const selectRangeValues = (index, min, max, selectValue, id) => {
        let tempArr = [...rangeValue]
        tempArr[index] = {
            min: min || '',
            max: max || '',
            selectValue: selectValue || "-",
            id: id,
        }
        dispatch({ type: "setEmpSizeRangeFilter", filter: tempArr });
        // setRangeValue(tempArr)
    }

    const deleteRange = async (index) => {
        let tempArr = [...rangeValue]
        tempArr.splice(index, 1)
        dispatch({ type: "setEmpSizeRangeFilter", filter: tempArr });

        const response2 = await api().post(endpoints.getTotalEmpSize, {
            dataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
            file_name: selectedFilename,
            expertiseCompanyFilter: userCompanyExpertiseFilter,
            categoryFilter: userCategoryFilter,
            empSizeFilter: tempArr,
            yearIOFilter: userYearIOFilter,
            digitalEngagementFilter: userDigitalEngagementFilter,
            productServiceFilter: userProductServiceFilter,
            companyFilter: userCompanyFilter,
            partnerFilter: [...userSubPartner,...userPartner],
        });
        if (response2.status === 200) {
            const { data } = response2.data
            setMainData(data)
        }
        // setRangeValue(tempArr)
        setEmpSize([])
    }

    const toggle = () => {
        setVisible(!visible);
    }

    const handleCancel = () => {
        if (userEmpSizeFilter.length) {
            let arr = {}
            Object.keys(mainData).map(size => arr[size] = userEmpSizeFilter.includes(size) ? true : false)
            setEmpSize((oldEmpSize) => {
                // return [...oldEmpSize, ...userEmpSizeFilter]
                return userEmpSizeFilter
            })
            setAllCheckBoxes(arr)
        }
        setVisible(false);
    }

    const checkOrNot = (name) => allCheckBoxes[name] ? true : false

    // useEffect(() => {
    //     setEmpSize(mainData)
    // }, [])
    useEffect(() => {
        setRangeValue(empSizeRangeFilter)
    }, [empSizeRangeFilter])

    useEffect(() => {
        if (Object.keys(mainData).length) {
            setRenderData(Object.keys(mainData))
            // let arr = new Array(Object.keys(mainData).length).fill(true)
            let arr = {}

            if (userEmpSizeFilter.length) {
                Object.keys(mainData).map(size => arr[size] = userEmpSizeFilter.includes(size) ? true : false)
                setEmpSize((oldEmpSize) => {
                    return [...new Set([...oldEmpSize, ...userEmpSizeFilter])]
                })
            }
            else Object.keys(mainData).map(size => arr[size] = false) // default check or unCheck
            setAllCheckBoxes(arr)
        }
    }, [mainData, userEmpSizeFilter])

    useEffect(() => {
        async function fetchData() {
            const response = await api().post(
                endpoints.getTotalEmpSize,
                {
                    dataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
                    file_name: selectedFilename,
                    companyFilter: userCompanyFilter,
                    expertiseCompanyFilter: userCompanyExpertiseFilter,
                    categoryFilter: userCategoryFilter,
                    yearIOFilter: userYearIOFilter,
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
        userCompanyExpertiseFilter, userCategoryFilter, userYearIOFilter, userDigitalEngagementFilter, userProductServiceFilter]);

    const handleSave = () => {
        dispatch({ type: "setUserEmpSizeFilter", empSize: rangeValue.length && (rangeValue[0].min || rangeValue[0].max) ? rangeValue : empSize });
        // setEmpSizeFilter(empSize)
        setVisible(false);
    }

    const clearFilter = () => { // pass true or false to check or uncheck all

        let arr = { ...allCheckBoxes }
        let tempEmpSize = [...empSize];
        renderData.map(comp => {
            arr[comp] = false
            tempEmpSize.splice(tempEmpSize.indexOf(comp), 1)
        })
        setAllCheckBoxes(arr)
        setEmpSize(tempEmpSize)
        // onSelectChange([])
    }

    const checkAll = (event) => { // pass true or false to check or uncheck all
        let arr = {}
        renderData.map(comp => arr[comp] = true)
        setAllCheckBoxes(arr)
        setEmpSize(renderData)
        // let arr = {}
        // Object.keys(mainData).map(comp => arr[comp] = event.target.checked)
        // setAllCheckBoxes(arr)
        // event.target.checked ? setEmpSize(mainData) : setEmpSize([])
    }

    const renderEmpSize = () => {
        if (!renderData.length) return <div>Loading...</div>
        if (checkCount(Object.values(allCheckBoxes)) || rangeValue.length && (rangeValue[0].min || rangeValue[0].max)) return (
            <React.Fragment>
                <Text value={"Employee Size"} />
                <Text value={"!"} style={{ fontSize: "20px", color: color.primary, paddingLeft: "5px" }} />
            </React.Fragment>
        )
        else return <Text value={"Employee Size"} />
    }

    const handleEmpSizeCheckbox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;

        let tempCheckBox = { ...allCheckBoxes };
        let tempEmpSize = [...empSize];

        tempCheckBox[name] = checked

        if (checked && !tempEmpSize.includes(name)) tempEmpSize.push(name);
        else tempEmpSize.splice(tempEmpSize.indexOf(name), 1);

        setEmpSize(tempEmpSize)
        setAllCheckBoxes(tempCheckBox)

    }

    const empSizeFilter = (search) => {
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
        <OutsideClickHandler onOutsideClick={() => {
            handleCancel()
            setVisible(false)
        }}>
            <div className={classes.root} {...props}>
                <div onClick={toggle}>
                    <div className={classes.button} >
                        {renderEmpSize()}
                        <ArrowDropDownIcon />
                    </div>
                </div>

                {
                    visible &&
                    <Paper className={classes.option}>
                        <Text value={"Employee Size"} style={{ textIndent: "5px", fontSize: "13px" }} />
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
                                // let tempArr = [...rangeValue]
                                let obj = { min: '', max: '', selectValue: "-", id: Math.random().toString(36).substr(2, 16) }
                                dispatch({ type: "setEmpSizeRangeFilter", filter: [obj, ...rangeValue] });
                                // setRangeValue((oldRangeValue) => {
                                //     // return [...oldRangeValue, { min: '', max: '', selectValue: "-", id: Math.random().toString(36).substr(2, 16) }]
                                //     return [{ min: '', max: '', selectValue: "-", id: Math.random().toString(36).substr(2, 16) }, ...oldRangeValue]
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
                            placeholder={"Type empSize"}
                            value={search}
                            onChange={(newValue) => {
                                setSearch(newValue)
                                empSizeFilter(newValue)
                            }}
                            onRequestSearch={empSizeFilter}
                            onCancelSearch={() => {
                                setSearch('')
                                empSizeFilter('')
                            }}
                        /> */}
                        <div className={classes.scroll}>
                            {Object.keys(mainData).length ?
                                renderData.map((key, index) => (
                                    <div className={classes.center}>
                                        <input
                                            type="checkbox"
                                            checked={checkOrNot(key)}
                                            id={key}
                                            name={key}
                                            onChange={handleEmpSizeCheckbox}
                                        />
                                        <Typography key={index} style={{ fontSize: "12px" }}>{key}</Typography>
                                        <Typography key={mainData[key]} style={{ fontSize: "12px" }}>&nbsp;( {mainData[key]} ) </Typography>
                                    </div>
                                ))
                                :
                                <Text value="No Data" style={{margin : 5}} />
                            }
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
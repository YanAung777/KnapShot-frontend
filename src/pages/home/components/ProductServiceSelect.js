import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, ButtonBase, Typography, Popper, Checkbox, Button, Divider } from '@material-ui/core';
import { Check, Search, Close } from '@material-ui/icons';
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
        width: 376,
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
    const { totalCountries, selectedDataset, selectedFilename, userProductServiceFilter, userSubPartner, userPartner,
        userDigitalEngagementFilter, userCompanyFilter, userCompanyExpertiseFilter, userCategoryFilter, userYearIOFilter, userEmpSizeFilter } = state

    const [visible, setVisible] = useState(false);

    const [productService, setProductService] = useState([]);
    const [allCheckBoxes, setAllCheckBoxes] = useState({});

    let [search, setSearch] = useState('')
    let [mainData, setMainData] = useState([])
    let [renderData, setRenderData] = useState([])

    const toggle = () => {
        setVisible(!visible);
    }

    const handleCancel = () => {
        if (userProductServiceFilter.length) {
            let arr = {}
            Object.keys(mainData).map(size => arr[size] = userProductServiceFilter.includes(size) ? true : false)
            setProductService((oldProductService) => {
                // return [...oldProductService, ...userProductServiceFilter]
                return userProductServiceFilter
            })
            setAllCheckBoxes(arr)
        }
        setVisible(false);
    }

    const checkOrNot = (name) => allCheckBoxes[name] ? true : false

    // useEffect(() => {
    //     setProductService(mainData)
    // }, [])

    useEffect(() => {
        if (Object.keys(mainData).length) {
            setRenderData(Object.keys(mainData))
            // let arr = new Array(Object.keys(mainData).length).fill(true)
            let arr = {}

            if (userProductServiceFilter.length) {
                Object.keys(mainData).map(size => arr[size] = userProductServiceFilter.includes(size) ? true : false)
                setProductService((oldProductService) => {
                    return [...new Set([...oldProductService, ...userProductServiceFilter])]
                })
            }
            else Object.keys(mainData).map(size => arr[size] = false) // default check or unCheck
            setAllCheckBoxes(arr)
        }
    }, [mainData, userProductServiceFilter])

    useEffect(() => {
        async function fetchData() {
            const response = await api().post(
                endpoints.getTotalProductService,
                {
                    dataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
                    file_name: selectedFilename,
                    companyFilter: userCompanyFilter,
                    expertiseCompanyFilter: userCompanyExpertiseFilter,
                    categoryFilter: userCategoryFilter,
                    yearIOFilter: userYearIOFilter,
                    digitalEngagementFilter: userDigitalEngagementFilter,
                    empSizeFilter: userEmpSizeFilter,
                    partnerFilter: [...userSubPartner, ...userPartner],
                }
            );
            if (response.status === 200) {
                const { data } = response.data
                setMainData(data)
            }
        }
        fetchData();

    }, [selectedDataset, selectedFilename, totalCountries, userCompanyFilter, userSubPartner, userPartner,
        userCompanyExpertiseFilter, userCategoryFilter, userYearIOFilter, userDigitalEngagementFilter, userEmpSizeFilter]);

    const handleSave = () => {
        dispatch({ type: "setUserProductServiceFilter", filter: productService });
        // setProductServiceFilter(productService)
        setVisible(false);
        setSearch('')
    }

    const clearFilter = () => { // pass true or false to check or uncheck all

        let arr = { ...allCheckBoxes }
        let tempProductService = [...productService];
        renderData.map(comp => {
            arr[comp] = false
            tempProductService.splice(tempProductService.indexOf(comp), 1)
        })
        setAllCheckBoxes(arr)
        setProductService(tempProductService)
        // onSelectChange([])
    }

    const checkAll = (event) => { // pass true or false to check or uncheck all
        let arr = {}
        renderData.map(comp => arr[comp] = true)
        setAllCheckBoxes(arr)
        setProductService(renderData)
        // let arr = {}
        // Object.keys(mainData).map(comp => arr[comp] = event.target.checked)
        // setAllCheckBoxes(arr)
        // event.target.checked ? setProductService(mainData) : setProductService([])
    }

    const renderEmpSize = () => {
        if (!renderData.length) return <div>Loading...</div>
        if (checkCount(Object.values(allCheckBoxes))) return (
            <React.Fragment>
                <Text value={"Product and Services"} />
                <Text value={"!"} style={{ fontSize: "20px", color: color.primary, paddingLeft: "5px" }} />
            </React.Fragment>
        )
        else return <Text value={"Product and Services"} />
    }

    const handleDigitalEngagementCheckbox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;

        let tempCheckBox = { ...allCheckBoxes };
        let tempProductService = [...productService];

        tempCheckBox[name] = checked

        if (checked && !tempProductService.includes(name)) tempProductService.push(name);
        else tempProductService.splice(tempProductService.indexOf(name), 1);

        setProductService(tempProductService)
        setAllCheckBoxes(tempCheckBox)

    }

    const productServiceFilter = (search) => {
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
                        <Text value={"Product and Services"} style={{ textIndent: "5px", fontSize: "13px" }} />
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
                            placeholder={"Type Product/Service"}
                            value={search}
                            onChange={(newValue) => {
                                setSearch(newValue)
                                productServiceFilter(newValue)
                            }}
                            onRequestSearch={productServiceFilter}
                            onCancelSearch={() => {
                                setSearch('')
                                productServiceFilter('')
                            }}
                        />
                        <div className={classes.scroll}>
                            {renderData.map((key, index) => (
                                <div className={classes.center}>
                                    <input
                                        type="checkbox"
                                        checked={checkOrNot(key)}
                                        id={key}
                                        name={key}
                                        onChange={handleDigitalEngagementCheckbox}
                                    />
                                    <Typography key={index} style={{ fontSize: "12px" }}>{key}&nbsp;( {mainData[key]} ) </Typography>
                                    {/* <Typography key={mainData[key]} style={{ fontSize: "12px" }}>&nbsp;( {mainData[key]} ) </Typography> */}
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
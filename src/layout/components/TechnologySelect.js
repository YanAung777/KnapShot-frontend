import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, ButtonBase, Typography, Popper, Popover, Divider, Button, Grid } from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

import SearchBar from 'material-ui-search-bar'

//API
import api from 'api';

//components
import Text from 'components/core/Text';

//constants
import endpoints from 'constants/endpoints';

//context
import { useAppValue } from 'context/app';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        marginLeft: 10
    },
    button: {
        zIndex: -1,
        border: '1.2px solid lightgray',
        borderRadius: 20,
        padding: '3px 10px',
        height: 30,
        minWidth: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    main: {
        margin: 10,
        width: window.innerWidth - (window.innerWidth) * 0.25,
        height: window.innerHeight - 200,
        zIndex: 2,
        padding: "0px 10px 10px 10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    inner: {
        margin: "0px 5px 35px 5px",
        height: "95%",
        width: "97%",
        padding: "0px 10px 0px 10px",
        "display": "flex",
        "flexWrap": "wrap"
    },
    row: {
        display: "flex",
        flexDirection: 'row',
    },
    rowSpace: {
        display: "flex",
        flexDirection: 'row',
        margin: "15px 0px 0px 0px"
    },
    column: {
        "width": "31%",
        // "height": "200px",
        height: "250px",
        marginTop: "20px"
    },
    scroll: {
        width: "100%",
        // height: "63%",
        height: "90%",
        overflowY: 'scroll',
        overflowX: 'scroll'
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
        alignItems: "center",
    },
    right: {
        marginLeft: "auto",
        marginRight: "10px"
    },
    middle: {
        marginLeft: 3,
        marginRight: 3,
    },
    divider: {
        margin: "5px 0px 5px 0px"
    },
    root1: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 300,
    },
    input: {
        '& .MuiInputBase-input': {
            // padding: '2px 0px',
            fontSize: '14px',
            // textAlign: 'center'
        },
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        "&:hover, &.Mui-focusVisible": { backgroundColor: "#555" },
        padding: '0px',
        backgroundColor: "#555",
        width: "30px",
        height: "30px",
        borderRadius: 5,
        color: "white"
    },
    divider1: {
        height: 25,
        margin: 4,
    },
    appBarItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: "10%"
    },
    itemsWrapper: {
        width: '100%',
        padding: 10,
        maxHeight: 300,
        overflowY: 'scroll',
        marginTop: 10,
        zIndex: 999
    },
}));



function checkCount(obj, length) {
    let count = 0
    Object.values(obj).map((v) => v && count++)
    return count === length
}

function RenderObj({ obj, length, name, clear, setClear, reset, setReset, overallCheckBox, setOverallCheckBox }) {
    const classes = useStyles();
    let [search, setSearch] = useState('')
    let [count, setCount] = useState(0)
    const [data, setData] = useState([]);
    const [checkBox, setCheckBox] = useState(overallCheckBox);
    let [renderData, setRenderData] = useState({})

    useEffect(() => {
        function something() {
            let tempCheckBox = { ...checkBox }
            Object.keys(obj).map(key => tempCheckBox[name][key] = false)
            setCheckBox(overallCheckBox)
            setOverallCheckBox(tempCheckBox)
            setClear(false)
        }
        clear && something()
    }, [clear])

    useEffect(() => {
        function something() {
            let tempCheckBox = { ...checkBox }
            Object.keys(obj).map(key => tempCheckBox[name][key] = true)
            setCheckBox(overallCheckBox)
            setOverallCheckBox(tempCheckBox)
            setReset(false)
        }
        reset && something()
    }, [reset])


    useEffect(() => {
        let val = Object.keys(obj)
        setRenderData(obj)
        setCount(Object.values(obj).reduce((a, b) => a + b, 0))
        setData(val)

    }, [])

    const brandFilter = (search) => {
        let inputData = search.toLowerCase();
        const master = { ...obj };
        if (inputData === '') {
            setRenderData(master)
        } else {
            const clone = Object.keys(obj)
                .filter(key => key.toLowerCase().includes(inputData))
                .reduce((newObj, key) => {
                    newObj[key] = obj[key];
                    return newObj;
                }, {});
            setRenderData(clone)
        }
    }

    const handleCheckbox = (e) => {
        const checkBoxName = e.target.name;
        const checked = e.target.checked;
        const index = e.target.id;
        let temp = data;
        let tempCheckBox = checkBox

        if (checked) temp.push(checkBoxName);
        else temp.splice(temp.indexOf(checkBoxName), 1);

        tempCheckBox[name][index] = !tempCheckBox[name][index]
        setCheckBox(JSON.parse(JSON.stringify(tempCheckBox)))
        setOverallCheckBox(JSON.parse(JSON.stringify(tempCheckBox)))
        setData(temp)
    }

    const checkAll = (event) => { // pass true or false to check or uncheck all

        let tempCheckBox = checkBox

        Object.keys(obj).map(key => tempCheckBox[name][key] = event.target.checked)
        setCheckBox(JSON.parse(JSON.stringify(tempCheckBox)))
        setOverallCheckBox(JSON.parse(JSON.stringify(tempCheckBox)))
        if (event.target.checked) {
            setData(Object.keys(obj))
        }
        else {
            setData([])
        }
    }

    return (
        <Grid className={classes.column} item md={4}
        //  style={{ border: '1px solid #ccc', borderRadius: 10 }}
        >
            <Typography style={{ padding: "5px" }} variant="subtitle2" >
                {name}
            </Typography>
            <Divider />
            <Divider />
            <SearchBar
                closeIcon={<Close style={{ fontSize: 20, marginTop: -7 }} />}
                searchIcon={<Search style={{ fontSize: 20, marginTop: -7 }} />}
                style={{ height: 30, margin: 5 }}
                value={search}
                onChange={(newValue) => {
                    setSearch(newValue)
                    brandFilter(newValue)
                }}
                onRequestSearch={brandFilter}
                onCancelSearch={() => {
                    setSearch('')
                    brandFilter('')
                }}
            />
            <div className={classes.scroll}>
                <div className={classes.center}>
                    <input
                        type="checkbox"
                        onChange={checkAll}
                        // defaultChecked={true}
                        checked={checkCount(checkBox[name], length)}
                    />
                    <Typography>Select Multiple</Typography>
                    <Typography className={classes.right}>({count})</Typography>
                </div>
                {Object.keys(renderData).map((key, index) => (
                    <div className={classes.center}>
                        <input
                            type="checkbox"
                            checked={checkBox[name][key]}
                            id={key}
                            name={key}
                            onChange={handleCheckbox}
                        />
                        <Typography key={index} >{key}</Typography>
                        <Typography className={classes.right}>({renderData[key]})</Typography>
                    </div>
                ))}
            </div>
        </Grid>
    )
}

export default function Select(props) {
    const classes = useStyles();

    const [state, dispatch] = useAppValue();

    const { digitalPresenceFilter, selectedDataset, selectedFilename,
        frimographicFilter, totalTechnologySelect, noneTechnologyCompanyIds, noneTechnologyCompanies,
        technologyFilter, restrictTechnologyFilter } = state //searchedBrandsFilter

    const { page } = state.company


    const { options, icon, label } = props;
    const [visible, setVisible] = useState(false);
    let brandsArr = []

    let [data, setData] = useState()
    let [overallData, setOverallData] = useState({})
    let [overallCheckBox, setOverallCheckBox] = useState({})
    let [companyCheckBox, setCompanyCheckBox] = useState(true)
    let [clear, setClear] = useState(false)
    let [reset, setReset] = useState(false)
    let [searchedBrands, setSearchBrands] = useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);
    let [typedBrands, setTypedBrands] = useState({})

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    useEffect(() => {
        setData(totalTechnologySelect[label])
    }, [totalTechnologySelect])


    const toggle = () => {
        setVisible(!visible);
    }

    const inputOnClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const handleClose = () => {
        setVisible(false);
    }


    const onchangeCompanyCheckBox = (e) => {
        setCompanyCheckBox(e.target.checked)
    }

    const clearFilter = () => {
        setClear(true)
        setCompanyCheckBox(true)
        // setTypedBrands({})
    }

    const clearAllFilter = () => {
        dispatch({ type: "resetTechnologyFilter" })
        dispatch({ type: "resetRestrictTechnologyFilter" })
    }

    const resetFilter = () => {
        setReset(true)
        setCompanyCheckBox(false)
        // setTypedBrands({})
    }

    const getCompany = async () => {
        setVisible(false)

        let obj = {
            dataset: selectedDataset,
            file_name: selectedFilename,
            // searchedBrandsFilter,
            technologyFilter,
            restrictTechnologyFilter,
            digitalPresenceFilter,
            frimographicFilter
        }
        // if (!searchedBrandsFilter)
        if (noneTechnologyCompanies) obj.otherCompanyIds = noneTechnologyCompanyIds

        let response = await api().post(
            endpoints.getAllCompanies + "?page=" + page, obj

        );

        if (response.status === 200) {
            dispatch({
                type: "resetCompanies",
                page: page,
                companies: response.data.companies,
                count: response.data.count,
                loading: false
            });
        }
    }

    useEffect(() => {
        // if (!searchedBrandsFilter)
        noneTechnologyCompanyIds &&
            dispatch({
                type: "setNoneTechnologyCompanyIds",
                companies: noneTechnologyCompanyIds
            })
    }, [noneTechnologyCompanyIds])

    useEffect(() => {

        if (companyCheckBox) {
            dispatch({
                type: "setNoneTechnologyCompanyIds",
                companies: noneTechnologyCompanyIds
            })
        }
        else {
            dispatch({
                type: "setNoneTechnologyCompanyIds",
                companies: null
            })
        }

        // if(typedBrands){
        //     dispatch({
        //         type: "setSearchedBrandsFilter",
        //         filter: typedBrands,
        //     })
        // }
    }, [companyCheckBox])//typedBrands

    // useEffect(() => {
    //     dispatch({
    //         type: "setSearchedBrandsFilter",
    //         filter: typedBrands,
    //     })
    // }, [typedBrands])


    useEffect(() => {
        let tempObj = {}, toRemoveObj = {}
        for (let [key, value] of Object.entries(overallCheckBox)) {
            for (let [innerKey, innerValue] of Object.entries(value)) {
                if (innerValue) {
                    if (!tempObj[key]) tempObj[key] = []
                    tempObj[key].push(innerKey)
                }
                else {
                    if (!toRemoveObj[key]) toRemoveObj[key] = []
                    toRemoveObj[key].push(innerKey)
                }
            }
        }

        dispatch({
            type: "setTechnologyFilter",
            filter: { [label]: { ...tempObj } },
        })

        dispatch({
            type: "setRestrictTechnologyFilter",
            filter: { [label]: { ...toRemoveObj } }
        })
    }, [overallCheckBox])

    useEffect(() => {
        let temp = {}
        data && Object.keys(data).length && Object.keys(data).map(key => {
            let obj = data[key]
            let checkBoxObj = {}

            let val = Object.keys(obj)

            val.map(k => {
                checkBoxObj[k] = true
            })
            temp = { ...temp, [key]: checkBoxObj }
        })
        setOverallCheckBox(temp)
        setCompanyCheckBox(true)
    }, [data])

    // useEffect(() => {
    //     if (label === "Widgets") dispatch({ type: "tech" })
    //     else dispatch({ type: "setTechnologyFilter" })
    // }, [label])

    const checkPosition = () => {
        let left = 280
        if (options === "Advertising") return left + 40
        else if (options === "Analytics") return left + 80
        else if (options === "Hosting") return left + 120
        else if (options === "Productivity") return left + 160
        else if (options === "E-Commerce") return left + 200
        else return left + 240
    }

    const onSearchedBrandClick = async (brnd) => {

        let searchedBrands = {}

        for (let [key, value] of Object.entries(technologyFilter)) {
            let subBrands = {}
            for (let [keys, values] of Object.entries(value)) {
                if (values.includes(brnd)) {
                    subBrands[keys] = [brnd]
                    // searchedBrands.push({[key]: subBrands})
                    searchedBrands[key] = subBrands
                }
            }
        }

        console.log(searchedBrands)
        searchedBrands && setTypedBrands(searchedBrands)

        let obj = {
            dataset: selectedDataset,
            file_name: selectedFilename,
            // searchedBrandsFilter: typedBrands ? typedBrands : searchedBrandsFilter,
            technologyFilter,
            restrictTechnologyFilter,
            digitalPresenceFilter,
            frimographicFilter
        }

        let response = await api().post(
            endpoints.getAllCompanies + "?page=" + page, obj
        );

        if (response.status === 200) {
            setVisible(false)
            dispatch({
                type: "resetCompanies",
                page: page,
                companies: response.data.companies,
                count: response.data.count,
                loading: false
            });
        }
    }

    const searchBrands = (event) => {
        const typedBrand = event.target.value
        // console.log("data", totalTechnologySelect)


        let brandsArr = []
        for (let [key, value] of Object.entries(totalTechnologySelect)) {
            for (let [ky, vl] of Object.entries(value)) {
                for (let [k, v] of Object.entries(vl)) {
                    brandsArr.push(k)
                }
            }
        }
        let bArr = []
        for (let i in brandsArr) {
            // if (brandsArr[i].includes('Histats')) {
            //     console.log("brandsArr[i]", brandsArr[i])
            //     console.log("brandsArr", brandsArr[i].toString())
            // }
            const brandStr = brandsArr[i].toString()
            if (typedBrand && typedBrand[0] !== ' ')
                if (brandStr.toLowerCase().match(new RegExp(`^${typedBrand.toLowerCase()}`)))
                    // if (brandStr.includes(typedBrand, -2))
                    bArr.push(brandStr)
        }
        setSearchBrands(bArr)
    }

    return (
        <div className={classes.root} {...props}>
            <div onClick={toggle}>
                <ButtonBase className={classes.button} >
                    {icon ? icon : null}
                    <div style={{ margin: "0 auto" }}>{options}</div>
                </ButtonBase>
            </div>
            <Popover
                onClose={handleClose}
                open={visible}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 260, left: checkPosition() }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >

                <div className={classes.main}>
                    <div className={classes.row}>
                        <br />
                        <br />
                        <br />
                        <div style={{ position: "absolute", left: 30, top: 5 }}>
                            <Button onClick={() => resetFilter()} variant="contained">
                                <Typography>Reset</Typography>
                            </Button>
                        </div>
                        <div style={{ position: "absolute", left: 110, top: 5 }}>
                            <Button onClick={() => clearFilter()} variant="contained">
                                <Typography>Clear</Typography>
                            </Button>
                        </div>
                        <div style={{ position: "absolute", left: '377px', top: 5 }}>
                            <Paper component="form" className={classes.root1}>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Search Brands"
                                    inputProps={{ 'aria-label': 'search brands' }}
                                    onChange={searchBrands}
                                    onClick={inputOnClick}
                                    type="text"
                                />
                                <Popper id={id} open={open} anchorEl={anchorEl} style={{ zIndex: 9999, left: '-8%', width: '18%' }}>
                                    <Paper className={classes.itemsWrapper} elevation={2} style={{ maxHeight: '200px', overFlow: 'y' }} >
                                        {
                                            searchedBrands.map(x => {
                                                return (
                                                    <Text
                                                        value={x}
                                                        style={{ cursor: 'pointer', marginBottom: '8px', paddingLeft: '5px', marginTop: '2px' }}
                                                        // onClick={() => onSearchedBrandClick(x)}
                                                    />
                                                )
                                            })
                                        }
                                    </Paper>
                                </Popper>
                                <Divider className={classes.divider1} orientation="vertical" />
                                <IconButton className={classes.iconButton} aria-label="search" disableRipple={true}>
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                        </div>
                        {/* <div style={{ position: "absolute", left: 190, top: 5 }}>
                            <Button onClick={() => clearAllFilter()} variant="contained">
                                <Typography>Clear All</Typography>
                            </Button>
                        </div> */}
                        <div style={{ position: "absolute", right: 30, top: 5 }}>
                            <Button onClick={() => getCompany()} variant="contained" style={{ backgroundColor: "black" }}>
                                <Typography style={{ color: "#fff" }}>Save</Typography>
                            </Button>
                        </div>

                    </div>
                    <Paper className={classes.inner} style={{ boxShadow: "none" }}>
                        <Grid container spacing={3}>
                            {
                                data && Object.keys(data).length > 0 && Object.keys(data).map(key => {
                                    return <RenderObj
                                        obj={data[key]}
                                        length={Object.keys(data[key]).length}
                                        name={key}
                                        setOverallData={setOverallData}
                                        overallData={overallData}
                                        clear={clear}
                                        setClear={setClear}
                                        reset={reset}
                                        setReset={setReset}
                                        label={label}
                                        overallCheckBox={overallCheckBox}
                                        setOverallCheckBox={setOverallCheckBox}
                                    />
                                })
                            }
                            {
                                label === "Advertising" &&
                                <Grid className={classes.column} item md={4}  >
                                    <Typography style={{ padding: "5px" }} variant="subtitle2" >
                                        Companies Without Asset
                                </Typography>
                                    <Divider />
                                    <div className={classes.center}>
                                        <input
                                            type="checkbox"
                                            checked={companyCheckBox}
                                            onChange={onchangeCompanyCheckBox}
                                        />
                                        <Typography>Others</Typography>
                                        <Typography className={classes.right}>({noneTechnologyCompanyIds.length})</Typography>
                                    </div>
                                </Grid>
                            }
                        </Grid>
                    </Paper>
                </div>
            </Popover>
        </div >
    );
}

Select.defaultProps = {
    options: [],
    label: ""
}

Select.propType = {
    options: PropTypes.array.isRequired,
    icon: PropTypes.node,
    label: PropTypes.string
}
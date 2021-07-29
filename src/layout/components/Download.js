import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Paper, Divider, ButtonBase, Typography, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Lock, ChevronRight, Clear, CheckBoxOutlineBlank, CheckBox, ExpandMore, ExpandLess } from '@material-ui/icons';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import { saveAs } from 'file-saver';

import SearchIcon from '@material-ui/icons/Search';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import Language from '@material-ui/icons/Language';

import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutsideClickHandler from 'react-outside-click-handler';
import CheckboxTree from 'react-checkbox-tree';

import _ from 'lodash';

//components
import Text from 'components/core/Text'

//util
import { checkAuth, getSession } from 'util/check-auth';

//route
import { history } from 'router/history';

//context
import { useAppValue } from 'context/app';

//api
import api from 'api'



//constants
import endpoints from 'constants/endpoints';
import { color } from 'constants/color';
import { keyValues } from 'constants/keyValuesPair2';
import { nodes } from 'constants/technoNode';



const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        // marginleft: 10,
        // cursor: "pointer"
    },
    button: {
        zIndex: -1,
        padding: '3px 10px',
        height: 30,
        display: 'flex',
        alignItems: 'center',
    },
    option: {
        position: 'absolute',
        top: 50,
        right: 0,
        // width: window.innerWidth / 2,
        height: window.innerHeight * .75,
        zIndex: 2,
        padding: 10
    },
    text: {
        display: "flex",
        justifyContent: "space-between",
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'lightgrey'
        },
        margin: 5,
        padding: 5
    },
    simpleColumn: {
        display: "flex",
        flexDirection: "column",
    },
    simpleRow: {
        display: "flex",
        flexDirection: "row",
    },
    paper: {
        boxShadow: "5px 5px 5px 0px #ccc",
        margin: "20px 5px",
        border: "0.5px solid lightgrey"
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
        fontSize: 11,
        cursor: "pointer", padding: "4px"
    },
    scroll: {
        width: "100%",
        // height: "63%",
        height: window.innerHeight * .58,
        overflowY: 'scroll',
        overflowX: 'scroll'
    },
    btn: {
        padding: 5,
        marginRight: 10
    },
    formControl: {
        '& .MuiInputBase-formControl': {
            width: '250px',
            height: '25px',
            fontSize: '12px'
        },
        margin: theme.spacing(1),
        minWidth: 120,
        fontSize: '12px'
    },
    downloadPaper: {
        padding: '10px'
    },
}));

const CompanyContacts = ({ setSelectedDataFunc, allData }) => {

    // console.log("AllData", allData)

    const classes = useStyles();

    const [category, setCategory] = useState([]);

    const renderData = ["Company Name", "Country", "Website", "LinkedIn", "Facebook", "Instagram", "Twitter", "Youtube", "Main Line Number", "Email Address"]

    const [allCheckBoxes, setAllCheckBoxes] = useState(Object.keys(allData).length > 2 ? allData : { "Company Name": true, "Country": true });


    const clearFilter = () => { // pass true or false to check or uncheck all

        let arr = { ...allCheckBoxes }
        let tempCategory = [...category];
        renderData.filter(d => !["Company Name", "Country"].includes(d)).map(comp => {
            arr[comp] = false
            tempCategory.splice(tempCategory.indexOf(comp), 1)
        })
        setAllCheckBoxes(arr)
        setCategory(tempCategory)
        setSelectedDataFunc(arr)
    }

    const checkAll = (event) => { // pass true or false to check or uncheck all
        let arr = {}
        renderData.map(comp => arr[comp] = true)
        setAllCheckBoxes(arr)
        setCategory(renderData)
        setSelectedDataFunc(arr)
    }

    const checkOrNot = (name) => allCheckBoxes[name] ? true : false


    const handleCategoryCheckbox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;

        let tempCheckBox = { ...allCheckBoxes };
        let tempCategory = [...category];

        tempCheckBox[name] = checked

        if (checked && !tempCategory.includes(name)) tempCategory.push(name);
        else tempCategory.splice(tempCategory.indexOf(name), 1);

        setCategory(tempCategory)
        setAllCheckBoxes(tempCheckBox)
        setSelectedDataFunc(tempCheckBox)

    }

    useEffect(() => {
        let tempObj = { ...allCheckBoxes }
        Object.keys(tempObj).forEach(function (key) {
            tempObj[key] = allData[key]
        })
        setAllCheckBoxes(tempObj)
    }, [allData])

    return (
        <Paper className={classes.paper} style={{ width: "100%" }}>
            <Text value={"Company Contacts"} style={{ textIndent: "5px", fontSize: "13px", padding: 5 }} />
            <Divider />
            <div className={classes.center} style={{ justifyContent: "space-between" }}>
                <Text value={"Clear Filter"} className={classes.textButton} onClick={clearFilter} />
                <Text value={"Select All"} className={classes.textButton} onClick={checkAll} />
            </div>
            <Divider />
            <div>
                {renderData.map((key, index) => (
                    <div className={classes.center}>
                        <input
                            type="checkbox"
                            checked={checkOrNot(key)}
                            disabled={["Company Name", "Country"].includes(key)}
                            id={key}
                            name={key}
                            onChange={handleCategoryCheckbox}
                        />
                        <Typography key={index} style={{ fontSize: "12px" }}>{key}</Typography>
                    </div>
                ))}
            </div>
        </Paper>
    )
}

const CompanyFrimographic = ({ setSelectedDataFunc, allData }) => {

    const classes = useStyles();

    const [category, setCategory] = useState([]);

    const renderData = ["Industry", "Category", "Products/Services", "Years in Operation", "Employee Size", "HQ Location", "Partners", "Awards", "Knapshot Score"]

    const [allCheckBoxes, setAllCheckBoxes] = useState(Object.keys(allData).length > 2 ? allData : {});


    const clearFilter = () => { // pass true or false to check or uncheck all

        let arr = { ...allCheckBoxes }
        let tempCategory = [...category];
        renderData.filter(d => !["Company Name", "Country"].includes(d)).map(comp => {
            arr[comp] = false
            tempCategory.splice(tempCategory.indexOf(comp), 1)
        })
        setAllCheckBoxes(arr)
        setCategory(tempCategory)
        setSelectedDataFunc(arr)
    }

    const checkAll = (event) => { // pass true or false to check or uncheck all
        let arr = {}
        renderData.map(comp => arr[comp] = true)
        setAllCheckBoxes(arr)
        setCategory(renderData)
        setSelectedDataFunc(arr)
    }

    const checkOrNot = (name) => allCheckBoxes[name] ? true : false


    const handleCategoryCheckbox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;

        let tempCheckBox = { ...allCheckBoxes };
        let tempCategory = [...category];

        tempCheckBox[name] = checked

        if (checked && !tempCategory.includes(name)) tempCategory.push(name);
        else tempCategory.splice(tempCategory.indexOf(name), 1);

        setCategory(tempCategory)
        setAllCheckBoxes(tempCheckBox)
        setSelectedDataFunc(tempCheckBox)

    }

    useEffect(() => {
        let tempObj = { ...allCheckBoxes }
        Object.keys(tempObj).forEach(function (key) {
            tempObj[key] = allData[key]
        })
        setAllCheckBoxes(tempObj)
    }, [allData])

    return (
        <Paper className={classes.paper} style={{ width: "100%" }}>
            <Text value={"Company Frimographic"} style={{ textIndent: "5px", fontSize: "13px", padding: 5 }} />
            <Divider />
            <div className={classes.center} style={{ justifyContent: "space-between" }}>
                <Text value={"Clear Filter"} className={classes.textButton} onClick={clearFilter} />
                <Text value={"Select All"} className={classes.textButton} onClick={checkAll} />
            </div>
            <Divider />
            <div>
                {renderData.map((key, index) => (
                    <div className={classes.center}>
                        <input
                            type="checkbox"
                            checked={checkOrNot(key)}
                            disabled={["Company Name", "Country"].includes(key)}
                            id={key}
                            name={key}
                            onChange={handleCategoryCheckbox}
                        />
                        <Typography key={index} style={{ fontSize: "12px" }}>{key}</Typography>
                    </div>
                ))}
            </div>
        </Paper>
    )
}

const TechnoRender = ({ setSelectedDataFunc, allData, activeCategory, index, activeIndex }) => {
    const classes = useStyles();

    const [category, setCategory] = useState([]);

    const [renderData, setRenderData] = useState([]);

    const [allCheckBoxes, setAllCheckBoxes] = useState(Object.keys(allData).length > 2 ? allData : {});

    useEffect(() => {
        if (!renderData.length) setRenderData(keyValues[activeCategory])
    }, [activeCategory])

    useEffect(() => {
        let tempObj = { ...allCheckBoxes }
        Object.keys(tempObj).forEach(function (key) {
            tempObj[key] = allData[key]
        })
        setAllCheckBoxes(tempObj)
    }, [allData])

    const clearFilter = () => {

        let arr = { ...allCheckBoxes }
        let tempCategory = [...category];
        renderData.filter(d => !["Company Name", "Country"].includes(d)).map(comp => {
            arr[comp] = false
            tempCategory.splice(tempCategory.indexOf(comp), 1)
        })
        setAllCheckBoxes(arr)
        setCategory(tempCategory)
        setSelectedDataFunc(arr)
    }

    const checkAll = (event) => {
        let arr = {}
        renderData.map(comp => arr[comp] = true)
        setAllCheckBoxes(arr)
        setCategory(renderData)
        setSelectedDataFunc(arr)
    }

    const checkOrNot = (name) => allCheckBoxes[name] ? true : false

    const handleCategoryCheckbox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        // console.log("d", name)

        let tempCheckBox = { ...allCheckBoxes };
        let tempCategory = [...category];

        tempCheckBox[name] = checked

        if (checked && !tempCategory.includes(name)) tempCategory.push(name);
        else tempCategory.splice(tempCategory.indexOf(name), 1);

        setCategory(tempCategory)
        setAllCheckBoxes(tempCheckBox)
        setSelectedDataFunc(tempCheckBox)

    }

    if (index === activeIndex) return (
        <>
            <div className={classes.center} style={{ justifyContent: "space-between" }}>
                <Text value={"Clear Filter"} className={classes.textButton} onClick={clearFilter} />
                <Text value={"Select All"} className={classes.textButton} onClick={checkAll} />
            </div>
            <Divider />
            {renderData && renderData.map((key, index) => (
                <div className={classes.center}>
                    <input
                        type="checkbox"
                        checked={checkOrNot(key)}
                        disabled={["Company Name", "Country"].includes(key)}
                        id={key}
                        name={key}
                        onChange={handleCategoryCheckbox}
                    />
                    <Typography key={index} style={{ fontSize: "12px" }}>{key}</Typography>
                </div>
            ))}
        </>
    )

    else return null
}

const CompanyTechnographic = ({ setSelectedDataFunc, allData }) => {

    const classes = useStyles();

    const [category, setCategory] = useState([]);

    // const [renderData, setRenderData] = useState([]);

    // const [activeCategory, setActiveCategory] = useState("Advertising");

    const [activeIndex, setActiveIndex] = useState(0);

    const [allCheckBoxes, setAllCheckBoxes] = useState(Object.keys(allData).length > 2 ? allData : {});


    const getStyle = (activeIndex, index) => {
        if (activeIndex === index) return { backgroundColor: "#d3d3d369" }
        return {}
    }

    return (
        <>
            <Paper className={classes.paper} style={{ width: "100%" }}>
                {
                    ["Advertising", "Analystics", "Productivity", "Ecommerce", "Hosting", "Widgets"].map((category, index) =>
                        <div className={classes.text} style={{ ...getStyle(activeIndex, index) }} onClick={() => {
                            setActiveIndex(index)
                            // setActiveCategory(category)
                        }}>
                            <Text value={category} />
                            <ChevronRight />
                        </div>
                    )
                }
            </Paper>
            <Paper className={classes.paper} style={{ width: "100%" }}>
                <Text value={"Company Technographic"} style={{ textIndent: "5px", fontSize: "13px", padding: 5 }} />
                <Divider />
                {
                    ["Advertising", "Analystics", "Productivity", "Ecommerce", "Hosting", "Widgets"].map((category, index) =>
                        <TechnoRender activeCategory={category} index={index} activeIndex={activeIndex} allData={allData} setSelectedDataFunc={setSelectedDataFunc} />
                    )
                }
            </Paper>
        </>

    )
}

const CompanyTechnographic2 = ({ setSelectedDataFunc, allData }) => {

    const classes = useStyles();

    const [category, setCategory] = useState([]);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);

    // const [renderData, setRenderData] = useState([]);

    // const [activeCategory, setActiveCategory] = useState("Advertising");

    const [activeIndex, setActiveIndex] = useState(0);

    const [allCheckBoxes, setAllCheckBoxes] = useState(Object.keys(allData).length > 2 ? allData : {});


    const getStyle = (activeIndex, index) => {
        if (activeIndex === index) return { backgroundColor: "#d3d3d369" }
        return {}
    }

    // console.log("checked", checked)
    // console.log("expanded", expanded)

    return (
        <Paper className={classes.paper} style={{
            width: "100%",
            overflowY: 'scroll',
            padding: "10px"
        }}>
            <CheckboxTree
                nodes={nodes}
                checked={checked}
                expanded={expanded}
                onCheck={checked => setChecked(checked)}
                onExpand={expanded => setExpanded(expanded)}
                icons={{
                    check: <CheckBox style={{ color: "#03b1f1" }} />,
                    uncheck: <CheckBoxOutlineBlank />,
                    halfCheck: <CheckBox style={{ color: "lightgrey" }} />,
                    expandClose: <ExpandMore />,
                    expandOpen: <ExpandLess />,
                    expandAll: <ChevronRight />,
                    collapseAll: <ChevronRight />,
                    parentClose: null,
                    parentOpen: null,
                    leaf: null,
                }}
            />
            {/* <Paper className={classes.paper} style={{ width: "100%" }}>
                {
                    ["Advertising", "Analystics", "Productivity", "Ecommerce", "Hosting", "Widgets"].map((category, index) =>
                        <div className={classes.text} style={{ ...getStyle(activeIndex, index) }} onClick={() => {
                            setActiveIndex(index)
                            // setActiveCategory(category)
                        }}>
                            <Text value={category} />
                            <ChevronRight />
                        </div>
                    )
                }
            </Paper>
            <Paper className={classes.paper} style={{ width: "100%" }}>
                <Text value={"Company Technographic"} style={{ textIndent: "5px", fontSize: "13px", padding: 5 }} />
                <Divider />
                {
                    ["Advertising", "Analystics", "Productivity", "Ecommerce", "Hosting", "Widgets"].map((category, index) =>
                        <TechnoRender activeCategory={category} index={index} activeIndex={activeIndex} allData={allData} setSelectedDataFunc={setSelectedDataFunc} />
                    )
                }
            </Paper> */}
        </Paper>

    )
}

const SelectedColumn = ({ data, setSelectedDataFunc, resetCheckBoxes }) => {

    const classes = useStyles();

    const [category, setCategory] = useState([]);
    const [allCheckBoxes, setAllCheckBoxes] = useState({ "Company Name": true, "Country": true });
    // const renderData = ["Company Name", "Country"]

    const UnselectAll = () => { // pass true or false to check or uncheck all

        let arr = { ...allCheckBoxes }
        let tempCategory = [...category];
        data.filter(d => !["Company Name", "Country"].includes(d)).map(comp => {
            arr[comp] = false
            tempCategory.splice(tempCategory.indexOf(comp), 1)
        })
        setAllCheckBoxes(arr)
        setCategory(tempCategory)
    }

    const Unselect = (comp) => { // pass true or false to check or uncheck all

        let arr = { ...allCheckBoxes }
        let tempCategory = [...category];

        arr[comp] = false
        tempCategory.splice(tempCategory.indexOf(comp), 1)

        setAllCheckBoxes(arr)
        setCategory(tempCategory)
    }

    useEffect(() => {
        setSelectedDataFunc(allCheckBoxes)
    }, [allCheckBoxes])

    // useEffect(() => {
    //     resetCheckBoxes(allCheckBoxes)
    // }, [data])

    const checkOrNot = (name) => allCheckBoxes[name] ? true : false


    return (
        <Paper className={classes.paper} style={{ width: "100%" }}>
            <Text value={"Selected Columns"} style={{ textIndent: "5px", fontSize: "13px", padding: 5 }} />
            <Divider />
            <div className={classes.center} style={{ justifyContent: "space-between" }}>
                <Text value={"Unselect All"} className={classes.textButton} onClick={UnselectAll} />
            </div>
            <Divider />
            <div className={classes.scroll}>
                {data.map((key, index) => (
                    <div className={classes.center} style={{ justifyContent: "space-between", padding: "0px 5px" }}>
                        <Typography key={index} style={{ fontSize: "12px" }}>{key}</Typography>
                        {
                            ["Company Name", "Country"].includes(key) ?
                                <Lock /> :
                                <Clear onClick={() => Unselect(key)} style={{ cursor: "pointer" }} />
                        }
                    </div>
                ))}
            </div>
        </Paper>
    )
}

export default function DownloadComponent() {

    const classes = useStyles();

    const [state, dispatch] = useAppValue();

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0);

    const [selectedData, setSelectedData] = useState([]);

    const [allData, setAllData] = useState({ "Company Name": true, "Country": true });


    const toggle = () => {
        setVisible(!visible);
    }



    const getKeyArr = (obj, val) => {
        // console.log(obj)
        return Object.keys(obj).filter(key => obj[key] === val)
    };

    const setSelectedDataFunc = (obj) => {
        let tempObj = { ...allData, ...obj }

        let setData = [...selectedData]
        let falseData = getKeyArr(obj, false)

        Object.keys(obj).map(key => {
            if (obj[key] && !setData.includes(key)) setData.push(key)
        })

        falseData.map(d => {
            let index = setData.indexOf(d)
            if (index > -1) setData.splice(setData.indexOf(d), 1)
        })

        setSelectedData(setData)
        setAllData(tempObj)

    }



    const resetCheckBoxes = (obj) => {
        // let tempObj = { ...allCheckBoxes, ...obj }
        // setAllCheckBoxes(tempObj)
    }

    const renderActiveUI = () => {
        switch (activeIndex) {
            case 0: return <CompanyContacts
                resetCheckBoxes={resetCheckBoxes}
                setSelectedDataFunc={setSelectedDataFunc}
                allData={allData}
            // allCheckBoxes={allCheckBoxes}
            // setAllCheckBoxes={setAllCheckBoxes}
            />
            case 1: return <CompanyFrimographic
                resetCheckBoxes={resetCheckBoxes}
                setSelectedDataFunc={setSelectedDataFunc}
                allData={allData}
            />

            case 2: return <CompanyTechnographic
                resetCheckBoxes={resetCheckBoxes}
                setSelectedDataFunc={setSelectedDataFunc}
                allData={allData}
            />

            default: return <CompanyContacts
                resetCheckBoxes={resetCheckBoxes}
                setSelectedDataFunc={setSelectedDataFunc}
                allData={allData}
            />
        }
        // return <RenderNewCompanyList {...props} clearAllFilter={clearAllFilter} />
    }

    const getStyle = (activeIndex, index) => {
        if (activeIndex === index) return { backgroundColor: "#d3d3d369" }
        return {}
    }

    const handleDownload = async () => {
        // const response = 
        setLoading(true)
        await api().post(endpoints.newExcelExport, { requestedData: selectedData }, { responseType: 'arraybuffer' }).then(response => {
            setLoading(false)
            var blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'knapshot.xlsx');
        })
        // console.log("response", response)
        // console.log("download", selectedData)
    }

    return (
        <OutsideClickHandler onOutsideClick={() => { setVisible(false) }}>
            <div className={classes.root} >
                <div onClick={toggle}>
                    <div className={classes.button} >
                        <Text value={"Download"} style={{ cursor: "pointer" }} />
                    </div>
                </div>

                {
                    visible &&
                    <Paper className={classes.option} style={{ width: activeIndex === 2 ? window.innerWidth / 3 * 2 : window.innerWidth / 2 }}>
                        <div className={classes.simpleRow} style={{ justifyContent: "space-between", padding: "0px 10px" }}>
                            <Text value="Select Fields" />
                            <div className={classes.simpleRow} style={{ position: "relative" }}>
                                {loading && <i style={{ position: "absolute", top: 3 }} class="fa-li fa fa-spinner fa-spin"></i>}
                                <Text value={"Download"} style={{
                                    cursor: "pointer", marginRight: 10,
                                    padding: "2px 5px", border: `1px solid ${color.primary}`, borderRadius: 4, backgroundColor: color.primary, color: "white"
                                }} onClick={() => handleDownload()} />
                                <Clear onClick={() => setVisible(false)} style={{ cursor: "pointer" }} />
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", height: "100%" }}>
                            <Paper className={classes.paper} style={{ width: "100%" }}>
                                <div className={classes.text} style={{ ...getStyle(activeIndex, 0) }} onClick={() => setActiveIndex(0)}>
                                    <Text value="Company Contacts" />
                                    <ChevronRight />
                                </div>
                                <div className={classes.text} style={{ ...getStyle(activeIndex, 1) }} onClick={() => setActiveIndex(1)}>
                                    <Text value="Company Frimographic" />
                                    <ChevronRight />
                                </div>
                                <div className={classes.text} style={{ ...getStyle(activeIndex, 2) }} onClick={() => setActiveIndex(2)}>
                                    <Text value="Company Technographic" />
                                    <ChevronRight />
                                </div>
                            </Paper>
                            {
                                renderActiveUI()
                            }
                            <SelectedColumn
                                data={selectedData}
                                setSelectedDataFunc={setSelectedDataFunc}
                                resetCheckBoxes={resetCheckBoxes}
                            />
                        </div>
                    </Paper>
                }
            </div>
        </OutsideClickHandler>
    );
}

DownloadComponent.defaultProps = {
    label: ""
}

DownloadComponent.propType = {
    icon: PropTypes.node,
    label: PropTypes.string
}

// const FileNameSelect = ({ setSelectOpen, setSelectedValue, selectOpen, selectedValue, fileNamesArr, selectId }) => {

//     const handleSelectClose = () => {
//         setSelectOpen(false);
//     };

//     const handleSelectOpen = () => {
//         setSelectOpen(true);
//     };

//     const handleSelectChange = async (event) => {
//         setSelectedValue(event.target.value)
//     }

//     return (
//         <Select
//             labelId="demo-controlled-open-select-label"
//             id={selectId}
//             open={selectOpen}
//             onClose={handleSelectClose}
//             onOpen={handleSelectOpen}
//             value={selectedValue}
//             onChange={handleSelectChange}
//             variant="outlined"
//             displayEmpty
//             style={{ marginRight: '10px' }}
//         >
//             <MenuItem value="" style={{ fontSize: 12 }} disabled>Select One</MenuItem>
//             {
//                 fileNamesArr.map(x =>
//                     <MenuItem value={x} style={{ fontSize: 12 }}>{x}</MenuItem>
//                 )
//             }
//         </Select>
//     )
// }

// const ExcelSelect = ({ selectExcelOpen, setExcelSelectedValue, setExcelSelectOpen, excelSelectedValue, selectId }) => {

//     const handleSelectClose = () => {
//         setExcelSelectOpen(false);
//     };

//     const handleSelectOpen = () => {
//         setExcelSelectOpen(true);
//     };

//     const handleSelectChange = async (event) => {
//         setExcelSelectedValue(event.target.value)
//     }

//     return (
//         <Select
//             labelId="demo-controlled-open-select-label"
//             id={selectId}
//             open={selectExcelOpen}
//             onClose={handleSelectClose}
//             onOpen={handleSelectOpen}
//             value={excelSelectedValue}
//             onChange={handleSelectChange}
//             variant="outlined"
//             displayEmpty
//         >
//             <MenuItem value="" style={{ fontSize: 12 }} disabled>Select One</MenuItem>
//             <MenuItem value="knapshot" style={{ fontSize: 12 }}>Knapshot Score</MenuItem>
//             <MenuItem value="priority" style={{ fontSize: 12 }}>Priority Score</MenuItem>
//             {/* {
//                 fileNamesArr.map(x =>
//                     <MenuItem value={x} style={{ fontSize: 12 }}>{x}</MenuItem>
//                 )
//             } */}
//         </Select>
//     )
// }

// export default function DownloadComponent () {

//     const classes = useStyles();

//     const [state, dispatch] = useAppValue();

//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const [anchorExcelEl, setAnchorExcelEl] = React.useState(null);

//     const [excelFileNames, setExcelFileNames] = useState([])

//     const [excelSelectedValue, setExcelSelectedValue] = useState('')

//     const [fileNamesArr, setFileNamesArr] = useState([])

//     const [link, setLink] = useState()

//     const [selectOpen, setSelectOpen] = React.useState(false);

//     const [selectExcelOpen, setExcelSelectOpen] = React.useState(false);

//     const [selectedValue, setSelectedValue] = useState('')

//     useEffect(() => {
//         async function getExcelFileNames() {
//             const response = await api().get(endpoints.getExcelFileNames);
//             if (response.status === 200) {
//                 setExcelFileNames(response.data.excelFiles)
//             }
//         }

//         getExcelFileNames()
//     }, [state.selectedExcelName]);

//     useEffect(() => {
//         if (excelSelectedValue === 'knapshot') {
//             setLink(`${endpoints.baseUrl}/excelExport` + `?filename=` + `${selectedValue}`)
//             // setLink(`http://api.azure.dev.knapshot.co/excelExport` + `?filename=` + `${selectedValue}`)
//             // setLink(`http://localhost:5000/excelExport` + `?filename=` + `${selectedValue}`)   
//         }
//         if (excelSelectedValue === 'priority') {
//             setLink(`${endpoints.baseUrl}/priorityScoreExport` + `?filename=` + `${selectedValue}`)
//             // setLink(`http://api.azure.dev.knapshot.co/priorityScoreExport` + `?filename=` + `${selectedValue}`)
//             // setLink(`http://localhost:5000/priorityScoreExport` + `?filename=` + `${selectedValue}`)
//         }
//     }, [excelSelectedValue, selectedValue])

//     useEffect(() => {
//         const fetchDbFileNames = async () => {
//             // setBreakdown('Choose one')
//             // setValue()
//             // if (overlay && breakdown !== 'Choose one') {
//             const response = await api().get(
//                 endpoints.getFileNamesFromDB
//             );
//             if (response.status === 200) {
//                 // setOverlay(response.data.data)
//                 setFileNamesArr(response.data.data)
//             }
//             // }
//         }
//         fetchDbFileNames()
//     }, [])

//     const handleDownload = event => {
//         setAnchorEl(event.currentTarget);
//     }

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const open = Boolean(anchorEl);
//     const id = open ? 'simple-popover' : undefined;

//     const openExcel = Boolean(anchorExcelEl);
//     const idExcel = openExcel ? 'simple-popover' : undefined;

//     return (
//         <>
//             <ButtonBase className={classes.btn} onClick={handleDownload}>Download</ButtonBase>
//             <Popover
//                 id={id}
//                 open={open}
//                 onClose={handleClose}
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'right',
//                 }}
//                 transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right',
//                 }}
//             >
//                 <Paper className={classes.downloadPaper}>
//                     <div style={{ display: 'flex' }}>
//                         <Text value={`File Name`} style={{ marginLeft: '10px', fontSize: '12px' }} />
//                         <Text value={`Score Type`} style={{ marginLeft: '105px', fontSize: '12px' }} />
//                     </div>
//                     <FormControl className={classes.formControl} style={{ display: 'flex', flexDirection: 'row' }}>
//                         <FileNameSelect
//                             selectId={`ks`}
//                             setSelectOpen={setSelectOpen}
//                             setSelectedValue={setSelectedValue}
//                             selectOpen={selectOpen}
//                             selectedValue={selectedValue}
//                             fileNamesArr={fileNamesArr}
//                         />
//                         <ExcelSelect
//                             selectId={`ps`}
//                             setExcelSelectOpen={setExcelSelectOpen}
//                             setExcelSelectedValue={setExcelSelectedValue}
//                             selectExcelOpen={selectExcelOpen}
//                             excelSelectedValue={excelSelectedValue}
//                         // fileNamesArr={fileNamesArr}
//                         />
//                         <a target="blank" href={link} style={{ textDecoration: 'none' }}>
//                             {/* <a target="blank" href={`http://localhost:5000/excelExport`+`?filename=`+`${selectedValue}`}> */}
//                             <ButtonBase style={{ marginLeft: '10px', borderRadius: 4, width: '70px', height: '25px', backgroundColor: '#3c8dbc' }} onClick={handleClose}>
//                                 <Text value={`Download`} style={{ color: '#fff', fontSize: 12 }} />
//                             </ButtonBase>
//                         </a>
//                     </FormControl>
//                 </Paper>
//             </Popover>
//         </>
//     )
// }


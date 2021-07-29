import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Paper, InputBase, Divider, IconButton, Typography, Button, ButtonBase, ButtonGroup } from '@material-ui/core';
import { Visibility, FolderOpen, Public, Equalizer, BubbleChart, Print, Share, GetApp, ArrowRight, ArrowLeft } from '@material-ui/icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


//components
import Menu from 'components/core/Menu';
import CustomIcon from 'components/core/CustomIcon';
import SearchBox from './components/SearchBox';
import Text from 'components/core/Text'
import CountrySelect from './components/CountrySelect';
import CustomSelectWithCheckBox from 'components/core/CustomSelectWithCheckBox';
import CustomSelect from 'components/core/CustomSelect';
import FrimographicSelect from './components/FrimographicSelect';
import TechnologySelect from './components/TechnologySelect';
import DigitalPresenceSelect from './components/DigitalPresenceSelect';
import GroupButton from './components/GroupButton';

import DatasetSelectForUser from 'components/core/DatasetSelectForUser';
import CompanySelect from 'pages/home/components/CompanySelect';
import CategorySelect from 'pages/home/components/CategorySelect';
import YearIOSelect from 'pages/home/components/YearIOSelect';
import EmpSelect from 'pages/home/components/EmpSelect';
import DigitalEngagementSelect from 'pages/home/components/DigitalEngagementSelect';
import PartnerSelect from 'pages/home/components/PartnerSelect';
import ProductServiceSelect from 'pages/home/components/ProductServiceSelect';
import ExpertiseSelect from 'pages/home/components/ExpertiseSelect';


import { grey } from '@material-ui/core/colors';

//util
import { checkAuth } from 'util/check-auth';

//route
import { history } from 'router/history';
import { routes } from 'router/routes';

//context
import { useAppValue } from 'context/app';

//api
import api from 'api'

//constants
import endpoints from 'constants/endpoints';
import { color } from 'constants/color';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        position: 'relative',
        cursor: "pointer"
    },
    appBar: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        borderBottom: '2px solid lightgray',
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    appBarItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: "10%"
    },
    logo: {
        width: 50,
        height: 50,
        margin: '0 20px',
        cursor: "pointer"
    },
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
    },
    divider: {
        height: 28,
        margin: 4,
    },
    btn: {
        padding: 5,
        marginRight: 5
    },
    searchIcon: {
        backgroundColor: "#555",
        width: "30px",
        height: "30px",
        borderRadius: 5,
        color: "white"
    },
    filterWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 5px',
    },
    filterWrapper2: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 5px',
    },
    filterItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    btnGroup: {
        backgroundColor: 'transparent',
        border: 'none'
    },
    activeBtn: {
        // borderBottom: "3px solid rgb(3, 177, 241)",
        color: color.primary,
        padding: 5,
        marginRight: 5
    },
    button: {
        zIndex: -1,
        // border: '1.2px solid lightgray',
        // borderRadius: 20,
        padding: '3px 10px',
        height: 30,
        minWidth: 120,
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'flex-start'
    },
}));

export default function AnalyzeHeader({ filter, userData }) {
    const classes = useStyles();

    const [state, dispatch] = useAppValue();

    const [fieldType, setFieldType] = useState(0);

    // const [filter, setFilter] = useState('');

    const { filenames, totalCountries } = state;

    const fieldTypeValue = state.fieldType

    // const [excelFileNames, setExcelFileNames] = useState([])

    // const [anchorEl, setAnchorEl] = React.useState(null);

    // const [anchorExcelEl, setAnchorExcelEl] = React.useState(null);

    // const [selectOpen, setSelectOpen] = React.useState(false);

    // const [selectExcelOpen, setExcelSelectOpen] = React.useState(false);

    // const [selectedValue, setSelectedValue] = useState('')

    // const [excelSelectedValue, setExcelSelectedValue] = useState('')

    // const [fileNamesArr, setFileNamesArr] = useState([])

    // const [link, setLink] = useState()

    // useEffect(() => {
    //     async function getExcelFileNames() {
    //         const response = await api().get(endpoints.getExcelFileNames);
    //         if (response.status === 200) {
    //             setExcelFileNames(response.data.excelFiles)
    //         }
    //     }

    //     getExcelFileNames()
    // }, [state.selectedExcelName]);

    // useEffect(() => {
    //     if (excelSelectedValue === 'knapshot') {
    //         setLink(`http://api.azure.dev.knapshot.co/excelExport` + `?filename=` + `${selectedValue}`)
    //         // setLink(`http://localhost:5000/excelExport` + `?filename=` + `${selectedValue}`)   
    //     }
    //     if (excelSelectedValue === 'priority') {
    //         setLink(`http://api.azure.dev.knapshot.co/priorityScoreExport` + `?filename=` + `${selectedValue}`)
    //         // setLink(`http://localhost:5000/priorityScoreExport` + `?filename=` + `${selectedValue}`)
    //     }
    // }, [excelSelectedValue, selectedValue])

    // useEffect(() => {
    //     const fetchDbFileNames = async () => {
    //         // setBreakdown('Choose one')
    //         // setValue()
    //         // if (overlay && breakdown !== 'Choose one') {
    //         const response = await api().get(
    //             endpoints.getFileNamesFromDB
    //         );
    //         if (response.status === 200) {
    //             // setOverlay(response.data.data)
    //             setFileNamesArr(response.data.data)
    //         }
    //         // }
    //     }
    //     fetchDbFileNames()
    // }, [])

    // useEffect(() => {
    //     function changePage() {
    //         if (filter === "Overview") {
    //             history.push("/overview")
    //             dispatch({
    //                 type: "setOverviewTab",
    //                 index: 0
    //             })
    //         }
    //         filter === "Company List" && history.push("/")
    //         filter === "Technology" && history.push("/technology")
    //         filter === "Digital Engagement" && history.push("/digitalEngagement")
    //     }
    //     changePage()
    // }, [filter])

    useEffect(() => {
        function setFieldType() {
            dispatch({
                type: "setFieldType",
                index: fieldType
            })
        }

        setFieldType()

    }, [fieldType])

    if (!checkAuth()) {
        history.push("/login");
    }

    // const onFileChange = (filename) => {
    //     dispatch({ type: "setSelectedFile", filename });
    // }

    const onDatasetChange = (dataset) => {
        dispatch({ type: "setSelectedDataset", dataset });
    }

    // const handleDownload = event => {
    //     setAnchorEl(event.currentTarget);
    // }

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // const open = Boolean(anchorEl);
    // const id = open ? 'simple-popover' : undefined;

    // const openExcel = Boolean(anchorExcelEl);
    // const idExcel = openExcel ? 'simple-popover' : undefined;

    // const lists = ["Assign Checker"]
    // console.log("role", userData.role)

    return (
        <div className={classes.root}>
            <div className={classes.root}>
                {
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", backgroundColor: grey[300] }}>
                        <DatasetSelectForUser />
                        <CompanySelect />
                        <CategorySelect />
                        <ProductServiceSelect />
                        <PartnerSelect />
                        <YearIOSelect />
                        <EmpSelect />
                        <DigitalEngagementSelect />
                        <Text value={"Clear Filter"} onClick={() => {
                            dispatch({ type: "setSelectedDataset", dataset: "Indonesia" })
                            dispatch({ type: "setUserCompanyFilter", companies: [] })
                            dispatch({ type: "setUserCategoryFilter", category: [] })
                            dispatch({ type: "setUserDigitalEngagementFilter", filter: [] })
                            dispatch({ type: "setUserEmpSizeFilter", empSize: [] })
                            dispatch({ type: "setUserPartnerFilter", partner: [] })
                            dispatch({ type: "setUserSubPartnerFilter", partner: [] })
                            dispatch({ type: "setUserProductServiceFilter", filter: [] })
                            dispatch({ type: "setUserYearIOFilter", year: [] })
                            dispatch({ type: "setYearIORangeFilter", filter: [{ min: '', max: '', selectValue: "-" }] });
                            dispatch({ type: "setEmpSizeRangeFilter", filter: [{ min: '', max: '', selectValue: "-" }] });
                        }} />
                    </div>

                }
                < Divider />
            </div>

        </div>
    );

    // return (
    //     <div className={classes.root}>
    //         <div className={classes.root}>
    //             {
    //                 userData.role === "admin" ?
    //                     <div className={classes.filterWrapper}>

    //                         {/* <div className={classes.filterItem}>
    //                     <ButtonBase className={classes.btn} style={{ fontWeight: 700, marginLeft: '25px' }}>Fields Type</ButtonBase>
    //                     <Divider className={classes.divider} orientation="vertical" style={{ margin: 0, width: '3px' }} />
    //                     <ButtonBase className={fieldTypeValue === 0 ? classes.activeBtn : classes.btn} onClick={() => setFieldType(0)}>Offering Keywords/Expertise/Partners</ButtonBase>
    //                     <Divider className={classes.divider} orientation="vertical" style={{ margin: 0, width: '3px' }} />
    //                     <ButtonBase className={fieldTypeValue === 1 ? classes.activeBtn : classes.btn} onClick={() => setFieldType(1)}>Contact/HQ/Years in Operation/Employee Size</ButtonBase>
    //                     <Divider className={classes.divider} orientation="vertical" style={{ margin: 0, width: '3px' }} />
    //                     <ButtonBase className={fieldTypeValue === 2 ? classes.activeBtn : classes.btn} onClick={() => setFieldType(2)}>Clients/Awards & Accolades</ButtonBase>
    //                     <Divider className={classes.divider} orientation="vertical" style={{ margin: 0, width: '3px' }} />
    //                     <ButtonBase className={fieldTypeValue === 3 ? classes.activeBtn : classes.btn} onClick={() => setFieldType(3)}>Directory Presence</ButtonBase>
    //                     <Divider className={classes.divider} orientation="vertical" style={{ margin: 0, width: '3px' }} />
    //                     <ButtonBase className={fieldTypeValue === 4 ? classes.activeBtn : classes.btn} onClick={() => setFieldType(4)}>Technology</ButtonBase>

    //                 </div> */}

    //                         {
    //                             filter === "Overview" &&
    //                             <GroupButton>
    //                                 <CustomIcon icon={<Public />} />
    //                                 <CustomIcon icon={<Equalizer />} />
    //                                 <CustomIcon icon={<BubbleChart />} />
    //                             </GroupButton>
    //                         }

    //                         {/*{
    //             filter === "Company List" &&
    //             <GroupButton>
    //                 <Text value={`Keywords Analysis`} style={{ fontSize: 12, textTransform: 'capitalize', width: '100px', lineHeight: 'normal' }} />
    //                 <Text value={`Digital Engagement Assets`} style={{ fontSize: 12, textTransform: 'capitalize', width: '115px', lineHeight: 'normal' }} />
    //                 <Text value={`Technology Assets`} style={{ fontSize: 12, textTransform: 'capitalize', width: '100px', lineHeight: 'normal' }} />
    //             </GroupButton>
    //         } */}

    //                         {/* <ButtonGroup
    //             variant="contained"
    //             size="small"
    //             aria-label="small contained button group"
    //             style={{ zIndex: 0 }}
    //         >
    //             <Paper style={{ display: 'flex', alignItems: 'center', border: 'none' }} elevation={3}>
    //                 <Typography style={{ paddingLeft: '15px', marginRight: '15px', fontWeight: 700 }}>{`Actions`}</Typography>
    //                 <CustomSelect
    //                     // onSelectChange={setFilter}
    //                     options={lists}
    //                     // icon={<CustomIcon style={{ padding: 0 }} icon={<Visibility />} />}
    //                     style={{ zIndex: 9999 }}
    //                     dropdown={<ExpandMoreIcon />}
    //                 // icon={`Actions`}
    //                 />
    //             </Paper>
    //         </ButtonGroup> */}
    //                         <Button style={{ border: 'none', background: "transparent" }}><i class="fa fa-filter" aria-hidden="true"></i></Button>

    //                     </div>

    //                     :
    //                     <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", backgroundColor: grey[300] }}>
    //                         <DatasetSelectForUser />
    //                         <CompanySelect />
    //                         <CategorySelect />
    //                         <ProductServiceSelect />
    //                         <PartnerSelect />
    //                         <YearIOSelect />
    //                         <EmpSelect />
    //                         <DigitalEngagementSelect />
    //                         <Text value={"Clear Filter"} onClick={() => {
    //                             dispatch({ type: "setSelectedDataset", dataset: "Indonesia" })
    //                             dispatch({ type: "setUserCompanyFilter", companies: [] })
    //                             dispatch({ type: "setUserCategoryFilter", category: [] })
    //                             dispatch({ type: "setUserDigitalEngagementFilter", filter: [] })
    //                             dispatch({ type: "setUserEmpSizeFilter", empSize: [] })
    //                             dispatch({ type: "setUserPartnerFilter", partner: [] })
    //                             dispatch({ type: "setUserSubPartnerFilter", partner: [] })
    //                             dispatch({ type: "setUserProductServiceFilter", filter: [] })
    //                             dispatch({ type: "setUserYearIOFilter", year: [] })
    //                             dispatch({ type: "setYearIORangeFilter", filter: [{ min: '', max: '', selectValue: "-" }] });
    //                             dispatch({ type: "setEmpSizeRangeFilter", filter: [{ min: '', max: '', selectValue: "-" }] });
    //                         }} />
    //                         {/* <div onClick={() => {
    //                             dispatch({ type: "setSelectedDataset", dataset: "Indonesia" })
    //                             dispatch({ type: "setUserCompanyFilter", companies: [] })
    //                             dispatch({ type: "setUserCategoryFilter", category: [] })
    //                             dispatch({ type: "setUserDigitalEngagementFilter", filter: [] })
    //                             dispatch({ type: "setUserEmpSizeFilter", empSize: [] })
    //                             dispatch({ type: "setUserPartnerFilter", partner: [] })
    //                             dispatch({ type: "setUserProductServiceFilter", filter: [] })
    //                             dispatch({ type: "setUserYearIOFilter", year: [] })
    //                         }} >
    //                             <Text value={`Clear`} />
    //                             <Text value={`Filter`} />
    //                         </div> */}
    //                         {/* <div className={classes.button} >
    //                             <Text value={"Employee Size"} />
    //                             <ArrowDropDownIcon />
    //                         </div> */}
    //                     </div>

    //             }
    //             < Divider />
    //             {
    //                 userData.role === "admin" ?
    //                     (<div className={classes.filterWrapper2}>
    //                         <CustomSelectWithCheckBox
    //                             options={totalCountries}
    //                             onSelectChange={onDatasetChange}
    //                         />
    //                         <FrimographicSelect
    //                             options={["Firmographics"]}
    //                         />
    //                         <DigitalPresenceSelect
    //                             options={["Digital Presence"]}
    //                         />
    //                         <TechnologySelect
    //                             options={"Advertising"}
    //                             label={"Advertising"}
    //                         />
    //                         <TechnologySelect
    //                             options={"Analytics"}
    //                             label={"Analytics and Tracking"}
    //                         />
    //                         <TechnologySelect
    //                             options={"Hosting"}
    //                             label={"Hosting"}
    //                         />
    //                         <TechnologySelect
    //                             options={"Productivity"}
    //                             label={"Productivity"}
    //                         />
    //                         <TechnologySelect
    //                             options={"E-Commerce"}
    //                             label={"Ecommerce"}
    //                         />
    //                         <TechnologySelect
    //                             options={"Widgets"}
    //                             label={"Widgets"}
    //                         />
    //                         <CustomSelect
    //                             options={["More Filters"]}
    //                         />
    //                     </div>)
    //                     : null
    //             }
    //             < Divider />
    //         </div>

    //     </div>
    // );
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
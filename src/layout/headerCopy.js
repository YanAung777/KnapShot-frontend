import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Paper, Divider, ButtonBase, Typography, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Visibility, FolderOpen, Public, Equalizer, BubbleChart, Print, Share, GetApp, ArrowRight, ArrowLeft } from '@material-ui/icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';

import SearchIcon from '@material-ui/icons/Search';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import Language from '@material-ui/icons/Language';

import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//components
import Menu from 'components/core/Menu';
import Text from 'components/core/Text'
import CustomIcon from 'components/core/CustomIcon';
import SearchBox from './components/SearchBox';
import CountrySelect from './components/CountrySelect';
import CustomSelect from 'components/core/CustomSelect';
import FavouriteListPopup from 'components/core/FavouriteListPopup';
import CompanyDetailPopUp from './components/CompanyDetailPopUp';
import Download from './components/Download';

//util
import { checkAuth, getSession } from 'util/check-auth';

//route
import { history } from 'router/history';

//context
import { useAppValue } from 'context/app';

import AnalyzeHeader from './AnalyzeHeader'
import UploadHeader from './UploadHeader'
import UserHeader from './UserHeader'

//api
import api from 'api'

//constants
import endpoints from 'constants/endpoints';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        position: 'relative',
    },
    appBar: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        borderBottom: '1px solid lightgray',
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 9999
    },
    appBarItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // paddingLeft: "1%"
    },
    logo: {
        width: 40,
        height: 40,
        margin: '0 20px',
        cursor: "pointer"
    },
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        marginLeft: '15px'
    },
    divider: {
        height: 28,
        margin: 4,
    },
    btn: {
        padding: 5,
        marginRight: 10
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
    downloadPaper: {
        padding: '10px'
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
    grid: {
        display: 'block'
    },
    uploadGridHeader: {
        padding: '10px',
        minWidth: '370px',
        display: 'flex',
        backgroundColor: '#4dabf5',
    },
    subGridItem: {
        width: '51px',
        marginTop: '10px',
        lineHeight: 'normal'
    },
    buttonBase: {
        height: 20,
        minWidth: 120,
        minHeight: 30,
        display: 'flex',
        fontSize: '13px',
        cursor: 'pointer',
        borderRadius: 20,
        backgroundColor: '#c7cfdc'
    },
    optionalDisplay: {
        width: '270px',
        paddingRight: '5px',
        paddingLeft: '5px'
    },
    display2: {
        // width: '555px',
        display: 'flex'
    },
    bgText: {
        display: 'flex',
        backgroundColor: 'lightgray',
        marginLeft: '5px',
        marginRight: '5px',
        paddingTop: '5px',
        paddingBottom: '5px',
        justifyContent: 'center',
        borderRadius: '4px'
    },
    gridItem: {
        display: 'flex',
        marginTop: '6px'
    },
    textbox: {
        '& .MuiOutlinedInput-input': {
            padding: '2px 10px',
            fontSize: '12px',
            height: '20px'
        },
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 250,
        },
    },
    btnRoot: {
        '& .MuiButton-contained': {
            width: '110px'
        },
        '& .MuiButton-label': {
            textTransform: 'capitalize'
        },
        marginTop: '185px',
        marginLeft: '25px'
    }
}));

export default function Header() {
    const classes = useStyles();

    const [state, dispatch] = useAppValue();

    const { filenames, totalCountries } = state;

    const [excelFileNames, setExcelFileNames] = useState([])

    const [filter, setFilter] = useState('');

    const [search, setSearch] = useState("");
    const [userData, setUserData] = useState({});
    const [onDatasetSearch, setOnDatasetSearch] = useState('Indonesia');
    const [filterOnOff, setFilterOnOff] = useState(false)

    const toggleFilter = () => {
        setFilterOnOff(!filterOnOff);
    }

    if (!checkAuth()) {
        history.push("/login");
    }

    const onDatasetSearchChange = (dataset) => {
        setOnDatasetSearch(dataset)
    }

    const onFileChange = (filename) => {
        dispatch({ type: "setSelectedFile", filename });
    }

    const setSearchValue = (val) => {
        setSearch(val)
    }

    const renderAnalyzeHeader = () => {
        // if (userData["plan_type"] === "ksUser") return null
        if (paths.includes('dashboard')) {
            return <UserHeader />
        }
        else if (paths.includes('manage')) return null
        else if (filterOnOff) return <AnalyzeHeader filter={filter} userData={userData} />
        else return null
    }

    useEffect(() => {
        async function getExcelFileNames() {
            const response = await api().get(endpoints.getExcelFileNames);
            if (response.status === 200) {
                setExcelFileNames(response.data.excelFiles)
            }
        }

        getExcelFileNames()
    }, [state.selectedExcelName]);

    useEffect(() => {
        async function getUserData() {
            setUserData(getSession("user"))
        }

        getUserData()
    }, []);

    useEffect(() => {
        function changePage() {
            if (filter === "Overview") {
                history.push("/overview")
                dispatch({
                    type: "setOverviewTab",
                    index: 0
                })
            }
            filter === "Company List" && history.push("/")
            filter === "Technology" && history.push("/technology")
            filter === "Digital Engagement" && history.push("/digitalEngagement")
        }
        changePage()
    }, [filter])

    let paths = window.location.pathname.split(/[/]/)

    const lists = userData.role==="qc checker" ? ["Unverified"] :["Company List", "Technology"]
    // const lists = ["Company List", "Overview", "Digital Engagement", "Technology"]
    const roleCheck = userData.role === "ksUser" ? ["DB"] : ["DB", "QC"]
    let menuItems = userData.role === "ksUser" ?
        [
            { name: "Password", link: "" },
            { name: "Score", link: "custom" }
        ] :
        [
            { name: "User", link: "/manage/user" },
            // { name: "Data Quality Check", link: "" },
            { name: "Subscription Plan", link: "" },
            { name: "Score", link: "custom" }
            // { name: "Personal Info", link: "" },
            // { name: "Password", link: "" },
            // { name: "Email & Notification", link: "" },
            // { name: "Billing Info", link: "" },
            // { name: "Account Security", link: "" },
            // { name: "Help & Support", link: "" },
        ]

    // if (userData.role === "ksUser") menuItems.splice(0, 3)
    const checkUserRole = (role) => {
        if (role === 'admin') {
            return (
                <>
                    <Text value="Filter" />
                    &nbsp; &nbsp;
                    {
                        !filterOnOff ?
                            <ButtonBase className={classes.btn} onClick={toggleFilter}><Text style={{ fontSize: 20 }} value={"+"} /></ButtonBase>
                            :
                            <ButtonBase className={classes.btn} onClick={toggleFilter}><Text style={{ fontSize: 28 }} value={"-"} /></ButtonBase>
                    }
                    <Upload />
                    <Download />
                    {/* <ButtonBase className={classes.btn}>Print</ButtonBase> */}
                    {/* <ButtonBase className={classes.btn}>Share</ButtonBase> */}
                    <FavouriteListPopup />
                </>
            )
        }
        else if (role === 'ksUser') {
            return (
                <>
                    <Text value="Filter" />
                    &nbsp; &nbsp;
                    {
                        !filterOnOff ?
                            <ButtonBase className={classes.btn} onClick={toggleFilter}><Text style={{ fontSize: 20 }} value={"+"} /></ButtonBase>
                            :
                            <ButtonBase className={classes.btn} onClick={toggleFilter}><Text style={{ fontSize: 28 }} value={"-"} /></ButtonBase>
                    }


                    <Download />
                    {/* <ButtonBase className={classes.btn}>Saved</ButtonBase> */}
                    <FavouriteListPopup />
                </>
            )
        }
        else if (role === 'qc checker') {
            return (
                <>
                    <Text value="Filter" />
                    &nbsp; &nbsp;
                    {
                        !filterOnOff ?
                            <ButtonBase className={classes.btn} onClick={toggleFilter}><Text style={{ fontSize: 20 }} value={"+"} /></ButtonBase>
                            :
                            <ButtonBase className={classes.btn} onClick={toggleFilter}><Text style={{ fontSize: 28 }} value={"-"} /></ButtonBase>
                    }
                    <FavouriteListPopup />
                </>
            )
        }
    }

    return (
        <div className={classes.root}>
            <CompanyDetailPopUp />
            {/* Appbar */}
            <div position="static" className={classes.appBar}>
                <div className={classes.appBarItem}>
                    <img onClick={() => window.location.replace("/")} src={require('assets/images/logo.jpg')} className={classes.logo} />
                    <Paper style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }} >
                        <Typography style={{ marginLeft: '15px', fontWeight: 700 }}>{`File`}</Typography>
                        <Divider className={classes.divider} style={{ marginLeft: '15px' }} orientation="vertical" />
                        <CustomSelect
                            label={"Viet/Thai/Indo Agency List"}
                            // label={"Master DB (Golden Source)"}
                            // icon={<CustomIcon style={{ padding: 0 }} icon={<FolderOpen />} />}
                            // bradius={0}
                            // db={`DB Files`}
                            // survey={`Survey Response Files`}
                            // qc={`QC Files(work in progress)`}
                            // icon={`File |`}
                            options={filenames}
                            // option2={excelFileNames}
                            onSelectChange={onFileChange}
                            dropdown={<ExpandMoreIcon />}
                            style={{ zIndex: 9999 }}
                        />
                    </Paper>
                    <Paper style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                        <CustomSelect
                            // onSelectChange={setFilter}
                            minWidth={320}
                            options={roleCheck}
                            style={{ width: '40px', zIndex: 9999 }}
                        // dropdown={<ExpandMoreIcon />}
                        // icon={<CustomIcon style={{ padding: 0 }} icon={<Visibility />} />}
                        />
                        <Divider className={classes.divider} style={{ marginLeft: '15px' }} orientation="vertical" />
                        <CustomSelect
                            onSelectChange={setFilter}
                            options={lists}
                            icon={`View By`}
                            // icon={<CustomIcon style={{ padding: 0 }} icon={<Visibility />} />}
                            style={{ zIndex: 9999 }}
                            dropdown={<ExpandMoreIcon />}
                        />
                    </Paper>
                    {/* {
                        userData.role === 'admin' ?
                            <Paper component="form" className={classes.wrapper} elevation={3}>
                                <SearchBox setSearchValue={setSearchValue} KSTdataSet={onDatasetSearch} />
                                <Divider className={classes.divider} orientation="vertical" />
                                <CustomIcon
                                    label="language"
                                    icon={<Language style={{ color: '#000' }} />}
                                />
                                <CountrySelect label="Country" options={state.datasets} onSelectChange={onDatasetSearchChange} />
                                <CustomIcon icon={<SearchIcon className={classes.searchIcon} />} label="search"
                                    onClick={() => { search && history.push(`/companySearch/${search}/${onDatasetSearch}`) }}
                                />
                            </Paper>
                            : null
                    } */}

                </div>
                <div className={classes.appBarItem}>
                    {/* <ButtonBase className={classes.btn}>Upload</ButtonBase> */}
                    {
                        checkUserRole(userData.role)
                    }


                    {/* <CustomIcon icon={<Person style={{ color: '#000' }} />} label="person" /> */}
                    <Menu menuItems={menuItems} />
                </div>
            </div>
            {/* Appbar */}
            {/* <CheckPath path={paths} /> */}
            {/* {paths.includes('respondents') ? <UploadHeader /> : paths.includes('dashboard') ? <UserHeader /> : paths.includes('manage') ? null : <AnalyzeHeader /> } */}
            {renderAnalyzeHeader()}
        </div>
    );
}

const CheckPath = ({ path }) => {
    if (path.includes('dashboard')) return (<UserHeader />)
    else if (path.includes('manage')) return (<AnalyzeHeader />)
    // else if (path.includes('respondents')) return (<UploadHeader />)

}

const Upload = ({ }) => {

    const classes = useStyles();

    const [state, dispatch] = useAppValue();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [type, setType] = useState('')
    const [selectedValue, setSelectedValue] = useState('')
    const [fileNamesArr, setFileNamesArr] = useState([])
    const [companyFile, setCompanyFile] = useState('')
    const [technoFile, setTechnoFile] = useState('')
    const [clientTechnoFile, setClientTechnoFile] = useState('')
    const [totalReadCount, setTotalReadCount] = useState('')
    const [chooseUpdate, setChooseUpdate] = useState('existing')
    const [fileNameToUpdate, setFileNameToUpdate] = useState('')
    const [selectOpen, setSelectOpen] = React.useState(false);
    const [dataCount, setDataCount] = useState([])
    const [technoCount, setTechnoCount] = useState([])
    const [technoData, setTechnoData] = useState()
    const [clientTechnoCount, setClientTechnoCount] = useState([])
    const [clientTechnoData, setClientTechnoData] = useState()
    const [fields, setFields] = useState([])
    const [technoFields, setTechnoFields] = useState([])
    const [data, setData] = useState([])
    const [client, setClient] = useState([])
    const [open, setOpen] = useState(null)


    // let open = Boolean(anchorEl);
    // const id = open ? 'simple-popover' : undefined;
    let id

    useEffect(() => {
        const fetchDbFileNames = async () => {
            // setBreakdown('Choose one')
            // setValue()
            // if (overlay && breakdown !== 'Choose one') {
            const response = await api().get(
                endpoints.getFileNamesFromDB
            );
            if (response.status === 200) {
                // setOverlay(response.data.data)
                setFileNamesArr(response.data.data)
            }
            // }
        }
        fetchDbFileNames()
    }, [])

    useEffect(() => {
        setOpen(Boolean(anchorEl))
        id = open ? 'simple-popover' : undefined;
    }, [anchorEl])

    const handleUpload = event => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }


    useEffect(() => {
        let entries
        if (dataCount) {
            entries = Object.entries(dataCount)
            let testArr = []
            for (const [field, count] of entries) {
                testArr.push(field, count)
            }
            setFields(testArr)
        }
    }, [dataCount])

    useEffect(() => {
        if (technoCount) {
            const entries = Object.entries(technoCount)
            let testArr = []
            for (const [field, count] of entries) {
                testArr.push(field, count)
            }
            setTechnoFields(testArr)
        }
    }, [technoCount])

    return (
        <>
            <ButtonBase className={classes.btn} onClick={handleUpload}>Upload</ButtonBase>
            <Popover
                id={id}
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Paper className={classes.downloadPaper} style={{ display: 'flex' }}>
                    <StepOne
                        type={type}
                        setType={setType}
                        companyFile={companyFile}
                        setCompanyFile={setCompanyFile}
                        technoFile={technoFile}
                        setTechnoFile={setTechnoFile}
                        totalReadCount={totalReadCount}
                        setTotalReadCount={setTotalReadCount}
                        setDataCount={setDataCount}
                        setData={setData}
                        // setClient={setClient}
                        setOpen={setOpen}
                        setFields={setFields}
                        setTechnoCount={setTechnoCount}
                        setTechnoData={setTechnoData}
                        setClientTechnoCount={setClientTechnoCount}
                        setClientTechnoData={setClientTechnoData}
                        clientTechnoFile={clientTechnoFile}
                        setClientTechnoFile={setClientTechnoFile}
                    />
                    {
                        (companyFile || technoFile || clientTechnoFile) &&
                        <div className={classes.display2}>
                            {/* {
                                (companyFile && type === 'company') &&
                                <CompanyTuple fields={fields} totalReadCount={totalReadCount} />
                            } */}
                              {
                                (companyFile && type === 'company') &&
                                <ValidateFields fields={fields} totalReadCount={totalReadCount} />
                            }
                            {
                                (technoFile || clientTechnoFile) &&
                                <TechnoTuple technoFields={technoFields} />
                            }
                            <StepTwo
                                selectedValue={selectedValue}
                                setSelectedValue={setSelectedValue}
                                fileNamesArr={fileNamesArr}
                                chooseUpdate={chooseUpdate}
                                setChooseUpdate={setChooseUpdate}
                                fileNameToUpdate={fileNameToUpdate}
                                setFileNameToUpdate={setFileNameToUpdate}
                                selectOpen={selectOpen}
                                setSelectOpen={setSelectOpen}
                                setCompanyFile={setCompanyFile}
                                setAnchorEl={setAnchorEl}
                                data={data}
                                // client={client}
                                technoData={technoData}
                                clientTechnoData={clientTechnoData}
                                companyFile={companyFile}
                                technoFile={technoFile}
                                setTechnoFile={setTechnoFile}
                                type={type}
                                clientTechnoFile={clientTechnoFile}
                                setClientTechnoFile={setClientTechnoFile}
                            />
                        </div>
                    }
                </Paper>
            </Popover>
        </>
    )
}

const StepOne = ({ setClientTechnoCount, setClientTechnoData, clientTechnoFile, setClientTechnoFile, setTechnoData, setTechnoCount, type, setOpen, setFields, setType, companyFile, setCompanyFile, technoFile, setTechnoFile, totalReadCount, setTotalReadCount, setDataCount, setData }) => {

    const classes = useStyles();

    const companyRef = useRef(null)
    const technoRef = useRef(null)
    const clientTechnoRef = useRef(null)
    const [textInfo, setTextInfo] = useState('Click Browse to upload:')

    useEffect(() => {
        if (type === 'client') setTextInfo('Upload Client Info:')
        else setTextInfo('Click Browse to upload:')
    }, [type])

    function getFileExtension(filename) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    }

    const handleRadioClick = (event) => {
        setType(event.target.value)
        setCompanyFile(null)
        setTotalReadCount(null)
        setDataCount(null)
        setData(null)
    }

    const onBrowseClick = (value) => {
        if (value === 'company') {
            companyRef.current.click()
            setFields([])
        }
        if (value === 'techno') {
            technoRef.current.click()
        }
        if (value === 'clientTechno') {
            clientTechnoRef.current.click()
        }
    }

    const onClientTechnoUpload = async (event) => {
        const data = new FormData()
        data.append('file', event.target.files[0])
        data.append('name', event.target.files[0].name)
        const ext = getFileExtension(event.target.files[0].name)
        if (ext === 'xlsx') {
            const response = await api().post(endpoints.uploadClientTechnoExcel, data);
            if (response.status === 200) {
                setClientTechnoFile(response.data.filename)
                // setClientTechnoCount(response.data.technoCount)
                setClientTechnoData(response.data.obj)
                // setTechnoFile(response.data.filename)
                setTechnoCount(response.data.technoCount)
                setTechnoData(response.data.obj)
                setOpen(false)
            }
        }
        else if (ext === 'csv') {
            const response = await api().post(endpoints.uploadClientTechno, data);
            if (response.status === 200) {
                setClientTechnoFile(response.data.filename)
                // setClientTechnoCount(response.data.technoCount)
                setClientTechnoData(response.data.obj)
                // setTechnoFile(response.data.filename)
                setTechnoCount(response.data.technoCount)
                setTechnoData(response.data.obj)
                setOpen(false)
            }
        }
        else {

        }
        setOpen(true)
    }

    const onCompanyUpload = async (event) => {
        const data = new FormData()
        data.append('file', event.target.files[0])
        data.append('name', event.target.files[0].name)
        const ext = getFileExtension(event.target.files[0].name)
        if (type === 'company') {
            if (ext === 'xlsx') {
                const response = await api().post(endpoints.uploadCompanyExcel, data);
                if (response.status === 200) {
                    setCompanyFile(response.data.filename)
                    setTotalReadCount(response.data.fields)
                    setDataCount(response.data.dataCount)
                    setData(response.data.data)
                    setOpen(false)
                }
            }
            if (ext === 'csv') {
                const response = await api().post(endpoints.uploadCompanies, data);
                if (response.status === 200) {
                    setCompanyFile(response.data.filename)
                    setTotalReadCount(response.data.fields)
                    setDataCount(response.data.dataCount)
                    setData(response.data.data)
                    setOpen(false)
                }
            }
        }
        if (type === 'expertise' || type === 'keyword') {
            if (ext === 'csv') {
                const response = await api().post(endpoints.uploadExpertise, data);
                if (response.status === 200) {
                    setCompanyFile(response.data.filename)
                    setOpen(false)
                    setData(response.data.expertise)
                    // setClient(response.data.client)
                }
            }
            if (ext === 'xlsx') {
                const response = await api().post(endpoints.uploadExpertiseExcel, data);
                if (response.status === 200) {
                    setCompanyFile(response.data.filename)
                    setOpen(false)
                    setData(response.data.expertise)
                    // setClient(response.data.client)
                }
            }
        }
        if (type === 'directory') {
            const response = await api().post(endpoints.uploadDirectory, data);
            if (response.status === 200) {
                setCompanyFile(response.data.filename)
                setData(response.data.data)
                setOpen(false)
            }
        }
        if (type === 'personnel') {
            const response = await api().post(endpoints.uploadPersonnel, data);
            if (response.status === 200) {
                setCompanyFile(response.data.filename)
                setData(response.data.data)
                setOpen(false)
            }
        }
        if (type === 'client') {
            const response = await api().post(endpoints.uploadClient, data);
            if (response.status === 200) {
                setCompanyFile(response.data.filename)
                setData(response.data.data)
                setOpen(false)
            }
        }
        if (type === '') {
            if (ext === 'xlsx') {

            }
        }
        // setCompanyData(data)
        setOpen(true)
    }

    const onTechnoUpload = async (event) => {

        const data = new FormData()
        data.append('file', event.target.files[0])
        data.append('name', event.target.files[0].name)
        // setTechnoFile(event.target.files[0].name)
        // setTechnoData(data)
        const ext = getFileExtension(event.target.files[0].name)
        if (ext === 'xlsx') {
            const response = await api().post(endpoints.uploadTechnoExcel, data);
            if (response.status === 200) {
                setTechnoFile(response.data.filename)
                setTechnoCount(response.data.technoCount)
                setTechnoData(response.data.obj)
                setOpen(false)
            }
        }
        else if (ext === 'csv') {
            const response = await api().post(endpoints.uploadTechno, data);
            if (response.status === 200) {
                setTechnoFile(response.data.filename)
                setTechnoCount(response.data.technoCount)
                setTechnoData(response.data.obj)
                setOpen(false)
            }
        }
        else {
            setTechnoFile()
            setTechnoCount()
        }
        setOpen(true)
    }

    let radioData = [
        { name: "company", value: "Company" },
        { name: "directory", value: "Directory" },
        { name: "keyword", value: "Keyword" },
        { name: "client", value: "Client Company & Technology" },
        { name: "expertise", value: "Partner/ Expertise/ Awards" },
        { name: "personnel", value: "Personnel" },
    ]

    return (
        <Grid container className={classes.grid}>
            <div className={classes.uploadGridHeader}>
                <Text value={`Step 1: Upload File Type`} style={{ fontSize: '12px', color: '#ffffff' }} />
            </div>
            <hr />
            <div style={{ display: 'flex' }}>
                <PriorityHighIcon style={{ paddingTop: '5px' }} />
                <Text value={`You can upload 1 company file and Technology file at the same time:`} style={{ fontSize: '12px', paddingTop: '5px', paddingBottom: '5px' }} />
            </div>
            <hr />
            <div style={{ display: 'flex', backgroundColor: 'lightgray', width: '245px', padding: '7px' }}>
                <Text value={`Upload`} style={{ fontSize: '12px' }} />&nbsp;
                            <Text value={` Companies`} style={{ fontWeight: 700, fontSize: '12px' }} />
                <Text value={`: Select one file type`} style={{ fontSize: '12px' }} />
            </div>
            <Grid container>
                {
                    radioData.map(x => (
                        <Grid item md={4} className={classes.subGridItem} style={{ display: 'flex' }}>
                            <Radio
                                checked={type === x.name}
                                onChange={handleRadioClick}
                                value={x.name}
                                name="plan"
                                style={{ color: '#3c8dbc', marginTop: '-9px' }}
                            />
                            <Typography noWrap={false}>{x.value}</Typography>
                        </Grid>
                    ))
                }
                <Grid item md={4} className={classes.subGridItem} style={{ marginTop: '20px' }}>
                    <Typography noWrap={false} style={{ textAlign: 'right', paddingRight: '15px', lineHeight: 'normal', fontWeight: 600 }}>{textInfo}</Typography>
                </Grid>
                <Grid item md={4} className={classes.subGridItem} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '20px', flexWrap: 'wrap' }}>
                    <input id="myInput" type="file" ref={companyRef} style={{ display: 'none' }} onChange={onCompanyUpload} />
                    <ButtonBase className={classes.buttonBase} onClick={() => onBrowseClick('company')} >
                        <Text value='Browse' style={{ fontSize: '12px', lineHeight: '0px' }} />
                    </ButtonBase>
                </Grid>
                <Grid item md={4} className={classes.subGridItem} style={{ marginTop: '20px' }}>
                    <Typography noWrap={false} style={{ textAlign: 'center' }}>Excel | .csv</Typography>
                </Grid>
                {
                    companyFile ?
                        <>
                            <Grid item md={4} className={classes.subGridItem}>
                                <Typography noWrap={false} style={{ textAlign: 'right', paddingRight: '15px', lineHeight: 'normal', fontWeight: 600, marginTop: '3px' }}>Selected file:</Typography>
                            </Grid>
                            <Grid item md={8} className={classes.subGridItem}>
                                <Typography noWrap={false} style={{ textAlign: 'left', paddingRight: '15px', lineHeight: 'normal', marginTop: '3px', color: '#3c8dbc' }}>{companyFile}</Typography>
                            </Grid>
                        </>
                        : null
                }

            </Grid>
            {
                type === 'client' ?
                    <Grid container>
                        <Grid item md={4} className={classes.subGridItem} style={{ marginTop: '20px' }}>
                            <Typography noWrap={false} style={{ textAlign: 'right', paddingRight: '15px', lineHeight: 'normal', fontWeight: 600 }}>Upload Client Techno:</Typography>
                        </Grid>
                        <Grid item md={4} className={classes.subGridItem} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '20px', flexWrap: 'wrap' }}>
                            <input id="myInput" type="file" ref={clientTechnoRef} style={{ display: 'none' }} onChange={onClientTechnoUpload} />
                            <ButtonBase className={classes.buttonBase} onClick={() => onBrowseClick('clientTechno')} >
                                <Text value='Browse' style={{ fontSize: '12px', lineHeight: '0px' }} />
                            </ButtonBase>
                        </Grid>
                        <Grid item md={4} className={classes.subGridItem} style={{ marginTop: '20px' }}>
                            <Typography noWrap={false} style={{ textAlign: 'center' }}>Excel | .csv</Typography>
                        </Grid>
                        {
                            clientTechnoFile ?
                                <>
                                    <Grid item md={4} className={classes.subGridItem}>
                                        <Typography noWrap={false} style={{ textAlign: 'right', paddingRight: '15px', lineHeight: 'normal', fontWeight: 600, marginTop: '3px' }}>Selected file:</Typography>
                                    </Grid>
                                    <Grid item md={8} className={classes.subGridItem}>
                                        <Typography noWrap={false} style={{ textAlign: 'left', paddingRight: '15px', lineHeight: 'normal', marginTop: '3px', color: '#3c8dbc' }}>{clientTechnoFile}</Typography>
                                    </Grid>
                                </>
                                : null
                        }
                    </Grid>
                    : null
            }
            <hr style={{ marginTop: '15px' }} />
            <Grid container>
                <Grid item md={4} className={classes.subGridItem}>
                    <div style={{ display: 'flex', paddingRight: '15px', justifyContent: 'flex-end' }}>
                        <Typography noWrap={false} style={{ lineHeight: 'normal' }}>Upload</Typography>&nbsp;
                                    <Typography noWrap={false} style={{ lineHeight: 'normal', fontWeight: 600 }}>Technology:</Typography>
                    </div>
                </Grid>
                <Grid item md={4} className={classes.subGridItem} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap' }}>
                    <input id="myInput" type="file" ref={technoRef} style={{ display: 'none' }} onChange={onTechnoUpload} />
                    <ButtonBase className={classes.buttonBase} onClick={() => type === 'client' ? null : onBrowseClick('techno')} >
                        <Text value='Browse' style={{ fontSize: '12px', lineHeight: '0px' }} />
                    </ButtonBase>
                </Grid>
                <Grid item md={4} className={classes.subGridItem}>
                    <Typography noWrap={false} style={{ textAlign: 'center' }}>Excel | .csv</Typography>
                </Grid>
                {
                    technoFile ?
                        <>
                            <Grid item md={4} className={classes.subGridItem}>
                                <Typography noWrap={false} style={{ textAlign: 'right', paddingRight: '15px', lineHeight: 'normal', fontWeight: 600, marginTop: '3px' }}>Selected file:</Typography>
                            </Grid>
                            <Grid item md={8} className={classes.subGridItem}>
                                <Typography noWrap={false} style={{ textAlign: 'left', paddingRight: '15px', lineHeight: 'normal', marginTop: '3px', color: '#3c8dbc' }}>{technoFile}</Typography>
                            </Grid>
                        </>
                        : null
                }
            </Grid>
        </Grid>
    )
}

const TechnoTuple = ({ technoFields }) => {

    const classes = useStyles();

    return (
        <div className={classes.optionalDisplay} style={{ marginRight: '5px' }}>
            <div className={classes.uploadGridHeader} style={{ minWidth: '260px' }}>
                <Text value={`Technology Tuple - Available and Missing Fields`} style={{ fontSize: '12px', color: '#ffffff' }} />
            </div>
            <hr />
            <Grid container>
                <Grid item md={8}>
                    <div className={classes.bgText}>
                        <Text value={`Type`} style={{ fontSize: '12px' }} />
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div className={classes.bgText}>
                        <Text value={`Count`} style={{ fontSize: '12px' }} />
                    </div>
                </Grid>
            </Grid>
            <hr />
            <Grid container style={{ height: '400px', overflowY: 'scroll' }}>
                {
                    technoFields.map((x, i) => {
                        let array = ['Advertising', 'Analytics and Tracking', 'Ecommerce', 'Widgets', 'Hosting', 'Productivity']
                        // if(array.includes(x)) continue  
                        return (
                            <>
                                <Grid item md={i % 2 == 0 ? 8 : 4}>
                                    {
                                        array.includes(x) ?
                                            <Text value={x} style={{ fontWeight: 700, fontSize: '12px', paddingLeft: '8px', textAlign: i % 2 == 0 ? 'left' : 'center', marginTop: '3px', marginBottom: '3px' }} />
                                            :
                                            <Text value={x} style={{ fontSize: '12px', paddingLeft: '8px', textAlign: i % 2 == 0 ? 'left' : 'center' }} />
                                    }
                                </Grid>
                            </>
                        )
                    })
                }
            </Grid>
        </div>
    )
}

const CompanyTuple = ({ fields, totalReadCount }) => {

    const classes = useStyles();

    return (
        <div className={classes.optionalDisplay} >
            <div className={classes.uploadGridHeader} style={{ minWidth: '255px' }}>
                <Text value={`Company Tuple - Available and Missing Fields`} style={{ fontSize: '12px', color: '#ffffff' }} />
            </div>
            <hr />
            <Grid container>
                <Grid item md={8}>
                    <div className={classes.bgText}>
                        <Text value={`${totalReadCount} Fields`} style={{ fontSize: '12px' }} />
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div className={classes.bgText}>
                        <Text value={`Count`} style={{ fontSize: '12px' }} />
                    </div>
                </Grid>
            </Grid>
            <hr />
            <Grid container style={{ height: '400px', overflowY: 'scroll' }}>
                {
                    fields.map((x, i) => (
                        <>
                            <Grid item md={i % 2 == 0 ? 8 : 4}>
                                <Text value={x} style={{ fontSize: '12px', paddingLeft: '8px', textAlign: i % 2 == 0 ? 'left' : 'center' }} />
                            </Grid>
                        </>
                    ))
                }
            </Grid>
        </div>
    )
}
const ValidateFields = ({ fields, totalReadCount }) => {

    const classes = useStyles();

    return (
        <div className={classes.optionalDisplay} >
            <div className={classes.uploadGridHeader} style={{ minWidth: '255px' }}>
                <Text value={`Validate Fields`} style={{ fontSize: '12px', color: '#ffffff' }} />
            </div>
            <hr />
            <Grid container>
                <Grid item md={8}>
                    <div className={classes.bgText}>
                        <Text value={'Contact and Social Link Info'} style={{ fontSize: '12px' }} />
                    </div>
                </Grid>
            </Grid>
            <hr />
            <Grid container style={{ height: '400px', overflowY: 'scroll' }}>
                {
                    fields.map((x, i) => (
                        <>
                            <Grid item md={i % 2 == 0 ? 8 : 4}>
                                <Text value={x} style={{ fontSize: '12px', paddingLeft: '8px', textAlign: i % 2 == 0 ? 'left' : 'center' }} />
                            </Grid>
                        </>
                    ))
                }
            </Grid>
        </div>
    )
}

const StepTwo = ({ clientTechnoData, clientTechnoFile, setClientTechnoFile, type, companyFile, technoFile, setTechnoFile, technoData, selectedValue, setSelectedValue, fileNamesArr, chooseUpdate, setChooseUpdate, fileNameToUpdate, setFileNameToUpdate, selectOpen, setSelectOpen, setCompanyFile, setAnchorEl, data }) => {

    const classes = useStyles();

    const [loading, setLoading] = useState(false)

    const [qc, setQc] = useState('')
    const [chooseDB, setChooseDB] = useState('')

    const handleSelectClose = () => {
        setSelectOpen(false);
    };

    const handleSelectOpen = () => {
        setSelectOpen(true);
    };

    const handleQcRadio = (event) => {
        setQc(event.target.value)
    }

    const handleUploadRadio = (event) => {
        setChooseDB(event.target.value)
    }

    const onCancel = () => {
        setCompanyFile('')
        setTechnoFile('')
        setClientTechnoFile('')
        setAnchorEl(null);
    }

    const onProceed = async () => {
        setLoading(true)

        async function technoUpload() {
            const respon = await api().post(endpoints.importTechnology, { technoData: technoData });
            if (respon.status === 200) {
                const resp = await api().get(endpoints.updateScore)
                if (resp.status === 200) {
                    setLoading(false)
                    window.location.reload();
                }
            }
        }

        async function companyUpload() {
            const response = await api().post(endpoints.importUploadedCompanyExcel,
                {
                    data,
                    fileNameToUpdate,
                    qc,
                    chooseDB
                }
            );
            if (response.status === 200) {
                const res = await api().get(endpoints.updateScore)
                if (res.status === 200) {
                    const response = await api().get(endpoints.updateScore)
                    if (res.status === 200) {
                        setLoading(false)
                        window.location.reload();
                    }
                }
            }
        }

        if (type === 'company') {
            if (technoFile) {
                if (companyFile) {
                    const response = await api().post(endpoints.importUploadedCompanyExcel,
                        {
                            data,
                            fileNameToUpdate,
                            qc,
                            chooseDB
                        }
                    );
                    if (response.status === 200) {
                        const resp = await api().get(endpoints.updateScore)
                        if (resp.status === 200) {
                            technoUpload()
                        }
                    }
                } else {
                    technoUpload()
                }
            } else {
                companyUpload()
            }
        } else if (type === 'expertise' || type === 'keyword') {
            const response = await api().post(endpoints.importExpertise, {
                expertiseArr: data,
                // ClientArr: client
            })
            if (response.status === 200)
                if (technoFile) {
                    technoUpload()
                } else {
                    setLoading(false)
                    window.location.reload();
                }
        }
        else if (type === 'directory') {
            const response = await api().post(endpoints.importDirectory, {
                dirObj: data
            })
            if (response.status === 200)
                if (technoFile) {
                    technoUpload()
                } else {
                    setLoading(false)
                    window.location.reload();
                }
        }
        else if (type === 'personnel') {
            const response = await api().post(endpoints.importPersonnel, {
                pdata: data
            })
            if (response.status === 200)
                if (technoFile) {
                    technoUpload()
                } else {
                    setLoading(false)
                    window.location.reload();
                }
        }
        else if (type === 'client') {
            if (companyFile) {
                const response = await api().post(endpoints.importClient, {
                    clientObj: data
                })
                if (response.status === 200)
                    if (clientTechnoFile) {
                        const respon = await api().post(endpoints.importClientTechno, { clientTechnoData: clientTechnoData })
                        if (respon.status === 200) {
                            setLoading(false)
                            window.location.reload();
                        }
                    }
                    else {
                        setLoading(false)
                        window.location.reload();
                    }
            }
            else {
                if (clientTechnoFile) {
                    const reponse = await api().post(endpoints.importClientTechno, { clientTechnoData: clientTechnoData })
                    if (reponse.status === 200) {
                        setLoading(false)
                        window.location.reload();
                    }
                }
            }
        }
        else {
            if (technoFile) {
                technoUpload()
            }
        }

    }

    let chooseRadio = [
        { name: "Choose Existing", value: "existing" },
        { name: "Create New", value: "new" },
    ]

    let qcRadio = [
        { name: "Yes", value: "yes" },
        { name: "No", value: "no" },
    ]

    let uploadRadio = [
        { name: "Production", value: "production" },
        { name: "Staging", value: "staging" },
    ]

    const handleChooseRadioClick = (event) => {
        setChooseUpdate(event.target.value)
    }

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value)
        setFileNameToUpdate(event.target.value)
    }

    return (
        <div className={classes.optionalDisplay}>
            <div className={classes.uploadGridHeader} style={{ minWidth: '255px' }}>
                <Text value={`Step 2 - Save File`} style={{ fontSize: '12px', color: '#ffffff' }} />
            </div>
            <hr />
            {
                type === 'company' ?
                    <>
                        <Grid container>
                            {
                                chooseRadio.map(y => (
                                    <Grid item md={6} className={classes.gridItem} style={{ flexDirection: 'inherit' }}>
                                        <Radio
                                            checked={chooseUpdate === y.value}
                                            onChange={handleChooseRadioClick}
                                            value={y.value}
                                            name="plan"
                                            style={{ color: '#3c8dbc', marginTop: '-9px' }}
                                        />
                                        <Text value={y.name} style={{ fontSize: '12px' }} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                        <hr style={{ marginTop: '3px' }} />
                        <Grid container>
                            <Grid item md={12} className={classes.gridItem} style={{ marginTop: 0, height: '5px' }}>
                                {
                                    chooseUpdate === 'new' ?
                                        <form className={classes.textbox} noValidate autoComplete="off" >
                                            <TextField
                                                id="outlined-size-small"
                                                variant="outlined"
                                                size="small"
                                                onChange={handleSelectChange}
                                            />
                                        </form>
                                        :
                                        <FormControl className={classes.formControl}>
                                            <Select
                                                labelId="demo-controlled-open-select-label"
                                                id="demo-controlled-open-select"
                                                open={selectOpen}
                                                onClose={handleSelectClose}
                                                onOpen={handleSelectOpen}
                                                value={selectedValue}
                                                onChange={handleSelectChange}
                                                variant="outlined"
                                                displayEmpty
                                            >
                                                <MenuItem value="" style={{ fontSize: 12 }} disabled>Select One</MenuItem>
                                                {
                                                    fileNamesArr.map(x =>
                                                        <MenuItem value={x} style={{ fontSize: 12 }}>{x}</MenuItem>
                                                    )
                                                }
                                            </Select>
                                        </FormControl>
                                }
                            </Grid>
                            <Grid item md={12} className={classes.gridItem} style={{ marginTop: '35px', height: '5px', paddingLeft: '5px' }}>
                                <Text value={`Manual QC done for company file`} style={{ fontSize: '12px', paddingTop: '5px', paddingBottom: '5px' }} />
                            </Grid>
                            {
                                qcRadio.map(y => (
                                    <Grid item md={6} className={classes.gridItem} style={{ flexDirection: 'inherit', marginTop: '25px' }}>
                                        <Radio
                                            checked={qc === y.value}
                                            onChange={handleQcRadio}
                                            value={y.value}
                                            name="plan"
                                            style={{ color: '#3c8dbc', marginTop: '-9px' }}
                                        />
                                        <Text value={y.name} style={{ fontSize: '12px' }} />
                                    </Grid>
                                ))
                            }
                            {
                                qc &&
                                <>
                                    <Grid item md={12} className={classes.gridItem} style={{ marginTop: '5px', height: '5px', paddingLeft: '5px' }}>
                                        <Text value={`Do you want to upload into production / staging DB`} style={{ fontSize: '12px', paddingTop: '5px', paddingBottom: '5px' }} />
                                    </Grid>
                                    {
                                        uploadRadio.map(y => (
                                            <Grid item md={6} className={classes.gridItem} style={{ flexDirection: 'inherit', marginTop: '40px' }}>
                                                <Radio
                                                    checked={chooseDB === y.value}
                                                    onChange={handleUploadRadio}
                                                    value={y.value}
                                                    name="plan"
                                                    style={{ color: '#3c8dbc', marginTop: '-9px' }}
                                                />
                                                <Text value={y.name} style={{ fontSize: '12px' }} />
                                            </Grid>
                                        ))
                                    }
                                </>
                            }
                            {
                                chooseDB &&
                                <Grid container className={classes.btnRoot} >
                                    <Grid item md={6}>
                                        <Button variant="contained" style={{ backgroundColor: '#9e9e9e' }} onClick={onCancel}>
                                            <Text value={`Cancel`} style={{ fontSize: '12px', color: 'white' }} />
                                        </Button>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Button variant="contained" style={{ backgroundColor: '#1e88e5' }} onClick={onProceed}>
                                            <Text value={`Proceed`} style={{ fontSize: '12px', color: 'white' }} />
                                            {loading && <i style={{ color: 'white', marginLeft: '5px' }} class="fas fa-spinner fa-pulse"></i>}
                                        </Button>
                                    </Grid>
                                </Grid>
                            }
                        </Grid>
                    </>
                    :
                    <Grid container className={classes.btnRoot} style={{ marginTop: '410px' }}>
                        <Grid item md={6}>
                            <Button variant="contained" style={{ backgroundColor: '#9e9e9e' }} onClick={onCancel}>
                                <Text value={`Cancel`} style={{ fontSize: '12px', color: 'white' }} />
                            </Button>
                        </Grid>
                        <Grid item md={6}>
                            <Button variant="contained" style={{ backgroundColor: '#1e88e5' }} onClick={onProceed}>
                                <Text value={`Proceed`} style={{ fontSize: '12px', color: 'white' }} />
                                {loading && <i style={{ color: 'white', marginLeft: '5px' }} class="fas fa-spinner fa-pulse"></i>}
                            </Button>
                        </Grid>
                    </Grid>
            }

        </div>
    )
}
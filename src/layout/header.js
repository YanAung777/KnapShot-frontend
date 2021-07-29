import React, { useState, useEffect, useRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Paper,
  Divider,
  ButtonBase,
  Typography,
  Grid,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {
  Visibility,
  FolderOpen,
  Public,
  Equalizer,
  BubbleChart,
  Print,
  Share,
  GetApp,
  ArrowRight,
  ArrowLeft,
  ArrowBackIos,
} from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";

import SearchIcon from "@material-ui/icons/Search";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import Language from "@material-ui/icons/Language";

import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

//components
import Menu from "components/core/Menu";
import Text from "components/core/Text";
import CustomIcon from "components/core/CustomIcon";
import SearchBox from "./components/SearchBox";
import CountrySelect from "./components/CountrySelect";
import CustomSelect from "components/core/CustomSelect";
import FavouriteListPopup from "components/core/FavouriteListPopup";
import CompanyDetailPopUp from "./components/CompanyDetailPopUp";
import Download from "./components/Download";
import UnAssignCustomSelect from "./components/UnAssignSelect";
import AssignedCustomSelect from "./components/AssignedSelect";
import CverViewOfFieldsSelected from "./components/CverViewOfFieldsSelected";
import { grey } from "@material-ui/core/colors";
//util
import { checkAuth, getSession } from "util/check-auth";

//route
import { history } from "router/history";

//context
import { useAppValue } from "context/app";
import { realDataObj } from "./test";
import AnalyzeHeader from "./AnalyzeHeader";
import UploadHeader from "./UploadHeader";
import UserHeader from "./UserHeader";

//api
import api from "api";

//constants
import endpoints from "constants/endpoints";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import TrackInvertedSlider from "./components/Slider";
const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    // position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 12,
    height: 18,
    padding: "10px 26px 10px 12px",
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    // fontFamily: [
    //     '-apple-system',
    //     'BlinkMacSystemFont',
    //     '"Segoe UI"',
    //     'Roboto',
    //     '"Helvetica Neue"',
    //     'Arial',
    //     'sans-serif',
    //     '"Apple Color Emoji"',
    //     '"Segoe UI Emoji"',
    //     '"Segoe UI Symbol"',
    // ].join(','),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
  },
  popover: {
    width: "100%",
  },
  appBar: {
    backgroundColor: "transparent",
    boxShadow: "none",
    borderBottom: "1px solid lightgray",
    padding: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 9999,
  },
  appBarItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    // paddingLeft: "1%"
  },
  logo: {
    width: 40,
    height: 40,
    margin: "0 20px",
    cursor: "pointer",
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    marginLeft: "15px",
  },
  divider: {
    height: 28,
    margin: 4,
  },
  btn: {
    padding: 5,
    marginRight: 10,
  },
  searchIcon: {
    backgroundColor: "#555",
    width: "30px",
    height: "30px",
    borderRadius: 5,
    color: "white",
  },
  filterWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 5px",
  },
  filterWrapper2: {
    display: "flex",
    alignItems: "center",
    padding: "10px 5px",
  },
  filterItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    overflowY: "hidden",
    marginTop: "-35px",
    marginLeft: "-17px",
    maxWidth: "max-content",
    maxHeight: "max-content",
  },
  paper2: {
    textAlign: "center",
    marginTop: "-45px",
    color: theme.palette.text.secondary,
    overflowY: "hidden",
    marginLeft: "660px",
    width: "50%",
    maxWidth: "max-content",
    maxHeight: "max-content",
  },
  btnGroup: {
    backgroundColor: "transparent",
    border: "none",
  },
  downloadPaper: {
    padding: "10px",
  },
  formControl: {
    "& .MuiInputBase-formControl": {
      width: "250px",
      height: "25px",
      fontSize: "12px",
    },
    margin: theme.spacing(1),
    minWidth: 120,
    fontSize: "12px",
  },
  grid: {
    display: "block",
  },
  uploadGridHeader: {
    padding: "10px",
    minWidth: "370px",
    display: "flex",
    backgroundColor: "#4dabf5",
  },
  subGridItem: {
    width: "51px",
    marginTop: "10px",
    lineHeight: "normal",
  },
  buttonBase: {
    height: 20,
    minWidth: 120,
    minHeight: 30,
    display: "flex",
    fontSize: "13px",
    cursor: "pointer",
    borderRadius: 20,
    backgroundColor: "#c7cfdc",
  },
  optionalDisplay: {
    // width: '270px',
    paddingRight: "5px",
    paddingLeft: "5px",
  },
  display2: {
    // width: '555px',
    display: "flex",
  },
  bgText: {
    display: "flex",
    backgroundColor: "lightgray",
    marginLeft: "5px",
    marginRight: "5px",
    paddingTop: "5px",
    paddingBottom: "5px",
    justifyContent: "center",
    borderRadius: "4px",
  },
  gridItem: {
    display: "flex",
    marginTop: "6px",
  },
  textbox: {
    "& .MuiOutlinedInput-input": {
      padding: "2px 10px",
      fontSize: "12px",
      height: "20px",
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 250,
    },
  },
  btnRoot: {
    "& .MuiButton-contained": {
      width: "110px",
    },
    "& .MuiButton-label": {
      textTransform: "capitalize",
    },
    // marginTop: '185px',
    // marginLeft: '25px'
  },
}));

export default function Header() {
  const classes = useStyles();

  const [state, dispatch] = useAppValue();

  const { filenames, totalCountries } = state;

  const [excelFileNames, setExcelFileNames] = useState([]);

  const [filter, setFilter] = useState("");

  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState({});
  const [onDatasetSearch, setOnDatasetSearch] = useState("Indonesia");
  const [filterOnOff, setFilterOnOff] = useState(false);

  const toggleFilter = () => {
    setFilterOnOff(!filterOnOff);
  };

  if (!checkAuth()) {
    history.push("/login");
  }

  const onDatasetSearchChange = (dataset) => {
    setOnDatasetSearch(dataset);
  };

  const onFileChange = (filename) => {
    dispatch({ type: "setSelectedFile", filename });
  };

  const setSearchValue = (val) => {
    setSearch(val);
  };

  const renderAnalyzeHeader = () => {
    // if (userData["plan_type"] === "ksUser") return null
    if (paths.includes("dashboard")) {
      return <UserHeader />;
    } else if (paths.includes("manage")) return null;
    else if (filterOnOff)
      return <AnalyzeHeader filter={filter} userData={userData} />;
    else return null;
  };

  useEffect(() => {
    async function getExcelFileNames() {
      const response = await api().get(endpoints.getExcelFileNames);
      if (response.status === 200) {
        setExcelFileNames(response.data.excelFiles);
      }
    }

    getExcelFileNames();
  }, [state.selectedExcelName]);

  useEffect(() => {
    async function getUserData() {
      setUserData(getSession("user"));
    }

    getUserData();
  }, []);

  useEffect(() => {
    function changePage() {
      if (filter === "Overview") {
        history.push("/overview");
        dispatch({
          type: "setOverviewTab",
          index: 0,
        });
      }
      filter === "Company List" && history.push("/");
      filter === "Technology" && history.push("/technology");
      filter === "Digital Engagement" && history.push("/digitalEngagement");
    }
    changePage();
  }, [filter]);

  let paths = window.location.pathname.split(/[/]/);

  const lists =
    userData.role === "qc checker"
      ? ["Unverified"]
      : ["Company List", "Technology"];
  // const lists = ["Company List", "Overview", "Digital Engagement", "Technology"]
  const roleCheck = userData.role === "ksUser" ? ["DB"] : ["DB", "QC"];
  let menuItems =
    userData.role === "ksUser"
      ? [
          { name: "Password", link: "" },
          { name: "Score", link: "custom" },
        ]
      : [
          { name: "User", link: "/manage/user" },
          // { name: "Data Quality Check", link: "" },
          { name: "Subscription Plan", link: "" },
          { name: "Score", link: "custom" },
          // { name: "Personal Info", link: "" },
          // { name: "Password", link: "" },
          // { name: "Email & Notification", link: "" },
          // { name: "Billing Info", link: "" },
          // { name: "Account Security", link: "" },
          // { name: "Help & Support", link: "" },
        ];

  // if (userData.role === "ksUser") menuItems.splice(0, 3)
  const checkUserRole = (role) => {
    if (role === "admin") {
      return (
        <>
          <Text value="Filter" />
          &nbsp; &nbsp;
          {!filterOnOff ? (
            <ButtonBase className={classes.btn} onClick={toggleFilter}>
              <Text style={{ fontSize: 20 }} value={"+"} />
            </ButtonBase>
          ) : (
            <ButtonBase className={classes.btn} onClick={toggleFilter}>
              <Text style={{ fontSize: 28 }} value={"-"} />
            </ButtonBase>
          )}
          <Upload />
          <Download />
          {/* <ButtonBase className={classes.btn}>Print</ButtonBase> */}
          {/* <ButtonBase className={classes.btn}>Share</ButtonBase> */}
          <FavouriteListPopup />
        </>
      );
    } else if (role === "ksUser") {
      return (
        <>
          <Text value="Filter" />
          &nbsp; &nbsp;
          {!filterOnOff ? (
            <ButtonBase className={classes.btn} onClick={toggleFilter}>
              <Text style={{ fontSize: 20 }} value={"+"} />
            </ButtonBase>
          ) : (
            <ButtonBase className={classes.btn} onClick={toggleFilter}>
              <Text style={{ fontSize: 28 }} value={"-"} />
            </ButtonBase>
          )}
          <Download />
          {/* <ButtonBase className={classes.btn}>Saved</ButtonBase> */}
          <FavouriteListPopup />
        </>
      );
    } else if (role === "qc checker") {
      return (
        <>
          <Text value="Filter" />
          &nbsp; &nbsp;
          {!filterOnOff ? (
            <ButtonBase className={classes.btn} onClick={toggleFilter}>
              <Text style={{ fontSize: 20 }} value={"+"} />
            </ButtonBase>
          ) : (
            <ButtonBase className={classes.btn} onClick={toggleFilter}>
              <Text style={{ fontSize: 28 }} value={"-"} />
            </ButtonBase>
          )}
          <FavouriteListPopup />
        </>
      );
    }
  };

  return (
    <div className={classes.root}>
      <CompanyDetailPopUp />
      {/* Appbar */}
      <div position="static" className={classes.appBar}>
        <div className={classes.appBarItem}>
          <img
            onClick={() => window.location.replace("/")}
            src={require("assets/images/logo.jpg")}
            className={classes.logo}
          />
          <Paper
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "15px",
            }}
          >
            <Typography
              style={{ marginLeft: "15px", fontWeight: 700 }}
            >{`File`}</Typography>
            <Divider
              className={classes.divider}
              style={{ marginLeft: "15px" }}
              orientation="vertical"
            />
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
          <Paper
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CustomSelect
              // onSelectChange={setFilter}
              minWidth={320}
              options={roleCheck}
              style={{ width: "40px", zIndex: 9999 }}
              // dropdown={<ExpandMoreIcon />}
              // icon={<CustomIcon style={{ padding: 0 }} icon={<Visibility />} />}
            />
            <Divider
              className={classes.divider}
              style={{ marginLeft: "15px" }}
              orientation="vertical"
            />
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
          {checkUserRole(userData.role)}

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
  if (path.includes("dashboard")) return <UserHeader />;
  else if (path.includes("manage")) return <AnalyzeHeader />;
  // else if (path.includes('respondents')) return (<UploadHeader />)
};

const Upload = ({}) => {
  const classes = useStyles();

  const [state, dispatch] = useAppValue();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [type, setType] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [fileNamesArr, setFileNamesArr] = useState([]);
  const [companyFile, setCompanyFile] = useState("");
  const [technoFile, setTechnoFile] = useState("");
  const [clientTechnoFile, setClientTechnoFile] = useState("");
  const [totalReadCount, setTotalReadCount] = useState("");
  const [chooseUpdate, setChooseUpdate] = useState("existing");
  const [fileNameToUpdate, setFileNameToUpdate] = useState("");
  const [selectOpen, setSelectOpen] = React.useState(false);
  const [dataCount, setDataCount] = useState([]);
  const [technoCount, setTechnoCount] = useState([]);
  const [technoData, setTechnoData] = useState();
  const [clientTechnoCount, setClientTechnoCount] = useState([]);
  const [clientTechnoData, setClientTechnoData] = useState();
  const [fields, setFields] = useState([]);
  const [technoFields, setTechnoFields] = useState([]);
  const [data, setData] = useState([]);
  const [dataToFilter, setDataToFilter] = useState([]);
  const [client, setClient] = useState([]);
  const [open, setOpen] = useState(null);
  const [dataObj, setDataObj] = useState({});
  const [infoDataObj, setInfoDataObj] = useState({});
  const [infoDataArray, setInfoDataArray] = useState([]);
  const [sectorDataObj, setSectorDataObj] = useState({});

  const [unAssigned, setUnAssigned] = useState({});
  const [setorDataArray, setSectorDataArray] = useState([]);
  const [FieldsObj, setFieldsObj] = useState([]);
  const [next, setNext] = React.useState(false);
  const [social, setSocial] = useState({});
  const [saveSelect, setSaveSelect] = useState({});
  const [saveUnAssignedSelect, setSaveUnAssignedSelect] = useState({});
  const [unAssignedSelectedValue, setUnAssignedSelectedValue] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // let open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;
  let id;
  // console.log('dataCount', dataCount)
  // console.log('saveSelect', saveSelect)
  useEffect(() => {
    const fetchDbFileNames = async () => {
      // setBreakdown('Choose one')
      // setValue()
      // if (overlay && breakdown !== 'Choose one') {
      const response = await api().get(endpoints.getFileNamesFromDB);
      if (response.status === 200) {
        // setOverlay(response.data.data)
        setFileNamesArr(response.data.data);
      }
      // }
    };
    fetchDbFileNames();
  }, []);

  useEffect(() => {
    setOpen(Boolean(anchorEl));
    id = open ? "simple-popover" : undefined;
  }, [anchorEl]);

  const handleUpload = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let entries;
    if (dataCount) {
      entries = Object.entries(dataCount);
      let testArr = [];
      for (const [field, count] of entries) {
        testArr.push(field, count);
      }
      setFields(testArr);
    }
  }, [dataCount]);
  useEffect(() => {
    let entries;
    if (dataObj) {
      entries = Object.entries(dataObj);
      let testArr = [];
      for (const [data, list] of entries) {
        testArr.push(data, list);
      }
      setFieldsObj(testArr);
      // console.log('test', testArr)
    }
  }, [dataObj]);

  useEffect(() => {
    let entries;
    if (infoDataObj) {
      entries = Object.entries(infoDataObj);
      let testArr = [];
      for (const [data, list] of entries) {
        testArr.push(data, list);
      }
      setInfoDataArray(testArr);
    }
  }, [infoDataObj]);

  useEffect(() => {
    let entries;
    if (sectorDataObj) {
      entries = Object.entries(sectorDataObj);
      let testArr = [];
      for (const [data, list] of entries) {
        testArr.push(data, list);
      }
      setSectorDataArray(testArr);
    }
  }, [sectorDataObj]);

  useEffect(() => {
    if (technoCount) {
      const entries = Object.entries(technoCount);
      let testArr = [];
      for (const [field, count] of entries) {
        testArr.push(field, count);
      }
      setTechnoFields(testArr);
    }
  }, [technoCount]);

  return (
    <>
      <ButtonBase className={classes.btn} onClick={handleUpload}>
        Upload
      </ButtonBase>
      <Popover
        classes={{
          paper: next ? classes.paper2 : classes.paper,
        }}
        style={{
          marginTop: companyFile && type === "company" ? 35 : 0,
          width: next ? "75%" : "98%",
          top: "60px",
        }}
        id={id}
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        anchorReference="anchorPosition"
        anchorPosition={{
          left: companyFile && type === "company" ? 439 : 1000,
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Paper className={classes.downloadPaper} style={{ width: "100%" }}>
          {next ? (
            // <div style={{ display: 'flex', flexDirection: 'row' }}>
            //     <div>
            //         {
            //             (companyFile && type === 'company') &&
            //             <CompanyTuple fields={fields} totalReadCount={totalReadCount} dataCount={dataCount} social={social} saveSelect={saveSelect} />
            //         }
            //     </div>

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
              saveSelect={saveSelect}
              saveUnAssignedSelect={saveUnAssignedSelect}
              filteredData={filteredData}
            />
          ) : (
            // </div>
            <>
              {companyFile || technoFile || clientTechnoFile ? (
                <div>
                  <ValidateFields
                    fields={fields}
                    social={social}
                    unAssigned={unAssigned}
                    setUnAssigned={setUnAssigned}
                    unAssignedSelectedValue={unAssignedSelectedValue}
                    saveSelect={saveSelect}
                    setSaveSelect={setSaveSelect}
                    saveUnAssignedSelect={saveUnAssignedSelect}
                    setSaveUnAssignedSelect={setSaveUnAssignedSelect}
                    setSocial={setSocial}
                    setNext={setNext}
                    setOpen={setOpen}
                    dataCount={dataCount}
                    FieldsObj={FieldsObj}
                    infoDataObj={infoDataObj}
                    sectorDataObj={sectorDataObj}
                    unAssigned={unAssigned}
                    totalReadCount={totalReadCount}
                    data={data}
                    dataToFilter={dataToFilter}
                    dataObj={dataObj}
                    setAnchorEl={setAnchorEl}
                    anchorEl={anchorEl}
                    setUnAssignedSelectedValue={setUnAssignedSelectedValue}
                    filteredData={filteredData}
                    setFilteredData={setFilteredData}
                  />
                </div>
              ) : (
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
                  setDataToFilter={setDataToFilter}
                  // setClient={setClient}
                  setOpen={setOpen}
                  setFields={setFields}
                  setTechnoCount={setTechnoCount}
                  setTechnoData={setTechnoData}
                  setClientTechnoCount={setClientTechnoCount}
                  setClientTechnoData={setClientTechnoData}
                  clientTechnoFile={clientTechnoFile}
                  setClientTechnoFile={setClientTechnoFile}
                  setDataObj={setDataObj}
                  setInfoDataObj={setInfoDataObj}
                  setSectorDataObj={setSectorDataObj}
                  setUnAssigned={setUnAssigned}
                  setUnAssignedSelectedValue={setUnAssignedSelectedValue}
                  filteredData={filteredData}
                  setFilteredData={setFilteredData}
                />
              )}
            </>
          )}
        </Paper>
      </Popover>
    </>
  );
};

const StepOne = ({
  setClientTechnoCount,
  setClientTechnoData,
  clientTechnoFile,
  setUnAssignedSelectedValue,
  setInfoDataObj,
  setUnAssigned,
  setSectorDataObj,
  setClientTechnoFile,
  setDataObj,
  setTechnoData,
  setTechnoCount,
  type,
  setOpen,
  setFields,
  setType,
  companyFile,
  setCompanyFile,
  technoFile,
  setTechnoFile,
  totalReadCount,
  setTotalReadCount,
  setDataCount,
  setData,
  setDataToFilter,
}) => {
  const classes = useStyles();

  const companyRef = useRef(null);
  const technoRef = useRef(null);
  const clientTechnoRef = useRef(null);
  const [tes, setTes] = useState(false);
  const [textInfo, setTextInfo] = useState("Click Browse to upload:");

  useEffect(() => {
    if (type === "client") setTextInfo("Upload Client Info:");
    else setTextInfo("Click Browse to upload:");
  }, [type]);

  function getFileExtension(filename) {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  }

  const handleRadioClick = (event) => {
    setType(event.target.value);
    setCompanyFile(null);
    setTotalReadCount(null);
    setDataCount(null);
    setData(null);
  };

  const onBrowseClick = (value) => {
    if (value === "company") {
      companyRef.current.click();
      setFields([]);
    }
    if (value === "techno") {
      technoRef.current.click();
    }
    if (value === "clientTechno") {
      clientTechnoRef.current.click();
    }
  };

  const onClientTechnoUpload = async (event) => {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("name", event.target.files[0].name);
    const ext = getFileExtension(event.target.files[0].name);
    if (ext === "xlsx") {
      const response = await api().post(
        endpoints.uploadClientTechnoExcel,
        data
      );
      if (response.status === 200) {
        setClientTechnoFile(response.data.filename);
        // setClientTechnoCount(response.data.technoCount)
        setClientTechnoData(response.data.obj);
        // setTechnoFile(response.data.filename)
        setTechnoCount(response.data.technoCount);
        setTechnoData(response.data.obj);
        setOpen(false);
      }
    } else if (ext === "csv") {
      const response = await api().post(endpoints.uploadClientTechno, data);
      if (response.status === 200) {
        setClientTechnoFile(response.data.filename);
        // setClientTechnoCount(response.data.technoCount)
        setClientTechnoData(response.data.obj);
        // setTechnoFile(response.data.filename)
        setTechnoCount(response.data.technoCount);
        setTechnoData(response.data.obj);
        setOpen(false);
      }
    } else {
    }
    setOpen(true);
  };

  const onCompanyUpload = async (event) => {
    setTes(true);
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("name", event.target.files[0].name);
    const ext = getFileExtension(event.target.files[0].name);
    if (type === "company") {
      if (ext === "xlsx") {
        const response = await api().post(endpoints.uploadCompanyExcel, data);

        if (response.status === 200) {
          setCompanyFile(response.data.filename);
          setTotalReadCount(response.data.fields);
          setDataCount(response.data.dataCount);
          setData(response.data.data);
          setDataToFilter(response.data.dataToFilter);
          setDataObj(response.data.contactObj);
          setInfoDataObj(response.data.infoObj);
          setSectorDataObj(response.data.sectorObj);
          setUnAssigned(response.data.realDataObj);
          setUnAssignedSelectedValue(response.data.availibleColumnFromDB);
          setOpen(false);
        }
      }
      if (ext === "csv") {
        const response = await api().post(endpoints.uploadCompanies, data);
        if (response.status === 200) {
          setCompanyFile(response.data.filename);
          setTotalReadCount(response.data.fields);
          setDataCount(response.data.dataCount);
          setData(response.data.data);
          setDataObj(response.data.finedData);
          setOpen(false);
        }
      }
    }
    if (type === "expertise" || type === "keyword") {
      if (ext === "csv") {
        const response = await api().post(endpoints.uploadExpertise, data);
        if (response.status === 200) {
          setCompanyFile(response.data.filename);
          setOpen(false);
          setData(response.data.expertise);
          // setClient(response.data.client)
        }
      }
      if (ext === "xlsx") {
        const response = await api().post(endpoints.uploadExpertiseExcel, data);
        if (response.status === 200) {
          setCompanyFile(response.data.filename);
          setOpen(false);
          setData(response.data.expertise);
          // setClient(response.data.client)
        }
      }
    }
    if (type === "directory") {
      const response = await api().post(endpoints.uploadDirectory, data);
      if (response.status === 200) {
        setCompanyFile(response.data.filename);
        setData(response.data.data);
        setOpen(false);
      }
    }
    if (type === "personnel") {
      const response = await api().post(endpoints.uploadPersonnel, data);
      if (response.status === 200) {
        setCompanyFile(response.data.filename);
        setData(response.data.data);
        setOpen(false);
      }
    }
    if (type === "client") {
      const response = await api().post(endpoints.uploadClient, data);
      if (response.status === 200) {
        setCompanyFile(response.data.filename);
        setData(response.data.data);
        setOpen(false);
      }
    }
    if (type === "") {
      if (ext === "xlsx") {
      }
    }
    // setCompanyData(data)
    setOpen(true);
  };

  const onTechnoUpload = async (event) => {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("name", event.target.files[0].name);
    // setTechnoFile(event.target.files[0].name)
    // setTechnoData(data)
    const ext = getFileExtension(event.target.files[0].name);
    if (ext === "xlsx") {
      const response = await api().post(endpoints.uploadTechnoExcel, data);
      if (response.status === 200) {
        setTechnoFile(response.data.filename);
        setTechnoCount(response.data.technoCount);
        setTechnoData(response.data.obj);
        setOpen(false);
      }
    } else if (ext === "csv") {
      const response = await api().post(endpoints.uploadTechno, data);
      if (response.status === 200) {
        setTechnoFile(response.data.filename);
        setTechnoCount(response.data.technoCount);
        setTechnoData(response.data.obj);
        setOpen(false);
      }
    } else {
      setTechnoFile();
      setTechnoCount();
    }
    setOpen(true);
  };

  let radioData = [
    { name: "company", value: "Company" },
    { name: "directory", value: "Directory" },
    { name: "keyword", value: "Keyword" },
    { name: "client", value: "Client Company & Technology" },
    { name: "expertise", value: "Partner/ Expertise/ Awards" },
    { name: "personnel", value: "Personnel" },
  ];

  return (
    <Grid container className={classes.grid}>
      <div className={classes.uploadGridHeader}>
        <Text
          value={`Step 1: Upload File Type`}
          style={{ fontSize: "12px", color: "#ffffff" }}
        />
      </div>
      <hr />
      <div style={{ display: "flex" }}>
        <PriorityHighIcon style={{ paddingTop: "5px" }} />
        <Text
          value={`You can upload 1 company file and Technology file at the same time:`}
          style={{ fontSize: "12px", paddingTop: "5px", paddingBottom: "5px" }}
        />
      </div>
      <hr />
      <div
        style={{
          display: "flex",
          backgroundColor: "lightgray",
          width: "245px",
          padding: "7px",
        }}
      >
        <Text value={`Upload`} style={{ fontSize: "12px" }} />
        &nbsp;
        <Text
          value={` Companies`}
          style={{ fontWeight: 700, fontSize: "12px" }}
        />
        <Text value={`: Select one file type`} style={{ fontSize: "12px" }} />
      </div>
      <Grid container>
        {radioData.map((x) => (
          <Grid
            item
            md={4}
            className={classes.subGridItem}
            style={{ display: "flex" }}
          >
            <Radio
              checked={type === x.name}
              onChange={handleRadioClick}
              value={x.name}
              name="plan"
              style={{ color: "#3c8dbc", marginTop: "-9px" }}
            />
            <Typography noWrap={false}>{x.value}</Typography>
          </Grid>
        ))}
        <Grid
          item
          md={3}
          className={classes.subGridItem}
          style={{ marginTop: "20px" }}
        >
          <Typography
            noWrap={false}
            style={{
              textAlign: "right",
              paddingRight: "15px",
              lineHeight: "normal",
              fontWeight: 600,
            }}
          >
            {textInfo}
          </Typography>
        </Grid>
        <Grid
          item
          md={3}
          className={classes.subGridItem}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <input
            id="myInput"
            type="file"
            ref={companyRef}
            style={{ display: "none" }}
            onChange={onCompanyUpload}
          />
          <ButtonBase
            className={classes.buttonBase}
            onClick={() => onBrowseClick("company")}
          >
            <Text
              value="Browse"
              style={{ fontSize: "12px", lineHeight: "0px" }}
            />
          </ButtonBase>
        </Grid>
        <Grid
          item
          md={3}
          className={classes.subGridItem}
          style={{ marginTop: "30px" }}
        >
          {tes && (
            // <Text
            //   value="Loading"
            //   style={{ fontSize: "12px", lineHeight: "0px" }}
            // />
            <i className="fas fa-spinner fa-spin"></i>
          )}
        </Grid>
        <Grid
          item
          md={3}
          className={classes.subGridItem}
          style={{ marginTop: "20px" }}
        >
          <Typography noWrap={false} style={{ textAlign: "center" }}>
            Excel | .csv
          </Typography>
        </Grid>
        {companyFile ? (
          <>
            <Grid item md={4} className={classes.subGridItem}>
              <Typography
                noWrap={false}
                style={{
                  textAlign: "right",
                  paddingRight: "15px",
                  lineHeight: "normal",
                  fontWeight: 600,
                  marginTop: "3px",
                }}
              >
                Selected file:
              </Typography>
            </Grid>
            <Grid item md={8} className={classes.subGridItem}>
              <Typography
                noWrap={false}
                style={{
                  textAlign: "left",
                  paddingRight: "15px",
                  lineHeight: "normal",
                  marginTop: "3px",
                  color: "#3c8dbc",
                }}
              >
                {companyFile}
              </Typography>
            </Grid>
          </>
        ) : null}
      </Grid>
      {type === "client" ? (
        <Grid container>
          <Grid
            item
            md={4}
            className={classes.subGridItem}
            style={{ marginTop: "20px" }}
          >
            <Typography
              noWrap={false}
              style={{
                textAlign: "right",
                paddingRight: "15px",
                lineHeight: "normal",
                fontWeight: 600,
              }}
            >
              Upload Client Techno:
            </Typography>
          </Grid>
          <Grid
            item
            md={4}
            className={classes.subGridItem}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            <input
              id="myInput"
              type="file"
              ref={clientTechnoRef}
              style={{ display: "none" }}
              onChange={onClientTechnoUpload}
            />
            <ButtonBase
              className={classes.buttonBase}
              onClick={() => onBrowseClick("clientTechno")}
            >
              <Text
                value="Browse"
                style={{ fontSize: "12px", lineHeight: "0px" }}
              />
            </ButtonBase>
          </Grid>
          <Grid
            item
            md={4}
            className={classes.subGridItem}
            style={{ marginTop: "20px" }}
          >
            <Typography noWrap={false} style={{ textAlign: "center" }}>
              Excel | .csv
            </Typography>
          </Grid>
          {clientTechnoFile ? (
            <>
              <Grid item md={4} className={classes.subGridItem}>
                <Typography
                  noWrap={false}
                  style={{
                    textAlign: "right",
                    paddingRight: "15px",
                    lineHeight: "normal",
                    fontWeight: 600,
                    marginTop: "3px",
                  }}
                >
                  Selected file:
                </Typography>
              </Grid>
              <Grid item md={8} className={classes.subGridItem}>
                <Typography
                  noWrap={false}
                  style={{
                    textAlign: "left",
                    paddingRight: "15px",
                    lineHeight: "normal",
                    marginTop: "3px",
                    color: "#3c8dbc",
                  }}
                >
                  {clientTechnoFile}
                </Typography>
              </Grid>
            </>
          ) : null}
        </Grid>
      ) : null}
      <hr style={{ marginTop: "15px" }} />
      <Grid container>
        <Grid item md={4} className={classes.subGridItem}>
          <div
            style={{
              display: "flex",
              paddingRight: "15px",
              justifyContent: "flex-end",
            }}
          >
            <Typography noWrap={false} style={{ lineHeight: "normal" }}>
              Upload
            </Typography>
            &nbsp;
            <Typography
              noWrap={false}
              style={{ lineHeight: "normal", fontWeight: 600 }}
            >
              Technology:
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          md={4}
          className={classes.subGridItem}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            flexWrap: "wrap",
          }}
        >
          <input
            id="myInput"
            type="file"
            ref={technoRef}
            style={{ display: "none" }}
            onChange={onTechnoUpload}
          />
          <ButtonBase
            className={classes.buttonBase}
            onClick={() => (type === "client" ? null : onBrowseClick("techno"))}
          >
            <Text
              value="Browse"
              style={{ fontSize: "12px", lineHeight: "0px" }}
            />
          </ButtonBase>
        </Grid>
        <Grid item md={4} className={classes.subGridItem}>
          <Typography noWrap={false} style={{ textAlign: "center" }}>
            Excel | .csv
          </Typography>
        </Grid>
        {technoFile ? (
          <>
            <Grid item md={4} className={classes.subGridItem}>
              <Typography
                noWrap={false}
                style={{
                  textAlign: "right",
                  paddingRight: "15px",
                  lineHeight: "normal",
                  fontWeight: 600,
                  marginTop: "3px",
                }}
              >
                Selected file:
              </Typography>
            </Grid>
            <Grid item md={8} className={classes.subGridItem}>
              <Typography
                noWrap={false}
                style={{
                  textAlign: "left",
                  paddingRight: "15px",
                  lineHeight: "normal",
                  marginTop: "3px",
                  color: "#3c8dbc",
                }}
              >
                {technoFile}
              </Typography>
            </Grid>
          </>
        ) : null}
      </Grid>
    </Grid>
  );
};

const TechnoTuple = ({ technoFields }) => {
  const classes = useStyles();

  return (
    <div className={classes.optionalDisplay} style={{ marginRight: "5px" }}>
      <div className={classes.uploadGridHeader} style={{ minWidth: "260px" }}>
        <Text
          value={`Technology Tuple - Available and Missing Fields`}
          style={{ fontSize: "12px", color: "#ffffff" }}
        />
      </div>
      <hr />
      <Grid container>
        <Grid item md={8}>
          <div className={classes.bgText}>
            <Text value={`Type`} style={{ fontSize: "12px" }} />
          </div>
        </Grid>
        <Grid item md={4}>
          <div className={classes.bgText}>
            <Text value={`Count`} style={{ fontSize: "12px" }} />
          </div>
        </Grid>
      </Grid>
      <hr />
      <Grid container style={{ height: "400px", overflowY: "scroll" }}>
        {technoFields.map((x, i) => {
          let array = [
            "Advertising",
            "Analytics and Tracking",
            "Ecommerce",
            "Widgets",
            "Hosting",
            "Productivity",
          ];
          // if(array.includes(x)) continue
          return (
            <>
              <Grid item md={i % 2 == 0 ? 8 : 4}>
                {array.includes(x) ? (
                  <Text
                    value={x}
                    style={{
                      fontWeight: 700,
                      fontSize: "12px",
                      paddingLeft: "8px",
                      textAlign: i % 2 == 0 ? "left" : "center",
                      marginTop: "3px",
                      marginBottom: "3px",
                    }}
                  />
                ) : (
                  <Text
                    value={x}
                    style={{
                      fontSize: "12px",
                      paddingLeft: "8px",
                      textAlign: i % 2 == 0 ? "left" : "center",
                    }}
                  />
                )}
              </Grid>
            </>
          );
        })}
      </Grid>
    </div>
  );
};

const CompanyTuple = ({
  fields,
  totalReadCount,
  social,
  dataCount,
  saveSelect,
  saveUnAssignedSelect,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.optionalDisplay}>
      <div className={classes.uploadGridHeader} style={{ minWidth: "255px" }}>
        <Text
          value={`Company Tuple - Available and Missing Fields`}
          style={{ fontSize: "12px", color: "#ffffff" }}
        />
      </div>
      <hr />
      <Grid container>
        <Grid item md={8}>
          <div className={classes.bgText}>
            <Text
              value={`${Object.keys(saveSelect).length} Fields`}
              style={{ fontSize: "12px" }}
            />
          </div>
        </Grid>
        <Grid item md={4}>
          <div className={classes.bgText}>
            <Text value={`Count`} style={{ fontSize: "12px" }} />
          </div>
        </Grid>
      </Grid>
      <hr />
      <Grid container style={{ overflowY: "scroll" }}>
        {Object.keys(saveSelect).map((x, i) => (
          <>
            <Grid item md={8}>
              <Text
                value={x}
                style={{
                  fontSize: "12px",
                  paddingLeft: "8px",
                  textAlign: "left",
                }}
              />
            </Grid>
            <Grid item md={4}>
              <Text
                value={dataCount[saveSelect[x]]}
                style={{
                  fontSize: "12px",
                  paddingLeft: "8px",
                  textAlign: "center",
                }}
              />
            </Grid>
          </>
        ))}
      </Grid>
    </div>
  );
};

const FourComponent = ({
  handleSocialRadio,
  name,
  value,
  handleChange,
  checked,
  count,
  selectedValue,
  index,
  handleSaveSelect,
}) => {
  const classes = useStyles();
  // console.log(name, checked)
  // console.log(index, selectedValue, count)

  return (
    <Grid container spacing={1} style={{ alignItems: "center" }}>
      <Grid item xs={1}>
        <Radio
          checked={checked}
          onClick={() => {
            handleSocialRadio(name, !checked);
            // handleSaveSelect(selectedValue, selectedValue)
            if (!checked) handleSaveSelect(name, selectedValue, "add");
            else handleSaveSelect(name, selectedValue, "remove");
          }}
          // onChange={handleSocialRadio}
          name={name}
          value={name}
          style={{ color: "#3c8dbc", marginTop: "-9px", cursor: "pointer" }}
        />
      </Grid>
      <Grid item xs={4}>
        <Text
          value={name}
          style={{ fontSize: "12px", wordWrap: "break-word" }}
        />
      </Grid>
      <Grid item xs={5}>
        <AssignedCustomSelect
          handleChange={handleChange}
          handleSocialRadio={handleSocialRadio}
          handleSaveSelect={handleSaveSelect}
          name={name}
          index={index}
          checked={checked}
          selectedValue={selectedValue}
          value={value}
        />
        {/* <NativeSelect
          style={{
            marginTop: "10px",
            backgroundColor: "transparent",
            minWidth: "100%",
            maxWidth: "100%",
          }}
          value={selectedValue}
          onChange={(e) => {
            handleChange(e, index, name, !checked);
            handleSocialRadio(name, !checked, "selectCheck", e.target.value);
            handleSaveSelect(name, e.target.value, "add");
          }}
          input={<BootstrapInput />}
        >
          {/* <option aria-label="None" value="" /> */}
      </Grid>
      <Grid item xs={2}>
        <Text value={count} style={{ fontSize: "12px" }} />
      </Grid>
    </Grid>
  );
};
const UnAssignedSelectComponent = ({
  handleSocialRadio,
  name,
  handleDelete,
  value,
  handleChange,
  checked,
  count,
  selectedValue,
  index,
  handleSaveSelect,
  handleTextChange,
  addDb,
  addValue,
  setAddDb,
  data,
  setNewColumnArr,
  newColumnArr,
  setUnAssignedSelectedValue,
}) => {
  const classes = useStyles();
  // console.log(name, checked)
  // console.log(index, selectedValue, count)
  return (
    <Grid container spacing={1} style={{ alignItems: "center" }}>
      <Grid item xs={1}>
        <Radio
          checked={checked}
          onClick={() => {
            handleSocialRadio(name, !checked, "removeCheck");
            // handleSaveSelect(selectedValue, selectedValue)
            if (!checked) handleSaveSelect(name, selectedValue, "add");
            else handleSaveSelect(name, selectedValue, "remove");
          }}
          // onChange={handleSocialRadio}
          name={name}
          value={name}
          style={{ color: "#3c8dbc", marginTop: "-9px", cursor: "pointer" }}
        />
      </Grid>
      <Grid item xs={4}>
        <Text value={name} style={{ fontSize: "12px" }} />
      </Grid>
      <Grid item xs={5}>
        <UnAssignCustomSelect
          handleChange={handleChange}
          handleSocialRadio={handleSocialRadio}
          handleSaveSelect={handleSaveSelect}
          handleDelete={handleDelete}
          checked={checked}
          name={name}
          index={index}
          value={value}
          selectedValue={selectedValue}
          handleTextChange={handleTextChange}
          addDb={addDb}
          addValue={addValue}
          setAddDb={setAddDb}
          setNewColumnArr={setNewColumnArr}
          newColumnArr={newColumnArr}
          setUnAssignedSelectedValue={setUnAssignedSelectedValue}
        />
        {/* <NativeSelect
          style={{
            marginTop: "10px",
            backgroundColor: "transparent",
            minWidth: "100%",
            maxWidth: "100%",
          }}
          value={selectedValue}
          onChange={(e) => {
            handleChange(e, index);
            handleSocialRadio(name, !checked, "selectCheck", e.target.value);
            handleSaveSelect(name, e.target.value, "add");
            // handleDelete(name, e.target.value, !checked)
            handleDelete(selectedValue, e.target.value, !checked);
          }}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />
          {value.map((child) => (
            <option
              value={child}
              key={child}
              style={{
                wordWrap: "break-word",
                whiteSpace: "normal",
                width: 50,
              }}
            >
              {child}
            </option>
          ))}
        </NativeSelect> */}
      </Grid>
      <Grid item xs={2}>
        <Text value={count} style={{ fontSize: "12px" }} />
      </Grid>
    </Grid>
  );
};

const ValidateFields = ({
  fields,
  totalReadCount,
  saveSelect,
  setAnchorEl,
  anchorEl,
  unAssignedSelectedValue,
  setSaveSelect,
  setSaveUnAssignedSelect,
  saveUnAssignedSelect,
  unAssigned,
  dataObj,
  dataCount,
  infoDataObj,
  sectorDataObj,
  setOpen,
  setNext,
  social,
  setSocial,
  data,
  dataToFilter,
  setUnAssignedSelectedValue,
  filteredData,
  setFilteredData,
}) => {
  const classes = useStyles();
  // const [social, setSocial] = useState({})
  const [socialSelect, setSocialSelect] = useState([]);
  const [infoSelect, setInfoSelect] = useState([]);
  const [sectorSelect, setSectorSelect] = useState([]);
  const [unAssignedSelect, setUnAssignedSelect] = useState([]);
  const [assign, setAssign] = useState(false);
  const [addDb, setAddDb] = useState("");
  const [overViewOfFieldsSelected, setCverViewOfFieldsSelected] = useState(
    false
  );
  const [newColumnArr, setNewColumnArr] = useState([]);

  const handleBack = (event) => {
    setOpen(false);
    setAnchorEl(event.currentTarget);
  };

  // useEffect(() => {
  //   setOpen(Boolean(anchorEl));
  //   // id = open ? "simple-popover" : undefined;
  // }, [anchorEl]);
  // useEffect(() => {
  //   // data init
  //   if (dataObj) {
  //     let tempArr = [];
  //     for (const [key, value] of Object.entries(dataObj)) {
  //       // if (value.count)
  //       tempArr.push(value.list[0]);
  //     }
  //     setSocialSelect(tempArr);
  //   }
  // }, [dataObj]);

  // useEffect(() => {
  //   // data init
  //   if (infoDataObj) {
  //     let tempArr = [];
  //     for (const [key, value] of Object.entries(infoDataObj)) {
  //       if (value.count) tempArr.push(value.list[0]);
  //     }
  //     setInfoSelect(tempArr);
  //   }
  // }, [infoDataObj]);

  // useEffect(() => {
  //   // data init
  //   if (sectorDataObj) {
  //     let tempArr = [];
  //     for (const [key, value] of Object.entries(sectorDataObj)) {
  //       if (value.count) tempArr.push(value.list[0]);
  //     }
  //     setSectorSelect(tempArr);
  //   }
  // }, [sectorDataObj]);

  // useEffect(() => {  // data init
  //     // if (unAssigned) {
  //     //     let tempArr = []
  //     //     for (const [key, value] of Object.entries(unAssigned)) {
  //     //         if (value.count) tempArr.push(value.list[0])
  //     //     }
  //     //     setUnAssignedSelect(tempArr)

  //     // }
  //     setUnAssignedSelect(unAssignedSelectedValue)
  // }, [unAssignedSelectedValue])
  useEffect(() => {
    unAssignedSelectedValue.push("Don't Assign");
  }, [unAssignedSelectedValue]);
  // console.log("un", unAssignedSelectedValue);
  const handleSocialRadio = (name, checked, status, value) => {
    // console.log("value", value);
    if (status == "selectCheck" && value !== "" && value !== "Don't Assign") {
      setSocial({ ...social, [name]: true });
    } else if (
      status == "selectCheck" &&
      value !== "" &&
      value == "Don't Assign"
    ) {
      setSocial({ ...social, [name]: false });
    } else {
      setSocial({ ...social, [name]: checked });
    }
  };

  const handleSaveSelect = (name, select, status) => {
    let tempSaveSelect = { ...saveSelect };

    if (status == "add") setSaveSelect({ ...saveSelect, [name]: select });
    else {
      delete tempSaveSelect[name];
      setSaveSelect(tempSaveSelect);
    }
  };
  const handleSaveSelectSector = (name, select, status) => {
    let tempSaveSelect = { ...saveSelect };

    if (status == "add")
      setSaveSelect({
        ...saveSelect,
        sector: [...sectorSelect, select],
      });
    else {
      delete tempSaveSelect[name];
      setSaveSelect(tempSaveSelect);
    }
  };
  // console.log("saveSelect", sectorSelect);
  // console.log("se", saveSelect);
  const handleSaveUnAssignedSelect = (name, select, status) => {
    let tempSaveUnAssignedSelect = { ...saveUnAssignedSelect };

    if (status == "add" && name != "Don't Assign")
      setSaveUnAssignedSelect({ ...saveUnAssignedSelect, [name]: select });
    else {
      delete tempSaveUnAssignedSelect[name];
      setSaveUnAssignedSelect(tempSaveUnAssignedSelect);
    }
  };

  const handleChange = (e, id) => {
    let tempArr = [...socialSelect];
    tempArr[id] = e;
    setSocialSelect(tempArr);
  };

  const handleChanges = (value, id) => {
    let tempArr = [...infoSelect];
    tempArr[id] = value;
    setInfoSelect(tempArr);
  };

  const handleTextChange = (event) => {
    setAddDb(event.target.value);
  };
  const handleChangess = (value, id) => {
    let tempArr = [...sectorSelect];
    tempArr[id] = value;
    // let tempArr = [];
    // for (let sector of sectorSelect) {
    //   if (sector) tempArr.push(sector);
    // }
    setSectorSelect(tempArr);
  };

  const handleChangeUnAssigned = (value, id) => {
    let tempArr = [...unAssignedSelect];
    tempArr[id] = value;
    setUnAssignedSelect(tempArr);
  };

  const handleDelete = (old, current) => {
    const unAssignedSelectIndex = unAssignedSelectedValue.indexOf(current);
    if (unAssignedSelectIndex > -1)
      unAssignedSelectedValue.splice(unAssignedSelectIndex, 1);
    if (old) unAssignedSelectedValue.push(old);
  };
  // console.log("saveUnAssignedSelect", saveUnAssignedSelect);
  // console.log("saveSelectData", saveSelect);
  return (
    <>
      {overViewOfFieldsSelected ? (
        <CverViewOfFieldsSelected
          setCverViewOfFieldsSelected={setCverViewOfFieldsSelected}
          dataObj={dataObj}
          infoDataObj={infoDataObj}
          sectorDataObj={sectorDataObj}
          sectorSelect={sectorSelect.filter((x) => x)}
          data={
            dataToFilter
            //   dataToFilter.filter((x) => {
            //   if (
            //     !Object.values(saveSelect).some(
            //       (r) => Object.keys(x).indexOf(r) >= 0
            //     )
            //   )
            //     return false;
            //   if (
            //     !Object.values(saveSelect).some(
            //       (r) => Object.keys(x.sector).indexOf(r) >= 0
            //     )
            //   )
            //     return false; // selected sector includes (sector1 ,other)
            //   if (
            //     !Object.values(saveSelect).some(
            //       (r) => Object.keys(x.biz_type).indexOf(r) >= 0
            //     )
            //   )
            //     return false; // selected sector includes (sector1 ,other)
            //   // if (Object.values(saveSelect).some(r => Object.keys(x.sector).indexOf(r) >= 0)) return true  // only selected sector includes (sector1 only)
            //   return true;
            // })
          }
          unAssignedSelect={unAssignedSelect}
          setNext={setNext}
          saveUnAssignedSelect={saveUnAssignedSelect}
          addDb={addDb}
          newColumnArr={newColumnArr}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
          saveSelect={saveSelect}
          saveUnAssignedSelect={saveUnAssignedSelect}
        />
      ) : (
        <div className={classes.optionalDisplay}>
          <Grid
            container
            style={{
              display: "flex",
              alignItem: "center",
              backgroundColor: "darkgray",
              alignItems: "center",
            }}
          >
            <Grid item xs={2} style={{ display: "flex" }}>
              <ArrowBackIos
                style={{ cursor: "pointer" }}
                // onClick={() => setOpen(false)}
                onClick={handleBack}
              />
              <Text value={`Validate Fields`} style={{ fontSize: "12px" }} />
            </Grid>
            <Grid item xs={8} />
            <Grid item xs={2}>
              {/* <Button
                style={{
                  backgroundColor: social.length != 0 ? "#212121" : "lightgrey",
                }}
                disabled={!(social.length != 0)}
                onClick={() => setNext(true)}
              >
                <Text
                  value={"Save"}
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    cursor: "pointer",
                    color: social.length != 0 ? "white" : "#212121",
                  }}
                />
              </Button> */}
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            style={{ width: window.innerWidth, paddingTop: "10px" }}
          >
            <Grid item xs={4}>
              <Text
                value={`Assigned Fields ${
                  Object.keys(dataObj).length +
                  Object.keys(infoDataObj).length +
                  Object.keys(sectorDataObj).length
                }`}
                onClick={() => setAssign(false)}
                style={{
                  fontSize: "12px",
                  backgroundColor: "#5A9BD5",
                  cursor: "pointer",
                  padding: 5,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Text
                value={`Unassigned Fields  ${Object.keys(unAssigned).length}`}
                onClick={() => setAssign(true)}
                style={{
                  fontSize: "12px",
                  backgroundColor: "#FFD966",
                  cursor: "pointer",
                  padding: 5,
                }}
              />
            </Grid>
            <Grid item xs={4} />
          </Grid>
          <hr />
          {assign ? (
            <Grid container spacing={3} style={{ width: window.innerWidth }}>
              <Grid item xs={4} />
              <Grid
                item
                xs={4}
                style={{
                  boxShadow: "5px 5px 5px 5px #ccc",
                  height: window.innerHeight,
                }}
              >
                <div
                  style={{
                    height: window.innerHeight - 200,
                    overflowY: "scroll",
                    overflowX: "hidden",
                  }}
                >
                  {Object.keys(unAssigned).map(
                    (key, i) =>
                      unAssigned[key].count !== 0 && (
                        <UnAssignedSelectComponent
                          index={i}
                          checked={social[key] || false}
                          handleSocialRadio={handleSocialRadio}
                          count={unAssigned[key].count}
                          name={key}
                          handleSaveSelect={handleSaveUnAssignedSelect}
                          value={unAssignedSelectedValue.concat(
                            unAssignedSelect[i]
                          )}
                          addValue={unAssignedSelectedValue}
                          selectedValue={unAssignedSelect[i]}
                          handleChange={handleChangeUnAssigned}
                          setUnAssignedSelectedValue={
                            setUnAssignedSelectedValue
                          }
                          handleDelete={handleDelete}
                          handleTextChange={handleTextChange}
                          addDb={addDb}
                          setAddDb={setAddDb}
                          data={data}
                          setNewColumnArr={setNewColumnArr}
                          newColumnArr={newColumnArr}
                        />
                      )
                  )}
                </div>
                <hr />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "70%", padding: 2 }}
                  onClick={() => setCverViewOfFieldsSelected(true)}
                  // disabled={social.length == unAssigned.length ? true : false}
                >
                  Next
                </Button>
              </Grid>
              <Grid item xs={4} />
            </Grid>
          ) : (
            <Grid container spacing={3} style={{ width: window.innerWidth }}>
              <Grid item xs={4} style={{ boxShadow: "5px 5px 5px 0px #ccc" }}>
                <Grid container>
                  <Grid item xs={12}>
                    <Text
                      value={"Contact and Social Link Info"}
                      style={{ fontSize: "12px", backgroundColor: "#d3d3d359" }}
                    />
                  </Grid>
                </Grid>
                {/* <hr /> */}
                <div
                  style={{
                    height: window.innerHeight - 250,
                    overflowY: "scroll",
                    overflowX: "hidden",
                    paddingBottom: "55px",
                  }}
                >
                  {Object.keys(dataObj).map(
                    (key, i) =>
                      dataObj[key].count !== 0 && (
                        <FourComponent
                          index={i}
                          checked={social[key] || false}
                          handleSocialRadio={handleSocialRadio}
                          count={dataCount[socialSelect[i]]}
                          name={key}
                          handleSaveSelect={handleSaveSelect}
                          value={dataObj[key]}
                          selectedValue={socialSelect[i]}
                          handleChange={handleChange}
                        />
                      )
                  )}
                </div>
              </Grid>

              <Grid item xs={4} style={{ boxShadow: "5px 5px 5px 0px #ccc" }}>
                <Grid container>
                  <Grid item xs={12}>
                    <Text
                      value={"Company Info"}
                      style={{ fontSize: "12px", backgroundColor: "#d3d3d359" }}
                    />
                  </Grid>
                </Grid>
                {/* <hr /> */}
                <div
                  style={{
                    height: window.innerHeight - 250,
                    overflowY: "scroll",
                    overflowX: "hidden",
                    paddingBottom: "55px",
                  }}
                >
                  {Object.keys(infoDataObj).map(
                    (key, i) =>
                      infoDataObj[key].count !== 0 && (
                        <FourComponent
                          index={i}
                          checked={social[key] || false}
                          handleSocialRadio={handleSocialRadio}
                          count={dataCount[infoSelect[i]]}
                          name={key}
                          handleSaveSelect={handleSaveSelect}
                          value={infoDataObj[key]}
                          selectedValue={infoSelect[i]}
                          handleChange={handleChanges}
                        />
                      )
                  )}
                </div>
              </Grid>

              <Grid item xs={4} style={{ boxShadow: "5px 5px 5px 0px #ccc" }}>
                <Grid container>
                  <Grid item xs={12}>
                    <Text
                      value={"Sector"}
                      style={{ fontSize: "12px", backgroundColor: "#d3d3d359" }}
                    />
                  </Grid>
                </Grid>
                {/* <hr /> */}
                <div
                  style={{
                    height: window.innerHeight - 250,
                    overflowY: "scroll",
                    overflowX: "hidden",
                    paddingBottom: "55px",
                  }}
                >
                  {Object.keys(sectorDataObj).map(
                    (key, i) =>
                      sectorDataObj[key].count !== 0 && (
                        <FourComponent
                          index={i}
                          checked={social[key] || false}
                          handleSocialRadio={handleSocialRadio}
                          count={dataCount[sectorSelect[i]]}
                          name={key}
                          handleSaveSelect={handleSaveSelectSector}
                          value={sectorDataObj[key]}
                          selectedValue={sectorSelect[i]}
                          handleChange={handleChangess}
                        />
                      )
                  )}
                </div>
              </Grid>
            </Grid>
          )}
        </div>
      )}
    </>
  );
};

const StepTwo = ({
  clientTechnoData,
  saveSelect,
  saveUnAssignedSelect,
  clientTechnoFile,
  setClientTechnoFile,
  type,
  companyFile,
  technoFile,
  setTechnoFile,
  technoData,
  selectedValue,
  setSelectedValue,
  fileNamesArr,
  chooseUpdate,
  setChooseUpdate,
  fileNameToUpdate,
  setFileNameToUpdate,
  selectOpen,
  setSelectOpen,
  setCompanyFile,
  setAnchorEl,
  data,
  filteredData,
}) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const [qc, setQc] = useState("");
  const [chooseDB, setChooseDB] = useState("");

  const handleSelectClose = () => {
    setSelectOpen(false);
  };

  const handleSelectOpen = () => {
    setSelectOpen(true);
  };

  const handleQcRadio = (event) => {
    setQc(event.target.value);
  };

  const handleUploadRadio = (event) => {
    setChooseDB(event.target.value);
  };

  const onCancel = () => {
    setCompanyFile("");
    setTechnoFile("");
    setClientTechnoFile("");
    setAnchorEl(null);
  };

  const onProceed = async () => {
    setLoading(true);

    async function technoUpload() {
      const respon = await api().post(endpoints.importTechnology, {
        technoData: technoData,
      });
      if (respon.status === 200) {
        const resp = await api().get(endpoints.updateScore);
        if (resp.status === 200) {
          setLoading(false);
          window.location.reload();
        }
      }
    }

    async function companyUpload() {
      const response = await api().post(endpoints.importUploadedCompanyExcel, {
        data,
        fileNameToUpdate,
        qc,
        chooseDB,
        saveSelect,
        filteredData,
        saveUnAssignedSelect,
      });
      if (response.status === 200) {
        const res = await api().get(endpoints.updateScore);
        if (res.status === 200) {
          const response = await api().get(endpoints.updateScore);
          if (res.status === 200) {
            setLoading(false);
            window.location.reload();
          }
        }
      }
    }

    if (type === "company") {
      if (technoFile) {
        if (companyFile) {
          const response = await api().post(
            endpoints.importUploadedCompanyExcel,
            {
              data,
              fileNameToUpdate,
              qc,
              chooseDB,
              saveSelect,
              saveUnAssignedSelect,
            }
          );
          if (response.status === 200) {
            const resp = await api().get(endpoints.updateScore);
            if (resp.status === 200) {
              technoUpload();
            }
          }
        } else {
          technoUpload();
        }
      } else {
        companyUpload();
      }
    } else if (type === "expertise" || type === "keyword") {
      const response = await api().post(endpoints.importExpertise, {
        expertiseArr: data,
        // ClientArr: client
      });
      if (response.status === 200)
        if (technoFile) {
          technoUpload();
        } else {
          setLoading(false);
          window.location.reload();
        }
    } else if (type === "directory") {
      const response = await api().post(endpoints.importDirectory, {
        dirObj: data,
      });
      if (response.status === 200)
        if (technoFile) {
          technoUpload();
        } else {
          setLoading(false);
          window.location.reload();
        }
    } else if (type === "personnel") {
      const response = await api().post(endpoints.importPersonnel, {
        pdata: data,
      });
      if (response.status === 200)
        if (technoFile) {
          technoUpload();
        } else {
          setLoading(false);
          window.location.reload();
        }
    } else if (type === "client") {
      if (companyFile) {
        const response = await api().post(endpoints.importClient, {
          clientObj: data,
        });
        if (response.status === 200)
          if (clientTechnoFile) {
            const respon = await api().post(endpoints.importClientTechno, {
              clientTechnoData: clientTechnoData,
            });
            if (respon.status === 200) {
              setLoading(false);
              window.location.reload();
            }
          } else {
            setLoading(false);
            window.location.reload();
          }
      } else {
        if (clientTechnoFile) {
          const reponse = await api().post(endpoints.importClientTechno, {
            clientTechnoData: clientTechnoData,
          });
          if (reponse.status === 200) {
            setLoading(false);
            window.location.reload();
          }
        }
      }
    } else {
      if (technoFile) {
        technoUpload();
      }
    }
  };

  let chooseRadio = [
    { name: "Choose Existing", value: "existing" },
    { name: "Create New", value: "new" },
  ];

  let qcRadio = [
    { name: "Yes", value: "yes" },
    { name: "No", value: "no" },
  ];

  let uploadRadio = [
    { name: "Production", value: "production" },
    { name: "Staging", value: "staging" },
  ];

  const handleChooseRadioClick = (event) => {
    setChooseUpdate(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    setFileNameToUpdate(event.target.value);
  };
  // console.log("choice", chooseDB);
  return (
    <div className={classes.optionalDisplay}>
      <div className={classes.uploadGridHeader} style={{ minWidth: "255px" }}>
        <Text
          value={`Step 4 - Save File`}
          style={{ fontSize: "12px", color: "#ffffff" }}
        />
      </div>
      <hr />
      {type === "company" ? (
        <>
          <Grid container>
            {chooseRadio.map((y) => (
              <Grid
                item
                md={6}
                className={classes.gridItem}
                style={{ flexDirection: "inherit" }}
              >
                <Radio
                  checked={chooseUpdate === y.value}
                  onChange={handleChooseRadioClick}
                  value={y.value}
                  name="plan"
                  style={{ color: "#3c8dbc", marginTop: "-9px" }}
                />
                <Text value={y.name} style={{ fontSize: "12px" }} />
              </Grid>
            ))}
          </Grid>
          <hr style={{ marginTop: "3px" }} />
          <Grid container>
            <Grid
              item
              md={12}
              className={classes.gridItem}
              style={{ marginTop: 0, height: "5px" }}
            >
              {chooseUpdate === "new" ? (
                <form className={classes.textbox} noValidate autoComplete="off">
                  <TextField
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    onChange={handleSelectChange}
                  />
                </form>
              ) : (
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
                    <MenuItem value="" style={{ fontSize: 12 }} disabled>
                      Select One
                    </MenuItem>
                    {fileNamesArr.map((x) => (
                      <MenuItem value={x} style={{ fontSize: 12 }}>
                        {x}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid
              item
              md={12}
              className={classes.gridItem}
              style={{ marginTop: "35px", height: "5px", paddingLeft: "5px" }}
            >
              <Text
                value={`Manual QC done for company file`}
                style={{
                  fontSize: "12px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                }}
              />
            </Grid>
            {qcRadio.map((y) => (
              <Grid
                item
                md={6}
                className={classes.gridItem}
                style={{ flexDirection: "inherit", marginTop: "25px" }}
              >
                <Radio
                  checked={qc === y.value}
                  onChange={handleQcRadio}
                  value={y.value}
                  name="plan"
                  style={{ color: "#3c8dbc", marginTop: "-9px" }}
                />
                <Text value={y.name} style={{ fontSize: "12px" }} />
              </Grid>
            ))}
            {qc && (
              <>
                <Grid
                  item
                  md={12}
                  className={classes.gridItem}
                  style={{
                    marginTop: "5px",
                    height: "5px",
                    paddingLeft: "5px",
                  }}
                >
                  <Text
                    value={`Do you want to upload into production / staging DB`}
                    style={{
                      fontSize: "12px",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                    }}
                  />
                </Grid>
                {uploadRadio.map((y) => (
                  <Grid
                    item
                    md={6}
                    className={classes.gridItem}
                    style={{ flexDirection: "inherit", marginTop: "40px" }}
                  >
                    <Radio
                      checked={chooseDB === y.value}
                      onChange={handleUploadRadio}
                      value={y.value}
                      name="plan"
                      style={{ color: "#3c8dbc", marginTop: "-9px" }}
                    />
                    <Text value={y.name} style={{ fontSize: "12px" }} />
                  </Grid>
                ))}
              </>
            )}
            {chooseDB == "staging" || chooseDB == "production" ? (
              <Grid container className={classes.btnRoot}>
                <Grid item md={6}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#9e9e9e" }}
                    onClick={onCancel}
                  >
                    <Text
                      value={`Cancel`}
                      style={{ fontSize: "12px", color: "white" }}
                    />
                  </Button>
                </Grid>
                <Grid item md={6}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#1e88e5" }}
                    onClick={onProceed}
                  >
                    <Text
                      value={`Proceed`}
                      style={{ fontSize: "12px", color: "white" }}
                    />
                    {loading && (
                      <i
                        style={{ color: "white", marginLeft: "5px" }}
                        class="fas fa-spinner fa-pulse"
                      ></i>
                    )}
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
        </>
      ) : (
        <Grid
          container
          className={classes.btnRoot}
          style={{ marginTop: "410px" }}
        >
          <Grid item md={6}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#9e9e9e" }}
              onClick={onCancel}
            >
              <Text
                value={`Cancel`}
                style={{ fontSize: "12px", color: "white" }}
              />
            </Button>
          </Grid>
          <Grid item md={6}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#1e88e5" }}
              onClick={onProceed}
            >
              <Text
                value={`Proceed`}
                style={{ fontSize: "12px", color: "white" }}
              />
              {loading && (
                <i
                  style={{ color: "white", marginLeft: "5px" }}
                  class="fas fa-spinner fa-pulse"
                ></i>
              )}
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

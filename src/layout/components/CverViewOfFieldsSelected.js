import React, { useState, useEffect, useRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Paper,
  Divider,
  ButtonBase,
  Typography,
  Grid,
  TextField,
} from "@material-ui/core";
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
import Button from "@material-ui/core/Button";
import Text from "components/core/Text";
import Radio from "@material-ui/core/Radio";

import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import TrackInvertedSlider from "./Slider";

import CompanySelect from "../filterComponents/CompanySelect";
import CountrySelect from "../filterComponents/CountrySelect";
import YearIOSelect from "../filterComponents/YearIOSelect";
import ContactSelect from "../filterComponents/ContactSelect";
import RejectedSelect from "../filterComponents/RejectSelect";
import SectorSelect from "../filterComponents/SectorSelect";
import EmpSelect from "../filterComponents/EmpSelect";
import DescriptionSelect from "../filterComponents/DescriptionSelect";
import BizTypeSelect from "../filterComponents/BizTypeSelect";
import PresenceSelect from "../filterComponents/PresenceSelect";
//api
import api from "api";
//context
import endpoints from "constants/endpoints";
import { useAppValue } from "context/app";
import moment from "moment";

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
    color: theme.palette.text.secondary,
    overflowY: "hidden",
    marginLeft: "720px",
    width: "50%",
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
  inputText: {
    color: "rgba(0,0,0,0.87)",
    fontSize: "10px",
    letterSpacing: "0.5px",
    lineHeight: "28px",
    textAlign: "center",
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

const ComponentWithSlideBar = ({
  handleRadioCheck,
  checked,
  name,
  value,
  countItems,
  countAllData,
  Diff,
  filteredData,
  breakdownArr,
  index,
  count,
  sector,
}) => {
  const classes = useStyles();
  const [openBreakDown, setOpenBreakDown] = useState(false);
  // console.log("Count", count);
  // console.log('name',name);
  // console.log('AllCount',countItems('Company Name'))
  // console.log("value", value);
  return (
    <div
      style={{
        backgroundColor: "#dedede",
        margin: "2%",
      }}
    >
      <Grid container spacing={1} style={{ alignItems: "center", padding: 5 }}>
        <Grid item xs={1}>
          {/* <Radio
            checked={checked}
            onClick={() => {
              handleRadioCheck(value, !checked);
            }}
            name={value}
            value={value}
            style={{
              color: "#3c8dbc",
              marginTop: "-9px",
              cursor: "pointer",
            }}
          /> */}
        </Grid>
        <Grid item xs={11} style={{ marginInlineStart: "auto" }}>
          <Grid container style={{ alignItems: "flex-end" }}>
            <Grid item xs={4}>
              <Text
                value={value}
                style={{ fontSize: "12px", wordWrap: "break-word" }}
              />
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={6} style={{ marginBottom: "-3px" }}>
              <Grid container>
                <Grid
                  item
                  xs={11}
                  sm={11}
                  md={11}
                  style={{ position: "relative" }}
                >
                  <TrackInvertedSlider
                    // percent={(countItems(name) / countAllData(name)) * 100}
                    // aLabel={countItems(name)}
                    // mLabel={countAllData(name) - countItems(name)}
                    // a={
                    //   ((countItems(name) - filteredData.length) /
                    //     countAllData(name)) *
                    //   100
                    // }
                    // m={((countItems(name) + Diff) / countAllData(name)) * 100}
                    filterlenght={filteredData.length}
                    percent={(countItems(name) / filteredData.length) * 100}
                    aLabel={countItems(name)}
                    mLabel={filteredData.length - countItems(name)}
                    a={
                      0
                      // ((countItems(name) - filteredData.length) /
                      //   filteredData.length) *
                      // 100
                    }
                    m={
                      100
                      // ((countItems(name) + Diff) / filteredData.length) * 100
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const ComponentData = ({
  handleRadioCheck,
  checked,
  name,
  value,
  countItems,
  countAllData,
  Diff,
  filteredData,
  breakdownArr,
  index,
  count,
}) => {
  const classes = useStyles();
  const [openBreakDown, setOpenBreakDown] = useState(false);
  // console.log("name", name);
  // console.log("value", value);
  // console.log("breakDoqn", breakdownArr);
  // console.log("Count", count);
  // console.log("name", name);
  // console.log("AllCount", countItems("Company Name"));
  // console.log("filter", filteredData.length);
  return (
    <div
      style={{
        backgroundColor: name == "Rejected" ? "#DAE3F4" : "#dedede",
        margin: "2%",
      }}
    >
      {name == "Rejected" && (
        <>
          <Grid container spacing={1}>
            <Grid item xs={1} />
            <Grid item xs={4}>
              <Text value={"Date Uploaded"} />
            </Grid>
            <Grid item xs={6}>
              {/* <TextField
                style={{
                  backgroundColor: "white",
                }}
                InputProps={classes.inputText}
                value={moment().format("LL")}
              /> */}
              <div style={{ backgroundColor: "white", padding: 3 }}>
                <Text
                  value={moment().format("LL")}
                  style={{ alignItem: "center", fontSize: "10" }}
                />
              </div>
              <Grid item xs={1} />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={1} />
            <Grid item xs={4}>
              <Text value={"QC Complete Date"} />
            </Grid>
            <Grid item xs={6}>
              {/* <TextField
                style={{
                  backgroundColor: "white",
                }}
                InputProps={classes.inputText}
                value={"No QC Done"}
              /> */}
              <div style={{ backgroundColor: "white", padding: 3 }}>
                <Text
                  value={"No QC Done"}
                  style={{ alignItem: "center", fontSize: "10" }}
                />
              </div>
              <Grid item xs={1} />
            </Grid>
          </Grid>
        </>
      )}
      {name == "Sale Channel" && (
        <Grid item xs={12}>
          <Typography style={{ textAlign: "left" }}>Sales Channel</Typography>
        </Grid>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginLeft: "36%",
          paddingTop: 5,
        }}
      >
        <Text value={"Available Field Type"} style={{ fontSize: 10 }} />
        <Text value={"Missing Field Type"} style={{ fontSize: 10 }} />
      </div>
      {name == "Sale Channel" ||
        name == "Rejected" ||
        name == "Phone" ||
        name == "Website" ||
        name == "LinkedIn" ||
        name == "Facebook" ||
        name == "Twitter" ||
        name == "Instagram" ||
        name == "Youtube" ||
        name == "Website" ||
        name == "Sector" ? (
          value.map((key) => (
            <Grid
              container
              spacing={1}
              style={{ alignItems: "center", padding: 5 }}
            >
              <Grid item xs={1}>
                <Radio
                  checked={checked}
                  onClick={() => {
                    handleRadioCheck(key, !checked);
                  }}
                  name={key}
                  value={key}
                  style={{
                    color: "#3c8dbc",
                    marginTop: "-9px",
                    cursor: "pointer",
                  }}
                />
              </Grid>
              <Grid item xs={11} style={{ marginInlineStart: "auto" }}>
                <Grid container style={{ alignItems: "flex-end" }}>
                  <Grid item xs={4}>
                    <Text
                      value={key}
                      style={{ fontSize: "12px", wordWrap: "break-word" }}
                    />
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={6} style={{ marginBottom: "-3px" }}>
                    <Grid container>
                      <Grid
                        item
                        xs={11}
                        sm={11}
                        md={11}
                        style={{ position: "relative" }}
                      >
                        <TrackInvertedSlider
                          filterlenght={filteredData.length}
                          percent={(countItems(key) / filteredData.length) * 100}
                          aLabel={countItems(key)}
                          mLabel={filteredData.length - countItems(key)}
                          a={
                            0
                            // ((countItems(key) - filteredData.length) /
                            //   filteredData.length) *
                            // 100
                          }
                          m={
                            100
                            // ((countItems(key) + Diff) / filteredData.length) * 100
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
              </Grid>
            </Grid>
          ))
        ) : (
          <Grid
            container
            spacing={1}
            style={{ alignItems: "center", padding: 5 }}
          >
            <Grid item xs={1}>
              <Radio
                checked={checked}
                onClick={() => {
                  handleRadioCheck(value, !checked);
                }}
                name={value}
                value={value}
                style={{
                  color: "#3c8dbc",
                  marginTop: "-9px",
                  cursor: "pointer",
                }}
              />
            </Grid>
            <Grid item xs={11} style={{ marginInlineStart: "auto" }}>
              <Grid container style={{ alignItems: "flex-end" }}>
                <Grid item xs={4}>
                  <Text
                    value={value}
                    style={{ fontSize: "12px", wordWrap: "break-word" }}
                  />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={6} style={{ marginBottom: "-3px" }}>
                  <Grid container>
                    <Grid
                      item
                      xs={11}
                      sm={11}
                      md={11}
                      style={{ position: "relative" }}
                    >
                      <TrackInvertedSlider
                        // percent={(countItems(name) / countAllData(name)) * 100}
                        // aLabel={countItems(name)}
                        // mLabel={countAllData(name) - countItems(name)}
                        // a={
                        //   ((countItems(name) - filteredData.length) /
                        //     countAllData(name)) *
                        //   100
                        // }
                        // m={((countItems(name) + Diff) / countAllData(name)) * 100}
                        filterlenght={filteredData.length}
                        percent={(countItems(name) / filteredData.length) * 100}
                        aLabel={countItems(name)}
                        mLabel={filteredData.length - countItems(name)}
                        a={
                          0
                          // ((countItems(name) - filteredData.length) /
                          //   filteredData.length) *
                          // 100
                        }
                        m={
                          100
                          // ((countItems(name) + Diff) / filteredData.length) * 100
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      {breakdownArr && (
        <Grid container spacing={1} style={{ alignItems: "center" }}>
          <Grid item xs={1}>
            {openBreakDown ? (
              <Typography
                style={{ cursor: "pointer", fontSize: 22 }}
                onClick={() => setOpenBreakDown(!openBreakDown)}
              >
                -
              </Typography>
            ) : (
                <Typography
                  style={{ cursor: "pointer", fontSize: 22 }}
                  onClick={() => setOpenBreakDown(!openBreakDown)}
                >
                  +
                </Typography>
              )}
          </Grid>
          <Grid item xs={11}>
            <Typography style={{ textAlign: "left" }}>BreakDown</Typography>
          </Grid>
          {openBreakDown &&
            Object.keys(breakdownArr).map((key, i) => (
              <Grid
                container
                spacing={1}
                style={{ alignItems: "center", padding: 5 }}
              >
                <Grid item xs={1}></Grid>
                <Grid item xs={11} style={{ marginInlineStart: "auto" }}>
                  <Grid container style={{ alignItems: "flex-end" }}>
                    <Grid item xs={4}>
                      <Text
                        value={key}
                        style={{ fontSize: "12px", wordWrap: "break-word" }}
                      />
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={6} style={{ marginBottom: "-3px" }}>
                      <Grid container>
                        <Grid
                          item
                          xs={11}
                          sm={11}
                          md={11}
                          style={{ position: "relative" }}
                        >
                          <TrackInvertedSlider
                            filterlenght={filteredData.length}
                            percent={
                              countItems(name) == 0
                                ? 0
                                : (breakdownArr[key] / countItems(name)) * 100
                            }
                            aLabel={
                              countItems(name) == 0 ? 0 : breakdownArr[key]
                            }
                            mLabel={
                              countItems(name) == 0
                                ? 0
                                : countItems(name) - breakdownArr[key]
                            }
                            a={
                              0
                              // ((countItems(key) - filteredData.length) /
                              //   countAllData(key)) *
                              // 100
                            }
                            m={
                              // ((countItems(key) + Diff) / countAllData(key)) *
                              100
                            }
                            colorCode={true}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={1} />
                  </Grid>
                </Grid>
              </Grid>
            ))}
        </Grid>
      )}
    </div>
  );
};
const ComponentDataContact = ({
  handleRadioCheck,
  checked,
  name,
  value,
  countItems,
  countAllData,
  Diff,
  filteredData,
  breakdownArr,
  index,
  count,
}) => {
  const classes = useStyles();
  const [openBreakDown, setOpenBreakDown] = useState(false);

  return (
    <div
      style={{
        backgroundColor: name == "Rejected" ? "#DAE3F4" : "#dedede",
        margin: "2%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginLeft: "36%",
          paddingTop: 5,
        }}
      >
        <Text value={"Available Field Type"} style={{ fontSize: 10 }} />
        <Text value={"Missing Field Type"} style={{ fontSize: 10 }} />
      </div>
      {name == "Website" ? (
        <Grid
          container
          spacing={1}
          style={{ alignItems: "center", padding: 5 }}
        >
          <Grid item xs={1}>
            <Radio
              checked={checked}
              onClick={() => {
                handleRadioCheck(name, !checked);
              }}
              name={name}
              value={name}
              style={{
                color: "#3c8dbc",
                marginTop: "-9px",
                cursor: "pointer",
              }}
            />
          </Grid>
          {value.map((key) => (
            <Grid item xs={11} style={{ marginInlineStart: "auto" }}>
              <Grid container style={{ alignItems: "flex-end" }}>
                <Grid item xs={4}>
                  <Text
                    value={key}
                    style={{ fontSize: "12px", wordWrap: "break-word" }}
                  />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={6} style={{ marginBottom: "-3px" }}>
                  <Grid container>
                    <Grid
                      item
                      xs={11}
                      sm={11}
                      md={11}
                      style={{ position: "relative" }}
                    >
                      <TrackInvertedSlider
                        filterlenght={filteredData.length}
                        percent={(countItems(key) / filteredData.length) * 100}
                        aLabel={countItems(key)}
                        mLabel={filteredData.length - countItems(key)}
                        a={
                          0
                          // ((countItems(key) - filteredData.length) /
                          //   filteredData.length) *
                          // 100
                        }
                        m={
                          100
                          // ((countItems(key) + Diff) / filteredData.length) * 100
                        }
                        colorCode={
                          key == "Description" ||
                            key == "Title" ||
                            key == "Description(LinkedIn)" ||
                            key == "Description(Facebook)" ||
                            key == "Description(Instagram)"
                            ? true
                            : false
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      ) : (
          value.map((key) => (
            <Grid
              container
              spacing={1}
              style={{ alignItems: "center", padding: 5 }}
            >
              {key == "Description(LinkedIn)" ||
                key == "Description(Facebook)" ||
                key == "Description(Instagram)" ||
                key == "Twitter" ||
                key == "Twitter Followers" ||
                key == "Youtube" ||
                key == "Youtube Subscribers" ? (
                  <Grid item xs={1}></Grid>
                ) : (
                  <Grid item xs={1}>
                    <Radio
                      checked={checked}
                      onClick={() => {
                        handleRadioCheck(key, !checked);
                      }}
                      name={key}
                      value={key}
                      style={{
                        color: "#3c8dbc",
                        marginTop: "-9px",
                        cursor: "pointer",
                      }}
                    />
                  </Grid>
                )}
              <Grid item xs={11} style={{ marginInlineStart: "auto" }}>
                <Grid container style={{ alignItems: "flex-end" }}>
                  <Grid item xs={4}>
                    <Text
                      value={key}
                      style={{ fontSize: "12px", wordWrap: "break-word" }}
                    />
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={6} style={{ marginBottom: "-3px" }}>
                    <Grid container>
                      <Grid
                        item
                        xs={11}
                        sm={11}
                        md={11}
                        style={{ position: "relative" }}
                      >
                        <TrackInvertedSlider
                          filterlenght={filteredData.length}
                          percent={(countItems(key) / filteredData.length) * 100}
                          aLabel={countItems(key)}
                          mLabel={filteredData.length - countItems(key)}
                          a={
                            0
                            // ((countItems(key) - filteredData.length) /
                            //   filteredData.length) *
                            // 100
                          }
                          m={
                            100
                            // ((countItems(key) + Diff) / filteredData.length) * 100
                          }
                          colorCode={
                            key == "Description(LinkedIn)" ||
                              key == "Description(Facebook)" ||
                              key == "Description(Instagram)"
                              ? true
                              : false
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
              </Grid>
            </Grid>
          ))
        )}
    </div>
  );
};
export default function CverViewOfFieldsSelected({
  data,
  setNext,
  newColumnArr,
  setCverViewOfFieldsSelected,
  filteredData,
  setFilteredData,
  saveSelect,
  saveUnAssignedSelect,
  sectorDataObj,
  sectorSelect,
}) {
  const classes = useStyles();
  const [countrySelect, setCountrySelect] = useState("");
  const [radioCheck, setRadioCheck] = useState({});

  const [filter, setFilter] = useState({});
  const [reload, setReload] = useState(0);
  const [filterClearData, setFilterClearData] = useState([]);
  const [breakdownData, setBreakdownData] = useState({});
  const [rejectedData, setRejectedData] = useState({});
  const [sectorArrayData, setSectorArrayData] = useState({});
  const [state, dispatch] = useAppValue();
  const {
    companyUploadFilter,
    companyUploadFilter2,
    companyUploadFilter3,
    companyUploadFilter4,
    companyUploadFilter5,
  } = state;
  const [count, setCount] = useState(0);
  let value = ["Indonesia", "Myanmar"];
  let CompanyObj = { Rejected: ["Company Name", "Rejected"] };
  let CompanyContactData = {
    Phone: ["Phone", "whatsapp/line"],
    "Company Email": ["Company Email"],
    Website: ["Website", "Title", "Description"],
    LinkedIn: ["LinkedIn", "LinkedIn Followers", "Description(LinkedIn)"],
    Facebook: ["Facebook", "Facebook Likes", "Description(Facebook)"],
    Instagram: [
      "Instagram",
      "Instagram Posts",
      "Instagram Followers",
      "Description(Instagram)",
    ],
    Twitter: ["Twitter", "Twitter Followers"],
    Youtube: ["Youtube", "Youtube Subscribers"],
  };

  let CompanyInfo = {
    Country: "Country",
    biz_type: "Business Type",
    "Years in Operation": "Years in Operation",
    "Employee Size": "Employee Size",
    "Sale Channel": ["Physical Store", "Online Store", "MarketPlace"],
    "HQ Location": "HQ Location",
    "Country Presence": "Country Presence",
    "City Presence": "City Presence",
  };

  const setFilterFunc = (obj) => {
    setFilter((old) => {
      return {
        ...old,
        ...obj,
      };
    });
  };

  // useEffect(() => {
  //   let temp = data.filter((item) => {
  //     for (let key in filter) {
  //       console.log("compare", item[key], filter[key]);
  //       if (!item[key] || item[key] != filter[key]) return false;
  //     }
  //     return true;
  //   });
  //   setFilteredData(temp);
  //   // need to back
  // }, [filter]);

  useEffect(() => {
    let temp = [...data];

    if (Object.keys(companyUploadFilter).length) {
      // console.log("companyUploadFilter", companyUploadFilter);
      // check field by field data
      temp = temp.filter((item) => {
        for (let key in companyUploadFilter) {
          // console.log("compare", item[key], companyUploadFilter[key]);

          // //without blank data
          // if (!item[key] || !companyUploadFilter[key].includes(item[key])) return false;

          //with blank data
          if (!item[key] && companyUploadFilter[key].includes("Blank"))
            return true;
          if (!item[key] || !companyUploadFilter[key].includes(item[key])) {
            // console.log("here");
            return false;
          }
        }

        return true;
      });
      // temp = temp.filter((i) => {
      //   for (let key in companyUploadFilter) {
      //     if (i[key]) {
      //       if (companyUploadFilter[key].includes(i[key])) {
      //         return i;
      //       }
      //     } else {
      //       if (companyUploadFilter[key].includes("undefined")) {
      //         return i;
      //       } else if (companyUploadFilter[key].includes("Blank")) {
      //         return i;
      //       }
      //     }
      //   }
      // });
    }

    if (Object.keys(companyUploadFilter4).length) {
      // console.log("companyUploadFilter4", companyUploadFilter4);
      temp = temp.filter((item) => {
        for (let key in companyUploadFilter4) {
          if (
            !item[key] ||
            !companyUploadFilter4[key].some((x) =>
              Object.keys(item[key]).includes(x)
            )
          )
            return false;
          if (!companyUploadFilter4[key].length) return true;
          if (
            !item[key] ||
            !companyUploadFilter4[key].some((x) =>
              Object.keys(item[key]).includes(x)
            )
          )
            return false;
        }
        return true;
      });
    }

    if (Object.keys(companyUploadFilter2).length) {
      // console.log("companyUploadFilter2", companyUploadFilter2);
      // // check field not blank
      // temp = temp.filter((item) => {
      //   for (let key of companyUploadFilter2) {
      //     if (!item[key]) return false;
      //   }
      //   return true;
      // });

      // check field includes
      let fields = [];

      for (let key of Object.keys(companyUploadFilter2)) {
        fields.push(...companyUploadFilter2[key]);
      }

      // console.log("fields", fields);
      // if (fields.length) {
      //   temp = temp.filter((item) => {
      //     for (let key of fields) {
      //       if (item[key]) return true;
      //     }
      //     return false;
      //   });
      // }
      if (fields.length) {
        temp = temp.filter((item) => {
          for (let key of fields) {
            if (!item[key]) return false;
          }
          return true;
        });
      }
    }

    if (Object.keys(companyUploadFilter3).length) {
      // console.log("companyUploadFilter3", companyUploadFilter3);
      let fields = [],
        Description_0 = [],
        Description_1 = [],
        Description_2 = [],
        Description_3 = [],
        Description_4 = [],
        Description_5 = [],
        countryCount_1 = [],
        countryCount_2 = [],
        countryCount_3 = [],
        countryCount_4 = [],
        countryCount_5 = [],
        cityCount_1 = [],
        cityCount_2 = [],
        cityCount_3 = [],
        cityCount_4 = [],
        cityCount_5 = [],
        Description_Title = [],
        Description_FB = [],
        Description_Li = [],
        Description_Ins = [],
        Description_Web = [],
        contact_1 = [],
        contact_2 = [],
        contact_3 = [],
        contact_4 = [],
        contact_5 = [],
        contact_6 = [],
        contact_7 = [],
        contact_8 = [],
        contact_9 = [],
        bizType_0 = [],
        bizType_1 = [],
        bizType_2 = [],
        bizType_3 = [],
        bizType_4 = [],
        bizType_5 = [];

      for (let key of Object.keys(companyUploadFilter3)) {
        if (
          key == "contact" &&
          companyUploadFilter3[key].length &&
          companyUploadFilter3[key].length !== 9
        ) {
          let index = 0;
          for (let each of companyUploadFilter3[key]) {
            let tempArr = [...temp];
            index += 1;
            if (each == "Phone, Whatsapp & Email") {
              contact_1 = tempArr.filter((item) => {
                if (
                  item["Phone"] &&
                  item["whatsapp/line"] &&
                  item["Company Email"]
                )
                  return true;
                return false;
              });
            }
            if (each == "Phone/Whatsapp & Email") {
              contact_2 = tempArr.filter((item) => {
                if (
                  (item["Phone"] || item["whatsapp/line"]) &&
                  item["Company Email"]
                )
                  return true;
                return false;
              });
            }
            if (each == "Phone & Whatsapp") {
              contact_3 = tempArr.filter((item) => {
                if (item["Phone"] && item["whatsapp/line"]) return true;
                return false;
              });
            }
            if (each == "Phone/Whatsapp") {
              contact_4 = tempArr.filter((item) => {
                if (item["Phone"] || item["whatsapp/line"]) return true;
                return false;
              });
            }
            if (each == "Phone & Email") {
              contact_5 = tempArr.filter((item) => {
                if (item["Phone"] && item["Company Email"]) return true;
                return false;
              });
            }
            if (each == "Whatsapp & Email") {
              contact_6 = tempArr.filter((item) => {
                if (item["whatsapp/line"] && item["Company Email"]) return true;
                return false;
              });
            }
            if (each == "Just Phone") {
              contact_7 = tempArr.filter((item) => {
                if (
                  item["Phone"] &&
                  !item["whatsapp/line"] &&
                  !item["Company Email"]
                )
                  return true;
                return false;
              });
            }
            if (each == "Just Whatsapp") {
              contact_8 = tempArr.filter((item) => {
                if (
                  !item["Phone"] &&
                  item["whatsapp/line"] &&
                  !item["Company Email"]
                )
                  return true;
                return false;
              });
            }
            if (each == "Just Email") {
              contact_9 = tempArr.filter((item) => {
                if (
                  !item["Phone"] &&
                  !item["whatsapp/line"] &&
                  item["Company Email"]
                )
                  return true;
                return false;
              });
            }
          }

          // console.log("contact_1", contact_1.length);
          // console.log("contact_2", contact_2.length);
          // console.log("contact_3", contact_3.length);
          // console.log("contact_4", contact_4.length);
          // console.log("contact_5", contact_5.length);
          // console.log("contact_6", contact_6.length);
          // console.log("contact_7", contact_7.length);
          // console.log("contact_8", contact_8.length);
          // console.log("contact_9", contact_9.length);

          temp = [
            ...new Set([
              ...contact_1,
              ...contact_2,
              ...contact_3,
              ...contact_4,
              ...contact_5,
              ...contact_6,
              ...contact_7,
              ...contact_8,
              ...contact_9,
            ]),
          ];

          // console.log("union", temp.length);
        }
        if (key == "CountryCount" && companyUploadFilter3[key].length !== 10) {
          let index = 0;
          for (let each of companyUploadFilter3[key]) {
            let tempArr = [...temp];
            index += 1;
            if ((each = "Blank")) {
              countryCount_1 = tempArr.filter((item) => {
                if (!item["Country Presence"]) return true;
                return false;
              });
            }
            if ((each = "1 Country")) {
              countryCount_2 = tempArr.filter((item) => {
                if (item["Country Presence"].split("|").length === 1)
                  // console.log("itemC", item["Country Presence"]);
                  return true;
                return false;
              });
            }
            if ((each = "2-5 Country")) {
              countryCount_3 = tempArr.filter((item) => {
                if (
                  item["Country Presence"].split("|").length >= 2 &&
                  item["Country Presence"].split("|").length <= 5
                )
                  return true;
                return false;
              });
            }
            if ((each = "6-20 Country")) {
              countryCount_4 = tempArr.filter((item) => {
                if (
                  item["Country Presence"].split("|").length >= 6 &&
                  item["Country Presence"].split("|").length <= 20
                )
                  return true;
                return false;
              });
            }
            if ((each = ">20 Country")) {
              countryCount_5 = tempArr.filter((item) => {
                if (item["Country Presence"].split("|").length > 20)
                  return true;
                return false;
              });
            }
          }
          // console.log("country1", countryCount_1.length);
          // console.log("country2", countryCount_2.length);
          // console.log("country3", countryCount_3.length);
          // console.log("country4", countryCount_4.length);
          // console.log("country5", countryCount_5.length);
          temp = [
            ...new Set([
              ...countryCount_1,
              ...countryCount_2,
              ...countryCount_3,
              ...countryCount_4,
              ...countryCount_5,
            ]),
          ];
        }
        if (key == "CityCount" && companyUploadFilter3[key].length !== 11) {
          let index = 0;
          for (let each of companyUploadFilter3[key]) {
            let tempArr = [...temp];
            index += 1;
            if ((each = "Blank")) {
              cityCount_1 = tempArr.filter((item) => {
                if (!item["City Presence"]) return true;
                return false;
              });
            }
            if ((each = "1 City")) {
              cityCount_2 = tempArr.filter((item) => {
                if (item["City Presence"].split("|").length === 1) return true;
                return false;
              });
            }
            if ((each = "2-5 City")) {
              cityCount_3 = tempArr.filter((item) => {
                if (
                  item["City Presence"].split("|").length >= 2 &&
                  item["City Presence"].split("|").length <= 5
                )
                  return true;
                return false;
              });
            }
            if ((each = "6-20 City")) {
              cityCount_4 = tempArr.filter((item) => {
                if (
                  item["City Presence"].split("|").length >= 6 &&
                  item["City Presence"].split("|").length <= 20
                )
                  return true;
                return false;
              });
            }
            if ((each = ">20 City")) {
              cityCount_5 = tempArr.filter((item) => {
                if (item["City Presence"].split("|").length > 20) return true;
                return false;
              });
            }
          }
          // console.log("city1", cityCount_1.length);
          // console.log("city2", cityCount_2.length);
          // console.log("city3", cityCount_3.length);
          // console.log("city4", cityCount_4.length);
          // console.log("city5", cityCount_5.length);
          temp = [
            ...new Set([
              ...cityCount_1,
              ...cityCount_2,
              ...cityCount_3,
              ...cityCount_4,
              ...cityCount_5,
            ]),
          ];
        }
        if (key == "Description" && companyUploadFilter3[key].length !== 11) {
          if (
            key == "Description" &&
            companyUploadFilter3[key].length &&
            companyUploadFilter3[key].length !== 11
          ) {
            const descriptionCount = (record) => {
              let count = 0;
              if (record["Title"]) count++;
              if (record["Description"]) count++;
              if (record["Description(LinkedIn)"]) count++;
              if (record["Description(Facebook)"]) count++;
              if (record["Description(Instagram)"]) count++;
              return count;
            };

            let index = 0;
            for (let each of companyUploadFilter3[key]) {
              let tempArr = [...temp];
              index += 1;
              if (each == "Blank") {
                Description_0 = tempArr.filter((item) => {
                  if (descriptionCount(item) == 0) return true;
                  return false;
                });
              }
              if (each == "1 Description Available") {
                Description_1 = tempArr.filter((item) => {
                  if (descriptionCount(item) == 1) return true;
                  return false;
                });
              }
              if (each == "2 Description Available") {
                Description_2 = tempArr.filter((item) => {
                  if (descriptionCount(item) == 2) return true;
                  return false;
                });
              }
              if (each == "3 Description Available") {
                Description_3 = tempArr.filter((item) => {
                  if (descriptionCount(item) == 3) return true;
                  return false;
                });
              }
              if (each == "4 Description Available") {
                Description_4 = tempArr.filter((item) => {
                  if (descriptionCount(item) == 4) return true;
                  return false;
                });
              }
              if (each == "5 Description Available") {
                Description_5 = tempArr.filter((item) => {
                  if (descriptionCount(item) == 5) return true;
                  return false;
                });
              }
              if (each == "Title") {
                Description_Title = tempArr.filter((item) => {
                  if (item["Title"]) return true;
                  return false;
                });
              }
              if (each == "Description") {
                Description_Web = tempArr.filter((item) => {
                  if (item["Description"]) return true;
                  return false;
                });
              }
              if (each == "Description(LinkedIn)") {
                Description_Li = tempArr.filter((item) => {
                  if (item["Description(LinkedIn)"]) return true;
                  return false;
                });
              }
              if (each == "Description(Facebook)") {
                Description_FB = tempArr.filter((item) => {
                  if (item["Description(Facebook)"]) return true;
                  return false;
                });
              }
              if (each == "Description(Instagram)") {
                Description_Ins = tempArr.filter((item) => {
                  if (item["Description(Instagram)"]) return true;
                  return false;
                });
              }
            }
            // console.log("d0", Description_0.length);
            // console.log("d1", Description_1.length);
            // console.log("d2", Description_2.length);
            // console.log("d3", Description_3.length);
            // console.log("d4", Description_4.length);
            // console.log("d5", Description_5.length);
            // console.log("Fb", Description_FB.length);
            // console.log("Ins", Description_Ins.length);
            // console.log("Li", Description_Li.length);
            // console.log("Desc", Description_Web.length);
            // console.log("Title", Description_Title.length);
            temp = [
              ...new Set([
                ...Description_0,
                ...Description_1,
                ...Description_2,
                ...Description_3,
                ...Description_4,
                ...Description_5,
                ...Description_FB,
                ...Description_Ins,
                ...Description_Li,
                ...Description_Web,
                ...Description_Title,
              ]),
            ];
          }
        }
        if (
          key == "biz_type" &&
          companyUploadFilter3[key].length &&
          companyUploadFilter3[key].length !== 7
        ) {
          for (let each of companyUploadFilter3[key]) {
            let tempArr = [...temp];
            if (each == 0) {
              bizType_0 = tempArr.filter((item) => {
                if (Object.keys(item.biz_type).length == each) return true;
                return false;
              });
            }
            if (each == 1) {
              bizType_1 = tempArr.filter((item) => {
                if (Object.keys(item.biz_type).length == each) return true;
                return false;
              });
            }
            if (each == 2) {
              bizType_2 = tempArr.filter((item) => {
                if (Object.keys(item.biz_type).length == each) return true;
                return false;
              });
            }
            if (each == 3) {
              bizType_3 = tempArr.filter((item) => {
                if (Object.keys(item.biz_type).length == each) return true;
                return false;
              });
            }
            if (each == 4) {
              bizType_4 = tempArr.filter((item) => {
                if (Object.keys(item.biz_type).length == each) return true;
                return false;
              });
            }
            if (each == 5) {
              bizType_5 = tempArr.filter((item) => {
                if (Object.keys(item.biz_type).length == each) return true;
                return false;
              });
            }
          }
          // console.log("bizType_0", bizType_0.length);
          // console.log("bizType_1", bizType_1.length);
          // console.log("bizType_2", bizType_2.length);
          // console.log("bizType_3", bizType_3.length);
          // console.log("bizType_4", bizType_4.length);
          // console.log("bizType_5", bizType_5.length);

          temp = [
            ...new Set([
              ...bizType_0,
              ...bizType_1,
              ...bizType_2,
              ...bizType_3,
              ...bizType_4,
              ...bizType_5,
            ]),
          ];
        }

        if (key == "yearIO") {
          // do mot remove
          for (let each of companyUploadFilter3[key]) {
            let { min, max, selectValue } = each;
            temp = temp.filter((item) => {
              let value = item["Years in Operation"];
              if (value) {
                value = parseInt(value);
                if (selectValue == "<" && value < max) return true;
                else if (selectValue == ">" && min < value) return true;
                else if (value >= min && value <= max) return true;
              }
              return false;
            });
          }
          // console.log("check", companyUploadFilter3[key]);
        }
        if (key == "EmpSize") {
          // do mot remove
          for (let each of companyUploadFilter3[key]) {
            let { min, max, selectValue } = each;
            temp = temp.filter((item) => {
              let value = item["Employee Size"];
              if (value) {
                value = parseInt(value);
                if (selectValue == "<" && value < max) return true;
                else if (selectValue == ">" && min < value) return true;
                else if (value >= min && value <= max) return true;
              }
              return false;
            });
          }
        }

        // console.log("union 1", temp.length);
      }
    }

    setFilteredData(temp);
    // need to back
  }, [
    companyUploadFilter,
    companyUploadFilter2,
    companyUploadFilter3,
    companyUploadFilter4,
  ]);
  // console.log("c1", companyUploadFilter);
  // console.log("c2", companyUploadFilter2);
  // console.log("c3", companyUploadFilter3);
  // console.log("c4", companyUploadFilter4);
  useEffect(() => {
    let HQLocation = {},
      PScount = 0,
      OScount = 0,
      MPcount = 0,
      PSOScount = 0,
      PSMPcount = 0,
      OSMPcount = 0,
      PSOSMPcount = 0,
      saleChannel = {},
      MarketPlace = {},
      countryPressence = {},
      CityPresence = {},
      YearsInOperation = {},
      EmployeeSize = {},
      sectorObj = {},
      BusinessType = {},
      Country = {},
      Directory = 0,
      ChamberAssociation = 0,
      Blank = 0,
      noLocalPresence = 0,
      Rejected = {};

    for (let row of filteredData) {
      if (row["HQ Location"]) {
        if (!HQLocation[row["HQ Location"]]) HQLocation[row["HQ Location"]] = 0;
        HQLocation[row["HQ Location"]] += 1;
      }

      if (row["sector"]) {
        for (let each of Object.keys(row["sector"])) {
          if (!sectorObj[each]) sectorObj[each] = 0;
          sectorObj[each] += 1;
        }
      }

      if (row["biz_type"]) {
        for (let each of Object.keys(row["biz_type"])) {
          if (!BusinessType[each]) BusinessType[each] = 0;
          BusinessType[each] += 1;
        }
      }

      if (row["Rejected"]) {
        let tempArr = row["Rejected"];
        if ([""].every((item) => tempArr.includes(item))) Blank += 1;
        if (["Chamber/Association"].every((item) => tempArr.includes(item)))
          ChamberAssociation += 1;
        if (["Directory"].every((item) => tempArr.includes(item)))
          Directory += 1;
        if (["no local presence"].every((item) => tempArr.includes(item)))
          noLocalPresence += 1;
      }

      if (row["Sales Channel"]) {
        let tempArr = row["Sales Channel"].split("|");

        tempArr.splice(tempArr.indexOf("marketplace"), 1, "Marketplace");
        tempArr.splice(tempArr.indexOf("market place"), 1, "Marketplace");

        for (let type of tempArr) {
          if (type == "Physical Store") PScount += 1;
          if (type == "Online Store") OScount += 1;
          if (type == "Marketplace") MPcount += 1;
          if (!MarketPlace[type]) MarketPlace[type] = 0;
          MarketPlace[type] += 1;
        }
        if (
          ["Physical Store", "Online Store"].every((item) =>
            tempArr.includes(item)
          )
        )
          PSOScount += 1;
        if (
          ["Physical Store", "Marketplace"].every((item) =>
            tempArr.includes(item)
          )
        )
          PSMPcount += 1;
        if (
          ["Online Store", "Marketplace"].every((item) =>
            tempArr.includes(item)
          )
        )
          OSMPcount += 1;
        if (
          ["Physical Store", "Online Store", "Marketplace"].every((item) =>
            tempArr.includes(item)
          )
        )
          PSOSMPcount += 1;

        if (!saleChannel[row["Sales Channel"]])
          saleChannel[row["Sales Channel"]] = 0;
        saleChannel[row["Sales Channel"]] += 1;
      }

      if (row["Country Presence"]) {
        let tempArr = row["Country Presence"].split("|");

        for (let country of tempArr) {
          if (!countryPressence[country]) countryPressence[country] = 0;
          countryPressence[country] += 1;
        }
      }

      if (row["City Presence"]) {
        let tempArr = row["City Presence"].split("|");

        for (let city of tempArr) {
          if (!CityPresence[city]) CityPresence[city] = 0;
          CityPresence[city] += 1;
        }
      }

      if (row["Years in Operation"]) {
        if (!YearsInOperation[row["Years in Operation"]])
          YearsInOperation[row["Years in Operation"]] = 0;
        YearsInOperation[row["Years in Operation"]] += 1;
      }

      if (row["Employee Size"]) {
        if (!EmployeeSize[row["Employee Size"]])
          EmployeeSize[row["Employee Size"]] = 0;
        EmployeeSize[row["Employee Size"]] += 1;
      }

      if (row["Country"]) {
        if (!Country[row["Country"]]) Country[row["Country"]] = 0;
        Country[row["Country"]] += 1;
      }
    }

    const sortedHQObj = Object.fromEntries(
      Object.entries(HQLocation).sort(([, a], [, b]) => b - a)
    );

    // console.log("sortedHQObj", sortedHQObj);
    // console.log("saleChannel2", MarketPlace);
    // console.log("Rejected", Rejected);
    // console.log("combination saleChannel", {
    //   PScount,
    //   OScount,
    //   MPcount,
    //   PSOScount,
    //   PSMPcount,
    //   OSMPcount,
    //   PSOSMPcount,
    // });
    // console.log("countryPressenceObj", countryPressence);
    // console.log("cityPressenceObj", CityPresence);
    // console.log("YIOobj", YearsInOperation);
    // console.log("countryObj", Country);
    // console.log("sector", sectorObj);
    // console.log("bizType", BusinessType);
    // console.log("hq", HQLocation);
    setRejectedData({ Directory, ChamberAssociation, Blank, noLocalPresence });
    setBreakdownData({
      Country: Country,
      biz_type: BusinessType,
      "Years in Operation": YearsInOperation,
      "Employee Size": EmployeeSize,
      "Sale Channel": {
        PScount: PScount,
        OScount,
        MPcount,
        PSOScount,
        PSMPcount,
        OSMPcount,
        PSOSMPcount,
      },
      "HQ Location": sortedHQObj,
      "Country Presence": countryPressence,
      "City Presence": CityPresence,
    });
    // console.log("hello", {
    //   Directory,
    //   ChamberAssociation,
    //   Blank,
    //   noLocalPresence,
    // });
    setSectorArrayData(sectorObj);
    // setBreakdownData()
    setFilterClearData(filteredData);
  }, [filteredData]);
  // console.log("tempValue", breakdownData);
  // console.log("re", rejectedData);
  // console.log("filter", filter);
  // console.log("filteredData", filteredData);
  const getUnAssignedFieldInDb = async (event) => {
    // if (newColumnArr.length != 0) {
    const response = await api().post(endpoints.companyColumnCreate, {
      newColumnArr,
    });

    if (response.status === 200) {
      setNext(true);
    }
    // }
  };

  const handleChange = (e) => {
    setCountrySelect(e.target.value);
    setFilterFunc({ Country: e.target.value }); // new filter func
  };

  const handleRadioCheck = (name, checked) => {
    setRadioCheck({ ...radioCheck, [name]: checked });
  };

  // let a = data.filter((x) => x.Country == countrySelect);

  function getTotalFieldCount(data) {
    if (filteredData[data]) return filteredData[data].length;
    else return 0;
  }

  function countAllData(keyName) {
    let count = 0;
    for (let row of data) {
      if (row[keyName]) count++;
    }

    // console.log("countAllData", count);
    // console.log("keyName", keyName);

    return count;
  }
  // console.log("filterData", filteredData);
  // console.log("saveAS", Object.values(saveSelect));
  // console.log("saveUN", saveUnAssignedSelect);
  //  LinkedIn: ["LinkedIn", "LinkedIn Followers", "Description(LinkedIn)"],
  // Facebook: ["Facebook", "Facebook Likes", "Description(Facebook)"],
  // Instagram: [
  //   "Instagram",
  //   "Instagram Posts",
  //   "Instagram Followers",
  //   "Description(Instagram)",
  // ],
  // Twitter: ["Twitter", "Twitter Followers"],
  // Youtube: ["YouTube", "YouTube Subscribers"],
  function countItems(keyName) {
    let count = 0;
    // console.log("sa", saveSelect[keyName]);
    for (let row of filteredData) {
      if (
        saveSelect[keyName == "Phone" ? "Main Line Number" : keyName] ||
        saveSelect[keyName] ||
        saveSelect[keyName == "Website" ? "Website Link" : keyName] ||
        saveSelect[keyName == "LinkedIn" ? "Linkedin Link" : keyName] ||
        saveSelect[
        keyName == "LinkedIn Followers" ? "Linkedin Followers" : keyName
        ] ||
        saveSelect[keyName == "Instagram" ? "Instagram Link" : keyName] ||
        saveSelect[keyName == "Facebook" ? "Facebook Link" : keyName] ||
        saveSelect[keyName == "Twitter" ? "Twitter Link" : keyName] ||
        saveSelect[keyName == "Youtube" ? "Youtube Link" : keyName] ||
        saveSelect[keyName == "biz_type" ? "Business Type" : keyName] ||
        saveSelect[
        keyName == "Youtube Subscribers" ? "Youtube Subscribers" : keyName
        ] ||
        saveSelect[
        keyName == "Description(Instagram)"
          ? "Description(Instragram)"
          : keyName
        ] ||
        saveUnAssignedSelect[keyName]
      ) {
        if (row[keyName]) count++;
      }
    }
    // console.log("hoon", count);
    setCount(count);
    return count;
  }
  function countsectorItems(keyName) {
    let count = 0;
    // console.log("sa", saveSelect[keyName]);
    for (let row of filteredData) {
      if (row[keyName]) count++;
      else if (sectorArrayData[keyName]) count = sectorArrayData[keyName];
    }
    // console.log("hoon", count);
    setCount(count);
    return count;
  }
  // console.log("Country Presence", getBreakdown("Country Presence"))

  let Diff = data.length - filteredData.length;
  let sectorD = { Sector: Object.keys(sectorArrayData) };
  let sectorData = Object.values(sectorD);
  // console.log("sector key", sectorD);
  // console.log("sector value", sectorData);
  // console.log("sectorArrayData", sectorArrayData);
  // console.log("sec", sectorDataObj);
  function countsectorItem(keyName) {
    let count;
    count = sectorDataObj[keyName];
    return count;
  }
  return (
    <div
      className={classes.optionalDisplay}
      style={{ width: window.innerWidth, height: window.innerHeight }}
    >
      <Grid
        container
        style={{
          display: "flex",
          alignItem: "center",
          backgroundColor: "darkgray",
          alignItems: "center",
        }}
      >
        {/* <Grid item xs={1} /> */}
        <Grid item xs={3} style={{ display: "flex" }}>
          <ArrowBackIos
            style={{ cursor: "pointer", marginTop: 4, color: "white" }}
            onClick={() => setCverViewOfFieldsSelected(false)}
          />
          <Text
            value={`Step 3 : Overview of fields selected`}
            style={{ fontSize: "12px", padding: 4, color: "white" }}
          />
        </Grid>
        <Grid item xs={7} />
        <Grid item xs={2}>
          <Button
            style={{
              backgroundColor: "lightgrey",
            }}
            // disabled={!(social.length != 0)}
            onClick={(e) => getUnAssignedFieldInDb(e)}
          >
            <Text
              value={"Save"}
              style={{
                fontSize: 12,
                fontWeight: "bold",
                cursor: "pointer",
                color: "#212121",
              }}
            />
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        {/* <Grid item xs={3} style={{ marginLeft: "-6%" }}>
          <NativeSelect
            style={{
              marginTop: "10px",
              backgroundColor: "transparent",
              minWidth: "50%",
              maxWidth: "100%",
            }}
            value={countrySelect}
            onChange={(e) => {
              handleChange(e);
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
          </NativeSelect>
        </Grid> */}
        <Grid
          item
          xs={1}
          style={{
            boxShadow: "5px 5px 5px 0px #ccc",
            borderRadius: "8%",
            marginLeft: "18px",
          }}
        >
          <CountrySelect
            data={data}
            filteredData={filteredData}
            reload={reload}
          />
        </Grid>
        <Grid
          item
          // xs={1}
          style={{
            boxShadow: "5px 5px 5px 0px #ccc",
            borderRadius: "8%",
            marginLeft: "18px",
          }}
        >
          <RejectedSelect
            data={data}
            filteredData={filteredData}
            reload={reload}
          />
        </Grid>
        <Grid
          item
          // xs={1}
          style={{
            boxShadow: "5px 5px 5px 0px #ccc",
            borderRadius: "8%",
            marginLeft: "18px",
          }}
        >
          <SectorSelect
            data={data}
            filteredData={filteredData}
            reload={reload}
          />
        </Grid>
        <Grid
          item
          xs={1}
          style={{
            boxShadow: "5px 5px 5px 0px #ccc",
            borderRadius: "8%",
            marginLeft: "18px",
          }}
        >
          <YearIOSelect
            data={data}
            filteredData={filteredData}
            reload={reload}
          />
        </Grid>
        <Grid
          item
          xs={1}
          style={{
            boxShadow: "5px 5px 5px 0px #ccc",
            borderRadius: "8%",
            marginLeft: "18px",
          }}
        >
          <ContactSelect
            data={data}
            filteredData={filteredData}
            reload={reload}
          />
        </Grid>
        <Grid
          item
          xs={1}
          style={{
            boxShadow: "5px 5px 5px 0px #ccc",
            borderRadius: "8%",
            marginLeft: "18px",
          }}
        >
          <DescriptionSelect
            data={data}
            filteredData={filteredData}
            reload={reload}
          />
        </Grid>
        <Grid
          item
          xs={1}
          style={{
            boxShadow: "5px 5px 5px 0px #ccc",
            borderRadius: "8%",
            marginLeft: "18px",
          }}
        >
          <EmpSelect data={data} datatest={filteredData} reload={reload} />
        </Grid>
        <Grid
          item
          xs={1}
          style={{
            boxShadow: "5px 5px 5px 0px #ccc",
            borderRadius: "8%",
            marginLeft: "18px",
          }}
        >
          <BizTypeSelect
            data={data}
            filteredData={filteredData}
            reload={reload}
          />
        </Grid>
        <Grid
          item
          xs={1}
          style={{
            boxShadow: "5px 5px 5px 0px #ccc",
            borderRadius: "8%",
            marginLeft: "18px",
          }}
        >
          <PresenceSelect
            data={data}
            filteredData={filteredData}
            reload={reload}
          />
        </Grid>
        {/* <Grid item xs={1}></Grid> */}
        <Grid item xs={1}>
          <Text
            value={"Clear Filter"}
            style={{ marginTop: "10px", cursor: "pointer" }}
            onClick={() => {
              setReload((old) => old + 1);
              dispatch({
                type: "resetCompanyUploadFilter",
                filter: {},
              });
              dispatch({
                type: "resetCompanyUploadFilter2",
                filter: {},
              });
              dispatch({
                type: "resetCompanyUploadFilter3",
                filter: {},
              });
              dispatch({
                type: "resetCompanyUploadFilter4",
                filter: {},
              });
              // dispatch({
              //   type: "setCompanyUploadFilter",
              //   filter: { Country: [] },
              // });
              // dispatch({
              //   type: "setCompanyUploadFilter",
              //   filter: { Rejected: [] },
              // });
              // dispatch({
              //   type: "setCompanyUploadFilter4",
              //   filter: { sector: [] },
              // });
              // dispatch({
              //   type: "setCompanyUploadFilter3",
              //   filter: { biz_type: [] },
              // });
              // dispatch({
              //   type: "setCompanyUploadFilter4",
              //   filter: { biz_type: [] },
              // });
              // dispatch({
              //   type: "setCompanyUploadFilter2",
              //   filter: { contact: [] },
              // });
              // dispatch({
              //   type: "setCompanyUploadFilter3",
              //   filter: { contact: [] },
              // });
              // dispatch({
              //   type: "setCompanyUploadFilter3",
              //   filter: { Description: [] },
              // });
              // dispatch({
              //   type: "setCompanyUploadFilter",
              //   filter: { "HQ Location": [] },
              // });
              // dispatch({
              //   type: "setCompanyUploadFilter",
              //   filter: { "City Presence": [] },
              // });
              // dispatch({
              //   type: "setCompanyUploadFilter",
              //   filter: { "Country Presence": [] },
              // });
              // dispatch({
              //   type: "setCompanyUploadFilter3",
              //   filter: { CountryCount: [] },
              // });
              // dispatch({
              //   type: "setCompanyUploadFilter3",
              //   filter: { CityCount: [] },
              // });
              // dispatch({
              //   type: "setCompanyUploadFilter",
              //   filter: { "Years in Operation": [] },
              // });
              // dispatch({
              //   type: "setCompanyUploadFilter",
              //   filter: { "Employee Size": [] },
              // });
              // dispatch({ type: "setYearIORangeFilter", filter: [{ min: '', max: '', selectValue: "-" }] });
              // dispatch({ type: "setEmpSizeRangeFilter", filter: [{ min: '', max: '', selectValue: "-" }] });
            }}
          />
        </Grid>
      </Grid>
      <hr />
      <Grid container spacing={3} style={{ width: window.innerWidth }}>
        <Grid item xs={4} style={{ boxShadow: "5px 5px 5px 0px #ccc" }}>
          {Object.keys(CompanyObj).map((key, i) => (
            <ComponentData
              index={i}
              checked={radioCheck[key] || false}
              handleRadioCheck={handleRadioCheck}
              name={key}
              value={CompanyObj[key]}
              getTotalFieldCount={getTotalFieldCount}
              countItems={countItems}
              countAllData={countAllData}
              Diff={Diff}
              filteredData={filteredData}
              breakdownArr={rejectedData}
            />
          ))}
          <Grid container>
            <Grid item xs={12}>
              <Text
                value={"Company Info-Business Type and Presence"}
                style={{
                  fontSize: "12px",
                  textAlign: "left",
                  marginLeft: "5%",
                }}
              />
            </Grid>
          </Grid>
          <div
            style={{
              height: window.innerHeight - 400,
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            {Object.keys(CompanyInfo).map((key, i) => (
              <ComponentData
                index={i}
                checked={radioCheck[key] || false}
                handleRadioCheck={handleRadioCheck}
                name={key}
                value={CompanyInfo[key]}
                getTotalFieldCount={getTotalFieldCount}
                countItems={countItems}
                countAllData={countAllData}
                Diff={Diff}
                filteredData={filteredData}
                breakdownArr={breakdownData[key]}
                count={count}
              />
            ))}
          </div>
        </Grid>
        <Grid item xs={4} style={{ boxShadow: "5px 5px 5px 0px #ccc" }}>
          <Grid container>
            <Grid item xs={12}>
              <Text
                value={"Company Contact"}
                style={{
                  fontSize: "12px",
                  textAlign: "left",
                  marginLeft: "5%",
                }}
              />
            </Grid>
          </Grid>
          <div
            style={{
              height: window.innerHeight - 190,
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            {Object.keys(CompanyContactData).map((key, i) => (
              <ComponentDataContact
                index={i}
                checked={radioCheck[key] || false}
                handleRadioCheck={handleRadioCheck}
                name={key}
                value={CompanyContactData[key]}
                getTotalFieldCount={getTotalFieldCount}
                countItems={countItems}
                countAllData={countAllData}
                Diff={Diff}
                filteredData={filteredData}
              />
            ))}
          </div>
        </Grid>
        <Grid item xs={4} style={{ boxShadow: "5px 5px 5px 0px #ccc" }}>
          <Grid container>
            <Grid item xs={12}>
              <Text
                value={"Sector"}
                style={{
                  fontSize: "12px",
                  textAlign: "left",
                  marginLeft: "5%",
                }}
              />
            </Grid>
          </Grid>
          <div
            style={{
              height: window.innerHeight - 190,
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            {sectorSelect.length != 0 &&
              sectorSelect.map((key, i) => (
                <ComponentWithSlideBar
                  index={i}
                  checked={radioCheck[key] || false}
                  handleRadioCheck={handleRadioCheck}
                  name={key}
                  value={key}
                  getTotalFieldCount={getTotalFieldCount}
                  countItems={countsectorItems}
                  countAllData={countAllData}
                  Diff={Diff}
                  filteredData={filteredData}
                  sector={"sectorData"}
                />
              ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

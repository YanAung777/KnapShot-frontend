import React, { useReducer, useContext, useState, useEffect } from "react";
import {
  makeStyles,
  Paper,
  Popper,
  Grid,
  Divider,
  Tooltip,
} from "@material-ui/core";
import {
  Favorite,
  Add,
  LocationOnOutlined,
  Phone,
  Language,
  EmailOutlined,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  YouTube,
} from "@material-ui/icons";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { CircularProgressbar } from "react-circular-progressbar";
import grey from "@material-ui/core/colors/grey";

//components
import LinearDeterminate from "components/core/LinearProgress";
import ThreeColorProgressBar from "components/core/ThreeColorProgressBar";
import CompanyLists from "./components/CompanyLists";
import DoughNutChart from "../overview/components/doughNutChart";

import Text from "components/core/Text";
import Icon from "components/core/CustomIcon";
import ProgressBar from "components/core/ProgressBar";

import RightSide from "./RightSide";
import QCChecker from "../../pages/QcChecker";

//util
import { checkAuth, getSession } from "util/check-auth";

//context
import { useAppValue } from "context/app";

//API
import api from "api";

//constants
import endpoints from "constants/endpoints";
import { digitals } from "constants/digitals";
import { Icons } from "constants/icons";
import { keyValues } from "constants/keyValues";

//hook
import { useHomeHook } from "./useHomeHook";
import { useOverviewHook } from "../overview/useOverviewHook";

//constants
import { color } from "constants/color";

//route
import { history } from "router/history";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rootScroll: {
    height: window.innerHeight * 0.75,
    overflowY: "scroll",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  simpleColumn: {
    display: "flex",
    flexDirection: "column",
  },
  simpleRow: {
    display: "flex",
    flexDirection: "row",
  },
  companyListLabel: {
    fontSize: 10,
    // fontWeight: 600
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: "15px 0",
  },
  score: {
    width: 70,
    height: 70,
    fontWeight: "600",
  },
  digitalEngagementText: {
    fontSize: 10,
    fontWeight: "600",
    padding: "5px 0px",
  },
  button: {
    zIndex: -1,
    // border: '1.2px solid lightgray',
    // borderRadius: 20,
    padding: "3px 10px",
    height: 30,
    minWidth: 120,
    display: "flex",
    alignItems: "center",
    // justifyContent: 'flex-start'
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5px 5px",
  },
  center2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  centerBorderBottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 5px",
    borderBottom: "2px solid #777",
    marginBottom: 20,
    fontWeight: "bold",
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
  marginBoxShadow: {
    margin: "18px 8%",
    boxShadow: "5px 5px 5px 0px #ccc",
    height: window.innerHeight - 220,
    overflowY: "scroll",
  },
  rightSide: {
    // margin: "20px 10%",
    // boxShadow: "5px 5px 5px 0px #ccc",
    height: window.innerHeight - 180,
    overflowY: "scroll",
    paddingRight: "5px",
  },
  filterItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  btnGroup: {
    backgroundColor: "transparent",
    border: "none",
  },
  popupItem: {
    // "position": "absolute",
    // "left": "60px",
    border: "1px solid lightgray",
    borderRadius: "10px",
    padding: "5px",
    background: "#FFF",
    zIndex: "1",
    width: "200px",
  },
  rowItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  count: {
    background: "#000",
    borderRadius: "20px",
    height: "20px",
    minWidth: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  gridText: {
    fontSize: "12px",
  },
  gridDetailText: {
    fontSize: "10px",
    height: "auto",
    lineHeight: "25px",
  },
  activeBtn: {
    // borderBottom: "3px solid rgb(3, 177, 241)",
    color: color.primary,
    fontSize: "12px",
    height: "auto",
    lineHeight: "25px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  parent: { display: "flex", flexWrap: "wrap" },
  child1P5: {
    // "flex": "1 0 60%"
    width: "65%",
  },
  child2: { flex: "1 0 45%" },
  child3: { flex: "1 0 30%" },
  child4: {
    // "flex": "1 0 25%"
    width: "25%",
  },
  child8: { width: "11.5%" },
  // "child8": { "flex": "1 0 11.5%" },
  borderContainer: {
    boxShadow: "6px 10px 5px 0px rgba(0,0,0,0.75)",
    border: "0px solid gray",
    borderRadius: "10px",
  },
  scroll: {
    width: "100%",
    height: "100px",
    overflowY: "scroll",
    overflowWrap: "break-word",
  },
  scrollXY: {
    width: "100%",
    whiteSpace: "nowrap",
    height: "100px",
    overflowY: "scroll",
    overflowX: "scroll",
  },
  link: {
    textDecoration: "none",
  },
  divider: {
    height: 28,
    margin: 4,
  },
  // divider2: { "borderLeft": "2px solid gray", "height": "90%" },
  formControl: {
    "& .MuiInputBase-formControl": {
      width: "250px",
      height: "25px",
      fontSize: "12px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: "white",
    },
    "& .MuiOutlinedInput-input": {
      padding: "2px 22px 2px 1px",
    },
    "& .MuiSelect-selectMenu": {
      whiteSpace: "pre-wrap",
    },
    // '& .MuiSelect-selectMenu':{
    //     height: '2px'
    // },
    margin: "2px 2px 2px 6px",
    width: "100%",
    fontSize: "13px",
  },
}));

function calcKScore(ksScore) {
  let score;
  if (ksScore < 2) score = { type: "Basic", color: digitals["Basic"] };
  else if (ksScore >= 2 && ksScore < 5)
    score = { type: "Intermediate", color: digitals["Intermediate"] };
  else if (ksScore >= 5 && ksScore < 8)
    score = { type: "High", color: digitals["High"] };
  else score = { type: "Advanced", color: digitals["Advanced"] };
  return score;
}

function calcCustomScore(obj) {
  let scoreConfig = JSON.parse(obj.scoreConfig);
  let value = obj.value;

  for (const [key, interval] of Object.entries(scoreConfig)) {
    let interValArr = interval.split("-");
    if (
      value >= parseFloat(interValArr[0]) &&
      value <= parseFloat(interValArr[1])
    )
      return { type: [key], color: digitals["Advanced"] };
  }
  return { type: "No Setting", color: digitals["Advanced"] };
}

function MySelect({ emptyData }) {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const lists = ["testing1", "testing2"];

  return (
    <FormControl
      className={classes.formControl}
      style={{ display: "flex", flexDirection: "row" }}
    >
      <Select
        value={selectedValue}
        onChange={handleSelectChange}
        variant="outlined"
        displayEmpty
      >
        <MenuItem value="" style={{ fontSize: 12 }} disabled>
          <Text value={emptyData} />
        </MenuItem>
        {lists.map((x) => (
          <MenuItem value={x} style={{ fontSize: 12 }}>
            <Text value={x} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function CountAndLabel({ label, count, color, style }) {
  const classes = useStyles();
  let colorData = color || "black";
  return (
    <div style={{ display: "flex", flexDirection: "column", ...style }}>
      <Text
        value={count}
        style={{ fontSize: 14, textAlign: "center", fontWeight: 600 }}
      />
      <Text
        value={label}
        style={{ fontSize: 10, textAlign: "center", color: colorData }}
      />
    </div>
  );
}

function LabelIconCountIndustry({ keyName, count }) {
  const classes = useStyles();
  return (
    <Grid container style={{ padding: 10 }}>
      <Grid
        item
        xs={3}
        sm={3}
        md={3}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: 5,
        }}
      >
        <Text value={keyName} style={{ textAlign: "right", fontSize: 10 }} />
      </Grid>
      <Grid
        item
        xs={1}
        sm={2}
        md={2}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <i
          className={`${Icons[keyName]}`}
          style={{ color: "rgb(189, 189, 189)", fontSize: 16 }}
          aria-hidden="true"
        />
      </Grid>
      <Grid
        item
        xs={7}
        sm={7}
        md={7}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text value={count || "-"} style={{ fontSize: 11 }} />
      </Grid>
    </Grid>
  );
}

function LabelIconCount({ keyName, count }) {
  const classes = useStyles();
  return (
    <Grid container style={{ padding: 10 }}>
      <Grid
        item
        xs={7}
        sm={7}
        md={7}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: 5,
        }}
      >
        <Text value={keyName} style={{ textAlign: "right", fontSize: 10 }} />
      </Grid>
      <Grid
        item
        xs={3}
        sm={3}
        md={3}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <i
          className={`${Icons[keyName]}`}
          style={{ color: "rgb(189, 189, 189)", fontSize: 16 }}
          aria-hidden="true"
        />
      </Grid>
      <Grid
        item
        xs={2}
        sm={2}
        md={2}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text
          value={count}
          className={classes.companyListLabel}
          style={{ whiteSpace: count && count.length > 5 ? "normal" : "nowrap" }}
        />
      </Grid>
    </Grid>
  );
}

function LabelIconCount2({ keyName, count }) {
  const classes = useStyles();
  return (
    <Grid container style={{ padding: 10 }}>
      <Grid
        item
        xs={7}
        sm={7}
        md={7}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: 5,
        }}
      >
        <Text value={keyName} style={{ textAlign: "right", fontSize: 10 }} />
      </Grid>
      <Grid
        item
        xs={3}
        sm={3}
        md={3}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <i
          className={`${Icons[keyName]}`}
          style={{ color: "rgb(189, 189, 189)", fontSize: 16 }}
          aria-hidden="true"
        />
      </Grid>
      <Grid
        item
        xs={2}
        sm={2}
        md={2}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text value={count} className={classes.companyListLabel} />
      </Grid>
    </Grid>
  );
}

function RenderNewCompanyList(props) {
  const [state, dispatch] = useAppValue();
  const [loading, setLoading] = useState(false);

  const {
    selectedDataset,
    selectedFilename,
    userFavCompFilter,
    companyListReload,
    userProductServiceFilter,
    userDigitalEngagementFilter,
    userSubPartner,
    userPartner,
    totalCountries,
    userCompanyExpertiseFilter,
    userCategoryFilter,
    userEmpSizeFilter,
    userYearIOFilter,
    userCompanyFilter,
  } = state;

  const classes = useStyles();

  const [renderData, setRenderData] = useState([]);
  const [digitalEngagementData, setDigitalEngagement] = useState({});
  // const [eachCompanyData, setEachCompanyData] = useState()
  const [hasPartnerData, setHasPartner] = useState(0);
  const [gOnlyData, setGOnlyData] = useState(0);
  const [sOnlyData, setSOnlyData] = useState(0);
  const [gAndSData, setGAndSData] = useState(0);
  const [genericOnly, setGenericOnly] = useState(0);
  const [totalData, setTotal] = useState(0);
  // const [scoreListData, setScoreListData] = useState({})
  // const [toggle, setToggle] = useState(false)
  let [dataRow, setDataRow] = useState(10);
  let [companyToBeAdded, setCompanyToBeAdded] = useState();

  useEffect(() => {
    if (renderData.length) setLoading(false);
  }, [renderData]);

  // useEffect(() => {
  //     async function fetchData() {
  //         const scoreList = await api().post(`${endpoints.getDefaultScoreList}`, { file_name: selectedFilename })
  //         setScoreListData(scoreList.data.data)
  //     }
  //     if (selectedFilename) fetchData();
  // }, [selectedFilename])

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const response = await api().post(endpoints.getCompanyExpertiseData, {
        user_id: getSession("user").id,
        dataset: Array.isArray(selectedDataset)
          ? selectedDataset
          : totalCountries.countryName,
        file_name: selectedFilename,
        expertiseCompanyFilter: userCompanyExpertiseFilter,
        categoryFilter: userCategoryFilter,
        empSizeFilter: userEmpSizeFilter,
        yearIOFilter: userYearIOFilter,
        digitalEngagementFilter: userDigitalEngagementFilter,
        productServiceFilter: userProductServiceFilter,
        companyFilter: userCompanyFilter,
        partnerFilter: [...userSubPartner, ...userPartner],
        userFavCompFilter: userFavCompFilter,
        // customScoreName: scoreListData && scoreListData.score_name
      });
      if (response.status === 200) {
        let hasPartner = 0,
          gOnly = 0,
          sOnly = 0,
          gAnds = 0,
          GenericOnly = 0;
        const { data, digitalEngagement, total } = response.data;
        data.map((x, i) => {
          if (x.category === "Google Only") gOnly++;
          if (x.category === "Google and Social") gAnds++;
          if (x.category === "Social Only") sOnly++;
          if (x.category === "Generic Only") GenericOnly++;
          let tmpObj = {};
          // if (x.partner == "-") hasPartner += 0
          // else hasPartner += Object.keys(x.partner).length
          // x.partner.trim() !== '-' && hasPartner++
          if (x.partner !== "-") hasPartner++;
          let socialCount = 0;
          x.facebook !== "-" && socialCount++;
          x.twitter !== "-" && socialCount++;
          x.linkedIn !== "-" && socialCount++;
          x.instagram !== "-" && socialCount++;
          x.youtube !== "-" && socialCount++;

          let assets = JSON.parse(x.asset);

          let checkSame = {},
            countObj = {};

          assets &&
            Object.values(assets).forEach((item) => {
              Object.keys(item).forEach((key) => {
                if (keyValues[key]) {
                  // console.log(key, item[key].length)
                  // if (checkSame[`${key},${keyValues[key]}`]) return;
                  // else checkSame[`${key},${keyValues[key]}`] = 'check'

                  checkSame[`${key},${keyValues[key]}`] = [
                    ...new Set(item[key]),
                  ].length;
                }
              });
            });

          Object.keys(checkSame).map((key) => {
            if (tmpObj[key.split(",")[1]]) {
              tmpObj[key.split(",")[1]] += checkSame[key];
            } else {
              tmpObj[key.split(",")[1]] = checkSame[key];
            }
          });

          let advertising = tmpObj["Advertising"] ? tmpObj["Advertising"] : 0;
          let analytics = tmpObj["Analytics and Tracking"]
            ? tmpObj["Analytics and Tracking"]
            : 0;
          let ecommerce = tmpObj["Ecommerce"] ? tmpObj["Ecommerce"] : 0;
          let widgets = tmpObj["Widgets"] ? tmpObj["Widgets"] : 0;
          let hosting = tmpObj["Hosting"] ? tmpObj["Hosting"] : 0;
          let productivity = tmpObj["Productivity"]
            ? tmpObj["Productivity"]
            : 0;

          data[i].Advertising = advertising;
          data[i].Analytics = analytics;
          data[i].Ecommerce = ecommerce;
          data[i].Widgets = widgets;
          data[i].Hosting = hosting;
          data[i].Productivity = productivity;
          data[i].socialCount = socialCount;
        });
        setRenderData(data);
        setDigitalEngagement(digitalEngagement);
        setHasPartner(hasPartner);
        setGOnlyData(gOnly);
        setGAndSData(gAnds);
        setSOnlyData(sOnly);
        setGenericOnly(GenericOnly);
        setTotal(total);
        // setScoreListData(scoreListData)
      }
    }
    if (selectedFilename) fetchData();
  }, [
    selectedDataset,
    totalCountries,
    userCompanyExpertiseFilter,
    userCategoryFilter,
    userDigitalEngagementFilter,
    userEmpSizeFilter,
    userYearIOFilter,
    companyListReload,
    userProductServiceFilter,
    userCompanyFilter,
    userSubPartner,
    userPartner,
    userFavCompFilter,
  ]);

  const loadMore = () => setDataRow((dataRow += 10));

  const openPopUp = (index) => {
    dispatch({
      type: "setEachCompanyData",
      data: renderData.slice(0, dataRow)[index],
    });
  };

  const checkCount = () => {
    if (totalData > dataRow)
      return (
        <Text
          value="Load More"
          onClick={loadMore}
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            color: "blue",
            textAlign: "center",
            margin: "10px",
          }}
        />
      );
    else return null;
  };

  const substituteObj = (companyData, id) => {
    // let changeData = companyToBeAdded ? companyToBeAdded.companyData : companyData
    // let companyId = companyToBeAdded ? companyToBeAdded.id : id
    let changeData = companyData;
    let companyId = id;
    changeData.favCompList = !changeData.favCompList;

    setRenderData([
      ...renderData.map((obj) => (obj.id === companyId ? changeData : obj)),
    ]);
  };

  const addToFav = async (company_name, id, companyData) => {
    setCompanyToBeAdded({ id, companyData });

    if (companyData.favCompList) {
      const response = await api().post(endpoints.addCompToFavList, {
        company_name: company_name,
        user_id: getSession("user").id,
      });
      if (response.status === 200) {
        substituteObj(companyData, id);
      }
    } else {
      dispatch({ type: "addToFav", condition: false });
      const favList = await api().get(
        `${endpoints.getDefaultFavList}/${getSession("user").id}`
      );
      let listData = favList.data.data;
      if (listData) {
        const response = await api().post(endpoints.addCompToFavList, {
          company_name: company_name,
          user_id: getSession("user").id,
          list_name: listData.name,
          list_id: listData.id,
        });
        if (response.status === 200) {
          substituteObj(companyData, id);
        }
      } else {
        dispatch({
          type: "setOpenFavList",
          condition: true,
          company: company_name,
        });
        substituteObj(companyData, id);
      }
    }
  };

  // useEffect(() => {
  //     if (addedToFav && companyToBeAdded) substituteObj()
  //     dispatch({ type: "addToFav", condition: false })

  // }, [addedToFav])

  if (loading) {
    return <LinearDeterminate />;
  }

  return (
    <React.Fragment>
      <div
        className={classes.simpleRow}
        style={{ padding: 10, borderBottom: "1px solid lightgray" }}
      >
        <Paper
          style={{
            display: "flex",
            alignItems: "center",
            width: "40%",
            justifyContent: "space-around",
            marginLeft: "5%",
            boxShadow: "rgb(204, 204, 204) 10px 10px 10px 0px",
            border: "1px solid rgb(204, 204, 204)",
            borderRadius: 10,
          }}
        >
          <CountAndLabel count={totalData} label={"companies"} />
          <CountAndLabel count={hasPartnerData} label={"Has partners"} />
          <CountAndLabel
            count={gOnlyData}
            label={"Google Only"}
            style={{
              borderLeft: "1px solid rgb(204, 204, 204)",
              paddingLeft: 15,
            }}
          />
          <CountAndLabel count={sOnlyData} label={"Social Only"} />
          <CountAndLabel count={gAndSData} label={"Google & Social"} />
          <CountAndLabel count={genericOnly} label={"Generic Only"} />
        </Paper>
        <Paper
          style={{
            display: "flex",
            alignItems: "center",
            width: "35%",
            justifyContent: "space-around",
            marginLeft: 30,
            boxShadow: "rgb(204, 204, 204) 10px 10px 10px 0px",
            border: "1px solid rgb(204, 204, 204)",
            borderRadius: 10,
          }}
        >
          <div>
            {" "}
            <Text
              value="Digital Engagement"
              style={{ textAlign: "right" }}
            />{" "}
          </div>
          <CountAndLabel
            count={digitalEngagementData.advance}
            label={"Advanced"}
            color={digitals["Advanced"]}
            style={{
              borderLeft: "1px solid rgb(204, 204, 204)",
              paddingLeft: 15,
            }}
          />
          <CountAndLabel
            count={digitalEngagementData.high}
            label={"High"}
            color={digitals["High"]}
          />
          <CountAndLabel
            count={digitalEngagementData.intermediate}
            label={"Intermediate"}
            color={digitals["Intermediate"]}
          />
          <CountAndLabel
            count={digitalEngagementData.basic}
            label={"Basic"}
            color={digitals["Basic"]}
          />
        </Paper>
      </div>

      <div className={classes.rootScroll}>
        {renderData.slice(0, dataRow).map((x, i) => (
          <div key={i} style={{ margin: "15px 6%" }}>
            <Grid
              container
              spacing={1}
              style={{
                boxShadow: "10px 10px 10px 0px #ccc",
                padding: "5px 0px",
                border: "1px solid rgb(204, 204, 204)",
                borderRadius: 10,
              }}
            >
              <Grid
                item
                xs={12}
                sm={9}
                md={9}
                style={{ borderRight: "#ccc solid 1px" }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={4} md={4}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6} md={6}>
                        <div className={classes.item}>
                          <Text
                            className={classes.digitalEngagementText}
                            value="Digital Engagemnet"
                          />
                          <div
                            className={classes.score}
                            style={{ position: "relative" }}
                          >
                            <CircularProgressbar
                              value={x.ksScore * 10}
                              text={x.ksScore}
                            />
                            <Text
                              style={{
                                position: "absolute",
                                top: 42,
                                left: 10,
                                fontSize: 7,
                              }}
                              value="Knapshot Score"
                            />
                          </div>
                          <Text
                            className={classes.digitalEngagementText}
                            value={calcKScore(x.ksScore).type}
                          />
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            // whiteSpace: "nowrap"
                          }}
                          value={x.company_name}
                        />
                        <Text
                          value={x.category}
                          style={{
                            border: "#ccc solid 1px",
                            borderRadius: 22,
                            whiteSpace: "nowrap",
                            padding: 8,
                            textAlign: "center",
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={8}
                    style={{ position: "relative" }}
                  >
                    {/* <div style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                position: "absolute",
                                                left: 20,
                                                bottom: 20,
                                                alignItems: "center"
                                            }}>
                                                <LocationOnOutlined style={{ fontSize: 35, color: grey[400] }} />
                                                <Text value={x.dataset} style={{ textIndent: "10px" }} />
                                            </div> */}
                    {x.customScore.value ? (
                      <Grid item xs={12} sm={3} md={3}>
                        <div className={classes.item}>
                          <Text
                            className={classes.digitalEngagementText}
                            value={"Custom Score"}
                          />
                          <Text
                            style={{
                              position: "absolute",
                              top: 85,
                              fontSize: 7,
                            }}
                            value={x.customScore.name}
                          />
                          <div
                            className={classes.score}
                            style={{ position: "relative" }}
                          >
                            <CircularProgressbar
                              value={x.customScore.value * 10}
                              text={x.customScore.value}
                            />
                            {/* <Text
                                                            style={{
                                                                position: "absolute",
                                                                top: 42,
                                                                left: 10,
                                                                fontSize: 7,
                                                            }}
                                                            value={x.customScore.name} /> */}
                          </div>
                          <Text
                            className={classes.digitalEngagementText}
                            value={calcCustomScore(x.customScore).type}
                          />
                        </div>
                      </Grid>
                    ) : null}

                    <div
                      style={{
                        position: "absolute",
                        right: 20,
                        top: 20,
                      }}
                    >
                      <Favorite
                        style={{
                          fontSize: 26,
                          cursor: "pointer ",
                          color: x.favCompList ? "#0080ff" : grey[400],
                        }}
                        onClick={() => addToFav(x.company_name, x.id, x)}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Divider orientation="horizontal" />
                <Grid container spacing={1} style={{ padding: "5px 0px" }}>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={4}
                    style={{ borderRight: "#ccc solid 1px" }}
                  >
                    {/* {
                                                Object.keys(x.infoArr).map(key => <LabelIconCount keyName={key} count={x.infoArr[key]} />)
                                            } */}
                    <Grid container spacing={1} style={{ padding: "5px 0px" }}>
                      <Grid item xs={12} sm={6} md={6}>
                        <LabelIconCount2
                          keyName={"Partners"}
                          count={x.partnerCount}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <LabelIconCount2
                          keyName={"Awards"}
                          count={x.awardCount || 0}
                        />
                      </Grid>
                    </Grid>
                    <Divider orientation="horizontal" />
                    <Grid container spacing={1} style={{ padding: "5px 0px" }}>
                      <LabelIconCountIndustry keyName={"HQ"} count={x.HQ} />
                      <Grid container style={{ padding: 10 }}>
                        <Grid
                          item
                          xs={3}
                          sm={3}
                          md={3}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            paddingRight: 5,
                          }}
                        >
                          <i
                            class="fa fa-info-circle"
                            style={{ color: grey[400], fontSize: 18 }}
                            aria-hidden="true"
                          />
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          sm={2}
                          md={2}
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <LocationOnOutlined
                            style={{ fontSize: 26, color: grey[400] }}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={7}
                          sm={7}
                          md={7}
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            value={x.dataset}
                            style={{ fontSize: "10px" }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={8} md={8}>
                    <Grid container spacing={1} style={{ padding: "5px 0px" }}>
                      {/* <Grid item xs={12} sm={3} md={3} className={classes.column} style={{ borderRight: "#ccc solid 1px" }}>
                                                    <LabelIconCount2 keyName={"Partners"} count={x.partnerCount} />
                                                    <LabelIconCount2 keyName={"Awards"} count={x.awardCount || 0} />
                                                </Grid>
                                                <Grid item xs={12} sm={3} md={3} className={classes.column}>
                                                    <div className={classes.row}>
                                                        <Text value="Google Ads Related Offering" style={{ textAlign: "right" }} />
                                                        <Check style={{ fontSize: 30, paddingLeft: 15 }} />
                                                    </div>
                                                    <div className={classes.row}>
                                                        <Text value="Social Ads Related Offering" style={{ textAlign: "right" }} />
                                                        <Check style={{ fontSize: 30, paddingLeft: 15 }} />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} sm={3} md={3} className={classes.column}>
                                                    <div className={classes.row}>
                                                        <Text value="Web Development Related Offering" style={{ textAlign: "right" }} />
                                                        <Check style={{ fontSize: 30, paddingLeft: 15 }} />
                                                    </div>
                                                    <div className={classes.row}>
                                                        <Text value="App Development Related Offering" style={{ textAlign: "right" }} />
                                                        <Clear style={{ fontSize: 30, paddingLeft: 15 }} />
                                                    </div>
                                                </Grid> */}
                      {Object.keys(x.infoArr).map((key) => {
                        return key === "Industry" ? (
                          <Grid
                            item
                            xs={12}
                            sm={3}
                            md={3}
                            className={classes.column}
                          >
                            <LabelIconCountIndustry
                              keyName={`  ${key}`}
                              count={x.infoArr[key]}
                            />
                          </Grid>
                        ) : (
                            <Grid
                              item
                              xs={12}
                              sm={3}
                              md={3}
                              className={classes.column}
                            >
                              <LabelIconCount
                                keyName={key}
                                count={x.infoArr[key]}
                              />
                            </Grid>
                          );
                      })}
                    </Grid>
                    <Divider orientation="horizontal" />
                    <Grid container spacing={1}>
                      <Grid
                        item
                        xs={12}
                        sm={3}
                        md={3}
                        className={classes.center2}
                      >
                        <Text
                          value="Technology"
                          style={{ fontSize: 14, fontWeight: 800 }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={3}
                        md={3}
                        className={classes.column}
                      >
                        <LabelIconCount2
                          keyName={"Advertising"}
                          count={x.Advertising}
                        />
                        <LabelIconCount2
                          keyName={"Ecommerce"}
                          count={x.Ecommerce}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={3}
                        md={3}
                        className={classes.column}
                      >
                        <LabelIconCount2
                          keyName={"Analytics"}
                          count={x.Analytics}
                        />
                        <LabelIconCount2
                          keyName={"Hosting"}
                          count={x.Hosting}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={3}
                        md={3}
                        className={classes.column}
                      >
                        <LabelIconCount2
                          keyName={"Productivity"}
                          count={x.Productivity}
                        />
                        <LabelIconCount2
                          keyName={"Widgets"}
                          count={x.Widgets}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                sm={3}
                md={3}
                className={classes.simpleColumn}
                style={{ justifyContent: "space-around" }}
              >
                {/* <div className={classes.simpleRow} style={{ justifyContent: "space-between", padding: "6%" }}>
                                        <Text value="Website" className={classes.companyListLabel} />
                                        <a href={x.website} target="_blank" className={classes.link}>
                                            <Icon icon={<Tooltip title={x.website}><Language style={{ fontSize: 22 }} /></Tooltip>} />
                                        </a>
                                    </div>

                                    <Divider orientation="horizontal" /> */}
                <div
                  className={classes.simpleRow}
                  style={{ justifyContent: "space-between", padding: "6%" }}
                >
                  <Text value="Contact" className={classes.companyListLabel} />
                  <div
                    className={classes.simpleRow}
                    style={{ justifyContent: "space-between" }}
                  >
                    <a
                      href={`tel:${x.phone}`}
                      target="_blank"
                      className={classes.link}
                      style={{ paddingRight: 20 }}
                    >
                      <Icon
                        icon={
                          <Tooltip title={x.phone || "-"}>
                            <Phone style={{ fontSize: 22 }} />
                          </Tooltip>
                        }
                      />
                    </a>
                    <a
                      href={`mailto:${x.email}`}
                      target="_top"
                      className={classes.link}
                      style={{ paddingRight: 20 }}
                    >
                      <Icon
                        icon={
                          <Tooltip title={x.email || "-"}>
                            <EmailOutlined style={{ fontSize: 22 }} />
                          </Tooltip>
                        }
                      />
                    </a>
                    <a
                      href={x.website}
                      target="_blank"
                      className={classes.link}
                    >
                      <Icon
                        icon={
                          <Tooltip title={x.website || "-"}>
                            <Language style={{ fontSize: 22 }} />
                          </Tooltip>
                        }
                      />
                    </a>
                  </div>
                </div>
                <Divider orientation="horizontal" />
                <div className={classes.simpleColumn}>
                  <div
                    className={classes.simpleRow}
                    style={{
                      justifyContent: "space-between",
                      padding: "1% 6%",
                    }}
                  >
                    <Text value="Social" className={classes.companyListLabel} />
                    <Text
                      value={x.socialCount}
                      className={classes.companyListLabel}
                      style={{ fontSize: 18, paddingRight: "5%" }}
                    />
                  </div>
                  <div
                    className={classes.simpleRow}
                    style={{ padding: "1% 6%" }}
                  >
                    {x.facebook !== "-" && (
                      <div style={{ width: "20%" }}>
                        <a href={x.facebook} target="_blank">
                          <Icon
                            icon={
                              <Tooltip title={x.facebook}>
                                <Facebook style={{ fontSize: 28 }} />
                              </Tooltip>
                            }
                          />
                        </a>
                      </div>
                    )}
                    {x.instagram !== "-" && (
                      <div style={{ width: "20%" }}>
                        <a href={x.instagram} target="_blank">
                          <Icon
                            icon={
                              <Tooltip title={x.instagram}>
                                <Instagram style={{ fontSize: 28 }} />
                              </Tooltip>
                            }
                          />
                        </a>
                      </div>
                    )}

                    {x.linkedIn !== "-" && (
                      <div style={{ width: "20%" }}>
                        <a href={x.linkedIn} target="_blank">
                          <Icon
                            icon={
                              <Tooltip title={x.linkedIn}>
                                <LinkedIn style={{ fontSize: 28 }} />
                              </Tooltip>
                            }
                          />
                        </a>
                      </div>
                    )}
                    {x.twitter !== "-" && (
                      <div style={{ width: "20%" }}>
                        <a href={x.twitter} target="_blank">
                          <Icon
                            icon={
                              <Tooltip title={x.twitter}>
                                <Twitter style={{ fontSize: 28 }} />
                              </Tooltip>
                            }
                          />
                        </a>
                      </div>
                    )}
                    {x.youtube !== "-" && (
                      <div style={{ width: "20%" }}>
                        <a href={x.youtube} target="_blank">
                          <Icon
                            icon={
                              <Tooltip title={x.youtube}>
                                <YouTube style={{ fontSize: 28 }} />
                              </Tooltip>
                            }
                          />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <Divider orientation="horizontal" />
                <div
                  className={classes.simpleRow}
                  style={{ justifyContent: "space-between", padding: "6%" }}
                >
                  <Text
                    value="View Profile Detail"
                    className={classes.companyListLabel}
                  />
                  <Add
                    onClick={() => openPopUp(i)}
                    style={{
                      fontSize: 22,
                      padding: 5,
                      borderRadius: "50%",
                      backgroundColor: "#f3bd16",
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        ))}
      </div>

      {checkCount()}
    </React.Fragment>
  );
}

export default function Home(props) {
  useOverviewHook();
  useHomeHook();

  if (!checkAuth()) {
    history.push("/login");
  }

  const [userData, setUserData] = useState({});
  const [filter, setFilter] = useState("");
  const [index, setIndex] = useState(4);
  const [toggle, setToggle] = useState([false, false, false, false]);
  const [anchorEl, setAnchorEl] = useState(null);

  const [state, dispatch] = useAppValue();

  let [chartData, setChartData] = useState();

  const { overviewTab, selectedCompany, fieldType, totalCountries } = state;

  const { totalDigitalEngagement, company } = state;

  // console.log("total", totalDigitalEngagement)

  const classes = useStyles();

  // useOverviewHook()

  useEffect(() => {
    async function getUserData() {
      setUserData(getSession("user"));
    }
    getUserData();
  }, []);

  useEffect(() => {
    function toggle() {
      setToggle([
        index === 0 && Boolean(anchorEl),
        index === 1 && Boolean(anchorEl),
        index === 2 && Boolean(anchorEl),
        index === 3 && Boolean(anchorEl),
      ]);
    }
    toggle();
  }, [index, anchorEl]);

  useEffect(() => {
    // console.log("company",company.count,"TDE",totalDigitalEngagement.count)
    // console.log(totalDigitalEngagement)
    company.count === totalDigitalEngagement.count &&
      setChartData(totalDigitalEngagement);
  }, [totalDigitalEngagement, company]);

  const clearAllFilter = () => {
    dispatch({
      type: "setSelectedDataset",
      dataset: totalCountries.countryName,
    });
    dispatch({ type: "setUserCompanyFilter", companies: [] });
    dispatch({ type: "setUserExpertiseFilter", expertise: [] });
    dispatch({ type: "setUserPartnerFilter", partner: [] });
  };

  const handleClick = (event, index) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setIndex(index);
  };

  const renderListItems = (data) => {
    return data.map((d, index) => {
      return (
        <div key={index} style={{ position: "relative", margin: "10px 0px" }}>
          <div className={classes.center}>
            <i
              className="fa fa-question-circle"
              style={{ color: "gray" }}
              onClick={(e) => handleClick(e, index)}
            />
            {renderPopups(d.label, index)}
            <Text value={d.label} />
            <Text
              value={`${d.count} | ${calculatePercent(d.count)}%`}
              float="right"
            />
          </div>
          {renderProgressBar(d.label, d.count)}
        </div>
      );
    });
  };

  const renderPopups = (label, index) => {
    if (label === "Basic")
      return (
        <Popper open={toggle[index]} anchorEl={anchorEl}>
          <div className={classes.popupItem} style={{ top: "-90px" }}>
            <div className={classes.rowItem}>
              <span
                style={{ fontSize: 13, textAlign: "right", marginRight: 10 }}
              >
                Digital Engagement Status
              </span>
              <div className={classes.count}>
                <span style={{ color: "#FFF", fontSize: 12 }}>Basic</span>
              </div>
            </div>
            <div className={classes.rowItem}>
              <span
                style={{ fontSize: 13, textAlign: "right", marginLeft: "16%" }}
              >
                Knapshot Score
              </span>
              <div
                className={classes.count}
                style={{ background: "lightgray" }}
              >
                <span style={{ color: "#000" }}> {`< 3`} </span>
              </div>
            </div>
            <hr />
            <p style={{ fontSize: 13, marginBottom: 3 }}>
              Business with no website
            </p>
            <p style={{ fontSize: 13, marginBottom: 3 }}>
              Has no / limited social accounts.
            </p>
            <p style={{ fontSize: 13, marginBottom: 3 }}>
              Marketing activity focused on traditional advertising or word of
              mouth.
            </p>
            <p style={{ fontSize: 13, marginBottom: 3 }}>
              Unlikely to use digital tools
            </p>
          </div>
        </Popper>
      );
    else if (label === "Intermediate")
      return (
        <Popper open={toggle[index]} anchorEl={anchorEl}>
          <div
            className={classes.popupItem}
            style={{ top: "-100px", right: "115px" }}
          >
            <div className={classes.rowItem}>
              <span
                style={{ fontSize: 13, textAlign: "right", marginRight: 10 }}
              >
                Digital Engagement Status
              </span>
              <div className={classes.count} style={{ background: "#70AD47" }}>
                <span style={{ color: "#FFF", fontSize: 12 }}>
                  Intermediate
                </span>
              </div>
            </div>
            <div className={classes.rowItem}>
              <span
                style={{ fontSize: 13, textAlign: "right", marginLeft: "16%" }}
              >
                Knapshot Score
              </span>
              <div
                className={classes.count}
                style={{ background: "lightgray" }}
              >
                <span style={{ color: "#000" }}> 3 - 5 </span>
              </div>
            </div>
            <hr />
            <p style={{ fontSize: 13, marginBottom: 3 }}>
              Business with simple website with no-commerce or booking
              capabilities
            </p>
            <p style={{ fontSize: 13, marginBottom: 3 }}>
              Listed on couple of online directories and {"> 1"} social
              accounts.
            </p>
            <p style={{ fontSize: 13, marginBottom: 3 }}>
              Uses limited online marketing tools
            </p>
          </div>
        </Popper>
      );
    else if (label === "High")
      return (
        <Popper open={toggle[index]} anchorEl={anchorEl}>
          <div className={classes.popupItem} style={{ top: "-120px" }}>
            <div className={classes.rowItem}>
              <span
                style={{ fontSize: 13, textAlign: "right", marginRight: 10 }}
              >
                Digital Engagement Status
              </span>
              <div className={classes.count} style={{ background: "#03B1F1" }}>
                <span style={{ color: "#FFF", fontSize: 12 }}>High</span>
              </div>
            </div>
            <div className={classes.rowItem}>
              <span
                style={{ fontSize: 13, textAlign: "right", marginLeft: "16%" }}
              >
                Knapshot Score
              </span>
              <div
                className={classes.count}
                style={{ background: "lightgray" }}
              >
                <span style={{ color: "#000" }}> 5 - 8 </span>
              </div>
            </div>
            <hr />
            <p style={{ fontSize: 13, marginBottom: 3 }}>
              Business with advanced website with e-commerce capabilities
            </p>
            <p style={{ fontSize: 13, marginBottom: 3 }}>
              Has several social accounts
            </p>
            <p style={{ fontSize: 13, marginBottom: 3 }}>
              Uses online marketing/advertising tools
            </p>
          </div>
        </Popper>
      );
    else
      return (
        <Popper open={toggle[index]} anchorEl={anchorEl}>
          <div
            className={classes.popupItem}
            style={{ top: "-160px", right: "90px" }}
          >
            <div className={classes.rowItem}>
              <span
                style={{ fontSize: 13, textAlign: "right", marginRight: 10 }}
              >
                Digital Engagement Status
              </span>
              <div className={classes.count} style={{ background: "#4472C5" }}>
                <span style={{ color: "#FFF", fontSize: 12 }}>Advanced</span>
              </div>
            </div>
            <div className={classes.rowItem}>
              <span
                style={{ fontSize: 13, textAlign: "right", marginLeft: "16%" }}
              >
                Knapshot Score
              </span>
              <div
                className={classes.count}
                style={{ background: "lightgray" }}
              >
                <span style={{ color: "#000" }}> {"> 8"} </span>
              </div>
            </div>
            <hr />
            <p style={{ fontSize: 13, marginBottom: 3 }}>
              Business with advanced website with e-commerce capabilities
            </p>
            <p style={{ fontSize: 13, marginBottom: 3 }}>
              Has several social accounts
            </p>
            <p style={{ fontSize: 13, marginBottom: 3 }}>
              Uses sophisticated online marketing/advertising/analytic tools
            </p>
          </div>
        </Popper>
      );
  };

  const calculatePercent = (value) => {
    return Math.round((value / chartData.count) * 100);
  };

  const renderProgressBar = (label, value) => {
    let p = (value / chartData.count) * 100;
    let color = digitals[label];
    return <ProgressBar value={p} variant={label} />;
  };

  const oldAdminUI = () => {
    return (
      <Grid container>
        <Grid item xs={12} sm={4} md={4}>
          {selectedCompany.count > 0 ? (
            <CompanyLists />
          ) : (
              <div className={classes.marginBoxShadow}>
                <div style={{ margin: "0px 50px" }}>
                  <Text
                    value={"Digital Engagement Segmentation"}
                    className={classes.centerBorderBottom}
                  />
                  <Text value={"Account Breakdown"} className={classes.center2} />
                  <DoughNutChart chartData={chartData} />
                  {chartData && renderListItems(chartData.data)}
                </div>
              </div>
            )}
        </Grid>
        <Grid item xs={12} sm={8} md={8} style={{ marginLeft: "-15px" }}>
          <div className={classes.rightSide}>
            <RightSide company={company} />
          </div>
        </Grid>
      </Grid>
    );
  };

  const renderUserUI = () => {
    switch (fieldType) {
      case 0:
        return (
          <RenderNewCompanyList {...props} clearAllFilter={clearAllFilter} />
        );
      default:
        return (
          <RenderNewCompanyList {...props} clearAllFilter={clearAllFilter} />
        );
    }
    return (
      <>
        {/* <RenderNewCompanyList {...props} clearAllFilter={clearAllFilter} /> */}
        {/* <ThreeColorProgressBar /> */}
      </>
    );
  };

  return (
    <div className={classes.root}>
      {userData.role === "qc checker" ? <QCChecker /> : renderUserUI()}
    </div>
  );
}

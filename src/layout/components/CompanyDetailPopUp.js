import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, Paper, Grid, Divider, Tooltip } from "@material-ui/core";
import {
  Favorite,
  Remove,
  LocationOnOutlined,
  Phone,
  Language,
  EmailOutlined,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  YouTube,
  Clear,
} from "@material-ui/icons";
import grey from "@material-ui/core/colors/grey";
import OutsideClickHandler from "react-outside-click-handler";
import Text from "components/core/Text";
import Icon from "components/core/CustomIcon";
import HoverPopover from "components/core/HoverPopover";
import { CircularProgressbar } from "react-circular-progressbar";

import Technology from "./Technology";

//util
import { getSession } from "util/check-auth";

//API
import api from "api";

//constants
import endpoints from "constants/endpoints";
import { digitals } from "constants/digitals";
import { Icons } from "constants/icons";
import { color } from "constants/color";

//context
import { useAppValue } from "context/app";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    marginLeft: 10,
  },
  rootMain: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: window.innerHeight + 260,
    zIndex: 2,
    padding: 10,
    backgroundColor: "#988f8f57",
  },
  main: {
    position: "absolute",
    top: 40,
    right: -20,
    width: "90%",
    height: window.innerHeight + 190,
    zIndex: 2,
    padding: 10,
    margin: "15px 6%",
  },
  simpleColumn: {
    display: "flex",
    flexDirection: "column",
  },
  simpleRow: {
    display: "flex",
    flexDirection: "row",
  },
  center2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  score: {
    width: 70,
    height: 70,
    fontWeight: "600",
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: "15px 0",
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
  text: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "lightgray",
    },
    marginBottom: 5,
  },
  icon: {
    float: "right",
    fontSize: 18,
    padding: 0,
  },
  center: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textButton: {
    color: color.primary,
    cursor: "pointer",
    padding: "5px",
  },
  scroll: {
    width: "100%",
    // height: "63%",
    height: window.innerHeight - 380,
    overflowY: "scroll",
    overflowX: "scroll",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    // "flexBasis": "100%",
    flex: "1 1 50%",
  },
  innerColumn: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    paddingLeft: 10,
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  logo: {
    width: 50,
    height: 50,
    backgroundColor: "#757575",
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // fontSize: 22,
    fontWeight: 600,
  },
}));

function LeftSide({ partner, award, personnel }) {
  const classes = useStyles();

  const trimArray = (array) => array.map((string) => string.trim());

  let googlePartner = "",
    otherPartner = "",
    obj = {};

  // partner && trimArray(partner.split(",")).filter(x => x).map(part => {
  //     if (part.toLowerCase().includes("google")) {
  //         if (!googlePartner) googlePartner = part
  //         else googlePartner += " ," + part
  //     }
  //     else {
  //         if (!otherPartner) otherPartner = part
  //         else otherPartner += " ," + part
  //     }
  // })

  // console.log(partner)

  if (partner && partner != "-") {
    let { Google, ...others } = JSON.parse(partner);
    let arrs = [];

    googlePartner = Google ? Google.toString() : "-";
    Object.values(others).map((arr) => arrs.push(...arr));
    otherPartner = arrs ? arrs.toString().replace(/,/g, " ,") : "-";
  } else googlePartner = "-";

  // console.log("googlePartner",googlePartner)
  // console.log("otherPartner",otherPartner)

  let personnels = [
    {
      personnel_name: "ABCDEFGHIJK",
      title: "EAAAAAAAAAA AAAAAAA",
      linkedIn: "https://www.linkedin.com/company/2359-media/about/",
    },
    {
      personnel_name: "ABCDEFGHIJK",
      title: "EAAAAAAAAAA AAAAAAA",
      linkedIn: "https://www.linkedin.com/company/2359-media/about/",
    },
    {
      personnel_name: "ABCDEFGHIJK",
      title: "EAAAAAAAAAA AAAAAAA",
      linkedIn: "https://www.linkedin.com/company/2359-media/about/",
    },
    {
      personnel_name: "ABCDEFGHIJK",
      title: "EAAAAAAAAAA AAAAAAA",
      linkedIn: "https://www.linkedin.com/company/2359-media/about/",
    },
  ];
  return (
    <div
      style={{
        height: window.innerHeight / 2 + 150,
        overflowY: "scroll",
        padding: 10,
      }}
    >
      {/* <Paper style={{ boxShadow: "10px 10px 10px 0px #ccc", margin: "5px 0px" }}> */}
      <Paper style={{ margin: "5px 0px" }}>
        <Text
          value="Staff Found"
          style={{
            fontWeight: 600,
            fontSize: 14,
            padding: 10,
            borderBottom: "1px solid lightgray",
          }}
        />
        <div style={{ height: 140, overflowY: "scroll" }}>
          {personnel &&
            personnel.map((person, index) => (
              <>
                {person.linkedIn && (
                  <>
                    <div className={classes.simpleRow}>
                      {/* <PersonOutline style={{ fontSize: 46, color: grey[500] }} /> */}
                      <i
                        class="fa fa-user"
                        style={{
                          fontSize: 32,
                          color: grey[400],
                          padding: "10px 5px 10px 10px",
                        }}
                      ></i>
                      <div className={classes.innerColumn}>
                        <Text
                          value={person.personnel_name}
                          style={{
                            fontSize: 14,
                            margin: "5px 0 2px 0",
                            color: "black",
                          }}
                        />
                        <Text
                          value={person.title}
                          style={{
                            fontSize: 12,
                            color: "#757575",
                            paddingTop: "-5px",
                          }}
                        />
                      </div>

                      <a href={person.linkedIn} target="_blank">
                        <Icon
                          icon={
                            <Tooltip title={person.linkedIn}>
                              <LinkedIn style={{ fontSize: 28 }} />
                            </Tooltip>
                          }
                        />
                      </a>
                    </div>
                    {index < personnel.length - 1 && (
                      <Divider orientation="horizontal" />
                    )}
                  </>
                )}
              </>
            ))}
        </div>
      </Paper>
      <Paper style={{ height: 130, margin: "10px 0px", padding: "0px 10px" }}>
        <Text
          value="Partners"
          style={{ fontWeight: 700, fontSize: 14, padding: "2px 10px" }}
        />
        <Divider orientation="horizontal" />
        <div style={{ height: 95, overflow: "scroll" }}>
          <Text value={googlePartner} style={{ fontSize: 10, padding: 10 }} />
          <Text value={otherPartner} style={{ fontSize: 10, padding: 10 }} />
        </div>
      </Paper>
      <Paper style={{ height: 130, overflowY: "scroll", margin: "10px 0px" }}>
        <Text
          value="Awards"
          style={{ fontWeight: 700, fontSize: 14, padding: "2px 10px" }}
        />
        <Divider orientation="horizontal" />
        <Text value={award} style={{ fontSize: 10, padding: 10 }} />
      </Paper>
    </div>
  );
}

function RightSide({ product_service, color, style }) {
  const classes = useStyles();
  let colorData = color || "black";
  return (
    <div style={{ height: window.innerHeight / 2 + 150, overflowY: "scroll" }}>
      <Text
        value="Product/ Services"
        style={{
          fontWeight: 600,
          fontSize: 14,
          padding: 10,
          borderBottom: "1px solid lightgray",
        }}
      />
      {product_service &&
        Object.keys(product_service)
          .filter((key) => product_service[key].length)
          .map((key) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                ...style,
                padding: "15px 10px",
              }}
            >
              <Text value={key} style={{ fontSize: 12, fontWeight: 600 }} />
              <div className={classes.simpleRow} style={{ flexWrap: "wrap" }}>
                {product_service[key].map((values) => (
                  <Text
                    value={values}
                    style={{
                      fontSize: 10,
                      textAlign: "center",
                      color: colorData,
                      diplay: "flex",
                      alignItems: "center",
                      padding: 6,
                      margin: 7,
                      borderRadius: 5,
                      backgroundColor: grey[300],
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
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
  // console.log("count", count);
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
          style={{
            whiteSpace: count && count.length > 5 ? "normal" : "nowrap",
          }}
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

export default function CompanyDetailPopUp(props) {
  const classes = useStyles();

  // const { icon, visible, setVisible, x } = props;

  const [state, dispatch] = useAppValue();
  const { companyData, companyPopup, companyListReload } = state;

  // const [visible, setVisible] = useState(false);
  const [renderData, setRenderData] = useState({});

  useEffect(() => {
    setRenderData(companyData);
  }, [companyData]);

  const handleCancel = () => {
    dispatch({ type: "setCompanyPopup" });
  };

  const addToFav = async (company_name, id, compData) => {
    if (compData.favCompList) {
      const response = await api().post(endpoints.addCompToFavList, {
        company_name: company_name,
        user_id: getSession("user").id,
      });
      if (response.status === 200) {
        let tempData = companyData;
        tempData.favCompList = !tempData.favCompList;
        setRenderData(tempData);
        // dispatch({ type: "setCompanyPopup", companyData: tempData, companyPopup: true })
        dispatch({
          type: "setCompanyListReload",
          condition: !companyListReload,
        });
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
          let tempData = companyData;
          tempData.favCompList = !tempData.favCompList;
          setRenderData(tempData);
          // dispatch({ type: "setCompanyPopup", companyData: tempData, companyPopup: true })
          dispatch({
            type: "setCompanyListReload",
            condition: !companyListReload,
          });
        }
      } else {
        dispatch({
          type: "setOpenFavList",
          condition: true,
          company: company_name,
        });
      }
    }
  };
  // console.log("renderData", renderData);

  return (
    <OutsideClickHandler
      onOutsideClick={() => dispatch({ type: "setCompanyPopup" })}
    >
      <div className={classes.root} {...props}>
        {companyPopup && (
          <div className={classes.rootMain}>
            <Paper className={classes.main}>
              <Clear
                onClick={handleCancel}
                style={{ float: "right", cursor: "pointer" }}
              />

              {/* <Grid container spacing={1} style={{ boxShadow: "10px 10px 10px 0px #ccc", padding: "5px 0px" }} > */}

              {/* <Grid item xs={12} sm={5} md={5} style={{ borderRight: "#ccc solid 1px", margin: "15px" }}> */}
              <Grid
                container
                spacing={1}
                style={{
                  boxShadow: "10px 10px 10px 0px #ccc",
                  padding: "5px 0px",
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
                              value="Digital Engagement"
                            />
                            <div
                              className={classes.score}
                              style={{ position: "relative" }}
                            >
                              <CircularProgressbar
                                value={renderData.ksScore * 10}
                                text={renderData.ksScore}
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
                              value={calcKScore(renderData.ksScore).type}
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
                              //  whiteSpace: "nowrap"
                            }}
                            value={renderData.company_name}
                          />
                          <Text
                            value={renderData.category}
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
                      {renderData.customScore &&
                      renderData.customScore.value ? (
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
                              value={renderData.customScore.name}
                            />
                            <div
                              className={classes.score}
                              style={{ position: "relative" }}
                            >
                              <CircularProgressbar
                                value={renderData.customScore.value * 10}
                                text={renderData.customScore.value}
                              />
                            </div>
                            <Text
                              className={classes.digitalEngagementText}
                              value={
                                calcCustomScore(renderData.customScore).type
                              }
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
                            color: renderData.favCompList
                              ? "#0080ff"
                              : grey[400],
                          }}
                          onClick={() =>
                            addToFav(
                              renderData.company_name,
                              renderData.id,
                              renderData
                            )
                          }
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
                      <Grid
                        container
                        spacing={1}
                        style={{ padding: "5px 0px" }}
                      >
                        <Grid item xs={12} sm={6} md={6}>
                          <LabelIconCount2
                            keyName={"Partners"}
                            count={renderData.partnerCount}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <LabelIconCount2
                            keyName={"Awards"}
                            count={renderData.awardCount || 0}
                          />
                        </Grid>
                      </Grid>
                      <Divider orientation="horizontal" />
                      <Grid
                        container
                        spacing={1}
                        style={{ padding: "5px 0px" }}
                      >
                        <LabelIconCountIndustry
                          keyName={"HQ"}
                          count={renderData.HQ}
                        />
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
                              value={renderData.dataset}
                              style={{ fontSize: "10px" }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={8} md={8}>
                      <Grid
                        container
                        spacing={1}
                        style={{ padding: "5px 0px" }}
                      >
                        {Object.keys(renderData).length &&
                          Object.keys(renderData.infoArr).map((key) => {
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
                                  count={renderData.infoArr[key]}
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
                                  count={renderData.infoArr[key]}
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
                            count={renderData.Advertising}
                          />
                          <LabelIconCount2
                            keyName={"Ecommerce"}
                            count={renderData.Ecommerce}
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
                            count={renderData.Analytics}
                          />
                          <LabelIconCount2
                            keyName={"Hosting"}
                            count={renderData.Hosting}
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
                            count={renderData.Productivity}
                          />
                          <LabelIconCount2
                            keyName={"Widgets"}
                            count={renderData.Widgets}
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
                  <div
                    className={classes.simpleRow}
                    style={{ justifyContent: "space-between", padding: "6%" }}
                  >
                    <Text
                      value="Contact"
                      className={classes.companyListLabel}
                    />
                    <div
                      className={classes.simpleRow}
                      style={{ justifyContent: "space-between" }}
                    >
                      <a
                        href={`tel:${renderData.phone}`}
                        target="_blank"
                        className={classes.link}
                        style={{ paddingRight: 20 }}
                      >
                        <HoverPopover
                          title={renderData.phone}
                          icon={
                            <Phone style={{ fontSize: 22, color: "grey" }} />
                          }
                        />
                      </a>
                      <a
                        href={`mailto:${renderData.email}`}
                        target="_top"
                        className={classes.link}
                        style={{ paddingRight: 20 }}
                      >
                        {/* <Icon icon={<Tooltip title={renderData.email}><EmailOutlined style={{ fontSize: 22 }} /></Tooltip>} /> */}
                        <HoverPopover
                          title={renderData.email}
                          icon={
                            <EmailOutlined
                              style={{ fontSize: 22, color: "grey" }}
                            />
                          }
                        />
                      </a>
                      <a
                        href={renderData.website}
                        target="_blank"
                        className={classes.link}
                      >
                        {/* <Icon icon={<Tooltip title={renderData.website}><Language style={{ fontSize: 22 }} /></Tooltip>} /> */}
                        <HoverPopover
                          title={renderData.website}
                          icon={
                            <Language style={{ fontSize: 22, color: "grey" }} />
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
                      <Text
                        value="Social"
                        className={classes.companyListLabel}
                      />
                      <Text
                        value={renderData.socialCount}
                        className={classes.companyListLabel}
                        style={{ fontSize: 18, paddingRight: "5%" }}
                      />
                    </div>
                    <div
                      className={classes.simpleRow}
                      style={{ padding: "1% 6%" }}
                    >
                      {renderData.facebook !== "-" && (
                        <div style={{ width: "20%" }}>
                          <a href={renderData.facebook} target="_blank">
                            {/* <Icon icon={<Tooltip title={renderData.facebook}><Facebook style={{ fontSize: 28 }} /></Tooltip>} /> */}
                            <HoverPopover
                              title={renderData.facebook}
                              icon={
                                <Facebook
                                  style={{ fontSize: 22, color: "grey" }}
                                />
                              }
                            />
                          </a>
                        </div>
                      )}
                      {renderData.instagram !== "-" && (
                        <div style={{ width: "20%" }}>
                          <a href={renderData.instagram} target="_blank">
                            {/* <Icon icon={<Tooltip title={renderData.instagram}><Instagram style={{ fontSize: 28 }} /></Tooltip>} /> */}
                            <HoverPopover
                              title={renderData.instagram}
                              icon={
                                <Instagram
                                  style={{ fontSize: 22, color: "grey" }}
                                />
                              }
                            />
                          </a>
                        </div>
                      )}

                      {renderData.linkedIn !== "-" && (
                        <div style={{ width: "20%" }}>
                          <a href={renderData.linkedIn} target="_blank">
                            {/* <Icon icon={<Tooltip title={renderData.linkedIn}><LinkedIn style={{ fontSize: 28 }} /></Tooltip>} /> */}
                            <HoverPopover
                              title={renderData.linkedIn}
                              icon={
                                <LinkedIn
                                  style={{ fontSize: 22, color: "grey" }}
                                />
                              }
                            />
                          </a>
                        </div>
                      )}
                      {renderData.twitter !== "-" && (
                        <div style={{ width: "20%" }}>
                          <a href={renderData.twitter} target="_blank">
                            {/* <Icon icon={<Tooltip title={renderData.twitter}><Twitter style={{ fontSize: 28 }} /></Tooltip>} /> */}
                            <HoverPopover
                              title={renderData.twitter}
                              icon={
                                <Twitter
                                  style={{ fontSize: 22, color: "grey" }}
                                />
                              }
                            />
                          </a>
                        </div>
                      )}
                      {renderData.youtube !== "-" && (
                        <div style={{ width: "20%" }}>
                          <a href={renderData.youtube} target="_blank">
                            {/* <Icon icon={<Tooltip title={renderData.youtube}><YouTube style={{ fontSize: 28 }} /></Tooltip>} /> */}
                            <HoverPopover
                              title={renderData.youtube}
                              icon={
                                <YouTube
                                  style={{ fontSize: 22, color: "grey" }}
                                />
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
                    <Remove
                      onClick={handleCancel}
                      style={{
                        fontSize: 22,
                        padding: 5,
                        borderRadius: "50%",
                        backgroundColor: "#f3bd16",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </Grid>
              </Grid>

              {/* </Grid> */}

              {/* <Grid item xs={12} sm={7} md={7} style={{ borderRight: "#ccc solid 1px", margin: "15px" }}> */}
              <Grid
                container
                spacing={1}
                style={{
                  boxShadow: "10px 10px 10px 0px #ccc",
                  padding: "5px 0px",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={3}
                  md={3}
                  style={{ borderRight: "#ccc solid 1px" }}
                >
                  <LeftSide
                    personnel={renderData.personnel}
                    partner={renderData.partner}
                    award={renderData.award}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  style={{ borderRight: "#ccc solid 1px" }}
                >
                  <Technology
                    value={"Technology"}
                    index={2}
                    company={renderData}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  md={3}
                  style={{ borderRight: "#ccc solid 1px" }}
                >
                  <RightSide product_service={renderData.product_service} />
                </Grid>
              </Grid>
              {/* </Grid> */}

              {/* </Grid> */}
            </Paper>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
}

CompanyDetailPopUp.defaultProps = {
  label: "",
};

CompanyDetailPopUp.propType = {
  icon: PropTypes.node,
  label: PropTypes.string,
};

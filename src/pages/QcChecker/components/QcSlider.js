import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import VerifiedUserOutlinedIcon from "@material-ui/icons/VerifiedUserOutlined";
import TrackInvertedSlider from "./Slider2";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
//components
import Text from "components/core/Text";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    padding: 10,
    borderBottom: `1px solid ${grey[300]}`,
    minHeight: 90,
    minWidth: 390,
    cursor: "pointer",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
  divider: {
    borderRight: `2px solid ${grey[300]}`,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    minHeight: 110,
  },
  digitalEngagementItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: "15px 0",
  },
  // row: {
  //     display: 'flex',
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     justifyContent: 'space-between'
  // },
  profile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    backgroundColor: grey[400],
    borderRadius: 10,
    position: "relative",
  },
  profileIcon: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  popover: {
    padding: 5,
    maxWidth: 300,
  },
  link: {
    textDecoration: "none",
  },
  score: {
    width: 70,
    height: 70,
    fontWeight: "600",
  },
  digitalEngagementText: {
    fontSize: 10,
    // fontWeight: '600',
    padding: "5px 0px",
  },
}));

export default function QcSlider(props) {
  let {
    companyId,
    setData,
    setCompanyId,
    setCompanyIndex,
    mainData,
    x,
    index,
  } = props;
  const classes = useStyles();
  const [toggle, setToggle] = useState(false);
  const [page, setPage] = useState(9);
  // const [companyId, setCompanyId] = useState()
  const needDominantBaselineFix = true;
  const onCompanySelect = (obj) => setData(obj);
  const getVerifiedCount = (veri) => {
    let count = 0;
    if (veri) for (let value of Object.values(veri)) if (value) count++;
    return count;
  };

  function PendingCountFunc(veri) {
    let count = 0;
    if (veri)
      for (let value of Object.values(veri)) {
        if (!value) count++;
      }
    return count;
  }

  function VerifiedCountFunc(veri) {
    let count = 0;
    if (veri)
      for (let value of Object.values(veri)) {
        if (value) count++;
      }
    return count;
  }

  function getTotalFieldCount(data) {
    return Object.keys(data).length;
  }

  let RightPercent = (obj) =>
    Math.round((VerifiedCountFunc(obj) / getTotalFieldCount(obj)) * 100);

  const CrossPercent = (obj) => 100 - RightPercent(obj);
  const loadMore = () => {
    setPage((preValue) => preValue + 10);
  };
  return (
    <React.Fragment>
      {/* {mainData.slice(0, page).map((x, index) => ( */}
      <Grid
        container
        style={{
          borderBottom: "1px solid lightgrey",
          padding: 10,
          backgroundColor: companyId == x.id ? "#efefef" : "white",
        }}
      >
        <Grid item xs={12} sm={3} md={3}>
          <div className={classes.digitalEngagementItem}>
            <div className={classes.score} style={{ position: "relative" }}>
              <CircularProgressbar
                value={PendingCountFunc(x.verified) * 10}

                // text={<tspan dy={needDominantBaselineFix ? 10 : 0}>{PendingCountFunc(x.verified)}</tspan>}
                // styles={buildStyles({
                //     textColor: "#212121",
                //     textSize: '32px',
                //     fontFamily: 'system-ui',
                //     dominantbaseline: 'middle'
                // })}
              />
              <Text
                style={{
                  position: "absolute",
                  top: 12,
                  left: 17,
                  fontSize: 10,
                }}
                value="Pending"
              />
              <Text
                style={{
                  position: "absolute",
                  top: 29,
                  left:
                    PendingCountFunc(x.verified).toString().length == 1
                      ? "42%"
                      : "36%",
                  fontSize: 17,
                }}
                value={PendingCountFunc(x.verified)}
              />
            </div>
            <Text
              className={classes.digitalEngagementText}
              value={"Fields Types"}
            />
            {x.status == "Issue" ? <ThumbDownAltOutlinedIcon /> : <></>}
            {x.status == "Irrelevant" ? <RemoveCircleOutlineIcon /> : <></>}
          </div>
        </Grid>
        <Grid
          className={classes.column}
          item
          xs={12}
          sm={9}
          md={9}
          style={{ padding: "10px 15px", borderLeft: "1px solid lightgrey" }}
        >
          <Grid container>
            <Grid item xs={11} sm={11} md={11}>
              <Text
                className={classes.digitalEngagementText}
                value={x.company_data.name}
              />
            </Grid>
            <Grid item xs={1} className={classes.row}>
              <Add
                onClick={() => {
                  onCompanySelect(x);
                  setToggle(true);
                  setCompanyId(x.id);
                  setCompanyIndex(index);
                }}
                style={{
                  fontSize: 22,
                  padding: 5,
                  borderRadius: "50%",
                  backgroundColor: "#f3bd16",
                  cursor: "pointer",
                }}
              />
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 15 }}>
            <Grid item xs={11} sm={11} md={11}>
              <div
                className={classes.simpleRow}
                style={{
                  border: "#ccc solid 1px",
                  borderRadius: 6,
                  marginBottom: "40px",
                  whiteSpace: "nowrap",
                  padding: 12,
                  textAlign: "center",
                  width: "97%",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className={classes.simpleRow}
                  styles={{ marginRight: "3%" }}
                >
                  <VerifiedUserOutlinedIcon />
                  <Text
                    value={`${VerifiedCountFunc(
                      x.verified
                    )}/${getTotalFieldCount(x.verified)}`}
                  />
                </div>
                <div className={classes.simpleRow}>
                  {/* <Text value={"/"} style={{border:'dotted',borderRadius:5,fontSize:'10px',fontWeight:'bold',width:'13px',height:'12px',marginRight:'7px'}}/> */}

                  <CheckCircleOutlineIcon />
                  <Text value={`${RightPercent(x.verified)}%`} />
                </div>
                <div className={classes.simpleRow}>
                  <HighlightOffIcon />
                  {/* <CloseTwoToneIcon style={{border:'dotted',borderRadius:5,width:'13px',height:'12px',marginRight:'7px'}}/> */}
                  <Text value={`${CrossPercent(x.verified)}%`} />
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 15, marginLeft: 11 }}>
            <Grid item xs={11} sm={11} md={11} style={{ position: "relative" }}>
              <TrackInvertedSlider
                percent={
                  (x.oldAvailibleCount / getTotalFieldCount(x.verified)) * 100
                }
                aLabel={x.oldAvailibleCount}
                mLabel={x.oldMissingCount}
                a={
                  ((x.oldAvailibleCount - x.availible.length) /
                    getTotalFieldCount(x.verified)) *
                  100
                }
                m={
                  ((x.oldAvailibleCount + x.missing.length) /
                    getTotalFieldCount(x.verified)) *
                  100
                }
              />
              {/* <TrackInvertedSlider percent={26 / 33 * 100} aLabel={26} mLabel={7} a={getVerifiedCount(x.verified) / 33 * 100} m={32 / 33 * 100} /> */}
              {/* <TrackInvertedSlider
                                        percent={VerifiedCountFunc(x.verified) / getTotalFieldCount(x.verified) * 100}
                                        aLabel={VerifiedCountFunc(x.verified)}
                                        mLabel={x.missing.length}
                                        a={getVerifiedCount(x.verified) / getTotalFieldCount(x.verified) * 100}
                                        m={x.missing.length / getTotalFieldCount(x.verified) * 100}
                                    /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* ))}
      <Text
        value="Load More"
        onClick={loadMore}
        style={{
          textDecoration: "underline",
          cursor: "pointer",
          color: "blue",
          textAlign: "center",
        }}
      /> */}
    </React.Fragment>
  );
}

QcSlider.defaultProps = {
  company: {},
  index: 0,
};

QcSlider.propType = {
  company: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

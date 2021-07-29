import React, { Fragment, useEffect, useState } from "react";
import { makeStyles, Grid } from "@material-ui/core";

//components
import Text from "components/core/Text";
import Button from "components/core/Btn";
import SortPopover from "components/core/SortPopover";
import QcSlider from "./QcSlider";

import api from "api";

//util
import { getSession } from "util/check-auth";

//constants
import endpoints from "constants/endpoints";
import { useAppValue } from "context/app";
const useStyles = makeStyles((theme) => ({
  root: {
    height: window.innerHeight - 140,
    overflowY: "scroll",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  column: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  count: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
}));

export default function CompanyLists(props) {
  let {
    otherData,
    assigned,
    mainObj,
    setStatus,
    sortFilter,
    setSortFilter,
    countObj,
    setCountObj,
    lists,
    count,
    activeIndex,
    loading,
    page,
    companyId,
    setData,
    setCompanyId,
    setCompanyIndex,
  } = props;
  let {
    start_date,
    end_date,
    totalMissing,
    totalVerified,
    totalFields,
    verifiedCompany,
    unVerifiedCompany,
  } = otherData;
  let { missing, available, verified, unVerified } = mainObj;

  const classes = useStyles();

  let [toggleCheck, setToggleCheck] = React.useState(false);
  let [toggleChecks, setToggleChecks] = React.useState(false);
  let [issueCheck, setIssueCheck] = useState(false);
  let [IrreCheck, setIrreCheck] = useState(false);
  const [state, dispatch] = useAppValue();

  useEffect(() => {
    dispatch({ type: "setSortFilter", sortData: sortFilter });
  }, [sortFilter]);

  const loadMore = () => {
    dispatch({ type: "loading" });
    dispatch({ type: "setSelectedCheckerCompanyPage", page: page + 1 });
  };
  // console.log("page", page, count);

  const checkCount = () => {
    if (page * 10 < count) {
      return loading ? (
        <div
          className="fa-2x"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 50,
          }}
        >
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      ) : (
        <Text
          value="Load More"
          onClick={loadMore}
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            color: "blue",
            textAlign: "center",
          }}
        />
      );
    } else {
      return null;
    }
  };
  React.useEffect(() => {
    async function getCount() {
      const checker = await api().post(`${endpoints.getCheckerCounts}`, {
        id: getSession("user").id,
      });
      if (checker.status === 200) {
        setCountObj(checker.data.count);
      }
    }

    getCount();
  }, []);
  // console.log('checkercount',countObj)
  // let { total, missing } = totalField
  // console.log("lists", lists);
  return (
    <div>
      <Grid
        container
        style={{ borderBottom: "1px solid lightgrey", padding: 13 }}
      >
        <Grid item xs={1} />
        <Grid
          item
          xs={2}
          sm={2}
          md={2}
          className={classes.column}
          style={{
            cursor: "pointer",
            backgroundColor: toggleCheck ? "lightgray" : "white",
            borderRadius: "10%",
          }}
        >
          <Text
            value={`Unverified `}
            onClick={() => {
              setStatus("Unverified");
              setToggleCheck(true);
              setToggleChecks(false);
              setIssueCheck(false);
              setIrreCheck(false);
            }}
          />
          <Text value={`(${countObj.Unverified || 0})`} />
        </Grid>
        <Grid
          item
          xs={2}
          sm={2}
          md={2}
          className={classes.column}
          style={{
            cursor: "pointer",
            backgroundColor: toggleChecks ? "lightgray" : "white",
            borderRadius: "10%",
          }}
        >
          <Text
            value={`Verified `}
            onClick={() => {
              setStatus("Verified");
              setToggleChecks(true);
              setToggleCheck(false);
              setIssueCheck(false);
              setIrreCheck(false);
            }}
          />
          <Text value={`(${countObj.Verified || 0})`} />
        </Grid>
        <Grid
          item
          xs={3}
          sm={3}
          md={3}
          className={classes.column}
          style={{
            cursor: "pointer",
            backgroundColor: issueCheck ? "lightgray" : "white",
            borderRadius: "10%",
          }}
        >
          <Text
            value={`URL Issues`}
            onClick={() => {
              setStatus("Issue");
              setToggleChecks(false);
              setToggleCheck(false);
              setIssueCheck(true);
              setIrreCheck(false);
            }}
          />
          <Text value={`(${countObj.Issue || 0})`} />
        </Grid>
        <Grid
          item
          xs={2}
          sm={2}
          md={2}
          style={{
            cursor: "pointer",
            backgroundColor: IrreCheck ? "lightgray" : "white",
            borderRadius: "10%",
          }}
        >
          <Text
            value={`Irrelevant`}
            onClick={() => {
              setStatus("Irrelevant");
              setToggleChecks(false);
              setToggleCheck(false);
              setIssueCheck(false);
              setIrreCheck(true);
            }}
          />
          <Text value={`(${countObj.Irrelevant || 0})`} />
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <SortPopover
            onSelectChange={setSortFilter}
            options={[
              "Alphabetical Order: A-Z",
              "Alphabetical Order: Z-A",
              "Ads Exp: Highest first",
              "Digital Engagement: Highest first",
            ]}
          />
        </Grid>
      </Grid>
      <div className={classes.root}>
        {lists.map((company, index) => {
          return (
            <QcSlider
              companyId={companyId}
              setData={setData}
              setCompanyId={setCompanyId}
              setCompanyIndex={setCompanyIndex}
              style={{
                border: company.id === activeIndex ? "2px solid blue" : "none",
                borderRadius: 10,
              }}
              index={index}
              x={company}
              index={index}
            />
          );
        })}
        {checkCount()}
        {/* <QcSlider {...props} /> */}
      </div>
    </div>
  );
}

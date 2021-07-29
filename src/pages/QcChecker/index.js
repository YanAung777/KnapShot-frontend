import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Paper,
  Popper,
  Grid,
  Divider,
  ButtonGroup,
  IconButton,
  Checkbox,
  Button,
  Tooltip,
} from "@material-ui/core";
import CompanyLists from "./components/Qclist";
import CustomizedProgressBars from "./components/QCheader";
import SmallHeader from "./components/QcSmallHeader";
import { useAppValue } from "context/app";
//API
import api from "api";

//util
import { getSession } from "util/check-auth";

//constants
import { digitals } from "constants/digitals";
import endpoints from "constants/endpoints";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
}));

function dataProcessing(arr) {
  let missing = 0,
    totalField = 0,
    verified = 0;
  for (let row of arr) {
    missing += row.missing.length;
    totalField += Object.keys(row.company_data).length;
    verified += Object.values(row.verified).filter((x) => x == true).length;
  }
  return {
    missing,
    available: totalField - missing,
    verified,
    unVerified: totalField - verified,
  };
}

function getAllTrueCount(arr) {
  let count = 0;
  for (let obj of arr) {
    if (Object.values(obj).every((x) => x == true)) count++;
  }
  return count;
}

async function getAllVerifiedCount(arr) {
  let count = 0;
  for (let obj of arr) {
    for (let value of Object.values(obj)) {
      if (value) count++;
    }
  }
  return count;
}

async function getAllAvailableCount(arr) {
  let count = 0;
  for (let obj of arr) {
    for (let value of Object.values(obj)) {
      if (value && value != "-") count++;
    }
  }
  return count;
}
async function getAllCount(obj) {
  let count = 0;
  for (let value of Object.values(obj)) {
    if (value && value != "-") count++;
  }

  return count;
}

async function getTotalCompanyFieldCount(obj) {
  if (obj) return Object.keys(obj).length;
  return 0;
}

export default function QCChecker() {
  const classes = useStyles();
  let [data, setData] = useState({});
  let [companyId, setCompanyId] = useState(0);
  const [state, dispatch] = useAppValue();
  let [reason, setReason] = useState("");
  let [companyIndex, setCompanyIndex] = useState(0);
  let [mainData, setMainData] = useState([]);
  let [otherData, setOtherData] = useState({});
  const [status, setStatus] = useState();
  const [filter, setFilter] = useState("");
  let issue = [
    "Website not working",
    "Website under construction",
    "Domain expired",
  ];
  const [opentumb, setOpentumb] = useState(false);
  let [sortFilter, setSortFilter] = useState();
  const [countObj, setCountObj] = useState({});
  let [mainObj, setMainObj] = useState({});
  const {
    lists,
    count,
    page,
    activeIndex,
    loading,
  } = state.selectedCheckerCompany;
  const onsSelectChange = (filename) => {
    if (filename) setFilter(filename);
  };

  useEffect(() => {
    if (filter) setOpentumb(true);
    else setOpentumb(false);
  }, [filter, opentumb]);

  // console.log('filter', filter)
  // function setMainDataChanges(data) {
  //     let tempMainData = [...mainData]
  //     setMainData(tempMainData)
  // }

  // function setMainDataChanges(data) {
  //     let tempMainData = [...mainData]
  //     tempMainData[companyIndex].verified = data
  //     setMainData(tempMainData)
  // }

  function setMainDataChanges(
    verified,
    missing,
    availible,
    missing_found,
    missing_correct
  ) {
    let tempMainData = [...mainData];
    if (verified) tempMainData[companyIndex].verified = verified;
    if (missing) tempMainData[companyIndex].missing = missing;
    if (availible) tempMainData[companyIndex].availible = availible;
    if (missing_found) tempMainData[companyIndex].missing_found = missing_found;
    if (missing_correct)
      tempMainData[companyIndex].missing_correct = missing_correct;
    setMainData(tempMainData);
  }
  // console.log("maindata", mainData);
  // console.log("comIn", companyIndex);
  // console.log("other", otherData);
  // function setCompanyIdFunc(index) {
  //     let idData = ids[index]
  //     setCompanyId(idData)
  //     setCompanyIndex(index)
  // }

  // function VerifiedCountFunc(index) {
  //     let veri = verifiedData[index]
  //     let count = 0
  //     if (veri)
  //         for (let value of Object.values(veri)) {
  //             if (value) count++
  //         }
  //     return count

  // }

  // function PendingCountFunc(index) {
  //     let veri = verifiedData[index]
  //     let count = 0
  //     if (veri)
  //         for (let value of Object.values(veri)) {
  //             if (!value) count++
  //         }
  //     return count

  // }

  // function getTotalFieldCount(index) {
  //     let veri = verifiedData[index]
  //     if (veri) return Object.keys(veri).length
  //     return 0
  // }

  // function getMissingFieldCount(index) {
  //     let veri = missing[index]
  //     SetMissingf(veri)
  //     // if (veri) return Object.keys(veri).length
  //     // return 0
  // }
  React.useEffect(() => {
    async function getList() {
      // const checker = await api().get(`${endpoints.getCheckerByLastAssign}/${getSession("user").id}`);
      // if (checker.status === 200) {
      //     setMainData(checker.data.company_data)
      //     setVerifiedData(checker.data.verifiedArr)
      //     setOtherData(checker.data.others)
      //     setOldMissing(checker.data.missing)
      //     setIds(checker.data.ids)
      //     setVerifiedCount(checker.data.verifiedArr)
      //     SetMissing(checker.data.missing)
      // }

      const checker = await api().post(
        `${endpoints.getCheckerByLastAssign + "?page=" + page}`,
        { id: getSession("user").id, status, sortFilter }
      );
      if (checker.status === 200) {
        let { data, others } = checker.data;
        setMainData(checker.data.companies);
        setOtherData(others);
        // setOldMissing(totalMissing)
        // setVerified(totalVerified)
        // setTotalFieldCount(totalFields)
        // setAvailable(totalFields - totalMissing)
        dispatch({
          type: "resetSelectedCheckerCompanies",
          companies: checker.data.companies,
          count: checker.data.count,
          loading: false,
        });
      }
    }

    async function getMore() {
      const checker = await api().post(
        `${endpoints.getCheckerByLastAssign + "?page=" + page}`,
        { id: getSession("user").id, status, sortFilter }
      );
      if (checker.status === 200) {
        let { data, others } = checker.data;
        setMainData(checker.data.companies);
        setOtherData(others);
        dispatch({
          type: "setSelectedCheckerCompanies",
          companies: checker.data.companies,
          count: checker.data.count,
          loading: false,
        });
      }
    }

    if (page == 1) getList();
    else getMore();
    // }, [status, sortFilter, page]);
  }, [status, sortFilter, page]);
  // console.log(mainData.length)

  React.useEffect(() => {
    async function setDataProcessedDataFunc() {
      setMainObj(dataProcessing(mainData));
    }
    setDataProcessedDataFunc();
  }, [mainData]);

  // React.useEffect(() => {
  //     async function setCompleteFunc() {
  //         setComplete(getAllTrueCount(verifiedData))
  //         setAvailable(getAllTrueCount(verifiedData))
  //     }
  //     setCompleteFunc()
  // }, [mainData]);
  // console.log('hello',mainData)
  return (
    <div className={classes.root}>
      {/* <div className={classes.row}> */}

      <Grid container>
        <Grid item xs={12}>
          <CustomizedProgressBars
            otherData={otherData}
            assigned={mainData.length}
            mainObj={mainObj}
            // assignData={{ complete, assigned: verifiedData.length }}
            // totalField={{ total: totalFieldCount, missing: (totalFieldCount - available) }}
            // verified={verified}
            // oldMissing={oldMissing}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <CompanyLists
            otherData={otherData}
            assigned={mainData.length}
            mainObj={mainObj}
            mainData={mainData}
            opentumb={opentumb}
            setData={setData}
            setCompanyId={setCompanyId}
            companyId={companyId}
            reason={reason}
            setReason={setReason}
            setCompanyIndex={setCompanyIndex}
            setStatus={setStatus}
            sortFilter={sortFilter}
            setSortFilter={setSortFilter}
            countObj={countObj}
            setCountObj={setCountObj}
            lists={lists}
            count={count}
            page={page}
            activeIndex={activeIndex}
            loading={loading}
            // VerifiedCount={VerifiedCountFunc}
            // getMissingFieldCount={getMissingFieldCount}
            // getTotalFieldCount={getTotalFieldCount}
            // PendingCountFunc={PendingCountFunc}
            // available={available}
            // company_data={data}
            // verified={verified}
            // totalField={{ total: totalFieldCount, missing: (totalFieldCount - available) }}
            // verifiedData={verifiedData}
            // getAllTrueCount={getAllTrueCount}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={9}
          md={9}
          style={{ backgroundColor: "lightgray" }}
        >
          <SmallHeader
            dataObj={data}
            // company_data={data}
            onsSelectChange={onsSelectChange}
            issue={issue}
            filter={filter}
            setFilter={setFilter}
            opentumb={opentumb}
            setOpentumb={setOpentumb}
            id={companyId}
            setMainDataChanges={setMainDataChanges}
            // setVerifiedDataChanges={setVerifiedDataChanges}
            // verifiedData={verifiedData[companyIndex]}
          />
        </Grid>
      </Grid>

      {/* <Divider style={{ padding: 10, borderLeft: "1px solid lightgrey" }}/> */}

      {/* </div> */}
    </div>
  );
}

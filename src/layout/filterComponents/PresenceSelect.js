import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Paper,
  Grid,
  ButtonBase,
  Typography,
  Popper,
  Checkbox,
  Button,
  Divider,
} from "@material-ui/core";
import { Check, Search, Close } from "@material-ui/icons";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
// import clsx from 'clsx';
import OutsideClickHandler from "react-outside-click-handler";
import Text from "components/core/Text";
import countryList from "constants/country-and-continent-codes-list.json";
import groupCountry from "util/groupCountry";
import RangeSelector from "./RangeSelectorForYearIO";

import SearchBar from "material-ui-search-bar";

//API
import api from "api";

//constants
import endpoints from "constants/endpoints";
import { color } from "constants/color";

//context
import { useAppValue } from "context/app";
import { fromPairs } from "lodash";
import zIndex from "@material-ui/core/styles/zIndex";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    marginleft: 10,
    cursor: "pointer",
  },
  rootroot: {
    flexGrow: 1,
  },
  button: {
    zIndex: -1,
    // border: '1.2px solid lightgray',
    // borderRadius: 20,
    padding: "6px 10px 3px 0px",
    height: 30,
    color: "#212121",
    fontSize: "12px",
    fontFamily: "Helvetica",
    // minWidth: 120,
    display: "flex",
    alignItems: "center",
    // justifyContent: 'flex-start'
  },
  option: {
    position: "absolute",
    top: 30,
    width: 500,
    marginLeft: -430,
    zIndex: 3,
    padding: 10,
  },
  text: {
    // cursor: 'pointer',
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
    margin: "10px 0px",
  },
  center1: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: "10px 0px",
  },
  centerleft: {
    display: "flex",
    width: "50%",
    minHeight: "300px",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: "10px 0px",
    borderRight: "1px solid black",
    // backgroundColor: "blue"
  },
  center3: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: "10px 0px",
    // backgroundColor: "blue"
  },
  center2: {
    display: "flex",
    width: "100%",
    paddingBottom: "5px",
    // backgroundColor: "green"
  },
  centerRight: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: "5px",
    // backgroundColor: "green"
  },
  right: {
    display: "flex",
    width: "90%",
  },
  right1: {
    display: "flex",
    width: "10%",
  },
  centerDivider: {
    width: "100%",
    paddingBottom: "5px",
    // backgroundColor: "green"
  },
  centerHQ: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // backgroundColor: "red"
  },
  textButton: {
    cursor: "pointer",
    padding: "5px",
    textAlign: "left",
    fontSize: 11,
  },
  scroll: {
    width: "50%",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflowY: "scroll",
    overflowX: "scroll",
  },
}));

function checkCount(arr, length) {
  const func = (trueOrFalse) => trueOrFalse;
  // let count = 0
  // arr.map((v) => v && count++)
  // return count === length
  let trueCount = 0,
    falseCount = 0;
  for (let bool of arr) func(bool) ? trueCount++ : falseCount++;
  // if (trueCount === 0 || falseCount === 0) return false
  //console.log("count",trueCount)
  if (trueCount > 0) return true;
  // return !arr.every(func)
}

export default function CustomSelect(props) {
  const classes = useStyles();

  const { options, icon, data, filteredData, reload } = props;

  const [state, dispatch] = useAppValue();
  const {
    yearIORangeFilter,
    companyUploadFilter,
    companyUploadFilter3,
  } = state;

  const [visible, setVisible] = useState(false);
  const [visibleSide, setVisibleSide] = useState(false);
  const [visibleHQ, setVisibleHQ] = useState(false);
  const [visibleCountry, setVisibleCountry] = useState(false);
  const [visibleCity, setVisibleCity] = useState(false);
  const [yearIO, setYearIO] = useState([]);
  const [allCheckBoxes, setAllCheckBoxes] = useState({});

  let [search, setSearch] = useState("");
  let [mainData, setMainData] = useState([]);
  let [mainDataFilter, setMainDataFilter] = useState([]);
  let [hqlocationData, setHQLocationData] = useState({});
  let [hqlocationDataFilter, setHQLocationDataFilter] = useState({});
  let [countryPresenceData, setCountryPresenceData] = useState({});
  let [countryPresenceDataFilter, setCountryPresenceDataFilter] = useState({});
  let [cityPresenceData, setCityPresenceData] = useState({});
  let [cityPresenceDataFilter, setCityPresenceDataFilter] = useState({});
  let [renderData, setRenderData] = useState([]);

  let [rangeValue, setRangeValue] = useState(yearIORangeFilter);
  let [hqlocation, setHQLocation] = useState({});
  let [countrydata, setCountryData] = useState({});
  let [citydata, setCityData] = useState({});
  let [checkHQ, setCheckHQ] = useState("true");
  let [checkCountry, setCheckCountry] = useState("true");
  let [checkCity, setCheckCity] = useState("true");

  function sum(obj) {
    var sum = 0;
    for (var el in obj) {
      if (obj.hasOwnProperty(el)) {
        sum += parseFloat(obj[el]);
      }
    }
    return sum;
  }

  const toggle = () => {
    setVisible(!visible);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  let obj = {};
  let objCountry = {};
  let objCity = {};
  let arr = [];
  let arr1 = [];
  let arr2 = [];
  let counts = {};
  let counts1 = {};
  let counts2 = {};
  let test = {};
  let country = {
    "1 Country": 0,
    "2-5 Country": 0,
    "6-20 Country": 0,
    ">20 Country": 0,
  };
  let city = { "1 City": 0, "2-5 City": 0, "6-20 City": 0, ">20 City": 0 };
  const checkOrNot = (name) => (allCheckBoxes[name] ? true : false);

  useEffect(() => {
    for (let row of data) {
      if (!row["HQ Location"]) {
        if (!obj["Blank"]) obj["Blank"] = 0;
        obj["Blank"] += 1;
      } else {
        for (let h of row["HQ Location"].split("|")) {
          arr2.push(h);
        }
      }
    }
    for (let row of data) {
      if (!row["Country Presence"]) {
        if (!objCountry["Blank"]) objCountry["Blank"] = 0;
        objCountry["Blank"] += 1;
      } else {
        if (row["Country Presence"].split("|").length === 1) {
          country["1 Country"] = country["1 Country"] + 1;
        }
        if (
          row["Country Presence"].split("|").length >= 2 &&
          row["Country Presence"].split("|").length <= 5
        ) {
          country["2-5 Country"] = country["2-5 Country"] + 1;
        }
        if (
          row["Country Presence"].split("|").length >= 6 &&
          row["Country Presence"].split("|").length <= 20
        ) {
          country["6-20 Country"] = country["6-20 Country"] + 1;
        }
        if (row["Country Presence"].split("|").length > 20) {
          country[">20 Country"] = country[">20 Country"] + 1;
        }

        for (let country of row["Country Presence"].split("|")) {
          arr1.push(country);
        }
      }
    }
    for (let row of data) {
      if (!row["City Presence"]) {
        if (!objCity["Blank"]) objCity["Blank"] = 0;
        objCity["Blank"] += 1;
      } else {
        // console.log("XX", row["City Presence"].split("|"));
        if (row["City Presence"].split("|").length === 1) {
          city["1 City"] = city["1 City"] + 1;
        }
        if (
          row["City Presence"].split("|").length >= 2 &&
          row["City Presence"].split("|").length <= 5
        ) {
          city["2-5 City"] = city["2-5 City"] + 1;
        }
        if (
          row["City Presence"].split("|").length >= 6 &&
          row["City Presence"].split("|").length <= 20
        ) {
          city["6-20 City"] = city["6-20 City"] + 1;
        }
        if (row["City Presence"].split("|").length > 20) {
          city[">20 City"] = city[">20 City"] + 1;
        }

        for (let city of row["City Presence"].split("|")) {
          arr.push(city);
        }
      }
    }

    if (arr.length !== 0) {
      arr.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
      });
      // objCity = {...objCity, ...counts};
    }
    if (arr1.length !== 0) {
      arr1.forEach(function (x) {
        counts1[x] = (counts1[x] || 0) + 1;
      });
    }
    if (arr2.length !== 0) {
      arr2.forEach(function (x) {
        counts2[x] = (counts2[x] || 0) + 1;
      });
    }

    let hqfilter = groupCountry(counts2);
    let countryfilter = groupCountry(counts1);
    // console.log("zzz", hqfilter);

    setMainData(obj);
    setHQLocationData({
      ...obj,
      Country: hqfilter,
    });
    setCityPresenceData({
      ...objCity,
      "Range Breakdown": city,
      "City Breakdown": counts,
    });
    setCountryPresenceData({
      ...objCountry,
      "Range Breakdown": country,
      "Country Breakdown": countryfilter,
    });
  }, [data]);

  useEffect(() => {
    for (let row of filteredData) {
      if (!row["HQ Location"]) {
        if (!obj["Blank"]) obj["Blank"] = 0;
        obj["Blank"] += 1;
      } else {
        for (let h of row["HQ Location"].split("|")) {
          arr2.push(h);
        }
      }
    }
    for (let row of filteredData) {
      if (!row["Country Presence"]) {
        if (!objCountry["Blank"]) objCountry["Blank"] = 0;
        objCountry["Blank"] += 1;
      } else {
        if (row["Country Presence"].split("|").length === 1) {
          country["1 Country"] = country["1 Country"] + 1;
        }
        if (
          row["Country Presence"].split("|").length >= 2 &&
          row["Country Presence"].split("|").length <= 5
        ) {
          country["2-5 Country"] = country["2-5 Country"] + 1;
        }
        if (
          row["Country Presence"].split("|").length >= 6 &&
          row["Country Presence"].split("|").length <= 20
        ) {
          country["6-20 Country"] = country["6-20 Country"] + 1;
        }
        if (row["Country Presence"].split("|").length > 20) {
          country[">20 Country"] = country[">20 Country"] + 1;
        }

        for (let country of row["Country Presence"].split("|")) {
          arr1.push(country);
        }
      }
    }
    for (let row of filteredData) {
      if (!row["City Presence"]) {
        if (!objCity["Blank"]) objCity["Blank"] = 0;
        objCity["Blank"] += 1;
      } else {
        // console.log("XX", row["City Presence"].split("|"));
        if (row["City Presence"].split("|").length === 1) {
          city["1 City"] = city["1 City"] + 1;
        }
        if (
          row["City Presence"].split("|").length >= 2 &&
          row["City Presence"].split("|").length <= 5
        ) {
          city["2-5 City"] = city["2-5 City"] + 1;
        }
        if (
          row["City Presence"].split("|").length >= 6 &&
          row["City Presence"].split("|").length <= 20
        ) {
          city["6-20 City"] = city["6-20 City"] + 1;
        }
        if (row["City Presence"].split("|").length > 20) {
          city[">20 City"] = city[">20 City"] + 1;
        }

        for (let city of row["City Presence"].split("|")) {
          arr.push(city);
        }
      }
    }

    if (arr.length !== 0) {
      arr.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
      });
      // objCity = {...objCity, ...counts};
    }
    if (arr1.length !== 0) {
      arr1.forEach(function (x) {
        counts1[x] = (counts1[x] || 0) + 1;
      });
    }
    if (arr2.length !== 0) {
      arr2.forEach(function (x) {
        counts2[x] = (counts2[x] || 0) + 1;
      });
    }

    let hqfilter = groupCountry(counts2);
    let countryfilter = groupCountry(counts1);
    // console.log("zzz", hqfilter);

    setMainDataFilter(obj);
    setHQLocationDataFilter({
      ...obj,
      Country: hqfilter,
    });
    setCityPresenceDataFilter({
      ...objCity,
      "Range Breakdown": city,
      "City Breakdown": counts,
    });
    setCountryPresenceDataFilter({
      ...objCountry,
      "Range Breakdown": country,
      "Country Breakdown": countryfilter,
    });
  }, [filteredData]);

  let HQCount = 0;
  let a = 0;
  let b = 0;
  const CountryHQ = { ...hqlocationData["Country"] };
  // console.log("jjjj", CountryHQ);
  for (let g in CountryHQ) {
    for (let c in CountryHQ[g]) {
      a += CountryHQ[g][c];
    }
  }
  const CountryHQFilter = { ...hqlocationDataFilter["Country"] };
  // console.log("jjjj", CountryHQ);
  for (let g in CountryHQFilter) {
    for (let c in CountryHQFilter[g]) {
      b += CountryHQFilter[g][c];
    }
  }

  let CountryCount = 0;
  let h = 0;
  let d = 0;
  const CountryBreakdown = { ...countryPresenceData["Country Breakdown"] };
  const RangeBreakdown1 = { ...countryPresenceData["Range Breakdown"] };
  for (let g in CountryBreakdown) {
    for (let c in CountryBreakdown[g]) {
      h += CountryBreakdown[g][c];
    }
  }

  const CountryBreakdownFilter = { ...countryPresenceDataFilter["Country Breakdown"] };
  for (let g in CountryBreakdownFilter) {
    for (let c in CountryBreakdownFilter[g]) {
      d += CountryBreakdownFilter[g][c];
    }
  }

  let CityCount = 0;
  let e = 0;
  let f = 0;
  const CityBreakdown = { ...cityPresenceData["City Breakdown"] };
  const RangeBreakdown = { ...cityPresenceData["Range Breakdown"] };
  Object.keys(CityBreakdown).forEach(
    (key, index) => (e += CityBreakdown[key])
  );

  const CityBreakdownFilter = { ...cityPresenceDataFilter["City Breakdown"] };
  Object.keys(CityBreakdownFilter).forEach(
    (key, index) => (f += CityBreakdownFilter[key])
  );

  Object.keys(mainData).forEach((key, index) => {
    if (mainDataFilter[key]) {
      HQCount = b;
      CountryCount = d;
      CityCount = f;
      mainData[key] = mainDataFilter[key];

    }
    else {
      HQCount = 0;
      CountryCount = 0;
      CityCount = 0;
      mainData[key] = 0;
    }
  }
  )

  Object.keys(hqlocationData).forEach((key, index) => {
    if (hqlocationDataFilter[key]) {
      hqlocationData[key] = hqlocationDataFilter[key];
    }
    else {
      hqlocationData[key] = 0;
    }
  }
  )

  Object.keys(countryPresenceData).forEach((key, index) => {
    if (countryPresenceDataFilter[key]) {
      countryPresenceData[key] = countryPresenceDataFilter[key];
    }
    else {
      countryPresenceData[key] = 0;
    }
  }
  )

  Object.keys(cityPresenceData).forEach((key, index) => {
    if (cityPresenceDataFilter[key]) {
      cityPresenceData[key] = cityPresenceDataFilter[key];
    }
    else {
      cityPresenceData[key] = 0;
    }
  }
  )

  let hq = JSON.parse(JSON.stringify(hqlocationData));
  let co = JSON.parse(JSON.stringify(countryPresenceData));
  let ci = JSON.parse(JSON.stringify(cityPresenceData));

  const iterate = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "object") {
        iterate(obj[key]);
      } else {
        obj[key] = true;
      }
    });
  };

  const iteratefalse = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "object") {
        iteratefalse(obj[key]);
      } else {
        obj[key] = false;
      }
    });
  };

  useEffect(() => {
    let obj;
    if (hqlocationData) {
      // for (let i in hqlocationData) {
      //     if (typeof hqlocationData[i] === "number") {
      //         obj = {
      //             ...obj,
      //             [i]: true
      //         }
      //     }
      //     else if (typeof hqlocationData[i] === 'object' && hqlocationData[i] !== null) {
      //         for (let j in hqlocationData[i]) {
      //             if (typeof hqlocationData[i][j] === "number") {
      //                 obj = {
      //                     ...obj,
      //                     [i]: {
      //                         ...obj[i],
      //                         [j]: true
      //                     }
      //                 }
      //             }
      //             else if (typeof hqlocationData[i][j] === 'object' && hqlocationData[i][j] !== null) {
      //                 for (let k in hqlocationData[i][j]) {
      //                     if (typeof hqlocationData[i][j][k] === "number") {
      //                         obj = {
      //                             ...obj,
      //                             [i]: {
      //                                 ...obj[i],
      //                                 [j]: {

      //                                     // ...obj[i][j],
      //                                     // ...obj.i.j,
      //                                     [k]: true
      //                                 }
      //                             }
      //                         }
      //                     }
      //                 }

      //             }
      //         }

      //     }
      // }

      iterate(hq);
      setHQLocation(hq);
    }
  }, [hqlocationData]);

  useEffect(() => {
    let obj;
    if (countryPresenceData) {
      iterate(co);
      setCountryData(co);
    }
  }, [countryPresenceData]);

  useEffect(() => {
    let obj;
    if (cityPresenceData) {
      iterate(ci);
      setCityData(ci);
    }
  }, [cityPresenceData]);
  // console.log("hqSelect", hqlocation);
  // console.log("countrySelect", countrydata);
  // console.log("citySlect", citydata);
  const handleSave = () => {
    let HQLocation = [];
    let CountryRange = [];
    let CountrySelect = [];
    let CityRange = [];
    let CitySelect = [];
    if (hqlocation) {
      if (hqlocation.Blank == true) {
        HQLocation.push("undefined");
      }
      if (hqlocation.Country.Asia) {
        for (let value of Object.keys(hqlocation.Country.Asia)) {
          if (hqlocation.Country.Asia[value] == true) HQLocation.push(value);
        }
      }
      if (hqlocation.Country.Africa) {
        for (let value of Object.keys(hqlocation.Country.Africa)) {
          if (hqlocation.Country.Africa[value] == true) HQLocation.push(value);
        }
      }
      if (hqlocation.Country.Europe) {
        for (let value of Object.keys(hqlocation.Country.Europe)) {
          if (hqlocation.Country.Europe[value] == true) HQLocation.push(value);
        }
      }
      if (hqlocation.Country.Oceania) {
        for (let value of Object.keys(hqlocation.Country.Oceania)) {
          if (hqlocation.Country.Oceania[value] == true) HQLocation.push(value);
        }
      }
      if (hqlocation.Country["South America"]) {
        for (let value of Object.keys(hqlocation.Country["South America"])) {
          if (hqlocation.Country["South America"][value] == true)
            HQLocation.push(value);
        }
      }
      if (hqlocation.Country.Unknown) {
        for (let value of Object.keys(hqlocation.Country.Unknown)) {
          if (hqlocation.Country.Unknown[value] == true) HQLocation.push(value);
        }
      }
      dispatch({
        type: "setCompanyUploadFilter",
        filter: { "HQ Location": HQLocation },
      });
    }
    if (countrydata) {
      if (countrydata.Blank == true) {
        CountryRange.push("Blank");
      }
      for (let value of Object.keys(countrydata["Range Breakdown"])) {
        if (countrydata["Range Breakdown"][value] == true)
          CountryRange.push(value);
      }
      dispatch({
        type: "setCompanyUploadFilter3",
        filter: { CountryCount: CountryRange },
      });
      if (countrydata["Country Breakdown"].Asia) {
        for (let value of Object.keys(countrydata["Country Breakdown"].Asia)) {
          if (countrydata["Country Breakdown"].Asia[value] == true)
            CountrySelect.push(value);
        }
      }
      if (countrydata["Country Breakdown"].Africa) {
        for (let value of Object.keys(
          countrydata["Country Breakdown"].Africa
        )) {
          if (countrydata["Country Breakdown"].Africa[value] == true)
            CountrySelect.push(value);
        }
      }
      if (countrydata["Country Breakdown"].Europe) {
        for (let value of Object.keys(
          countrydata["Country Breakdown"].Europe
        )) {
          if (countrydata["Country Breakdown"].Europe[value] == true)
            CountrySelect.push(value);
        }
      }
      if (countrydata["Country Breakdown"].Oceania) {
        for (let value of Object.keys(
          countrydata["Country Breakdown"].Oceania
        )) {
          if (countrydata["Country Breakdown"].Oceania[value] == true)
            CountrySelect.push(value);
        }
      }
      if (countrydata["Country Breakdown"]["South America"]) {
        for (let value of Object.keys(
          countrydata["Country Breakdown"]["South America"]
        )) {
          if (countrydata["Country Breakdown"]["South America"][value] == true)
            CountrySelect.push(value);
        }
      }
      if (countrydata["Country Breakdown"].Unknown) {
        for (let value of Object.keys(
          countrydata["Country Breakdown"].Unknown
        )) {
          if (countrydata["Country Breakdown"].Unknown[value] == true)
            CountrySelect.push(value);
        }
      }
      dispatch({
        type: "setCompanyUploadFilter",
        filter: { "Country Presence": CountrySelect },
      });
      // console.log("CountrySelect", CountrySelect);
      // console.log("countryRange", CountryRange);
    }
    if (citydata) {
      if (citydata.Blank == true) {
        CityRange.push("Blank");
      }
      for (let value of Object.keys(citydata["Range Breakdown"])) {
        if (citydata["Range Breakdown"][value] == true) CityRange.push(value);
      }
      dispatch({
        type: "setCompanyUploadFilter3",
        filter: { CityCount: CityRange },
      });
      for (let value of Object.keys(citydata["City Breakdown"])) {
        if (citydata["City Breakdown"][value] == true) CitySelect.push(value);
      }
      dispatch({
        type: "setCompanyUploadFilter",
        filter: { "City Presence": CitySelect },
      });
    }
    // dispatch({
    //   type: "setCompanyUploadFilter",
    //   filter: { "Years in Operation": yearIO },
    // });
    setVisible(false);
  };

  const handleSide = () => {
    setVisibleSide(true);
    setVisibleHQ(!visibleHQ);
    setVisibleCountry(false);
    setVisibleCity(false);
  };
  const handleSideCountry = () => {
    setVisibleSide(true);
    setVisibleHQ(false);
    setVisibleCountry(!visibleCountry);
    setVisibleCity(false);
  };
  const handleSideCity = () => {
    setVisibleSide(true);
    setVisibleHQ(false);
    setVisibleCountry(false);
    setVisibleCity(!visibleCity);
  };

  const clearFilter = () => {
    // pass true or false to check or uncheck all

    setCheckHQ(false);
    iteratefalse(hq);
    setHQLocation(hq);
    setCheckCountry(false);
    iteratefalse(co);
    setCountryData(co);
    setCheckCity(false);
    iteratefalse(ci);
    setCityData(ci);
    // onSelectChange([])
  };

  const checkAll = (event) => {
    setCheckHQ(true);
    iterate(hq);
    setHQLocation(hq);
    setCheckCountry(true);
    iterate(co);
    setCountryData(co);
    setCheckCity(true);
    iterate(ci);
    setCityData(ci);
  };

  useEffect(() => {
    checkAll();
  }, [reload]);

  const renderYearIO = () => {
    if (!renderData.length) return "Presence";
    if (
      checkCount(Object.values(allCheckBoxes)) ||
      (rangeValue.length && (rangeValue[0].min || rangeValue[0].max))
    )
      return (
        <React.Fragment>
          <Text value={"Presence"} />
          <Text
            value={"!"}
            style={{
              fontSize: "20px",
              color: color.primary,
              paddingLeft: "5px",
            }}
          />
        </React.Fragment>
      );
    else return <Text value={"Presence"} />;
  };

  const handlePresenceSelectCheckbox = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    const index = e.target.id;

    let test = name.split("|");

    let tempCheckBox = { ...hqlocation };
    if (test[0] && test[1] && test[2]) {
      tempCheckBox[test[0]][test[1]][test[2]] = checked;
    } else {
      tempCheckBox[test[0]] = checked;
    }

    setHQLocation(tempCheckBox);
  };

  const handlePresenceSelectCheckbox1 = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    const index = e.target.id;

    let test = name.split("|");

    let tempCheckBox = { ...countrydata };
    if (test[0] && test[1] && test[2]) {
      tempCheckBox[test[0]][test[1]][test[2]] = checked;
    } else if (test[0] && test[1]) {
      tempCheckBox[test[0]][test[1]] = checked;
    } else {
      tempCheckBox[test[0]] = checked;
    }

    setCountryData(tempCheckBox);
    // console.log("jujulay", countrydata);
  };

  const handlePresenceSelectCheckbox2 = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    const index = e.target.id;

    let test = name.split("|");

    let tempCheckBox = { ...citydata };
    if (test[0] && test[1] && test[2]) {
      tempCheckBox[test[0]][test[1]][test[2]] = checked;
    } else if (test[0] && test[1]) {
      tempCheckBox[test[0]][test[1]] = checked;
    } else {
      tempCheckBox[test[0]] = checked;
    }

    setCityData(tempCheckBox);
  };

  const handleCheckboxHQ = (e) => {
    const checked = e.target.checked;
    setCheckHQ(checked);
    if (checked === false) {
      iteratefalse(hq);
      setHQLocation(hq);
    } else {
      iterate(hq);
      setHQLocation(hq);
    }
  };
  const handleCheckboxCountry = (e) => {
    const checked = e.target.checked;
    setCheckCountry(checked);
    if (checked === false) {
      iteratefalse(co);
      setCountryData(co);
    } else {
      iterate(co);
      setCountryData(co);
    }
  };
  const handleCheckboxCity = (e) => {
    const checked = e.target.checked;
    setCheckCity(checked);
    if (checked === false) {
      iteratefalse(ci);
      setCityData(ci);
    } else {
      iterate(ci);
      setCityData(ci);
    }
  };

  const handleYearIOCheckbox = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    const index = e.target.id;

    let tempCheckBox = [...allCheckBoxes];
    let tempYearIO = [...yearIO];

    tempCheckBox[index] = checked;

    if (checked && !tempYearIO.includes(name)) tempYearIO.push(name);
    else tempYearIO.splice(tempYearIO.indexOf(name), 1);

    setYearIO(tempYearIO);
    setAllCheckBoxes(tempCheckBox);
  };
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setVisible(false);
      }}
    >
      <div className={classes.root} {...props}>
        <div onClick={toggle}>
          <div className={classes.button}>
            {renderYearIO()}
            <ArrowDropDownIcon />
          </div>
        </div>

        {visible && (
          <Paper className={classes.option}>
            <div
              className={classes.center}
              style={{ justifyContent: "space-between" }}
            >
              <Text
                value={"Clear Filter"}
                className={classes.textButton}
                onClick={clearFilter}
              />
              <Text
                value={"Select All"}
                className={classes.textButton}
                onClick={(e) => checkAll(e)}
              />
              {/* <Typography>Select All ({sum(mainData)})</Typography> */}
            </div>
            <Divider />
            <div
              className={classes.center}
              style={{
                justifyContent: "space-between",
                backgroundColor: "lightgrey",
                padding: 2,
              }}
            >
              <Text
                value={"Cancel"}
                className={classes.textButton}
                onClick={handleCancel}
              />
              <Text
                value={"Save"}
                className={classes.textButton}
                onClick={() => handleSave()}
              />
            </div>
            <div className={classes.centerHQ}>
              <div className={classes.centerleft}>
                <div className={classes.centerRight}>
                  <div className={classes.right}>
                    <input
                      type="checkbox"
                      checked={checkHQ}
                      onChange={handleCheckboxHQ}
                    />
                    <Typography
                      style={{ fontSize: "12px" }}
                      onClick={handleSide}
                    >
                      HQ Location
                    </Typography>
                    <Typography style={{ fontSize: "12px" }}>
                      &nbsp;( {HQCount} ){" "}
                    </Typography>
                  </div>
                  <div className={classes.right1}>
                    <ArrowForwardIosIcon />
                  </div>
                </div>
                <div className={classes.centerRight}>
                  <div className={classes.right}>
                    <input
                      type="checkbox"
                      checked={checkCountry}
                      onChange={handleCheckboxCountry}
                    />
                    <Typography
                      style={{ fontSize: "12px" }}
                      onClick={handleSideCountry}
                    >
                      Country Presence
                    </Typography>
                    <Typography style={{ fontSize: "12px" }}>
                      &nbsp;( {CountryCount} ){" "}
                    </Typography>
                  </div>
                  <div className={classes.right1}>
                    <ArrowForwardIosIcon />
                  </div>
                </div>
                <div className={classes.centerRight}>
                  <div className={classes.right}>
                    <input
                      type="checkbox"
                      checked={checkCity}
                      onChange={handleCheckboxCity}
                    />
                    <Typography
                      style={{ fontSize: "12px" }}
                      onClick={handleSideCity}
                    >
                      City Presence
                    </Typography>
                    <Typography style={{ fontSize: "12px" }}>
                      &nbsp;( {CityCount} ){" "}
                    </Typography>
                  </div>
                  <div className={classes.right1}>
                    <ArrowForwardIosIcon />
                  </div>
                </div>
              </div>
              {/* <div className={classes.center1}>
                                    <input
                                        type="checkbox"
                                        onChange={handleYearIOCheckbox}
                                    />
                                    <Typography style={{ fontSize: "12px" }}>
                                        HQ Location
                                </Typography>
                                    <Typography style={{ fontSize: "12px" }}>
                                        &nbsp;( {HQCount} ){" "}
                                    </Typography>
                            </div> */}
              {visibleSide ? (
                visibleHQ ? (
                  <div className={classes.scroll}>
                    {hqlocationData["Blank"] && (
                      <div className={classes.center2}>
                        <input
                          type="checkbox"
                          checked={hqlocation["Blank"]}
                          // id={index}
                          name={"Blank"}
                          onChange={handlePresenceSelectCheckbox}
                        />
                        <Typography style={{ fontSize: "12px" }}>
                          Blank
                        </Typography>
                        <Typography style={{ fontSize: "12px" }}>
                          &nbsp;( {hqlocationData["Blank"]} ){" "}
                        </Typography>
                      </div>
                    )}

                    {Object.keys(CountryHQ).map((key, index) => (
                      <div className={classes.center1} key={`${(key, index)}`}>
                        {/* <div className={classes.center2}> */}
                        <Typography key={index} style={{ fontSize: "12px" }}>
                          {key}
                        </Typography>

                        {Object.keys(CountryHQ[key]).map((key1, index1) => (
                          <div className={classes.center3}>
                            <input
                              type="checkbox"
                              checked={hqlocation["Country"][key][key1]}
                              id={index1}
                              name={"Country" + "|" + key + "|" + key1}
                              onChange={handlePresenceSelectCheckbox}
                            />

                            <Typography
                              key={index1}
                              style={{ fontSize: "12px" }}
                            >
                              {key1}
                            </Typography>
                            <Typography
                              key={CountryHQ[key][key1]}
                              style={{ fontSize: "12px" }}
                            >
                              &nbsp;( {CountryHQ[key][key1]} ){" "}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : visibleCountry ? (
                  <div className={classes.scroll}>
                    {countryPresenceData["Blank"] && (
                      <div className={classes.center3}>
                        <input
                          type="checkbox"
                          checked={countrydata["Blank"]}
                          // id={index}
                          name={"Blank"}
                          onChange={handlePresenceSelectCheckbox1}
                        />
                        <Typography style={{ fontSize: "12px" }}>
                          Blank
                        </Typography>
                        <Typography style={{ fontSize: "12px" }}>
                          &nbsp;( {countryPresenceData["Blank"]} ){" "}
                        </Typography>
                      </div>
                    )}
                    {countryPresenceData["Range Breakdown"] && (
                      <div className={classes.centerDivider}>
                        <Typography
                          style={{
                            fontSize: "12px",
                            paddingLeft: "5px",
                            paddingBottom: "5px",
                            textAlign: "left",
                          }}
                        >
                          Range BreakDown
                        </Typography>
                        <Divider />
                      </div>
                    )}

                    {countryPresenceData["Range Breakdown"] &&
                      Object.keys(RangeBreakdown1).map((key, index) => (
                        <div
                          className={classes.center3}
                          key={`${(key, index)}`}
                        >
                          {/* <div className={classes.center2}> */}

                          <input
                            type="checkbox"
                            checked={countrydata["Range Breakdown"][key]}
                            id={index}
                            name={"Range Breakdown" + "|" + key}
                            onChange={handlePresenceSelectCheckbox1}
                          />
                          <Typography key={index} style={{ fontSize: "12px" }}>
                            {key}
                          </Typography>
                          <Typography
                            key={RangeBreakdown1[key]}
                            style={{ fontSize: "12px" }}
                          >
                            &nbsp;( {RangeBreakdown1[key]} ){" "}
                          </Typography>
                          {/* </div> */}
                        </div>
                      ))}

                    {countryPresenceData["Country Breakdown"] && (
                      <div className={classes.centerDivider}>
                        <Typography
                          style={{
                            fontSize: "12px",
                            paddingLeft: "5px",
                            paddingBottom: "5px",
                            textAlign: "left",
                          }}
                        >
                          Country BreakDown
                        </Typography>
                        <Divider />
                      </div>
                    )}

                    {Object.keys(CountryBreakdown).map((key, index) => (
                      <div className={classes.center1} key={`${(key, index)}`}>
                        {/* <div className={classes.center2}> */}
                        <Typography key={index} style={{ fontSize: "12px" }}>
                          {key}
                        </Typography>

                        {Object.keys(CountryBreakdown[key]).map(
                          (key1, index1) => (
                            <div className={classes.center3}>
                              <input
                                type="checkbox"
                                checked={
                                  countrydata["Country Breakdown"][key][key1]
                                }
                                id={index1}
                                name={
                                  "Country Breakdown" + "|" + key + "|" + key1
                                }
                                onChange={handlePresenceSelectCheckbox1}
                              />
                              <Typography
                                key={index1}
                                style={{ fontSize: "12px" }}
                              >
                                {key1}
                              </Typography>
                              <Typography
                                key={CountryBreakdown[key][key1]}
                                style={{ fontSize: "12px" }}
                              >
                                &nbsp;( {CountryBreakdown[key][key1]} ){" "}
                              </Typography>
                            </div>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                ) : visibleCity ? (
                  <div className={classes.scroll}>
                    {cityPresenceData["Blank"] && (
                      <div className={classes.center3}>
                        <input
                          type="checkbox"
                          checked={citydata["Blank"]}
                          // id={index}
                          name={"Blank"}
                          onChange={handlePresenceSelectCheckbox2}
                        />
                        <Typography style={{ fontSize: "12px" }}>
                          Blank
                        </Typography>
                        <Typography style={{ fontSize: "12px" }}>
                          &nbsp;( {cityPresenceData["Blank"]} ){" "}
                        </Typography>
                      </div>
                    )}
                    {cityPresenceData["Range Breakdown"] && (
                      <div className={classes.centerDivider}>
                        <Typography
                          style={{
                            fontSize: "12px",
                            paddingLeft: "5px",
                            paddingBottom: "5px",
                            textAlign: "left",
                          }}
                        >
                          Range BreakDown
                        </Typography>
                        <Divider />
                      </div>
                    )}

                    {cityPresenceData["Range Breakdown"] &&
                      Object.keys(RangeBreakdown).map((key, index) => (
                        <div
                          className={classes.center3}
                          key={`${(key, index)}`}
                        >
                          {/* <div className={classes.center2}> */}

                          <input
                            type="checkbox"
                            checked={citydata["Range Breakdown"][key]}
                            id={index}
                            name={"Range Breakdown" + "|" + key}
                            onChange={handlePresenceSelectCheckbox2}
                          />
                          <Typography key={index} style={{ fontSize: "12px" }}>
                            {key}
                          </Typography>
                          <Typography
                            key={RangeBreakdown[key]}
                            style={{ fontSize: "12px" }}
                          >
                            &nbsp;( {RangeBreakdown[key]} ){" "}
                          </Typography>
                          {/* </div> */}
                        </div>
                      ))}

                    {cityPresenceData["City Breakdown"] && (
                      <div className={classes.centerDivider}>
                        <Typography
                          style={{
                            fontSize: "12px",
                            paddingLeft: "5px",
                            paddingBottom: "5px",
                            textAlign: "left",
                          }}
                        >
                          City BreakDown
                        </Typography>
                        <Divider />
                      </div>
                    )}

                    {Object.keys(CityBreakdown).map((key, index) => (
                      <div className={classes.center3} key={`${(key, index)}`}>
                        <input
                          type="checkbox"
                          checked={citydata["City Breakdown"][key]}
                          id={index}
                          name={"City Breakdown" + "|" + key}
                          onChange={handlePresenceSelectCheckbox2}
                        />
                        <Typography key={index} style={{ fontSize: "12px" }}>
                          {key}
                        </Typography>
                        <Typography
                          key={CityBreakdown[key]}
                          style={{ fontSize: "12px" }}
                        >
                          &nbsp;( {CityBreakdown[key]} ){" "}
                        </Typography>
                        {/* </div> */}
                      </div>
                    ))}
                  </div>
                ) : null
              ) : (
                  <div> </div>
                )}
            </div>
            <Divider />
          </Paper>
        )}
      </div>
    </OutsideClickHandler>
  );
}

CustomSelect.defaultProps = {
  options: [],
  label: "",
};

CustomSelect.propType = {
  options: PropTypes.array.isRequired,
  icon: PropTypes.node,
  label: PropTypes.string,
};

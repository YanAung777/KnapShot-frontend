import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Paper,
  ButtonBase,
  Typography,
  Popper,
  Checkbox,
  Button,
  Divider,
} from "@material-ui/core";
import { Check, Search, Close } from "@material-ui/icons";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
// import clsx from 'clsx';
import OutsideClickHandler from "react-outside-click-handler";
import Text from "components/core/Text";
import RangeSelector from "./RangeSelectorForYearIO";

import SearchBar from "material-ui-search-bar";

//API
import api from "api";

//constants
import endpoints from "constants/endpoints";
import { color } from "constants/color";

//context
import { useAppValue } from "context/app";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    marginleft: 10,
    cursor: "pointer",
  },
  button: {
    zIndex: -1,
    // border: '1.2px solid lightgray',
    // borderRadius: 20,
    padding: "3px 10px 3px 0px",
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
    width: 250,
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
  textButton: {
    color: color.primary,
    // cursor: "pointer",
    padding: "5px",
  },
  scroll: {
    width: "100%",
    // height: "63%",
    height: 180,
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
function filtered(arr) {
  const func = (trueOrFalse) => trueOrFalse;
  return !arr.every(func);
}
export default function CustomSelect(props) {
  const classes = useStyles();

  const { options, icon, data, filteredData, reload } = props;

  const [state, dispatch] = useAppValue();
  const { companyUploadFilter3 } = state;

  const [visible, setVisible] = useState(false);

  const [yearIO, setYearIO] = useState([]);
  const [allCheckBoxes, setAllCheckBoxes] = useState({});

  let [search, setSearch] = useState("");
  let [mainData, setMainData] = useState([]);
  let [mainDataFilter, setMainDataFilter] = useState([]);
  let [renderData, setRenderData] = useState([]);
  const { companyUploadFilter } = state;
  // let [rangeValue, setRangeValue] = useState(yearIORangeFilter);
  let [rangeValue, setRangeValue] = useState([]);
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

  // console.log("rangeValue", rangeValue)
  const deleteRange = async (index) => {
    let tempArr = [...rangeValue];
    tempArr.splice(index, 1);
    setRangeValue(tempArr);
  };

  const selectRangeValues = (index, min, max, selectValue, id) => {
    let tempArr = [...rangeValue];
    tempArr[index] = {
      min: min || "",
      max: max || "",
      selectValue: selectValue || "-",
      id: id,
    };
    setRangeValue(tempArr);
    // dispatch({ type: "setYearIORangeFilter", filter: tempArr });
    // console.log("range", tempArr)
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const checkOrNot = (name) => (allCheckBoxes[name] ? true : false);

  // useEffect(() => {
  //     setYearIO(mainData)
  // }, [])
  useEffect(() => {
    let obj = {};
    let tempData = [...data];
    let rangeFilter = companyUploadFilter3["yearIO"];

    if (rangeFilter && rangeFilter.length)
      for (let each of rangeFilter) {
        let { min, max, selectValue } = each;

        tempData = tempData.filter((item) => {
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

    for (let row of tempData) {
      if (!row["Years in Operation"]) {
        if (!obj["Blank"]) obj["Blank"] = 0;
        obj["Blank"] += 1;
      } else {
        if (!obj[row["Years in Operation"]]) obj[row["Years in Operation"]] = 0;
        obj[row["Years in Operation"]] += 1;
      }
    }
    setMainData(obj);
  }, [data, companyUploadFilter3]);

  // useEffect(() => {
  //   if (Object.keys(mainData).length) {
  //     setRenderData(Object.keys(mainData));
  //     // let arr = new Array(Object.keys(mainData).length).fill(true)
  //     let arr = {};

  //     if (userYearIOFilter.length) {
  //       Object.keys(mainData).map(
  //         (cate) => (arr[cate] = userYearIOFilter.includes(cate) ? true : false)
  //       );
  //       setYearIO((oldYearIO) => {
  //         return [...new Set([...oldYearIO, ...userYearIOFilter])];
  //       });
  //     } else Object.keys(mainData).map((cate) => (arr[cate] = false)); // default check or unCheck
  //     setAllCheckBoxes(arr);
  //   }
  // }, [mainData, userYearIOFilter]);

  // useEffect(() => {
  //   setRangeValue(yearIORangeFilter);
  // }, [yearIORangeFilter]);

  useEffect(() => {
    let obj = {};
    let tempData = [...filteredData];
    let rangeFilter = companyUploadFilter3["yearIO"];

    if (rangeFilter && rangeFilter.length)
      for (let each of rangeFilter) {
        let { min, max, selectValue } = each;

        tempData = tempData.filter((item) => {
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

    for (let row of tempData) {
      if (!row["Years in Operation"]) {
        if (!obj["Blank"]) obj["Blank"] = 0;
        obj["Blank"] += 1;
      } else {
        if (!obj[row["Years in Operation"]]) obj[row["Years in Operation"]] = 0;
        obj[row["Years in Operation"]] += 1;
      }
    }
    setMainDataFilter(obj);
  }, [filteredData]);

  Object.keys(mainData).forEach((key, index) => {
    if (mainDataFilter[key]) {
      mainData[key] = mainDataFilter[key];
    } else {
      mainData[key] = 0;
    }
  });

  useEffect(() => {
    let tempArr = Object.keys(mainData);
    let checkArr = new Array(tempArr.length).fill(true);
    setYearIO(tempArr);
    setAllCheckBoxes(checkArr);
  }, [mainData]);

  const handleSave = () => {
    dispatch({
      type: "setCompanyUploadFilter",
      filter: { "Years in Operation": yearIO },
    });
    dispatch({
      type: "setCompanyUploadFilter3",
      filter: { yearIO: rangeValue },
    });
    setVisible(false);
  };

  const clearFilter = () => {
    // pass true or false to check or uncheck all

    let a = [...allCheckBoxes].map(() => false);
    setAllCheckBoxes(a);
    setYearIO([]);
    // onSelectChange([])
  };

  const checkAll = (event) => {
    let tempCheck = [...Object.keys(mainData)];
    setYearIO(Object.keys(mainData));
    setAllCheckBoxes(tempCheck);
  };
  // useEffect(() => {
  //   if (companyUploadFilter["Years in Operation"]) {
  //     if (companyUploadFilter["Years in Operation"].length == 0) {
  //       checkAll();
  //       handleSave();
  //     }
  //   }
  // }, [companyUploadFilter]);
  useEffect(() => {
    checkAll();
    let obj = {
      min: "",
      max: "",
      selectValue: "-",
      id: Math.random().toString(36).substr(2, 16),
    };
    setRangeValue([obj]);
  }, [reload]);
  // useEffect(() => {
  //   let obj = {
  //     min: "",
  //     max: "",
  //     selectValue: "-",
  //     id: Math.random().toString(36).substr(2, 16),
  //   };
  //   setRangeValue([obj]);
  // }, []);
  // const renderYearIO = () => {
  //   if (!renderData.length) return "Year In Operation";
  //   if (
  //     checkCount(Object.values(allCheckBoxes)) ||
  //     (rangeValue.length && (rangeValue[0].min || rangeValue[0].max))
  //   )
  //     return (
  //       <React.Fragment>
  //         <Text value={"Year In Operation"} />
  //         <Text
  //           value={"!"}
  //           style={{
  //             fontSize: "20px",
  //             color: color.primary,
  //             paddingLeft: "5px",
  //           }}
  //         />
  //       </React.Fragment>
  //     );
  //   else return <Text value={"Year In Operation"} />;
  // };
  const renderYIO = () => {
    if (yearIO.length === Object.keys(mainData).length)
      return "Year In Operation";
    else if (yearIO.length === 1) return yearIO[0];
    else if (yearIO.length > 1) return yearIO.length + "Year In Operation";
    else return "Select Year In Operation";
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
            <Text value={renderYIO()} />
            {filtered(Object.values(allCheckBoxes)) ||
            (rangeValue.length && (rangeValue[0].min || rangeValue[0].max)) ? (
              <Text
                value={"!"}
                style={{
                  fontSize: "20px",
                  color: color.primary,
                  paddingLeft: "5px",
                }}
              />
            ) : null}
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
            <Text
              style={{ fontWeight: 600, paddingLeft: 5, cursor: "pointer" }}
              value="+ Add new rangeValue"
              onClick={() => {
                let obj = {
                  min: "",
                  max: "",
                  selectValue: "-",
                  id: Math.random().toString(36).substr(2, 16),
                };
                // dispatch({
                //   type: "setCompanyUploadFilter",
                //   filter: [obj, ...rangeValue],
                // });
                // let tempArr = [...rangeValue]
                setRangeValue((oldRangeValue) => {
                  let obj = {
                    min: "",
                    max: "",
                    selectValue: "-",
                    id: Math.random().toString(36).substr(2, 16),
                  };
                  // dispatch({ type: "setYearIORangeFilter", filter: [obj, ...oldRangeValue] });
                  // return [...oldRangeValue, { min: '', max: '', selectValue: "-", id: Math.random().toString(36).substr(2, 16) }]
                  return [obj, ...oldRangeValue];
                });
              }}
            />
            {rangeValue.map((r, index) => (
              <RangeSelector
                setMainData={setMainData}
                allData={filteredData}
                rangeValue={rangeValue}
                key={r.id}
                keyValue={r.id}
                setValues={selectRangeValues}
                index={index}
                value={r}
                deleteRange={deleteRange}
              />
            ))}

            {/* <SearchBar
                            closeIcon={<Close style={{ fontSize: 20, marginTop: -7 }} />}
                            searchIcon={<Search style={{ fontSize: 20, marginTop: -7 }} />}
                            // InputProps={{
                            //     classes: {
                            //         input: {
                            //             fontSize: "11px"
                            //         }
                            //     },
                            // }}
                            style={{ height: 30, margin: 5 }}
                            placeholder={"Type yearIO"}
                            value={search}
                            onChange={(newValue) => {
                                setSearch(newValue)
                                yearIOFilter(newValue)
                            }}
                            onRequestSearch={yearIOFilter}
                            onCancelSearch={() => {
                                setSearch('')
                                yearIOFilter('')
                            }}
                        /> */}
            <div className={classes.scroll}>
              {Object.keys(mainData).map((key, index) => (
                <div className={classes.center} key={`${(key, index)}`}>
                  <input
                    type="checkbox"
                    checked={allCheckBoxes[index]}
                    id={index}
                    name={key}
                    onChange={handleYearIOCheckbox}
                  />
                  <Typography key={index} style={{ fontSize: "12px" }}>
                    {key}
                  </Typography>
                  <Typography key={mainData[key]} style={{ fontSize: "12px" }}>
                    &nbsp;( {mainData[key]} ){" "}
                  </Typography>
                </div>
              ))}
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

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
import { Check, Search, Close, MailRounded } from "@material-ui/icons";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
// import clsx from 'clsx';
import OutsideClickHandler from "react-outside-click-handler";
import Text from "components/core/Text";
import RangeSelector from "./RangeSelectorForEMP";

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

  const { options, icon, data, datatest, filteredData, reload } = props;

  const [state, dispatch] = useAppValue();
  const { companyUploadFilter3 } = state;

  const [visible, setVisible] = useState(false);

  const [empSize, setEmpSize] = useState([]);
  const [allCheckBoxes, setAllCheckBoxes] = useState({});

  let [search, setSearch] = useState("");
  let [mainData, setMainData] = useState([]);
  let [mainDataTest, setMainDataTest] = useState([]);
  let [aaa, setAAA] = useState([]);

  let [renderData, setRenderData] = useState([]);

  let [rangeValue, setRangeValue] = useState([]);
  const { companyUploadFilter } = state;
  // console.log("what", datatest)
  // let [rangeValue, setRangeValue] = useState([])
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

  const selectRangeValues = (index, min, max, selectValue, id) => {
    let tempArr = [...rangeValue];
    tempArr[index] = {
      min: min || "",
      max: max || "",
      selectValue: selectValue || "-",
      id: id,
    };
    setRangeValue(tempArr);
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
    let rangeFilter = companyUploadFilter3["EmpSize"];
    if (rangeFilter && rangeFilter.length)
      for (let each of rangeFilter) {
        let { min, max, selectValue } = each;

        tempData = tempData.filter((item) => {
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

    for (let row of data) {
      if (!row["Employee Size"]) {
        if (!obj["Blank"]) obj["Blank"] = 0;
        obj["Blank"] += 1;
      } else {
        if (!obj[row["Employee Size"]]) obj[row["Employee Size"]] = 0;
        obj[row["Employee Size"]] += 1;
      }
    }
    setMainData(obj);
  }, [data, companyUploadFilter3]);

  // useEffect(() => {
  //   let obj = {};
  //   let tempData = [...datatest];
  //   let rangeFilter = companyUploadFilter3["EmpSize"];
  //   if (rangeFilter && rangeFilter.length)
  //     for (let each of rangeFilter) {
  //       let { min, max, selectValue } = each;

  //       tempData = tempData.filter((item) => {
  //         let value = item["Employee Size"];
  //         if (value) {
  //           value = parseInt(value);
  //           if (selectValue == "<" && value < max) return true;
  //           else if (selectValue == ">" && min < value) return true;
  //           else if (value >= min && value <= max) return true;
  //         }
  //         return false;
  //       });
  //     }

  //   for (let row of data) {
  //     if (!row["Employee Size"]) {
  //       if (!obj["Blank"]) obj["Blank"] = 0;
  //       obj["Blank"] += 1;
  //     } else {
  //       if (!obj[row["Employee Size"]]) obj[row["Employee Size"]] = 0;
  //       obj[row["Employee Size"]] += 1;
  //     }
  //   }
  //   setMainData(obj);
  // }, [datatest]);
  useEffect(() => {
    let arr = [...data, ...datatest];
    let counts = {};
    for (let row of datatest) {
      if (!row["Employee Size"]) {
        if (!counts["Blank"]) counts["Blank"] = 0;
        counts["Blank"] += 1;
      } else {
        if (!counts[row["Employee Size"]]) counts[row["Employee Size"]] = 0;
        counts[row["Employee Size"]] += 1;
      }
    }
    setMainDataTest(counts);
  }, [datatest]);

  console.log("hal", mainDataTest);

  Object.keys(mainData).forEach((key, index) => {
    if (mainDataTest[key]) {
      mainData[key] = mainDataTest[key];
    } else {
      mainData[key] = 0;
    }
  });

  //   useEffect(() => {
  //     if (Object.keys(mainData).length) {
  //       setRenderData(Object.keys(mainData));
  //       // let arr = new Array(Object.keys(mainData).length).fill(true)
  //       let arr = {};

  //       if (userYearIOFilter.length) {
  //         Object.keys(mainData).map(
  //           (cate) => (arr[cate] = userYearIOFilter.includes(cate) ? true : false)
  //         );
  //         setYearIO((oldYearIO) => {
  //           return [...new Set([...oldYearIO, ...userYearIOFilter])];
  //         });
  //       } else Object.keys(mainData).map((cate) => (arr[cate] = false)); // default check or unCheck
  //       setAllCheckBoxes(arr);
  //     }
  //   }, [mainData, userYearIOFilter]);

  useEffect(() => {
    let tempArr = Object.keys(mainData);
    let checkArr = new Array(tempArr.length).fill(true);
    setEmpSize(tempArr);
    setAllCheckBoxes(checkArr);
  }, [mainData]);
  //   useEffect(() => {
  //     setRangeValue(yearIORangeFilter);
  //   }, [yearIORangeFilter]);

  // Object.keys(mainData).forEach((key, index) =>
  //     {
  //       if (mainDataTest[key]) {
  //         mainData[key] = mainDataTest[key];
  //       } else {
  //         mainData[key] = 0
  //       }
  //     }
  // )

  const deleteRange = async (index) => {
    let tempArr = [...rangeValue];
    tempArr.splice(index, 1);
    setRangeValue(tempArr);
  };

  const handleSave = () => {
    dispatch({
      type: "setCompanyUploadFilter",
      filter: { "Employee Size": empSize },
    });
    dispatch({
      type: "setCompanyUploadFilter3",
      filter: { EmpSize: rangeValue },
    });
    setVisible(false);
    setAAA((old) => old + 1);
  };
  const clearFilter = () => {
    // pass true or false to check or uncheck all

    let a = [...allCheckBoxes].map(() => false);
    setAllCheckBoxes(a);
    setEmpSize([]);
    // onSelectChange([])
  };

  const checkAll = (event) => {
    let tempCheck = [...Object.keys(mainData)];
    setEmpSize(Object.keys(mainData));
    setAllCheckBoxes(tempCheck);
  };

  // useEffect(() => {
  //   if (companyUploadFilter["Employee Size"]) {
  //     if (companyUploadFilter["Employee Size"].length == 0) {
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
  // }, [rangeValue]);
  // console.log("renderData", renderData);
  // const renderYearIO = () => {
  //   if (!mainData.length) return "Employee Size";
  //   if (
  //     filtered(Object.values(allCheckBoxes)) ||
  //     (rangeValue.length && (rangeValue[0].min || rangeValue[0].max))
  //   )
  //     return (
  //       <div>
  //         <Text value={"Employee Size"} />
  //         <Text
  //           value={"!"}
  //           style={{
  //             fontSize: "20px",
  //             color: color.primary,
  //             paddingLeft: "5px",
  //           }}
  //         />
  //       </div>
  //     );
  //   else return <Text value={"Employee Size"} />;
  // };
  // console.log("companyUploadFilterEMP", companyUploadFilter);
  const renderEMP = () => {
    if (empSize.length === Object.keys(mainData).length) return "Employee Size";
    else if (empSize.length === 1) return empSize[0];
    else if (empSize.length > 1) return empSize.length + "Employee Size";
    else return "Select Employee";
  };

  const handleEmpSizeCheckbox = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    const index = e.target.id;

    let tempCheckBox = { ...allCheckBoxes };
    let tempEmpSize = [...empSize];

    tempCheckBox[index] = checked;

    if (checked && !tempEmpSize.includes(name)) tempEmpSize.push(name);
    else tempEmpSize.splice(tempEmpSize.indexOf(name), 1);

    setEmpSize(tempEmpSize);
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
            <Text value={renderEMP()} />
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
                onClick={checkAll}
              />
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
                allData={datatest}
                allRangeValue={rangeValue}
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
                    onChange={handleEmpSizeCheckbox}
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

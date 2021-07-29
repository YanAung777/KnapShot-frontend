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
import { Check } from "@material-ui/icons";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
// import clsx from 'clsx';
import OutsideClickHandler from "react-outside-click-handler";
import Text from "components/core/Text";

//API
import api from "api";

//constants
import endpoints from "constants/endpoints";
import { color } from "constants/color";

//context
import { useAppValue } from "context/app";
import { filter } from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    marginLeft: 10,
    cursor: "pointer",
  },
  button: {
    zIndex: -1,
    // border: '1.2px solid lightgray',
    // borderRadius: 20,
    padding: "3px 10px 3px 0px",
    height: 30,
    // minWidth: 120,
    display: "flex",
    alignItems: "center",
    // justifyContent: 'flex-start'
  },
  option: {
    position: "absolute",
    top: 30,
    width: 200,
    zIndex: 3,
    padding: 10,
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
    margin: "10px 0px",
  },
  textButton: {
    color: color.primary,
    cursor: "pointer",
    padding: "5px",
    textAlign: "left",
  },
}));

function checkCount(arr, length) {
  let count = 0;
  arr.map((v) => v && count++);
  return count === length;
}

function filtered(arr) {
  const func = (trueOrFalse) => trueOrFalse;
  return !arr.every(func);
}

export default function CustomSelect(props) {
  const classes = useStyles();

  const { options, icon, data, filteredData, reload } = props;

  const [state, dispatch] = useAppValue();
  const { totalCountries, selectedDataset } = state;

  const [visible, setVisible] = useState(false);

  const [mainData, setMainData] = useState({});
  const [mainDataTest, setMainDataTest] = useState([]);
  const [aaa, setAAA] = useState(0);
  const [countryName, setCountryName] = useState([]);
  const [allCheckBoxes, setAllCheckBoxes] = useState([]);
  const {
    companyUploadFilter,
    companyUploadFilter2,
    companyUploadFilter3,
    companyUploadFilter4,
    companyUploadFilter5,
  } = state;
  function sum(obj) {
    var sum = 0;
    for (var el in obj) {
      if (obj.hasOwnProperty(el)) {
        sum += parseFloat(obj[el]);
      }
    }
    return sum;
  }
  // console.log("kk", data);
  // console.log("kk", filteredData);

  useEffect(() => {
    let counts = {};
    for (let row of data) {
      if (!row["Country"]) {
        if (!counts["undefined"]) counts["undefined"] = 0;
        counts["undefined"] += 1;
      } else {
        if (!counts[row["Country"]]) counts[row["Country"]] = 0;
        counts[row["Country"]] += 1;
      }
    }
    setMainData(counts);
  }, [data]);

  useEffect(() => {
    let counts = {};
    for (let row of filteredData) {
      if (!row["Country"]) {
        if (!counts["undefined"]) counts["undefined"] = 0;
        counts["undefined"] += 1;
      } else {
        if (!counts[row["Country"]]) counts[row["Country"]] = 0;
        counts[row["Country"]] += 1;
      }
    }
    setMainDataTest(counts);
  }, [filteredData]);

  Object.keys(mainData).forEach((key, index) => {
    if (mainDataTest[key]) {
      mainData[key] = mainDataTest[key];
    } else {
      mainData[key] = 0;
    }
  }
  )

  useEffect(() => {
    let tempArr = Object.keys(mainData);
    let checkArr = new Array(tempArr.length).fill(true);
    setCountryName(tempArr);
    setAllCheckBoxes(checkArr);
  }, [mainData]);

  const toggle = () => {
    setVisible(!visible);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSave = () => {
    dispatch({
      type: "setCompanyUploadFilter",
      filter: { Country: countryName },
    });
    setVisible(false);
    setAAA((old) => old + 1);
  };

  const clearFilter = () => {
    // pass true or false to check or uncheck all

    let a = [...allCheckBoxes].map(() => false);
    setAllCheckBoxes(a);
    setCountryName([]);
    // onSelectChange([])
  };

  // const checkAll = (event) => {
  //   // pass true or false to check or uncheck all
  //   let a = [...allCheckBoxes].map(() => event.target.checked);
  //   setAllCheckBoxes(a);
  //   event.target.checked
  //     ? setCountryName(Object.keys(mainData))
  //     : setCountryName([]);
  //   // onSelectChange([])
  // };
  const checkAll = (event) => {
    let tempCheck = [...Object.keys(mainData)];
    setCountryName(Object.keys(mainData));
    setAllCheckBoxes(tempCheck);
  };
  // useEffect(() => {
  //   if (filterClearFilter != 0) {
  //     checkAll();
  //     // handleSave();
  //   }
  // }, [filterClearFilter]);
  useEffect(() => {
    checkAll();
  }, [reload]);

  const renderCountryName = () => {
    if (countryName.length === Object.keys(mainData).length)
      return "All Countries";
    else if (countryName.length === 1) return countryName[0];
    else if (countryName.length > 1) return countryName.length + " Countries";
    else return "Select Country";
  };

  const handleCountryCheckbox = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    const index = e.target.id;

    let tempCheckBox = [...allCheckBoxes];
    let tempCountryName = [...countryName];

    tempCheckBox[index] = checked;

    if (checked && !tempCountryName.includes(name)) tempCountryName.push(name);
    else tempCountryName.splice(tempCountryName.indexOf(name), 1);

    setCountryName(tempCountryName);
    setAllCheckBoxes(tempCheckBox);
  };
  // console.log("CmainData", mainData);
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setVisible(false);
      }}
    >
      <div className={classes.root} {...props}>
        <div onClick={toggle}>
          <div
            className={classes.button}
            style={{ justifyContent: "space_between" }}
          >
            <Text value={renderCountryName()} />
            {filtered(allCheckBoxes) ? (
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
            {/* <Text value={"Countries"} />
            <Divider />
            <Text
              value={"Clear Filter"}
              className={classes.textButton}
              onClick={clearFilter}
            />
            <div className={classes.center}>
              <input
                type="checkbox"
                onChange={checkAll}
                checked={checkCount(
                  allCheckBoxes,
                  Object.keys(mainData).length
                )}
              />
              <Typography>Select All ({sum(mainData)})</Typography>
            </div> */}
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
            {Object.keys(mainData).map((country, index) => (
              <div className={classes.center}>
                <input
                  type="checkbox"
                  id={index}
                  name={country}
                  checked={allCheckBoxes[index]}
                  onChange={handleCountryCheckbox}
                />
                <Typography
                  key={index}
                  // onClick={() => onClick(country.dataset)}
                >
                  {country} ({mainData[country]})
                </Typography>
              </div>
            ))}
            {/* <Divider />
            <div
              className={classes.center}
              style={{ justifyContent: "space-between" }}
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
            </div> */}
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

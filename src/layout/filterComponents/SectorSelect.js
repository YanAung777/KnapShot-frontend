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
    width: 250,
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
  scroll: {
    width: "100%",
    // height: "63%",
    height: 180,
    overflowY: "scroll",
    overflowX: "scroll",
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
  const [mainDataFilter, setMainDataFilter] = useState({});
  const [sector, setSector] = useState([]);
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

  useEffect(() => {
    let obj = {};
    for (let row of data) {
      if (row["sector"]) {
        for (let each of Object.keys(row["sector"])) {
          if (!obj[each]) obj[each] = 0;
          obj[each] += 1;
        }
      }
    }
    setMainData(obj);
  }, [data]);

  useEffect(() => {
    let obj = {};
    for (let row of filteredData) {
      if (row["sector"]) {
        for (let each of Object.keys(row["sector"])) {
          if (!obj[each]) obj[each] = 0;
          obj[each] += 1;
        }
      }
    }
    setMainDataFilter(obj);
  }, [filteredData]);

  Object.keys(mainData).forEach((key, index) => {
    if (mainDataFilter[key]) {
      mainData[key] = mainDataFilter[key];
    }
    else {
      mainData[key] = 0
    }
  }
  )

  useEffect(() => {
    let tempArr = Object.keys(mainData);
    let checkArr = new Array(tempArr.length).fill(true);
    setSector(tempArr);
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
      type: "setCompanyUploadFilter4",
      filter: { sector: sector },
    });
    setVisible(false);
  };
  // console.log("sectorSelect", sector);
  const clearFilter = () => {
    // pass true or false to check or uncheck all

    let a = [...allCheckBoxes].map(() => false);
    setAllCheckBoxes(a);
    setSector([]);
    // onSelectChange([])
  };

  const checkAll = (event) => {
    let tempCheck = [...Object.keys(mainData)];
    setSector(Object.keys(mainData));
    setAllCheckBoxes(tempCheck);
  };
  // useEffect(() => {
  //   if (companyUploadFilter4["sector"]) {
  //     if (companyUploadFilter4["sector"].length == 0) {
  //       checkAll();
  //       handleSave();
  //     }
  //   }
  // }, [companyUploadFilter4]);
  useEffect(() => {
    checkAll();
  }, [reload]);
  const renderCountryName = () => {
    if (sector.length === Object.keys(mainData).length) return "Sector";
    else if (sector.length === 1) return sector[0];
    else if (sector.length > 1) return sector.length + " Sector";
    else return "Select Sector";
  };

  const handleCountryCheckbox = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    const index = e.target.id;

    let tempCheckBox = [...allCheckBoxes];
    let tempCountryName = [...sector];

    tempCheckBox[index] = checked;

    if (checked && !tempCountryName.includes(name)) tempCountryName.push(name);
    else tempCountryName.splice(tempCountryName.indexOf(name), 1);

    setSector(tempCountryName);
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
            <div className={classes.scroll}>
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
                    style={{
                      textAlign: "left"
                    }}
                    key={index}
                  // onClick={() => onClick(country.dataset)}
                  >
                    {country} ({mainData[country]})
                  </Typography>
                </div>
              ))}
            </div>
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

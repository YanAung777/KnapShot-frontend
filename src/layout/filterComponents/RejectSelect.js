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
  const [mainDataFilter, setMainDataFilter] = useState({});
  const [countryName, setCountryName] = useState([]);
  const [allCheckBoxes, setAllCheckBoxes] = useState([]);
  const { companyUploadFilter } = state;

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
    let Blank = 0;
    let ChamberAssociation = 0;
    let Directory = 0;
    let noLocalPresence = 0;
    for (let row of data) {
      if (row["Rejected"]) {
        let tempArr = row["Rejected"];
        if ([""].every((item) => tempArr.includes(item))) Blank += 1;
        if (["Chamber/Association"].every((item) => tempArr.includes(item)))
          ChamberAssociation += 1;
        if (["Directory"].every((item) => tempArr.includes(item)))
          Directory += 1;
        if (["no local presence"].every((item) => tempArr.includes(item)))
          noLocalPresence += 1;
      }
    }
    setMainData({
      Blank: Blank,
      "Chamber/Association": ChamberAssociation,
      Directory: Directory,
      "no local presence": noLocalPresence,
    });
  }, [data]);

  useEffect(() => {
    let obj = {};
    let Blank = 0;
    let ChamberAssociation = 0;
    let Directory = 0;
    let noLocalPresence = 0;
    for (let row of filteredData) {
      if (row["Rejected"]) {
        let tempArr = row["Rejected"];
        if ([""].every((item) => tempArr.includes(item))) Blank += 1;
        if (["Chamber/Association"].every((item) => tempArr.includes(item)))
          ChamberAssociation += 1;
        if (["Directory"].every((item) => tempArr.includes(item)))
          Directory += 1;
        if (["no local presence"].every((item) => tempArr.includes(item)))
          noLocalPresence += 1;
      }
    }
    setMainDataFilter({
      Blank: Blank,
      "Chamber/Association": ChamberAssociation,
      Directory: Directory,
      "no local presence": noLocalPresence,
    });
  }, [filteredData]);
  // console.log("filter", filteredData);
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
      filter: { Rejected: countryName },
    });
    setVisible(false);
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
  //   if (companyUploadFilter["Rejected"]) {
  //     if (companyUploadFilter["Rejected"].length == 0) {
  //       checkAll();
  //       handleSave();
  //     }
  //   }
  // }, [companyUploadFilter]);
  useEffect(() => {
    checkAll();
  }, [reload]);

  const renderCountryName = () => {
    if (countryName.length === Object.keys(mainData).length) return "Rejected";
    else if (countryName.length === 1) return countryName[0];
    else if (countryName.length > 1)
      return countryName.length + " Rejected Companies";
    else return "Select Rejection";
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
            {/* <Text value={"Rejected"} />
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

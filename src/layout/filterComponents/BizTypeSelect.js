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
    width: 225,
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
    // color: color.primary,
    cursor: "pointer",
    padding: "5px",
    textAlign: "left",
    fontSize: 11,
  },
}));

function checkCount2(arr) {
  if (
    arr.includes("1 Business Type") &&
    arr.includes("2 Business Type") &&
    arr.includes("3 Business Type") &&
    arr.includes("4 Business Type") &&
    arr.includes("5 Business Type")
  )
    return false;
  else return true;
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export default function CustomSelect(props) {
  const classes = useStyles();

  const { options, icon, data, filteredData, reload } = props;

  const [state, dispatch] = useAppValue();
  const { totalCountries, selectedDataset } = state;

  const [visible, setVisible] = useState(false);

  const [mainData, setMainData] = useState({});
  const [mainDataFilter, setMainDataFilter] = useState({});
  const [subData, setSubData] = useState({});
  const [selectedMain, setSelectedMain] = useState([]);
  const [selectedSub, setSelectedSub] = useState([]);
  const [allCheckBoxes, setAllCheckBoxes] = useState([]);
  const [needChanges, setNeedChanges] = useState(0);
  const {
    companyUploadFilter,
    companyUploadFilter2,
    companyUploadFilter3,
    companyUploadFilter4,
    companyUploadFilter5,
  } = state;
  const nameMapping = {
    Blank: 0,
    "1 Business Type": 1,
    "2 Business Type": 2,
    "3 Business Type": 3,
    "4 Business Type": 4,
    "5 Business Type": 5,
  };

  let obj = {},
  subObj = {};

  useEffect(() => {
    for (let row of data) {
      let { biz_type } = row;
      let length = biz_type ? Object.keys(biz_type).length : 0;

      if (length) {
        if (!obj[`${length} Business Type`]) obj[`${length} Business Type`] = 0;
        obj[`${length} Business Type`] += 1;
      } else {
        if (!obj["Blank"]) obj["Blank"] = 0;
        obj["Blank"] += 1;
      }

      if (biz_type) {
        for (let row of Object.keys(biz_type)) {
          if (!subObj[row]) subObj[row] = 0;
          subObj[row] += 1;
        }
      }
    }

    let ordered = Object.keys(obj)
      .sort()
      .reduce(
        (_obj, key) => {
          _obj[key] = obj[key];
          return _obj;
        },
        { Blank: 0 }
      );
    // .sort((a, b) => nameMapping[a] - nameMapping[b])
    setMainData(ordered);
    setSubData(subObj);
  }, [data]);

  useEffect(() => {
    for (let row of filteredData) {
      let { biz_type } = row;
      let length = biz_type ? Object.keys(biz_type).length : 0;

      if (length) {
        if (!obj[`${length} Business Type`]) obj[`${length} Business Type`] = 0;
        obj[`${length} Business Type`] += 1;
      } else {
        if (!obj["Blank"]) obj["Blank"] = 0;
        obj["Blank"] += 1;
      }

      if (biz_type) {
        for (let row of Object.keys(biz_type)) {
          if (!subObj[row]) subObj[row] = 0;
          subObj[row] += 1;
        }
      }
    }

    let ordered = Object.keys(obj)
      .sort()
      .reduce(
        (_obj, key) => {
          _obj[key] = obj[key];
          return _obj;
        },
        { Blank: 0 }
      );
    // .sort((a, b) => nameMapping[a] - nameMapping[b])
    setMainDataFilter(ordered);
    setSubData(subObj);
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
    let tempArr = [...Object.keys(mainData), ...Object.keys(subData)];
    setSelectedMain(Object.keys(mainData));
    setSelectedSub(Object.keys(subData));
    setAllCheckBoxes(tempArr);
  }, [mainData]);

  const toggle = () => {
    setVisible(!visible);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSave = () => {
    let changed = [];
    if (selectedSub.length) {
      dispatch({ type: "setCompanyUploadFilter3", filter: { biz_type: [] } });
      dispatch({
        type: "setCompanyUploadFilter4",
        filter: { biz_type: selectedSub },
      });
    } else {
      for (let name of selectedMain) {
        // console.log("name", name);
        changed.push(nameMapping[name]);
      }
      dispatch({
        type: "setCompanyUploadFilter3",
        filter: { biz_type: changed },
      });
      dispatch({ type: "setCompanyUploadFilter4", filter: { biz_type: [] } });
    }

    setVisible(false);
  };

  const clearFilter = () => {
    // pass true or false to check or uncheck all

    setAllCheckBoxes([]);
    setSelectedMain([]);
    setSelectedSub([]);
    // onSelectChange([])
  };

  const checkAll = () => {
    // pass true or false to check or uncheck all
    // if (!allCheckBoxes.length) {
    //     let tempArr = [...Object.keys(mainData), ...Object.keys(subData)]
    //     setSelectedMain(tempArr)
    //     setAllCheckBoxes(tempArr)
    // } else {
    //     setAllCheckBoxes([])
    //     setSelectedMain([])
    // }
    let tempArr = [...Object.keys(mainData), ...Object.keys(subData)];
    setSelectedMain(Object.keys(mainData));
    setSelectedSub(Object.keys(subData));
    setAllCheckBoxes(tempArr);
  };

  const renderContanctName = () => {
    if (selectedMain.length === Object.keys(mainData).length)
      return "All Countries";
    else if (selectedMain.length === 1) return selectedMain[0];
    else if (selectedMain.length > 1) return selectedMain.length + " Countries";
    else return "Select Country";
  };

  const handleMainCheckbox = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    const index = e.target.id;

    let tempCountryName = [...selectedMain];
    let tempCheckBox = [...allCheckBoxes];

    if (checked && !tempCountryName.includes(name)) tempCountryName.push(name);
    else tempCountryName.splice(tempCountryName.indexOf(name), 1);

    if (checked && !tempCheckBox.includes(name)) tempCheckBox.push(name);
    else tempCheckBox.splice(tempCheckBox.indexOf(name), 1);

    setSelectedMain(tempCountryName);
    setAllCheckBoxes(tempCheckBox);

    // setNeedChanges((x) => x + 1);
  };

  const handleSubCheckbox = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    const index = e.target.id;

    let tempCountryName = [...selectedSub];
    let tempCheckBox = [...allCheckBoxes];

    if (checked && !tempCountryName.includes(name)) tempCountryName.push(name);
    else tempCountryName.splice(tempCountryName.indexOf(name), 1);

    if (checked && !tempCheckBox.includes(name)) tempCheckBox.push(name);
    else tempCheckBox.splice(tempCheckBox.indexOf(name), 1);

    setSelectedSub(tempCountryName);
    setAllCheckBoxes(tempCheckBox);
  };
  // useEffect(() => {
  //   if (filterClearData != 0) {
  //     checkAll();
  //     // handleSave();
  //   }
  // }, [filterClearData]);
  useEffect(() => {
    checkAll();
  }, [reload]);
  // useEffect(() => {

  // }, [needChanges]);

  // console.log("selectedMain", selectedMain);
  // console.log("selectedSub", selectedSub);
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setVisible(false);
      }}
    >
      <div className={classes.root} {...props}>
        <div onClick={toggle}>
          <div className={classes.button}>
            <Text value={"Business Type"} />
            {checkCount2(allCheckBoxes) ? (
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
            {Object.keys(mainData).map((key, index) => (
              <div className={classes.center}>
                <input
                  type="checkbox"
                  id={index}
                  name={key}
                  checked={allCheckBoxes.includes(key)}
                  onChange={handleMainCheckbox}
                />
                <Typography
                  key={key}
                // onClick={() => onClick(country.dataset)}
                >
                  {key} ({mainData[key]})
                </Typography>
              </div>
            ))}
            <Text value={"Combination Matrix"} />
            <Divider />
            {Object.keys(subData).map((key, index) => (
              <div className={classes.center}>
                <input
                  type="checkbox"
                  id={index}
                  name={key}
                  checked={allCheckBoxes.includes(key)}
                  onChange={handleSubCheckbox}
                />
                <Typography key={index}>
                  {key} ({subData[key]})
                </Typography>
              </div>
            ))}
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

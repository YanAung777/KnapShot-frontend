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
    arr.includes("1 Description Available") &&
    arr.includes("2 Description Available") &&
    arr.includes("3 Description Available") &&
    arr.includes("4 Description Available") &&
    arr.includes("5 Description Available")
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
  const [selectedDescription, setSelectedDescription] = useState([]);
  const [selectedCombine, setSelectedCombine] = useState([]);
  const [allCheckBoxes, setAllCheckBoxes] = useState([]);
  const [needChanges, setNeedChanges] = useState(0);
  const {
    companyUploadFilter,
    companyUploadFilter2,
    companyUploadFilter3,
    companyUploadFilter4,
    companyUploadFilter5,
  } = state;
  // console.log("allCheckDes", allCheckBoxes);
  const nameMapping = {
    Blank: "Blank",
    "1 Description Available": "1 Description Available",
    "2 Description Available": "2 Description Available",
    "3 Description Available": "3 Description Available",
    "4 Description Available": "4 Description Available",
    "5 Description Available": "5 Description Available",
  };

  const combinedArr = {
    Title: "Title",
    "Description-Website": "Description",
    "Description-LinkedIn": "Description(LinkedIn)",
    "Description-Facebook": "Description(Facebook)",
    "Description-Instagram": "Description(Instagram)",
  };

  const descriptionCount = (record) => {
    let count = 0;
    if (record["Title"]) count++;
    if (record["Description"]) count++;
    if (record["Description(LinkedIn)"]) count++;
    if (record["Description(Facebook)"]) count++;
    if (record["Description(Instagram)"]) count++;
    return count;
  };
  let obj = {},
      subObj = {};
  useEffect(() => {
  
    for (let row of data) {
      let { Description } = row;
      let Title = row["Title"];
      let Description_Website = row["Description"];
      let Description_LinkedIn = row["Description(LinkedIn)"];
      let Description_Facebook = row["Description(Facebook)"];
      let Description_Instagram = row["Description(Instagram)"];

      let count = descriptionCount(row);
      obj["Blank"] = 0;
      if (!count) obj["Blank"] += 1;
      else {
        if (!obj[`${count} Description Available`])
          obj[`${count} Description Available`] = 0;
        obj[`${count} Description Available`] += 1;
      }

      // if (
      //   !row[
      //   "Description" ||
      //   "Description(LinkedIn)" ||
      //   "Description(Facebook)" ||
      //   "Description(Instagram)" ||
      //   "Title"
      //   ]
      // ) {
      //   if (!obj["Blank"]) obj["Blank"] = 0;
      //   obj["Blank"] += 1;
      // }
      // if (
      //   Title ||
      //   Description_Website ||
      //   Description_LinkedIn ||
      //   Description_Facebook ||
      //   Description_Instagram
      // ) {
      //   if (!obj["1 Description Available"]) obj["1 Description Available"] = 0;
      //   obj["1 Description Available"] += 1;
      // }
      // if (
      //   (Title && Description_Website) ||
      //   (Title && Description_LinkedIn) ||
      //   (Title && Description_Facebook) ||
      //   (Title && Description_Instagram)
      // ) {
      //   if (!obj["2 Description Available"]) obj["2 Description Available"] = 0;
      //   obj["2 Description Available"] += 1;
      // }
      // if (
      //   (Title && Description_Website && Description_LinkedIn) ||
      //   (Title && Description_Facebook && Description_Instagram)
      // ) {
      //   if (!obj["3 Description Available"]) obj["3 Description Available"] = 0;
      //   obj["3 Description Available"] += 1;
      // }
      // if (
      //   (Title &&
      //     Description_Website &&
      //     Description_LinkedIn &&
      //     Description_Facebook) ||
      //   (Description_Website &&
      //     Description_LinkedIn &&
      //     Description_Facebook &&
      //     Description_Instagram)
      // ) {
      //   if (!obj["4 Description Available"]) obj["4 Description Available"] = 0;
      //   obj["4 Description Available"] += 1;
      // }
      // if (
      //   Title &&
      //   Description_Website &&
      //   Description_LinkedIn &&
      //   Description_Facebook &&
      //   Description_Instagram
      // ) {
      //   if (!obj["5 Description Available"]) obj["5 Description Available"] = 0;
      //   obj["5 Description Available"] += 1;
      // }

      if (Title) {
        if (!subObj["Title"]) subObj["Title"] = 0;
        subObj["Title"] += 1;
      }

      if (Description_Website) {
        if (!subObj["Description-Website"]) subObj["Description-Website"] = 0;
        subObj["Description-Website"] += 1;
      }

      if (Description_LinkedIn) {
        if (!subObj["Description-LinkedIn"]) subObj["Description-LinkedIn"] = 0;
        subObj["Description-LinkedIn"] += 1;
      }

      if (Description_Facebook) {
        if (!subObj["Description-Facebook"]) subObj["Description-Facebook"] = 0;
        subObj["Description-Facebook"] += 1;
      }

      if (Description_Instagram) {
        if (!subObj["Description-Instagram"])
          subObj["Description-Instagram"] = 0;
        subObj["Description-Instagram"] += 1;
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
    setMainData(ordered);
    setSubData(subObj);
  }, [data]);

  useEffect(() => {
    for (let row of filteredData) {
      let { Description } = row;
      let Title = row["Title"];
      let Description_Website = row["Description"];
      let Description_LinkedIn = row["Description(LinkedIn)"];
      let Description_Facebook = row["Description(Facebook)"];
      let Description_Instagram = row["Description(Instagram)"];

      let count = descriptionCount(row);
      obj["Blank"] = 0;
      if (!count) obj["Blank"] += 1;
      else {
        if (!obj[`${count} Description Available`])
          obj[`${count} Description Available`] = 0;
        obj[`${count} Description Available`] += 1;
      }

      if (Title) {
        if (!subObj["Title"]) subObj["Title"] = 0;
        subObj["Title"] += 1;
      }

      if (Description_Website) {
        if (!subObj["Description-Website"]) subObj["Description-Website"] = 0;
        subObj["Description-Website"] += 1;
      }

      if (Description_LinkedIn) {
        if (!subObj["Description-LinkedIn"]) subObj["Description-LinkedIn"] = 0;
        subObj["Description-LinkedIn"] += 1;
      }

      if (Description_Facebook) {
        if (!subObj["Description-Facebook"]) subObj["Description-Facebook"] = 0;
        subObj["Description-Facebook"] += 1;
      }

      if (Description_Instagram) {
        if (!subObj["Description-Instagram"])
          subObj["Description-Instagram"] = 0;
        subObj["Description-Instagram"] += 1;
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
    setSelectedDescription(Object.keys(mainData));
    setSelectedCombine(Object.keys(subData));
    setAllCheckBoxes(tempArr);
  }, [mainData]);

  useEffect(() => {
    checkAll();
  }, [reload]);

  const toggle = () => {
    setVisible(!visible);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSave = () => {
    let changed = [];
    let CombineChange = [];
    if (!selectedCombine.length && !selectedDescription.length)
      dispatch({
        type: "setCompanyUploadFilter3",
        filter: { Description: [] },
      });
    else if (selectedCombine.length) {
      for (let name of selectedCombine) {
        if (combinedArr[name]) CombineChange.push(combinedArr[name]);
        else CombineChange.push(name);
      }
      dispatch({
        type: "setCompanyUploadFilter3",
        filter: { Description: CombineChange },
      });
    } else
      dispatch({
        type: "setCompanyUploadFilter3",
        filter: { Description: selectedDescription },
      });

    // if (selectedCombine.length) {
    //   for (let name of selectedCombine) {
    //     if (combinedArr[name]) CombineChange.push(combinedArr[name]);
    //     else CombineChange.push(name);
    //   }
    //   dispatch({
    //     type: "setCompanyUploadFilter3",
    //     filter: { Description: [] },
    //   });
    //   dispatch({
    //     type: "setCompanyUploadFilter2",
    //     filter: { Description: CombineChange },
    //   });
    // } else {
    //   for (let name of selectedDescription) {
    //     if (nameMapping[name]) changed.push(nameMapping[name]);
    //     else changed.push(name);
    //   }
    //   dispatch({
    //     type: "setCompanyUploadFilter3",
    //     filter: { Description: changed },
    //   });
    //   dispatch({
    //     type: "setCompanyUploadFilter2",
    //     filter: { Description: [] },
    //   });
    // }

    setVisible(false);
  };

  const clearFilter = () => {
    // pass true or false to check or uncheck all

    setAllCheckBoxes([]);
    setSelectedDescription([]);
    setSelectedCombine([]);
    // onSelectChange([])
  };

  const checkAll = () => {
    // pass true or false to check or uncheck all
    // if (!allCheckBoxes.length) {
    //     let tempArr = [...Object.keys(mainData), ...Object.keys(subData)]
    //     setSelectedDescription(tempArr)
    //     setAllCheckBoxes(tempArr)
    // } else {
    //     setAllCheckBoxes([])
    //     setSelectedDescription([])
    // }
    let tempArr = [...Object.keys(mainData), ...Object.keys(subData)];
    setSelectedDescription(Object.keys(mainData));
    setSelectedCombine(Object.keys(subData));
    setAllCheckBoxes(tempArr);
  };
  // useEffect(() => {
  //   if (companyUploadFilter3["Description"]) {
  //     if (companyUploadFilter3["Description"].length == 0) {
  //       checkAll();
  //       handleSave();
  //     }
  //   }
  // }, [companyUploadFilter3]);
  const renderContanctName = () => {
    if (selectedDescription.length === Object.keys(mainData).length)
      return "All Countries";
    else if (selectedDescription.length === 1) return selectedDescription[0];
    else if (selectedDescription.length > 1)
      return selectedDescription.length + " Countries";
    else return "Select Country";
  };

  const handleContactCheckbox = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    const index = e.target.id;

    let tempCountryName = [...selectedDescription];
    let tempCheckBox = [...allCheckBoxes];

    if (checked && !tempCountryName.includes(name)) tempCountryName.push(name);
    else tempCountryName.splice(tempCountryName.indexOf(name), 1);

    if (checked && !tempCheckBox.includes(name)) tempCheckBox.push(name);
    else tempCheckBox.splice(tempCheckBox.indexOf(name), 1);

    setSelectedDescription(tempCountryName);
    setAllCheckBoxes(tempCheckBox);

    // setNeedChanges((x) => x + 1);
  };

  const handleCombineCheckbox = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    const index = e.target.id;

    let tempCountryName = [...selectedCombine];
    let tempCheckBox = [...allCheckBoxes];

    if (checked && !tempCountryName.includes(name)) tempCountryName.push(name);
    else tempCountryName.splice(tempCountryName.indexOf(name), 1);

    if (checked && !tempCheckBox.includes(name)) tempCheckBox.push(name);
    else tempCheckBox.splice(tempCheckBox.indexOf(name), 1);

    setSelectedCombine(tempCountryName);
    setAllCheckBoxes(tempCheckBox);
  };
  // console.log("Des", allCheckBoxes);
  // useEffect(() => {
  //   let temp = [...allCheckBoxes];
  //   if (
  //     !temp.includes("Blank") &&
  //     !temp.includes("1 Description Available") &&
  //     !temp.includes("2 Description Available") &&
  //     !temp.includes("3 Description Available") &&
  //     !temp.includes("4 Description Available") &&
  //     !temp.includes("5 Description Available")
  //   ) {
  //     setAllCheckBoxes([]);
  //   } else if (
  //     temp.includes("Blank") &&
  //     temp.includes("1 Description Available") &&
  //     temp.includes("2 Description Available") &&
  //     temp.includes("3 Description Available") &&
  //     temp.includes("4 Description Available") &&
  //     temp.includes("5 Description Available")
  //   ) {
  //     let tempArr = [...Object.keys(mainData), ...Object.keys(subData)];
  //     setAllCheckBoxes(tempArr);
  //   } else if (temp.includes("Tile")) {
  //     let permit = [4, 8];
  //     let tempArr = [];

  //     for (let i = 0; i < combinedArr.length; i++) {
  //       if (permit.includes(i + 1)) tempArr.push(combinedArr[i]);
  //     }
  //     setAllCheckBoxes([...tempArr, "Title"]);
  //   } else if (temp.includes("Description-Website")) {
  //     let permit = [4, 8];
  //     let tempArr = [];

  //     for (let i = 0; i < combinedArr.length; i++) {
  //       if (permit.includes(i + 1)) tempArr.push(combinedArr[i]);
  //     }
  //     setAllCheckBoxes([...tempArr, "Description-Website"]);
  //   } else if (temp.includes("Description-Instagram")) {
  //     let permit = [4, 8];
  //     let tempArr = [];

  //     for (let i = 0; i < combinedArr.length; i++) {
  //       if (permit.includes(i + 1)) tempArr.push(combinedArr[i]);
  //     }
  //     setAllCheckBoxes([...tempArr, "Description-Instagram"]);
  //   } else if (temp.includes("Description-Facebook")) {
  //     let permit = [4, 8];
  //     let tempArr = [];

  //     for (let i = 0; i < combinedArr.length; i++) {
  //       if (permit.includes(i + 1)) tempArr.push(combinedArr[i]);
  //     }
  //     setAllCheckBoxes([...tempArr, "Description-Facebook"]);
  //   } else if (temp.includes("Description_LinkedIn")) {
  //     setAllCheckBoxes(["Description(LinkedIn)", "Description_LinkedIn"]);
  //   }
  // }, [needChanges]);

  // console.log("selectedDescription", selectedDescription);
  // console.log("selectedCombine", selectedCombine);
  // console.log("DDmainData", subData);
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setVisible(false);
      }}
    >
      <div className={classes.root} {...props}>
        <div onClick={toggle}>
          <div className={classes.button}>
            <Text value={"Description"} />
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
            <Text value={"Combination Matrix"} />
            <Divider />
            {Object.keys(mainData).map((key, index) => (
              <div className={classes.center}>
                <input
                  type="checkbox"
                  id={index}
                  name={key}
                  checked={allCheckBoxes.includes(key)}
                  onChange={handleContactCheckbox}
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
                  onChange={handleCombineCheckbox}
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

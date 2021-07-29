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
    arr.includes("Phone") &&
    arr.includes("Whatsapp") &&
    arr.includes("Email")
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
  const [selectedContact, setSelectedContact] = useState([]);
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
  const nameMapping = {
    Whatsapp: "whatsapp/line",
    Email: "Company Email",
  };

  const combinedArr = [
    "Phone, Whatsapp & Email",
    "Phone/Whatsapp & Email",
    "Phone & Whatsapp",
    "Phone/Whatsapp",
    "Phone & Email",
    "Whatsapp & Email",
    "Just Phone",
    "Just Whatsapp",
    "Just Email",
  ];
  let obj = {},
    subObj = {};
  useEffect(() => {

    for (let row of data) {
      let { Phone } = row;
      let whatsapp = row["whatsapp/line"];
      let email = row["Company Email"];

      if (Phone) {
        if (!obj["Phone"]) obj["Phone"] = 0;
        obj["Phone"] += 1;
      }

      if (whatsapp) {
        if (!obj["Whatsapp"]) obj["Whatsapp"] = 0;
        obj["Whatsapp"] += 1;
      }

      if (email) {
        if (!obj["Email"]) obj["Email"] = 0;
        obj["Email"] += 1;
      }

      if (Phone && whatsapp && email) {
        if (!subObj["Phone, Whatsapp & Email"])
          subObj["Phone, Whatsapp & Email"] = 0;
        subObj["Phone, Whatsapp & Email"] += 1;
      }

      if ((Phone || whatsapp) && email) {
        if (!subObj["Phone/Whatsapp & Email"])
          subObj["Phone/Whatsapp & Email"] = 0;
        subObj["Phone/Whatsapp & Email"] += 1;
      }

      if (Phone && whatsapp) {
        if (!subObj["Phone & Whatsapp"]) subObj["Phone & Whatsapp"] = 0;
        subObj["Phone & Whatsapp"] += 1;
      }

      if (Phone || whatsapp) {
        if (!subObj["Phone/Whatsapp"]) subObj["Phone/Whatsapp"] = 0;
        subObj["Phone/Whatsapp"] += 1;
      }

      if (Phone && email) {
        if (!subObj["Phone & Email"]) subObj["Phone & Email"] = 0;
        subObj["Phone & Email"] += 1;
      }

      if (whatsapp && email) {
        if (!subObj["Whatsapp & Email"]) subObj["Whatsapp & Email"] = 0;
        subObj["Whatsapp & Email"] += 1;
      }

      if (Phone && !whatsapp && !email) {
        if (!subObj["Just Phone"]) subObj["Just Phone"] = 0;
        subObj["Just Phone"] += 1;
      }

      if (Phone && whatsapp && email) {
        if (!subObj["Just Whatsapp"]) subObj["Just Whatsapp"] = 0;
        subObj["Just Whatsapp"] += 1;
      }
      if (Phone && whatsapp && email) {
        if (!subObj["Just Email"]) subObj["Just Email"] = 0;
        subObj["Just Email"] += 1;
      }
    }
    setMainData(obj);
    setSubData(subObj);
  }, [data]);

  useEffect(() => {
    for (let row of filteredData) {
      let { Phone } = row;
      let whatsapp = row["whatsapp/line"];
      let email = row["Company Email"];

      if (Phone) {
        if (!obj["Phone"]) obj["Phone"] = 0;
        obj["Phone"] += 1;
      }

      if (whatsapp) {
        if (!obj["Whatsapp"]) obj["Whatsapp"] = 0;
        obj["Whatsapp"] += 1;
      }

      if (email) {
        if (!obj["Email"]) obj["Email"] = 0;
        obj["Email"] += 1;
      }

      if (Phone && whatsapp && email) {
        if (!subObj["Phone, Whatsapp & Email"])
          subObj["Phone, Whatsapp & Email"] = 0;
        subObj["Phone, Whatsapp & Email"] += 1;
      }

      if ((Phone || whatsapp) && email) {
        if (!subObj["Phone/Whatsapp & Email"])
          subObj["Phone/Whatsapp & Email"] = 0;
        subObj["Phone/Whatsapp & Email"] += 1;
      }

      if (Phone && whatsapp) {
        if (!subObj["Phone & Whatsapp"]) subObj["Phone & Whatsapp"] = 0;
        subObj["Phone & Whatsapp"] += 1;
      }

      if (Phone || whatsapp) {
        if (!subObj["Phone/Whatsapp"]) subObj["Phone/Whatsapp"] = 0;
        subObj["Phone/Whatsapp"] += 1;
      }

      if (Phone && email) {
        if (!subObj["Phone & Email"]) subObj["Phone & Email"] = 0;
        subObj["Phone & Email"] += 1;
      }

      if (whatsapp && email) {
        if (!subObj["Whatsapp & Email"]) subObj["Whatsapp & Email"] = 0;
        subObj["Whatsapp & Email"] += 1;
      }

      if (Phone && !whatsapp && !email) {
        if (!subObj["Just Phone"]) subObj["Just Phone"] = 0;
        subObj["Just Phone"] += 1;
      }

      if (Phone && whatsapp && email) {
        if (!subObj["Just Whatsapp"]) subObj["Just Whatsapp"] = 0;
        subObj["Just Whatsapp"] += 1;
      }
      if (Phone && whatsapp && email) {
        if (!subObj["Just Email"]) subObj["Just Email"] = 0;
        subObj["Just Email"] += 1;
      }
    }
    setMainDataFilter(obj);
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
    setSelectedContact(Object.keys(mainData));
    setSelectedCombine(Object.keys(subData));
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
    if (selectedCombine.length) {
      dispatch({ type: "setCompanyUploadFilter2", filter: { contact: [] } });
      dispatch({
        type: "setCompanyUploadFilter3",
        filter: { contact: selectedCombine },
      });
    } else {
      for (let name of selectedContact) {
        if (nameMapping[name]) changed.push(nameMapping[name]);
        else changed.push(name);
      }
      dispatch({
        type: "setCompanyUploadFilter2",
        filter: { contact: changed },
      });
      dispatch({ type: "setCompanyUploadFilter3", filter: { contact: [] } });
    }

    setVisible(false);
  };

  const clearFilter = () => {
    // pass true or false to check or uncheck all

    setAllCheckBoxes([]);
    setSelectedContact([]);
    setSelectedCombine([]);
    // onSelectChange([])
  };

  const checkAll = () => {
    // pass true or false to check or uncheck all
    // if (!allCheckBoxes.length) {
    //     let tempArr = [...Object.keys(mainData), ...Object.keys(subData)]
    //     setSelectedContact(tempArr)
    //     setAllCheckBoxes(tempArr)
    // } else {
    //     setAllCheckBoxes([])
    //     setSelectedContact([])
    // }
    let tempArr = [...Object.keys(mainData), ...Object.keys(subData)];
    setSelectedContact(Object.keys(mainData));
    setSelectedCombine(Object.keys(subData));
    setAllCheckBoxes(tempArr);
  };
  // useEffect(() => {
  //   if (companyUploadFilter2["contact"] || companyUploadFilter3["contact"]) {
  //     if (
  //       companyUploadFilter2["contact"].length == 0 &&
  //       companyUploadFilter3["contact"].length == 0
  //     ) {
  //       checkAll();
  //       handleSave();
  //     }
  //   }
  // }, [companyUploadFilter2, companyUploadFilter3]);
  useEffect(() => {
    checkAll();
  }, [reload]);
  const renderContanctName = () => {
    if (selectedContact.length === Object.keys(mainData).length)
      return "All Countries";
    else if (selectedContact.length === 1) return selectedContact[0];
    else if (selectedContact.length > 1)
      return selectedContact.length + " Countries";
    else return "Select Country";
  };

  const handleContactCheckbox = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    const index = e.target.id;

    let tempCountryName = [...selectedContact];
    let tempCheckBox = [...allCheckBoxes];

    if (checked && !tempCountryName.includes(name)) tempCountryName.push(name);
    else tempCountryName.splice(tempCountryName.indexOf(name), 1);

    if (checked && !tempCheckBox.includes(name)) tempCheckBox.push(name);
    else tempCheckBox.splice(tempCheckBox.indexOf(name), 1);

    setSelectedContact(tempCountryName);
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

  useEffect(() => {
    let temp = [...allCheckBoxes];
    if (
      !temp.includes("Phone") &&
      !temp.includes("Whatsapp") &&
      !temp.includes("Email")
    ) {
      setAllCheckBoxes([]);
    } else if (
      temp.includes("Phone") &&
      temp.includes("Whatsapp") &&
      temp.includes("Email")
    ) {
      let tempArr = [...Object.keys(mainData), ...Object.keys(subData)];
      setAllCheckBoxes(tempArr);
    } else if (temp.includes("Whatsapp") && temp.includes("Email")) {
      let permit = [2, 4, 6, 8, 9];
      let tempArr = [];

      for (let i = 0; i < combinedArr.length; i++) {
        if (permit.includes(i + 1)) tempArr.push(combinedArr[i]);
      }
      setAllCheckBoxes([...tempArr, "Whatsapp", "Email"]);
    } else if (temp.includes("Phone") && temp.includes("Email")) {
      let permit = [2, 4, 5, 7, 9];
      let tempArr = [];

      for (let i = 0; i < combinedArr.length; i++) {
        if (permit.includes(i + 1)) tempArr.push(combinedArr[i]);
      }
      setAllCheckBoxes([...tempArr, "Phone", "Email"]);
    } else if (temp.includes("Phone") && temp.includes("Whatsapp")) {
      let permit = [3, 4, 7, 8];
      let tempArr = [];

      for (let i = 0; i < combinedArr.length; i++) {
        if (permit.includes(i + 1)) tempArr.push(combinedArr[i]);
      }
      setAllCheckBoxes([...tempArr, "Phone", "Whatsapp"]);
    } else if (temp.includes("Phone")) {
      let permit = [4, 7];
      let tempArr = [];

      for (let i = 0; i < combinedArr.length; i++) {
        if (permit.includes(i + 1)) tempArr.push(combinedArr[i]);
      }
      setAllCheckBoxes([...tempArr, "Phone"]);
    } else if (temp.includes("Whatsapp")) {
      let permit = [4, 8];
      let tempArr = [];

      for (let i = 0; i < combinedArr.length; i++) {
        if (permit.includes(i + 1)) tempArr.push(combinedArr[i]);
      }
      setAllCheckBoxes([...tempArr, "Whatsapp"]);
    } else if (temp.includes("Email")) {
      setAllCheckBoxes(["Email", "Just Email"]);
    }
  }, [needChanges]);

  // console.log("selectedContact", selectedContact);
  // console.log("selectedCombine", selectedCombine);
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setVisible(false);
      }}
    >
      <div className={classes.root} {...props}>
        <div onClick={toggle}>
          <div className={classes.button}>
            <Text value={"Contacts"} />
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

import React, { useState, useRef, useEffect, Component } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Paper,
  ButtonBase,
  Popover,
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";
import Text from "components/core/Text";
import { Check, ExpandMore } from "@material-ui/icons";
import OutsideClickHandler from "react-outside-click-handler";
import TextField from "@material-ui/core/TextField";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
//constants
import endpoints from "constants/endpoints";

//route
import { history } from "router/history";

// api
import api from "api";

//context
import { useAppValue } from "context/app";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    cursor: "pointer",
    // marginLeft: 10
  },
  TextF: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    zIndex: -1,
    border: "1.2px solid lightgray",
    // borderRadius: 20,
    padding: "3px 10px",
    height: 30,
    // minWidth: 320, //120
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  option: {
    position: "absolute",
    // top: 30,
    // width: '110%',
    zIndex: 2,
    padding: 10,
  },
  visible2: {
    position: "absolute",
    zIndex: 2,
    padding: 10,
    left: 179,
    minWidth: 250,
  },
  text: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "lightgrey",
    },
    marginBottom: 5,
  },
  icon: {
    // float: 'right',
    fontSize: 14,
    color: "#555",
    padding: 0,
  },
  paper: {
    position: "absolute",
    width: "570px",
    padding: "0px 35px 0px",
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 0),
  },
  buttonBase: {
    height: 20,
    minWidth: 100,
    display: "flex",
    fontSize: "13px",
    cursor: "pointer",
    borderRadius: 20,
    backgroundColor: "#c7cfdc",
  },
  gridItem: {
    height: "50px",
    display: "flex",
    alignItems: "flex-start",
    paddingLeft: "15px",
    flexDirection: "column",
  },
  labelGridItem: {
    height: "50px",
    textAlign: "right",
    paddingRight: "15px",
  },
  textbox: {
    "& .MuiOutlinedInput-input": {
      padding: "2px 10px",
      fontSize: "12px",
      height: "20px",
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 250,
    },
  },
  formControl: {
    "& .MuiInputBase-formControl": {
      width: "250px",
      height: "25px",
      fontSize: "12px",
    },
    margin: theme.spacing(1),
    minWidth: 120,
    fontSize: "12px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    width: "auto",
  },
  resize: {
    fontSize: 12,
    height: 0,
  },
}));
const inputProps = {
  step: 300,
};
export default function CustomSelect({
  setSelectedValue,
  selectedValue,
  index,
  name,
  checked,
  handleChange,
  handleSocialRadio,
  handleSaveSelect,
  handleDelete,
  value,
}) {
  const classes = useStyles();

  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const [data, setData] = useState({});

  const toggle = () => {
    setVisible(!visible);
  };

  // const onClick = (value, checked) => {
  //     // if (onSelectChange) onSelectChange(value)
  //     let tempArr = [...selectedValue]

  //     if (checked) tempArr.push(value);
  //     else tempArr.splice(tempArr.indexOf(value), 1);

  //     setSelectedValue(tempArr);
  //     // setVisible2(true);
  // }
  const onClick = (value) => {
    // console.log('value', value)
    if (value) handleChange(value, index);
    // setSelectedValue(value)
  };
  return (
    <div style={{ position: "relative" }}>
      <OutsideClickHandler
        onOutsideClick={() => {
          setVisible(false);
          setVisible2(false);
        }}
      >
        <Grid
          container
          onClick={toggle}
          style={{
            display: "flex",
            flexDirection: "row",
            // width: "100px",
            marginTop: "10px",
            backgroundColor: "transparent",
            minWidth: "100%",
            maxWidth: "100%",
            borderRadius: 4,
            borderColor: "#80bdff",
            padding: 6,
            border: "1px solid #ced4da",
          }}
        >
          <Grid item xs={11}>
            <Text
              value={selectedValue != undefined ? selectedValue : "Select One"}
              style={{
                fontSize: "12px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                whiteSpace: "nowrap",
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <ExpandMore />
          </Grid>
        </Grid>
        {visible && (
          <Paper
            className={classes.option}
            elevation={3}
            style={{
              position: "absolute",
              //   height: "63%",
              overflow: "scroll",
              //   width: "min-content",
              width: "87%",
            }}
          >
            <Text
              style={{ fontWeight: 700, marginBottom: 10 }}
              value="Can Select One"
            />
            {value.list.map((option) => (
              <div
                style={{ display: "flex", flexDirection: "row" }}
                className={classes.text}
                onClick={() => {
                  onClick(option);
                  handleChange(option, index, name, !checked);
                  handleSocialRadio(name, !checked, "selectCheck", option);
                  handleSaveSelect(name, option, "add");
                  setVisible(false);
                }}
              >
                <div style={{ width: 20 }}>
                  {selectedValue != undefined && selectedValue === option && (
                    <Check className={classes.icon} />
                  )}
                </div>
                <Text value={option} />
              </div>
            ))}
          </Paper>
        )}
      </OutsideClickHandler>
    </div>
  );
}

CustomSelect.defaultProps = {
  options: [],
  label: "",
  // minWidth : 120
};

CustomSelect.propType = {
  options: PropTypes.array.isRequired,
  icon: PropTypes.node,
  label: PropTypes.string,
  // minWidth : PropTypes.number
};

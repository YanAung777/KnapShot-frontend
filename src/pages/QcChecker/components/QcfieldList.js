import React, { useState, useEffect } from "react";
import { makeStyles, withStyles, styles } from "@material-ui/core/styles";
import {
  Paper,
  Popper,
  Grid,
  TextField,
  Divider,
  ButtonGroup,
  IconButton,
  Checkbox,
  Button,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Text from "components/core/Text";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import CloseTwoToneIcon from "@material-ui/icons/CloseTwoTone";
import ContactsIcon from "@material-ui/icons/Contacts";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ApartmentOutlinedIcon from "@material-ui/icons/ApartmentOutlined";
import LocalPhoneOutlinedIcon from "@material-ui/icons/LocalPhoneOutlined";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import CustomMultiSelect from "./CustomMultiSelect";
import BizTypeMultiSelect from "./BizTypeMultiSelect";
import CustomSelect from "components/core/CustomSelect";
import DialogBox from "./DialogBox";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import {
  AcUnitOutlined,
  Favorite,
  Add,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  YouTube,
  AddCircle,
} from "@material-ui/icons";
import { Icons } from "constants/icons";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import BathtubOutlinedIcon from "@material-ui/icons/BathtubOutlined";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import ViewComfyOutlinedIcon from "@material-ui/icons/ViewComfyOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import { useAppValue } from "context/app";
import CustomPopOver from "components/core/CustomPopOver2";
import CustomIcon from "components/core/CustomIcon";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import PageviewOutlinedIcon from "@material-ui/icons/PageviewOutlined";
import PopHover from "./PopHover";
import { PopUpData } from "./PopupData";
//API
import api from "api";

//util
import { getSession } from "util/check-auth";
//constants
import endpoints from "constants/endpoints";
import SelectBox from "./PopUp";
import Slide from "@material-ui/core/Slide";
import { stubFalse } from "lodash";
const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});
const stylese = (theme) => ({
  root: {
    position: "relative",
    marginLeft: 10,
    height: 70,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const useStyles = makeStyles({
  root: {
    position: "relative",
    marginLeft: 10,
    height: 70,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "fix-Start",
    // justifyContent: "space-between"
  },
  simpleRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  column: {
    display: "flex",
    // alignItems: 'center',
    marginLeft: 30,
    marginTop: 10,
    justifyContent: "center",
    flexDirection: "column",
  },
  text: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "lightgray",
    },
    // marginBottom: 5
    marginLeft: 110,
    marginTop: 31,
    width: 80,
    height: 36,
    backgroundColor: "lightGray",
  },
  item: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#d3d3d359",
    display: "flex",
    borderRadius: 5,
    padding: 5,
  },
  subitem: {
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor: "#E2EFD8",
    display: "flex",
    marginLeft: 8,
    borderRadius: 5,
    padding: 4,
  },
  icon: {
    color: "grey",
  },
  popover: {
    padding: 5,
    maxWidth: 300,
  },
  closeButton: {
    position: "absolute",
  },
});

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    width: "100%",
    height: "inherat",
    backgroundColor: "transparent",
    fontSize: 12,
    padding: "10px 26px 10px 12px",
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
    },
  },
}))(InputBase);

const DialogTitle = withStyles(stylese)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);
function FirstComponent({
  valSetter,
  name,
  missing,
  availible,
  verified,
  setMainDataChanges,
  data,
  isOpen,
  setIsOpen,
  PopData,
  id,
  missing_correct,
  missing_found,
}) {
  const [fields, setFields] = useState([{ value: null }]);
  const [age, setAge] = useState("");
  const [state, setState] = useState({ firstPhno: "", secondPhno: "" });
  const [right, setRight] = useState(false);
  const [search, setSearch] = useState(false);
  const [subPlus, setSubPlus] = useState(false);
  const classes = useStyles();
  // const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }
  let phnoObj = Object.values(state);
  useEffect(() => {
    if (missing_found.length !== 0 || missing_correct.length !== 0) {
      if (missing_correct.includes(name)) {
        setRight(true);
        setSearch(false);
      } else if (missing_found.includes(name)) {
        setRight(false);
        setSearch(true);
      }
    } else {
      setRight(false);
      setSearch(false);
    }
  }, [id]);

  useEffect(() => {
    if (!data || data == "") {
      // const dataObj=data.toString().split('-')
      setIsOpen(false);
      setState({ ...state, firstPhno: "", secondPhno: "" });
    } else {
      setIsOpen(false);
      setState({ ...state, firstPhno: data[0], secondPhno: data[1] });
    }
  }, [data, id]);

  function Right() {
    let tempMissing = [...missing];
    let tempAvailible = [...availible];
    let tempData = { ...verified, [name]: 1 };
    let tempMissingFound = [...missing_found];
    let tempMissingCorrect = [...missing_correct];

    const missingIndex = tempMissing.indexOf(name);
    if (missingIndex !== -1) tempMissing.splice(missingIndex, 1);

    const availibleIndex = tempAvailible.indexOf(name);
    if (availibleIndex !== -1) tempAvailible.splice(availibleIndex, 1);

    let MissingFoundIndex = tempMissingFound.indexOf(name);
    let MissingCorrectIndex = tempMissingCorrect.indexOf(name);
    if (MissingFoundIndex !== -1) {
      tempMissingCorrect.push(name);
      tempMissingFound.splice(MissingFoundIndex, 1);
    } else if (MissingCorrectIndex !== -1) {
      tempMissingCorrect.push(name);
      tempMissingCorrect.splice(MissingCorrectIndex, 1);
    } else tempMissingCorrect.push(name);
    // console.log("MC", tempMissingCorrect);
    setMainDataChanges(
      tempData,
      tempMissing,
      tempAvailible,
      tempMissingFound,
      tempMissingCorrect
    );
  }
  function Search() {
    let tempMissing = [...missing];
    let tempAvailible = [...availible];
    let tempData = { ...verified, [name]: 1 };
    let tempMissingFound = [...missing_found];
    let tempMissingCorrect = [...missing_correct];

    const missingIndex = tempMissing.indexOf(name);
    if (missingIndex !== -1) tempMissing.splice(missingIndex, 1);

    const availibleIndex = tempAvailible.indexOf(name);
    if (availibleIndex !== -1) tempAvailible.splice(availibleIndex, 1);

    let MissingCorrectIndex = tempMissingCorrect.indexOf(name);
    let MissingFoundIndex = tempMissingFound.indexOf(name);
    if (MissingCorrectIndex !== -1) {
      tempMissingFound.push(name);
      tempMissingCorrect.splice(MissingCorrectIndex, 1);
    } else if (MissingFoundIndex !== -1) {
      tempMissingFound.push(name);
      tempMissingFound.splice(MissingFoundIndex, 1);
    } else tempMissingFound.push(name);

    setMainDataChanges(
      tempData,
      tempMissing,
      tempAvailible,
      tempMissingFound,
      tempMissingCorrect
    );
    valSetter(name, phnoObj);
  }
  return (
    <div>
      {fields.map((field, idx) => {
        return (
          <div key={`${field}-${idx}`}>
            <Grid container style={{ display: "flex", marginBottom: 10 }}>
              <Grid item xs={10}>
                <Grid container className={classes.subitem}>
                  <CustomPopOver
                    label={
                      <Grid item xs={2} style={{ marginLeft: "-12px" }}>
                        <CheckBoxOutlinedIcon
                          style={{
                            cursor: "pointer",
                            fontSize: "20px",
                            color: right ? "yellow" : "gray",
                          }}
                          className={classes.icon}
                          onClick={() => {
                            Right();
                            setRight(true);
                            setSearch(false);
                          }}
                        />
                      </Grid>
                    }
                    content={PopUpData.RightSub}
                  />
                  <Grid item xs={2} style={{ marginLeft: "8px" }}>
                    <CustomPopOver
                      label={
                        <PageviewOutlinedIcon
                          style={{
                            cursor: "pointer",
                            fontSize: "20px",
                            color: search ? "green" : "gray",
                          }}
                          onClick={() => {
                            Search();
                            setSearch(true);
                            setRight(false);
                            // handleRemove(idx)
                          }}
                          className={classes.icon}
                        />
                      }
                      content={PopUpData.search}
                    />
                  </Grid>
                  <CustomPopOver
                    label={
                      <Grid
                        item
                        xs={8}
                        style={{ marginLeft: "4px", marginTop: "-6px" }}
                      >
                        <TextField
                          onChange={handleChange}
                          variant="outlined"
                          value={state.firstPhno}
                          type="number"
                          onInput={(e) => {
                            e.target.value = Math.max(
                              0,
                              parseInt(e.target.value)
                            )
                              .toString()
                              .slice(0, 12);
                          }}
                          name={"firstPhno"}
                          inputProps={{
                            style: {
                              padding: 4,
                              fontSize: 11,
                              backgroundColor: "white",
                            },
                          }}

                          // value={age}
                        />
                      </Grid>
                    }
                    content={PopData}
                  />
                </Grid>
              </Grid>
              <Grid item xs={1} />

              <Grid item xs={1}>
                <Grid
                  container
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Grid item xs={12}>
                    <AddCircle
                      style={{ cursor: "pointer", fontSize: 22 }}
                      onClick={toggle}
                      className={classes.icon}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {isOpen ? (
              <Grid item xs={10}>
                <Grid
                  container
                  className={classes.subitem}
                  style={{ backgroundColor: "#d3d3d359" }}
                >
                  <Grid item xs={2}>
                    <LocalPhoneOutlinedIcon
                      style={{ cursor: "pointer", fontSize: "20px" }}
                      className={classes.icon}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <AddCircleOutlineOutlinedIcon
                      style={{
                        cursor: "pointer",
                        fontSize: "20px",
                        color: subPlus ? "green" : "gray",
                      }}
                      onClick={() => {
                        // valSetter(name, age)
                        Search();
                        setSubPlus(true);
                      }}
                      className={classes.icon}
                    />
                  </Grid>
                  <CustomPopOver
                    label={
                      <Grid item xs={8}>
                        <TextField
                          onChange={handleChange}
                          variant="outlined"
                          onInput={(e) => {
                            e.target.value = Math.max(
                              0,
                              parseInt(e.target.value)
                            )
                              .toString()
                              .slice(0, 12);
                          }}
                          inputProps={{
                            style: {
                              padding: 4,
                              fontSize: 11,
                              backgroundColor: "white",
                            },
                          }}
                          name={"secondPhno"}
                          value={state.secondPhno}
                        />
                      </Grid>
                    }
                    content={PopUpData.phoneSubs}
                  />
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
}

function FourthComponent({
  valSetter,
  name,
  missing,
  availible,
  verified,
  missing_found,
  missing_correct,
  setMainDataChanges,
  data,
  PopData,
  id,
}) {
  const [fields, setFields] = useState([{ value: null }]);
  const [age, setAge] = useState("");
  const [open, setOpen] = useState(false);
  const [right, setRight] = useState(false);
  const [rightSearch, setRightSearch] = useState(false);
  const classes = useStyles();

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    if (missing_found.length !== 0 || missing_correct.length !== 0) {
      if (missing_correct.includes(name)) {
        setRight(true);
        setOpen(false);
      } else if (missing_found.includes(name)) {
        setRight(false);
        setOpen(true);
      }
    } else {
      setRight(false);
      setOpen(false);
    }
  }, [id]);

  useEffect(() => {
    setAge(data);
  }, [data, id]);

  function Right() {
    let tempMissing = [...missing];
    let tempAvailible = [...availible];
    let tempData = { ...verified, [name]: 1 };
    let tempMissingFound = [...missing_found];
    let tempMissingCorrect = [...missing_correct];

    const missingIndex = tempMissing.indexOf(name);
    if (missingIndex !== -1) tempMissing.splice(missingIndex, 1);

    const availibleIndex = tempAvailible.indexOf(name);
    if (availibleIndex !== -1) tempAvailible.splice(availibleIndex, 1);

    let MissingFoundIndex = tempMissingFound.indexOf(name);
    let MissingCorrectIndex = tempMissingCorrect.indexOf(name);
    if (MissingFoundIndex !== -1) {
      tempMissingCorrect.push(name);
      tempMissingFound.splice(MissingFoundIndex, 1);
    } else if (MissingCorrectIndex !== -1) {
      tempMissingCorrect.push(name);
      tempMissingCorrect.splice(MissingCorrectIndex, 1);
    } else tempMissingCorrect.push(name);
    // console.log("MC", tempMissingCorrect);
    setMainDataChanges(
      tempData,
      tempMissing,
      tempAvailible,
      tempMissingFound,
      tempMissingCorrect
    );
  }
  function Search() {
    let tempMissing = [...missing];
    let tempAvailible = [...availible];
    let tempData = { ...verified, [name]: 1 };
    let tempMissingFound = [...missing_found];
    let tempMissingCorrect = [...missing_correct];

    const missingIndex = tempMissing.indexOf(name);
    if (missingIndex !== -1) tempMissing.splice(missingIndex, 1);

    const availibleIndex = tempAvailible.indexOf(name);
    if (availibleIndex !== -1) tempAvailible.splice(availibleIndex, 1);

    let MissingCorrectIndex = tempMissingCorrect.indexOf(name);
    let MissingFoundIndex = tempMissingFound.indexOf(name);
    if (MissingCorrectIndex !== -1) {
      tempMissingFound.push(name);
      tempMissingCorrect.splice(MissingCorrectIndex, 1);
    } else if (MissingFoundIndex !== -1) {
      tempMissingFound.push(name);
      tempMissingFound.splice(MissingFoundIndex, 1);
    } else tempMissingFound.push(name);

    setMainDataChanges(
      tempData,
      tempMissing,
      tempAvailible,
      tempMissingFound,
      tempMissingCorrect
    );
    valSetter(name, age);
  }
  return (
    <div>
      {fields.map((field, idx) => {
        return (
          <div key={`${field}-${idx}`}>
            <Grid container style={{ display: "flex", marginBottom: 10 }}>
              {/* <Grid item xs={12}> */}
              {/* <Grid container className={classes.subitem}> */}
              <Grid item xs={2} style={{ marginTop: "2px" }}>
                <CustomPopOver
                  label={
                    <CheckBoxOutlinedIcon
                      style={{
                        cursor: "pointer",
                        fontSize: "20px",
                        color: right ? "yellow" : "grey",
                      }}
                      className={classes.icon}
                      onClick={() => {
                        Right();
                        setRight(true);
                        setOpen(false);
                      }}
                    />
                  }
                  content={PopUpData.RightSub}
                />
              </Grid>
              <CustomPopOver
                label={
                  <Grid item xs={2} style={{ marginTop: "2px" }}>
                    <PageviewOutlinedIcon
                      style={{
                        cursor: "pointer",
                        fontSize: "20px",
                        color: open ? "green" : "gray",
                      }}
                      onClick={() => {
                        Search();
                        setRight(false);
                        setOpen(true);
                      }}
                      className={classes.icon}
                    />
                  </Grid>
                }
                content={PopUpData.search}
              />
              <CustomPopOver
                label={
                  <Grid item xs={8} style={{ marginTop: "2px" }}>
                    {/* <input
                        style={{ width: '85%' }}
                        type="text"
                        placeholder="Get Office Number"
                        onChange={e => handleChange(idx, e)}
                      /> */}
                    <TextField
                      onChange={handleChange}
                      variant="outlined"
                      value={age}
                      inputProps={{
                        style: {
                          padding: 4,
                          fontSize: 11,
                          backgroundColor: "white",
                        },
                      }}

                      // value={age}
                    />
                  </Grid>
                }
                content={PopData}
              />
              {/* </Grid> */}
              {/* </Grid> */}
            </Grid>
          </div>
        );
      })}
    </div>
  );
}

function SecondComponent({
  valSetter,
  name,
  missing,
  availible,
  verified,
  setMainDataChanges,
  data,
  PopData,
  missing_found,
  missing_correct,
  id,
}) {
  const [fields, setFields] = useState([{ value: null }]);
  const [age, setAge] = useState("");
  const [state, setState] = React.useState({ firstName: "", lastName: "" });
  const [right, setRight] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }
  let stateObj = Object.values(state);

  useEffect(() => {
    setState({ ...state, firstName: data[0], lastName: data[1] });
  }, [data]);

  useEffect(() => {
    if (missing_found.length !== 0 || missing_correct.length !== 0) {
      if (missing_correct.includes(name)) {
        setRight(true);
        setOpen(false);
      } else if (missing_found.includes(name)) {
        setRight(false);
        setOpen(true);
      }
    } else {
      setRight(false);
      setOpen(false);
    }
  }, [id]);
  function Right() {
    let tempMissing = [...missing];
    let tempAvailible = [...availible];
    let tempData = { ...verified, [name]: 1 };
    let tempMissingFound = [...missing_found];
    let tempMissingCorrect = [...missing_correct];

    const missingIndex = tempMissing.indexOf(name);
    if (missingIndex !== -1) tempMissing.splice(missingIndex, 1);

    const availibleIndex = tempAvailible.indexOf(name);
    if (availibleIndex !== -1) tempAvailible.splice(availibleIndex, 1);

    let MissingFoundIndex = tempMissingFound.indexOf(name);
    let MissingCorrectIndex = tempMissingCorrect.indexOf(name);
    if (MissingFoundIndex !== -1) {
      tempMissingCorrect.push(name);
      tempMissingFound.splice(MissingFoundIndex, 1);
    } else if (MissingCorrectIndex !== -1) {
      tempMissingCorrect.push(name);
      tempMissingCorrect.splice(MissingCorrectIndex, 1);
    } else tempMissingCorrect.push(name);
    // console.log("MC", tempMissingCorrect);
    setMainDataChanges(
      tempData,
      tempMissing,
      tempAvailible,
      tempMissingFound,
      tempMissingCorrect
    );
  }
  function Search() {
    let tempMissing = [...missing];
    let tempAvailible = [...availible];
    let tempData = { ...verified, [name]: 1 };
    let tempMissingFound = [...missing_found];
    let tempMissingCorrect = [...missing_correct];

    const missingIndex = tempMissing.indexOf(name);
    if (missingIndex !== -1) tempMissing.splice(missingIndex, 1);

    const availibleIndex = tempAvailible.indexOf(name);
    if (availibleIndex !== -1) tempAvailible.splice(availibleIndex, 1);

    let MissingCorrectIndex = tempMissingCorrect.indexOf(name);
    let MissingFoundIndex = tempMissingFound.indexOf(name);
    if (MissingCorrectIndex !== -1) {
      tempMissingFound.push(name);
      tempMissingCorrect.splice(MissingCorrectIndex, 1);
    } else if (MissingFoundIndex !== -1) {
      tempMissingFound.push(name);
      tempMissingFound.splice(MissingFoundIndex, 1);
    } else tempMissingFound.push(name);

    setMainDataChanges(
      tempData,
      tempMissing,
      tempAvailible,
      tempMissingFound,
      tempMissingCorrect
    );
    valSetter(name, stateObj);
  }

  return (
    <div>
      {fields.map((field, idx) => {
        return (
          <div key={`${field}-${idx}`}>
            <CustomPopOver
              label={
                <Grid
                  container
                  className={classes.subitem}
                  style={{ display: "flex", marginBottom: 10 }}
                >
                  <Grid item xs={2}>
                    <CustomPopOver
                      label={
                        <CheckBoxOutlinedIcon
                          style={{
                            cursor: "pointer",
                            fontSize: "20px",
                            color: right ? "yellow" : "gray",
                          }}
                          className={classes.icon}
                          onClick={() => {
                            Right();
                            setRight(true);
                            setOpen(false);
                          }}
                        />
                      }
                      content={PopUpData.RightSub}
                      placement="top"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <CustomPopOver
                      label={
                        <PageviewOutlinedIcon
                          style={{
                            cursor: "pointer",
                            fontSize: "20px",
                            color: open ? "green" : "gray",
                          }}
                          onClick={() => {
                            Search();
                            setOpen(true);
                            setRight(stubFalse);
                          }}
                          className={classes.icon}
                        />
                      }
                      content={PopUpData.search}
                      placement="top"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={8}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyItems: "space-between",
                    }}
                  >
                    <Grid item xs={3}>
                      <TextField
                        onChange={handleChange}
                        variant="outlined"
                        inputProps={{
                          style: {
                            padding: 3,
                            fontSize: 11,
                            backgroundColor: "white",
                          },
                        }}
                        style={{ width: "40px" }}
                        value={state.firstName}
                        name="firstName"
                      />
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={3}>
                      <TextField
                        onChange={handleChange}
                        variant="outlined"
                        name="lastName"
                        inputProps={{
                          style: {
                            padding: 3,
                            fontSize: 11,
                            backgroundColor: "white",
                          },
                        }}
                        style={{ width: "40px" }}
                        value={state.lastName}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              }
              content={PopData}
            />
          </div>
        );
      })}
    </div>
  );
}

function SectorComponent({
  valSetter,
  name,
  missing,
  availible,
  verified,
  setMainDataChanges,
  objName,
  data,
  PopData,
  missing_found,
  missing_correct,
  id,
}) {
  const [fields, setFields] = useState([{ value: null }]);
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState([]);
  let [right, setRight] = useState(false);
  let [open, setOpen] = useState(false);

  useEffect(() => {
    setSelectedValue(data);
  }, [data]);
  useEffect(() => {
    if (missing_found.length !== 0 || missing_correct.length !== 0) {
      if (missing_correct.includes(name)) {
        setRight(true);
        setOpen(false);
      } else if (missing_found.includes(name)) {
        setRight(false);
        setOpen(true);
      }
    } else {
      setRight(false);
      setOpen(false);
    }
  }, [id]);

  function Right() {
    let tempMissing = [...missing];
    let tempAvailible = [...availible];
    let tempData = { ...verified, [name]: 1 };
    let tempMissingFound = [...missing_found];
    let tempMissingCorrect = [...missing_correct];

    const missingIndex = tempMissing.indexOf(name);
    if (missingIndex !== -1) tempMissing.splice(missingIndex, 1);

    const availibleIndex = tempAvailible.indexOf(name);
    if (availibleIndex !== -1) tempAvailible.splice(availibleIndex, 1);

    if (right == true) {
      let MissingFoundIndex = tempMissingFound.indexOf(name);
      if (MissingFoundIndex !== -1) {
        tempMissingCorrect.push(name);
        tempMissingFound.splice(MissingFoundIndex, 1);
      } else tempMissingCorrect.push(name);
    } else {
      let MissingCorrectIndex = tempMissingCorrect.indexOf(name);
      if (MissingCorrectIndex !== -1) {
        tempMissingFound.push(name);
        tempMissingCorrect.splice(MissingCorrectIndex, 1);
      } else tempMissingFound.push(name);
    }
    setMainDataChanges(
      tempData,
      tempMissing,
      tempAvailible,
      tempMissingFound,
      tempMissingCorrect
    );
    valSetter(name, selectedValue);
  }

  return (
    <div>
      {fields.map((field, idx) => {
        return (
          <div key={`${field}-${idx}`}>
            <Grid
              container
              className={classes.subitem}
              style={{ display: "flex", marginBottom: 10 }}
            >
              <CustomPopOver
                label={
                  <Grid item xs={2}>
                    {/* <ControlPointIcon style={{ cursor: 'pointer' }} onClick={() => { }} className={classes.icon} /> */}
                    <CheckBoxOutlinedIcon
                      style={{
                        cursor: "pointer",
                        fontSize: "20px",
                        color: right ? "yellow" : "gray",
                      }}
                      className={classes.icon}
                      onClick={() => {
                        Right();
                        setRight(true);
                        setOpen(false);
                      }}
                    />
                  </Grid>
                }
                content={PopUpData.RightSub}
              />
              <CustomPopOver
                label={
                  <Grid item xs={2} style={{ marginTop: "2px" }}>
                    <PageviewOutlinedIcon
                      style={{
                        cursor: "pointer",
                        fontSize: "20px",
                        color: open ? "green" : "gray",
                      }}
                      onClick={() => {
                        Right();
                        setRight(false);
                        setOpen(true);
                      }}
                      className={classes.icon}
                    />
                  </Grid>
                }
                content={PopUpData.search}
              />
              <CustomPopOver
                label={
                  <Grid
                    item
                    xs={8}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyItems: "space-between",
                    }}
                  >
                    <CustomMultiSelect
                      selectedValue={selectedValue}
                      setSelectedValue={setSelectedValue}
                      style={{ width: "100%" }}
                    />
                  </Grid>
                }
                content={PopData}
              />
            </Grid>
          </div>
        );
      })}
    </div>
  );
}

function BizTypeComponent({
  valSetter,
  name,
  handleChange,
  value,
  valSetters,
  indexs,
  id,
  missing,
  component,
  missing_correct,
  OldData,
  missing_found,
  availible,
  verified,
  setMainDataChanges,
  objName,
  data,
  PopData,
  getArrSize,
}) {
  const [fields, setFields] = useState([""]);
  const classes = useStyles();
  const [right, setRight] = useState([false]);
  const [city, setCity] = useState("");
  let [open, setOpen] = useState([false]);

  let tempOpen = [...open];
  let tempRight = [...right];

  function handleAdd() {
    const values = [...fields];
    values.push("");
    setFields(values);
    valSetter(name, values);
  }

  useEffect(() => {
    if (missing_correct.length != 0 || missing_found.length != 0) {
      if (data)
        for (const key of data.keys()) {
          if (missing_correct.includes(key + name)) {
            right.splice(key, data.length, true);
            open.splice(key, data.length, false);
          }
          if (missing_found.includes(key + name)) {
            right.splice(key, data.length, false);
            open.splice(key, data.length, true);
          }
        }
    } else {
      setRight([false]);
      setOpen([false]);
    }
  }, [id]);

  function Search(index) {
    let tempMissing = [...missing];
    let tempAvailible = [...availible];
    let tempData = { ...verified, [name]: 1 };
    let tempValue = [...fields];
    let tempCity = [...city];
    let tempMissingFound = [...missing_found];
    let tempMissingCorrect = [...missing_correct];
    tempOpen[index] = true;
    tempRight[index] = false;

    const missingIndex = tempMissing.indexOf(name);
    if (missingIndex !== -1) tempMissing.splice(missingIndex, 1);

    const availibleIndex = tempAvailible.indexOf(name);
    if (availibleIndex !== -1) tempAvailible.splice(availibleIndex, 1);

    let MissingCorrectIndex = tempMissingCorrect.indexOf(index + name);
    let MissingFoundIndex = tempMissingFound.indexOf(index + name);
    if (MissingCorrectIndex !== -1) {
      tempMissingFound.push(index + name);
      tempMissingCorrect.splice(MissingCorrectIndex, 1);
    } else if (MissingFoundIndex !== -1) {
      tempMissingFound.push(index + name);
      tempMissingFound.splice(MissingFoundIndex, 1);
    } else tempMissingFound.push(index + name);
    setMainDataChanges(
      tempData,
      tempMissing,
      tempAvailible,
      tempMissingFound,
      tempMissingCorrect
    );
    {
      component.id == 3
        ? valSetter(name, tempValue)
        : valSetter(name, tempCity);
    }
  }
  function Right(index) {
    let tempMissing = [...missing];
    let tempAvailible = [...availible];
    let tempData = { ...verified, [name]: 1 };
    let tempMissingFound = [...missing_found];
    let tempMissingCorrect = [...missing_correct];
    let tempValue = [...fields];
    tempOpen[index] = false;
    tempRight[index] = true;
    const missingIndex = tempMissing.indexOf(name);
    if (missingIndex !== -1) tempMissing.splice(missingIndex, 1);

    const availibleIndex = tempAvailible.indexOf(name);
    if (availibleIndex !== -1) tempAvailible.splice(availibleIndex, 1);

    let MissingFoundIndex = tempMissingFound.indexOf(index + name);
    let MissingCorrectIndex = tempMissingCorrect.indexOf(index + name);
    if (MissingFoundIndex !== -1) {
      tempMissingCorrect.push(index + name);
      tempMissingFound.splice(MissingFoundIndex, 1);
    } else if (MissingCorrectIndex !== -1) {
      tempMissingCorrect.push(index + name);
      tempMissingCorrect.splice(MissingCorrectIndex, 1);
    } else tempMissingCorrect.push(index + name);
    setMainDataChanges(
      tempData,
      tempMissing,
      tempAvailible,
      tempMissingFound,
      tempMissingCorrect
    );
  }

  useEffect(() => {
    getArrSize(fields.length);
  }, [fields]);

  const onSelect = (value, id) => {
    let tempArr = [...fields];
    tempArr[id] = value;
    setFields(tempArr);
  };
  const onSelectCity = (value, id) => {
    // let tempArr = [...city]
    // tempArr[id] = value;
    // setCity(tempArr)
    setCity(value);
  };

  useEffect(() => {
    if (data.length == 0) {
      setFields([""]);
      setCity("");
    } else {
      setFields(data);
      setCity(data);
    }
  }, [data, id]);

  return fields.map((x, idx) => (
    <Grid
      container
      className={classes.subitem}
      style={{
        display: "flex",
        marginBottom: 10,
        backgroundColor: OldData.length == 0 ? "#E2EFD8" : "#FEE597",
        height: "30px",
      }}
    >
      <Grid item xs={10}>
        <Grid container className={classes.subitem}>
          <CustomPopOver
            label={
              <Grid
                item
                xs={2}
                style={{ marginLeft: "-12px", marginTop: "-10px" }}
              >
                {/* <ControlPointIcon style={{ cursor: 'pointer' }} onClick={() => { }} className={classes.icon} /> */}
                <CheckBoxOutlinedIcon
                  style={{
                    cursor: "pointer",
                    fontSize: "20px",
                    color: tempRight[idx] ? "yellow" : "gray",
                  }}
                  className={classes.icon}
                  onClick={() => {
                    Right(idx);
                    setRight(tempRight);
                    setOpen(tempOpen);
                  }}
                />
              </Grid>
            }
            content={PopUpData.RightSub}
          />
          <CustomPopOver
            label={
              <Grid
                item
                xs={2}
                style={{ marginTop: "-10px", marginLeft: "7px" }}
              >
                <PageviewOutlinedIcon
                  style={{
                    cursor: "pointer",
                    fontSize: "20px",
                    color: tempOpen[idx] ? "green" : "gray",
                  }}
                  onClick={() => {
                    Search(idx);
                    setRight(tempRight);
                    setOpen(tempOpen);
                  }}
                  className={classes.icon}
                />
              </Grid>
            }
            content={PopUpData.search}
          />
          {component.id == 3 ? (
            <CustomPopOver
              label={
                <Grid
                  item
                  xs={7}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyItems: "space-between",
                  }}
                >
                  <BizTypeMultiSelect
                    selectedValue={x}
                    setSelectedValue={onSelect}
                    component={component}
                    index={idx}
                    style={{ width: "100%" }}
                  />
                </Grid>
              }
              content={PopData}
            />
          ) : (
            <CustomPopOver
              label={
                <Grid
                  item
                  xs={7}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyItems: "space-between",
                  }}
                >
                  <BizTypeMultiSelect
                    selectedValue={city}
                    setSelectedValue={onSelectCity}
                    component={component}
                    index={idx}
                    style={{ width: "100%" }}
                  />
                </Grid>
              }
              content={PopData}
            />
          )}
        </Grid>
      </Grid>
      {component.id == 3 ? (
        <>
          {idx == 0 && (
            <Grid item xs={1} style={{ marginTop: "-7px", marginLeft: "16px" }}>
              <Grid container style={{ display: "flex", alignItems: "center" }}>
                <Grid item xs={12}>
                  <AddCircle
                    style={{ cursor: "pointer", fontSize: 22 }}
                    onClick={() => handleAdd()}
                    className={classes.icon}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </>
      ) : (
        <></>
      )}
    </Grid>
  ));
}
function CityandCountryComponent({
  valSetter,
  name,
  handleChange,
  value,
  valSetters,
  indexs,
  id,
  missing,
  component,
  missing_correct,
  OldData,
  missing_found,
  availible,
  verified,
  setMainDataChanges,
  objName,
  data,
  PopData,
  getArrSize,
}) {
  const [fields, setFields] = useState([""]);
  const classes = useStyles();
  const [right, setRight] = useState([false]);
  const [city, setCity] = useState("");
  const [cityCountry, setCityCountry] = useState("");
  let [open, setOpen] = useState([false]);

  let tempOpen = [...open];
  let tempRight = [...right];

  useEffect(() => {
    if (missing_correct.length != 0 || missing_found.length != 0) {
      if (data)
        for (const key of data.keys()) {
          if (missing_correct.includes(key + name)) {
            right.splice(key, data.length, true);
            open.splice(key, data.length, false);
          }
          if (missing_found.includes(key + name)) {
            right.splice(key, data.length, false);
            open.splice(key, data.length, true);
          }
        }
    } else {
      setRight([false]);
      setOpen([false]);
    }
  }, [id]);

  function valSetterFunc(id, val) {
    let tempArr = [...fields];
    tempArr[id] = val;
    // console.log("tempArr", tempArr);
    // console.log("id", id);
    // console.log("val", val);
    valSetter(name, tempArr);
  }
  function Search(index) {
    let tempMissing = [...missing];
    let tempAvailible = [...availible];
    let tempData = { ...verified, [name]: 1 };
    let tempValue = [...fields];
    let tempCity = [...city];
    let tempMissingFound = [...missing_found];
    let tempMissingCorrect = [...missing_correct];
    tempOpen[index] = true;
    tempRight[index] = false;

    const missingIndex = tempMissing.indexOf(name);
    if (missingIndex !== -1) tempMissing.splice(missingIndex, 1);

    const availibleIndex = tempAvailible.indexOf(name);
    if (availibleIndex !== -1) tempAvailible.splice(availibleIndex, 1);

    let MissingCorrectIndex = tempMissingCorrect.indexOf(index + name);
    let MissingFoundIndex = tempMissingFound.indexOf(index + name);
    if (MissingCorrectIndex !== -1) {
      tempMissingFound.push(index + name);
      tempMissingCorrect.splice(MissingCorrectIndex, 1);
    } else if (MissingFoundIndex !== -1) {
      tempMissingFound.push(index + name);
      tempMissingFound.splice(MissingFoundIndex, 1);
    } else tempMissingFound.push(index + name);
    setMainDataChanges(
      tempData,
      tempMissing,
      tempAvailible,
      tempMissingFound,
      tempMissingCorrect
    );
    valSetterFunc(index, city);
  }
  function Right(index) {
    let tempMissing = [...missing];
    let tempAvailible = [...availible];
    let tempData = { ...verified, [name]: 1 };
    let tempMissingFound = [...missing_found];
    let tempMissingCorrect = [...missing_correct];
    let tempValue = [...fields];
    tempOpen[index] = false;
    tempRight[index] = true;
    const missingIndex = tempMissing.indexOf(name);
    if (missingIndex !== -1) tempMissing.splice(missingIndex, 1);

    const availibleIndex = tempAvailible.indexOf(name);
    if (availibleIndex !== -1) tempAvailible.splice(availibleIndex, 1);

    let MissingFoundIndex = tempMissingFound.indexOf(index + name);
    let MissingCorrectIndex = tempMissingCorrect.indexOf(index + name);
    if (MissingFoundIndex !== -1) {
      tempMissingCorrect.push(index + name);
      tempMissingFound.splice(MissingFoundIndex, 1);
    } else if (MissingCorrectIndex !== -1) {
      tempMissingCorrect.push(index + name);
      tempMissingCorrect.splice(MissingCorrectIndex, 1);
    } else tempMissingCorrect.push(index + name);
    setMainDataChanges(
      tempData,
      tempMissing,
      tempAvailible,
      tempMissingFound,
      tempMissingCorrect
    );
  }

  useEffect(() => {
    getArrSize(fields.length);
  }, [fields]);

  const onSelectCity = (value, id) => {
    // let tempArr = [...city]
    // tempArr[id] = value;
    // setCity(tempArr)
    setCityCountry(value);
    setCity(value);
  };
  useEffect(() => {
    if (data.length == 0) {
      setFields([""]);
      setCity("");
    } else {
      setFields(data);
      setCity(data);
    }
  }, [data, id]);

  return (
    <Grid
      container
      className={classes.subitem}
      style={{
        display: "flex",
        marginBottom: 10,
        backgroundColor: OldData.length == 0 ? "#E2EFD8" : "#FEE597",
        height: "30px",
      }}
    >
      <Grid item xs={10}>
        <Grid container className={classes.subitem}>
          <CustomPopOver
            label={
              <Grid
                item
                xs={2}
                style={{ marginLeft: "-12px", marginTop: "-10px" }}
              >
                {/* <ControlPointIcon style={{ cursor: 'pointer' }} onClick={() => { }} className={classes.icon} /> */}
                <CheckBoxOutlinedIcon
                  style={{
                    cursor: "pointer",
                    fontSize: "20px",
                    color: tempRight[indexs] ? "yellow" : "gray",
                  }}
                  className={classes.icon}
                  onClick={() => {
                    Right(indexs);
                    setRight(tempRight);
                    setOpen(tempOpen);
                  }}
                />
              </Grid>
            }
            content={PopUpData.RightSub}
          />
          <CustomPopOver
            label={
              <Grid
                item
                xs={2}
                style={{ marginTop: "-10px", marginLeft: "7px" }}
              >
                <PageviewOutlinedIcon
                  style={{
                    cursor: "pointer",
                    fontSize: "20px",
                    color: tempOpen[indexs] ? "green" : "gray",
                  }}
                  onClick={() => {
                    Search(indexs);
                    setRight(tempRight);
                    setOpen(tempOpen);
                  }}
                  className={classes.icon}
                />
              </Grid>
            }
            content={PopUpData.search}
          />

          <CustomPopOver
            label={
              <Grid
                item
                xs={7}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyItems: "space-between",
                }}
              >
                <BizTypeMultiSelect
                  selectedValue={city[indexs] || cityCountry}
                  setSelectedValue={onSelectCity}
                  component={component}
                  index={indexs}
                  style={{ width: "100%" }}
                />
              </Grid>
            }
            content={PopData}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

// function City({ valSetter, getArrSize, name, missing, availible, verified, nonData, setMainDataChanges, data, PopData, id, missing_found, missing_correct, oldData }) {
//   const [fields, setFields] = useState(['']);
//   const [open, setOpen] = useState([false])
//   const [right, setRight] = useState([false])
//   const classes = useStyles();

//   let tempOpen = [...open]
//   let tempRight = [...right]

//   const handleChange = (value, id) => {
//     let tempArr = [...fields]
//     tempArr[id] = value
//     setFields(tempArr, value)
//   };

//   function handleAdd() {
//     const values = [...fields];
//     values.push('');
//     setFields(values);
//     valSetter(name, values)
//   }

//   useEffect(() => {
//     if (missing_correct.length != 0 || missing_found.length != 0) {
//       if (data)
//         for (const key of data.keys()) {
//           if (missing_correct.includes(key + name)) {
//             right.splice(key, data.length, true)
//             open.splice(key, data.length, false)
//           }
//           if (missing_found.includes(key + name)) {
//             right.splice(key, data.length, false)
//             open.splice(key, data.length, true)
//           }
//         }
//     }
//     else {
//       setRight([false])
//       setOpen([false])
//     }
//   }, [id])

//   function Search(index) {
//     let tempMissing = [...missing]
//     let tempAvailible = [...availible]
//     let tempData = { ...verified, [name]: 1 }
//     let tempValue = [...fields]
//     let tempMissingFound = [...missing_found]
//     let tempMissingCorrect = [...missing_correct]
//     tempOpen[index] = true
//     tempRight[index] = false

//     const missingIndex = tempMissing.indexOf(name)
//     if (missingIndex !== -1) tempMissing.splice(missingIndex, 1);

//     const availibleIndex = tempAvailible.indexOf(name)
//     if (availibleIndex !== -1) tempAvailible.splice(availibleIndex, 1);

//     let MissingCorrectIndex = tempMissingCorrect.indexOf(index + name)
//     let MissingFoundIndex = tempMissingFound.indexOf(index + name)
//     if (MissingCorrectIndex !== -1) {
//       tempMissingFound.push(index + name)
//       tempMissingCorrect.splice(MissingCorrectIndex, 1)
//     }
//     else if (MissingFoundIndex !== -1) {
//       tempMissingFound.push(index + name)
//       tempMissingFound.splice(MissingFoundIndex, 1)
//     }
//     else tempMissingFound.push(index + name)
//     setMainDataChanges(tempData, tempMissing, tempAvailible, tempMissingFound, tempMissingCorrect)

//     valSetter(name, tempValue)
//   }
//   function Right(index) {
//     let tempMissing = [...missing]
//     let tempAvailible = [...availible]
//     let tempData = { ...verified, [name]: 1 }
//     let tempMissingFound = [...missing_found]
//     let tempMissingCorrect = [...missing_correct]
//     let tempValue = [...fields]
//     tempOpen[index] = false
//     tempRight[index] = true

//     const missingIndex = tempMissing.indexOf(name)
//     if (missingIndex !== -1) tempMissing.splice(missingIndex, 1);

//     const availibleIndex = tempAvailible.indexOf(name)
//     if (availibleIndex !== -1) tempAvailible.splice(availibleIndex, 1);

//     let MissingFoundIndex = tempMissingFound.indexOf(index + name)
//     let MissingCorrectIndex = tempMissingCorrect.indexOf(index + name)
//     if (MissingFoundIndex !== -1) {
//       tempMissingCorrect.push(index + name)
//       tempMissingFound.splice(MissingFoundIndex, 1)
//     }
//     else if (MissingCorrectIndex !== -1) {
//       tempMissingCorrect.push(index + name)
//       tempMissingCorrect.splice(MissingCorrectIndex, 1)
//     }
//     else tempMissingCorrect.push(index + name)
//     setMainDataChanges(tempData, tempMissing, tempAvailible, tempMissingFound, tempMissingCorrect)

//   }

//   useEffect(() => {
//     getArrSize(fields.length)
//   }, [fields])

//   useEffect(() => {
//     if (data) {
//       if (data.length !== 0) {
//         setFields(data)
//       }
//       else {
//         setFields([''])
//       }
//     }
//   }, [data])

//   return (<div>
//     {fields.map((field, idx) => {
//       return (
//         <div key={`${field}-${idx}`}>
//           <Grid container style={{ display: "flex", marginBottom: 10, backgroundColor: nonData ? "#E2EFD8" : "#FEE597", height: '30px' }}>
//             <Grid item xs={10}>
//               <Grid container className={classes.subitem}>
//                 <Grid item xs={2} style={{ marginTop: '-4px', marginLeft: '-8px' }}>
//                   <CustomPopOver
//                     label={<CheckBoxOutlinedIcon style={{ cursor: 'pointer', fontSize: '20px', color: tempRight[idx] ? "yellow" : "grey" }} className={classes.icon} onClick={() => {
//                       Right(idx)
//                       setRight(tempRight)
//                       setOpen(tempOpen)
//                     }

//                     } />} content={PopUpData.RightSub} />
//                 </Grid>
//                 <CustomPopOver
//                   label={<Grid item xs={2} style={{ marginTop: '-4px', marginLeft: '7px' }}>
//                     <PageviewOutlinedIcon style={{ cursor: 'pointer', fontSize: '20px', color: tempOpen[idx] ? 'green' : 'gray' }}
//                       onClick={() => {
//                         Search(idx)
//                         setRight(tempRight)
//                         setOpen(tempOpen)
//                       }
//                       } className={classes.icon} />
//                   </Grid>}
//                   content={PopUpData.search} />
//                 <CustomPopOver
//                   label=
//                   {<Grid item xs={8} style={{ marginTop: '-4px' }}>

//                     <TextField
//                       onChange={(e) => handleChange(e.target.value, idx)}
//                       variant="outlined"
//                       autoFocus={field.length != 0 ? true : false}
//                       value={field}
//                       inputProps={{ style: { padding: 4, fontSize: 11, backgroundColor: 'white' } }}

//                     />
//                   </Grid>}
//                   content={PopData} />
//               </Grid>
//             </Grid>
//             {
//               idx == 0 &&
//               <Grid item xs={1} style={{ marginLeft: '12px' }}>
//                 <Grid container style={{ display: "flex", alignItems: "center" }}>
//                   <Grid item xs={12}>
//                     <AddCircle style={{ cursor: 'pointer', fontSize: 22 }} onClick={() => handleAdd()} className={classes.icon} />
//                   </Grid>
//                 </Grid>
//               </Grid>
//             }
//           </Grid>
//         </div>
//       );
//     })}
//   </div>
//   );
// }

// function Country({ valSetter, getArrSize, name, missing, availible, verified, nonData, setMainDataChanges, data, PopData, id, missing_found, missing_correct, OldData }) {
//   const [fields, setFields] = useState(['']);
//   const [open, setOpen] = useState([false])
//   const [right, setRight] = useState([false])
//   const classes = useStyles();

//   let tempOpen = [...open]
//   let tempRight = [...right]

//   const handleChange = (value, id) => {
//     let tempArr = [...fields]
//     tempArr[id] = value
//     setFields(tempArr, value)
//   };

//   function handleAdd() {
//     const values = [...fields];
//     values.push('');
//     setFields(values);
//     valSetter(name, values)
//   }

//   useEffect(() => {
//     if (missing_correct.length != 0 || missing_found.length != 0) {
//       if (data)
//         for (const key of data.keys()) {
//           if (missing_correct.includes(key + name)) {
//             right.splice(key, data.length, true)
//             open.splice(key, data.length, false)
//           }
//           if (missing_found.includes(key + name)) {
//             right.splice(key, data.length, false)
//             open.splice(key, data.length, true)
//           }
//         }
//     }
//     else {
//       setRight([false])
//       setOpen([false])
//     }
//   }, [id])

//   function Search(index) {
//     let tempMissing = [...missing]
//     let tempAvailible = [...availible]
//     let tempData = { ...verified, [name]: 1 }
//     let tempValue = [...fields]
//     let tempMissingFound = [...missing_found]
//     let tempMissingCorrect = [...missing_correct]
//     tempOpen[index] = true
//     tempRight[index] = false

//     const missingIndex = tempMissing.indexOf(name)
//     if (missingIndex !== -1) tempMissing.splice(missingIndex, 1);

//     const availibleIndex = tempAvailible.indexOf(name)
//     if (availibleIndex !== -1) tempAvailible.splice(availibleIndex, 1);

//     let MissingCorrectIndex = tempMissingCorrect.indexOf(index + name)
//     let MissingFoundIndex = tempMissingFound.indexOf(index + name)
//     if (MissingCorrectIndex !== -1) {
//       tempMissingFound.push(index + name)
//       tempMissingCorrect.splice(MissingCorrectIndex, 1)
//     }
//     else if (MissingFoundIndex !== -1) {
//       tempMissingFound.push(index + name)
//       tempMissingFound.splice(MissingFoundIndex, 1)
//     }
//     else tempMissingFound.push(index + name)
//     setMainDataChanges(tempData, tempMissing, tempAvailible, tempMissingFound, tempMissingCorrect)

//     valSetter(name, tempValue)
//   }
//   function Right(index) {
//     let tempMissing = [...missing]
//     let tempAvailible = [...availible]
//     let tempData = { ...verified, [name]: 1 }
//     let tempMissingFound = [...missing_found]
//     let tempMissingCorrect = [...missing_correct]
//     let tempValue = [...fields]
//     tempOpen[index] = false
//     tempRight[index] = true

//     const missingIndex = tempMissing.indexOf(name)
//     if (missingIndex !== -1) tempMissing.splice(missingIndex, 1);

//     const availibleIndex = tempAvailible.indexOf(name)
//     if (availibleIndex !== -1) tempAvailible.splice(availibleIndex, 1);

//     let MissingFoundIndex = tempMissingFound.indexOf(index + name)
//     let MissingCorrectIndex = tempMissingCorrect.indexOf(index + name)
//     if (MissingFoundIndex !== -1) {
//       tempMissingCorrect.push(index + name)
//       tempMissingFound.splice(MissingFoundIndex, 1)
//     }
//     else if (MissingCorrectIndex !== -1) {
//       tempMissingCorrect.push(index + name)
//       tempMissingCorrect.splice(MissingCorrectIndex, 1)
//     }
//     else tempMissingCorrect.push(index + name)
//     setMainDataChanges(tempData, tempMissing, tempAvailible, tempMissingFound, tempMissingCorrect)

//   }

//   useEffect(() => {
//     getArrSize(fields.length)
//   }, [fields])

//   useEffect(() => {
//     if (data) {
//       if (data.length !== 0) {
//         setFields(data)
//       }
//       else {
//         setFields([''])
//       }
//     }
//   }, [data])

//   return (<div>
//     {fields.map((field, idx) => {
//       return (
//         <div key={`${field}-${idx}`}>
//           <Grid container style={{ display: "flex", marginBottom: 10, backgroundColor: nonData ? "#E2EFD8" : "#FEE597", height: '30px' }}>
//             <Grid item xs={10}>
//               <Grid container className={classes.subitem}>
//                 <Grid item xs={2} style={{ marginTop: '-4px', marginLeft: '-8px' }}>
//                   <CustomPopOver
//                     label={<CheckBoxOutlinedIcon style={{ cursor: 'pointer', fontSize: '20px', color: tempRight[idx] ? "yellow" : "grey" }} className={classes.icon} onClick={() => {
//                       Right(idx)
//                       setRight(tempRight)
//                       setOpen(tempOpen)
//                     }

//                     } />} content={PopUpData.RightSub} />
//                 </Grid>
//                 <CustomPopOver
//                   label={<Grid item xs={2} style={{ marginTop: '-4px', marginLeft: '7px' }}>
//                     <PageviewOutlinedIcon style={{ cursor: 'pointer', fontSize: '20px', color: tempOpen[idx] ? 'green' : 'gray' }}
//                       onClick={() => {
//                         Search(idx)
//                         setRight(tempRight)
//                         setOpen(tempOpen)
//                       }
//                       } className={classes.icon} />
//                   </Grid>}
//                   content={PopUpData.search} />
//                 <CustomPopOver
//                   label=
//                   {<Grid item xs={8} style={{ marginTop: '-4px' }}>

//                     <TextField
//                       onChange={(e) => handleChange(e.target.value, idx)}
//                       variant="outlined"
//                       autoFocus={field.length != 0 ? true : false}
//                       value={field}
//                       inputProps={{ style: { padding: 4, fontSize: 11, backgroundColor: 'white' } }}

//                     />
//                   </Grid>}
//                   content={PopData} />
//               </Grid>
//             </Grid>
//             {
//               idx == 0 &&
//               <Grid item xs={1} style={{ marginLeft: '12px' }}>
//                 <Grid container style={{ display: "flex", alignItems: "center" }}>
//                   <Grid item xs={12}>
//                     <AddCircle style={{ cursor: 'pointer', fontSize: 22 }} onClick={() => handleAdd()} className={classes.icon} />
//                   </Grid>
//                 </Grid>
//               </Grid>
//             }
//           </Grid>
//         </div>
//       );
//     })}
//   </div>
//   );
// }

function NormalText({
  icon,
  iconLabel,
  data,
  marginSetter,
  component,
  PopData,
  isOpen,
  setIsOpen,
  id,
  index,
  objName,
  setMainDataChanges,
  verified,
  opentumb,
  filter,
  missing,
  availible,
  status,
  setSelectOpen,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [right, setRight] = useState(false);
  const [nonData, setNonData] = useState(false);
  // console.log('opentumb', opentumb)
  // console.log('filter', filter, data)
  let [marginHeight, setMarginHeight] = useState(0);

  useEffect(() => {
    if (marginSetter) setMarginHeight(marginSetter * 50);
  }, [marginSetter]);

  // console.log('isOPen', isOpen)
  useEffect(() => {
    if (verified && objName && verified[objName]) setRight(true);
    else setRight(false);
  }, [verified]);

  useEffect(() => {
    if (!data || data == "-") {
      if (data == "") {
        setOpen(true);
        setNonData(true);
      } else {
        setOpen(true);
        setNonData(true);
      }
    } else {
      setNonData(false);
      setOpen(false);
    }
  }, [data]);

  useEffect(() => {
    if (opentumb == true) {
      let tempMissing = [...missing];
      let tempAvailible = [...availible];
      let tempData = { ...verified, [objName]: 1 };

      const missingIndex = tempMissing.indexOf(objName);
      if (missingIndex !== -1) tempMissing.splice(missingIndex, 1);

      const availibleIndex = tempAvailible.indexOf(objName);
      if (availibleIndex !== -1) tempAvailible.splice(availibleIndex, 1);
      setMainDataChanges(tempData, tempMissing, tempAvailible);
    }
  }, [opentumb]);

  return (
    <Grid spacing={1} container style={{ display: "flex", padding: 10 }}>
      <Grid item xs={1}>
        {icon}
        <Text value={iconLabel} style={{ fontSize: 9 }} />
      </Grid>
      <Grid item xs={5}>
        {objName == "website" ? (
          <Grid
            container
            className={classes.item}
            style={{ backgroundColor: "#DAE3F4" }}
          >
            <CustomPopOver
              label={
                <Grid
                  item
                  xs={7}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Tooltip title={data} placement="top">
                    <Text
                      value={data}
                      style={{
                        fontSize: 9,
                        overflow: "visible",
                        width: "300%",
                      }}
                    />
                  </Tooltip>
                </Grid>
              }
              content={PopUpData.website}
            />

            <Grid item xs={2}>
              <CustomPopOver
                label={
                  <ThumbDownAltOutlinedIcon
                    className={classes.icon}
                    style={{
                      color: filter ? "red" : "grey",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectOpen(true)}
                  />
                }
                content="Website has issue"
              />
            </Grid>
            <Grid item xs={2}>
              <CustomPopOver
                label={
                  <CheckCircleOutlineIcon
                    onClick={() => {
                      //kst here
                      let tempMissing = [...missing];
                      let tempAvailible = [...availible];
                      let tempData = { ...verified, [objName]: 1 };

                      const missingIndex = tempMissing.indexOf(objName);
                      if (missingIndex !== -1)
                        tempMissing.splice(missingIndex, 1);

                      const availibleIndex = tempAvailible.indexOf(objName);
                      if (availibleIndex !== -1)
                        tempAvailible.splice(availibleIndex, 1);

                      setMainDataChanges(tempData, tempMissing, tempAvailible);
                      setOpen(false);
                      setRight(true);
                    }}
                    style={{
                      cursor: "pointer",
                      color: right ? "green" : "grey",
                    }}
                    className={classes.icon}
                  />
                }
                content={"Correct"}
              />
            </Grid>
            <CustomPopOver
              label={
                <Grid item xs={1}>
                  <HighlightOffIcon
                    onClick={() => {
                      setOpen(true);
                      setRight(false);
                    }}
                    style={{ color: open ? "red" : "grey", cursor: "pointer" }}
                  />
                </Grid>
              }
              content={"Incorrect"}
              placement="top"
            />
          </Grid>
        ) : (
          <>
            {iconLabel == "Total" ? (
              <Grid container className={classes.item} style={{ padding: 10 }}>
                <Tooltip title={data} placement="top">
                  <Grid
                    item
                    xs={9}
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Text
                      value={data}
                      style={{
                        fontSize: 9,
                        overflow: "visible",
                        width: "300%",
                      }}
                    />
                  </Grid>
                </Tooltip>
                <Grid item xs={3}></Grid>
              </Grid>
            ) : (
              <CustomPopOver
                label={
                  <Grid
                    container
                    className={classes.item}
                    style={{ padding: nonData ? 16 : 5 }}
                  >
                    <Tooltip title={data} placement="top">
                      <Grid
                        item
                        xs={9}
                        style={{
                          position: "relative",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <Text
                          value={data}
                          style={{
                            fontSize: 9,
                            overflow: "visible",
                            width: "300%",
                          }}
                        />
                      </Grid>
                    </Tooltip>
                    {nonData ? (
                      <>
                        <Grid item xs={2} className={classes.icon} />
                        <Grid item xs={1} className={classes.icon} />
                      </>
                    ) : (
                      <>
                        <Grid item xs={2}>
                          <CustomPopOver
                            label={
                              <CheckCircleOutlineIcon
                                onClick={() => {
                                  //kst here
                                  let tempMissing = [...missing];
                                  let tempAvailible = [...availible];
                                  let tempData = { ...verified, [objName]: 1 };

                                  const missingIndex = tempMissing.indexOf(
                                    objName
                                  );
                                  if (missingIndex !== -1)
                                    tempMissing.splice(missingIndex, 1);

                                  const availibleIndex = tempAvailible.indexOf(
                                    objName
                                  );
                                  if (availibleIndex !== -1)
                                    tempAvailible.splice(availibleIndex, 1);

                                  setMainDataChanges(
                                    tempData,
                                    tempMissing,
                                    tempAvailible
                                  );
                                  setOpen(false);
                                  // setRight(true)
                                }}
                                style={{
                                  cursor: "pointer",
                                  color: right ? "green" : "grey",
                                }}
                                className={classes.icon}
                              />
                            }
                            content={"Correct"}
                            placement="top"
                          />
                        </Grid>
                        <Grid item xs={1}>
                          <CustomPopOver
                            label={
                              <HighlightOffIcon
                                onClick={() => {
                                  setOpen(true);
                                  setRight(false);
                                }}
                                style={{
                                  color: open ? "red" : "grey",
                                  cursor: "pointer",
                                }}
                              />
                            }
                            content={"Incorrect"}
                            placement="top"
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                }
                content={PopData}
              />
            )}
          </>
        )}
      </Grid>
      {open && component ? (
        <Grid
          item
          xs={6}
          style={{
            marginBottom: marginHeight,
            backgroundColor: nonData ? "#E2EFD8" : "#FEE597",
            borderRadius: "5px",
            padding: "3px",
            height: "32px",
            marginTop: "3px",
          }}
        >
          {component}
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
}

function TextArray({
  id,
  icon,
  name,
  iconLabel,
  data,
  PopData,
  component,
  valSetters,
  objName,
  setMainDataChanges,
  verified,
  valSetter,
  missing,
  availible,
  UpdateData,
  SubPopData,
  missing_correct,
  missing_found,
  getArrSize,
  UpdateCityData,
  cityName,
  countryName,
  countrydata,
  UpdateCountryData,
  SubCountryPopData,
  SubCityPopData,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState([false]);
  const [right, setRight] = useState(
    data.length ? new Array(data.length).fill(false) : [false]
  );
  const [arr, setArr] = useState([""]);
  const [arrCity, setArrCity] = useState([""]);
  const [nonData, setNonData] = useState(false);

  useEffect(() => {
    if (data.length == 0) {
      setArr([""]);
      setOpen([true]);
      setNonData(true);
    } else {
      setArr(data);
    }
  }, [data]);

  useEffect(() => {
    if (verified && objName && verified[objName]) setRight([true]);
  }, [verified, id]);

  // useEffect(() => {
  //   let arr = []
  //   for (let val of data) arr.push(false)
  //   setRight(arr)
  // }, [verified])

  function handleChange(event, i) {
    const values = [...arr];
    values[i] = event.target.value;
    setArr(values);
  }

  function handleAdd() {
    const values = [...arr];
    values.push("");
    setArr(values);
    console.log("value", values);
    console.log("component.name", component);
    valSetters([component.name], values);
    setMainDataChanges({ ...verified, [objName]: 0 });
  }

  function handleRemove(i) {
    const values = [...arr];
    const tempOpen = [...open];
    values.splice(i, 1);
    tempOpen.splice(i, 1);
    if (values.length == 0) {
      setArr([""]);
      setOpen([false]);
      valSetters([component.name], []);
    } else {
      setArr(values);
      setOpen(tempOpen);
      valSetters([component.name], values);
    }
  }

  function valSetterFunc(id, val) {
    let tempArr = [...arrCity];
    tempArr[id] = val;
    // console.log("tempArr", tempArr);
    // console.log("id", id);
    // console.log("val", val);
    valSetter([component.name], tempArr);
  }

  return arr.map((x, index) => (
    <Grid container style={{ display: "flex", padding: 10 }}>
      <Grid item xs={1}>
        {index == 0 && (
          <>
            {icon}
            <Text value={iconLabel} style={{ fontSize: 9 }} />
          </>
        )}
      </Grid>

      <Grid item xs={5}>
        <Grid
          container
          className={classes.item}
          style={{ padding: nonData ? 16 : 5 }}
        >
          <CustomPopOver
            label={
              <Grid item xs={9}>
                <Text value={x} style={{ fontSize: 9 }} />
              </Grid>
            }
            content={PopData}
          />
          {nonData ? (
            <>
              <Grid item xs={2} className={classes.icon} />
              <Grid item xs={1} className={classes.icon} />
            </>
          ) : (
            <>
              <CustomPopOver
                label={
                  <Grid item xs={2}>
                    <CheckCircleOutlineIcon
                      onClick={() => {
                        //kst here
                        let tempOpen = [...open];
                        let tempRight = [...right];
                        tempOpen[index] = false;
                        tempRight[index] = true;

                        // if (right.every(x => x == true)) {
                        let tempMissing = [...missing];
                        let tempAvailible = [...availible];
                        let tempData = { ...verified, [objName]: 1 };

                        const missingIndex = tempMissing.indexOf(objName);
                        if (missingIndex !== -1)
                          tempMissing.splice(missingIndex, 1);

                        const availibleIndex = tempAvailible.indexOf(objName);
                        if (availibleIndex !== -1)
                          tempAvailible.splice(availibleIndex, 1);

                        setMainDataChanges(
                          tempData,
                          tempMissing,
                          tempAvailible
                        );
                        valSetters(component.name, x);
                        // }

                        // else setMainDataChanges({ ...verified, [objName]: 0 })

                        setOpen(tempOpen);
                        setRight(tempRight);
                      }}
                      style={{
                        cursor: "pointer",
                        color: right[index] ? "green" : "grey",
                      }}
                      className={classes.icon}
                    />
                  </Grid>
                }
                content={"Correct"}
              />
              <CustomPopOver
                label={
                  <Grid item xs={1}>
                    <HighlightOffIcon
                      onClick={() => {
                        let tempOpen = [...open];
                        let tempRight = [...right];
                        tempOpen[index] = true;
                        tempRight[index] = false;
                        setOpen(tempOpen);
                        setRight(tempRight);
                      }}
                      style={{
                        color: open[index] ? "red" : "grey",
                        cursor: "pointer",
                      }}
                    />
                  </Grid>
                }
                content={"Incorrect"}
              />
            </>
          )}
        </Grid>
      </Grid>
      {open[index] == true ? (
        <Grid item xs={6}>
          {component.id == 3 && (
            <BizTypeComponent
              value={x}
              id={id}
              name={name}
              OldData={data}
              handleChange={handleChange}
              handleAdd={handleAdd}
              verified={verified}
              missing={missing}
              availible={availible}
              setMainDataChanges={setMainDataChanges}
              missing_found={missing_found}
              missing_correct={missing_correct}
              valSetter={valSetter}
              data={UpdateData}
              PopData={SubPopData}
              getArrSize={getArrSize}
              handleRemove={handleRemove}
              valSetters={valSetters}
              idx={index}
              component={component}
            />
          )}
          {component.id == 2 && (
            <CityandCountryComponent
              value={x}
              id={id}
              name={cityName}
              OldData={data}
              handleChange={handleChange}
              handleAdd={handleAdd}
              verified={verified}
              missing={missing}
              availible={availible}
              setMainDataChanges={setMainDataChanges}
              missing_found={missing_found}
              missing_correct={missing_correct}
              valSetter={valSetter}
              data={UpdateCityData}
              PopData={SubCityPopData}
              getArrSize={getArrSize}
              handleRemove={handleRemove}
              valSetters={valSetterFunc}
              indexs={index}
              component={component}
            />
          )}
          {component.id == 1 && (
            <CityandCountryComponent
              value={x}
              id={id}
              name={countryName}
              OldData={data}
              handleChange={handleChange}
              handleAdd={handleAdd}
              verified={verified}
              missing={missing}
              availible={availible}
              setMainDataChanges={setMainDataChanges}
              missing_found={missing_found}
              missing_correct={missing_correct}
              valSetter={valSetter}
              data={UpdateCountryData}
              PopData={SubCountryPopData}
              getArrSize={getArrSize}
              handleRemove={handleRemove}
              valSetters={valSetterFunc}
              indexs={index}
              component={component}
            />
          )}
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  ));
}

function RenderGridItem(props) {
  let { data, id, setIsOpen, NOUI, iconLabel, isOpen } = props;
  // console.log('datasss', isOpen)
  const checkDataType = (dataParam) => {
    if (dataParam) {
      if (Array.isArray(dataParam)) return "Array";
      else return typeof dataParam;
    }
    return dataParam;
  };

  const renderByType = (dataParam) => {
    if (checkDataType(dataParam) == "Array") return <TextArray {...props} />;
    // else if (dataParam) return <NormalText {...props} />
    // else return <Grid container style={{ display: "flex", padding: 10 }} />
    // else return <NormalText {...props} />
    else if (NOUI)
      return <Grid container style={{ display: "flex", padding: 10 }} />;
    else return <NormalText {...props} />;
  };

  return (
    <Grid item xs={6} style={{ marginBottom: isOpen ? "40px" : "0px" }}>
      {renderByType(data)}
    </Grid>
  );
}

export default function QcFieldList({
  setMainDataChanges,
  dataObj,
  opentumb,
  setOpentumb,
  onsSelectChange,
  issue,
  filter,
  setFilter,
}) {
  let {
    company_data,
    id,
    verified,
    missing,
    availible,
    company_data_update,
    status,
    reason,
    missing_found,
    missing_correct,
  } = dataObj;
  const classes = useStyles();
  const [tempData, setTempData] = useState({});
  const [fileName, setFileName] = useState("");
  const [visible, setVisible] = useState(false);
  const [UpdateData, SetUpdateData] = useState({});
  const lists = [
    "",
    "Exhibition / Conference",
    "No local presence ( no local office/phone )",
  ];
  const [selectOpen, setSelectOpen] = useState(false);
  const [outerVal, setOuterVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  //length getter
  const [bizTypeLength, setBizTypeLength] = useState(0);

  const onFileChange = (filename) => {
    if (filename) setFileName(filename);
  };

  useEffect(() => {
    if (fileName) setVisible(true);
    else setVisible(false);
  }, [fileName, id]);

  // let reasonData = Object.values({ Irrelevant: fileName, Issue: filter })

  // console.log('updateData',UpdateData)

  useEffect(() => {
    // let reasonDataObj = JSON.parse(reason)
    // console.log('reasonDataObj', reasonDataObj)
    // console.log('reason', reason)
    if (status == "Irrelevant") {
      setFileName(reason);
      setOuterVal();
      setFilter("");
      // setOpentumb(false)
    } else if (status == "Issue") {
      setFileName("");
      setOuterVal(reason);
      // setOpentumb(true)
    } else {
      setFileName("");
      setOuterVal();
      setFilter("");
      // setOpentumb(false)
    }
  }, [status, id]);

  // console.log('status', status, 'OuterVal', outerVal)

  const handleClose = async () => {
    const response = await api().post(endpoints.checkerUpdate, {
      id,
      company_data: JSON.stringify(tempData),
      verified: JSON.stringify(verified),
      status: "Irrelevant",
      missing: JSON.stringify(missing),
      availible: JSON.stringify(availible),
      missing_found: JSON.stringify(missing_found),
      missing_correct: JSON.stringify(missing_correct),
      reason: fileName,
    });
    if (response.status === 200) {
      window.location.reload();
    }
  };
  //  console.log('missing',missing)
  useEffect(() => {
    setTempData({ ...company_data });
    SetUpdateData({ ...company_data_update });
  }, [company_data, company_data_update]);

  useEffect(() => {
    if (status == "Verified") SetUpdateData(company_data_update);
  }, [company_data_update]);

  // console.log("UpdateData", UpdateData)

  const handleSave = async () => {
    const response = await api().post(endpoints.checkerUpdate, {
      id,
      company_data: JSON.stringify(tempData),
      verified: JSON.stringify(verified),
      status: filter ? "Issue" : "Verified",
      missing: JSON.stringify(missing),
      availible: JSON.stringify(availible),
      company_data_update: JSON.stringify(UpdateData),
      missing_found: JSON.stringify(missing_found),
      missing_correct: JSON.stringify(missing_correct),
      reason: filter || null,
    });
    if (response.status === 200) {
      window.location.reload();
    }
  };
  // console.log("temp", tempData);
  const valSetters = (name, data) => setTempData({ ...tempData, [name]: data });
  const valSetter = (name, data) =>
    SetUpdateData({ ...UpdateData, [name]: data });
  return (
    <div>
      <Paper style={{ margin: 10, padding: 10 }}>
        <Grid container spacing={3}>
          <Grid item xs={1} />
          <Grid item xs={2}>
            <Text
              value={"Company Contact"}
              style={{ fontSize: 10, fontWeight: "bold" }}
            />
          </Grid>
          <Grid item xs={3}>
            <SelectBox.CustomSelect
              dataObj={dataObj}
              handleClose={handleClose}
              onFileChange={onFileChange}
              lists={lists}
              setVisible={setVisible}
              visible={visible}
              selectOpen={selectOpen}
            />
          </Grid>
          <Grid item xs={3}>
            <SelectBox.IssueSelect
              id={id}
              issue={issue}
              onsSelectChange={onsSelectChange}
              outerVal={outerVal}
              selectOpen={selectOpen}
              setSelectOpen={setSelectOpen}
              type="issue"
            />
          </Grid>
          <Grid item xs={3} />
        </Grid>
        <Grid container>
          <RenderGridItem
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            icon={<ApartmentOutlinedIcon className={classes.icon} />}
            iconLabel="Name"
            objName="name"
            data={tempData.name}
            PopData={PopUpData.Name}
            component={
              <FourthComponent
                verified={verified}
                availible={availible}
                missing={missing}
                setMainDataChanges={setMainDataChanges}
                id={id}
                data={UpdateData.name}
                missing_found={missing_found}
                missing_correct={missing_correct}
                valSetter={valSetter}
                name="name"
                PopData={PopUpData.NameSub}
              />
            }
          />
          <RenderGridItem
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            icon={<LocalPhoneOutlinedIcon />}
            objName="phno"
            id={id}
            data={tempData.phno}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            PopData={PopUpData.phone}
            component={
              <FirstComponent
                PopData={PopUpData.phoneSub}
                id={id}
                valSetter={valSetter}
                name="phno"
                data={UpdateData.phno}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                verified={verified}
                availible={availible}
                missing={missing}
                setMainDataChanges={setMainDataChanges}
                missing_correct={missing_correct}
                missing_found={missing_found}
              />
            }
          />
        </Grid>
        <Grid container>
          <RenderGridItem
            setSelectOpen={setSelectOpen}
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            status={status}
            icon={<LanguageOutlinedIcon className={classes.icon} />}
            iconLabel=""
            objName="website"
            data={tempData.website}
            opentumb={opentumb}
            filter={filter}
            component={
              <FourthComponent
                missing_found={missing_found}
                missing_correct={missing_correct}
                data={UpdateData.website}
                valSetter={valSetter}
                name="website"
                PopData={PopUpData.websiteSub}
                verified={verified}
                availible={availible}
                missing={missing}
                setMainDataChanges={setMainDataChanges}
              />
            }
          />
          <RenderGridItem
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            icon={<MailOutlineOutlinedIcon className={classes.icon} />}
            objName="email"
            data={tempData.email}
            PopData={PopUpData.email}
            component={
              <FourthComponent
                id={id}
                missing_found={missing_found}
                missing_correct={missing_correct}
                data={UpdateData.email}
                valSetter={valSetter}
                name="email"
                PopData={PopUpData.emailSub}
                verified={verified}
                availible={availible}
                missing={missing}
                setMainDataChanges={setMainDataChanges}
              />
            }
          />
        </Grid>
      </Paper>
      <Paper style={{ margin: 10, padding: 10 }}>
        <Text
          value={"Company Info"}
          style={{ fontSize: 10, fontWeight: "bold", marginLeft: "5%" }}
        />
        <Grid container>
          <RenderGridItem
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            icon={<BathtubOutlinedIcon className={classes.icon} />}
            iconLabel="Sector"
            objName="sector"
            data={tempData.sector}
            PopData={PopUpData.setter}
            component={
              <SectorComponent
                id={id}
                missing_found={missing_found}
                missing_correct={missing_correct}
                valSetter={valSetter}
                name="sector"
                verified={verified}
                availible={availible}
                missing={missing}
                setMainDataChanges={setMainDataChanges}
                data={UpdateData.sector}
                PopData={PopUpData.setterSub}
              />
            }
          />
          <RenderGridItem
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            icon={<ViewComfyOutlinedIcon className={classes.icon} />}
            iconLabel="Founded"
            objName="founded"
            data={tempData.founded}
            PopData={PopUpData.founded}
            missing_found={missing_found}
            missing_correct={missing_correct}
            component={
              <FourthComponent
                id={id}
                missing_correct={missing_correct}
                missing_found={missing_found}
                PopData={PopUpData.foundedSub}
                valSetter={valSetter}
                name="founded"
                data={UpdateData.founded}
                verified={verified}
                availible={availible}
                missing={missing}
                setMainDataChanges={setMainDataChanges}
              />
            }
          />
        </Grid>
        <Grid container>
          {/* <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} valSetter={valSetter} icon={<SupervisorAccountOutlinedIcon className={classes.icon} />} iconLabel="Biz Type" objName="biz_type" data={tempData.biz_type} component={{ name: "biz_type", id: 3 }} /> */}
          {/* <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<BathtubOutlinedIcon className={classes.icon} />} iconLabel="Biz_Type" objName="biz_type" PopData={PopUpData.biz_type} data={tempData.biz_type} marginSetter={bizTypeLength} component={<BizTypeComponent oldData={tempData.biz_type} id={id} objName={'biz_type'} missing_found={missing_found} missing_correct={missing_correct} PopData={PopUpData.biz_typeSub} getArrSize={setBizTypeLength} valSetter={valSetter} name="biz_type" verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} data={UpdateData.biz_type} />} /> */}
          <RenderGridItem
            id={id}
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            icon={<BathtubOutlinedIcon className={classes.icon} />}
            iconLabel="Biz_Type"
            objName="biz_type"
            PopData={PopUpData.biz_type}
            data={tempData.biz_type}
            marginSetter={bizTypeLength}
            component={{ name: "biZ_type", id: 3 }}
            UpdateData={UpdateData.biz_type}
            name="biz_type"
            missing_found={missing_found}
            missing_correct={missing_correct}
            SubPopData={PopUpData.biz_typeSub}
            getArrSize={setBizTypeLength}
            valSetter={valSetter}
            valSetters={valSetters}
          />
          <RenderGridItem
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            icon={<PersonOutlineOutlinedIcon className={classes.icon} />}
            iconLabel="Employee"
            objName="emp_size"
            data={tempData.emp_size}
            PopData={PopUpData.emp}
            component={
              <SecondComponent
                id={id}
                missing_correct={missing_correct}
                missing_found={missing_found}
                PopData={PopUpData.empSub}
                valSetter={valSetter}
                name="emp_size"
                data={UpdateData.emp_size}
                verified={verified}
                availible={availible}
                missing={missing}
                setMainDataChanges={setMainDataChanges}
              />
            }
          />
        </Grid>
        <Grid container>
          <RenderGridItem NOUI={true} />
          <RenderGridItem
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            icon={
              <i
                className={`${Icons["HQ"]}`}
                style={{ color: "rgb(189, 189, 189)", fontSize: 15 }}
                aria-hidden="true"
              />
            }
            iconLabel="Location"
            objName="hq_location"
            data={tempData.hq_location}
            PopData={PopUpData.hqlocation}
            component={
              <FourthComponent
                missing_found={missing_found}
                missing_correct={missing_correct}
                id={id}
                valSetter={valSetter}
                name="hq_location"
                data={UpdateData.hq_location}
                verified={verified}
                availible={availible}
                missing={missing}
                setMainDataChanges={setMainDataChanges}
              />
            }
          />
        </Grid>
      </Paper>
      <Paper style={{ margin: 10, padding: 10 }}>
        <Text
          value={"Social links and Follower"}
          style={{ fontSize: 10, fontWeight: "bold", marginLeft: "5%" }}
        />
        <Grid container>
          <RenderGridItem
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            icon={<Facebook className={classes.icon} />}
            iconLabel="Link"
            objName="facebook_link"
            data={tempData.facebook_link}
            PopData={PopUpData.fblink}
            component={
              <FourthComponent
                missing_found={missing_found}
                missing_correct={missing_correct}
                valSetter={valSetter}
                id={id}
                PopData={PopUpData.fbLinkSub}
                name="facebook_link"
                data={UpdateData.facebook_link}
                verified={verified}
                availible={availible}
                missing={missing}
                setMainDataChanges={setMainDataChanges}
              />
            }
          />
          <RenderGridItem
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            icon={<Instagram className={classes.icon} />}
            iconLabel="Link"
            objName="instagram_link"
            data={tempData.instagram_link}
            PopData={PopUpData.InstagramLink}
            component={
              <FourthComponent
                missing_found={missing_found}
                missing_correct={missing_correct}
                valSetter={valSetter}
                id={id}
                name="instagram_link"
                PopData={PopUpData.InstagramLinkSub}
                data={UpdateData.instagram_link}
                verified={verified}
                availible={availible}
                missing={missing}
                setMainDataChanges={setMainDataChanges}
              />
            }
          />
        </Grid>
        <Grid container>
          <RenderGridItem
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            icon={<Facebook className={classes.icon} />}
            iconLabel="Followers"
            objName="facebook_follower"
            data={tempData.facebook_follower}
            PopData={PopUpData.fbfollower}
            component={
              <FourthComponent
                missing_found={missing_found}
                missing_correct={missing_correct}
                PopData={PopUpData.fbfollowerSub}
                id={id}
                valSetter={valSetter}
                name="facebook_follower"
                data={UpdateData.facebook_follower}
                verified={verified}
                availible={availible}
                missing={missing}
                setMainDataChanges={setMainDataChanges}
              />
            }
          />
          <RenderGridItem
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            icon={<Instagram className={classes.icon} />}
            iconLabel="Follower"
            objName="instagram_follower"
            data={tempData.instagram_follower}
            PopData={PopUpData.InstagramFollower}
            component={
              <FourthComponent
                missing_found={missing_found}
                missing_correct={missing_correct}
                valSetter={valSetter}
                name="instagram_follower"
                PopData={PopUpData.InstagramLinkSub}
                id={id}
                data={UpdateData.instagram_follower}
                verified={verified}
                availible={availible}
                missing={missing}
                setMainDataChanges={setMainDataChanges}
              />
            }
          />
        </Grid>
        <Grid container>
          <RenderGridItem
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            icon={<Facebook className={classes.icon} />}
            iconLabel="Likes"
            objName="facebook_like"
            data={tempData.facebook_like}
            PopData={PopUpData.fbLike}
            component={
              <FourthComponent
                missing_found={missing_found}
                missing_correct={missing_correct}
                PopData={PopUpData.fbLikeSub}
                valSetter={valSetter}
                name="facebook_like"
                data={UpdateData.facebook_like}
                id={id}
                verified={verified}
                availible={availible}
                missing={missing}
                setMainDataChanges={setMainDataChanges}
              />
            }
          />
          <RenderGridItem
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            icon={<Instagram className={classes.icon} />}
            iconLabel="Post"
            objName="instagram_post"
            data={tempData.instagram_post}
            PopData={PopUpData.InstagramPost}
            component={
              <FourthComponent
                missing_found={missing_found}
                missing_correct={missing_correct}
                PopData={PopUpData.InstagramPostSub}
                id={id}
                valSetter={valSetter}
                name="instagram_post"
                data={UpdateData.instagram_post}
                verified={verified}
                availible={availible}
                missing={missing}
                setMainDataChanges={setMainDataChanges}
              />
            }
          />
        </Grid>
        <Grid container>
          <RenderGridItem
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            icon={<Twitter className={classes.icon} />}
            iconLabel="Link"
            objName="twitter_link"
            data={tempData.twitter_link}
            PopData={PopUpData.twitterlink}
            component={
              <FourthComponent
                missing_found={missing_found}
                missing_correct={missing_correct}
                PopData={PopUpData.twitterlinkSub}
                valSetter={valSetter}
                id={id}
                name="twitter_link"
                data={UpdateData.twitter_link}
                verified={verified}
                availible={availible}
                missing={missing}
                setMainDataChanges={setMainDataChanges}
              />
            }
          />
          <RenderGridItem
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            icon={<YouTube className={classes.icon} />}
            iconLabel="Link"
            objName="youtube_link"
            data={tempData.youtube_link}
            PopData={PopUpData.youtubelink}
            component={
              <FourthComponent
                missing_found={missing_found}
                missing_correct={missing_correct}
                PopData={PopUpData.youtubelinkSub}
                valSetter={valSetter}
                id={id}
                name="youtube_link"
                data={UpdateData.youtube_link}
                verified={verified}
                availible={availible}
                missing={missing}
                setMainDataChanges={setMainDataChanges}
              />
            }
          />
        </Grid>
        <Grid container>
          <RenderGridItem
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            icon={<Twitter className={classes.icon} />}
            iconLabel="Followers"
            objName="twitter_follower"
            data={tempData.twitter_follower}
            PopData={PopUpData.twitterfollower}
            component={
              <FourthComponent
                missing_found={missing_found}
                missing_correct={missing_correct}
                PopData={PopUpData.twitterfollowerSub}
                valSetter={valSetter}
                name="twitter_follower"
                data={UpdateData.twitter_follower}
                id={id}
                verified={verified}
                availible={availible}
                missing={missing}
                setMainDataChanges={setMainDataChanges}
              />
            }
          />
          <RenderGridItem
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            icon={<YouTube className={classes.icon} />}
            iconLabel="Follower"
            objName="youlink_follower"
            data={tempData.youlink_follower}
            PopData={PopUpData.youtubefollower}
            component={
              <FourthComponent
                missing_found={missing_found}
                missing_correct={missing_correct}
                PopData={PopUpData.youtubefollowerSub}
                valSetter={valSetter}
                name="youlink_follower"
                data={UpdateData.youlink_follower}
                id={id}
                verified={verified}
                availible={availible}
                missing={missing}
                setMainDataChanges={setMainDataChanges}
              />
            }
          />
        </Grid>
        <Grid container>
          <RenderGridItem
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            icon={<LinkedIn className={classes.icon} />}
            iconLabel="Link"
            objName="linkedin_link"
            data={tempData.linkedin_link}
            PopData={PopUpData.Linkedinlink}
            component={
              <FourthComponent
                missing_found={missing_found}
                missing_correct={missing_correct}
                PopData={PopUpData.LinkedinlinkSub}
                valSetter={valSetter}
                name="linkedin_link"
                data={UpdateData.linkedin_link}
                verified={verified}
                id={id}
                availible={availible}
                missing={missing}
                setMainDataChanges={setMainDataChanges}
              />
            }
          />
          <Grid item xs={6}></Grid>
        </Grid>
        <Grid container>
          <RenderGridItem
            verified={verified}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            icon={<LinkedIn className={classes.icon} />}
            iconLabel="Followers"
            objName="linkedin_followers"
            data={tempData.linkedin_followers}
            PopData={PopUpData.Linkedinfollower}
            component={
              <FourthComponent
                missing_found={missing_found}
                missing_correct={missing_correct}
                PopData={PopUpData.LinkedinfollowerSub}
                valSetter={valSetter}
                name="linkedin_followers"
                data={UpdateData.linkedin_followers}
                id={id}
                verified={verified}
                availible={availible}
                missing={missing}
                setMainDataChanges={setMainDataChanges}
              />
            }
          />
          <Grid item xs={6}></Grid>
        </Grid>
      </Paper>
      <Paper style={{ margin: 10, padding: 10 }}>
        <Text
          value={"City and Country Presence"}
          style={{ fontSize: 10, fontWeight: "bold", marginLeft: "5%" }}
        />
        <Grid container>
          <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={1} />
            <ApartmentOutlinedIcon />
            <Text value={"City"} style={{ fontSize: 9 }} />
          </Grid>
          <Grid item xs={6}>
            <LanguageOutlinedIcon />
            <Text value={"Country"} style={{ fontSize: 9 }} />
          </Grid>
        </Grid>
        <Grid container>
          <RenderGridItem
            valSetters={valSetter}
            iconLabel="Total"
            data={UpdateData.city && UpdateData.city.length}
          />
          <RenderGridItem
            valSetters={valSetter}
            iconLabel="Total"
            data={UpdateData.country && UpdateData.country.length}
          />
        </Grid>
        <Grid container>
          <RenderGridItem
            id={id}
            verified={verified}
            marginSetter={bizTypeLength}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            valSetters={valSetters}
            iconLabel="List"
            objName="city"
            data={tempData.city}
            PopData={PopUpData.citylist}
            component={{ name: "city", id: 2 }}
            missing_found={missing_found}
            missing_correct={missing_correct}
            SubPopData={PopUpData.citylistSub}
            valSetter={valSetter}
            cityName="city"
            getArrSize={setBizTypeLength}
            UpdateCityData={UpdateData.city}
          />
          <RenderGridItem
            id={id}
            verified={verified}
            marginSetter={bizTypeLength}
            availible={availible}
            missing={missing}
            setMainDataChanges={setMainDataChanges}
            valSetters={valSetters}
            iconLabel="List"
            objName="country"
            data={tempData.country}
            PopData={PopUpData.countrylist}
            component={{ name: "country", id: 1 }}
            SubCountryPopData={PopUpData.countrylistSub}
            missing_found={missing_found}
            missing_correct={missing_correct}
            valSetter={valSetter}
            countryName="country"
            getArrSize={setBizTypeLength}
            UpdateCountryData={UpdateData.country}
          />
          {/* <RenderGridItem id={id} verified={verified} marginSetter={bizTypeLength} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} valSetters={valSetters} iconLabel="List" objName="city" data={tempData.city} PopData={PopUpData.citylist} component={<CityandCountryComponent PopData={PopUpData.citylistSub} valSetter={valSetter} name="city" getArrSize={setBizTypeLength} data={UpdateData.city} id={id} verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} />} />
          <RenderGridItem id={id} verified={verified} marginSetter={bizTypeLength} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} valSetters={valSetters} iconLabel="List" objName="country" data={tempData.country} PopData={PopUpData.countrylist} component={<CityandCountryComponent PopData={PopUpData.countrylistSub} valSetter={valSetter} getArrSize={setBizTypeLength} name="country" data={UpdateData.country} id={id} verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} />} /> */}
        </Grid>
      </Paper>
      <Button
        style={{
          height: "30px",
          marginLeft: "5%",
          margin: 10,
          backgroundColor: Object.values(verified).every((x) => x == true)
            ? "#212121"
            : "lightgrey",
        }}
        disabled={!Object.values(verified).every((x) => x == true)}
        onClick={() => handleSave()}
      >
        <Text
          value={"Save"}
          style={{
            fontSize: 12,
            fontWeight: "bold",
            cursor: "pointer",
            color: Object.values(verified).every((x) => x == true)
              ? "white"
              : "#212121",
          }}
        />
      </Button>
    </div>
  );
}

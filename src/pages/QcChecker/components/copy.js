import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles,styles } from '@material-ui/core/styles';
import { Paper, Popper, Grid, TextField, Divider, ButtonGroup, IconButton, Checkbox, Button, Tooltip, Typography } from '@material-ui/core';
import Text from 'components/core/Text';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';
import ContactsIcon from '@material-ui/icons/Contacts';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ApartmentOutlinedIcon from '@material-ui/icons/ApartmentOutlined';
import LocalPhoneOutlinedIcon from '@material-ui/icons/LocalPhoneOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import CustomSelect from 'components/core/CustomSelect';
import DialogBox from './DialogBox'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  AcUnitOutlined, Favorite, Add, Facebook, Twitter, LinkedIn, Instagram, YouTube, AddCircle
} from '@material-ui/icons';
import { Icons } from 'constants/icons';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import BathtubOutlinedIcon from '@material-ui/icons/BathtubOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import ViewComfyOutlinedIcon from '@material-ui/icons/ViewComfyOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { useAppValue } from 'context/app';
import CustomPopOver from 'components/core/CustomPopOver';
import CustomIcon from 'components/core/CustomIcon';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
//API
import api from 'api';

//util
import { getSession } from 'util/check-auth';
//constants
import endpoints from 'constants/endpoints';
import Slide from "@material-ui/core/Slide";
const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});
const stylese = (theme) => ({
  root: {
    position: 'relative',
    marginLeft: 10,
    height: 70
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const useStyles = makeStyles({
  root: {
    position: 'relative',
    marginLeft: 10,
    height: 70
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
    height: 70
  },
  divider: {
    height: 28,
    margin: 4,
  },
  column: {
    display: 'flex',
    // alignItems: 'center',
    marginLeft: 30,
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: "column"
  },
  text: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'lightgray'
    },
    // marginBottom: 5
    marginLeft: 110,
    marginTop: 31,
    width: 80,
    height: 36,
    backgroundColor: 'lightGray'
  },
  item: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#d3d3d359",
    display: "flex",
    borderRadius: 5,
    padding: 5
  },
  subitem: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#E2EFD8",
    display: "flex",
    marginLeft: 8,
    borderRadius: 5,
    padding: 4
  },
  icon: {
    color: "grey"
  },
  popover: {
    padding: 5,
    maxWidth: 300
},
closeButton: {
  position: 'absolute',
},
});

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    width: '100%',
    height: 'inherat',
    backgroundColor: 'transparent',
    fontSize: 12,
    padding: '10px 26px 10px 12px',
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
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
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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
function FirstComponent({ valSetter, name }) {
  const [fields, setFields] = useState([{ value: null }]);
  const [age, setAge] = useState('');
  const classes = useStyles();
  // function handleChange(i, event) {
  //   const values = [...fields];
  //   values[i].value = event.target.value;
  //   setFields(values);
  // }
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  return (<div>
    {fields.map((field, idx) => {
      return (
        <div key={`${field}-${idx}`}>
          <Grid container style={{ display: "flex", marginBottom: 10 }}>
            <Grid item xs={10}>
              <Grid container className={classes.subitem}>
                <Grid item xs={2}>
                  <ControlPointIcon style={{ cursor: 'pointer' }} onClick={() => valSetter(name, age)} className={classes.icon} />
                </Grid>
                <Grid item xs={2}>
                  <RemoveCircleOutlineIcon style={{ cursor: 'pointer' }} onClick={() => handleRemove(idx)} className={classes.icon} />
                </Grid>
                <Grid item xs={8} >
                  {/* <input
                        style={{ width: '85%' }}
                        type="text"
                        placeholder="Get Office Number"
                        onChange={e => handleChange(idx, e)}
                      /> */}
                  <TextField
                    onChange={handleChange}
                    variant="outlined"
                    inputProps={{ style: { padding: 4, fontSize: 11, backgroundColor: 'white' } }}

                  // value={age}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} />
            {
              idx == 0 &&
              <Grid item xs={1}>
                <Grid container style={{ display: "flex", alignItems: "center" }}>
                  <Grid item xs={12}>
                    <AddCircle style={{ cursor: 'pointer', fontSize: 22 }} onClick={() => handleAdd()} className={classes.icon} />
                  </Grid>
                </Grid>
              </Grid>
            }

          </Grid>
        </div>
      );
    })}
  </div>
  );
}

function FourthComponent({ valSetter, name }) {
  const [fields, setFields] = useState([{ value: null }]);
  const [age, setAge] = useState('');
  const classes = useStyles();
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  return (<div>
    {fields.map((field, idx) => {
      return (
        <div key={`${field}-${idx}`}>
          <Grid container style={{ display: "flex", marginBottom: 10 }}>
            {/* <Grid item xs={12}> */}
            <Grid container className={classes.subitem}>
              <Grid item xs={2}>
                <ControlPointIcon style={{ cursor: 'pointer' }} onClick={() => valSetter(name, age)} className={classes.icon} />
              </Grid>
              <Grid item xs={2}>
                <RemoveCircleOutlineIcon style={{ cursor: 'pointer' }} onClick={() => handleRemove(idx)} className={classes.icon} />
              </Grid>
              <Grid item xs={8} >
                {/* <input
                        style={{ width: '85%' }}
                        type="text"
                        placeholder="Get Office Number"
                        onChange={e => handleChange(idx, e)}
                      /> */}
                <TextField
                  onChange={handleChange}
                  variant="outlined"
                  inputProps={{ style: { padding: 4, fontSize: 11, backgroundColor: 'white' } }}

                // value={age}
                />
              </Grid>
            </Grid>
            {/* </Grid> */}
          </Grid>
        </div>
      );
    })}
  </div>
  );
}

function SecondComponent({ valSetter, name }) {
  const [fields, setFields] = useState([{ value: null }]);
  const [age, setAge] = useState('');
  const [state, setState] = React.useState({ firstName: "", lastName: "" })
  const classes = useStyles();
  // function handleChange(i, event) {
  //   const values = [...fields];
  //   values[i].value = event.target.value;
  //   setFields(values);
  // }
  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };
  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }
  let stateObj = Object.values(state)
  let empSize = stateObj[0] + "-" + stateObj[1]
  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }
  return (<div >
    {fields.map((field, idx) => {
      return (
        <div key={`${field}-${idx}`}>
          <Grid container className={classes.subitem} style={{ display: "flex", marginBottom: 10 }}>
            <Grid item xs={2}>
              <ControlPointIcon style={{ cursor: 'pointer' }} onClick={() => valSetter(name, empSize)} className={classes.icon} />
            </Grid>
            <Grid item xs={2}>
              <RemoveCircleOutlineIcon style={{ cursor: 'pointer' }} onClick={() => handleRemove(idx)} className={classes.icon} />
            </Grid>
            <Grid item xs={8} style={{ display: 'flex', flexDirection: 'row', justifyItems: 'space-between' }}>
              <Grid item xs={3}>
                <TextField
                  onChange={handleChange}
                  variant="outlined"
                  inputProps={{ style: { padding: 3, fontSize: 11, backgroundColor: 'white' } }}
                  style={{ width: '40px' }}
                  value={state.firstName}
                  name='firstName'
                />
              </Grid>
              <Grid item xs={2} />
              <Grid item xs={3}>
                <TextField
                  onChange={handleChange}
                  variant="outlined"
                  name='lastName'
                  inputProps={{ style: { padding: 3, fontSize: 11, backgroundColor: 'white' } }}
                  style={{ width: '40px' }}
                  value={state.lastName}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    })}
  </div>
  );
}

function ThirdComponent({ valSetter, name }) {
  const [fields, setFields] = useState([""]);
  const classes = useStyles();

  function handleChange(i, event) {
    const values = [...fields];
    values[i] = event.target.value;
    setFields(values);
  }


  function handleAdd() {
    const values = [...fields];
    values.push('');
    setFields(values);
    valSetter(name, values)
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }
  return (<div >
    {fields.map((field, idx) => {
      return (
        <div key={`${field}-${idx}`}>
          <Grid container style={{ display: "flex", marginBottom: 10 }}>
            <Grid item xs={10}>
              <Grid container className={classes.subitem} style={{ display: "flex", marginBottom: 10 }}>
                <Grid item xs={2}>
                  <ControlPointIcon style={{ cursor: 'pointer' }} onClick={() => valSetter(name, fields)} className={classes.icon} />
                </Grid>
                <Grid item xs={2}>
                  <RemoveCircleOutlineIcon style={{ cursor: 'pointer' }} onClick={() => handleRemove(idx)} className={classes.icon} />
                </Grid>
                <Grid item xs={8} style={{ display: 'flex', flexDirection: 'row', justifyItems: 'space-between' }}>
                  <NativeSelect
                    style={{ width: '100%', height: 0, backgroundColor: 'transparent' }}
                    value={field}
                    onChange={(e) => handleChange(idx, e)}
                    input={<BootstrapInput />}
                  >
                    <option aria-label="None" value="" />
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                  </NativeSelect>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} />
            {
              idx == 0 &&
              <Grid item xs={1}>
                <Grid container style={{ display: "flex", alignItems: "center" }}>
                  <Grid item xs={12}>
                    <AddCircle style={{ cursor: 'pointer', fontSize: 22 }} onClick={() => handleAdd()} className={classes.icon} />
                  </Grid>
                </Grid>
              </Grid>
            }
          </Grid>
        </div>
      );
    })}
  </div>
  );
}

function FifthComponent({ valSetter, name }) {
  const [fields, setFields] = useState([{ value: null }]);
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }
  return (<div >
    {fields.map((field, idx) => {
      return (
        <div key={`${field}-${idx}`}>
          <Grid container style={{ display: "flex", marginBottom: 10 }}>
            <Grid container className={classes.subitem} style={{ display: "flex", marginBottom: 10 }}>
              <Grid item xs={2}>
                <ControlPointIcon style={{ cursor: 'pointer' }} onClick={() => valSetter(name, age)} className={classes.icon} />
              </Grid>
              <Grid item xs={2}>
                <RemoveCircleOutlineIcon style={{ cursor: 'pointer' }} onClick={() => handleRemove(idx)} className={classes.icon} />
              </Grid>
              <Grid item xs={8} style={{ display: 'flex', flexDirection: 'row', justifyItems: 'space-between' }}>
                <NativeSelect
                  style={{ width: '100%', height: 0, backgroundColor: 'transparent' }}
                  value={age}
                  onChange={handleChange}
                  input={<BootstrapInput />}
                >
                  <option aria-label="None" value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </NativeSelect>
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    })}
  </div>
  );
}

function NormalText({ icon, iconLabel, data, component, index, objName, setMainDataChanges, verified, missing, availible }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [right, setRight] = useState(false)
  // console.log('data',data)
  useEffect(() => {
    if (verified && objName && verified[objName]) setRight(true)
    else setRight(false)
  }, [verified])
  useEffect(() => {
    if (data == '') setOpen(true)
    else setOpen(false)
  }, [data])
  return (
    <Grid container style={{ display: "flex", padding: 10, }}>
      <Grid item xs={1}>
        {icon}
        <Text value={iconLabel} style={{ fontSize: 9 }} />
      </Grid>
      <Grid item xs={5} >
        <Grid container className={classes.item}>
          <Tooltip title={data}>
            <Grid item xs={9} style={{ position: 'relative', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <Text value={data} style={{ fontSize: 9, overflow: "visible", width: '300%' }} />
            </Grid>
          </Tooltip>
          <Grid item xs={2}>
            <CheckCircleOutlineIcon onClick={() => {
              //kst here
              let tempMissing = [...missing]
              let tempAvailible = [...availible]
              let tempData = { ...verified, [objName]: 1 }

              const missingIndex = tempMissing.indexOf(objName)
              if (missingIndex !== -1) tempMissing.splice(missingIndex, 1);

              const availibleIndex = tempAvailible.indexOf(objName)
              if (availibleIndex !== -1) tempAvailible.splice(availibleIndex, 1);

              setMainDataChanges(tempData, tempMissing, tempAvailible)
              setOpen(false)
              // setRight(true)
            }}
              style={{ cursor: 'pointer', color: right ? "green" : "grey" }}
              className={classes.icon}
            />
          </Grid>
          <Grid item xs={1}>
            <HighlightOffIcon onClick={() => setOpen(true)} style={{ color: open ? "red" : "grey", cursor: 'pointer' }} />
          </Grid>
        </Grid>
      </Grid>
      {open ?
        <Grid item xs={6}>
          {component}
        </Grid>
        :
        <></>
      }
    </Grid>
  );
}

function ThirdComponent2({ valSetter, handleChange, handleAdd, handleRemove, value, idx }) {
  const classes = useStyles();

  return (
    <Grid container style={{ display: "flex", marginBottom: 10 }}>
      <Grid item xs={10}>
        <Grid container className={classes.subitem} style={{ display: "flex", marginBottom: 10 }}>
          <Grid item xs={2}>
            <ControlPointIcon style={{ cursor: 'pointer' }} onClick={() => valSetter(idx, value)} className={classes.icon} />
          </Grid>
          <Grid item xs={2}>
            <RemoveCircleOutlineIcon style={{ cursor: 'pointer' }} onClick={() => handleRemove(idx)} className={classes.icon} />
          </Grid>
          <Grid item xs={8} style={{ display: 'flex', flexDirection: 'row', justifyItems: 'space-between' }}>
            <NativeSelect
              style={{ width: '100%', height: 0, backgroundColor: 'transparent' }}
              value={value}
              onChange={(e) => handleChange(idx, e)}
              input={<BootstrapInput />}
            >
              <option aria-label="None" value="" />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} />
      {
        idx == 0 &&
        <Grid item xs={1}>
          <Grid container style={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={12}>
              <AddCircle style={{ cursor: 'pointer', fontSize: 22 }} onClick={() => handleAdd()} className={classes.icon} />
            </Grid>
          </Grid>
        </Grid>
      }
    </Grid>
  );
}

function TextArray({ icon, iconLabel, data, component, valSetter, objName, setMainDataChanges, verified, missing, availible }) {
  const classes = useStyles();
  const [open, setOpen] = useState([false])
  const [right, setRight] = useState(data.length ? new Array(data.length).fill(false) : [false])
  const [arr, setArr] = useState([''])

  useEffect(() => {
    if (data.length == 0) setArr([''])
    else setArr(data)
  }, [data])


  // useEffect(() => {
  //   let arr = []
  //   for (let val of data) arr.push(false)
  //   setRight(arr)
  // }, [verified])

  function handleChange(i, event) {
    const values = [...arr];
    values[i] = event.target.value;
    setArr(values);
  }


  function handleAdd() {
    const values = [...arr];
    values.push('');
    setArr(values);
    valSetter([component.name], values)
  }

  function handleRemove(i) {
    const values = [...arr];
    const tempOpen = [...open]
    values.splice(i, 1);
    tempOpen.splice(i, 1);
    if (values.length == 0) {
      setArr([''])
      setOpen([false])
    }
    else {
      setArr(values)
      setOpen(tempOpen)
    }
  }

  function valSetterFunc(id, val) {
    let tempArr = [...arr]
    tempArr[id] = val
    valSetter([component.name], tempArr)
  }

  return (
    arr.map((x, index) =>
      <Grid container style={{ display: "flex", padding: 10, }}>
        <Grid item xs={1}>
          {
            index == 0 &&
            <>
              {icon}
              <Text value={iconLabel} style={{ fontSize: 9 }} />
            </>
          }
        </Grid>

        <Grid item xs={5} >
          <Grid container className={classes.item}>
            <Grid item xs={9}>
              <Text value={x} style={{ fontSize: 9 }} />
            </Grid>
            <Grid item xs={2}>
              <CheckCircleOutlineIcon onClick={() => {
                //kst here
                let tempOpen = [...open]
                let tempRight = [...right]
                tempOpen[index] = false
                tempRight[index] = true

                if (right.every(x => x == true)) {
                  let tempMissing = [...missing]
                  let tempAvailible = [...availible]
                  let tempData = { ...verified, [objName]: 1 }

                  const missingIndex = tempMissing.indexOf(objName)
                  if (missingIndex !== -1) tempMissing.splice(missingIndex, 1);

                  const availibleIndex = tempAvailible.indexOf(objName)
                  if (availibleIndex !== -1) tempAvailible.splice(availibleIndex, 1);

                  setMainDataChanges(tempData, tempMissing, tempAvailible)
                }

                setOpen(tempOpen)
                setRight(tempRight)
              }}
                style={{ cursor: 'pointer', color: right[index] ? "green" : "grey" }}
                className={classes.icon}
              />
            </Grid>
            <Grid item xs={1}>
              <HighlightOffIcon
                onClick={() => {
                  let tempOpen = [...open]
                  tempOpen[index] = true
                  setOpen(tempOpen)
                }}
                style={{ color: open[index] ? "red" : "grey", cursor: 'pointer' }} />
            </Grid>
          </Grid>
        </Grid>
        {open[index] ?
          <Grid item xs={6}>
            {
              component.id == 3 &&
              <ThirdComponent2
                value={x}
                handleChange={handleChange}
                handleAdd={handleAdd}
                handleRemove={handleRemove}
                valSetter={valSetterFunc}
                idx={index}
              />
            }
            {
              component.id == 2 &&
              <FourthComponent
                value={x}
                handleAdd={handleAdd}
                valSetter={valSetterFunc}
                handleRemove={handleRemove}
                idx={index}
              />
            }

          </Grid>
          :
          <></>
        }
      </Grid>
    )

  );
}

function RenderGridItem(props) {
  let { data, NOUI } = props

  const checkDataType = (dataParam) => {
    if (dataParam) {
      if (Array.isArray(dataParam)) return "Array"
      else return typeof dataParam
    }
    return dataParam
  }

  const renderByType = (dataParam) => {
    if (checkDataType(dataParam) == "Array") return <TextArray  {...props} />
    // else if (dataParam) return <NormalText {...props} />
    // else return <Grid container style={{ display: "flex", padding: 10 }} />
    // else return <NormalText {...props} />
    else if (NOUI) return <Grid container style={{ display: "flex", padding: 10 }} />
    else return <NormalText {...props} />
  }

  return (
    <Grid item xs={6}>
      {renderByType(data)}
    </Grid>
  )

}
const CustomSelector2 = ({ options, defaultVal, valGetter, outerValue, style, noNone}) => {
  const [value, setValue] = React.useState();

  const handleChange = (event) => {
    setValue(event.target.value)
  };
 

  // useEffect(() => {
  //     if (value !== '') valGetter(value)
  //     else valGetter(defaultVal)
  // }, [value, defaultVal])



  useEffect(() => {
    if (value !== '') valGetter(value)
  }, [value])

  useEffect(() => {
    if (outerValue) setValue(outerValue);
  }, [outerValue])

  return (
    <NativeSelect
      style={{ ...style }}
      value={value || defaultVal}
      onChange={handleChange}
      input={<BootstrapInput />}
    >
      {!noNone && <option aria-label="None" value="" />}
      {
        options.map(child => <option value={child}>{child}</option>)
      }
    </NativeSelect>
  )
}

export default function QcFieldList({ setMainDataChanges, dataObj }) {
  let { company_data, id, verified, missing, availible } = dataObj
  const classes = useStyles();
  const [state, dispatch] = useAppValue();

  const { filenames, totalCountries } = state;
  const [filter, setFilter] = useState('');
  const [fileName, setFileName] = useState('')
  const [tempData, setTempData] = useState({})
  const lists = ['Exhibition / Conference', 'No local presence ( no local office/phone )']
  const issue=['Website not working','Website under construction','Domain expired']
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = async () => {
    const response = await api().post(
      endpoints.checkerUpdate,
      {
        id,
        company_data: JSON.stringify(tempData),
        verified: JSON.stringify(verified),
        status: 'Irrelevant',
        missing: JSON.stringify(missing),
        availible: JSON.stringify(availible)
      }
    );
    if (response.status === 200) {
      window.location.reload();
    }
    setOpen(false);
  };
  //  console.log('missing',missing)
  useEffect(() => {
    setTempData({ ...company_data })
  }, [company_data]);
  const handleSave = async () => {
    const response = await api().post(
      endpoints.checkerUpdate,
      {
        id,
        company_data: JSON.stringify(tempData),
        verified: JSON.stringify(verified),
        status: 'Verified',
        missing: JSON.stringify(missing),
        availible: JSON.stringify(availible)
      }
    );
    if (response.status === 200) {
      window.location.reload();
    }
  }
  const onFileChange = (filename) => {
    if (filename) setFileName(filename);
  }
  // console.log('valueeee',fileName)
  useEffect(() => {
    if(fileName==lists[0])
    setOpen(true)
  }, [fileName]);
  const valSetter = (name, data) => setTempData({ ...tempData, [name]: data })

  return (
    <div >
      <Paper style={{ margin: 10, padding: 10 }}>
      <Dialog fullWidth={false} fullScreen={false} TransitionComponent={Transition} maxWidth={false} onClose={handleClose} open={open} style={{height: window.innerHeight - 140}}>
        <DialogTitle onClose={handleClose}/>
        <DialogContent >
          <Typography gutterBottom>
          Since this company is irrelevant, move on to the next company
          </Typography>
        </DialogContent>
      </Dialog>
        <Grid container spacing={3}>
          <Grid item xs={1} />
          <Grid item xs={2}>
            <Text value={"Company Contact"} style={{ fontSize: 10, fontWeight: 'bold' }} />
          </Grid>
          <Grid item xs={3}>
            <Paper style={{ display: 'flex', alignItems: 'center', backgroundColor: '#DAE3F4', height: '72%' }} >
              <CustomPopOver
                label={<Typography style={{ marginLeft: '15px',cursor:'pointer' }}>{`Irrelevant`}</Typography>}
                                    content={
                                        <Paper className={classes.popover}>
                  Check website to see company is NOT about exhibition/conference/seminar/ event registration OR doesn’t have local presence ( no local office address or local phone number. If there is no local contact info on website, check FB page to see if there is local phone number.
If so, select the reasons from the drop down and move on to the next company. If neither, continue with QC check

                                        </Paper>
                                    }
                                />
              
              <Divider className={classes.divider} style={{ marginLeft: '15px' }} orientation="vertical" />
              <CustomSelector2
                  noNone={true}
                  style={{ width: "100%", backgroundColor: '#DAE3F4', height: '72%' }}
                  options={lists}
                  defaultVal={'ell'}
                  valGetter={onFileChange} />
             
      </Paper>
        </Grid>
            <Grid item xs={3}>
              <Paper style={{ display: 'flex', alignItems: 'center', backgroundColor: '#DAE3F4', height: '72%' ,width:'112%'}} >
              <CustomPopOver
                label={<div style={{ marginLeft: '3%', display: 'flex',cursor:'pointer' }}>
                <LanguageOutlinedIcon className={classes.icon} /> <Typography style={{ marginLeft: '1%' }}>{`Issue`}</Typography></div>}
                                    content={
                                        <Paper className={classes.popover}>
             If the website has issues, select the reasons from the drop down menu. Continue with the rest of the QC check
                                        </Paper>
                                    }
                                />
                <Divider className={classes.divider} style={{ marginLeft: '15px' }} orientation="vertical" />
                <CustomSelect
                            onSelectChange={setFilter}
                            options={issue}
                            // icon={<CustomIcon style={{ padding: 0 }} icon={<Visibility />} />}
                            style={{ zIndex: 9999 }}
                            dropdown={<ExpandMoreIcon />}
                        />
              </Paper>
            </Grid>
            <Grid item xs={3} />
          </Grid>
          <Grid container>
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<ApartmentOutlinedIcon className={classes.icon} />} iconLabel="Name" objName="name" data={tempData.name} component={<FourthComponent valSetter={valSetter} name="name" />} />
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<LocalPhoneOutlinedIcon className={classes.icon} />} objName="phno" data={tempData.phno} component={<FirstComponent valSetter={valSetter} name="phno" />} />
          </Grid>
          <Grid container>
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<LanguageOutlinedIcon className={classes.icon} />} iconLabel="" objName="website" data={tempData.website} component={<FourthComponent valSetter={valSetter} name="website" />} />
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<MailOutlineOutlinedIcon className={classes.icon} />} objName="email" data={tempData.email} component={<FourthComponent valSetter={valSetter} name="email" />} />
          </Grid>
      </Paper>
        <Paper style={{ margin: 10, padding: 10 }}>
          <Text value={"Company Info"} style={{ fontSize: 10, fontWeight: 'bold', marginLeft: "5%" }} />
          <Grid container>
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<BathtubOutlinedIcon className={classes.icon} />} iconLabel="Sector" objName="sector" data={tempData.sector} component={<FifthComponent valSetter={valSetter} name="sector" />} />
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<ViewComfyOutlinedIcon className={classes.icon} />} iconLabel="Founded" objName="founded" data={tempData.founded} component={<FourthComponent valSetter={valSetter} name="founded" />} />
          </Grid>
          <Grid container>
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} valSetter={valSetter} icon={<SupervisorAccountOutlinedIcon className={classes.icon} />} iconLabel="Biz Type" objName="biz_type" data={tempData.biz_type} component={{ name: "biz_type", id: 3 }} />
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<PersonOutlineOutlinedIcon className={classes.icon} />} iconLabel="Employee" objName="emp_size" data={tempData.emp_size} component={<SecondComponent valSetter={valSetter} name="emp_size" />} />
          </Grid>
          <Grid container>
            <RenderGridItem NOUI={true} />
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<i className={`${Icons["HQ"]}`} style={{ color: "rgb(189, 189, 189)", fontSize: 15 }} aria-hidden="true" />} iconLabel="Location" objName="hq_location" data={tempData.hq_location} component={<FifthComponent valSetter={valSetter} name="hq_locaton" />} />
          </Grid>
        </Paper>
        <Paper style={{ margin: 10, padding: 10 }}>
          <Text value={"Social links and Follower"} style={{ fontSize: 10, fontWeight: 'bold', marginLeft: "5%" }} />
          <Grid container>
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<Facebook className={classes.icon} />} iconLabel="Link" objName="facebook_link" data={tempData.facebook_link} component={<FourthComponent valSetter={valSetter} name="facebook_link" />} />
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<Instagram className={classes.icon} />} iconLabel="Link" objName="instagram_link" data={tempData.instagram_link} component={<FourthComponent valSetter={valSetter} name="instagram_link" />} />
          </Grid>
          <Grid container>
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<Facebook className={classes.icon} />} iconLabel="Followers" objName="facebook_follower" data={tempData.facebook_follower} component={<FourthComponent valSetter={valSetter} name="facebook_follower" />} />
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<Instagram className={classes.icon} />} iconLabel="Follower" objName="instagram_follower" data={tempData.instagram_follower} component={<FourthComponent valSetter={valSetter} name="instagram_follower" />} />
          </Grid>
          <Grid container>
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<Facebook className={classes.icon} />} iconLabel="Likes" objName="facebook_like" data={tempData.facebook_like} component={<FourthComponent valSetter={valSetter} name="facebook_like" />} />
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<Instagram className={classes.icon} />} iconLabel="Post" objName="instagram_post" data={tempData.instagram_post} component={<FourthComponent valSetter={valSetter} name="instagram_post" />} />
          </Grid>
          <Grid container>
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<Twitter className={classes.icon} />} iconLabel="Link" objName="twitter_link" data={tempData.twitter_link} component={<FourthComponent valSetter={valSetter} name="twitter_link" />} />
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<YouTube className={classes.icon} />} iconLabel="Link" objName="youtube_link" data={tempData.youtube_link} component={<FourthComponent valSetter={valSetter} name="youtube_link" />} />
          </Grid>
          <Grid container>
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<Twitter className={classes.icon} />} iconLabel="Followers" objName="twitter_follower" data={tempData.twitter_follower} component={<FourthComponent valSetter={valSetter} name="twitter_follower" />} />
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<YouTube className={classes.icon} />} iconLabel="Follower" objName="youlink_follower" data={tempData.youlink_follower} component={<FourthComponent valSetter={valSetter} name="youlink_follower" />} />
          </Grid>
          <Grid container>
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<LinkedIn className={classes.icon} />} iconLabel="Link" objName="linkedin_link" data={tempData.linkedin_link} component={<FourthComponent valSetter={valSetter} name="linkedin_link" />} />
            <Grid item xs={6}></Grid>
          </Grid>
          <Grid container>
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} icon={<LinkedIn className={classes.icon} />} iconLabel="Followers" objName="linkedin_followers" data={tempData.linkedin_followers} component={<FourthComponent valSetter={valSetter} name="linkedin_followers" />} />
            <Grid item xs={6}></Grid>
          </Grid>
        </Paper>
        <Paper style={{ margin: 10, padding: 10 }}>
          <Text value={"City and Country Presence"} style={{ fontSize: 10, fontWeight: 'bold', marginLeft: "5%" }} />
          <Grid container>
            <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
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
            <RenderGridItem valSetter={valSetter} iconLabel="Total" data={tempData.city && tempData.city.length} />
            <RenderGridItem valSetter={valSetter} iconLabel="Total" data={tempData.country && tempData.country.length} />
          </Grid>
          <Grid container>
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} valSetter={valSetter} iconLabel="List" objName="city" data={tempData.city} component={{ name: "city", id: 3 }} />
            <RenderGridItem verified={verified} availible={availible} missing={missing} setMainDataChanges={setMainDataChanges} valSetter={valSetter} iconLabel="List" objName="country" data={tempData.country} component={{ name: "country", id: 3 }} />
          </Grid>
        </Paper>
        <Button
          style={{ height: '30px', marginLeft: "5%", margin: 10, backgroundColor: Object.values(verified).every(x => x == true) ? "#212121" : "lightgrey" }}
          disabled={!Object.values(verified).every(x => x == true)}
          onClick={() => handleSave()}
        >
          <Text value={"Save"} style={{ fontSize: 12, fontWeight: 'bold', cursor: "pointer", color: Object.values(verified).every(x => x == true) ? "white" : "#212121" }} />
        </Button>
    </div>
  )
}
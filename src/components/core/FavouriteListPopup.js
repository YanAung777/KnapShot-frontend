import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, Paper, ButtonBase, Typography, Popper, Checkbox, Button, Divider, TextField, Radio } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import clsx from 'clsx';
import OutsideClickHandler from 'react-outside-click-handler';
import Text from 'components/core/Text'

import { grey, blueGrey } from '@material-ui/core/colors';

//API
import api from 'api';

//util
import { getSession } from 'util/check-auth';

//constants
import endpoints from 'constants/endpoints';
import { color } from 'constants/color';

//context
import { useAppValue } from 'context/app';


const useStyles = makeStyles(theme => ({
   root: {
      position: 'relative',
      marginLeft: 10,

   },
   textField: {
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingBottom: 0,
      marginTop: 0,
      fontWeight: 500
   },
   button: {
      zIndex: -1,
      // border: '1.2px solid lightgray',
      // borderRadius: 20,
      padding: '3px 10px 3px 0px',
      height: 30,
      // minWidth: 120,
      display: 'flex',
      alignItems: 'center',
      // justifyContent: 'flex-start'
   },
   option: {
      position: 'absolute',
      top: 100,
      height: window.innerHeight / 1.25,
      right: window.innerWidth / 7,
      width: window.innerWidth / 7 * 4,
      zIndex: 2,
      padding: 10
   },
   rootMain: {
      position: 'absolute',
      top: -20,
      right: "-160%",
      width: window.innerWidth,
      height: window.innerHeight,
      zIndex: 2,
      padding: 10,
      backgroundColor: "#0807079e"
   },
   text: {
      cursor: 'pointer',
      '&:hover': {
         backgroundColor: 'lightgray'
      },
      marginBottom: 5
   },
   icon: {
      float: 'right',
      fontSize: 18,
      padding: 0
   },
   center: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      margin: "10px 0px"
   },
   textButton: {
      color: color.primary,
      cursor: "pointer", padding: "5px"
   },
   row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
   },
   simpleRow: {
      display: "flex",
      flexDirection: "row"
   }
}));

let radioData = [
   { name: "Choose this list as default", value: "default" },
   { name: "Prompt me when save as favourite each time", value: "ask" },
]


export default function CustomSelect(props) {
   const classes = useStyles();

   // const { options, icon } = props;

   const [state, dispatch] = useAppValue();
   const { openFavList, _1stTimeFavComp, companyListReload } = state

   const [visible, setVisible] = useState(false);
   const [askPopup, setAskPopup] = useState(false);
   const [type, setType] = useState('');
   const [createListShow, setCreateListShow] = useState(false);
   const [listName, setListName] = useState('');
   // const [listData, setListData] = useState({});
   const [renderData, setRenderData] = useState([]);
   const [userData, setUserData] = React.useState({});
   const [activeList, setActiveList] = React.useState('');
   const [changes, setChanges] = React.useState(false);


   const toggle = () => {
      setVisible(!visible);
   }

   const handleCancel = () => {
      setVisible(false);
   }

   React.useEffect(() => {
      async function getUserData() {
         setUserData(getSession("user"))
      }
      getUserData()

   }, []);

   React.useEffect(() => {
      async function getListCount() {
         const CompanyCount = await api().get(`${endpoints.getFavListCount}/${userData.id}`);
         if (CompanyCount.status === 200) {
            // setListData(CompanyCount.data.data)
            setRenderData(CompanyCount.data.mainData)
         }
      }

      getListCount()

   }, [visible, changes, openFavList]);

   const onSelect = (arr, activeIndex) => {
      dispatch({ type: "setUserFavCompFilter", companies: arr });
      setActiveList(activeIndex)
      setVisible(false)
   }

   const handleDeleteList = async (list_id) => {
      await api().post(endpoints.deleteListById, { list_id }).then(res => {
         if (res.status === 200) {
            setChanges(!changes)
            dispatch({ type: "setUserFavCompFilter", companies: [] });
            dispatch({
               type: "resetSelectedTechnologyCompanies",
               companies: [],
               count: 0,
               loading: false
            });
            // dispatch({ type: "setCompanyListReload", condition: !companyListReload })

         }
      })
   }


   const handleSave = async () => {

      // dispatch({ type: "setSelectedDataset", dataset: countryName });
      // setVisible(false);
      if (listName) {
         const response = await api().post(
            endpoints.createList,
            {
               name: listName,
               created_by: userData.id
            }
         );
         if (response.status === 200) {
            setCreateListShow(false)
            setAskPopup(true)
            const CompanyCount = await api().get(`${endpoints.getFavListCount}/${userData.id}`);
            if (CompanyCount.status === 200) {
               // setListData(CompanyCount.data.data)
               setRenderData(CompanyCount.data.mainData)
               setListName('')
            }
         }
      }
   }

   const handleRadioClick = async (event) => {
      if (event.target.value === "default") {
         await api().post(endpoints.setDefaultFavListByLastId, { user_id: getSession("user").id }).then(res => {
            if (res.status === 200) {

            }
         })
      } else await api().post(endpoints.removeDefaultFavList, { user_id: getSession("user").id })
      if (openFavList) {
         await api().post(
            endpoints.addCompToFavList,
            {
               company_name: _1stTimeFavComp,
               user_id: getSession("user").id,
               list_name: renderData[renderData.length - 1].name,
               list_id: renderData[renderData.length - 1].id,
            }
         ).then(res => {
            dispatch({ type: "setOpenFavList", openFavList: false })
            dispatch({ type: "addToFav", condition: true })
            dispatch({ type: "setCompanyListReload", condition: !companyListReload })
            dispatch({
               type: "resetSelectedTechnologyCompanies",
               companies: [],
               count: 0,
               loading: false
            });
         })
      }
      setAskPopup(false)
      setChanges(!changes)
   }

   const defaultOnClick = async (list_id, list_name) => {
      await api().post(endpoints.setDefaultFavList, { list_id, user_id: getSession("user").id }).then(res => {
         if (res.status === 200) {

         }
      })
      if (openFavList) {
         await api().post(
            endpoints.addCompToFavList,
            {
               company_name: _1stTimeFavComp,
               user_id: getSession("user").id,
               list_name: list_name,
               list_id: list_id,
            }
         ).then(res => {
            dispatch({ type: "setOpenFavList", openFavList: false })
            dispatch({ type: "addToFav", condition: true })
            dispatch({ type: "setCompanyListReload", condition: !companyListReload })
            dispatch({
               type: "resetSelectedTechnologyCompanies",
               companies: [],
               count: 0,
               loading: false
            });
         })
      }
      setChanges(!changes)
   }

   // useEffect(() => {
   //     let tempData = Object.keys(listData)
   //     setRenderData(tempData)
   // }, [listData])

   return (
      <OutsideClickHandler onOutsideClick={() => { setVisible(false) }}>
         <div className={classes.root} {...props}>
            <div onClick={toggle}>
               <div className={classes.button} >
                  <Text value="Saved" style={{ cursor: "pointer" }} />
               </div>
            </div>

            {
               (visible || openFavList) &&
               <div className={classes.rootMain}>
                  {/* <Clear
                     onClick={() => {
                        setVisible(false)
                        dispatch({ type: "setOpenFavList", openFavList: false })
                     }}
                     style={{ position: "absolute", cursor: "pointer", top: 25, right: 25, fontSize: 32, color: "antiquewhite" }} /> */}
                  <Paper className={classes.option}>
                     <div className={classes.row} style={{ margin: 5 }}>
                        <div className={classes.simpleRow} style={{ position: "relative" }}>
                           <Text value={"Saved List"} />
                           {/* <Text
                              value={"Deselect List"}
                              style={{ margin: "0px 10px", padding: "2px 5px", cursor: "pointer", color: "white", backgroundColor: "#c223188a", borderRadius: 5 }}
                              onClick={() => {
                                 setActiveList('')
                                 dispatch({ type: "setUserFavCompFilter", companies: [] });
                              }}
                           /> */}
                        </div>
                        <div className={classes.simpleRow} style={{ position: "relative" }}>
                           <Text
                              value={"Deselect List"}
                              style={{
                                 margin: "0px 10px", padding: "10px 5px", cursor: "pointer", color: "black", borderRadius: 5,
                              }}
                              onClick={() => {
                                 setActiveList('')
                                 setVisible(false)
                                 dispatch({ type: "setUserFavCompFilter", companies: [] });
                              }}
                           />
                           <Text value={"Create a list"} onClick={() => setCreateListShow(true)} style={{ padding: "10px 20px", border: "3px solid grey", borderRadius: 15, marginRight: 20 }} />
                        </div>
                        <Clear
                           onClick={() => {
                              setVisible(false)
                              dispatch({ type: "setOpenFavList", openFavList: false })
                           }}
                           style={{ position: "absolute", cursor: "pointer", top: 5, right: 5, fontSize: 26, color: "black" }} />
                     </div>
                     <Divider style={{ height: 3 }} />
                     {/* <div className={classes.simpleRow} style={{ margin: 5, justifyContent: "space-between" }}> */}
                     <div style={{ position: "relative" }}>
                        <div style={{ width: "32%", paddingRight: 32, overflowY: "scroll", height: window.innerHeight * 0.7 }}>
                           {!renderData.length ?
                              <div className={classes.simpleRow}>
                                 <Text value={"Nothing saved yet."} style={{ fontSize: 10, whiteSpace: "nowrap", padding: 20 }} />
                                 {/* {true &&
                                    <Text value={"Please create a list to save selected companies "} style={{ color: "#3e98c7", fontSize: 10, whiteSpace: "nowrap" }} />
                                 } */}
                              </div>
                              :
                              (
                                 renderData.map((data, index) =>
                                    <div
                                       style={{
                                          padding: 10,
                                          width: "100%",
                                          boxShadow: "5px 5px 5px 0px #ccc",
                                          position: "relative",
                                          margin: "10px 0px",
                                          // cursor: "pointer",
                                          border: activeList === index ? "1px solid #0080ff" : "0.5px solid lightgrey"
                                       }}>
                                       <div className={classes.simpleRow}
                                          style={{ padding: 5, cursor: "pointer" }}
                                          onClick={() => onSelect(data.favCompList, index)}>

                                          <i class="fa fa-list" style={{ paddingRight: 8 }} />
                                          <Text value={data.name} />

                                       </div>
                                       <div className={classes.simpleRow} style={{ position: "absolute", top: 5, right: 5 }}>
                                          {/* <Text value="D"
                                             onClick={() => defaultOnClick(data.id, data.name)}
                                             style={{
                                                fontSize: 16,
                                                fontWeight: 600,
                                                border: `0.5px solid ${blueGrey[900]}`,
                                                borderRadius: "50%",
                                                color: data.default ? "white" : "black",
                                                backgroundColor: data.default ? blueGrey[900] : "lightgrey",
                                                padding: "3px 9px"
                                             }} /> */}
                                          <i class="fa fa-tag"
                                             onClick={() => defaultOnClick(data.id, data.name)}
                                             style={{
                                                fontSize: 16,
                                                fontWeight: 600,
                                                // border: `0.5px solid ${blueGrey[900]}`,
                                                // borderRadius: "50%",
                                                color: data.default ? "black" : "lightgrey",
                                                // backgroundColor: data.default ? blueGrey[900] : "lightgrey",
                                                padding: 5,
                                                cursor: "pointer"
                                             }} />
                                          <Clear style={{ marginLeft: 10, cursor: "pointer" }} onClick={() => handleDeleteList(data.id)} />
                                       </div>
                                       <Divider style={{ height: 2 }} />
                                       {data.count ?
                                          <div className={classes.simpleRow} style={{ cursor: "pointer" }} onClick={() => onSelect(data.favCompList, index)}>
                                             <Text value={data.count} style={{ padding: "8px 1px 8px 30px", fontSize: 13, fontWeight: 600 }} />
                                             <Text value={`in the list`} style={{ padding: "8px 30px 8px 1px" }} />
                                          </div>
                                          :
                                          <Text value="Nothing saved yet" style={{ padding: "8px 30px", whiteSpace: "nowrap", padding: 20 }} />
                                       }
                                    </div>
                                 )
                              )
                           }
                        </div>
                        {createListShow &&
                           <div style={{ position: "absolute", top: 10, left: "66%", width: "100%" }}>
                              <div style={{
                                 width: "33%", position: "relative", boxShadow: "5px 5px 5px 0px #ccc",
                                 border: "1px solid #aaa",
                              }}>
                                 <Clear onClick={() => {
                                    setCreateListShow(false)
                                    setListName('')
                                 }} style={{ position: "absolute", cursor: "pointer", top: 10, left: 5 }} />
                                 <Text value={"Create a list"} style={{ textAlign: "center", padding: 10 }} />
                                 <Divider style={{ height: 2 }} />
                                 <div style={{ padding: 16 }}>
                                    <TextField
                                       inputProps={{
                                          style: {
                                             padding: 9, fontSize: 11
                                          }
                                       }}
                                       placeholder="Provide List Name"
                                       style={{ padding: 2 }}
                                       value={listName}
                                       fullWidth
                                       variant="outlined"
                                       onChange={e => setListName(e.target.value)}
                                    />
                                 </div>
                                 <Divider style={{ height: 2 }} />
                                 <div className={classes.row} style={{ margin: 10 }}>
                                    <Text value={"Cancel"} onClick={() => {
                                       setCreateListShow(false)
                                       setListName('')
                                    }} style={{ cursor: "pointer" }} />
                                    <Text value={"Save"} onClick={handleSave} style={{ cursor: "pointer" }} />
                                 </div>
                              </div>
                           </div>
                        }

                        {askPopup &&
                           <div style={{
                              padding: 10,
                              width: "50%",
                              boxShadow: "5px 5px 5px 0px #ccc",
                              borderRadius: 10,
                              backgroundColor: "#ced4db99",
                              position: "absolute",
                              top: "40%",
                              left: "36%"
                           }}>
                              <Text value="Select One" style={{ paddingLeft: 20 }} />
                              <Divider style={{ height: 2 }} />
                              <div style={{ padding: 5, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                 {
                                    radioData.map(y => (
                                       <div className={classes.simpleRow}>
                                          <Radio
                                             checked={type === y.value}
                                             onChange={handleRadioClick}
                                             value={y.value}
                                             name="radio"
                                             style={{ color: '#3c8dbc', marginTop: '-9px' }}
                                          />
                                          <Text value={y.name} style={{ fontSize: '12px' }} />
                                       </div>
                                    ))
                                 }
                              </div>
                           </div>}

                     </div>
                  </Paper>
               </div>
            }
         </div>
      </OutsideClickHandler >
   );
}

CustomSelect.defaultProps = {
   options: [],
   label: ""
}

CustomSelect.propType = {
   options: PropTypes.array.isRequired,
   icon: PropTypes.node,
   label: PropTypes.string
}
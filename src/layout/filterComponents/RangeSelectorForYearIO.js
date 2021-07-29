import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Paper,
  ButtonBase,
  Typography,
  Popper,
  Select,
  TextField,
  Button,
  Divider,
  Tooltip,
} from "@material-ui/core";
import { Check, Search, Close } from "@material-ui/icons";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
// import clsx from 'clsx';
import OutsideClickHandler from "react-outside-click-handler";
import Text from "components/core/Text";

import SearchBar from "material-ui-search-bar";

//API
import api from "api";

//constants
import endpoints from "constants/endpoints";

//context
import { useAppValue } from "context/app";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 6,
    boxShadow: "5px 5px 5px 0px #ccc",
  },
}));

export default function RangeSelector(props) {
  const classes = useStyles();

  const {
    index,
    value,
    deleteRange,
    setValues,
    keyValue,
    setMainData,
    allData,
    allRangeValue,
  } = props;

  const [state, dispatch] = useAppValue();
  const {
    selectedDataset,
    selectedFilename,
    userFavCompFilter,
    userProductServiceFilter,
    userDigitalEngagementFilter,
    yearIORangeFilter,
    userSubPartner,
    userPartner,
    totalCountries,
    userCompanyExpertiseFilter,
    userCategoryFilter,
    userEmpSizeFilter,
    userCompanyFilter,
    companyUploadFilter3,
  } = state;

  const [loading, setLoading] = useState(false);
  const [min, setMin] = useState(value.min);
  const [max, setMax] = useState(value.max);
  const [selectValue, setSelect] = useState(value.selectValue);
  const [totalCount, setTotalCount] = useState(0);
  const [yearMax, setYearMax] = useState();

  useEffect(() => {
    setValues(index, min, max, selectValue, keyValue);
  }, [min, max, selectValue]);

  // useEffect(() => {
  //   async function getMaxYearIO() {
  //     const response = await api().post(endpoints.getMaxYearIO);
  //     if (response.status === 200) {
  //       const { data } = response.data;
  //       setYearMax(data);
  //     }
  //   }

  //   async function getYearIOByRange() {
  //     const response = await api().post(endpoints.getYearIOByRange, {
  //       min,
  //       max,
  //       selectValue,
  //       // user_id: getSession("user").id,
  //       dataset: Array.isArray(selectedDataset)
  //         ? selectedDataset
  //         : totalCountries.countryName,
  //       file_name: selectedFilename,
  //       expertiseCompanyFilter: userCompanyExpertiseFilter,
  //       categoryFilter: userCategoryFilter,
  //       empSizeFilter: userEmpSizeFilter,
  //       digitalEngagementFilter: userDigitalEngagementFilter,
  //       productServiceFilter: userProductServiceFilter,
  //       companyFilter: userCompanyFilter,
  //       partnerFilter: [...userSubPartner, ...userPartner],
  //       userFavCompFilter: userFavCompFilter,
  //     });
  //     if (response.status === 200) {
  //       setLoading(false);
  //       const { data } = response.data;
  //       setTotalCount(data);
  //     }
  //   }

  //   getMaxYearIO();
  //   getYearIOByRange();
  // }, []);

  const getCount = async () => {
    // setLoading(true);
    // const response = await api().post(endpoints.getYearIOByRange, {
    //   min,
    //   max,
    //   selectValue,
    //   // user_id: getSession("user").id,
    //   dataset: Array.isArray(selectedDataset)
    //     ? selectedDataset
    //     : totalCountries.countryName,
    //   file_name: selectedFilename,
    //   expertiseCompanyFilter: userCompanyExpertiseFilter,
    //   categoryFilter: userCategoryFilter,
    //   empSizeFilter: userEmpSizeFilter,
    //   digitalEngagementFilter: userDigitalEngagementFilter,
    //   productServiceFilter: userProductServiceFilter,
    //   companyFilter: userCompanyFilter,
    //   partnerFilter: [...userSubPartner, ...userPartner],
    //   userFavCompFilter: userFavCompFilter,
    // });
    // if (response.status === 200) {
    //   setLoading(false);
    //   const { data } = response.data;
    //   setTotalCount(data);
    // }
    // const response2 = await api().post(endpoints.getTotalYearInOperation, {
    //   dataset: Array.isArray(selectedDataset)
    //     ? selectedDataset
    //     : totalCountries.countryName,
    //   file_name: selectedFilename,
    //   expertiseCompanyFilter: userCompanyExpertiseFilter,
    //   categoryFilter: userCategoryFilter,
    //   empSizeFilter: userEmpSizeFilter,
    //   yearIOFilter: yearIORangeFilter,
    //   digitalEngagementFilter: userDigitalEngagementFilter,
    //   productServiceFilter: userProductServiceFilter,
    //   companyFilter: userCompanyFilter,
    //   partnerFilter: [...userSubPartner, ...userPartner],
    //   userFavCompFilter: userFavCompFilter,
    // });
    // if (response2.status === 200) {
    //   const { data } = response2.data;
    //   setMainData(data);
    // }
    let count = 0;
    setLoading(true);
    for (let row of allData) {
      let value = row["Years in Operation"];
      if (value) {
        value = parseInt(value);
        if (selectValue == "<" && value < max) count++;
        else if (selectValue == ">" && min < value) count++;
        else if (value >= min && value <= max) count++;
      }
    }
    // console.log("count", count);
    setLoading(false);
    setTotalCount(count);

    // console.log("values", min, selectValue, max);
    // console.log("allData", allData.length);
    // let temp = companyUploadFilter3.emp_size ? [...companyUploadFilter3.emp_size, { min, selectValue, max }] : [{ min, selectValue, max }]
    // dispatch({ type: "setCompanyUploadFilter3", filter: { emp_size: temp } });
    // dispatch({
    //   type: "setCompanyUploadFilter3",
    //   filter: { yearIO: allRangeValue },
    // });
  };
  // useEffect(() => {
  //   if (max) getCount();
  // }, [max]);

  return (
    <div
      className={classes.root}
      key={keyValue}
      //  key={Math.random().toString(36).substr(2, 16)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: 15,
        }}
      >
        {value.selectValue === ">" || value.selectValue === "-" ? (
          <TextField
            inputProps={{ style: { padding: 6, fontSize: 11 } }}
            placeholder="Enter #"
            style={{ padding: 2, width: 60 }}
            value={value.min}
            fullWidth
            variant="outlined"
            onChange={(e) => setMin(e.target.value)}
          />
        ) : (
          <Text style={{ width: 60 }} value="" />
        )}

        <Select
          disableUnderline
          style={{
            border: "1px solid lightgrey",
            borderRadius: 5,
            padding: "0px 15px",
          }}
          inputProps={{
            style: {
              padding: 4,
              fontSize: 15,
              id: "select-native-simple",
            },
          }}
          native
          value={value.selectValue}
          onChange={(e) => setSelect(e.target.value)}
        >
          <option value={"-"}> - </option>
          <option value={"<"}> {"<"} </option>
          <option value={">"}> {">"} </option>
        </Select>

        {value.selectValue === "<" || value.selectValue === "-" ? (
          <Tooltip title="hello">
            <TextField
              inputProps={{ style: { padding: 6, fontSize: 11 } }}
              placeholder="Enter #"
              style={{ padding: 2, width: 60 }}
              value={value.max}
              fullWidth
              variant="outlined"
              onChange={(e) => setMax(e.target.value)}
              // helperText={`Max is ${yearMax} years`}
            />
          </Tooltip>
        ) : (
          <Text style={{ width: 60 }} value="" />
        )}
        {loading ? (
          <i
            style={{ color: "white", marginLeft: "5px" }}
            class="fas fa-spinner fa-pulse"
          />
        ) : (
          <Typography style={{ fontSize: 12, width: 30 }}>
            &nbsp;({totalCount}){" "}
          </Typography>
        )}
      </div>

      <div
        style={{ display: "flex", justifyContent: "space-between", padding: 5 }}
      >
        <Text
          value="Delete"
          style={{ cursor: "pointer" }}
          onClick={() => deleteRange(index)}
        />
        <Text
          value="Update"
          style={{ cursor: "pointer", color: "rgb(0, 128, 255)" }}
          onClick={() => getCount()}
        />
      </div>
    </div>
  );
}

RangeSelector.defaultProps = {
  options: [],
  label: "",
};

RangeSelector.propType = {
  key: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  icon: PropTypes.node,
  label: PropTypes.string,
};

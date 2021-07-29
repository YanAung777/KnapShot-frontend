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
}));

export default function CustomSelect({
  setSelectedValue,
  selectedValue,
  index,
  component,
}) {
  const classes = useStyles();

  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const [data, setData] = useState({});

  let list = [
    "Startup",
    "Chamber / Associations",
    "Directory",
    "Manufacturer",
    "Wholesaler",
    "Distributor / Reseller",
    "Exporter",
    "Service Provider",
    "Retailer",
  ];

  let city = [
    "Jakarta",
    "Yogyakarta",
    "Balikpapan",
    "Cimahi",
    "Depok",
    "Bandung",
    "Tangerang",
    "Cirebon",
    "Malnag",
    "Bekasi",
  ];

  let country = [
    "Indonesia",
    "Myanmar",
    "Vietnam",
    "South Korea",
    "Japan",
    "Malaysia",
    "Spain",
    "Singapore",
    "Philippines",
    "United Kingdom",
    "Thailand",
    "New Zealand",
    "China",
    "UAE",
    "Australia",
  ];

  let dataObj = {
    Startup: {
      Startup: [
        "A startup is a company in the first stage of its operations",
        "often being financed by its entrepreneurial founders during the initial starting period.",
        "Typically less than 3 years in operation.",
      ],
      "How to classify": [
        "Look under about us / company profile/ business description ( in the website ) for the word startup",
      ],
    },
    "Chamber / Associations": {
      Chamber: [
        "A chamber is an association of business leaders that allows mutual promotion and protection of the interests of their businesses",
        "whether that be a small restaurant or a used bookstore.",
      ],
      "": [
        "These are frequently seen in individual towns and communities",
        "but there are also state and national chapters that can be accessed.",
        " A good chamber of commerce helps businesses band together and come up with ways to better market their products and services.",
        "They form a collective to address important concerns and issues for the business community.",
      ],
      "How to classify": [
        'Look under "about us / company profile/ business description" ( in the website ) ',
        'for the keywords like "chamber / Chamber of Commerce"',
      ],
      Associations: [
        "A trade association, or trade group",
        "is put together by businesses operating in specific industry areas. ",
        "These associations provide a place for business leaders to advertise, educate, market, and lobby the government; ",
        "they provide a collaborative environment for like‐minded professionals.",
      ],
      "": [
        "Some associations put a stronger focus on conferences",
        "trade shows, networking events, and fundraisers",
        "as well as continuing education opportunities for its membership",
      ],
      "How to classify": [
        'Look under "about us / company profile/ business description" ( in the website )',
        'for the keywords like "Association "',
      ],
    },
    Directory: {
      Directory: [
        "Directory is a website or printed listing of information which lists businesses within niche based categories.",
        " Businesses can be categorized by niche, location, activity, or size.",
      ],
      "How to classify": [
        'Look under "about us / company profile/ business description" ( in the website ) for the keywords like ',
        '" Directory, Business Directory, Business Listing "',
      ],
    },
    Manufacturer: {
      Manufacture: [
        "A manufacturer is a person or company that produces finished goods from raw materials by using various tools",
        "equipment, and processes, and then sells the goods to consumers, wholesalers",
        " distributors, retailers, or to other manufacturers for the production of more complex goods.",
      ],
      "How to classify": [
        'Look under "about us / company profile/ business description" ( in the website ) for the keywords like ',
        '" manufacturer, producer,made to order/assemble, contract manufacturing, factory, production facilty "',
      ],
    },
    Wholesaler: {
      Wholesaler: [
        "Wholesalers are the merchant middlemen who sell mainly to retailers",
        "other merchants, commercial, industrial, or institutional users. They buy principally for resale or business use.",
      ],
      "How to classify": [
        'Look under "about us / company profile/ business description" ( in the website )',
        ' for the keywords like " wholesaler, wholesale market, stockist "',
      ],
    },
    "Distributor / Reseller": {
      Distributor: [
        "A distributor is an intermediary entity between a the producer of a product and another entity in the distribution channel or supply chain",
        "such as a retailer, a value­added reseller (VAR) or a system integrator (SI).",
        "The distributor performs some of the same functions that a wholesaler does ",
        "but generally takes a more active role.",
      ],
      "": [
        "Distributors also frequently take a more proactive approach in educating resellers about new products",
        " through such activities as presales training, road shows, and demos on behalf of vendors. ",
        "Distributors may provide services around the procurement process, such as contract negotiation",
        " marketing for resellers and SIs, and warrantees.",
      ],
      "How to classify": [
        'Look under "about us / company profile/ business description" ( in the website )',
        'for the keywords like " distributor / supplies / supplier "',
      ],
      Reseller: [
        "a company or individual (merchant) that purchases goods or ",
        "services with the intention of selling them rather than consuming or using them. ",
        "This is usually done for profit (but could be resold at a loss)",
      ],
      "How to classify": [
        'Look under "about us / company profile/ business description" ( in the website ) ',
        'for the keywords like " agent, specific brand ‐ representative or dealer "',
      ],
    },
    Exporter: {
      Exporter: [
        "An exporter is someone who sends goods out of a country to be sold. ",
        "If you are in the import/export business, you bring goods from abroad into the country as well.",
      ],
      "How to classify": [
        'Look under "about us / company profile/ business description" ( in the website ) ',
        'for the keywords like " exporter / export order / international shipping / overseas shipping "',
      ],
    },
    "Service Provider": {
      "Service Provider": [
        "A service provider is a company that provides organizations with consulting, legal, real estate",
        "education, communications, storage, processing, and many other services.",
        "Although the term service provider can refer to organizational sub‐units",
        "it is more generally used to refer to third party or outsourced suppliers",
        "including telecommunications service providers, application service providers",
        "storage service providers, and Internet service providers.",
      ],
      "How to classify": [
        'Look under "about us / company profile/ business description" ( in the website )',
        ' for the keywords like " xxxxxxxx Services , professional services, service provider',
      ],
    },
    Retailer: {
      Retailer: [
        "A person or business that sells goods to the public in stores and ",
        "on the internet, mostly in relatively small quantities for use or ",
        "consumption rather than for resale. Retailer buys products",
        "from a manufacturer or wholesaler and sells them to end users or customers. ",
        "In a sense, a retailer is an intermediary or ",
        "middleman that customers use to get products from the manufacturers.",
      ],
      "How to classify": [
        'Look under "about us / company profile/ business description" ( in the website ) ',
        'for the keywords like " retailer, store location, promotion, sale".',
      ],
    },
  };

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
    if (value) setSelectedValue(value, index);
    // console.log("selectedValue", selectedValue);
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
          style={{ display: "flex", flexDirection: "row", width: "100px" }}
        >
          <Grid item xs={11}>
            <Text
              value={selectedValue}
              style={{
                fontSize: "10px",
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
            style={{ width: 205, marginLeft: "-48px" }}
          >
            <Text
              style={{ fontWeight: 700, marginBottom: 10 }}
              value="Can Select One"
            />
            {component.id == 3 &&
              list.map((option) => (
                <div
                  style={{ display: "flex", flexDirection: "row" }}
                  className={classes.text}
                  onClick={() => {
                    onClick(option, !selectedValue.includes(option));
                    setVisible(false);
                  }}
                  onMouseOver={() => {
                    setVisible2(true);
                    setData(dataObj[option]);
                  }}
                  onMouseLeave={() => setVisible2(false)}
                >
                  <div style={{ width: 20 }}>
                    {selectedValue === option && (
                      <Check className={classes.icon} />
                    )}
                  </div>
                  <Text value={option} />
                </div>
              ))}

            {component.id == 2 &&
              city.map((option) => (
                <div
                  style={{ display: "flex", flexDirection: "row" }}
                  className={classes.text}
                  onClick={() => {
                    onClick(option);
                    setVisible(false);
                  }}
                >
                  <div style={{ width: 20 }}>
                    {selectedValue === option && (
                      <Check className={classes.icon} />
                    )}
                  </div>
                  <Text value={option} />
                </div>
              ))}
            {component.id == 1 &&
              country.map((option) => (
                <div
                  style={{ display: "flex", flexDirection: "row" }}
                  className={classes.text}
                  onClick={() => {
                    onClick(option);
                    setVisible(false);
                  }}
                >
                  <div style={{ width: 20 }}>
                    {selectedValue === option && (
                      <Check className={classes.icon} />
                    )}
                  </div>
                  <Text value={option} />
                </div>
              ))}
          </Paper>
        )}
        {visible2 && (
          <Paper className={classes.visible2} elevation={3}>
            {data &&
              Object.keys(data).map((x) => {
                return (
                  <div>
                    <Text
                      value={x}
                      style={{ marginTop: 30, fontWeight: 700 }}
                    />
                    {data[x].map((child) => (
                      <Text style={{ minWidth: 300 }} value={`  - ${child}`} />
                    ))}
                  </div>
                );
              })}
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

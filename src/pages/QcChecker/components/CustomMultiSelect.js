import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, ButtonBase, Popover, Grid, Typography, withStyles } from '@material-ui/core';
import Text from 'components/core/Text';
import { Check, ExpandMore } from '@material-ui/icons';
import OutsideClickHandler from 'react-outside-click-handler';
import TextField from '@material-ui/core/TextField';

//constants
import endpoints from 'constants/endpoints';

//route
import { history } from 'router/history';

// api
import api from 'api'

//context
import { useAppValue } from 'context/app';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        cursor: "pointer",
        // marginLeft: 10
    },
    button: {
        zIndex: -1,
        border: '1.2px solid lightgray',
        // borderRadius: 20,
        padding: '3px 10px',
        height: 30,
        // minWidth: 320, //120
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    option: {
        position: 'absolute',
        // top: 30,
        // width: '110%',
        zIndex: 2,
        padding: 10,
    },
    visible2: {
        position: 'absolute',
        zIndex: 2,
        padding: 10,
        left: 235,
        minWidth: 250
    },
    text: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'lightgrey'
        },
        marginBottom: 5
    },
    icon: {
        // float: 'right',
        fontSize: 14,
        color: "#555",
        padding: 0
    },
    paper: {
        position: 'absolute',
        width: '570px',
        padding: '0px 35px 0px',
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 0),
    },
    buttonBase: {
        height: 20,
        minWidth: 100,
        display: 'flex',
        fontSize: '13px',
        cursor: 'pointer',
        borderRadius: 20,
        backgroundColor: '#c7cfdc'
    },
    gridItem: {
        height: '50px',
        display: 'flex',
        alignItems: 'flex-start',
        paddingLeft: '15px',
        flexDirection: 'column'
    },
    labelGridItem: {
        height: '50px',
        textAlign: 'right',
        paddingRight: '15px',
    },
    textbox: {
        '& .MuiOutlinedInput-input': {
            padding: '2px 10px',
            fontSize: '12px',
            height: '20px'
        },
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 250,
        },
    },
    formControl: {
        '& .MuiInputBase-formControl': {
            width: '250px',
            height: '25px',
            fontSize: '12px'
        },
        margin: theme.spacing(1),
        minWidth: 120,
        fontSize: '12px'
    },
}));

export default function CustomSelect({setSelectedValue,selectedValue}) {
    const classes = useStyles();


    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);

    
    const [data, setData] = useState({});

    let list = ['Art,Entertainment and Media', 'Advertising and Marketing Services', 'Beauty Products, Cosmetics and Perfume', 'Building Supply, Hardware and DIY', 'Consumer Electronics', 'Clothes, Bags and Shoes', 'Construction (Services and Equipment)', 'Creatives (Design )', 'Chemical,Metal,Minerals,Natural Resources', 'Delivery, packing and Logistic', 'Engineering and Technical Services', 'Education and Training Services', 'Food and Beverages', 'Finance and Insurance', 'Household, Furnishing and Appliance', 'Home and Personal Services', 'Healthcare', 'ICT (Hardware,System and Services)', 'Industrial (Products and Services)', 'Jewellery, Watch and Accessories', 'Property and Real Estate', 'Professional Services', 'Mining and Quarrying', 'Software, Ecommerce and Gaming', 'Travel and Tourism', 'Water and Waste Management']

    let dataObj = {
        'Art,Entertainment and Media': {
            'Arts': ['Painting ( conceptual art, computer art etc )', 'Handicrafts ( Coconut shell, copper brass crafts,pottery, sculpture,craving)', 'arts and crafts ( equipment & products)', 'Museum, Gallery, Cultural centers'],
            'Entertainment': ['leisure activities ( cycling, water rafting, surfing,Karting, skating)', 'sports and recreational (facilities, clubs)', 'Dance / Yoga Studio', 'performing arts (cultural show, wayang puppet show)', 'live entertainment, Parades'],
            'Media (Film and Music related )': ['concert organiser', 'artists, musicians, Singers, film directors', 'movie/commercial production/producers', 'recoding/motion graphic/Music  Studio', '3D animation, VR production'],
        },
        'Advertising and Marketing Services': {
            'Tyically advertising agencies offering': [
                '-advertising services across different media (TV/Radio/Outdoor/Print)', '- digital advertising ( google advertising, FB advertiisng)', '- Advertising technology/platform', '- Branding, communications, public relation', '- Content creation', 'development'
            ]
        },
        'Beauty Products, Cosmetics and Perfume': {
            'Beauty Products, Cosmetics and Perfume': ['Hair care ( Shampoo, Blush, Conditioner, hair styling)', 'Body Care ( Dedorant, Body Poweder)', 'Face Care ( Face mask, eye cream )', 'Dental Care ( Tooth brush, Toothpaste )', 'Cosmetics ( make up, eye shadow )']
        },
        'Building Supply, Hardware and DIY': {
            'Building Supply, Hardware and DIY': ['Hardware and Equipment (screw, nuts, fasterners, power drill, saftey equipment, sanitary ware, elevators, cutlery tools)', 'Building Material ( marbles, ceramic tiles, bricks,BRC fencing, aluminum extrusion, wire mesh )']
        },
        'Consumer Electronics': {
            'Consumer Electronics': [' Camera, video equipment, CCTV and Accessories', ' Audio & Visual equipment', 'computer/laptop/Monitors/Printer/Speaker  assembles and accessories', 'games and gaming accessoires ( consoles and controllers)', 'Mobile phone / Tablet and accessories', ' Netwworking and Wireless ( wireless routers, wifi extender )']
        },
        'Clothes, Bags and Shoes': {
            'Cloths': ['Fashion / Local fashion brands and Apparels', 'Tops, Bottoms, Outer, Winter Wear', 'sports/ Active', 'Inner wear / under garment', 'Sarongs and Batik'],
            'Bags': ['Backpack, Fashion Bags, Hand/Shoulder Bags', 'Travellng Bags & Luggages', 'Luxury nad Branded Bags'],
            'Shoes': ['Flip Flops, Slippers, Sandals', 'Casual Shoes', 'Formal Shoes', 'Shoe accessories']
        },
        'Construction (Services and Equipment)': {
            'Construction Equipment': ['Construction Plants and Machinery ( Crane, Concerte Plant, excavators,trailers )', 'Building equipment  (electric hoist, scaffolding )'],
            'Construction Services': ['Building Design', 'Building and Maintenace Services', 'Road / Building / Environmental / non residential/Industrial park/offshore/Port  Construction', ' electrical / General engineering works', 'Façade engineering', 'Drainage and Plumbing']
        },
        'Creatives (Design )': {
            'Creative ( Design ) - anything Design related': ['Architecture, Building design', ' Costume/brochure/book/exhibits/Funiture/Graphic/Home/Interior/Kitchen/Product/ Lighting/Name card/Multimedia/Packaging/Stage/Web/App    Design']
        },
        'Chemical,Metal,Minerals,Natural Resources': {
            'Chemical Material ( mining products )': ['additives', 'Borate, Magnesium,', 'Pharamceutical Raw Material, Silicones, Soap Raw material, Resins'],
            'Metal Material ( mining products )': ['aluminium, Nickel, silver, copper, alloy steel,brass', 'base metal, precious metal extraction', 'Metal / Copper/ Iron/ Metalliferous Ore'],
            'Mineral and Natural Resource ( mining products )': ['Coal, Bituminos Coal', 'Crude Oil, Palm Oil', 'Sand, Limestone, Granite,Gravel, Diamond', 'Heavy/ Non metallic   Minierals, Limestone']
        },
        'Delivery, packing and Logistic': {
            'Delivery': ['Air Freight, Air shipping, Air Cargo, air and sea transport', 'Courier, courier and shipping, express delivery', 'Shipping, containerization, Cargo shipoing, Cargo agent, inter-island shipping', 'Freight forwarder, freight forwarding Agents, Frieght ship transportation,Marine Shipping', 'Rail freight/ Trucking'],
            'Logistics': ['Shipping and Logistics, e-commerce logistic, third party logistic (TPL)', 'Warehouse, Storage,warehousing, cold storage', 'Fulfilment center, Distribution Center,order processing', 'Warehousing tools/equipment, material handling & storage system', 'inventory / Supply Chain  Planning and management']
        },
        'Engineering and Technical Services': {
            'Engineering Services': ['Electrical/Mechnical/ electrical & mechanical/ Material/ Structural/ Soil/ Road Traffic/Energy/Automation/Industrial -  Engineering, Engineering contractors', 'HVAC Engineering Support', 'Engineering and Design, Design and Engineering, engineering consultancy', 'Power Plant Maintenance, Boiler Mainenance work', 'Fabrication work'],
            'Technical Services': ['Lab calibration and testing', 'Research and Development  (R&D)', 'CAD Modelling and design', 'Thermal Analysis']
        },
        'Education and Training Services': {
            'Education': ['Schools, college, polytechnic, university, Distant learning, learning centers', 'Enrichment classes, tuition centers, tutors', 'education material producer/publisher, text book, assessment book'],
            'Training': ['Language/Leadership/Health & Saftety/HR/Compliance/Safety/Quality  - Training, train the trainer, Training Academy, Training centers', 'Coaching, personal/professional development', 'Skill accreditation and Training', 'training or learning portal or App']
        },
        'Food and Beverages': {
            'Food': ['Agricultural products', 'fast/Fresh/Frozen/Daily/Canned/Prepared/Ready to eat/Dried/Baked/Convenient/Halal Certified  - Food', 'Cooking Oil, Grains, Nuts, seasonging, spreads ( eg.rice, noolde, pasta, magarine )', 'Meat and Seafood, Poultry, fruits and vegetables', 'Restaurent, Café, Food catering/ stall/ Shop/ outlet/court,Grocery Store/supermarket', 'Health supplement, herbal products, Organic Food'],
            'Beverages': ['Alocoholic, Non Aloholic drinks, Milk, Yogurt', 'Hot/ Cold Beverages', 'Packet/Bottle/Canned/Energy/Flavoured Drinks', 'café, Bars, Breweries,Cocktail Lounge']
        },
        'Finance and Insurance': {
            'Finance': ['Banking ( national bank, foreign bank, private bank, public bank ), commercial/investment/merchant/Offshore -  banking', 'Portfolio/Wealth/Asset / Mutual Fund - Management', 'financial advisory, financial advisors', 'Financing, Micro Finance, Leasing, Lending, debt/trade/working capital -  financing', 'Brokerage, Future/Stock/Forex - Broker', 'Finance Technology (Fintech), Blockchain, Cryto currency', 'priviate equity (PE) Investment, Venture Capital'],
            'Insurance': ['General/life/Car/Motor/Marine/Health/Casualty/credit/Cargo/Fire/Islamic/personal accident/Property/Travel/Home-  Insurance', 'Reinsurrance', 'Insurance Broker/Agent/Marketplace']
        },
        'Household, Furnishing and Appliance': {
            'Household Furnishing': ['Home/Kitchen/Garden Needs', 'Bed/Dinning/Living room/Kitchen/Outdoor- Furniture', 'Textile, Fabric, curtain, sewing thread,mats, carpets, sofa cushions', 'Home/Wall/glass - decoration', 'Kitchen storage/Accessories, Cooking/Kitchen- ware', 'Cleaning Care, Toilet/Glass/Floor -  cleaner, Washing Supplie'],
            'Household Appliance': ['refrigerator, washing machine, water heater, gas/electric stove, oven', 'Microwave, Fryers, Juicer, Blender, coffee/bread/snadwich- Maker,rice cooker, steamer, toaster,vacumm cleaner, sewing machine', 'air conditioning, Fan, air purifer']
        },
        'Home and Personal Services': {
            'Home/House Services': ['Aircon/Household Appliance - repair and servicing, Handyman,Repair Man, Plumber, Plumbling', 'Electrical/Fan/CCTV/Home Entertainment/lights - Installation', 'Carpet/House - Cleaning, Housekeeper, Laundry, dry cleaning, sofa washing', 'Interior designer, Locksmith', 'Nanny, Childcare, House/Pet/baby - sitting', 'Movers, moving house, packing, Painter, Painting'],
            'Personal Services': ['Barber, haircut, Hair/Beauty salon, Hair Stylist', 'car valet, personal - driver/chef/concierge/grooming/shopper/Trainer', 'Childer Party/Wedding/Event - Planner', 'Computer/tablet/Mobile Phone/Shoe - RTCIceCandidatePairChangedEvent', 'errand runner, escort services', 'Fitness/Grooming /Personal development  - Coach', 'makeup artist, mobile beautician, mobile -mechanic/car wash', 'tailor/Massage/translator/Private Investigator/Yoga Instructor Copy writer/Proof Reading/Graphic designer/Photographer/']
        },
        'Healthcare': {
            'Healthcare ( Products/Hardware/Equipment )': ['Medical/surgical - instrument/devices/equipment, Dental equipment', 'Prescription Drugs, Supplements, Vitamins, natural hermorrhoid medication,  Generic Drugs, Cold Medicine, Homeopaths', 'Pharmaceuticals Product,Human/Animal/Bio -  Pharma Herbal - Drug/medicines/formula/products', 'Wound care products', 'Health necklace, pellet', 'Stimulation/green tea - Oil'],
            'Healthcare ( Services )': ['Clinics, Hospital, medical centers, Blood/Organ Bank, Drug stores, Over the counter Drug Store,Pharmacy, C Herbal shop/store, Chinese Medical store, Medical and Diagnostic Laboratory, Outpatient/Palliative - care center', 'Elder Care, Home/Mental - health care', 'Dermatologist, Chiropractors,Dieticians,  Nutritionists, Optometrists Healthcare- Consultants/Professionals,Physical Therapist, Psychologists', 'Telehealth, Mobile Health, mhealth, healthtech, wearable technology', 'Digital/Retinal/Mental - Health']
        },
        'ICT (Hardware,System and Services)': {
            'Info Communication Technology (ICT)/IT -  hardware and System': ['Base station, Statellite Communications', 'data/voice - communication equipment, routers, ethernet switches, IT/Network/Infrastructure/Telecoomunication/Survelliance - hardware/equipment/infrastructure', 'telecom Power system, UPS', 'LAN/WAN/Network connectivity', 'digital transmitter, servers, -  wireless/system -  devices, network cameras Network video recorders, Access Controls, ATM, Koisks', 'Solution for - IT infrastructre/IT Services/Smart Building/Smart City IOT (internet of thing) for Enterprise, Industrial Hybrid Computing/Private Storage Cloud/ Storage/Server Clustering Data Protection, Data Backup, Data Integration, Data Visualisation, ETL,Data Platform Server Visualization/Management and Automation/ Email/Authentication/', 'Datacenter, datacenter- SDN/Switching, Hosting', 'Cloud - Hosted Private/Hybrid/Public', 'Switching/ Radar/Routing/wireless - Technology', 'Security/Web Application firewall, Intrusion Protection System, Web/Mail- Security, Identity Management,wirelss security system', 'Tools for Monitoring and Management', 'System for  Travel Managemet, POS Network, Hospitality, Retail'],
            'Info Communication Technology (ICT)/IT -  Services': ['Broadband/Statelite Communiction Services, Telecommunication/Telecom', 'Cloud Based/Cloud computing Services', 'Business Automation services', 'Information/ Cyber - Security Services', 'Content delivery / Management', 'Infrastructure/Platform/Desktop/Unified Communication/ - as a service', 'Managed/Outsourced -  IT Services', 'VOIP Services, Video Conferencing services']
        },
        'Industrial (Products and Services)': {
            'Industrial Products': ['industrial textile, fiberglass fabric, nonwoven soft cloth roll', 'Glass - Toughened glass, Designer Glass, Glass Partition, Window Glass', 'Paper, Paper Products, Paper Pulp, Labelstock Paper, Carbonless Paper', 'Pipes/Hose, rolled pipes, Hose Pipes, Pipes Fittings,ruber Hoses,Industrial hose', 'Machinery/Equipment for Ventilating, steel mill related, Precision, refrigeration, Lubrication, Drilling', 'consumables for Welding', 'Pumps - water pump,industrial Pump, submersible pump', 'Components - Plastic Components', 'Panels and sheets- PVC Panel, Composite Panel,Mica Sheet, Rubber sheets, Polycarbonate sheet', 'Oils - Automotive oil, Lubricating Oil, Greese, Lubricants', 'Insulators- Electrical insulators, insulation tape', 'Filters - Air Filter, oil filter, industrial filters, Carbon filter, Filtration System', 'Fans / Ventilators - Air ventilators, Ventilation Fans, Industrial Dryers, Air Dryers Industrail Coolers, Industrial Blowers', 'Racks - Server Rack, Networking Rack, Slotted Angle Racks, Industrail Storage rack', 'Valves - Ball valves, Control Valves, Industrail valves', 'Nails, Riverts, Fasteners, Ball Bearings', 'Motors - DC motor, Geared Motor, Water pump motors', 'Adhesives - Synthetic Adhesives, Industrial Adhesives'],
            'Industrial Services': ['metal pipeworks, metalwork fabrication, metal working']
        },
        'Jewellery, Watch and Accessories': {
            'Jewellery and Accessories': ['Bridal Jewellery, Fashion Jewellery, Handmade Jewellery, Antique Jewellery', 'Gold Jewellery, Silver Jewellery'],
            'Watch and Accessories': ['Mens watch,Womens watch','Fashion Watch, Luxury Watch, Branded Watch, Vintage Watch','Watch Winder, Watch Travel case, Watch Strap, eatch Accessories']
        },
        'Property and Real Estate': {
            'Property and Real Estate Type': ['Commercial Real Estate, Residential Real Estate, Industrial spaces, Home and Retirement, Commercial Land, Overseas Property, Soho', 'Beachfront Property, Villas'],
            'Property and Real Estate Services': ['Management - Full Integrated property services, Facility and Asset management, development management, estate management, Property Management, retail management, property development and management, Property Services, real estate services', 'Auction - Property Auctions', 'Advisory,Inspection, Appraisal Services- Property Advisors, Property Appraisal, Buildng inspector', 'Buy/Sell Property - Property Agent, Buyer agent, Property Consultancy, Property Sales Agent, Real estate Agents, Real Estate Professionals', 'Property Development -', 'Property Investment -  real estate investment funds, REITS, real estate equity investment', 'Property research and Marketing - Property Analyst, Property Marketing Services, Real estate marketing and consulting', 'Property/Real Estate rental - Villa rental, Apartment for rent, Workspaces, Coworking, Daily Pass, flexi desk', 'Property technology - 3D Property Tour', 'Property Listing', 'Property Brokerage Firm']
        },
        'Professional Services': {
            'Professional Services': ['Accounting and Audit - Book Keeping, Accounting Services, Audting, Corproate tax return filing, Company income tax, financial statement preparation,Tax consulting, taxation and GST compilation, withholdiing tax', 'Company Secretarial- Company registration, Company secretary, adminstration services, Payroll services, registered office, virtual office address', 'Law/Civil & criminal Law/Corproate and Finance/Intellectual Property/ Investment -  Law Firm', 'arbitration, assets recovery, Conveyances, filing and trademark registration, Fraud Investigation, Legal Advise, ligitation, Will writing', 'employment lawyers, Family Lawyers, Criminal Lawyers, Corporate Lawyer, Legal consultant, Legal counsel, Media Lawyer, prosecutor, Public Lawyer, Solicitor', 'HR and Recruitment - Executive Search, employment/ recruiter-agency, headhunting, HR consultancy, staffing Services'],
            'Professional Services': ['Business Support Services - Call Center, telemarketing', 'Quality Assurance - total quality assuranace provider, isnpection and certification services', 'Business management/Consultancy firm - change management consutlant,Business transformation, business consulting, corporate strategy consulting, Cultural Change Consulting, digital strategy consulting, Sector Strategy, HR Consulting, Management Advisory, management consultant, Operation Model, Post merger Integration, Spin off, Strategy Consulting', 'Engineering Consultancy - Environmental Strategy, enginering managment consultancy, IT Consulting', 'Market Research firm - Market Research, Market research consulting']
        },
        'Mining and Quarrying': {
            'Services': ['Gold/Silver/Iron Ore/Copper/Coal/Rare Earth', 'Mining/ Crushing/Drill Rig/Plants Maintenance, Blast Management', 'Mine Planning and Design/Shceduling and Optimisation, Mineral Research/Consulting/Consultants/Feasibility Studies', 'Blasting, Exploration Drilling, Drilling and Blasting, Material Handling/Stockpiling', 'Mineral exploration investment, Mining Venture Capital, Mining Investors'],
            'Hardware, Equipment and Machinery': ['Mining Equipment']
        },
        'Software, Ecommerce and Gaming':{
            'Software':['Business Software - Accounting Software,Ecommerce software, ERP software, Hospital Management Software, Inventory Management Software,  Livechat software, Point of Sale software, Project Management software, real estate software, reporting software, restaurant management software, loyalty system, survey engine, Gift Inventory management, manage membership','Software  Developers/development - Mobile App, Website developers, Application development, IOS App development'],
            'Ecommerce':['Ecommerce platform provider, B2B/B2C- ecommerce platform, , ecommerce consulting, , merchadising platform, omni channel ecommerce platform, social commerce platform','Ecommerce features -  ecommerce store, e-store, webstore, mobile wallet, payment gateway, Self hosted carts','Ecommerce site - consumer to consumer (C2C) ecommerce sites, lifestyle ecommerce site, online mall, online fashion and beauty store, travel online portal','Platform for Agent Management,  automated dropship platform','Marketplace - B2B/B2C/C2C - Marketplace, ecommerce marketplace, property marketplace, vehicle marketplace','ecommerce logistics/Fullfilment Services - Dropshipping, ecommerce fullfilment services','Management Services - ecommerce marketplace management, e-services','Research Services - Ecommerce market research','ecommerce development - ecommerce development, ecommerce enablers, ecommerce integration, ecommerce solution, ecommerce technology'],
            'Gamming':['Arcade Game Development, Game Developer','AR/VR development','E-sports','Game Publishing, Game Publishers','Gametech, Game Technology, Gamification system','Gamified Advertising solution, Gamified learning solution','Online game startup','utility based games, video games']
        },
        'Travel and Tourism':{
            'Travel':['Public / land/ Water/ Air - Transportation -Water Taxis, water Ferries,  ferry, Mini Bus, MRT, Railway, Public Bus, Taxi, Limousine rental, Aircon Coach, Bus Service', 'rental - Bicycle rental, Bus charter, car rental','Takeaway and delviery, Food Delivery'],
            'Accomodation and Hospitality':['Accomdation - backbackers lodge, bed and breakfast, Service Apartment, Boutique guest house, Guest house, Cabins, Camp grounds,  Farm stays, Chalets, Cottages, Holiday Homes, Homestays Accomodation,  Hostel  Hotel, Capsule Hotel, Exotic Hotel, Holiday Parks, Holiday Village, Luxury Lodges, Motel'],
            'Tourism':['Airline booking, Booking agents','Tour - Leisure tour management, countryside and rice field tour, volcano private hike, Destination Management Services, Tour Organiser, Tour company','Parks - Amusemnet park, Adventure Park, Zoo, Miniature Park Scien Park, Theme Park,Botanic Garden']
        },
        'Water and Waste Management':{
            'Processing / Services / Solutions':['Waste/Paper/Plastic Recycling','Waste Treatment/Collection, Acid  Gas Removal, Pollutant Control','Waste Disposal/Landfills','Waste Management Services/Specialist/Systems/Audit','Clean Water Management','Waste Treatment System/Solution/Technology, Desalination System'],
            'Material / Equipment':['Metal/Non Ferrous Scrap','Commercial / Food/ Industrial/Water/Medical/non Toxic/Solid/ Non Hazardous Waste','waste treatment Equipment']
        }   

    }



    const toggle = () => {
        setVisible(!visible);
    }

    const onClick = (value, checked) => {
        // if (onSelectChange) onSelectChange(value)
        let tempArr = [...selectedValue]

        if (checked) tempArr.push(value);
        else tempArr.splice(tempArr.indexOf(value), 1);

        setSelectedValue(tempArr);
        // setVisible2(true);
    }

    return (
        <div style={{ position: "relative" }}>
            <OutsideClickHandler onOutsideClick={() => {
                setVisible(false)
                setVisible2(false)
            }} >
                <Grid container onClick={toggle} style={{ display: "flex", flexDirection: "row", width: "120px" }}>
                    <Grid item xs={11} >
                        <Text value={selectedValue.length>1?selectedValue[0]+"+":selectedValue[0]} style={{fontSize:'10px', overflow: 'hidden', textOverflow: 'ellipsis', width: "100%", whiteSpace: "nowrap" }} />
                    </Grid>
                    <Grid item xs={1}>
                        <ExpandMore />
                    </Grid>
                </Grid>
                {
                    visible &&
                    <Paper className={classes.option} elevation={3} style={{ width: 260 ,marginLeft:'-46px'}} >
                        <Text style={{ fontWeight: 700, marginBottom: 10 }} value="Can Select Multiple" />
                        {
                            list.map(option => (
                                <div
                                    style={{ display: "flex", flexDirection: "row" }}
                                    className={classes.text}
                                    onClick={() => onClick(option, !selectedValue.includes(option))}
                                    onMouseOver={() => {
                                        setVisible2(true)
                                        setData(dataObj[option])
                                    }}
                                    onMouseLeave={() => setVisible2(false)}
                                >
                                    <div style={{ width: 20 }}>
                                        {selectedValue.includes(option) && <Check className={classes.icon} />}
                                    </div>
                                    <Text value={option} />
                                </div>
                            ))
                        }
                    </Paper>
                }
                {
                    visible2 &&
                    <Paper className={classes.visible2} elevation={3}>
                        {
                            data && Object.keys(data).map(x => {
                                return (
                                    <div>
                                        <Text value={x} style={{ marginTop: 30, fontWeight: 700 }} />
                                        {
                                            data[x].map(child => <Text style={{ minWidth: 300 }} value={`  - ${child}`} />)
                                        }
                                    </div>
                                )
                            })
                        }

                    </Paper>
                }
            </OutsideClickHandler>
        </div>
    );
}

CustomSelect.defaultProps = {
    options: [],
    label: "",
    // minWidth : 120
}

CustomSelect.propType = {
    options: PropTypes.array.isRequired,
    icon: PropTypes.node,
    label: PropTypes.string,
    // minWidth : PropTypes.number
}
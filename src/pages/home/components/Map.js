import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

//constants
import { digitals } from 'constants/digitals';
import endpoints from 'constants/endpoints';
import { countries } from 'constants/countries';

//components
import CompanyDetailMap from './CompanyDetailMap';

//context
import { useAppValue } from 'context/app';

//hook
import { useHomeHook } from '../useHomeHook';

//css
import './style.css';


const useStyles = makeStyles(theme => ({
    root: {
        height: window.innerHeight - 200,
        position: 'relative'
    },
    map: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 10
    }
}));

export default function CustomMap(props) {
    const classes = useStyles();
    useHomeHook();

    const [state, dispatch] = useAppValue();

    const { activeIndex } = state.company;

    const lists = state.locations;

    useEffect(() => {
        initMap()
    }, [lists, activeIndex]);

    const initMap = () => {

        let map = new window.google.maps.Map(document.getElementById("map"), {
            mapTypeControl: false,
            zoomControl: true,
            zoomControlOptions: {
                position: window.google.maps.ControlPosition.LEFT_BOTTOM
            },
            scaleControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            zoom: 4.5,
            center: { lat: -5.81917, lng: 110.459 }

        });

        let marker;
        let infowindow = new window.google.maps.InfoWindow();

        let countryDomain = [...new Set(lists.map(item => item.dataset ))]
        for(let i=0; i< countryDomain.length; i++){
            let dataset = countryDomain[i].toLowerCase()
            map.data.loadGeoJson(`${endpoints.getGeoData}?dataset=${dataset}`);
            
        }
        map.data.setStyle(function (feature) {

            let c_name = feature.getProperty('name').toLowerCase();
            let color = countries[c_name] ? countries[c_name].color : 'green';
    
                return ({
                    fillColor: color,
                    strokeColor: color,
                    strokeWeight: 1
                });
            });

        lists.forEach((company, index) => {
            const { overall_knapshot_score, latitude, longitude, id } = company;

            let marker = creteMarker(overall_knapshot_score, latitude, longitude, map, id);
            createInfoWindow(company, map, marker, infowindow);
        });
    }

    const creteMarker = (score, latitude, longitude, map, id) => {
        let color = "";
        if (score < 2) color = digitals["Basic"];
        if (2 <= score && score < 5) color = digitals["Intermediate"];
        if (5 <= score && score < 8) color = digitals["High"];
        if (score >= 8) color = digitals["Advanced"];

        let marker = new window.google.maps.Marker({
            position: {
                lat: parseFloat(latitude), lng: parseFloat(longitude)
            },
            map: map,
            zIndex: 1,
            icon: {
                path: "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z", //SVG path of awesomefont marker
                fillColor: color,
                fillOpacity: 1,
                strokeWeight: 0,
                scale: id === activeIndex ? 0.07 : 0.03,
                anchor: new window.google.maps.Point(170, 470),
                labelOrigin: new window.google.maps.Point(170, 160)
            }
        });

        return marker;
    }

    const createInfoWindow = (company, map, marker, infowindow) => {
        const {
            company_name,
            dataset,
            industry,
            total_personnel,
            overall_knapshot_score,
            address,
            main_line_number,
            website,
            company_email_address,
            facebook,
            linkedIn,
            instagram,
            twitter
        } = company;

        window.google.maps.event.addListener(marker, 'mouseover', function () {
            const content = ReactDOMServer.renderToString(<CompanyDetailMap company={company} />);
            infowindow.setContent(content);
            infowindow.open(map, marker);
        });
    }

    return (
        <div className={classes.root}>
            <div id="map" className={classes.map} />
        </div>
    );
}

import React, { useEffect, useMemo, useState } from 'react';

import { Box, useMediaQuery, useTheme } from '@material-ui/core';

import useStyles from './Home.style';
import ResultCard from '../UI/ResultCard';
import Filters from '../UI/Filters';
import convert from 'convert-seconds';
import getFlightsByFilters from "./Home.helper";
const airWaysData = require('./Home.data.json');

const getLocaleTime = (sec) => {
  const hour = convert(sec).hours;
  const min = convert(sec).minutes;

  return `${hour ? hour + ' ч' : ''} ${min ? min + ' м' : ''}`;
};

const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileResolution = useMediaQuery(theme.breakpoints.down('sm'));
  const [airlines] = useState(airWaysData.airlines);
  const [flights] = useState(() => {
    const newData = [];
    airWaysData.flights.forEach((item) => {
      const filteredFlight = item.itineraries[0][0];
      const info = {
        price: filteredFlight.price.amount,
        refundable: filteredFlight.refundable,
        duration: getLocaleTime(filteredFlight.traveltime),
        carrier: item.itineraries[0][0].carrier,
        carrierName: item.itineraries[0][0].carrier_name,
        baggage: !item.services['OPC'],
      };

      if (filteredFlight.segments.length === 1) {
        info.originCode = filteredFlight.segments[0].origin_code;
        info.desctCode = filteredFlight.segments[0].dest_code;
        info.direct = true;
        info.depTime = filteredFlight.segments[0].dep_time.slice(-5);
        info.depDate = filteredFlight.segments[0].dep_time.slice(0, 10);
        info.arrTime = filteredFlight.segments[0].arr_time.slice(-5);
        info.arrDate = filteredFlight.segments[0].arr_time.slice(0, 10);
      } else {
        info.originCode = filteredFlight.segments[0].origin_code;
        info.desctCode = filteredFlight.segments[1].dest_code;
        info.direct = false;
        info.depTime = filteredFlight.segments[0].dep_time.slice(-5);
        info.depDate = filteredFlight.segments[0].dep_time.slice(0, 10);
        info.arrTime = filteredFlight.segments[1].arr_time.slice(-5);
        info.arrDate = filteredFlight.segments[1].arr_time.slice(0, 10);
        info.transitCity = filteredFlight.segments[0].dest;
        info.layover = getLocaleTime(filteredFlight.layovers[0]);
      }

      newData.push(info);
    });
    return newData;
  });

  const [dataToRender, setDataToRender] = useState(flights);

  const handleFilters = (filterRes) => {
    setTimeout(() => {
      setDataToRender(getFlightsByFilters(flights, filterRes));
    }, 1000);
  };

  const renderSearch = () => {
    return dataToRender.map((item, index) => (
      <ResultCard key={index} flight={item} />
    ));
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <h5 className={classes.headerMessage}>Header</h5>
      </Box>
      <Box className={classes.content}>
        <Box className={classes.searchForm}>
          <h5 className={classes.headerMessage}>Search form</h5>
        </Box>
        <Box className={classes.topFilterInfo} />
        <Box className={classes.mainContent}>
          <Box className={classes.leftFilters}>
            <Filters airlines={airlines} onFilter={handleFilters} />
          </Box>
          <Box className={classes.rightContent}>{renderSearch()}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

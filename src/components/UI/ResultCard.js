import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FastIcon from './FastIcon';
import convert from 'convert-seconds';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#fff',
    width: '100%',
    borderRadius: 4,
    marginBottom: 12,
  },
  right: {
    display: 'flex',
    width: 240,
    background: '#f5f5f5',
    borderRadius: '0px 4px 4px 0px',
    flexDirection: 'column',
  },
  price: {
    marginTop: 12,
    height: 28,
    fontSize: 26,
    fontFamily: 'Arial',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 13,
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 8,
  },
  priceForAll: {
    color: '#707276',
    display: 'flex',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer',
      color: '#595b5e',
    },
    marginBottom: 12,
  },
  luggage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noLuggage: {
    fontFamily: 'Open Sans',
    fontWeight: 400,
    fontSize: 12,
    color: '#202123',
    marginRight: 7,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  addLuggage: {
    background: '#EAF0FA',
    color: '#5763B3',
    fontFamily: 'Open Sans',
    fontWeight: 600,
    fontSize: 12,
    padding: '3px 8px',
    borderRadius: 2,
    '&:hover': {
      cursor: 'pointer',
      background: '#c2d4f0',
    },
  },
  btn: {
    background: theme.aviato.btnColor,
    width: 200,
    height: 40,
    '&:hover': {
      backgroundColor: '#439504',
    },
  },
  left: {
    display: 'flex',
    flexGrow: 1,
    height: 168,
    flexDirection: 'column',
    paddingLeft: 43,
    fontFamily: 'Open Sans',
  },
  topInfo: {
    display: 'flex',
    height: '80%',
    alignItems: 'center',
  },
  dateInfo: {
    display: 'flex',
  },
  month: {
    fontWeight: 400,
    fontSize: 12,
    color: '#202123',
    textTransform: 'lowercase',
  },
  time: {
    fontWeight: 600,
    fontSize: 24,
    lineHeight: 1,
    color: '#202123',
  },
  airCode: {
    fontWeight: 400,
    fontSize: 10,
    color: '#B9B9B9',
  },
  flyTime: {
    fontWeight: 400,
    fontSize: 12,
    color: '#202123',
  },
  codeDate: {
    width: 172,
    display: 'flex',
    flexDirection: 'column',
  },
  topCode: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  circle: {
    height: 5,
    width: 5,
    border: '1px solid #B9B9B9',
    borderRadius: '50%',
  },
  lineWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5,
  },
  line: {
    display: 'flex',
    flexGrow: 1,
    height: 1,
    background: '#B9B9B9',
  },
  transit: {
    color: '#FF9900',
    fontSize: 12,
    display: 'flex',
    justifyContent: 'center',
  },
  airLogoWrapper: {
    marginRight: '0.5rem',
    display: 'flex',
    width: '8rem',
    height: '100%',
    alignItems: 'center',
  },
  departureDate: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  arrivalDate: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logo: {
    width: 21,
    height: 21,
    marginRight: 12,
  },
  airlineText: {
    fontWeight: 600,
    fontSize: 14,
  },
  bottomInfo: {
    display: 'flex',
  },
  flightDetail: {
    color: '#7284E4',
    fontSize: 12,
    borderBottom: '1px dashed #7284E4',
    marginRight: 23,
    height: 18,
    '&:hover': {
      cursor: 'pointer',
      color: '#556ade',
    },
  },
  noReturn: {
    display: 'flex',
    alignItems: 'center',
  },
  noReturnText: {
    fontSize: 12,
    fontFamily: 'Arial',
    color: '#707276',
  },
}));

export default function ResultCard({ flight }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.left}>
        <Box className={classes.topInfo}>
          <Box className={classes.airLogoWrapper}>
            <img
              className={classes.logo}
              src={`https://aviata.kz/static/airline-logos/80x80/${flight.carrier}.png`}
              alt="logo"
            />
            <Box className={classes.airlineText}>
              {flight.carrierName}
            </Box>
          </Box>
          <Box className={classes.dateInfo}>
            <Box className={classes.departureDate} style={{ marginRight: 30 }}>
              <Box className={classes.month}>{flight.depDate}</Box>
              <Box className={classes.time}>{flight.depTime}</Box>
            </Box>
            <Box className={classes.codeDate}>
              <Box className={classes.topCode}>
                <Box className={classes.airCode}>{flight.originCode}</Box>
                <Box className={classes.flyTime}>{flight.duration}</Box>
                <Box className={classes.airCode}>{flight.desctCode}</Box>
              </Box>
              <Box className={classes.lineWrapper}>
                <Box className={classes.circle} />
                <Box className={classes.line} />
                <Box className={classes.circle} />
                <Box className={classes.line} />
                <Box className={classes.circle} />
              </Box>
              <Box className={classes.transit}>
                <span style={{ color: flight.direct ? '#55BB06' : '#FF9900'}}>
                 { flight.direct ? 'прямой рейс' : `через ${flight.transitCity}, ${flight.layover}`}
                </span>
              </Box>
            </Box>
            <Box className={classes.arrivalDate} style={{ marginLeft: 30 }}>
              <Box className={classes.month}>{flight.arrDate}</Box>
              <Box className={classes.time}>{flight.arrTime}</Box>
            </Box>
          </Box>
        </Box>
        <Box className={classes.bottomInfo}>
          <Box className={classes.flightDetail}>Детали перелета</Box>
          <Box className={classes.flightDetail} style={{ marginRight: 46 }}>
            Условия тарифа
          </Box>
          {!flight.refundable && (
            <Box className={classes.noReturn}>
              <FastIcon iconName="no-return" />
              <Box className={classes.noReturnText}>невозвратный</Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box className={classes.right}>
        <Box className={classes.price}>{flight.price} ₸</Box>
        <Box className={classes.btnWrapper}>
          <Button className={classes.btn} variant="contained" color="primary">
            Выбрать
          </Button>
        </Box>
        <Box className={classes.priceForAll}>Цена за всех пассажиров</Box>
        <Box className={classes.luggage}>
          <Box className={classes.noLuggage}>Нет багажа</Box>
          <Box className={classes.addLuggage}>+ Добавить багаж</Box>
        </Box>
      </Box>
    </Box>
  );
}

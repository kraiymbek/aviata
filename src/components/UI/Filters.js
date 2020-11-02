import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { useRouter } from 'next/router';
import FastIcon from './FastIcon';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    fontFamily: 'Open Sans',
    flexDirection: 'column',
  },
  tariffFilter: {
    display: 'flex',
    height: 152,
    borderRadius: 4,
    background: '#F5F5F5',
    width: '100%',
    padding: 12,
    flexDirection: 'column',
    marginBottom: 12,
  },
  header: {
    color: '#202123',
    fontWeight: 700,
    fontSize: 14,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 22,
    justifyContent: 'space-between',
    aligntItems: 'center',
  },
  checkboxItem: {
    '& .MuiCheckbox-root': {
      padding: 0,
      marginRight: 12,
    },
    '& .MuiCheckbox-colorSecondary.Mui-checked': {
      color: '#55BB06',
    },
    '& .MuiSvgIcon-root': {
      height: 16,
      width: 16,
    },
    marginBottom: 10,
  },
  checkboxWrapper: {
    height: 245,
    overflowY: 'scroll',
    scrollbarWidth: '1px',
  },
  resetAllWrapper: {
    display: 'flex',
  },
  resetAll: {
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
  '@global': {
    '*::-webkit-scrollbar': {
      width: 2,
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
    },
  },
  resetIcon: {
    fill: '#B9B9B9',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.1)',
      fill: '#7284E4',
      transition: 'transform ease 0.5s',
    },
  },
  resetBtn: {
    height: 20,
  },
}));

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: '#fff',
  },
  tooltip: {
    backgroundColor: '#fff',
    color: '#202123',
    height: 41,
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
    marginBottom: 18,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

export default function Filters({ airlines, onFilter }) {
  const classes = useStyles();
  const router = useRouter();
  const { query } = router;
  const [tariffFilter, setTariffFilter] = useState({
    baggage: false,
    direct: false,
    returnable: false,
  });
  const [airlineCheckboxes, setAirlineCheckboxes] = useState({});
  const [allNameCheckbox, setAllNameCheckbox] = useState(false);
  const [isResetStateAllowed, setIsResetStateAllowed] = useState({
    airlines: false,
    tariffs: false,
  });

  useEffect(() => {
    onFilter({ ...tariffFilter });

    const data = [];
    for (let key in tariffFilter) {
      if (tariffFilter[key]) {
        data.push(key);
      }
    }

    setIsResetStateAllowed({ ...isResetStateAllowed, tariffs: !!data.length });
  }, [tariffFilter]);

  useEffect(() => {
    let data = {};
    let selectedCheckboxes = [];
    for (let key in airlineCheckboxes) {
      if (airlineCheckboxes[key]) {
        selectedCheckboxes.push(key);
      }
    }

    if (allNameCheckbox) {
      data = 'all';
    } else {
      data = selectedCheckboxes;
    }

    setIsResetStateAllowed({ ...isResetStateAllowed, airlines: data === 'all' || !!data.length });

    onFilter({ ...tariffFilter, airlines: data });
  }, [airlineCheckboxes, allNameCheckbox]);

  const handleTariffFilters = (event) => {
    setTariffFilter({
      ...tariffFilter,
      [event.target.name]: event.target.checked,
    });
  };

  const handleAirlineCheckboxes = (event) => {
    const airlinesLength = Object.keys(airlines).length;

    const defineCheckboxes = {
      ...airlineCheckboxes,
      [event.target.name]: event.target.checked,
    };

    let selectedCheckboxes = [];
    for (let key in defineCheckboxes) {
      if (defineCheckboxes[key]) {
        selectedCheckboxes.push(key);
      }
    }
    setAllNameCheckbox(selectedCheckboxes.length === airlinesLength);
    setAirlineCheckboxes(defineCheckboxes);
  };

  const handleAllNameCheckbox = (event) => {
    const otherAirlines = { ...airlineCheckboxes };

    for (let key in airlines) {
      otherAirlines[key] = event.target.checked;
    }

    setAirlineCheckboxes(otherAirlines);
    setAllNameCheckbox(event.target.checked);
  };

  const handleResets = (type) => {
    const filtersToReset = {
      airlines: {},
      tariffs: {},
    };

    for (let key in tariffFilter) {
      filtersToReset.tariffs[key] = false;
    }

    for (let key in airlineCheckboxes) {
      filtersToReset.airlines[key] = false;
    }

    if (type === 'all') {
      setAirlineCheckboxes(filtersToReset.airlines);
      setTariffFilter(filtersToReset.tariffs);
    } else if (type === 'airlines') {
      setAllNameCheckbox(false);
      setAirlineCheckboxes(filtersToReset.airlines);
    } else if (type === 'tariffs') {
      setTariffFilter(filtersToReset.tariffs);
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.tariffFilter}>
        <Box className={classes.header}>
          <Box className={classes.headerText}>Опции тарифа</Box>
          {isResetStateAllowed.tariffs && (
            <BootstrapTooltip arrow title="Сбросить выбор" placement="top">
              <Box
                className={classes.resetBtn}
                onClick={() => handleResets('tariffs')}
              >
                <FastIcon className={classes.resetIcon} iconName="reset" />
              </Box>
            </BootstrapTooltip>
          )}
        </Box>
        <Box className={classes.checkboxItem}>
          <Checkbox
            onChange={handleTariffFilters}
            checked={tariffFilter.direct}
            name="direct"
          />
          Только прямые
        </Box>
        <Box className={classes.checkboxItem}>
          <Checkbox
            onChange={handleTariffFilters}
            checked={tariffFilter.baggage}
            name="baggage"
          />
          Только с багажом
        </Box>
        <Box className={classes.checkboxItem}>
          <Checkbox
            onChange={handleTariffFilters}
            checked={tariffFilter.returnable}
            name="returnable"
          />
          Только возвратные
        </Box>
      </Box>
      <Box className={classes.tariffFilter} style={{ height: 320 }}>
        <Box className={classes.header}>
          <Box className={classes.headerText}>Авиакомпании</Box>
          {isResetStateAllowed.airlines && (
            <BootstrapTooltip arrow title="Сбросить выбор" placement="top">
              <Box
                className={classes.resetBtn}
                onClick={() => handleResets('airlines')}
              >
                <FastIcon className={classes.resetIcon} iconName="reset" />
              </Box>
            </BootstrapTooltip>
          )}
        </Box>
        <Box className={classes.checkboxWrapper}>
          <Box className={classes.checkboxItem}>
            <Checkbox
              onChange={handleAllNameCheckbox}
              checked={allNameCheckbox}
              name="all"
            />
            Все
          </Box>
          {Object.keys(airlines).map((item, index) => (
            <Box className={classes.checkboxItem} key={index}>
              <Checkbox
                onChange={handleAirlineCheckboxes}
                checked={!!airlineCheckboxes[item]}
                name={item}
              />
              {airlines[item]}
            </Box>
          ))}
        </Box>
      </Box>

      <Box className={classes.resetAllWrapper}>
        <Box className={classes.resetAll} onClick={() => handleResets('all')}>
          Сбросить все фильтры
        </Box>
      </Box>
    </Box>
  );
}

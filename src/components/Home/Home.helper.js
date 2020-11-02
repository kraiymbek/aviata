const getKey = (where) => {
  let arr = [];
  for (let key in where) {
    arr.push(key);
  }

  return arr;
};

const filterFunction = (data, where, airlines) => {
  let i = 0,
    j = 0,
    len = data.length,
    key = getKey(where),
    keyLen = key.length,
    arr = [];

  for (; len > i; i++) {
    let item = data[i],
      isCorrect = true;

    j = 0;
    for (; keyLen > j; j++) {
      let itemKey = key[j];

      if (item[itemKey] != where[itemKey]) {
        isCorrect = false;
        break;
      }
    }

    if (isCorrect) {
      arr.push(item);
    }
  }

  if (Array.isArray(airlines) && airlines.length) {
    arr = arr.filter((item) => airlines.includes(item.carrier));
  }

  return arr;
};

const getFlightsByFilters = (flights, filterRes) => {
  const query = {};
  if (filterRes.returnable) query.refundable = true;
  if (filterRes.direct) query.direct = true;
  if (filterRes.baggage) query.baggage = true;

  return filterFunction(flights, query, filterRes.airlines);
};

export default getFlightsByFilters;

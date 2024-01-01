const httpStatus = require('http-status');
const moment = require('moment-timezone');
const axios = require('axios').default;

const catchAsync = require('../utils/catchAsync');

const test = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send('OK');
});

const stockPriceDaily = catchAsync(async (req, res) => {
  const response = await axios.get('https://elektrihind.ee/api/stock_price_daily.php');
  // const data = await response.json();
  res.status(httpStatus.OK).send(response.data);
});

const stockPriceCurrent = catchAsync(async (req, res) => {
  const date = moment().tz('Europe/Tallinn');
  date.minutes(0);
  date.seconds(0);

  const dateTime = date.format('YYYY-MM-DD HH:mm');
  const response = await axios.get('https://elektrihind.ee/api/stock_price_daily.php');
  if (response.status !== 200) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Error');
  }
  const currentStock = response.data.find((stock) => stock.date === dateTime);
  if (!currentStock) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Error');
  }
  res.status(httpStatus.OK).send(currentStock);
});

module.exports = {
  test,
  stockPriceDaily,
  stockPriceCurrent,
};

const express = require('express');
const apiController = require('../../controllers/api.controller');

const router = express.Router();

router.route('/test').get(apiController.test);
router.route('/stock_price_daily').get(apiController.stockPriceDaily);
router.route('/stock_price_current').get(apiController.stockPriceCurrent);

module.exports = router;

// Route (endpoint) definitions for coin flipping
const express = require("express");

// Require coin SCRIPT file
const coin = require('../controllers/coinControllers.js')

// flipRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware.
const flipRoutes = express.Router();

// One flip
flipRoutes.route('/app/flip/').get(function(req, res, next) {
    var flip = coin.coinFlip()
    res.status(200).json({
        'flip': flip
    })
});

// Alternate one flip
flipRoutes.route('/app/flip/coin/').get(function(req, res, next) {
    var flip = coin.coinFlip()
    res.status(200).json({
        'flip': flip
    })
});

// Multiple flips (using parameters)
flipRoutes.route('/app/flips/:number/').get(function(req, res, next) {
    var coinFlipsResult = coin.coinFlips(req.params.number)
    var coinFlipsResultSummary = coin.countFlips(coinFlipsResult)

    res.status(200).json({
        'raw': coinFlipsResult,
        'summary': coinFlipsResultSummary
    })
});

// Multiple flips (using body)
flipRoutes.route('/app/flips/coins/').post(function(req, res, next) {
    var coinFlipsResult = coin.coinFlips(req.body.number)
    var coinFlipsResultSummary = coin.countFlips(coinFlipsResult)

    res.status(200).json({
        'raw': coinFlipsResult,
        'summary': coinFlipsResultSummary
    })
});

// Flip match (using parameters)
flipRoutes.route('/app/flip/call/:guess(heads|tails)/').get(function(req, res, next) {
    const game = coin.flipACoin(req.params.guess)
    res.status(200).json(game)
})

// Flip match (using body)
flipRoutes.route('/app/flip/call/').post(function(req, res, next) {
    const game = coin.flipACoin(req.body.guess)
    res.status(200).json(game)
})

module.exports = flipRoutes;
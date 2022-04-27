const express = require("express");


const db = require('../services/database.js')

const debugRoutes = express.Router();

debugRoutes.route('/app/log/access/').get(function(req, res, next) {
    try {
        const stmt = db.prepare('SELECT * FROM accesslogs').all()
        res.status(200).json(stmt)
    } catch {
        console.error(res)
    }
});

debugRoutes.route('/app/error/').get(function(req, res, next) {
    throw new Error('Error test.')
})
module.exports = debugRoutes;
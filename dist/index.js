"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbPool = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
//import { dbPool } from './database';
var bodyParser = require('body-parser');
var _a = require('express-validator'), body = _a.body, validationResult = _a.validationResult;
require('dotenv').config();
var pg_1 = require("pg");
exports.dbPool = new pg_1.Pool({
    connectionString: process.env.PROD_DB_CONNECTION_STRING
});
var app = (0, express_1.default)();
//console.log(process.env.PROD_DB_CONNECTION_STRING)
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var posts = [];
// insert attendee into database
app.post('/register', body('email').isEmail().normalizeEmail(), body('national_id').isLength({
    min: 14,
    max: 14
}), body('national_id').isInt(), body('name').isString(), body('phone_number').matches(/^01[0-2,5]\d{8}$/), body("university").isString(), body("faculty").isString(), function (req, res) {
    var errors = validationResult(req);
    // validate data
    if (!errors.isEmpty() || (req.body['grad_year'] > 2030 || req.body['grad_year'] < 1990)) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    // insert into database
    var insertQuery = 'INSERT INTO stp.machathon_summit VALUES ($1, $2, $3, $4, $5, $6, $7, NOW());';
    var _a = req.body, name = _a.name, phone_number = _a.phone_number, email = _a.email, national_id = _a.national_id, university = _a.university, faculty = _a.faculty, grad_year = _a.grad_year;
    posts.push(req.body);
    //
    exports.dbPool.query(insertQuery, [name, phone_number, email, national_id, university, faculty, grad_year], function (error, results) {
        if (error) {
            throw error;
        }
    });
    //
    res.status(200).json({
        success: true,
        message: 'successful registration',
    });
});
// Get all registered people
app.get('/', function (req, res) {
    exports.dbPool.query('SELECT * FROM stp.machathon_summit;', function (error, results) {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
});
// A cron job endpoint to keep the server running
app.get('/cron', function (req, res) {
    console.log("WAKE UP");
});
// Report server errors
var errHandler = function (error, req, res, next) {
    console.error("uncaught exception", error);
    return res.status(500).send("An unexpected error has occurred, please try again.");
};
app.use(errHandler);
// Run server on port 
app.listen(process.env.SERVER_PORT);

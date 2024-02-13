import express,{ RequestHandler, ErrorRequestHandler } from 'express';
import cors from 'cors';

const bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');

require('dotenv').config();

import { Pool } from 'pg';

// TODO: Change to prod DB
export const dbPool = new Pool({
    connectionString: process.env.PROD_DB_CONNECTION_STRING
});

const app = express();

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// insert attendee into database
app.post('/register',
body('email').isEmail().normalizeEmail(),
body('national_id').isLength({
    min: 14,
    max: 14
}),
body('national_id').isInt(),
body('name').isString(),
body('phone_number').matches(/^01[0-2,5]\d{8}$/),
body("university").isString(),
body("faculty").isString(),

(req, res) => {
    const errors = validationResult(req);
    // validate data
    if (!errors.isEmpty()||(req.body['grad_year']>2033|| req.body['grad_year']<1990)) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    // insert into database
    const insertQuery = 'INSERT INTO stp.machathon_summit VALUES ($1, $2, $3, $4, $5, $6, $7, NOW());';
    const {name, phone_number, email, national_id, university, faculty, grad_year} = req.body;
    //
    dbPool.query(insertQuery, [name, phone_number, email, national_id, university, faculty, grad_year], (error, results) => {
        if(error){
            res.status(500).json({
                success: false,
                message: "internal error, try again later" //error.message
            })
            throw error;
        }
        else{
            res.status(200).json({
                success: true,
                message: 'successful registration'
            })
        }
    })
});

// Get all registered people
app.get('/all', (req, res) => {
    dbPool.query('SELECT * FROM stp.machathon_summit;', (error, results) => {
        if(error){
            res.status(500).json({
                success: false,
                message: 'internal server error'
            });
            console.log(error);
            //throw error;
        }
        else{
            res.status(200).json(results.rows);
        }
    })
});

// A cron job endpoint to keep the server running
app.get('/cron', (req, res) => {
    console.log("WAKE UP");
    res.status(200).json({
        state: "success"
    });
})

// an endpoint to check if the user already exists in the database
app.get(`/`, async (req, res) => {
    const email: string = decodeURI(req.query.email as string);
    const nID = req.query.nid;
    const qu = "SELECT * FROM stp.machathon_summit WHERE email=$1 OR national_id=$2;"
    //
    await dbPool.query(qu, [email, nID], (error, results) => {
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
})


// Report server errors
const errHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.error("uncaught exception", error);
    return res.status(500).send("An unexpected error has occurred, please try again.");
}
app.use(errHandler);


// Run server on server port 
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port ${process.env.SERVER_PORT}`)}
    );
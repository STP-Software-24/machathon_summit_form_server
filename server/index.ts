import express,{ RequestHandler } from 'express';

const bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');


const app = express();


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const posts: any[] = [];

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
    console.log(req.body['grad_year'])

    if (!errors.isEmpty()||(req.body['grad_year']>2030|| req.body['grad_year']<1990)) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    posts.push(req.body)
    res.status(200).json({
        success: true,
        message: 'successful registration',
    })
});

app.get('/', (req, res) => {
    res.send(posts[0]);
})

app.listen(3000)
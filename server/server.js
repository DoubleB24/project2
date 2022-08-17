const util = require('util');
const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const Product = require("./libs/Product");

const app = express();
const port = 8080;
const bodyParser = require('body-parser');

const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use('/images', express.static('images'));

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "project"
})

pool.query = util.promisify(pool.query);

let checkAuth = (req, res, next) => {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        token = req.query.token;
    } else {
        token = req.body.token;
    }

    if (token) {
        jwt.verify(token, "MySecretKey", (err, decoded) => {
            if (err) {
                res.send(JSON.stringify({
                    result: false,
                    message: "ไม่ได้เข้าสู่ระบบ"
                }));
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(401).send("Not authorized");
    }
}

app.post("/api/authen_request", (req, res) => {
    const query = "SELECT * FROM users WHERE MD5(user_name) = ?";
    pool.query(query, [req.body.username], (error, results) => {
        var response;
        if (error) {
            response = {
                result: false,
                message: error.message
            };
        } else {
            if (results) {
                var payload = {username: req.body.username};
                var secretKey = "MySecretKey";
                const authToken = jwt.sign(payload.username, secretKey);
                response = {
                    result: true,
                    data: {
                        auth_token: authToken
                    }
                };
            } else {
                response = {
                    result: false,
                    message: "Username ไม่ถูกต้อง"
                };
            }
        }
        res.json(response);
    });
});

app.post("/api/access_request", (req, res) => {
    const authenSignature = req.body.auth_signature;
    const authToken = req.body.auth_token;

    var decoded = jwt.verify(authToken, "MySecretKey");

    if (decoded) {
        const query = "SELECT a.user_id, a.user_name, a.first_name, a.last_name, a.email, a.role_id, b.role_name "
            + "FROM users a JOIN roles b ON a.role_id = b.role_id WHERE MD5(CONCAT(user_name, '&', user_pwd)) =  ?";
        pool.query(query,[authenSignature], (error,results) =>{
            var response;
            if (error) {
                response = {
                    result: false,
                    message: error.message
                };
            } else {
                if (results.length) {
                    var payload = {
                        user_id: results[0].user_id, username: results[0].username, first_name: results[0].first_name,
                        last_name: results[0].lastname, email: results[0].email,
                        role_id: results[0].role_id, role_name: results[0].role_name
                    };
                    const accessToken = jwt.sign(payload, "MySecretKey");
                    response =  { results: true, data: { access_token: accessToken, account_info: payload}};
                } else {
                    response = { result: false, message: "Username หรือ Password ไม่ถูกต้อง"}
                }
            }
            res.json(response)
        });
    }
});


app.post("/login", (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;

    pool.query("SELECT * FROM users WHERE user_name = ? AND user_pwd = MD5(?)", [username, password], function(error, results, fields){
        if (error) {
            res.json({
                result: false,
                message: error.message
            });
        }

        if (results.length) {
            res.json({
                result: true
            });
        } else {
            res.json({
                result:false,
                message: "ไม่พบ Username หรือ Password ไม่ถูกต้อง"
            });
        }
    });

});

app.get('/api/users',(req,res) => {
    pool.query("SELECT * FROM user",function(error,result,fields){
        if(error){
            res.json({
                result: false,
                message: error.message
            });
        }

        if(result.length){
            res.json({
                result:true,
                data: result
            });
        }else{
            res.json({
                result: false,
                message: "ไม่พบบัญชีผู้ใช้"
            });
        }
    });
});



app.listen(port, () => {
    console.log("Running");
});
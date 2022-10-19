const util = require('util');
const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const app = express();
const port = 8080;
const bodyParser = require('body-parser');

const cors = require("cors");

const users = require('./libs/users');
const Product = require('./libs/Product');
// const FormProductType = require()
const ProductType = require('./libs/ProductType');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use('/images', express.static('images'));

var mysql = require('mysql');
const { response } = require('express');
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
    console.log(authenSignature);
    if (decoded) {
        const query = "SELECT a.user_id, a.user_name, a.user_pwd, a.role_id, b.role_name "
            + "FROM users a JOIN roles b ON a.role_id = b.role_id WHERE MD5(CONCAT(user_name, '&', user_pwd)) =  ?"; 
           console.log(query);
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
                        user_id: results[0].user_id, user_name: results[0].user_name,
                        user_pwd: results[0].user_pwd,role_id: results[0].role_id,
                        role_name: results[0].role_name
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


app.get('/api/roles',(req,res) => {
    pool.query("SELECT * FROM roles ",function(err,result,fields){
        if(err){
            res.json({
                result: false,
                message: err.message
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
                message: "ไม่พบประเภทผู้ใช้"
            });
        }
    });
});


app.get('/api/users',(req,res) => {
    pool.query("SELECT a.user_id, a.user_name,b.role_name FROM users a JOIN roles b ON a.role_id = b.role_id",function(err,result,fields){
        if(err){
            res.json({
                result: false,
                message: err.message
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

app.post('/api/formUsers/add',async(req,res) =>{
    const input = req.body;

    try{
        var result = await users.createUser(pool,input.user_name,input.user_pwd,input.role_id);
        console.log(result);
        res.json({
            result : true
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }

});

app.post('/api/users/update', checkAuth,async(req,res) =>{
    const input = req.body;

    try{
        var result = await users.updateUser(pool,input.user_name,input.user_pwd,input.role_id,input.user_id);
        res.json({
            result : true
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }

});


app.post('/api/users/delete',async(req,res) =>{
    const input = req.body;

    try{
        var result = await users.deleteUser(pool,input.user_id);
        res.json({
            result : true
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }

});

app.get('/api/users/:user_id',async(req,res) =>{
    const userid = req.params.user_id;

    try{
        var result = await users.getByUserId(pool,userid);
        res.json({
            result : true,
            data: result
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }
});

//////////////////ประเภทสินค้า

app.get('/api/product_type',(req,res) => {
    pool.query("SELECT * FROM product_types",function(err,results,fields){
        if(err){
            res.json({
                result: false,
                message: err.message
            });
        }

        if(results.length){
            res.json({
                result:true,
                data: results
            });
        }else{
            res.json({
                result: false,
                message: "ไม่พบประเภทสินค้า"
            });
        }
    });
});

app.post('/api/product_type/add',async(req,res) =>{
    const input = req.body;

    try{
        var result = await ProductType.createProductType(pool,input.product_type_name);
        res.json({
            result : true
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }

});

app.post('/api/product_type/update',async(req,res) =>{
    const input = req.body;

    try{
        var result = await ProductType.updateProductType(pool,input.product_type_id, input.product_type_name);
        res.json({
            result : true
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }

});


app.post('/api/product_type/delete',async(req,res) =>{
    const input = req.body;

    try{
        var result = await ProductType.deleteProductType(pool,input.product_type_id);
        res.json({
            result : true
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }

});

app.get('/api/product_type/:product_type_id',async(req,res) =>{
    const product_type_id = req.params.product_type_id;

    try{
        var result = await ProductType.getByProductTypeId(pool,product_type_id);
        res.json({
            result : true,
            data: result
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }
});


/////////////////Owner

app.get("/api/product", (req, res) => {
    const query = "SELECT a.*, b.product_type_name FROM product_types b JOIN products a ON b.product_type_id = a.product_type_id";

    pool.query(query, (err, results) => {
        if (err) {
            res.json({
                result: false,
                message: err.message
            })
        }else{
            res.json({
                result:true,
                data: results
            });
        }
    });
});


app.get("/api/producttypes", (req, res) => {
    const query = "SELECT * FROM `product_types`";

    pool.query(query, (err, results) => {
        if (err) {
            res.json({
                result: false,
                message: err.message
            })
        }else{
            res.json({
                result:true,
                data: results
            });
        }
    });
});


app.get("api/products/type/:productTypeId", checkAuth, (req, res) => {
    const productTypeId = req.params.productTypeId;
    const sql = "SELECT a.*, b.product_Name "
                + "FORM product a"
                + "JOIN product_types b ON a.product_type_id = b.product_type_id ";

    if (productTypeId == 0) {
        pool.query(sql, (err, results) => {
            if (err) {
                res.json({
                    result: false,
                    message: err.message
                });
            } else{
                res.json({
                    result: true,
                    data: results
                });
            }
        });
    } else {
        pool.query(sql + "WHERE a.product_type_id =?",
        [productTypeId], (err, results) => {
            if(err) {
                res.json({
                    result: false,
                    message: err.message
                });
            } else {
                res.json({
                    result: true,
                    data: results
                });
            }
        });
    }
});


app.get("/api/product/:productId", async (req,res) => {
    const product_id = req.params.productId;

    try {
        var result = await Product.getByProductId(pool, product_id);

        res.json({
            result: true,
            data: result
        });
    }catch (ex) {
        res.json({
            result: false,
            message: ex.message
        });
    }
})




app.get('/api/productTypeowner',(req,res) => {
    pool.query("SELECT * FROM products",function(err,results,fields){
        if(err){
            res.json({
                result: false,
                message: err.message
            });
        }

        if(results.length){
            res.json({
                result:true,
                data: results
            });
        }else{
            res.json({
                result: false,
                message: "ไม่พบประเภทสินค้า"
            });
        }
    });
});



app.post('/api/product/add',async(req,res) =>{
    const input = req.body;

    try{
        var result = await Product.isDuplicate(pool, input.product_name, input.product_type_id);

        if(!result) {
            await Product.createProduct(pool,
                input.product_name, 
                input.product_type_id,
                input.price, 
                input.stock);
    
            res.json({
                result : true
            });
        }else{

            res.json({
                result:false,
                message: "ชื่อสินค้าซ้ำ"
            });
        }
    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }

});

app.post('/api/product/update',async(req,res) =>{
    const input = req.body;
    console.log(input)
    try{
        var result = await Product.updateProduct(pool,
            input.productId,
            input.product_name, 
            input.product_type_id,
            input.price, 
            input.stock);
        res.json({
            result : true
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }

});


app.post('/api/product/delete',async(req,res) =>{
    const input = req.body;

    try{
        var result = await Product.deleteProduct(pool,input.product_id);
        res.json({
            result : true
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }

});

app.get('/api/producttype/:product_type_Id',async(req,res) =>{
    const product_type_Id = req.params.product_type_Id;

    try{
        var result = await ProductType.getByProductTypeId(pool,product_type_Id);
        res.json({
            result : true,
            data: result
        });

    }catch(ex){
        res.json({
            result: false,
            message: ex.message
        });
    }
});

//////////////report

app.get("/api/report", async (req,res) =>{
    try {
        var result = await Product.getSumProduct(pool);

        res.json({
            result: true,
            data: result
        });
    } catch (ex){
        res.json({
            result: false,
            message: ex.message
        });
    }
});

///////////////Employee








app.listen(port, () => {
    console.log("Running");
});
const mysql = require("mysql");


module.exports = {
    createOrder: async(pool,user_id,amount,total) =>{
        var sql = "INSERT INTO orders (user_id,amount,total) VALUES (?,?,?)";
        sql = mysql.format(sql,[user_id,amount,total]);
        console.log(sql);
        return await pool.query(sql);
    },

    createOrderItem: async(pool, product_id,price,amount,total,order_id) =>{
        var sql = "INSERT INTO orderitem (product_id,price,amount,total,order_id) VALUES(?,?,?,?,?)";
        sql = mysql.format(sql,[product_id,price,amount,total,order_id]);
        return await pool.query(sql);
    }



   
}
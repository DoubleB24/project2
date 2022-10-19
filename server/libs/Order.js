const mysql = require("mysql");


module.exports = {
    createOrder: async(pool,user_id,total) =>{
        var sql = "INSERT INTO orders (user_id,total,order_date) VALUES (?,?,current_timestamp())";
        sql = mysql.format(sql,[user_id,total]);
        console.log(sql);
        return await pool.query(sql);
    },

    createOrderItem: async(pool, product_id,amount,total,order_id) =>{
        var sql = "INSERT INTO orderitem (product_id,amount,total,order_id) VALUES(?,?,?,?)";
        sql = mysql.format(sql,[product_id,amount,total,order_id]);
        return await pool.query(sql);
    }



   
}
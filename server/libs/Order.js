const mysql = require("mysql");


module.exports = {
    createOrder: async(pool,user_id,amount,total,vat,net,address) =>{
        var sql = "INSERT INTO orders (user_id,amount,total,vat,net,address) VALUES (?,?,?,?,?,?)";
        sql = mysql.format(sql,[user_id,amount,total,vat,net,address]);
        console.log(sql);
        return await pool.query(sql);
    },

    createOrderItem: async(pool, product_id,price,amount,total,order_id) =>{
        var sql = "INSERT INTO orderitem (product_id,price,amount,total,order_id) VALUES(?,?,?,?,?)";
        sql = mysql.format(sql,[product_id,price,amount,total,order_id]);
        return await pool.query(sql);
    },

    updateImage: async (pool,order_id,name_img) =>{
        var sql = "UPDATE orderitem SET image_url =? WHERE order_id = ?";
        sql = mysql.format(sql, [name_img, order_id]);
        return await pool.query(sql);
    },

}
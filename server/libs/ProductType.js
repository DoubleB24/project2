const mysql = require('mysql');

module.exports={
    createProductType: async(pool,product_type_name) => {
        var sql ="INSERT INTO product_types(product_type_name) VALUES (?)";
        sql = mysql.format(sql,[product_type_name]);
        return await pool.query(sql);
    },

    updateProductType: async(pool,product_type_id,product_type_name) => {
        var sql ="UPDATE product_types SET product_type_name = ? WHERE product_type_id = ?";
        sql = mysql.format(sql,[product_type_name,product_type_id]);
        console.log(sql)
        return await pool.query(sql);
    },

    deleteProductType: async(pool,product_type_id) => {
        var sql ="DELETE FROM product_types WHERE product_type_id = ?";
        sql = mysql.format(sql,[product_type_id]);
        return await pool.query(sql);
    },

    getByProductTypeId: async(pool,product_type_id) => {
        var sql ="SELECT * FROM product_types WHERE product_type_id = ?";
        sql = mysql.format(sql,[product_type_id]);
        return await pool.query(sql);
    },
    
    
}
const mysql = require("mysql");


module.exports = {
    createProduct: async (pool, product_Name, product_type_id, price, stock) =>{
        var sql = "INSERT INTO products (product_name, product_type_id, price, stock) "
                    + "VALUES (?,?,?,?)";
        sql = mysql.format(sql, [product_Name, product_type_id, price, stock]);
        return await pool.query(sql);
    },
    getByProductId: async (pool, product_id) => {
        var sql = "SELECT * FROM products WHERE product_id = ?";
        sql = mysql.format(sql, [product_id]);
        return await pool.query(sql);
    },
    updateProduct: async (pool, productId, product_name, product_type_id, price, stock) =>{
        var sql = " UPDATE products SET  product_name = ? ,product_type_id = ? ,price = ? ,stock = ? WHERE product_id = ?";
        sql = mysql.format(sql, [product_name, product_type_id, price, stock, productId]);

        return await pool.query(sql);
    },
    deleteProduct: async (pool, product_id) => {
        var sql = "DELETE FROM products WHERE product_id = ?";
        sql = mysql.format(sql, [product_id]);
        return await pool.query(sql);
    },
    updateImage: async (pool, product_id, fileName) => {
        var sql = "UPDATE products SET image_url = ? "
                    + "WHERE product_id = ?";
        sql = mysql.format(sql, [fileName, product_id]);
        return await pool.query(sql);
    },
    getSumProduct: async (pool) => {
        var sql = "SELECT b.product_type_id, a.product_name, a.stock FROM products a JOIN product_types b ON a.product_type_id = b.product_type_id GROUP BY a.product_type_id, a.product_name";
        return await pool.query(sql);
    },
    isDuplicate: async (pool, product_Name, product_id) => {
        var sql = "SELECT * FROM products WHERE product_name = ? ";

        if (product_id != null) {
            sql = sql + "AND product_id <> ?";
            sql = mysql.format(sql, [product_Name, product_id])
        } else {
            sql = mysql.format(sql, [product_Name]);
        }

        var result = await pool.query(sql);

        if (result.length > 0) {
            return true;
        }

        return false;
    },

}
const mysql = require("mysql");


module.exports = {
    createProduct: async (pool, productName, productTypeId, price, stock) =>{
        var sql = "INSERT INTO products (product_name, product_type_id, price, stock) "
                    + "VALUES (?,?,?,?)";
        sql = mysql.format(sql, [productName, productTypeId, price, stock]);

        return await pool.query(sql);
    },
    getByProductId: async (pool, productId) => {
        var sql = "SELECT * FROM products WHERE product_id = ?";
        sql = mysql.format(sql, [productId]);

        return await pool.query(sql);
    }
    ,
    updateProduct: async (pool, productId, productName, productTypeId, price, stock) =>{
        var sql = "UPDATE products SET "
                + "product_name=?,"
                + "product_type_id=?,"
                + "price=?,"
                + "stock=?"
                + "WHERE product_id = ?";
        sql = mysql.format(sql, [productName, productTypeId, price, stock, productId]);

        return await pool.query(sql);
    },
    deleteProduct: async (pool, productId) => {
        var sql = "DELETE FROM products WHERE product_id = ?";
        sql = mysql.format(sql, [productId]);

        return await pool.query(sql);
    },
    updateImage: async (pool, productId, fileName) => {
        var sql = "UPDATE products SET image_url = ? "
                    + "WHERE product_id = ?";
        sql = mysql.format(sql, [fileName, productId]);

        return await pool.query(sql);
    },
    getSumProduct: async (pool) => {
        var sql = "SELECT a.product_type_id,"
                    + "b.product_type_name,"
                    + "SUM(a.stock) as product_count "
                    + "FROM products a "
                    + "JOIN product_types b ON a.product_type_id = b.product_type_id "
                    + "GROUP BY a.product_type_id, b.product_type_name";
        return await pool.query(sql);
    },
    isDuplicate: async (pool, productName, productId) => {
        var sql = "SELECT * FROM products WHERE product_name = ? ";

        if (productId != null) {
            sql = sql + "AND product_id <> ?";
            sql = mysql.format(sql, [productName. productId])
        } else {
            sql = mysql.format(sql, [productName]);
        }

        var result = await pool.query(sql);

        if (result.length > 0) {
            return true;
        }

        return false;
    }

}
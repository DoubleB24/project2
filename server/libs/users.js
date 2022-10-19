// const jwt = require('jsonwebtoken');


const mysql = require('mysql');

module.exports={
    createUser: async(pool,user_name,user_pwd,role_id) => {
        var sql ="INSERT INTO users(user_name,user_pwd,role_id) VALUES (?,MD5(?),?)";
        sql = mysql.format(sql,[user_name,user_pwd,role_id]);
        return await pool.query(sql);
    },

    updateUser: async(pool,user_name,user_pwd,role_id,user_id) => {
        
        var sql ="UPDATE users SET user_name = ?,user_pwd = MD5(?),role_id = ? WHERE user_id = ? ";
        sql = mysql.format(sql,[user_name,user_pwd,role_id,user_id]);
        return await pool.query(sql);
        
    },

    deleteUser: async(pool,user_id) => {
        var sql ="DELETE FROM users WHERE user_id = ?";
        sql = mysql.format(sql,[user_id]);
        return await pool.query(sql);
    },

    getByUserId: async(pool,user_id) => {
        var sql ="SELECT a.user_id, a.user_name , b.role_id, b.role_name FROM users a JOIN roles b ON a.role_id = b.role_id WHERE user_id =?";
        sql = mysql.format(sql,[user_id]);
        return await pool.query(sql);
    },
    
    
}
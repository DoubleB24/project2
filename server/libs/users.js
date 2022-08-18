// const jwt = require('jsonwebtoken');


const mysql = require('mysql');

module.exports={
    createuser: async(pool,user_name,user_pwd,role_id) => {
        var sql ="INSERT INTO user(user_name,user_pwd,role_id) VALUES (?,MD5(?),?)";
        sql = mysql.format(sql,[user_name,user_pwd,role_id]);
        return await pool.query(sql);
    },

    updateuser: async(pool,user_id,user_name,user_pwd,role_id) => {
        var sql ="UPDATE user SET user_name = ?,user_pwd = MD(?),rple_id = ? WHRE user_id = ?";
        sql = mysql.format(sql,[user_name,user_pwd,role_id,user_id]);
        return await pool.query(sql);
    },

    deleteuser: async(pool,user_id) => {
        var sql ="DRLETE FROM user WHRE user_id = ?";
        sql = mysql.format(sql,[user_id]);
        return await pool.query(sql);
    },

    getByUserId: async(pool,user_id) => {
        var sql ="DRLETE FROM user WHRE user_id = ?";
        sql = mysql.format(sql,[user_id]);
        return await pool.query(sql);
    },
    
    
}
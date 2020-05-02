const pool =require('../../config/database');

module.exports={
    create:(data,callback) =>{
        pool.query('insert into registration(firstname,lastname,gender,email,number,password) values(?,?,?,?,?,?)',
        [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.number,
            data.password

        ],
        (error,result,fields)=>{
            if(error){
                return callback(error);
            }
            return callback(null,result)
        }
        );
    },
    getUserById:(id, callback)=>{
        pool.query(
            'select id,firstname,lastname,gender,email,number from registration where id = ?',
            [id],
            (error,result,fields)=>{
                if(error){
                    callback(error);
                }
                return callback(null, result);
            }
        );
    },
    updateUserById:(data, callback)=>{
        pool.query(
            'update registration set firstname=?,lastname=?,gender=?, email=?, password=?, number=? where id=?',
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,  
                data.password,
                data.number,
                data.id
            ],
            (error,result,fields)=>{
                if(error){
                    callback(error);
                }
                return callback(null, result);
            }
        );
    },
    deleteUserById:(data, callback)=>{
        pool.query(
            'delete from registration where id=?',
            [
                data.id
            ],
            (error,result,fields)=>{
                if(error){
                    callback(error);
                }
                return callback(null, result);
            }
        );
    },
    getUser: callback =>{
        pool.query('select id,firstname,lastname,gender,email,number from registration',
        [],
        (error,result,fields)=>{
            if (error){
                return callback(error)
            }
            return callback(null,result)
            }
        );
    },
    getUserByEmail:(email, callback)=>{
        pool.query(
            'select * from registration where email = ?',
            [email],
            (error,result,fields)=>{
                if(error){
                    callback(error);
                }
                return callback(null, result[0]);
            }
        );
    } 
};
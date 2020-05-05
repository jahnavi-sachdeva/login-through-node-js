const Sequelize = require('sequelize');

const sequelize = new Sequelize("test",'root','1234',{host:'127.0.0.1',dialect:"mysql", operatorsAliases:false})

module.exports=sequelize;
global.sequelize=sequelize;




// const { createPool } = require('mysql');

// const pool = createPool({
//     port:3306,
//     host:"localhost",
//     user:"root",
//     password:'1234',
//     database:"test",
//     connectionLimit:10
// });




// module.exports=pool;
const Sequelize= require('sequelize');
const bcrypt = require('bcrypt');
module.exports=sequelize.define("reg2s", {
    id:{
        type: Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true

    },
    firstname:Sequelize.STRING(255),
    lastname:Sequelize.STRING(255),
    gender:Sequelize.STRING(2),
    number:Sequelize.INTEGER(10),
    email:Sequelize.STRING(100),
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE
},
{
    hooks : {
        beforeCreate : (reg2s , options) => {
            {
                reg2s.password =bcrypt.hashSync(reg2s.password,bcrypt.genSaltSync(10),null);
                // reg2s.password = reg2s.password && reg2s.password != "" ? bcrypt.hashSync(reg2s.password, 10) : "";
            }
        }
    }
}

)
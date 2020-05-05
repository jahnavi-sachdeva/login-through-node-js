'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("reg2s",{
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
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("reg2s");
  }
};

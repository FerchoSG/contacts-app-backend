const { DataTypes } = require('sequelize');
const User = require('./User')
const sequelize = require('../config/database');

const Contact = sequelize.define('Contact', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contactNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.BIGINT
    }
});

Contact.belongsTo(User, {onDelete: 'cascade', onUpdate: 'cascade', foreignKey: 'user_id'})
Contact.sync();
    
module.exports = Contact;
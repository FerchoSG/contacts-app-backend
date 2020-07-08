const User = require('../models/User');

class UserService {
    static async getAll(){
        return await User.findAll({attributes: {exclude: 'password'}})
    }

    static async getAUser(id){
        const user = User.findOne({where: {id}});

        if(user) return user;
        if(!user) return {message: 'User does not exists'};
    }

    static async addUser(user){
        const newUser = await User.create(user);

        return newUser;
    }

    static async updateUser(id, updateUser){
        const updatedUser = await User.update(updateUser, {where: {id: id}});

        return updatedUser;
    }

    static async deleteUser(id){
        const userDeleted = User.destroy({where: {id}});

        return userDeleted;
    }
}

module.exports = UserService;